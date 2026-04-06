# Universal Installer for Everything AI Code
# Supports: Qwen Code, Claude Code, Cursor, Codex, Gemini CLI, OpenCode

param(
    [string]$Tool = ""
)

$SourceSkills = Join-Path $PSScriptRoot "skills"
$SourceAgents = Join-Path $PSScriptRoot "agents"
$SourceRules = Join-Path $PSScriptRoot "rules"
$SourceMCP = Join-Path $PSScriptRoot "mcp-configs"

function Write-Header {
    param([string]$Text)
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host " $Text" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
}

function Install-For-Tool {
    param([string]$ToolName, [string]$TargetDir)
    
    Write-Host "Installing for $ToolName..." -ForegroundColor Yellow
    
    # Create target directories
    $TargetSkills = Join-Path $TargetDir "skills"
    $TargetAgents = Join-Path $TargetDir "agents"
    $TargetRules = Join-Path $TargetDir "rules"
    
    New-Item -ItemType Directory -Force -Path $TargetSkills | Out-Null
    New-Item -ItemType Directory -Force -Path $TargetAgents | Out-Null
    New-Item -ItemType Directory -Force -Path $TargetRules | Out-Null

    # Copy/Symlink Skills
    Write-Host "  -> Linking Skills..." -ForegroundColor Green
    Copy-Item -Path "$SourceSkills\*" -Destination $TargetSkills -Recurse -Force
    
    # Copy/Symlink Agents (if applicable)
    if (Test-Path $SourceAgents) {
        Write-Host "  -> Linking Agents..." -ForegroundColor Green
        Copy-Item -Path "$SourceAgents\*" -Destination $TargetAgents -Recurse -Force
    }

    # Copy/Symlink Rules
    if (Test-Path $SourceRules) {
        Write-Host "  -> Linking Rules..." -ForegroundColor Green
        Copy-Item -Path "$SourceRules\*" -Destination $TargetRules -Recurse -Force
    }

    Write-Host "✅ $ToolName installation complete!" -ForegroundColor Green
}

# Auto-detect or Ask
if ($Tool -eq "") {
    Write-Header "Everything AI Code - Universal Installer"
    Write-Host "Which AI tool are you using?"
    Write-Host "  1) Qwen Code"
    Write-Host "  2) Claude Code"
    Write-Host "  3) Cursor"
    Write-Host "  4) Codex CLI"
    Write-Host "  5) Gemini CLI"
    Write-Host "  6) OpenCode"
    Write-Host "  7) All of the above (Global Install)"
    
    $Choice = Read-Host "Enter number (1-7)"
    
    switch ($Choice) {
        "1" { $Tool = "qwen" }
        "2" { $Tool = "claude" }
        "3" { $Tool = "cursor" }
        "4" { $Tool = "codex" }
        "5" { $Tool = "gemini" }
        "6" { $Tool = "opencode" }
        "7" { $Tool = "all" }
        default { Write-Host "Invalid choice."; exit 1 }
    }
} else {
    $Tool = $Tool.ToLower()
}

Write-Header "Installing Everything AI Code for: $Tool"

$HomeDir = $env:USERPROFILE

switch ($Tool) {
    "qwen" {
        $Target = Join-Path (Get-Location) ".qwen"
        # If running in a project, install locally. If global, install to ~\.qwen
        # Default behavior: Install to current directory for project-specific usage
        Install-For-Tool "Qwen Code" $Target
        Write-Host "`n💡 Tip: Restart Qwen Code to load new skills."
    }
    "claude" {
        $Target = Join-Path $HomeDir ".claude"
        Install-For-Tool "Claude Code" $Target
    }
    "cursor" {
        # Cursor usually uses .cursorrules or specific plugin folders depending on version
        # Assuming .cursor/rules for newer versions
        $Target = Join-Path (Get-Location) ".cursor"
        Install-For-Tool "Cursor" $Target
    }
    "codex" {
        $Target = Join-Path (Get-Location) ".codex"
        Install-For-Tool "Codex CLI" $Target
    }
    "gemini" {
        $Target = Join-Path $HomeDir ".gemini"
        Install-For-Tool "Gemini CLI" $Target
    }
    "opencode" {
        $Target = Join-Path (Get-Location) ".opencode"
        Install-For-Tool "OpenCode" $Target
    }
    "all" {
        Write-Host "Installing globally for all supported tools..."
        Install-For-Tool "Qwen Code" (Join-Path $HomeDir ".qwen")
        Install-For-Tool "Claude Code" (Join-Path $HomeDir ".claude")
        Install-For-Tool "Gemini CLI" (Join-Path $HomeDir ".gemini")
        Write-Host "`n🌍 Global installation complete!"
    }
}

Write-Header "Done! Enjoy your Superpowers!"
