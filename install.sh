#!/bin/bash
# install.sh — Universal Installer for Everything AI Code
# Supports: Qwen Code, Claude Code, Cursor, Codex, Gemini CLI, OpenCode

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_SKILLS="$SCRIPT_DIR/skills"
SOURCE_AGENTS="$SCRIPT_DIR/agents"
SOURCE_RULES="$SCRIPT_DIR/rules"

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log() { echo -e "${CYAN}[$(date +%H:%M:%S)] $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; exit 1; }

sync_dir() {
    local src=$1
    local dest=$2
    
    if [ -d "$src" ]; then
        mkdir -p "$dest"
        rsync -a --delete "$src/" "$dest/" > /dev/null 2>&1 || cp -R "$src/"* "$dest/" 2>/dev/null || true
    fi
}

install_for_tool() {
    local tool=$1
    local target_dir=$2
    
    log "🔧 Installing for $tool..."
    sync_dir "$SOURCE_SKILLS" "$target_dir/skills"
    sync_dir "$SOURCE_AGENTS" "$target_dir/agents"
    sync_dir "$SOURCE_RULES" "$target_dir/rules"
    success "$tool installation complete!"
}

# Detect OS
OS="$(uname)"
if [[ "$OS" == "Darwin" ]]; then
    HOME_DIR="$HOME"
elif [[ "$OS" == "Linux" ]]; then
    HOME_DIR="$HOME"
else
    HOME_DIR="$USERPROFILE"
    if [[ "$OS" == MINGW* ]] || [[ "$OS" == CYGWIN* ]] || [[ "$OS" == MSYS* ]]; then
        warn "Detected Windows environment. Please use 'install.ps1' for best results."
        HOME_DIR=$(echo $HOME_DIR | sed 's/\\/\//g' | sed 's/://')
    fi
fi

CURRENT_DIR=$(pwd)

# Logic
MODE=${1:-"interactive"}

if [[ "$MODE" == "interactive" ]]; then
    log "🚀 Welcome to the Everything AI Code Installer!"
    echo "1) Project (Current Directory)"
    echo "2) Global (All supported tools)"
    echo "3) Qwen Code (Project)"
    echo "4) Qwen Code (Global)"
    echo "5) Claude Code (Global)"
    echo "6) Cursor (Project)"
    read -p "Enter number (1-6): " CHOICE

    case $CHOICE in
        1) MODE="project" ;;
        2) MODE="global" ;;
        3) MODE="qwen" ;;
        4) MODE="qwen-global" ;;
        5) MODE="claude" ;;
        6) MODE="cursor" ;;
        *) warn "Invalid choice. Defaulting to Project mode."; MODE="project" ;;
    esac
fi

case $MODE in
    project)
        log "📍 Installing to current project: $CURRENT_DIR"
        install_for_tool "Qwen Code (Local)" "$CURRENT_DIR/.qwen"
        warn "💡 Restart Qwen Code in this directory to load."
        ;;
    global)
        log "🌍 Installing globally for all supported tools..."
        install_for_tool "Qwen Code" "$HOME_DIR/.qwen"
        install_for_tool "Claude Code" "$HOME_DIR/.claude"
        install_for_tool "Gemini CLI" "$HOME_DIR/.gemini"
        success "Global skills are now available for all tools!"
        ;;
    qwen)
        install_for_tool "Qwen Code (Local)" "$CURRENT_DIR/.qwen"
        ;;
    qwen-global)
        install_for_tool "Qwen Code (Global)" "$HOME_DIR/.qwen"
        ;;
    claude)
        install_for_tool "Claude Code (Global)" "$HOME_DIR/.claude"
        ;;
    cursor)
        install_for_tool "Cursor (Local)" "$CURRENT_DIR/.cursor"
        ;;
    *)
        error "Unknown mode: $MODE"
        ;;
esac

success "🎉 Installation Finished!"
