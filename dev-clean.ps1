# ═══════════════════════════════════════════════════════════════════════════════
# KRAMATRIX — Clean Dev Server Restart
# ═══════════════════════════════════════════════════════════════════════════════
# Run this script whenever you see:
#   - "Cannot read properties of undefined (reading 'call')" in webpack.js
#   - "Cannot find module './XXX.js'" errors
#   - Stale cache / hydration errors after production builds
#
# Usage: Right-click → Run with PowerShell, or in terminal: .\dev-clean.ps1
# ═══════════════════════════════════════════════════════════════════════════════

Write-Host "`n🔧 KRAMATRIX — Clean Dev Server Restart" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════" -ForegroundColor DarkGray

# Step 1: Kill any existing Next.js dev server on port 3007
Write-Host "`n[1/4] Stopping existing server on port 3007..." -ForegroundColor Yellow
$conn = Get-NetTCPConnection -LocalPort 3007 -ErrorAction SilentlyContinue
if ($conn) {
    Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    Write-Host "  ✓ Server stopped" -ForegroundColor Green
    Start-Sleep -Seconds 2
} else {
    Write-Host "  ✓ No server running" -ForegroundColor Green
}

# Step 2: Delete .next cache
Write-Host "[2/4] Clearing .next cache..." -ForegroundColor Yellow
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
    Write-Host "  ✓ .next deleted" -ForegroundColor Green
} else {
    Write-Host "  ✓ .next already clean" -ForegroundColor Green
}

# Step 3: Delete node_modules/.cache
Write-Host "[3/4] Clearing node_modules/.cache..." -ForegroundColor Yellow
if (Test-Path node_modules\.cache) {
    Remove-Item -Recurse -Force node_modules\.cache
    Write-Host "  ✓ node_modules/.cache deleted" -ForegroundColor Green
} else {
    Write-Host "  ✓ node_modules/.cache already clean" -ForegroundColor Green
}

# Step 4: Start dev server
Write-Host "[4/4] Starting dev server on port 3007..." -ForegroundColor Yellow
Write-Host "`n═══════════════════════════════════════════" -ForegroundColor DarkGray
Write-Host "🚀 Server starting at http://localhost:3007" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════`n" -ForegroundColor DarkGray

npx next dev -p 3007
