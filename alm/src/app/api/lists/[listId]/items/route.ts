import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import * as aiService from '@/lib/services/ai'

export async function POST(
  req: NextRequest,
  { params }: { params: { listId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { listId } = params
    const { items } = await req.json()

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Items array is required' },
        { status: 400 }
      )
    }

    // Verify user has access to this list
    const { data: list, error: listError } = await supabase
      .from('lists')
      .select('user_id')
      .eq('id', listId)
      .single()

    if (listError || !list) {
      return NextResponse.json(
        { error: 'List not found' },
        { status: 404 }
      )
    }

    // Get user's OpenAI API key for auto-categorization
    const { data: settings } = await supabase
      .from('user_settings')
      .select('openai_api_key, auto_categorize')
      .eq('user_id', list.user_id)
      .single()

    const results = []

    for (const item of items) {
      const { url, title, description } = item

      let finalCategoryId = null
      let suggestedCategories: string[] = []

      if (settings?.openai_api_key && settings?.auto_categorize) {
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

      const { data: link, error } = await supabase
        .from('links')
        .insert([
          {
            list_id: listId,
            url,
            title: title || url,
            description,
            category_id: finalCategoryId
          }
        ])
        .select()
        .single()

      if (error) {
        results.push({
          url,
          error: 'Failed to create link'
        })
      } else {
        results.push({
          ...link,
          suggested_categories: suggestedCategories
        })
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error creating items:', error)
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
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: items, error } = await supabase
      .from('list_items')
      .select('*')
      .eq('list_id', params.listId)
      .order('category', { ascending: true })
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching list items:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
