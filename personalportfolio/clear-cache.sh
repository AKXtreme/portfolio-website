#!/bin/bash

# Development cache clearing script
echo "🧹 Clearing all development caches..."

# Stop any running dev server
pkill -f "vite"

# Clear Node.js cache
echo "📦 Clearing Node.js cache..."
rm -rf node_modules/.vite
rm -rf node_modules/.cache
rm -rf .vite

# Clear build cache
echo "🏗️ Clearing build cache..."
rm -rf dist/

# Clear npm cache
echo "📥 Clearing npm cache..."
npm cache clean --force

# Clear browser caches (instructions)
echo "🌐 To clear browser caches:"
echo "  Chrome/Edge: Ctrl+Shift+Delete or Cmd+Shift+Delete"
echo "  Firefox: Ctrl+Shift+Delete or Cmd+Shift+Delete"
echo "  Safari: Cmd+Option+E"
echo ""
echo "Or use private/incognito mode for testing"

# Reinstall dependencies
echo "📦 Reinstalling dependencies..."
npm install

# Start fresh dev server
echo "🚀 Starting fresh development server..."
npm run dev

echo "✅ Cache clearing complete!"
echo ""
echo "💡 If you still see issues:"
echo "  1. Open browser in private/incognito mode"
echo "  2. Hard refresh: Ctrl+F5 or Cmd+Shift+R"
echo "  3. Check browser console for errors"
