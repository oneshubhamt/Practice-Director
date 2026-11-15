# Makes the other-theme variant of a board by mapping colour roles.
# Usage: python3 design/tools/theme.py light Main Main-light
#        python3 design/tools/theme.py dark Answer-sheet Answer-sheet-dark
# Then run design/tools/inject.js so the navigation in the new file is in the right theme.
import os, re, sys
mode, src, dst = sys.argv[1], sys.argv[2], sys.argv[3]
P = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'mockup', '')
s = open(P + src + '.dc.html').read()

if mode == 'light':
    PLAIN = {
        '#11141B': '#FFFFFF', '#171A23': '#FFFFFF', '#1E222D': '#EEF0F5', '#131620': '#F6F7FA',
        '#1C2029': '#EEF0F5', '#1A1E28': '#EEF0F5', '#151821': '#EEF0F5',
        '#262B38': '#E3E6EE', '#222632': '#E3E6EE', '#343A4A': '#C9CEDB', '#4A5062': '#A9AFBF', '#2B3040': '#E3E6EE',
        '#ECEEF4': '#14161C', '#A9AEBD': '#555B6B', '#8A90A2': '#5F6577',
        '#9BA3FF': '#4B55D6', '#C3C8FF': '#2F38A8', '#A3ABFF': '#2A2E3A',
        '#2A2E55': '#EEF0FF', '#DDE0FF': '#2F38A8', '#1B1E33': '#EEF0FF',
        '#2A2415': '#FBEBD3', '#F2D9A8': '#8A5206', '#5A4A22': '#E9C48A', '#D9B872': '#8A5206',
        '#1C3A30': '#E3F3EC', '#BFEBD8': '#1E6B4C', '#6FD3A8': '#1E6B4C',
        '#5B63C9': '#4B55D6', '#33386E': '#C9CDF5', '#E58C8C': '#B4483F', '#C6CAD6': '#555B6B',
    }
    TEXT = {'#F2B866': '#8A5206', '#8E97FF': '#4B55D6', '#0E1016': '#FFFFFF'}
    FILL = {'#F2B866': '#E0902F', '#8E97FF': '#4B55D6', '#0E1016': '#F6F7FA'}
    PRIMARY = ('#8E97FF', '#0E1016', '#14161C', '#FFFFFF')
else:
    PLAIN = {
        '#EEF0F5': '#1E222D', '#E9ECF2': '#0A0C11', '#E3E6EE': '#262B38', '#C9CEDB': '#343A4A', '#D9DDE7': '#262B38', '#DDE1EA': '#1E222D',
        '#555B6B': '#A9AEBD', '#2F38A8': '#DDE0FF', '#EEF0FF': '#2A2E55', '#E7E9FB': '#2A2E55',
        '#E0902F': '#F2B866', '#8A5206': '#F2D9A8', '#FBEBD3': '#2A2415', '#F2C47A': '#5A4A22', '#A8660A': '#F2B866',
        '#1E6B4C': '#6FD3A8', '#E3F3EC': '#1C3A30', '#2A2E3A': '#A3ABFF',
        '#E7EAF1': '#262B38', '#DADEE8': '#343A4A', '#CDD2E0': '#4A5062', '#C6CAD6': '#A9AEBD', '#B4B9C7': '#A9AEBD', '#9A5A06': '#F2B866', '#F3F4FF': '#1B1E33',
    }
    TEXT = {'#14161C': '#ECEEF4', '#FFFFFF': '#0E1016', '#4B55D6': '#9BA3FF', '#F6F7FA': '#0E1016'}
    FILL = {'#14161C': '#ECEEF4', '#FFFFFF': '#171A23', '#4B55D6': '#8E97FF', '#F6F7FA': '#0E1016'}
    PRIMARY = ('#14161C', '#FFFFFF', '#8E97FF', '#0E1016')

