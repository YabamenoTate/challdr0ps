"C:\Program Files\7-Zip\7z.exe" a -mx9 chrome.zip .\chrome\*
"C:\Program Files\Google\Chrome\Application\chrome.exe" --pack-extension="%~dp0chrome\" --pack-extension-key="%~dp0challdr0ps.pem" --no-message-box
"C:\Program Files\7-Zip\7z.exe" a -mx9 firefox.zip .\firefox\*
"C:\Program Files\7-Zip\7z.exe" a -mx9 edge.zip .\edge\*
