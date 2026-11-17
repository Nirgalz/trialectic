# Secure local launcher: the API key is never written into the repository.
$ErrorActionPreference = "Stop"
$repository = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Push-Location $repository
try {
    python tools/install_secret_hook.py
    $secure = Read-Host "Cle OpenAI API (saisie masquee, jamais enregistree)" -AsSecureString
    $plain = [System.Net.NetworkCredential]::new("", $secure).Password
    if ([string]::IsNullOrWhiteSpace($plain)) { throw "Cle API vide. Arret sans appel externe." }
    try {
        $env:OPENAI_API_KEY = $plain
        $plain = $null
        Write-Host "Serveur trIAd local : http://127.0.0.1:8765"
        Write-Host "Quitter avec Ctrl+C. La cle n'est pas sauvegardee."
        python applications/triad-graph/server.py
    } finally {
        Remove-Item Env:\OPENAI_API_KEY -ErrorAction SilentlyContinue
        $plain = $null
    }
} finally {
    Pop-Location
}
