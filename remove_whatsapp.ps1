# PowerShell script to remove WhatsApp floating button from all HTML files
# Get all HTML files recursively
$htmlFiles = Get-ChildItem -Recurse -Filter "*.html" | Where-Object { $_.Name -ne "remove_whatsapp.ps1" }

$removedCount = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # More flexible pattern matching
    if ($content -match 'whatsapp-float') {
        # Remove the entire WhatsApp button block
        $newContent = $content -replace '(?s)<a href="https://wa\.me/77765595726" class="whatsapp-float" target="_blank">\s*<img src="[^"]*whatsapp\.png"[^>]*>\s*</a>', ''
        
        if ($newContent -ne $content) {
            Set-Content $file.FullName $newContent -Encoding UTF8
            $removedCount++
            Write-Host "Removed WhatsApp from: $($file.FullName)"
        }
    }
}

Write-Host "`nTotal files processed: $($htmlFiles.Count)"
Write-Host "Files with WhatsApp removed: $removedCount" 