import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

interface Category {
  id: string
  name: string
  description?: string
  parent_id?: string
  children?: Category[]
}

export async function POST(
  req: NextRequest,
  { params }: { params: { listId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description, parent_category_id, order } = await req.json()

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
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

    // Create the category
    const { data: category, error } = await supabase
      .from('categories')
      .insert({
        list_id: params.listId,
        name,
        description,
        parent_category_id,
        order: order || 0
      })
      .select(`
        *,
        parent_category:categories(
          id,
          name
        )
      `)
      .single()

    if (error) throw error

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error creating category:', error)
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
    const { listId } = params

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

    const { data: categories, error } = await supabase
      .from('categories')
      .select(`
        *,
        parent_category:categories(
          id,
          name
        ),
        links(count)
      `)
      .eq('list_id', listId)
      .order('parent_category_id', { ascending: true, nullsFirst: true })
      .order('order', { ascending: true })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
      )
    }

    // Organize categories into a tree structure
    const categoryMap = new Map<string, Category>()
    const rootCategories: Category[] = []

    categories?.forEach(category => {
      categoryMap.set(category.id, {
        ...category,
        children: []
      })
    })

    categories?.forEach(category => {
      const categoryWithChildren = categoryMap.get(category.id)
      if (categoryWithChildren) {
        if (category.parent_category_id) {
          const parent = categoryMap.get(category.parent_category_id)
          if (parent) {
            parent.children = parent.children || []
            parent.children.push(categoryWithChildren)
          }
        } else {
          rootCategories.push(categoryWithChildren)
        }
      }
    })

    return NextResponse.json(rootCategories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { listId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { categories } = await req.json()

    // Verify list ownership
    const { data: list } = await supabase
      .from('lists')
      .select('user_id')
      .eq('id', params.listId)
      .single()

    if (!list || list.user_id !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Update category orders in a transaction
    const { data, error } = await supabase.rpc('update_category_orders', {
      list_id: params.listId,
      category_updates: categories.map((cat: any) => ({
        id: cat.id,
        parent_id: cat.parent_category_id,
        new_order: cat.order
      }))
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating categories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
