#!/usr/bin/env python3
"""
Download pokemontcg.io set logos/symbols to local /assets/sets/<setCode>/ and
rewrite _data/sets.json URLs to point to the mirrored copies. This removes the
last remaining dependency on pokemontcg.io's CDN.
"""
import json, os, urllib.request, urllib.error, socket, sys

socket.setdefaulttimeout(15)
OUT_DIR = 'assets/sets'
os.makedirs(OUT_DIR, exist_ok=True)

sets = json.load(open('_data/sets.json'))
affected = [
    s for s in sets
    if 'pokemontcg.io' in (s.get('logoUrl') or '')
    or 'pokemontcg.io' in (s.get('symbolUrl') or '')
]
print(f'{len(affected)} sets reference pokemontcg.io')

ok = fail = 0
for s in affected:
    code = s['setCode']
    sd = os.path.join(OUT_DIR, code)
    os.makedirs(sd, exist_ok=True)
    for kind in ('logo', 'symbol'):
        key = f'{kind}Url'
        url = s.get(key) or ''
        if 'pokemontcg.io' not in url:
            continue
        dest = os.path.join(sd, f'{kind}.png')
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 tcg-mirror'})
        try:
            with urllib.request.urlopen(req) as r, open(dest, 'wb') as f:
                f.write(r.read())
            s[key] = '/assets/sets/' + code + '/' + kind + '.png'
            ok += 1
        except Exception as e:
            s[key] = ''
            fail += 1
            print('  FAIL', code, kind, str(e)[:80])

json.dump(sets, open('_data/sets.json', 'w'), indent=2)
print(f'downloaded {ok}, failed {fail}')
