"""Regenerate delivery fonts: python (with fonttools[woff]) scripts/subset-fonts.py.
Full WOFF2 fonts from Google Fonts are retained as a same-typeface fallback.
"""
from pathlib import Path
import json
from fontTools.ttLib import TTFont
from fontTools import subset
root = Path(__file__).resolve().parent.parent
text = ''.join(chr(c) for c in range(0x20, 0x100))
for folder in ('app', 'components', 'lib'):
    for file in (root / folder).rglob('*'):
        if file.suffix in ('.js', '.jsx'):
            text += file.read_text()
ranges = {}
for weight in ('Light', 'Regular', 'Medium'):
    font = TTFont(root / f'public/fonts/ZenKakuGothicNew-{weight}.woff2')
    # Do not download the full Japanese font just to discover it lacks an
    # arrow/control symbol already known to require the system-font fallback.
    unsupported = sorted({ord(char) for char in text} - font.getBestCmap().keys())
    spans = []
    start = 0
    for point in unsupported + [0x110000]:
        if point > start:
            end = point - 1
            spans.append(f'U+{start:X}-{end:X}' if start != end else f'U+{start:X}')
        start = point + 1
    ranges[weight] = ','.join(spans)
    options = subset.Options()
    options.layout_features = ['*']  # Preserve palt, kerning and all shaping.
    sub = subset.Subsetter(options=options)
    sub.populate(text=text)
    sub.subset(font)
    font.flavor = 'woff2'
    font.save(root / f'app/fonts/ZenKakuGothicNew-{weight}.woff2')

(root / 'lib/font-ranges.generated.json').write_text(json.dumps(ranges) + '\n')
