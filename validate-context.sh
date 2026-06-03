#!/bin/bash
# validate-context.sh - Validates that project context files are up to date
# Run at the start of each AI-assisted session

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "=================================================="
echo "  Talent4Pro Matrices - Context Validation"
echo "=================================================="
echo ""

ERRORS=0
WARNINGS=0

# Check required documentation files
REQUIRED_FILES=(
  "matrices_web_CONTEXT.md"
  "matrices_web_ADRs.md"
  "ARQUITECTURA_DETALLADA.md"
  "PRIMERAS_3_TAREAS.md"
  "TAREAS_HOJA_1.md"
  "ANALISIS_HOJA_1.md"
  "GETTING_STARTED.md"
  "RESUMEN_METODOLOGIA.md"
  ".env.example"
  ".gitignore"
)

echo "Checking required files..."
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "  ${GREEN}✓${NC} $file"
  else
    echo -e "  ${RED}✗${NC} $file - MISSING"
    ERRORS=$((ERRORS + 1))
  fi
done
echo ""

# Check .env.local exists (not committed, just local)
echo "Checking environment configuration..."
if [ -f ".env.local" ]; then
  echo -e "  ${GREEN}✓${NC} .env.local exists"

  # Check required env vars
  REQUIRED_VARS=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
  )

  for var in "${REQUIRED_VARS[@]}"; do
    if grep -q "^${var}=" .env.local && ! grep -q "^${var}=\[" .env.local; then
      echo -e "  ${GREEN}✓${NC} $var is set"
    else
      echo -e "  ${YELLOW}⚠${NC} $var needs to be configured"
      WARNINGS=$((WARNINGS + 1))
    fi
  done
else
  echo -e "  ${YELLOW}⚠${NC} .env.local not found - copy from .env.example"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check git status
echo "Checking git status..."
if git rev-parse --git-dir > /dev/null 2>&1; then
  BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
  echo -e "  ${GREEN}✓${NC} Git initialized - branch: $BRANCH"

  UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l)
  if [ "$UNCOMMITTED" -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} Working tree clean"
  else
    echo -e "  ${YELLOW}⚠${NC} $UNCOMMITTED uncommitted changes"
    WARNINGS=$((WARNINGS + 1))
  fi
else
  echo -e "  ${RED}✗${NC} Not a git repository"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# Check Node.js and npm
echo "Checking runtime dependencies..."
if command -v node &> /dev/null; then
  NODE_VERSION=$(node --version)
  echo -e "  ${GREEN}✓${NC} Node.js $NODE_VERSION"
else
  echo -e "  ${RED}✗${NC} Node.js not found"
  ERRORS=$((ERRORS + 1))
fi

if command -v npm &> /dev/null; then
  NPM_VERSION=$(npm --version)
  echo -e "  ${GREEN}✓${NC} npm $NPM_VERSION"
fi

if [ -f "package.json" ] && [ -d "node_modules" ]; then
  echo -e "  ${GREEN}✓${NC} Dependencies installed"
elif [ -f "package.json" ]; then
  echo -e "  ${YELLOW}⚠${NC} package.json found but node_modules missing - run npm install"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Summary
echo "=================================================="
if [ $ERRORS -gt 0 ]; then
  echo -e "  ${RED}FAILED${NC}: $ERRORS error(s), $WARNINGS warning(s)"
  echo ""
  echo "  Fix errors before starting development session."
  exit 1
elif [ $WARNINGS -gt 0 ]; then
  echo -e "  ${YELLOW}READY WITH WARNINGS${NC}: 0 errors, $WARNINGS warning(s)"
  echo ""
  echo "  Context is usable but review warnings above."
  exit 0
else
  echo -e "  ${GREEN}ALL GOOD${NC}: Context is valid and up to date."
  echo ""
  echo "  Ready to start development session!"
  exit 0
fi
