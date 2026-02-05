#!/bin/bash

# 🚀 Team Spawn Script
# Facilita o spawning de tarefas para os agentes do time

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Agent IDs
FRONTEND_AGENT="frontend-agent"
BACKEND_AGENT="backend-agent"
QA_AGENT="qa-agent"

# Check if openclaw is available
if ! command -v openclaw &> /dev/null; then
    print_error "openclaw CLI not found. Please install OpenClaw first."
    exit 1
fi

# Main menu
show_menu() {
    print_header "OpenClaw Development Team - Task Scheduler"
    
    echo "Select an option:"
    echo "1) Spawn Frontend Task"
    echo "2) Spawn Backend Task"
    echo "3) Spawn QA Task"
    echo "4) Spawn Multiple Tasks (Parallel)"
    echo "5) View Active Sessions"
    echo "6) Check Session History"
    echo "7) Exit"
    echo ""
    read -p "Enter choice [1-7]: " choice
    
    case $choice in
        1) spawn_frontend ;;
        2) spawn_backend ;;
        3) spawn_qa ;;
        4) spawn_multiple ;;
        5) view_sessions ;;
        6) check_history ;;
        7) exit 0 ;;
        *) print_error "Invalid option. Try again."; show_menu ;;
    esac
}

spawn_frontend() {
    print_header "Spawn Frontend Task (Next.js)"
    
    echo "Quick templates:"
    echo "1) Create Component"
    echo "2) Create Page/Route"
    echo "3) Add API Integration"
    echo "4) Optimize Performance"
    echo "5) Custom Task"
    echo ""
    read -p "Select template [1-5]: " template
    
    read -p "Enter label for this task: " label
    
    local task=""
    case $template in
        1) task="Create a reusable React component with TypeScript and Tailwind CSS. Include prop types and usage examples." ;;
        2) task="Create a new page route in Next.js with layout and navigation. Use App Router pattern." ;;
        3) task="Implement API integration using axios/fetch with proper error handling and TypeScript types." ;;
        4) task="Analyze and optimize frontend performance: images, bundle size, code splitting, SEO metadata." ;;
        5) read -p "Enter custom task: " task ;;
    esac
    
    print_info "Spawning Frontend Agent..."
    openclaw sessions spawn \
        --task="$task" \
        --label="[Frontend] $label" \
        --thinking=low \
        --timeoutSeconds=600 2>/dev/null || true
    
    print_success "Task spawned! Use 'openclaw sessions list' to monitor"
}

spawn_backend() {
    print_header "Spawn Backend Task (Node.js + MongoDB)"
    
    echo "Quick templates:"
    echo "1) Create API Endpoint"
    echo "2) Create Database Model"
    echo "3) Add Authentication"
    echo "4) Optimize Queries"
    echo "5) Custom Task"
    echo ""
    read -p "Select template [1-5]: " template
    
    read -p "Enter label for this task: " label
    
    local task=""
    case $template in
        1) task="Create a RESTful API endpoint with Express, including validation, error handling, and TypeScript types." ;;
        2) task="Design and implement a MongoDB schema with Mongoose, including indexes and validation rules." ;;
        3) task="Implement JWT authentication with bcrypt password hashing, refresh tokens, and protected routes." ;;
        4) task="Analyze MongoDB queries, add indexes where needed, and optimize for performance." ;;
        5) read -p "Enter custom task: " task ;;
    esac
    
    print_info "Spawning Backend Agent..."
    openclaw sessions spawn \
        --task="$task" \
        --label="[Backend] $label" \
        --thinking=low \
        --timeoutSeconds=600 2>/dev/null || true
    
    print_success "Task spawned! Use 'openclaw sessions list' to monitor"
}

spawn_qa() {
    print_header "Spawn QA Task (Web Testing)"
    
    echo "Quick templates:"
    echo "1) Create E2E Tests"
    echo "2) Create Unit Tests"
    echo "3) Setup CI/CD Pipeline"
    echo "4) Performance Testing"
    echo "5) Custom Task"
    echo ""
    read -p "Select template [1-5]: " template
    
    read -p "Enter label for this task: " label
    
    local task=""
    case $template in
        1) task="Create comprehensive E2E tests using Playwright for critical user flows (auth, checkout, etc)." ;;
        2) task="Create unit tests with Jest and React Testing Library with >80% code coverage." ;;
        3) task="Setup GitHub Actions CI/CD pipeline with automated testing and deployment." ;;
        4) task="Implement performance tests: page load time, bundle size, API response time monitoring." ;;
        5) read -p "Enter custom task: " task ;;
    esac
    
    print_info "Spawning QA Agent..."
    openclaw sessions spawn \
        --task="$task" \
        --label="[QA] $label" \
        --thinking=low \
        --timeoutSeconds=600 2>/dev/null || true
    
    print_success "Task spawned! Use 'openclaw sessions list' to monitor"
}

