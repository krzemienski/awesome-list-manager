-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create tables
create table profiles (
    id uuid references auth.users on delete cascade primary key,
    github_id text unique,
    avatar_url text,
    username text unique,
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table lists (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users on delete cascade not null,
    name text not null,
    description text,
    github_repo_url text not null,
    markdown_content text,
    is_valid boolean default false,
    validation_errors jsonb,
    last_synced_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table categories (
    id uuid default uuid_generate_v4() primary key,
    list_id uuid references lists on delete cascade not null,
    parent_category_id uuid references categories on delete set null,
    name text not null,
    description text,
    "order" integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table links (
    id uuid default uuid_generate_v4() primary key,
    list_id uuid references lists on delete cascade not null,
    category_id uuid references categories on delete set null,
    title text not null,
    url text not null,
    description text,
    "order" integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table suggestions (
    id uuid default uuid_generate_v4() primary key,
    list_id uuid references lists on delete cascade not null,
    link_id uuid references links on delete set null,
    title text not null,
    url text not null,
    description text,
    source text not null,
    status text check (status in ('pending', 'accepted', 'rejected')) default 'pending',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table commits (
    id uuid default uuid_generate_v4() primary key,
    list_id uuid references lists on delete cascade not null,
    user_id uuid references auth.users on delete cascade not null,
    commit_message text not null,
    github_commit_id text not null,
    committed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table validation_results (
    id uuid default uuid_generate_v4() primary key,
    list_id uuid references lists on delete cascade not null,
    result jsonb not null,
    validated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table user_settings (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users on delete cascade not null,
    openai_api_key text,
    auto_categorize boolean default false,
    auto_suggest boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint user_settings_user_id_key unique (user_id)
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table lists enable row level security;
alter table categories enable row level security;
alter table links enable row level security;
alter table suggestions enable row level security;
alter table commits enable row level security;
alter table validation_results enable row level security;
alter table user_settings enable row level security;

-- Create policies
create policy "Users can view their own profile"
    on profiles for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on profiles for update
    using (auth.uid() = id);

create policy "Users can view their own lists"
    on lists for select
    using (auth.uid() = user_id);

create policy "Users can create lists"
    on lists for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own lists"
    on lists for update
    using (auth.uid() = user_id);

create policy "Users can delete their own lists"
    on lists for delete
    using (auth.uid() = user_id);

create policy "Users can view categories in their lists"
    on categories for select
    using (
        exists (
            select 1 from lists
            where lists.id = categories.list_id
            and lists.user_id = auth.uid()
        )
    );

create policy "Users can manage categories in their lists"
    on categories for all
    using (
        exists (
            select 1 from lists
            where lists.id = categories.list_id
            and lists.user_id = auth.uid()
        )
    );

create policy "Users can view links in their lists"
    on links for select
    using (
        exists (
            select 1 from lists
            where lists.id = links.list_id
            and lists.user_id = auth.uid()
        )
    );

create policy "Users can manage links in their lists"
    on links for all
    using (
        exists (
            select 1 from lists
            where lists.id = links.list_id
            and lists.user_id = auth.uid()
        )
    );

-- User settings policies
create policy "Users can view their own settings"
    on user_settings for select
    using (auth.uid() = user_id);

create policy "Users can update their own settings"
    on user_settings for update
    using (auth.uid() = user_id);

create policy "Users can insert their own settings"
    on user_settings for insert
    with check (auth.uid() = user_id);

-- Create functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, github_id, avatar_url, username)
    values (
        new.id,
        new.raw_user_meta_data->>'github_id',
        new.raw_user_meta_data->>'avatar_url',
        new.raw_user_meta_data->>'preferred_username'
    );
    return new;
end;
$$ language plpgsql security definer;

-- Create triggers
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
