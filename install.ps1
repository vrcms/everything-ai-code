# install.ps1 — Universal Installer for Everything AI Code
# Supports: Qwen Code, Claude Code, Cursor, Codex, Gemini CLI, OpenCode

param(
    [string]$Mode = "interactive", # "interactive", "project", "global", "qwen", "claude", "cursor", "codex", "gemini"
    [switch]$Silent
)

$SourceSkills = Join-Path $PSScriptRoot "skills"
$SourceAgents = Join-Path $PSScriptRoot "agents"
$SourceRules = Join-Path $PSScriptRoot "rules"

$Color = @{
    Header = "Cyan"
    Success = "Green"
    Warn = "Yellow"
    Error = "Red"
    Info = "White"
}

function Write-Log {
    param([string]$Message, [string]$ColorName = "Info")
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] $Message" -ForegroundColor $Color.$ColorName
}

function Copy-Structure {
    param([string]$TargetDir, [string]$Label)
    
    Write-Log "🔧 Installing components for $Label..." "Header"
    
    $Targets = @(
        @{Name = "skills"; Source = $SourceSkills},
        @{Name = "agents"; Source = $SourceAgents},
        @{Name = "rules"; Source = $SourceRules}
    )

    foreach ($t in $Targets) {
        if (Test-Path $t.Source) {
            $Dest = Join-Path $TargetDir $t.Name
            Write-Log "   📂 Syncing $($t.Name)..." "Info"
            
            # Use robocopy for better performance and handling on Windows
            robocopy $t.Source $Dest /E /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
        }
    }
    Write-Log "✅ $Label installation complete!" "Success"
}

# --- Logic ---

if ($Mode -eq "interactive" -and -not $Silent) {
    Write-Log "🚀 Welcome to the Everything AI Code Installer!" "Header"
    Write-Host "Select your installation mode:"
    Write-Host "  1) Project (Current Directory)" -ForegroundColor $Color.Info
    Write-Host "  2) Global (All supported tools on this machine)" -ForegroundColor $Color.Info
    Write-Host "  3) Qwen Code (Project Level)" -ForegroundColor $Color.Info
    Write-Host "  4) Qwen Code (Global Level)" -ForegroundColor $Color.Info
    Write-Host "  5) Claude Code (Global)" -ForegroundColor $Color.Info
    Write-Host "  6) Cursor (Project Level)" -ForegroundColor $Color.Info
    
    $Choice = Read-Host "Enter number (1-6)"
    
    switch ($Choice) {
        "1" { $Mode = "project" }
        "2" { $Mode = "global" }
        "3" { $Mode = "qwen" }
        "4" { $Mode = "qwen-global" }
        "5" { $Mode = "claude" }
        "6" { $Mode = "cursor" }
        default { 
            Write-Log "❌ Invalid choice. Defaulting to Project mode." $Color.Error
            $Mode = "project"
        }
    }
} elseif ($Mode -eq "interactive") {
    $Mode = "project" # Default silent fallback
}

$HomeDir = $env:USERPROFILE
$CurrentDir = Get-Location

switch ($Mode) {
    "project" {
        Write-Log "📍 Installing to current project: $CurrentDir" "Header"
        Copy-Structure (Join-Path $CurrentDir ".qwen") "Qwen Code (Local)"
        Write-Log "💡 Restart Qwen Code in this directory to load." $Color.Warn
    }
    "global" {
        Write-Log "🌍 Installing globally for all supported tools..." "Header"
        Copy-Structure (Join-Path $HomeDir ".qwen") "Qwen Code"
        Copy-Structure (Join-Path $HomeDir ".claude") "Claude Code"
        Copy-Structure (Join-Path $HomeDir ".gemini") "Gemini CLI"
        Write-Log "💡 Global skills are now available for all tools!" $Color.Success
    }
    "qwen" {
        Copy-Structure (Join-Path $CurrentDir ".qwen") "Qwen Code (Local)"
    }
    "qwen-global" {
        Copy-Structure (Join-Path $HomeDir ".qwen") "Qwen Code (Global)"
    }
    "claude" {
        Copy-Structure (Join-Path $HomeDir ".claude") "Claude Code (Global)"
    }
    "cursor" {
        Copy-Structure (Join-Path $CurrentDir ".cursor") "Cursor (Local)"
    }
    default {
        # Fallback for direct mode specification
        if ($Mode -like "*qwen*") { 
            $Dir = if ($Mode -like "*global*") { (Join-Path $HomeDir ".qwen") } else { (Join-Path $CurrentDir ".qwen") }
            Copy-Structure $Dir "Qwen Code" 
        }
        elseif ($Mode -eq "claude") { Copy-Structure (Join-Path $HomeDir ".claude") "Claude Code" }
        elseif ($Mode -eq "cursor") { Copy-Structure (Join-Path $CurrentDir ".cursor") "Cursor" }
        else { Write-Log "⚠️ Unknown mode: $Mode" $Color.Warn }
    }
}

Write-Log "🎉 Installation Finished!" "Success"
