import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'
import { Octokit } from '@octokit/rest'
import { parseGitHubUrl } from '@/lib/utils/github'
import { parseMarkdownToList } from '@/lib/services/markdown'

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { github_repo_url } = await req.json()

    if (!github_repo_url) {
      return NextResponse.json({ error: 'GitHub repository URL is required' }, { status: 400 })
    }

    // Parse GitHub URL
    const { owner, repo, path } = parseGitHubUrl(github_repo_url)
    if (!owner || !repo) {
      return NextResponse.json({ error: 'Invalid GitHub repository URL' }, { status: 400 })
    }

    // Get GitHub access token
    const { data: profile } = await supabase
      .from('profiles')
      .select('github_token')
      .eq('id', session.user.id)
      .single()

    if (!profile?.github_token) {
      return NextResponse.json({ error: 'GitHub token not found' }, { status: 400 })
    }

    // Initialize Octokit
    const octokit = new Octokit({ auth: profile.github_token })

    // Fetch repository details
    const { data: repository } = await octokit.repos.get({
      owner,
      repo
    })

    // Fetch README content
    const { data: content } = await octokit.repos.getContent({
      owner,
      repo,
      path: path || 'README.md'
    })

    if ('content' in content) {
      const markdown = Buffer.from(content.content, 'base64').toString()

      // Create list in database
      const { data: list, error: listError } = await supabase
        .from('lists')
        .insert({
          user_id: session.user.id,
          name: repository.name,
          description: repository.description || null,
          github_repo_url,
          markdown_content: markdown
        })
        .select()
        .single()

      if (listError) throw listError

      // Parse markdown and create categories and links
      const { categories, links } = await parseMarkdownToList(markdown)

      // Insert categories
      if (categories.length > 0) {
        const { error: categoriesError } = await supabase
          .from('categories')
          .insert(
            categories.map((category, index) => ({
              list_id: list.id,
              name: category.name,
              description: category.description,
              order: index
            }))
          )

        if (categoriesError) throw categoriesError
      }

      // Insert links
      if (links.length > 0) {
        const { error: linksError } = await supabase
          .from('links')
          .insert(
            links.map((link, index) => ({
              list_id: list.id,
              category_id: link.category_id,
              title: link.title,
              url: link.url,
              description: link.description,
              order: index
            }))
          )

        if (linksError) throw linksError
      }

      return NextResponse.json(list)
    } else {
      return NextResponse.json({ error: 'README not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error importing list:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: lists, error } = await supabase
      .from('lists')
      .select(`
        *,
        categories(count),
        links(count)
      `)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(lists)
  } catch (error) {
    console.error('Error fetching lists:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
