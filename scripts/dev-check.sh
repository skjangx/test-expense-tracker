#!/bin/bash
# Development Quality Gate - Run before starting any new work

set -e

echo "🔍 Running development quality checks..."

echo "📝 Type checking..."
npm run type-check

echo "🧹 Linting..."
npm run lint

echo "🧪 Running tests..."
npm run test

echo "🏗️ Build verification..."
npm run build

echo "✅ All checks passed! Ready for development."