spawn_multiple() {
    print_header "Spawn Multiple Tasks (Parallel)"
    
    echo "Feature Development Templates:"
    echo "1) Product Listing Feature"
    echo "2) Authentication System"
    echo "3) Shopping Cart"
    echo "4) Custom Feature"
    echo ""
    read -p "Select template [1-4]: " template
    
    case $template in
        1)
            print_info "Spawning Product Listing Feature..."
            openclaw sessions spawn --task="Create MongoDB schema for products with name, price, category, stock, and timestamps" --label="[Backend] Feature: Product Listing - Schema" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            sleep 2
            openclaw sessions spawn --task="Create REST API endpoints: GET /products (with pagination, filtering, search), GET /products/:id" --label="[Backend] Feature: Product Listing - API" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            sleep 2
            openclaw sessions spawn --task="Create ProductList component with filtering, search, and pagination UI using Next.js" --label="[Frontend] Feature: Product Listing - UI" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            sleep 2
            openclaw sessions spawn --task="Create E2E tests for product listing: filtering, search, pagination, mobile responsiveness" --label="[QA] Feature: Product Listing - Tests" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            ;;
        2)
            print_info "Spawning Authentication System..."
            openclaw sessions spawn --task="Create User model with email, password (hashed), name, and role fields" --label="[Backend] Feature: Auth - Model" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            sleep 2
            openclaw sessions spawn --task="Create auth endpoints: POST /auth/register, POST /auth/login, POST /auth/logout with JWT" --label="[Backend] Feature: Auth - API" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            sleep 2
            openclaw sessions spawn --task="Create login/register forms and auth pages with Next.js, integrate with backend" --label="[Frontend] Feature: Auth - UI" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            sleep 2
            openclaw sessions spawn --task="Create E2E tests for auth: register, login, logout, invalid credentials, token refresh" --label="[QA] Feature: Auth - Tests" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            ;;
        3)
            print_info "Spawning Shopping Cart Feature..."
            openclaw sessions spawn --task="Create Cart model linking to User and Product with quantity and price snapshot" --label="[Backend] Feature: Cart - Model" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            sleep 2
            openclaw sessions spawn --task="Create cart endpoints: GET, POST, PUT, DELETE items with inventory checking" --label="[Backend] Feature: Cart - API" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            sleep 2
            openclaw sessions spawn --task="Create CartPage with add/remove/quantity controls, integrate with backend" --label="[Frontend] Feature: Cart - UI" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            sleep 2
            openclaw sessions spawn --task="Create E2E tests for cart: add item, modify qty, remove item, empty cart, persist state" --label="[QA] Feature: Cart - Tests" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            ;;
        4)
            read -p "Describe your feature: " feature_desc
            read -p "Backend task: " backend_task
            read -p "Frontend task: " frontend_task
            read -p "QA task: " qa_task
            
            openclaw sessions spawn --task="$backend_task" --label="[Backend] $feature_desc" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            sleep 2
            openclaw sessions spawn --task="$frontend_task" --label="[Frontend] $feature_desc" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            sleep 2
            openclaw sessions spawn --task="$qa_task" --label="[QA] $feature_desc" --thinking=low --timeoutSeconds=600 2>/dev/null || true
            ;;
    esac
    
    print_success "All tasks spawned! Monitor with 'openclaw sessions list'"
}

view_sessions() {
    print_header "Active Sessions"
    openclaw sessions list --limit=20 --kinds=isolated 2>/dev/null || print_error "No active sessions"
}

check_history() {
    print_header "Session History"
    read -p "Enter session key: " session_key
    
    if [ -z "$session_key" ]; then
        print_error "Session key required"
        return
    fi
    
    openclaw sessions history --sessionKey="$session_key" --limit=10 2>/dev/null || print_error "Could not fetch history"
}

# Run main menu
show_menu

# Keep menu running
while true; do
    read -p "Press Enter to continue..." -t 5 || true
    show_menu
done