# Regions kept exactly as they are (the PDF page is always white), and exact strings swapped by hand.
KEEP = {
    'Answer-sheet-dark': [('<div style="background: #FFFFFF; border: 1px solid #E3E6EE; border-radius: 6px; box-shadow', '</section>')],
}
SWAP = {
    'Results-dark': [('background: #14161C; color: #ECEEF4;', 'background: #1B1E33; color: #ECEEF4; border: 1px solid #2A2E55;')],
}
held = []
def hold(text):
    held.append(text); return '@@HOLD%d@@' % (len(held) - 1)
for a, b in KEEP.get(dst, []):
    i = s.index(a); j = s.index(b, i)
    s = s[:i] + hold(s[i:j]) + s[j:]
for a, b in SWAP.get(dst, []):
    assert s.count(a) >= 1, (dst, a)
    s = s.replace(a, hold(b))
AMBIG = set(TEXT)
HEX = re.compile(r'#[0-9A-Fa-f]{6}\b')
TEXT_KEY = re.compile(r'fg|colou?r|text|tag', re.I)

def style_attr(m):
    body = m.group(1)
    bg, fg, nbg, nfg = PRIMARY
    primary = re.search(r'background: ' + bg + r'\b', body) and re.search(r'(?<![-\w])color: ' + fg + r'\b', body)
    def decl(d):
        prop, _, val = d.partition(':')
        prop = prop.strip()
        def one(h):
            c = h.group(0).upper()
            if c in AMBIG:
                if primary and prop == 'background' and c == bg: return nbg
                if primary and prop == 'color' and c == fg: return nfg
                return (TEXT if prop == 'color' else FILL)[c]
            return PLAIN.get(c, c)
        return prop + ':' + HEX.sub(one, val) if _ else d
    return 'style="' + ';'.join(decl(d) for d in body.split(';')) + '"'

def other(text, in_script):
    def one(h):
        c = h.group(0).upper()
        if c not in AMBIG: return PLAIN.get(c, c)
        before = text[max(0, h.start() - 140):h.start()]
        if in_script:
            keys = re.findall(r'([A-Za-z_]\w*)\s*:', before)
            return (TEXT if keys and TEXT_KEY.search(keys[-1]) else FILL)[c]
        # css in <helmet>, svg attributes
        prop = re.findall(r'([a-z-]+)\s*[:=]\s*"?[^;{}"]*$', before)
        last = prop[-1] if prop else ''
        if last == 'color' or (last == 'fill' and re.search(r'<text[^>]*$', before)): return TEXT[c]
        return FILL[c]
    return HEX.sub(one, text)

cut = s.index('<script type="text/x-dc"')
head, script = s[:cut], s[cut:]
parts = re.split(r'(style="[^"]*")', head)
head = ''.join(style_attr(re.match(r'style="([^"]*)"', p)) if p.startswith('style="') else other(p, False) for p in parts)
s = head + other(script, True)
s = re.sub(r'@@HOLD(\d+)@@', lambda m: held[int(m.group(1))], s)
FIXUPS = {
    'Answer-sheet-dark': [("bg: on ? '#171A23' : 'transparent', fg: on ? '#ECEEF4' : '#A9AEBD'", "bg: on ? '#343A4A' : 'transparent', fg: on ? '#ECEEF4' : '#A9AEBD'")],
    'Progress-light': [("color: min > 120 ? '#8A5206'", "color: min > 120 ? '#E0902F'")],
}
for a, b in FIXUPS.get(dst, []):
    assert s.count(a) == 1, (dst, a, s.count(a))
    s = s.replace(a, b)
# Links between screens that exist in this theme stay in this theme.
THEMED = {'light': ['Main', 'Practice', 'Syllabus', 'Progress', 'Phone-flow'], 'dark': ['Answer-sheet', 'Results']}[mode]
s = re.sub(r'(?<![\w-])(' + '|'.join(THEMED) + r')\.dc\.html', lambda m: m.group(1) + '-' + mode + '.dc.html', s)
if mode == 'light':
    s = re.sub(r'<!--pd:(rail|tabs) ([a-z-]+)-->', r'<!--pd:\1 \2 light-->', s)
open(P + dst + '.dc.html', 'w').write(s)
print('wrote', dst)
