#!/bin/sh

# Function to check a single file and output JSON
check_file() {
    local file="$1"
    local output_file="${file%.md}.json"
    
    # Run awesome_bot and capture output
    result=$(awesome_bot "$file" --allow-ssl --allow-redirect -a "$ALLOW_CODES" --format json)
    status=$?
    
    # Write results to JSON file
    echo "$result" > "$output_file"
    
    return $status
}

# Main loop to watch for files
while true; do
    for file in /lists/*.md; do
        if [ -f "$file" ]; then
            check_file "$file"
        fi
    done
    sleep 60
done
