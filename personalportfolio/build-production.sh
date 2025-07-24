#!/bin/bash

# Production Build Script with Optimizations
echo "🚀 Starting production build process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist
rm -rf node_modules/.vite

# Install dependencies with clean cache
echo "📦 Installing dependencies..."
npm ci --only=production

# Run optimizations
echo "⚡ Running optimizations..."

# Optimize images
echo "🖼️ Optimizing images..."
npm run optimize:images

# Build for production
echo "🏗️ Building for production..."
NODE_ENV=production npm run build

# Analyze bundle size
echo "📊 Analyzing bundle size..."
npm run build:analyze

# Create deployment package
echo "📦 Creating deployment package..."
cd dist
zip -r ../portfolio-production.zip .
cd ..

echo "✅ Production build complete!"
echo "📁 Build files: ./dist/"
echo "📦 Deployment package: ./portfolio-production.zip"
echo "🌐 Ready for deployment!"

# Display build stats
echo "📈 Build Statistics:"
du -sh dist/
echo "Total files: $(find dist -type f | wc -l)"
echo "CSS files: $(find dist -name "*.css" | wc -l)"
echo "JS files: $(find dist -name "*.js" | wc -l)"
echo "Image files: $(find dist -name "*.jpg" -o -name "*.png" -o -name "*.svg" -o -name "*.webp" | wc -l)"
