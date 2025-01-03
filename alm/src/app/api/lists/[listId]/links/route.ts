import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import * as aiService from '@/lib/services/ai'
import { Database } from '@/types/database'

export async function POST(
  req: NextRequest,
  { params }: { params: { listId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { listId } = params

    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { url, category_id, title, description } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Verify list ownership
    const { data: list } = await supabase
      .from('lists')
      .select('user_id')
      .eq('id', params.listId)
      .single()

    if (!list || list.user_id !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let finalCategoryId = category_id
    let finalTitle = title
    let finalDescription = description

    // Get user's OpenAI API key for auto-categorization
    const { data: settings } = await supabase
      .from('user_settings')
      .select('openai_api_key, auto_categorize')
      .eq('user_id', session.user.id)
      .single()

    let suggestedCategories: string[] = []

    if (settings?.openai_api_key && settings?.auto_categorize && !category_id) {
      aiService.initializeAI(settings.openai_api_key)
      suggestedCategories = await aiService.suggestCategory(url, title || '', description || '')
      
      if (suggestedCategories.length > 0) {
        // Try to find an existing category that matches
        const { data: matchingCategory } = await supabase
          .from('categories')
          .select('id')
          .eq('list_id', listId)
          .ilike('name', suggestedCategories[0])
          .single()

        if (matchingCategory) {
          finalCategoryId = matchingCategory.id
        }
      }
    }

    // Create the link
    const { data: link, error } = await supabase
      .from('links')
      .insert({
        list_id: params.listId,
        category_id: finalCategoryId,
        title: finalTitle,
        url: url,
        description: finalDescription
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      ...link,
      suggested_categories: suggestedCategories
    })
  } catch (error) {
    console.error('Error creating link:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { listId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    
    const { data: links, error } = await supabase
      .from('links')
      .select(`
        *,
        category:categories(
          id,
          name
        )
      `)
      .eq('list_id', params.listId)
      .order('category_id', { ascending: true })
      .order('order', { ascending: true })

    if (error) throw error

    return NextResponse.json(links)
  } catch (error) {
    console.error('Error fetching links:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
