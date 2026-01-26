#!/bin/bash

# Aerial Estimate - Create New Repository Helper Script
# This script helps you push the Aerial Estimate platform to a new GitHub repository

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   Aerial Estimate - New Repository Setup                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Function to print colored output
print_success() {
    echo -e "\033[0;32m✓ $1\033[0m"
}

print_info() {
    echo -e "\033[0;34mℹ $1\033[0m"
}

print_warning() {
    echo -e "\033[0;33m⚠ $1\033[0m"
}

print_error() {
    echo -e "\033[0;31m✗ $1\033[0m"
}

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d "aerial-platform" ]; then
    print_error "Please run this script from the /home/user/ralph directory"
    exit 1
fi

print_success "Found Aerial Estimate project"
echo ""

# Get repository details from user
print_info "First, create a new repository on GitHub:"
echo "   1. Go to https://github.com/new"
echo "   2. Repository name: aerial-estimate (or your choice)"
echo "   3. DO NOT initialize with README (we have one)"
echo "   4. Click 'Create repository'"
echo ""

read -p "Have you created the repository on GitHub? (yes/no): " created

if [ "$created" != "yes" ] && [ "$created" != "y" ]; then
    print_warning "Please create the repository on GitHub first, then run this script again."
    echo ""
    echo "Quick link: https://github.com/new"
    exit 0
fi

echo ""
print_info "Great! Now let's connect your local code to the new repository."
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " username

if [ -z "$username" ]; then
    print_error "Username cannot be empty"
    exit 1
fi

# Get repository name
read -p "Enter repository name (default: aerial-estimate): " reponame
reponame=${reponame:-aerial-estimate}

# Construct repository URL
repo_url="https://github.com/${username}/${reponame}.git"

echo ""
print_info "Repository URL: $repo_url"
echo ""

# Show current remotes
print_info "Current remotes:"
git remote -v
echo ""

# Ask for confirmation
read -p "Add this as new remote and push? (yes/no): " confirm

if [ "$confirm" != "yes" ] && [ "$confirm" != "y" ]; then
    print_warning "Aborted. No changes made."
    exit 0
fi

echo ""
print_info "Adding new remote..."

# Add new remote
if git remote add new-origin "$repo_url" 2>/dev/null; then
    print_success "Added remote 'new-origin'"
else
    print_warning "Remote 'new-origin' already exists, updating URL..."
    git remote set-url new-origin "$repo_url"
    print_success "Updated remote 'new-origin'"
fi

echo ""
print_info "Pushing code to new repository..."
echo ""

# Get current branch name
current_branch=$(git branch --show-current)

# Ask which branch to push as main
echo "Current branch: $current_branch"
read -p "Push current branch to 'main' on new repository? (yes/no): " push_main

if [ "$push_main" = "yes" ] || [ "$push_main" = "y" ]; then
    print_info "Pushing $current_branch to new-origin/main..."

    if git push new-origin "$current_branch:main"; then
        print_success "Successfully pushed to main branch!"
    else
        print_error "Push failed. You may need to authenticate."
        echo ""
        print_info "If prompted, use your GitHub username and Personal Access Token"
        print_info "Create token at: https://github.com/settings/tokens"
        exit 1
    fi
else
    print_info "Pushing all branches..."

    if git push new-origin --all; then
        print_success "Successfully pushed all branches!"
    else
        print_error "Push failed. You may need to authenticate."
        exit 1
    fi
fi

echo ""
print_info "Pushing tags..."
if git push new-origin --tags 2>/dev/null; then
    print_success "Tags pushed successfully"
else
    print_info "No tags to push (this is fine)"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   🎉 Repository Setup Complete!                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

print_success "Your code is now on GitHub!"
echo ""
print_info "Repository URL:"
echo "   https://github.com/${username}/${reponame}"
echo ""

# Ask if they want to make this the default remote
read -p "Make this the default remote (rename to 'origin')? (yes/no): " make_default

if [ "$make_default" = "yes" ] || [ "$make_default" = "y" ]; then
    print_info "Renaming remotes..."
    git remote rename origin old-origin 2>/dev/null || true
    git remote rename new-origin origin
    print_success "Default remote updated!"
    echo ""
    print_info "New remotes:"
    git remote -v
fi

echo ""
print_info "Next steps:"
echo "   1. Visit: https://github.com/${username}/${reponame}"
echo "   2. Add repository description and topics"
echo "   3. Deploy to Vercel (see LAUNCH_GUIDE.md)"
echo "   4. Share your work!"
echo ""

print_success "Setup complete! 🚀"
