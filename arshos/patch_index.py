"""Idempotent patch for projects/portfolio/src/index.html (fonts, theme colour, no-flash theme)."""
import sys, re
p = sys.argv[1]
s = open(p, encoding='utf-8').read()
NEW_FONTS = ('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800'
             '&family=Geist:wght@400..700&family=Geist+Mono:wght@400..600&display=swap')
s = re.sub(r'https://fonts\.googleapis\.com/css2\?family=Inter[^"]*', NEW_FONTS.replace('&', '&amp;') if False else NEW_FONTS, s)
if 'fonts.gstatic.com' not in s:
    s = s.replace('<!-- Fonts -->', '<!-- Fonts -->\n    <link rel="preconnect" href="https://fonts.googleapis.com" />\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />', 1)
s = s.replace('<meta name="theme-color" content="#FF7955" />', '<meta name="theme-color" content="#0a0a0c" />')
if 'os-theme-boot' not in s:
    script = ('    <script id="os-theme-boot">try{document.documentElement.classList.add(localStorage.getItem("theme")==="light"?"light":"dark")}'
              'catch(e){document.documentElement.classList.add("dark")}</script>\n  </head>')
    s = s.replace('  </head>', script, 1)
open(p, 'w', encoding='utf-8').write(s)
print('patched', p)
