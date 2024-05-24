
#!/bin/bash

# Default values
TESTS="all"
URL="http://localhost:8000"
README_PATH="./README.md"
README_URL="https://github.com/awesome-selfhosted/awesome-selfhosted/blob/master/README.md"
START_SERVER=false

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --tests) TESTS="$2"; shift ;;
        --url) URL="$2"; shift ;;
        --readme-path) README_PATH="$2"; shift ;;
        --readme-url) README_URL="$2"; shift ;;
        --start-server) START_SERVER=true ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# Function to start the Docker dev server
start_server() {
    echo "Starting Docker Compose and building new image..."
    docker-compose up --build -d
    sleep 10  # Wait for the server to start
}

# Function to log curl response
log_response() {
    echo "--------------------------------------------------"
    echo "Request: $1"
    echo "Response:"
    echo "$2"
    echo "--------------------------------------------------"
}

# Function to run all tests
run_all_tests() {
    test_list_all_lists
    test_create_new_list
    test_retrieve_specific_list
    test_update_specific_list
    test_delete_specific_list
    test_list_all_links
    test_create_new_link
   

 test_retrieve_specific_link
    test_update_specific_link
    test_delete_specific_link
    test_list_all_categories
    test_create_new_category
    test_retrieve_specific_category
    test_update_specific_category
    test_delete_specific_category
    test_upload_readme
    test_upload_readme_url
    test_update_readme
    test_render_markdown_all
    test_render_markdown_specific
}

# Function to parse and check response
check_response() {
    local response="$1"
    local expected="$2"
    echo "$response" | grep -q "$expected"
    if [ $? -ne 0 ]; then
        echo "Test failed: Expected "$expected" not found in response."
        exit 1
    else
        echo "Test passed: "$expected" found in response."
    fi
}

# Test functions
test_list_all_lists() {
    RESPONSE=$(curl -s -X GET "$URL/api/lists/")
    log_response "GET /api/lists/" "$RESPONSE"
    check_response "$RESPONSE" ""title":"
}

test_create_new_list() {
    RESPONSE=$(curl -s -X POST "$URL/api/lists/" -d '{"title": "New List", "description": "Description of the new list"}' -H "Content-Type: application/json")
    log_response "POST /api/lists/" "$RESPONSE"
    check_response "$RESPONSE" ""title": "New List""
}

test_retrieve_specific_list() {
    RESPONSE=$(curl -s -X GET "$URL/api/lists/1/")
    log_response "GET /api/lists/1/" "$RESPONSE"
    check_response "$RESPONSE" ""title":"
}

test_update_specific_list() {
    RESPONSE=$(curl -s -X PUT "$URL/api/lists/1/" -d '{"title": "Updated List", "description": "Updated description"}' -H "Content-Type: application/json")
    log_response "PUT /api/lists/1/" "$RESPONSE"
    check_response "$RESPONSE" ""title": "Updated List""
}

test_delete_specific_list() {
    RESPONSE=$(curl -s --X DELETE "$URL/api/lists/1/")
    log_response "DELETE /api/lists/1/" "$RESPONSE"
    # No check needed, just ensure no errors
}

test_list_all_links() {
    RESPONSE=$(curl -s -X GET "$URL/api/links/")
    log_response "GET /api/links/" "$RESPONSE"
    check_response "$RESPONSE" ""url":"
}

test_create_new_link() {
    RESPONSE=$(curl -s -X POST "$URL/api/links/" -d '{"url": "https://example.com", "description": "Example link", "category": "Category", "list": 1}' -H "Content-Type: application/json")
    log_response "POST /api/links/" "$RESPONSE"
    check_response "$RESPONSE" ""url": "https://example.com""
}

test_retrieve_specific_link() {
    RESPONSE=$(curl -s -X GET "$URL/api/links/1/")
    log_response "GET /api/links/1/" "$RESPONSE"
    check_response "$RESPONSE" ""url":"
}

test_update_specific_link() {
    RESPONSE=$(curl -s -X PUT "$URL/api/links/1/" -d '{"url": "https://updated.com", "description": "Updated link", "category": "Updated category", "list": 1}' -H "Content-Type: application/json")
    log_response "PUT /api/links/1/" "$RESPONSE"
    check_response "$RESPONSE" ""url": "https://updated.com""
}

test_delete_specific_link() {
    RESPONSE=$(curl -s -X DELETE "$URL/api/links/1/")
    log_response "DELETE /api/links/1/" "$RESPONSE"
    # No check needed, just ensure no errors
}

test_list_all_categories() {
    RESPONSE=$(curl -s -X GET "$URL/api/categories/")
    log_response "GET /api/categories/" "$RESPONSE"
    check_response "$RESPONSE" ""name":"
}

test_create_new_category() {
    RESPONSE=$(curl -s -X POST "$URL/api/categories/" -d '{"name": "New Category"}' -H "Content-Type: application/json")
    log_response "POST /api/categories/" "$RESPONSE"
    check_response "$RESPONSE" ""name": "New Category""
}

test_retrieve_specific_category() {
    RESPONSE=$(curl -s -X GET "$URL/api/categories/1/")
    log_response "GET /api/categories/1/" "$RESPONSE"
    check_response "$RESPONSE" ""name":"
}

test_update_specific_category() {
    RESPONSE=$(curl -s -X PUT "$URL/api/categories/1/" -d '{"name": "Updated Category"}' -H "Content-Type: application/json")
    log_response "PUT /api/categories/1/" "$RESPONSE"
    check_response "$RESPONSE" ""name": "Updated Category""
}

test_delete_specific_category() {
    RESPONSE=$(curl -s -X DELETE "$URL/api/categories/1/")
    log_response "DELETE /api/categories/1/" "$RESPONSE"
    # No check needed, just ensure no errors
}

test_upload_readme() {
    RESPONSE=$(curl -s -X POST "$URL/api/upload_readme/" -F "file=@$README_PATH")
    log_response "POST /api/upload_readme/" "$RESPONSE"
    check_response "$RESPONSE" ""status": "success""
}

test_upload_readme_url() {
    RESPONSE=$(curl -s -X POST "$URL/api/upload_readme/" -d "{"url": "$README_URL"}" -H "Content-Type: application/json")
    log_response "POST /api/upload_readme/" "$RESPONSE"
    check_response "$RESPONSE" ""status": "success""
}

test_update_readme() {
    RESPONSE=$(curl -s -X POST "$URL/api/update_readme/" -d '{"repo": "yourusername/repository", "token": "your_github_token", "content": "New content for README", "path": "README.md"}' -H "Content-Type: application/json")
    log_response "POST /api/update_readme/" "$RESPONSE"
    check_response "$RESPONSE" ""content":"
}

test_render_markdown_all() {
    RESPONSE=$(curl -s -X GET "$URL/api/render_markdown/")
    log_response "GET /api/render_markdown/" "$RESPONSE"
    check_response "$RESPONSE" "# "
}

test_render_markdown_specific() {
    RESPONSE=$(curl -s -X GET "$URL/api/render_markdown/1/")
    log_response "GET /api/render_markdown/1/" "$RESPONSE"
    check_response "$RESPONSE" "# "
}

# Start the server if needed
if [ "$START_SERVER" = true ]; then
    start_server
fi

# Run tests
if [ "$TESTS" = "all" ]; then
    run_all_tests
else
    for test in $(echo $TESTS | tr "," "\n"); do
        test_$test
    done
fi
