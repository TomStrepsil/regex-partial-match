window.BENCHMARK_DATA = {
  "lastUpdate": 1788181292643,
  "repoUrl": "https://github.com/TomStrepsil/regex-partial-match",
  "entries": {
    "regex-partial-match": [
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5618f6f96db6ea76db52811630bf2f2b5b9faf63",
          "message": "[14] Ensure ergonomic expectation for .test(), ensuring patterns without end-of-input boundary assertions don't always match (#40)\n\n* move to PartialMatchRegExp subclass\n* add benchmarking\n* upgrade typescript\n* substring -> slice\n* added parity tests against reference implementations\n* actions/checkout to v7\n* actions/gh-script to v9\n* standardise on ES2015\n* fixup for patterns that justifyably match end of input\n* ensure g+y combo tested\n* cover all sentinel suppression cases\n* utf-16 test update\n* add types/node to root to support benchmarking workflow\n---------\n\nCo-authored-by: Copilot Autofix powered by AI <175728472+Copilot@users.noreply.github.com>",
          "timestamp": "2026-06-19T21:05:40+01:00",
          "tree_id": "6da6dbbdd85da65010166c7a6e7a53f70fef8e76",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/5618f6f96db6ea76db52811630bf2f2b5b9faf63"
        },
        "date": 1781899571716,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 44.4,
            "range": "± 0.40",
            "unit": "ns/iter",
            "extra": "min: 41.01ns  p75: 43.12ns  p99: 89.43ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 85.66,
            "range": "± 1.68",
            "unit": "ns/iter",
            "extra": "min: 80.55ns  p75: 84.56ns  p99: 131.59ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 88.21,
            "range": "± 1.77",
            "unit": "ns/iter",
            "extra": "min: 83.61ns  p75: 88.70ns  p99: 123.93ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.6,
            "range": "± 0.20",
            "unit": "ns/iter",
            "extra": "min: 32.80ns  p75: 33.57ns  p99: 68.90ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 70.34,
            "range": "± 1.31",
            "unit": "ns/iter",
            "extra": "min: 66.93ns  p75: 70.82ns  p99: 110.29ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 78.06,
            "range": "± 1.57",
            "unit": "ns/iter",
            "extra": "min: 70.29ns  p75: 75.44ns  p99: 133.91ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 54421.74,
            "range": "± 556.00",
            "unit": "ns/iter",
            "extra": "min: 50736.00ns  p75: 52899.00ns  p99: 97957.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 66696.42,
            "range": "± 626.00",
            "unit": "ns/iter",
            "extra": "min: 61732.00ns  p75: 64026.00ns  p99: 128312.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 57407.42,
            "range": "± 591.50",
            "unit": "ns/iter",
            "extra": "min: 52889.00ns  p75: 56295.00ns  p99: 101061.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 143672.2,
            "range": "± 1667.50",
            "unit": "ns/iter",
            "extra": "min: 136224.00ns  p75: 141352.00ns  p99: 273010.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 356.09,
            "range": "± 1.35",
            "unit": "ns/iter",
            "extra": "min: 352.04ns  p75: 355.49ns  p99: 398.41ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1343.43,
            "range": "± 3.98",
            "unit": "ns/iter",
            "extra": "min: 1329.50ns  p75: 1346.44ns  p99: 1370.34ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1861.06,
            "range": "± 5.55",
            "unit": "ns/iter",
            "extra": "min: 1839.65ns  p75: 1859.39ns  p99: 1943.43ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 205.35,
            "range": "± 0.90",
            "unit": "ns/iter",
            "extra": "min: 201.64ns  p75: 205.43ns  p99: 215.36ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 431.89,
            "range": "± 10.00",
            "unit": "ns/iter",
            "extra": "min: 400.00ns  p75: 440.00ns  p99: 520.00ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 697.32,
            "range": "± 2.82",
            "unit": "ns/iter",
            "extra": "min: 679.76ns  p75: 694.11ns  p99: 743.43ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1220fd73a1f951523d460ccedaf072d13778e2e8",
          "message": "[NO-ISSUE] various docs fixes (#41)\n\n* various fixes",
          "timestamp": "2026-06-19T23:00:37+01:00",
          "tree_id": "d568582b991dd373910a9766c08fe7c49f8c7611",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/1220fd73a1f951523d460ccedaf072d13778e2e8"
        },
        "date": 1781906470130,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 42.49,
            "range": "± 0.19",
            "unit": "ns/iter",
            "extra": "min: 39.68ns  p75: 41.11ns  p99: 79.34ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 85.05,
            "range": "± 1.53",
            "unit": "ns/iter",
            "extra": "min: 80.18ns  p75: 84.38ns  p99: 125.04ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 85.68,
            "range": "± 1.41",
            "unit": "ns/iter",
            "extra": "min: 82.11ns  p75: 85.56ns  p99: 124.12ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 36.37,
            "range": "± 2.31",
            "unit": "ns/iter",
            "extra": "min: 33.43ns  p75: 38.31ns  p99: 55.28ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 73.8,
            "range": "± 2.56",
            "unit": "ns/iter",
            "extra": "min: 68.22ns  p75: 74.72ns  p99: 96.14ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 80.27,
            "range": "± 1.9",
            "unit": "ns/iter",
            "extra": "min: 72.23ns  p75: 77.69ns  p99: 156.26ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 51963.98,
            "range": "± 116.6",
            "unit": "ns/iter",
            "extra": "min: 51165.87ns  p75: 51459.88ns  p99: 53830.88ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 73612.2,
            "range": "± 621",
            "unit": "ns/iter",
            "extra": "min: 69010.00ns  p75: 72787.00ns  p99: 96581.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 59050.56,
            "range": "± 536",
            "unit": "ns/iter",
            "extra": "min: 55374.00ns  p75: 58550.00ns  p99: 72796.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 153744.34,
            "range": "± 896.5",
            "unit": "ns/iter",
            "extra": "min: 147687.00ns  p75: 151674.00ns  p99: 188012.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 367.21,
            "range": "± 1.15",
            "unit": "ns/iter",
            "extra": "min: 363.32ns  p75: 367.52ns  p99: 381.28ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1355.51,
            "range": "± 2.51",
            "unit": "ns/iter",
            "extra": "min: 1334.87ns  p75: 1357.84ns  p99: 1379.71ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1948.77,
            "range": "± 5.68",
            "unit": "ns/iter",
            "extra": "min: 1932.66ns  p75: 1949.71ns  p99: 1998.28ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 207.72,
            "range": "± 0.43",
            "unit": "ns/iter",
            "extra": "min: 202.83ns  p75: 206.04ns  p99: 236.48ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 398.16,
            "range": "± 4.56",
            "unit": "ns/iter",
            "extra": "min: 388.60ns  p75: 402.15ns  p99: 409.94ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 737.47,
            "range": "± 4.86",
            "unit": "ns/iter",
            "extra": "min: 722.51ns  p75: 740.23ns  p99: 777.55ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5a34d912bb4b3f24046a8819c07dabd98eea6248",
          "message": "[43] Fix brace misinterpretation in quantifier matching (#44)\n\n* Fix brace misinterpretation\n* Linter reformatting",
          "timestamp": "2026-07-17T14:08:16+01:00",
          "tree_id": "c79ca9bce6bd6063250dc2ce8695bcbd2e4bea00",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/5a34d912bb4b3f24046a8819c07dabd98eea6248"
        },
        "date": 1784293730104,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 42.65,
            "range": "± 0.39",
            "unit": "ns/iter",
            "extra": "min: 39.46ns  p75: 41.39ns  p99: 82.55ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 84.22,
            "range": "± 1.54",
            "unit": "ns/iter",
            "extra": "min: 79.46ns  p75: 83.06ns  p99: 124.38ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 85.58,
            "range": "± 1.46",
            "unit": "ns/iter",
            "extra": "min: 82.07ns  p75: 85.51ns  p99: 120.16ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.67,
            "range": "± 0.13",
            "unit": "ns/iter",
            "extra": "min: 33.39ns  p75: 33.88ns  p99: 58.65ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 69.88,
            "range": "± 1.28",
            "unit": "ns/iter",
            "extra": "min: 67.34ns  p75: 70.70ns  p99: 98.46ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 75.54,
            "range": "± 1.38",
            "unit": "ns/iter",
            "extra": "min: 70.06ns  p75: 73.72ns  p99: 117.88ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 51818.19,
            "range": "± 416",
            "unit": "ns/iter",
            "extra": "min: 49192.00ns  p75: 50635.00ns  p99: 80371.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 73246.27,
            "range": "± 691",
            "unit": "ns/iter",
            "extra": "min: 68792.00ns  p75: 72299.00ns  p99: 97137.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 58420.9,
            "range": "± 431",
            "unit": "ns/iter",
            "extra": "min: 55056.00ns  p75: 57200.00ns  p99: 89272.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 186108,
            "range": "± 1333",
            "unit": "ns/iter",
            "extra": "min: 176259.00ns  p75: 183163.00ns  p99: 321762.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 368,
            "range": "± 1.19",
            "unit": "ns/iter",
            "extra": "min: 362.95ns  p75: 367.86ns  p99: 382.45ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1369.5,
            "range": "± 4.06",
            "unit": "ns/iter",
            "extra": "min: 1337.13ns  p75: 1373.99ns  p99: 1394.57ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1976.9,
            "range": "± 11.46",
            "unit": "ns/iter",
            "extra": "min: 1948.66ns  p75: 1986.94ns  p99: 2021.66ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 215.81,
            "range": "± 0.87",
            "unit": "ns/iter",
            "extra": "min: 203.58ns  p75: 214.68ns  p99: 244.00ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 399.94,
            "range": "± 5.13",
            "unit": "ns/iter",
            "extra": "min: 384.45ns  p75: 402.18ns  p99: 419.17ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 764.8,
            "range": "± 3.05",
            "unit": "ns/iter",
            "extra": "min: 751.68ns  p75: 763.90ns  p99: 810.84ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "49adfc3b39b4790d4c37b942de8e5b7b1dc75d1d",
          "message": "[45]  (#48)\n\nFix Annex B \\k backrefs",
          "timestamp": "2026-07-18T11:49:10+01:00",
          "tree_id": "085ea898defb43ef51a9e168363c37d6d8c89d2b",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/49adfc3b39b4790d4c37b942de8e5b7b1dc75d1d"
        },
        "date": 1784371786795,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 42.9,
            "range": "± 0.25",
            "unit": "ns/iter",
            "extra": "min: 39.70ns  p75: 41.29ns  p99: 83.74ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 84.42,
            "range": "± 1.59",
            "unit": "ns/iter",
            "extra": "min: 79.39ns  p75: 84.06ns  p99: 123.16ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 85.58,
            "range": "± 1.48",
            "unit": "ns/iter",
            "extra": "min: 82.13ns  p75: 86.49ns  p99: 117.19ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.68,
            "range": "± 0.12",
            "unit": "ns/iter",
            "extra": "min: 33.38ns  p75: 33.83ns  p99: 57.43ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 69.47,
            "range": "± 1.19",
            "unit": "ns/iter",
            "extra": "min: 67.33ns  p75: 70.47ns  p99: 93.46ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 75.59,
            "range": "± 1.32",
            "unit": "ns/iter",
            "extra": "min: 70.10ns  p75: 73.56ns  p99: 119.44ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 53106.48,
            "range": "± 87.51",
            "unit": "ns/iter",
            "extra": "min: 52663.89ns  p75: 52871.94ns  p99: 54184.07ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 79086.77,
            "range": "± 1337.5",
            "unit": "ns/iter",
            "extra": "min: 70202.00ns  p75: 74990.00ns  p99: 161563.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 58760.96,
            "range": "± 711.5",
            "unit": "ns/iter",
            "extra": "min: 55133.00ns  p75: 58079.00ns  p99: 74921.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 175808.51,
            "range": "± 1101.5",
            "unit": "ns/iter",
            "extra": "min: 167533.00ns  p75: 172392.00ns  p99: 322765.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 360.17,
            "range": "± 1.22",
            "unit": "ns/iter",
            "extra": "min: 356.20ns  p75: 360.63ns  p99: 375.80ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1361.76,
            "range": "± 3.43",
            "unit": "ns/iter",
            "extra": "min: 1346.65ns  p75: 1363.88ns  p99: 1385.23ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 2066.27,
            "range": "± 22.63",
            "unit": "ns/iter",
            "extra": "min: 2026.87ns  p75: 2078.35ns  p99: 2174.57ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 217.07,
            "range": "± 3.76",
            "unit": "ns/iter",
            "extra": "min: 204.56ns  p75: 219.60ns  p99: 264.88ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 414.26,
            "range": "± 4.85",
            "unit": "ns/iter",
            "extra": "min: 386.72ns  p75: 402.69ns  p99: 771.70ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 720.81,
            "range": "± 2.23",
            "unit": "ns/iter",
            "extra": "min: 709.18ns  p75: 716.92ns  p99: 765.50ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c530c548f4a749f1995e67caa8b5fe12091a8629",
          "message": "[46] Support [ literal inside character class where not a v-mode (unicodeSets) expression. (#49)\n\nFix [ literals in v-mode expressions",
          "timestamp": "2026-07-18T12:01:38+01:00",
          "tree_id": "0e29bd5cec9aef667d3587a80befc1a48940a1a6",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/c530c548f4a749f1995e67caa8b5fe12091a8629"
        },
        "date": 1784372528824,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 44.37,
            "range": "± 0.37",
            "unit": "ns/iter",
            "extra": "min: 40.48ns  p75: 42.98ns  p99: 88.32ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 85.36,
            "range": "± 1.42",
            "unit": "ns/iter",
            "extra": "min: 80.67ns  p75: 84.27ns  p99: 129.32ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 86.64,
            "range": "± 1.44",
            "unit": "ns/iter",
            "extra": "min: 83.56ns  p75: 87.06ns  p99: 120.13ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.5,
            "range": "± 0.16",
            "unit": "ns/iter",
            "extra": "min: 33.17ns  p75: 33.83ns  p99: 58.61ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 70.07,
            "range": "± 1.26",
            "unit": "ns/iter",
            "extra": "min: 67.13ns  p75: 70.75ns  p99: 99.50ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 76.48,
            "range": "± 1.31",
            "unit": "ns/iter",
            "extra": "min: 70.17ns  p75: 74.03ns  p99: 124.43ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 50912.72,
            "range": "± 478",
            "unit": "ns/iter",
            "extra": "min: 47526.00ns  p75: 49829.00ns  p99: 80951.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 67994.2,
            "range": "± 684.5",
            "unit": "ns/iter",
            "extra": "min: 61496.00ns  p75: 64076.00ns  p99: 137412.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 59394.82,
            "range": "± 691",
            "unit": "ns/iter",
            "extra": "min: 52909.00ns  p75: 56174.00ns  p99: 104155.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 141170.47,
            "range": "± 5668.5",
            "unit": "ns/iter",
            "extra": "min: 131165.00ns  p75: 144365.00ns  p99: 196283.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 357.67,
            "range": "± 1.45",
            "unit": "ns/iter",
            "extra": "min: 352.16ns  p75: 355.63ns  p99: 400.38ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1353.27,
            "range": "± 6.78",
            "unit": "ns/iter",
            "extra": "min: 1323.33ns  p75: 1351.21ns  p99: 1529.87ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1916.82,
            "range": "± 15.05",
            "unit": "ns/iter",
            "extra": "min: 1840.57ns  p75: 1883.39ns  p99: 2650.48ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 222.23,
            "range": "± 2",
            "unit": "ns/iter",
            "extra": "min: 199.82ns  p75: 207.21ns  p99: 412.70ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 394.33,
            "range": "± 2.8",
            "unit": "ns/iter",
            "extra": "min: 383.68ns  p75: 394.14ns  p99: 407.03ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 711.18,
            "range": "± 2.67",
            "unit": "ns/iter",
            "extra": "min: 681.82ns  p75: 693.20ns  p99: 1003.07ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e2613bcb95c296546911dec3e3e7e5d5757d272d",
          "message": "[47] Fix for astral plane characters outside of character classes (#50)\n\nFix for astral plane characters outside of character classes",
          "timestamp": "2026-07-18T12:41:03+01:00",
          "tree_id": "84edcb5d9386296c2615bcb3fdad7c813e5d88e7",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/e2613bcb95c296546911dec3e3e7e5d5757d272d"
        },
        "date": 1784374899035,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 44.73,
            "range": "± 0.52",
            "unit": "ns/iter",
            "extra": "min: 40.85ns  p75: 43.37ns  p99: 89.61ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 87.23,
            "range": "± 2.18",
            "unit": "ns/iter",
            "extra": "min: 80.65ns  p75: 85.94ns  p99: 134.45ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 87.78,
            "range": "± 1.81",
            "unit": "ns/iter",
            "extra": "min: 83.38ns  p75: 88.00ns  p99: 121.70ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.56,
            "range": "± 0.21",
            "unit": "ns/iter",
            "extra": "min: 33.07ns  p75: 33.82ns  p99: 60.31ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 70.63,
            "range": "± 1.34",
            "unit": "ns/iter",
            "extra": "min: 67.03ns  p75: 71.22ns  p99: 101.73ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 76.21,
            "range": "± 1.38",
            "unit": "ns/iter",
            "extra": "min: 69.90ns  p75: 74.01ns  p99: 122.34ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 49919.48,
            "range": "± 545.5",
            "unit": "ns/iter",
            "extra": "min: 47030.00ns  p75: 49112.00ns  p99: 70815.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 66149.47,
            "range": "± 666",
            "unit": "ns/iter",
            "extra": "min: 61591.00ns  p75: 64365.00ns  p99: 127558.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 57625.04,
            "range": "± 686",
            "unit": "ns/iter",
            "extra": "min: 52477.00ns  p75: 55472.00ns  p99: 109001.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 140000.38,
            "range": "± 1001",
            "unit": "ns/iter",
            "extra": "min: 131804.00ns  p75: 135730.00ns  p99: 263849.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 356.04,
            "range": "± 1.19",
            "unit": "ns/iter",
            "extra": "min: 352.33ns  p75: 356.16ns  p99: 373.61ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1339.06,
            "range": "± 4.16",
            "unit": "ns/iter",
            "extra": "min: 1327.26ns  p75: 1341.50ns  p99: 1365.16ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1862.75,
            "range": "± 7.83",
            "unit": "ns/iter",
            "extra": "min: 1845.55ns  p75: 1866.65ns  p99: 1912.33ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 204.68,
            "range": "± 1.05",
            "unit": "ns/iter",
            "extra": "min: 199.46ns  p75: 205.13ns  p99: 216.68ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 454.75,
            "range": "± 5",
            "unit": "ns/iter",
            "extra": "min: 410.00ns  p75: 450.00ns  p99: 881.00ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 700.82,
            "range": "± 2.61",
            "unit": "ns/iter",
            "extra": "min: 684.80ns  p75: 697.77ns  p99: 763.53ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "02571e00080ee45391abbcd55bfdc5d1aed0cdf2",
          "message": "[42] revert move to partialMatchRegExp class (#52)\n\n* revert move to partialMatchRegExp class\n* re-number bench scenarios",
          "timestamp": "2026-07-18T23:19:15+01:00",
          "tree_id": "0e33cfca0713096f56137d32b028f1d16306f944",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/02571e00080ee45391abbcd55bfdc5d1aed0cdf2"
        },
        "date": 1784413180151,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 362.48,
            "range": "± 1.01",
            "unit": "ns/iter",
            "extra": "min: 358.45ns  p75: 362.45ns  p99: 379.80ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 1377.03,
            "range": "± 2.61",
            "unit": "ns/iter",
            "extra": "min: 1356.49ns  p75: 1379.20ns  p99: 1398.36ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 218.74,
            "range": "± 1.84",
            "unit": "ns/iter",
            "extra": "min: 210.82ns  p75: 217.08ns  p99: 321.21ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 419.92,
            "range": "± 12.63",
            "unit": "ns/iter",
            "extra": "min: 396.27ns  p75: 431.01ns  p99: 471.01ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9da0733821d78652925547fa4c4c4b300c300812",
          "message": "[53] Add PCRE2 documentation and parity tests (#54)\n\n* Add PCRE2 tests",
          "timestamp": "2026-07-18T23:57:30+01:00",
          "tree_id": "271b9447f1f6b711c104e532ede7ac9b0b5300cc",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/9da0733821d78652925547fa4c4c4b300c300812"
        },
        "date": 1784415476487,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 368.07,
            "range": "± 2.24",
            "unit": "ns/iter",
            "extra": "min: 357.60ns  p75: 366.05ns  p99: 466.10ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 1416.19,
            "range": "± 4.55",
            "unit": "ns/iter",
            "extra": "min: 1379.26ns  p75: 1402.36ns  p99: 1496.12ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 223.03,
            "range": "± 1.77",
            "unit": "ns/iter",
            "extra": "min: 208.54ns  p75: 219.24ns  p99: 345.41ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 400.15,
            "range": "± 4.27",
            "unit": "ns/iter",
            "extra": "min: 389.81ns  p75: 403.07ns  p99: 427.53ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e3c57bfeb829ebaa24652869aab1224aa464e93a",
          "message": "[55] add documentation back (#56)\n\n* add re: test/exec documentation back",
          "timestamp": "2026-07-19T10:39:12+01:00",
          "tree_id": "1c237a5ea6e2dd91624baa827896984b81c34a4a",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/e3c57bfeb829ebaa24652869aab1224aa464e93a"
        },
        "date": 1784453973950,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 361.73,
            "range": "± 1.02",
            "unit": "ns/iter",
            "extra": "min: 357.83ns  p75: 361.80ns  p99: 378.73ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 1401.28,
            "range": "± 6.17",
            "unit": "ns/iter",
            "extra": "min: 1385.62ns  p75: 1405.56ns  p99: 1440.08ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 215.79,
            "range": "± 3.06",
            "unit": "ns/iter",
            "extra": "min: 209.18ns  p75: 218.34ns  p99: 234.10ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 407.42,
            "range": "± 5.01",
            "unit": "ns/iter",
            "extra": "min: 389.79ns  p75: 409.87ns  p99: 428.97ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d9a95a41abbf15d105b1cd67da17f46cde6d5b60",
          "message": "[57] Fix alternation to end of input for multiline scenarios (#58)\n\n* Update end of input to handle multiline",
          "timestamp": "2026-07-19T20:03:18+01:00",
          "tree_id": "05d79f89f1d99a1d22b9482e432a3463beca66e5",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/d9a95a41abbf15d105b1cd67da17f46cde6d5b60"
        },
        "date": 1784487822856,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 356.2,
            "range": "± 1.27",
            "unit": "ns/iter",
            "extra": "min: 352.69ns  p75: 356.56ns  p99: 372.75ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 1389.96,
            "range": "± 13.44",
            "unit": "ns/iter",
            "extra": "min: 1343.57ns  p75: 1388.30ns  p99: 1541.19ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 214.2,
            "range": "± 2.61",
            "unit": "ns/iter",
            "extra": "min: 203.14ns  p75: 212.76ns  p99: 250.90ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 395.21,
            "range": "± 2.66",
            "unit": "ns/iter",
            "extra": "min: 384.08ns  p75: 394.46ns  p99: 460.53ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8efec2434a884665b9e1ff6fd2fab81f93528644",
          "message": "[NO ISSUE] (#59)\n\n* fix example in unit test comment\n* move footnote inside parenthesis",
          "timestamp": "2026-07-19T21:23:03+01:00",
          "tree_id": "ded691f795205577c7ff406ca2c8888911939e95",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/8efec2434a884665b9e1ff6fd2fab81f93528644"
        },
        "date": 1784492606709,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 371.7,
            "range": "± 4.17",
            "unit": "ns/iter",
            "extra": "min: 358.20ns  p75: 369.70ns  p99: 422.38ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 1421.12,
            "range": "± 29.09",
            "unit": "ns/iter",
            "extra": "min: 1377.06ns  p75: 1441.97ns  p99: 1557.82ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 212.74,
            "range": "± 1.41",
            "unit": "ns/iter",
            "extra": "min: 203.26ns  p75: 209.37ns  p99: 445.54ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 389.16,
            "range": "± 2.36",
            "unit": "ns/iter",
            "extra": "min: 376.21ns  p75: 385.67ns  p99: 523.20ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "eb64c23ed0624360c8b9fb20cdd2b1e238501043",
          "message": "[NO ISSUE] more documentation fixes (#60)\n\n* documentation fixes",
          "timestamp": "2026-07-19T22:26:16+01:00",
          "tree_id": "323ed72cba14fd401d446429481f352fb8ac048f",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/eb64c23ed0624360c8b9fb20cdd2b1e238501043"
        },
        "date": 1784496402049,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 366.69,
            "range": "± 1.28",
            "unit": "ns/iter",
            "extra": "min: 362.43ns  p75: 366.95ns  p99: 389.41ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 1376.12,
            "range": "± 8.14",
            "unit": "ns/iter",
            "extra": "min: 1353.80ns  p75: 1381.46ns  p99: 1448.12ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 207.72,
            "range": "± 0.42",
            "unit": "ns/iter",
            "extra": "min: 204.57ns  p75: 207.38ns  p99: 225.07ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 381.87,
            "range": "± 2.26",
            "unit": "ns/iter",
            "extra": "min: 372.32ns  p75: 380.38ns  p99: 442.09ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8d5c030a76e1fd6fe1cdaca195995ba423257803",
          "message": "61 partial matching of backreferences (#62)\n\n* support partial matching of backrefs\n* emojis everywhere",
          "timestamp": "2026-07-22T15:01:59+01:00",
          "tree_id": "cfb7f0c7e322d2f52570c632947ab24aef633b62",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/8d5c030a76e1fd6fe1cdaca195995ba423257803"
        },
        "date": 1784728963052,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 44.7,
            "range": "± 0.43",
            "unit": "ns/iter",
            "extra": "min: 41.41ns  p75: 43.49ns  p99: 85.91ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 92.6,
            "range": "± 1.85",
            "unit": "ns/iter",
            "extra": "min: 86.50ns  p75: 91.38ns  p99: 134.76ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 94.62,
            "range": "± 2.00",
            "unit": "ns/iter",
            "extra": "min: 89.02ns  p75: 93.99ns  p99: 158.34ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.85,
            "range": "± 0.23",
            "unit": "ns/iter",
            "extra": "min: 32.84ns  p75: 33.90ns  p99: 65.30ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 76.27,
            "range": "± 1.28",
            "unit": "ns/iter",
            "extra": "min: 73.04ns  p75: 77.22ns  p99: 102.52ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 82.49,
            "range": "± 1.41",
            "unit": "ns/iter",
            "extra": "min: 75.77ns  p75: 80.13ns  p99: 127.14ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 53032.5,
            "range": "± 481.00",
            "unit": "ns/iter",
            "extra": "min: 49266.00ns  p75: 52341.00ns  p99: 70645.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 68348.33,
            "range": "± 1011.50",
            "unit": "ns/iter",
            "extra": "min: 64626.00ns  p75: 67880.00ns  p99: 86557.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 57459.51,
            "range": "± 541.00",
            "unit": "ns/iter",
            "extra": "min: 52377.00ns  p75: 55402.00ns  p99: 108279.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 149589.53,
            "range": "± 5047.50",
            "unit": "ns/iter",
            "extra": "min: 134869.00ns  p75: 148318.00ns  p99: 276948.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 365.23,
            "range": "± 3.68",
            "unit": "ns/iter",
            "extra": "min: 352.23ns  p75: 361.71ns  p99: 455.38ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1370.15,
            "range": "± 5.25",
            "unit": "ns/iter",
            "extra": "min: 1340.83ns  p75: 1360.11ns  p99: 1395.56ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1913.12,
            "range": "± 8.93",
            "unit": "ns/iter",
            "extra": "min: 1844.79ns  p75: 1869.75ns  p99: 2878.98ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 211.5,
            "range": "± 1.83",
            "unit": "ns/iter",
            "extra": "min: 199.74ns  p75: 207.05ns  p99: 418.40ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 399.24,
            "range": "± 2.34",
            "unit": "ns/iter",
            "extra": "min: 381.16ns  p75: 389.69ns  p99: 783.13ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 692.23,
            "range": "± 5.03",
            "unit": "ns/iter",
            "extra": "min: 674.93ns  p75: 689.85ns  p99: 747.51ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 41.17,
            "range": "± 0.26",
            "unit": "ns/iter",
            "extra": "min: 39.69ns  p75: 40.58ns  p99: 57.14ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 59.2,
            "range": "± 1.10",
            "unit": "ns/iter",
            "extra": "min: 56.64ns  p75: 59.67ns  p99: 93.25ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1963.47,
            "range": "± 10.76",
            "unit": "ns/iter",
            "extra": "min: 1932.26ns  p75: 1959.60ns  p99: 2163.74ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1882.09,
            "range": "± 7.64",
            "unit": "ns/iter",
            "extra": "min: 1859.66ns  p75: 1884.84ns  p99: 1939.17ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 99.31,
            "range": "± 1.92",
            "unit": "ns/iter",
            "extra": "min: 92.45ns  p75: 99.54ns  p99: 130.43ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 115.46,
            "range": "± 1.45",
            "unit": "ns/iter",
            "extra": "min: 111.68ns  p75: 115.23ns  p99: 162.79ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7792.34,
            "range": "± 110.00",
            "unit": "ns/iter",
            "extra": "min: 7381.00ns  p75: 7721.00ns  p99: 12008.00ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 10878.63,
            "range": "± 25.80",
            "unit": "ns/iter",
            "extra": "min: 10843.97ns  p75: 10902.89ns  p99: 10908.76ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 618476.2,
            "range": "± 5893.50",
            "unit": "ns/iter",
            "extra": "min: 595296.00ns  p75: 615836.00ns  p99: 832565.00ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "90376551a2ffed8be2e82bf9cf4450775f0f4d8c",
          "message": "[NO ISSUE] remove named export (#64)\n\n- remove errant named export",
          "timestamp": "2026-07-22T16:58:28+01:00",
          "tree_id": "12740173c5bc63f82232c9fcfe777ad2d8759d5c",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/90376551a2ffed8be2e82bf9cf4450775f0f4d8c"
        },
        "date": 1784735949437,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 44.38,
            "range": "± 0.44",
            "unit": "ns/iter",
            "extra": "min: 41.07ns  p75: 43.20ns  p99: 86.98ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 103.5,
            "range": "± 3.44",
            "unit": "ns/iter",
            "extra": "min: 86.39ns  p75: 93.95ns  p99: 186.89ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 95.8,
            "range": "± 1.85",
            "unit": "ns/iter",
            "extra": "min: 89.01ns  p75: 93.29ns  p99: 179.03ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.49,
            "range": "± 0.2",
            "unit": "ns/iter",
            "extra": "min: 32.75ns  p75: 33.73ns  p99: 61.78ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 76.64,
            "range": "± 1.33",
            "unit": "ns/iter",
            "extra": "min: 73.66ns  p75: 77.17ns  p99: 108.01ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 82.47,
            "range": "± 1.43",
            "unit": "ns/iter",
            "extra": "min: 76.53ns  p75: 79.98ns  p99: 128.54ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 51748.85,
            "range": "± 555.5",
            "unit": "ns/iter",
            "extra": "min: 48512.00ns  p75: 50876.00ns  p99: 84697.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 74257.36,
            "range": "± 2453.5",
            "unit": "ns/iter",
            "extra": "min: 64217.00ns  p75: 70425.00ns  p99: 148573.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 57458.36,
            "range": "± 571",
            "unit": "ns/iter",
            "extra": "min: 53310.00ns  p75: 56164.00ns  p99: 82724.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 142430.89,
            "range": "± 1121.5",
            "unit": "ns/iter",
            "extra": "min: 132278.00ns  p75: 136304.00ns  p99: 279078.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 363.19,
            "range": "± 2.19",
            "unit": "ns/iter",
            "extra": "min: 352.25ns  p75: 357.83ns  p99: 708.58ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1355.6,
            "range": "± 5.07",
            "unit": "ns/iter",
            "extra": "min: 1341.02ns  p75: 1357.58ns  p99: 1411.78ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1866.01,
            "range": "± 4.37",
            "unit": "ns/iter",
            "extra": "min: 1848.53ns  p75: 1863.87ns  p99: 1941.41ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 205.46,
            "range": "± 0.89",
            "unit": "ns/iter",
            "extra": "min: 199.86ns  p75: 205.41ns  p99: 218.34ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 450.8,
            "range": "± 0.5",
            "unit": "ns/iter",
            "extra": "min: 420.00ns  p75: 441.00ns  p99: 451.00ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 682.29,
            "range": "± 2.31",
            "unit": "ns/iter",
            "extra": "min: 671.55ns  p75: 680.21ns  p99: 734.81ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 41.21,
            "range": "± 0.31",
            "unit": "ns/iter",
            "extra": "min: 39.68ns  p75: 40.71ns  p99: 57.16ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 58.29,
            "range": "± 1.19",
            "unit": "ns/iter",
            "extra": "min: 56.35ns  p75: 59.20ns  p99: 79.69ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1950.95,
            "range": "± 26.68",
            "unit": "ns/iter",
            "extra": "min: 1875.42ns  p75: 1948.89ns  p99: 2433.09ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1916.94,
            "range": "± 26.73",
            "unit": "ns/iter",
            "extra": "min: 1797.64ns  p75: 1857.31ns  p99: 3149.93ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 98.41,
            "range": "± 1.36",
            "unit": "ns/iter",
            "extra": "min: 92.36ns  p75: 98.57ns  p99: 146.81ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 114.96,
            "range": "± 1.45",
            "unit": "ns/iter",
            "extra": "min: 108.74ns  p75: 114.92ns  p99: 164.83ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7864.25,
            "range": "± 140",
            "unit": "ns/iter",
            "extra": "min: 7391.00ns  p75: 7822.00ns  p99: 13009.00ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 10696.36,
            "range": "± 33.26",
            "unit": "ns/iter",
            "extra": "min: 10562.61ns  p75: 10658.96ns  p99: 10684.09ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 626198.7,
            "range": "± 6249",
            "unit": "ns/iter",
            "extra": "min: 599234.00ns  p75: 621076.00ns  p99: 1026939.00ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "00988e540e2259b417ed5ea49cab99514c56479e",
          "message": "[65] allow dependabot PRs (#66)\n\n* fixup for dependabot actor in CI",
          "timestamp": "2026-07-22T18:10:44+01:00",
          "tree_id": "fbc9971220d60bb9ab6d5174761b7d3e5bb0914c",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/00988e540e2259b417ed5ea49cab99514c56479e"
        },
        "date": 1784740286689,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 36.19,
            "range": "± 1.52",
            "unit": "ns/iter",
            "extra": "min: 30.09ns  p75: 36.64ns  p99: 67.61ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 88.83,
            "range": "± 6.39",
            "unit": "ns/iter",
            "extra": "min: 72.07ns  p75: 92.76ns  p99: 141.07ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 91.54,
            "range": "± 3.77",
            "unit": "ns/iter",
            "extra": "min: 76.96ns  p75: 94.35ns  p99: 128.93ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 35.31,
            "range": "± 1.63",
            "unit": "ns/iter",
            "extra": "min: 28.44ns  p75: 36.35ns  p99: 54.90ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 76.99,
            "range": "± 3.75",
            "unit": "ns/iter",
            "extra": "min: 62.76ns  p75: 80.17ns  p99: 107.73ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 74.58,
            "range": "± 4.41",
            "unit": "ns/iter",
            "extra": "min: 63.69ns  p75: 76.97ns  p99: 105.22ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 53049.43,
            "range": "± 2076",
            "unit": "ns/iter",
            "extra": "min: 39956.00ns  p75: 54569.00ns  p99: 72992.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 72562.41,
            "range": "± 7373",
            "unit": "ns/iter",
            "extra": "min: 52981.00ns  p75: 76468.00ns  p99: 189374.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 58803.42,
            "range": "± 3525.5",
            "unit": "ns/iter",
            "extra": "min: 45059.00ns  p75: 60970.00ns  p99: 119885.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 130707.12,
            "range": "± 7387",
            "unit": "ns/iter",
            "extra": "min: 112311.00ns  p75: 134857.00ns  p99: 246184.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 336.96,
            "range": "± 24.79",
            "unit": "ns/iter",
            "extra": "min: 297.76ns  p75: 362.74ns  p99: 390.26ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1077.36,
            "range": "± 28.27",
            "unit": "ns/iter",
            "extra": "min: 1020.80ns  p75: 1096.29ns  p99: 1239.11ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1769.51,
            "range": "± 48.8",
            "unit": "ns/iter",
            "extra": "min: 1676.75ns  p75: 1808.69ns  p99: 2010.54ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 178.07,
            "range": "± 3.01",
            "unit": "ns/iter",
            "extra": "min: 167.00ns  p75: 178.99ns  p99: 212.04ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 313.2,
            "range": "± 5.84",
            "unit": "ns/iter",
            "extra": "min: 292.22ns  p75: 312.83ns  p99: 386.56ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 652.52,
            "range": "± 20.27",
            "unit": "ns/iter",
            "extra": "min: 606.58ns  p75: 665.60ns  p99: 762.84ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 37.99,
            "range": "± 1.79",
            "unit": "ns/iter",
            "extra": "min: 31.17ns  p75: 38.84ns  p99: 65.07ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 49.17,
            "range": "± 3.1",
            "unit": "ns/iter",
            "extra": "min: 41.84ns  p75: 51.56ns  p99: 70.76ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1551.62,
            "range": "± 53.81",
            "unit": "ns/iter",
            "extra": "min: 1438.08ns  p75: 1583.54ns  p99: 1977.14ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1483.2,
            "range": "± 31.93",
            "unit": "ns/iter",
            "extra": "min: 1409.15ns  p75: 1502.48ns  p99: 1657.59ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 80.83,
            "range": "± 4.31",
            "unit": "ns/iter",
            "extra": "min: 71.76ns  p75: 83.65ns  p99: 121.21ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 98.93,
            "range": "± 6.91",
            "unit": "ns/iter",
            "extra": "min: 84.16ns  p75: 103.30ns  p99: 171.71ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7400.51,
            "range": "± 460",
            "unit": "ns/iter",
            "extra": "min: 6082.00ns  p75: 7600.00ns  p99: 14037.00ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 8366.35,
            "range": "± 178.72",
            "unit": "ns/iter",
            "extra": "min: 8085.69ns  p75: 8527.97ns  p99: 8667.40ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 530938.9,
            "range": "± 17152",
            "unit": "ns/iter",
            "extra": "min: 492816.00ns  p75: 538515.00ns  p99: 705593.00ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "fbecc5dc454235752264a49edf3ca45aca45054a",
          "message": "Bump js-yaml from 4.2.0 to 4.3.0 in the npm_and_yarn group across 1 directory (#63)\n\nBump js-yaml in the npm_and_yarn group across 1 directory\n\nBumps the npm_and_yarn group with 1 update in the / directory: [js-yaml](https://github.com/nodeca/js-yaml).\n\n\nUpdates `js-yaml` from 4.2.0 to 4.3.0\n- [Changelog](https://github.com/nodeca/js-yaml/blob/master/CHANGELOG.md)\n- [Commits](https://github.com/nodeca/js-yaml/compare/4.2.0...4.3.0)\n\n---\nupdated-dependencies:\n- dependency-name: js-yaml\n  dependency-version: 4.3.0\n  dependency-type: indirect\n  dependency-group: npm_and_yarn\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Tom Pereira <10725179+TomStrepsil@users.noreply.github.com>",
          "timestamp": "2026-07-22T18:13:11+01:00",
          "tree_id": "851a21c8342c3e0ba0743144c9a95ccdfbcbc2f4",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/fbecc5dc454235752264a49edf3ca45aca45054a"
        },
        "date": 1784740430585,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 42.47,
            "range": "± 0.34",
            "unit": "ns/iter",
            "extra": "min: 39.40ns  p75: 41.32ns  p99: 80.05ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 89.7,
            "range": "± 1.84",
            "unit": "ns/iter",
            "extra": "min: 84.59ns  p75: 89.11ns  p99: 128.68ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 90.37,
            "range": "± 1.73",
            "unit": "ns/iter",
            "extra": "min: 86.12ns  p75: 91.03ns  p99: 119.68ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.49,
            "range": "± 0.11",
            "unit": "ns/iter",
            "extra": "min: 33.35ns  p75: 33.78ns  p99: 53.52ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 75.18,
            "range": "± 1.34",
            "unit": "ns/iter",
            "extra": "min: 72.62ns  p75: 76.34ns  p99: 97.92ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 80.86,
            "range": "± 1.56",
            "unit": "ns/iter",
            "extra": "min: 74.99ns  p75: 79.19ns  p99: 122.84ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 58935.16,
            "range": "± 376",
            "unit": "ns/iter",
            "extra": "min: 55654.00ns  p75: 58179.00ns  p99: 73157.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 74815.11,
            "range": "± 2209",
            "unit": "ns/iter",
            "extra": "min: 70202.00ns  p75: 75962.00ns  p99: 101550.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 59241.23,
            "range": "± 621",
            "unit": "ns/iter",
            "extra": "min: 55184.00ns  p75: 58620.00ns  p99: 74059.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 163985.66,
            "range": "± 1347",
            "unit": "ns/iter",
            "extra": "min: 154810.00ns  p75: 159278.00ns  p99: 324488.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 374.78,
            "range": "± 1.25",
            "unit": "ns/iter",
            "extra": "min: 370.11ns  p75: 374.91ns  p99: 391.71ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1369.45,
            "range": "± 9.26",
            "unit": "ns/iter",
            "extra": "min: 1351.50ns  p75: 1376.98ns  p99: 1406.16ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1986.79,
            "range": "± 13.23",
            "unit": "ns/iter",
            "extra": "min: 1918.68ns  p75: 1960.96ns  p99: 2869.93ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 209.01,
            "range": "± 0.62",
            "unit": "ns/iter",
            "extra": "min: 202.83ns  p75: 207.14ns  p99: 239.85ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 396.68,
            "range": "± 3.88",
            "unit": "ns/iter",
            "extra": "min: 381.57ns  p75: 397.39ns  p99: 422.34ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 747.92,
            "range": "± 5.85",
            "unit": "ns/iter",
            "extra": "min: 728.96ns  p75: 750.09ns  p99: 795.94ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 41.58,
            "range": "± 0.21",
            "unit": "ns/iter",
            "extra": "min: 40.05ns  p75: 40.74ns  p99: 67.24ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 57.35,
            "range": "± 1.29",
            "unit": "ns/iter",
            "extra": "min: 55.36ns  p75: 58.33ns  p99: 78.57ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1939.5,
            "range": "± 12.68",
            "unit": "ns/iter",
            "extra": "min: 1896.83ns  p75: 1930.73ns  p99: 2251.74ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1849.38,
            "range": "± 12.1",
            "unit": "ns/iter",
            "extra": "min: 1820.25ns  p75: 1851.66ns  p99: 2052.27ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 96.67,
            "range": "± 1.06",
            "unit": "ns/iter",
            "extra": "min: 91.22ns  p75: 96.33ns  p99: 141.21ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 109.62,
            "range": "± 1.27",
            "unit": "ns/iter",
            "extra": "min: 105.33ns  p75: 109.07ns  p99: 159.07ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7936.35,
            "range": "± 85",
            "unit": "ns/iter",
            "extra": "min: 7474.00ns  p75: 7845.00ns  p99: 14958.00ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 10859.04,
            "range": "± 22.26",
            "unit": "ns/iter",
            "extra": "min: 10800.28ns  p75: 10868.57ns  p99: 10931.53ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 636794.85,
            "range": "± 7965",
            "unit": "ns/iter",
            "extra": "min: 614307.00ns  p75: 636904.00ns  p99: 815630.00ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "github-actions[bot]@users.noreply.github.com",
            "name": "github-actions[bot]",
            "username": "github-actions[bot]"
          },
          "committer": {
            "email": "github-actions[bot]@users.noreply.github.com",
            "name": "github-actions[bot]",
            "username": "github-actions[bot]"
          },
          "distinct": true,
          "id": "d075df82285e5d594d1e6cdb269b976fe3539430",
          "message": "Release version 1.0.0",
          "timestamp": "2026-07-22T17:14:03Z",
          "tree_id": "fc209592816588edeee0d6754328e367f122c79e",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/d075df82285e5d594d1e6cdb269b976fe3539430"
        },
        "date": 1784740484884,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 42.94,
            "range": "± 0.36",
            "unit": "ns/iter",
            "extra": "min: 39.80ns  p75: 41.58ns  p99: 82.21ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 90.52,
            "range": "± 1.63",
            "unit": "ns/iter",
            "extra": "min: 84.72ns  p75: 89.34ns  p99: 132.57ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 92.07,
            "range": "± 1.47",
            "unit": "ns/iter",
            "extra": "min: 87.03ns  p75: 92.29ns  p99: 123.34ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 36.61,
            "range": "± 1.67",
            "unit": "ns/iter",
            "extra": "min: 33.43ns  p75: 37.16ns  p99: 57.38ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 76.12,
            "range": "± 1.26",
            "unit": "ns/iter",
            "extra": "min: 72.81ns  p75: 76.61ns  p99: 101.37ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 81.13,
            "range": "± 1.42",
            "unit": "ns/iter",
            "extra": "min: 74.99ns  p75: 79.14ns  p99: 123.02ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 56880.17,
            "range": "± 1823.5",
            "unit": "ns/iter",
            "extra": "min: 52311.00ns  p75: 57447.00ns  p99: 83807.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 74262.68,
            "range": "± 1328",
            "unit": "ns/iter",
            "extra": "min: 70358.00ns  p75: 74368.00ns  p99: 90472.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 59825.36,
            "range": "± 1101.5",
            "unit": "ns/iter",
            "extra": "min: 55064.00ns  p75: 59852.00ns  p99: 75422.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 188180.42,
            "range": "± 2054",
            "unit": "ns/iter",
            "extra": "min: 175842.00ns  p75: 183897.00ns  p99: 346303.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 362.82,
            "range": "± 1.29",
            "unit": "ns/iter",
            "extra": "min: 356.95ns  p75: 361.57ns  p99: 383.50ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1364.27,
            "range": "± 6.93",
            "unit": "ns/iter",
            "extra": "min: 1349.60ns  p75: 1370.06ns  p99: 1388.49ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1945.49,
            "range": "± 9.26",
            "unit": "ns/iter",
            "extra": "min: 1924.46ns  p75: 1949.82ns  p99: 2009.08ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 216.32,
            "range": "± 0.59",
            "unit": "ns/iter",
            "extra": "min: 208.85ns  p75: 216.26ns  p99: 236.84ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 401.34,
            "range": "± 4.6",
            "unit": "ns/iter",
            "extra": "min: 388.23ns  p75: 405.27ns  p99: 425.26ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 699.09,
            "range": "± 2.79",
            "unit": "ns/iter",
            "extra": "min: 684.46ns  p75: 698.84ns  p99: 745.19ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 41.75,
            "range": "± 0.2",
            "unit": "ns/iter",
            "extra": "min: 40.17ns  p75: 40.94ns  p99: 65.83ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 58.21,
            "range": "± 1.17",
            "unit": "ns/iter",
            "extra": "min: 55.80ns  p75: 58.82ns  p99: 87.12ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1974.48,
            "range": "± 9.63",
            "unit": "ns/iter",
            "extra": "min: 1941.55ns  p75: 1969.72ns  p99: 2142.85ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1886.88,
            "range": "± 3.13",
            "unit": "ns/iter",
            "extra": "min: 1870.58ns  p75: 1880.83ns  p99: 1976.05ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 93.52,
            "range": "± 1.38",
            "unit": "ns/iter",
            "extra": "min: 88.86ns  p75: 94.07ns  p99: 116.98ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 110.24,
            "range": "± 1.26",
            "unit": "ns/iter",
            "extra": "min: 106.00ns  p75: 110.61ns  p99: 141.37ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7962.99,
            "range": "± 40",
            "unit": "ns/iter",
            "extra": "min: 7634.00ns  p75: 7785.00ns  p99: 14648.00ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 10999.56,
            "range": "± 26.7",
            "unit": "ns/iter",
            "extra": "min: 10943.09ns  p75: 11014.59ns  p99: 11061.23ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 641081.92,
            "range": "± 6828.5",
            "unit": "ns/iter",
            "extra": "min: 620431.00ns  p75: 639619.00ns  p99: 840311.00ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ca9886c86cfda05e015725f19a6a1c510b4f9f5d",
          "message": "[68] Add construction cost benchmark (#69)\n\n* add construction cost benchmark",
          "timestamp": "2026-07-28T13:01:02+01:00",
          "tree_id": "bc22cdbff840c7b29a50834576f22d6ec00db50c",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/ca9886c86cfda05e015725f19a6a1c510b4f9f5d"
        },
        "date": 1785240114928,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 42.5,
            "range": "± 0.25",
            "unit": "ns/iter",
            "extra": "min: 39.38ns  p75: 41.11ns  p99: 82.69ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 89.98,
            "range": "± 1.76",
            "unit": "ns/iter",
            "extra": "min: 84.55ns  p75: 88.49ns  p99: 140.12ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 91.85,
            "range": "± 1.6",
            "unit": "ns/iter",
            "extra": "min: 87.20ns  p75: 92.61ns  p99: 111.51ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.69,
            "range": "± 0.09",
            "unit": "ns/iter",
            "extra": "min: 33.37ns  p75: 33.75ns  p99: 56.13ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 77.25,
            "range": "± 1.32",
            "unit": "ns/iter",
            "extra": "min: 72.00ns  p75: 76.50ns  p99: 160.95ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 80.81,
            "range": "± 1.33",
            "unit": "ns/iter",
            "extra": "min: 74.92ns  p75: 78.86ns  p99: 120.90ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 56534.67,
            "range": "± 3206",
            "unit": "ns/iter",
            "extra": "min: 52248.00ns  p75: 59562.00ns  p99: 77024.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 74364.99,
            "range": "± 1192.5",
            "unit": "ns/iter",
            "extra": "min: 70292.00ns  p75: 74159.00ns  p99: 96891.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 59731.6,
            "range": "± 902",
            "unit": "ns/iter",
            "extra": "min: 55353.00ns  p75: 59041.00ns  p99: 88656.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 172385.85,
            "range": "± 6527.5",
            "unit": "ns/iter",
            "extra": "min: 151273.00ns  p75: 167955.00ns  p99: 342212.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 361.71,
            "range": "± 1.61",
            "unit": "ns/iter",
            "extra": "min: 356.27ns  p75: 362.17ns  p99: 382.76ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1368.69,
            "range": "± 7.34",
            "unit": "ns/iter",
            "extra": "min: 1353.51ns  p75: 1375.11ns  p99: 1394.47ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1997.86,
            "range": "± 11.23",
            "unit": "ns/iter",
            "extra": "min: 1971.40ns  p75: 2006.15ns  p99: 2075.21ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 209.96,
            "range": "± 0.53",
            "unit": "ns/iter",
            "extra": "min: 204.27ns  p75: 207.33ns  p99: 297.76ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 385.88,
            "range": "± 2.14",
            "unit": "ns/iter",
            "extra": "min: 378.28ns  p75: 386.94ns  p99: 403.94ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 756.6,
            "range": "± 3.69",
            "unit": "ns/iter",
            "extra": "min: 743.17ns  p75: 756.35ns  p99: 800.10ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 41.23,
            "range": "± 0.11",
            "unit": "ns/iter",
            "extra": "min: 40.10ns  p75: 40.56ns  p99: 58.64ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 57.23,
            "range": "± 1.23",
            "unit": "ns/iter",
            "extra": "min: 55.48ns  p75: 58.36ns  p99: 76.74ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1939.23,
            "range": "± 11.27",
            "unit": "ns/iter",
            "extra": "min: 1912.41ns  p75: 1943.30ns  p99: 2047.23ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1862.71,
            "range": "± 8.68",
            "unit": "ns/iter",
            "extra": "min: 1845.89ns  p75: 1869.52ns  p99: 1906.37ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 91.71,
            "range": "± 1.05",
            "unit": "ns/iter",
            "extra": "min: 87.40ns  p75: 92.25ns  p99: 116.97ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 109.13,
            "range": "± 1.26",
            "unit": "ns/iter",
            "extra": "min: 102.67ns  p75: 109.19ns  p99: 134.12ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7827.83,
            "range": "± 155",
            "unit": "ns/iter",
            "extra": "min: 7484.00ns  p75: 7865.00ns  p99: 14657.00ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 10918.88,
            "range": "± 23.07",
            "unit": "ns/iter",
            "extra": "min: 10875.57ns  p75: 10935.05ns  p99: 10948.49ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 630057.78,
            "range": "± 8816.5",
            "unit": "ns/iter",
            "extra": "min: 606677.00ns  p75: 632446.00ns  p99: 720211.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 100.98,
            "range": "± 1.24",
            "unit": "ns/iter",
            "extra": "min: 97.61ns  p75: 101.44ns  p99: 121.59ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 2955.58,
            "range": "± 16.33",
            "unit": "ns/iter",
            "extra": "min: 2901.40ns  p75: 2941.92ns  p99: 3285.37ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 3535.77,
            "range": "± 20.42",
            "unit": "ns/iter",
            "extra": "min: 3445.35ns  p75: 3501.09ns  p99: 4348.57ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 145.61,
            "range": "± 1.65",
            "unit": "ns/iter",
            "extra": "min: 138.71ns  p75: 146.01ns  p99: 202.81ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 4353.33,
            "range": "± 17.03",
            "unit": "ns/iter",
            "extra": "min: 4296.27ns  p75: 4344.88ns  p99: 4429.79ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 4923.96,
            "range": "± 27.64",
            "unit": "ns/iter",
            "extra": "min: 4865.28ns  p75: 4940.27ns  p99: 5034.18ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 157.13,
            "range": "± 1.20",
            "unit": "ns/iter",
            "extra": "min: 152.77ns  p75: 157.76ns  p99: 171.34ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 10056.42,
            "range": "± 578.30",
            "unit": "ns/iter",
            "extra": "min: 8106.31ns  p75: 10786.51ns  p99: 11244.84ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 10539.34,
            "range": "± 968.82",
            "unit": "ns/iter",
            "extra": "min: 9143.25ns  p75: 11171.43ns  p99: 11585.65ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3da3428d048de30e07f49c9abf2de2c896fae6b4",
          "message": "[FEATURE] Export discovered regex features during source walk (#70)\n\n* Add features export\n* Correct placement of backreferences &  prefix-ambiguous top-level alternation in docs\n* Remove confusing \"multi-engine consistency\" comparison from parity tables",
          "timestamp": "2026-07-28T13:44:19+01:00",
          "tree_id": "0ab20a440b86fc226ef2286611c05a8c26fcb20f",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/3da3428d048de30e07f49c9abf2de2c896fae6b4"
        },
        "date": 1785242706200,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 30.24,
            "range": "± 1.17",
            "unit": "ns/iter",
            "extra": "min: 26.15ns  p75: 30.40ns  p99: 57.55ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 61.75,
            "range": "± 1.73",
            "unit": "ns/iter",
            "extra": "min: 56.13ns  p75: 62.23ns  p99: 93.46ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 61.78,
            "range": "± 1.69",
            "unit": "ns/iter",
            "extra": "min: 57.60ns  p75: 63.06ns  p99: 78.56ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 23.84,
            "range": "± 0.49",
            "unit": "ns/iter",
            "extra": "min: 21.59ns  p75: 23.78ns  p99: 41.43ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 51.22,
            "range": "± 1.8",
            "unit": "ns/iter",
            "extra": "min: 45.96ns  p75: 52.56ns  p99: 68.16ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 55.61,
            "range": "± 2.18",
            "unit": "ns/iter",
            "extra": "min: 48.49ns  p75: 55.92ns  p99: 85.85ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 36339.78,
            "range": "± 967.5",
            "unit": "ns/iter",
            "extra": "min: 32041.00ns  p75: 36327.00ns  p99: 54315.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 47011.87,
            "range": "± 1022.5",
            "unit": "ns/iter",
            "extra": "min: 42019.00ns  p75: 46913.00ns  p99: 64650.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 46859.91,
            "range": "± 2596.13",
            "unit": "ns/iter",
            "extra": "min: 42415.29ns  p75: 48661.00ns  p99: 49131.26ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 112183.88,
            "range": "± 2256.5",
            "unit": "ns/iter",
            "extra": "min: 103221.00ns  p75: 111039.00ns  p99: 193833.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 288.4,
            "range": "± 2.7",
            "unit": "ns/iter",
            "extra": "min: 279.05ns  p75: 289.33ns  p99: 308.15ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 983.68,
            "range": "± 6.42",
            "unit": "ns/iter",
            "extra": "min: 959.65ns  p75: 989.68ns  p99: 1012.01ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1592.94,
            "range": "± 12.73",
            "unit": "ns/iter",
            "extra": "min: 1558.37ns  p75: 1603.93ns  p99: 1630.89ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 152.82,
            "range": "± 11.47",
            "unit": "ns/iter",
            "extra": "min: 133.27ns  p75: 162.86ns  p99: 176.03ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 241.33,
            "range": "± 2.92",
            "unit": "ns/iter",
            "extra": "min: 233.04ns  p75: 243.83ns  p99: 258.34ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 517.52,
            "range": "± 18.51",
            "unit": "ns/iter",
            "extra": "min: 470.95ns  p75: 517.85ns  p99: 691.53ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 30.06,
            "range": "± 0.88",
            "unit": "ns/iter",
            "extra": "min: 26.12ns  p75: 30.38ns  p99: 47.81ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 43.67,
            "range": "± 2.53",
            "unit": "ns/iter",
            "extra": "min: 35.98ns  p75: 44.95ns  p99: 67.31ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1310.44,
            "range": "± 13.37",
            "unit": "ns/iter",
            "extra": "min: 1148.40ns  p75: 1355.87ns  p99: 1410.55ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1148.87,
            "range": "± 11.74",
            "unit": "ns/iter",
            "extra": "min: 1120.06ns  p75: 1153.59ns  p99: 1248.22ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 74.73,
            "range": "± 4.89",
            "unit": "ns/iter",
            "extra": "min: 65.51ns  p75: 77.57ns  p99: 110.05ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 82.2,
            "range": "± 2.55",
            "unit": "ns/iter",
            "extra": "min: 75.00ns  p75: 83.88ns  p99: 110.10ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 5390.36,
            "range": "± 106.5",
            "unit": "ns/iter",
            "extra": "min: 5031.00ns  p75: 5371.00ns  p99: 8151.00ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 6666.22,
            "range": "± 32.55",
            "unit": "ns/iter",
            "extra": "min: 6528.05ns  p75: 6635.08ns  p99: 7100.96ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 424550.37,
            "range": "± 6904.5",
            "unit": "ns/iter",
            "extra": "min: 406615.00ns  p75: 426705.00ns  p99: 532274.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 55.69,
            "range": "± 0.85",
            "unit": "ns/iter",
            "extra": "min: 53.27ns  p75: 55.98ns  p99: 76.32ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 1839.71,
            "range": "± 48.25",
            "unit": "ns/iter",
            "extra": "min: 1754.21ns  p75: 1870.41ns  p99: 2104.86ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 2278.29,
            "range": "± 36.56",
            "unit": "ns/iter",
            "extra": "min: 2179.25ns  p75: 2297.23ns  p99: 2581.34ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 85.02,
            "range": "± 1.21",
            "unit": "ns/iter",
            "extra": "min: 81.30ns  p75: 85.26ns  p99: 113.00ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 3054.71,
            "range": "± 51.21",
            "unit": "ns/iter",
            "extra": "min: 2930.05ns  p75: 3086.67ns  p99: 3308.51ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 3468.03,
            "range": "± 43.51",
            "unit": "ns/iter",
            "extra": "min: 3380.82ns  p75: 3503.36ns  p99: 3619.30ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 91.9,
            "range": "± 1.09",
            "unit": "ns/iter",
            "extra": "min: 87.82ns  p75: 92.37ns  p99: 112.17ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 6428.8,
            "range": "± 259.15",
            "unit": "ns/iter",
            "extra": "min: 5408.11ns  p75: 6742.76ns  p99: 6965.78ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 6670.06,
            "range": "± 562.2",
            "unit": "ns/iter",
            "extra": "min: 5772.41ns  p75: 7032.76ns  p99: 7260.76ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "github-actions[bot]@users.noreply.github.com",
            "name": "github-actions[bot]",
            "username": "github-actions[bot]"
          },
          "committer": {
            "email": "github-actions[bot]@users.noreply.github.com",
            "name": "github-actions[bot]",
            "username": "github-actions[bot]"
          },
          "distinct": true,
          "id": "1f72e943761e0b188f43f6c61f28fe77fcb5f76d",
          "message": "Release version 1.1.0",
          "timestamp": "2026-07-28T12:48:38Z",
          "tree_id": "d987089a4409a645cfae1a15edfc826164e544f1",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/1f72e943761e0b188f43f6c61f28fe77fcb5f76d"
        },
        "date": 1785242972179,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 47.04,
            "range": "± 3.13",
            "unit": "ns/iter",
            "extra": "min: 40.71ns  p75: 48.61ns  p99: 80.99ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 94.9,
            "range": "± 6.08",
            "unit": "ns/iter",
            "extra": "min: 82.87ns  p75: 98.04ns  p99: 153.99ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 94.76,
            "range": "± 5.02",
            "unit": "ns/iter",
            "extra": "min: 85.04ns  p75: 98.49ns  p99: 142.44ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 40.12,
            "range": "± 2.17",
            "unit": "ns/iter",
            "extra": "min: 35.44ns  p75: 41.16ns  p99: 74.20ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 80.94,
            "range": "± 5.86",
            "unit": "ns/iter",
            "extra": "min: 71.17ns  p75: 85.66ns  p99: 112.82ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 81.71,
            "range": "± 5.22",
            "unit": "ns/iter",
            "extra": "min: 73.93ns  p75: 86.67ns  p99: 103.89ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 51395.19,
            "range": "± 794",
            "unit": "ns/iter",
            "extra": "min: 46217.00ns  p75: 49965.00ns  p99: 73544.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 68633.05,
            "range": "± 2255",
            "unit": "ns/iter",
            "extra": "min: 61357.00ns  p75: 68695.00ns  p99: 91908.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 57186.97,
            "range": "± 976",
            "unit": "ns/iter",
            "extra": "min: 51614.00ns  p75: 56025.00ns  p99: 80027.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 163702.16,
            "range": "± 3325",
            "unit": "ns/iter",
            "extra": "min: 154260.00ns  p75: 162936.00ns  p99: 332924.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 329.61,
            "range": "± 2.87",
            "unit": "ns/iter",
            "extra": "min: 318.33ns  p75: 329.87ns  p99: 351.14ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1243.94,
            "range": "± 9.53",
            "unit": "ns/iter",
            "extra": "min: 1224.13ns  p75: 1252.86ns  p99: 1273.64ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 2041.48,
            "range": "± 10.76",
            "unit": "ns/iter",
            "extra": "min: 2015.69ns  p75: 2045.89ns  p99: 2111.64ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 196.51,
            "range": "± 1.89",
            "unit": "ns/iter",
            "extra": "min: 189.42ns  p75: 197.02ns  p99: 213.25ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 366.67,
            "range": "± 5.84",
            "unit": "ns/iter",
            "extra": "min: 352.69ns  p75: 369.73ns  p99: 389.57ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 735.28,
            "range": "± 4.46",
            "unit": "ns/iter",
            "extra": "min: 715.92ns  p75: 734.86ns  p99: 805.88ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 44.61,
            "range": "± 1.87",
            "unit": "ns/iter",
            "extra": "min: 40.24ns  p75: 45.39ns  p99: 63.91ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 61.32,
            "range": "± 3.29",
            "unit": "ns/iter",
            "extra": "min: 56.21ns  p75: 64.19ns  p99: 93.70ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1889.15,
            "range": "± 47.28",
            "unit": "ns/iter",
            "extra": "min: 1822.67ns  p75: 1935.81ns  p99: 2094.45ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1869.51,
            "range": "± 22.06",
            "unit": "ns/iter",
            "extra": "min: 1794.35ns  p75: 1856.60ns  p99: 2488.67ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 87.74,
            "range": "± 3.61",
            "unit": "ns/iter",
            "extra": "min: 81.47ns  p75: 90.76ns  p99: 129.03ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 108.95,
            "range": "± 4.36",
            "unit": "ns/iter",
            "extra": "min: 99.46ns  p75: 111.16ns  p99: 171.43ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7431.42,
            "range": "± 211",
            "unit": "ns/iter",
            "extra": "min: 6774.00ns  p75: 7485.00ns  p99: 13188.00ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 10523.88,
            "range": "± 24.77",
            "unit": "ns/iter",
            "extra": "min: 10452.74ns  p75: 10535.94ns  p99: 10626.52ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 592958.72,
            "range": "± 9178",
            "unit": "ns/iter",
            "extra": "min: 564275.00ns  p75: 594401.00ns  p99: 824511.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 91.19,
            "range": "± 2.34",
            "unit": "ns/iter",
            "extra": "min: 82.03ns  p75: 92.32ns  p99: 120.39ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 3241.05,
            "range": "± 24.69",
            "unit": "ns/iter",
            "extra": "min: 3171.28ns  p75: 3240.19ns  p99: 3507.03ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 3787.98,
            "range": "± 28.94",
            "unit": "ns/iter",
            "extra": "min: 3720.04ns  p75: 3791.55ns  p99: 3974.41ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 126.32,
            "range": "± 2.09",
            "unit": "ns/iter",
            "extra": "min: 118.07ns  p75: 127.33ns  p99: 148.60ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 4913.07,
            "range": "± 44.73",
            "unit": "ns/iter",
            "extra": "min: 4792.20ns  p75: 4925.49ns  p99: 5020.72ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 5425.54,
            "range": "± 21.71",
            "unit": "ns/iter",
            "extra": "min: 5371.39ns  p75: 5442.87ns  p99: 5513.16ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 131.88,
            "range": "± 1.97",
            "unit": "ns/iter",
            "extra": "min: 124.18ns  p75: 132.86ns  p99: 155.03ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 10750.17,
            "range": "± 554.6",
            "unit": "ns/iter",
            "extra": "min: 9056.30ns  p75: 11396.19ns  p99: 11480.04ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 11471.15,
            "range": "± 107.38",
            "unit": "ns/iter",
            "extra": "min: 9891.29ns  p75: 11756.70ns  p99: 12065.12ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bbf600ff07ee2897f37e6249d8474d95354cc7d5",
          "message": "Bump the npm_and_yarn group across 1 directory with 2 updates (#71)\n\nBumps the npm_and_yarn group with 2 updates in the / directory: [brace-expansion](https://github.com/juliangruber/brace-expansion) and [postcss](https://github.com/postcss/postcss).\n\n\nUpdates `brace-expansion` from 1.1.15 to 1.1.16\n- [Release notes](https://github.com/juliangruber/brace-expansion/releases)\n- [Commits](https://github.com/juliangruber/brace-expansion/compare/v1.1.15...v1.1.16)\n\nUpdates `postcss` from 8.5.15 to 8.5.24\n- [Release notes](https://github.com/postcss/postcss/releases)\n- [Changelog](https://github.com/postcss/postcss/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/postcss/postcss/compare/8.5.15...8.5.24)\n\n---\nupdated-dependencies:\n- dependency-name: brace-expansion\n  dependency-version: 1.1.16\n  dependency-type: indirect\n  dependency-group: npm_and_yarn\n- dependency-name: postcss\n  dependency-version: 8.5.24\n  dependency-type: indirect\n  dependency-group: npm_and_yarn\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-07-28T20:50:31+01:00",
          "tree_id": "c48cec2cf0a128bd5b7a550a3c2f506b620fbd0a",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/bbf600ff07ee2897f37e6249d8474d95354cc7d5"
        },
        "date": 1785268279320,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 43.48,
            "range": "± 0.89",
            "unit": "ns/iter",
            "extra": "min: 39.32ns  p75: 42.40ns  p99: 91.26ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 93.04,
            "range": "± 1.77",
            "unit": "ns/iter",
            "extra": "min: 83.67ns  p75: 89.04ns  p99: 186.45ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 93.81,
            "range": "± 1.67",
            "unit": "ns/iter",
            "extra": "min: 87.24ns  p75: 92.15ns  p99: 194.82ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.41,
            "range": "± 0.08",
            "unit": "ns/iter",
            "extra": "min: 33.36ns  p75: 33.71ns  p99: 52.20ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 75.61,
            "range": "± 1.26",
            "unit": "ns/iter",
            "extra": "min: 72.60ns  p75: 76.45ns  p99: 93.17ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 80.66,
            "range": "± 1.37",
            "unit": "ns/iter",
            "extra": "min: 75.03ns  p75: 78.95ns  p99: 120.10ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 55450.72,
            "range": "± 306",
            "unit": "ns/iter",
            "extra": "min: 53400.00ns  p75: 54642.00ns  p99: 71674.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 74920.11,
            "range": "± 1167",
            "unit": "ns/iter",
            "extra": "min: 70301.00ns  p75: 74199.00ns  p99: 135233.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 59329.84,
            "range": "± 796.5",
            "unit": "ns/iter",
            "extra": "min: 55263.00ns  p75: 58592.00ns  p99: 102867.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 168329.83,
            "range": "± 1583",
            "unit": "ns/iter",
            "extra": "min: 158734.00ns  p75: 164474.00ns  p99: 327026.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 362.67,
            "range": "± 1.15",
            "unit": "ns/iter",
            "extra": "min: 358.66ns  p75: 362.92ns  p99: 379.89ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1384.71,
            "range": "± 3.63",
            "unit": "ns/iter",
            "extra": "min: 1367.23ns  p75: 1387.61ns  p99: 1401.84ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 2133.58,
            "range": "± 13.13",
            "unit": "ns/iter",
            "extra": "min: 2098.68ns  p75: 2145.65ns  p99: 2182.41ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 206,
            "range": "± 0.46",
            "unit": "ns/iter",
            "extra": "min: 203.21ns  p75: 206.06ns  p99: 222.26ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 376.54,
            "range": "± 1.54",
            "unit": "ns/iter",
            "extra": "min: 370.86ns  p75: 377.18ns  p99: 395.44ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 748.91,
            "range": "± 2.56",
            "unit": "ns/iter",
            "extra": "min: 740.54ns  p75: 748.54ns  p99: 782.06ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 42.95,
            "range": "± 0.59",
            "unit": "ns/iter",
            "extra": "min: 40.03ns  p75: 41.50ns  p99: 82.57ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 62.3,
            "range": "± 1.39",
            "unit": "ns/iter",
            "extra": "min: 56.27ns  p75: 59.67ns  p99: 119.64ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1932.07,
            "range": "± 7.75",
            "unit": "ns/iter",
            "extra": "min: 1906.38ns  p75: 1925.62ns  p99: 2128.13ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1870.76,
            "range": "± 7.31",
            "unit": "ns/iter",
            "extra": "min: 1846.33ns  p75: 1874.22ns  p99: 1986.12ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 93.06,
            "range": "± 1.32",
            "unit": "ns/iter",
            "extra": "min: 87.30ns  p75: 93.58ns  p99: 113.01ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 108.98,
            "range": "± 1.25",
            "unit": "ns/iter",
            "extra": "min: 102.78ns  p75: 108.25ns  p99: 234.64ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7893.83,
            "range": "± 45",
            "unit": "ns/iter",
            "extra": "min: 7554.00ns  p75: 7725.00ns  p99: 15349.00ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 10989.86,
            "range": "± 29.08",
            "unit": "ns/iter",
            "extra": "min: 10928.74ns  p75: 11014.81ns  p99: 11045.48ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 629079.11,
            "range": "± 6783",
            "unit": "ns/iter",
            "extra": "min: 611107.00ns  p75: 630543.00ns  p99: 702698.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 97.89,
            "range": "± 1.28",
            "unit": "ns/iter",
            "extra": "min: 95.61ns  p75: 98.77ns  p99: 110.54ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 3097.83,
            "range": "± 15.81",
            "unit": "ns/iter",
            "extra": "min: 3059.92ns  p75: 3096.02ns  p99: 3220.50ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 3565.75,
            "range": "± 13.72",
            "unit": "ns/iter",
            "extra": "min: 3541.08ns  p75: 3575.09ns  p99: 3623.62ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 142.06,
            "range": "± 1.68",
            "unit": "ns/iter",
            "extra": "min: 137.33ns  p75: 143.22ns  p99: 160.08ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 4785.53,
            "range": "± 19.84",
            "unit": "ns/iter",
            "extra": "min: 4747.41ns  p75: 4801.48ns  p99: 4846.90ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 5328.3,
            "range": "± 10.64",
            "unit": "ns/iter",
            "extra": "min: 5290.59ns  p75: 5333.52ns  p99: 5372.36ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 154.76,
            "range": "± 1.14",
            "unit": "ns/iter",
            "extra": "min: 150.15ns  p75: 154.41ns  p99: 179.99ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 10564.47,
            "range": "± 488.22",
            "unit": "ns/iter",
            "extra": "min: 9063.91ns  p75: 11134.19ns  p99: 11355.37ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 11190.51,
            "range": "± 552.2",
            "unit": "ns/iter",
            "extra": "min: 9917.17ns  p75: 11472.25ns  p99: 11996.51ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "github-actions[bot]@users.noreply.github.com",
            "name": "github-actions[bot]",
            "username": "github-actions[bot]"
          },
          "committer": {
            "email": "github-actions[bot]@users.noreply.github.com",
            "name": "github-actions[bot]",
            "username": "github-actions[bot]"
          },
          "distinct": true,
          "id": "93de52893f8225268acef0b30850f2d074d52692",
          "message": "Release version 1.1.1",
          "timestamp": "2026-08-02T20:13:22Z",
          "tree_id": "d5231ca47dc1ba5f109e804373a90b5a599c3abe",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/93de52893f8225268acef0b30850f2d074d52692"
        },
        "date": 1785701665184,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 42.39,
            "range": "± 0.33",
            "unit": "ns/iter",
            "extra": "min: 39.57ns  p75: 41.34ns  p99: 81.48ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 89.75,
            "range": "± 1.83",
            "unit": "ns/iter",
            "extra": "min: 84.58ns  p75: 88.81ns  p99: 131.06ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 96.28,
            "range": "± 2.6",
            "unit": "ns/iter",
            "extra": "min: 86.70ns  p75: 92.58ns  p99: 195.49ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 38.63,
            "range": "± 1.26",
            "unit": "ns/iter",
            "extra": "min: 33.37ns  p75: 36.09ns  p99: 93.06ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 75.56,
            "range": "± 1.3",
            "unit": "ns/iter",
            "extra": "min: 72.56ns  p75: 76.37ns  p99: 96.21ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 80.65,
            "range": "± 1.37",
            "unit": "ns/iter",
            "extra": "min: 74.69ns  p75: 78.73ns  p99: 123.20ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 52437.94,
            "range": "± 270.5",
            "unit": "ns/iter",
            "extra": "min: 50454.00ns  p75: 51596.00ns  p99: 70942.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 73413.09,
            "range": "± 641.5",
            "unit": "ns/iter",
            "extra": "min: 69921.00ns  p75: 72315.00ns  p99: 97712.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 61315.66,
            "range": "± 952.5",
            "unit": "ns/iter",
            "extra": "min: 55083.00ns  p75: 58029.00ns  p99: 162234.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 165845.04,
            "range": "± 1282",
            "unit": "ns/iter",
            "extra": "min: 156480.00ns  p75: 161188.00ns  p99: 325318.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 375.47,
            "range": "± 1.39",
            "unit": "ns/iter",
            "extra": "min: 366.05ns  p75: 372.27ns  p99: 463.74ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1379.68,
            "range": "± 5.67",
            "unit": "ns/iter",
            "extra": "min: 1357.34ns  p75: 1375.01ns  p99: 1443.77ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1981.17,
            "range": "± 7.11",
            "unit": "ns/iter",
            "extra": "min: 1953.09ns  p75: 1987.33ns  p99: 2019.58ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 209.46,
            "range": "± 0.72",
            "unit": "ns/iter",
            "extra": "min: 204.43ns  p75: 208.74ns  p99: 243.04ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 376.43,
            "range": "± 1.82",
            "unit": "ns/iter",
            "extra": "min: 368.34ns  p75: 375.27ns  p99: 396.77ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 737.97,
            "range": "± 5.09",
            "unit": "ns/iter",
            "extra": "min: 717.65ns  p75: 736.63ns  p99: 824.07ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 41.69,
            "range": "± 0.21",
            "unit": "ns/iter",
            "extra": "min: 40.02ns  p75: 40.72ns  p99: 67.39ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 67.94,
            "range": "± 1.23",
            "unit": "ns/iter",
            "extra": "min: 65.85ns  p75: 68.76ns  p99: 92.20ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 2016.11,
            "range": "± 8.65",
            "unit": "ns/iter",
            "extra": "min: 1956.22ns  p75: 1983.85ns  p99: 2768.05ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1909.1,
            "range": "± 14.65",
            "unit": "ns/iter",
            "extra": "min: 1884.76ns  p75: 1917.21ns  p99: 2020.30ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 92.83,
            "range": "± 1.04",
            "unit": "ns/iter",
            "extra": "min: 87.64ns  p75: 93.14ns  p99: 120.19ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 124.64,
            "range": "± 1.29",
            "unit": "ns/iter",
            "extra": "min: 119.86ns  p75: 125.14ns  p99: 150.97ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 8047.06,
            "range": "± 40.5",
            "unit": "ns/iter",
            "extra": "min: 7734.00ns  p75: 7895.00ns  p99: 15529.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 137.1,
            "range": "± 2.01",
            "unit": "ns/iter",
            "extra": "min: 126.66ns  p75: 138.47ns  p99: 162.42ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 1995.91,
            "range": "± 8.54",
            "unit": "ns/iter",
            "extra": "min: 1964.44ns  p75: 1988.80ns  p99: 2284.57ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 11152.83,
            "range": "± 18.93",
            "unit": "ns/iter",
            "extra": "min: 11118.42ns  p75: 11159.69ns  p99: 11199.17ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 649560.41,
            "range": "± 6527.5",
            "unit": "ns/iter",
            "extra": "min: 629663.00ns  p75: 650553.00ns  p99: 769704.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 98.46,
            "range": "± 1.29",
            "unit": "ns/iter",
            "extra": "min: 95.74ns  p75: 99.34ns  p99: 111.52ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 3149.81,
            "range": "± 34.4",
            "unit": "ns/iter",
            "extra": "min: 3068.61ns  p75: 3164.26ns  p99: 3295.38ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 3605.85,
            "range": "± 22.63",
            "unit": "ns/iter",
            "extra": "min: 3553.04ns  p75: 3625.27ns  p99: 3674.30ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 143.19,
            "range": "± 1.62",
            "unit": "ns/iter",
            "extra": "min: 135.63ns  p75: 144.75ns  p99: 154.82ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 4841.8,
            "range": "± 26.86",
            "unit": "ns/iter",
            "extra": "min: 4769.97ns  p75: 4838.66ns  p99: 5096.86ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 5361.21,
            "range": "± 23.8",
            "unit": "ns/iter",
            "extra": "min: 5318.08ns  p75: 5380.59ns  p99: 5413.07ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 154.13,
            "range": "± 1.18",
            "unit": "ns/iter",
            "extra": "min: 149.91ns  p75: 154.55ns  p99: 176.16ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 10637.67,
            "range": "± 504.34",
            "unit": "ns/iter",
            "extra": "min: 9130.84ns  p75: 11221.75ns  p99: 11552.45ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 11286.4,
            "range": "± 535.59",
            "unit": "ns/iter",
            "extra": "min: 10011.66ns  p75: 11595.12ns  p99: 12038.11ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "github-actions[bot]@users.noreply.github.com",
            "name": "github-actions[bot]",
            "username": "github-actions[bot]"
          },
          "committer": {
            "email": "github-actions[bot]@users.noreply.github.com",
            "name": "github-actions[bot]",
            "username": "github-actions[bot]"
          },
          "distinct": true,
          "id": "74c6a6fb24348c97eecb0ce4af335decd6d4657f",
          "message": "Release version 1.1.2",
          "timestamp": "2026-08-02T22:18:07Z",
          "tree_id": "ce97d5f25a3f6078fe608ae7d295e945329ce64d",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/74c6a6fb24348c97eecb0ce4af335decd6d4657f"
        },
        "date": 1785709150838,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 42.46,
            "range": "± 0.3",
            "unit": "ns/iter",
            "extra": "min: 39.57ns  p75: 41.21ns  p99: 81.73ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 93.1,
            "range": "± 1.84",
            "unit": "ns/iter",
            "extra": "min: 84.90ns  p75: 91.43ns  p99: 172.58ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 92.35,
            "range": "± 1.52",
            "unit": "ns/iter",
            "extra": "min: 86.82ns  p75: 92.59ns  p99: 133.16ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.81,
            "range": "± 0.13",
            "unit": "ns/iter",
            "extra": "min: 33.39ns  p75: 33.89ns  p99: 62.82ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 77.89,
            "range": "± 1.3",
            "unit": "ns/iter",
            "extra": "min: 73.52ns  p75: 78.96ns  p99: 108.01ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 83.78,
            "range": "± 1.67",
            "unit": "ns/iter",
            "extra": "min: 76.20ns  p75: 82.33ns  p99: 124.74ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 53004.37,
            "range": "± 411",
            "unit": "ns/iter",
            "extra": "min: 50455.00ns  p75: 51948.00ns  p99: 82335.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 74963.48,
            "range": "± 741.5",
            "unit": "ns/iter",
            "extra": "min: 69901.00ns  p75: 72897.00ns  p99: 135404.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 59569.68,
            "range": "± 947",
            "unit": "ns/iter",
            "extra": "min: 55164.00ns  p75: 58781.00ns  p99: 92474.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 166083.3,
            "range": "± 1328",
            "unit": "ns/iter",
            "extra": "min: 154130.00ns  p75: 158498.00ns  p99: 341221.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 363.1,
            "range": "± 1.22",
            "unit": "ns/iter",
            "extra": "min: 357.15ns  p75: 361.47ns  p99: 376.18ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1383.36,
            "range": "± 4.82",
            "unit": "ns/iter",
            "extra": "min: 1371.18ns  p75: 1387.02ns  p99: 1405.76ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1987.62,
            "range": "± 24.69",
            "unit": "ns/iter",
            "extra": "min: 1941.88ns  p75: 2014.75ns  p99: 2081.80ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 219.63,
            "range": "± 0.44",
            "unit": "ns/iter",
            "extra": "min: 214.85ns  p75: 218.06ns  p99: 262.17ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 379.74,
            "range": "± 1.95",
            "unit": "ns/iter",
            "extra": "min: 368.34ns  p75: 377.00ns  p99: 483.34ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 713.55,
            "range": "± 7.59",
            "unit": "ns/iter",
            "extra": "min: 675.71ns  p75: 697.75ns  p99: 1202.95ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 41.52,
            "range": "± 0.15",
            "unit": "ns/iter",
            "extra": "min: 40.15ns  p75: 40.79ns  p99: 60.45ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 68.11,
            "range": "± 1.24",
            "unit": "ns/iter",
            "extra": "min: 65.77ns  p75: 68.72ns  p99: 102.54ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1967.74,
            "range": "± 10.39",
            "unit": "ns/iter",
            "extra": "min: 1937.87ns  p75: 1965.57ns  p99: 2162.35ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1915.08,
            "range": "± 13.6",
            "unit": "ns/iter",
            "extra": "min: 1882.69ns  p75: 1916.23ns  p99: 2093.50ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 91.45,
            "range": "± 1.34",
            "unit": "ns/iter",
            "extra": "min: 87.34ns  p75: 92.34ns  p99: 122.48ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 120.1,
            "range": "± 1.39",
            "unit": "ns/iter",
            "extra": "min: 115.20ns  p75: 120.65ns  p99: 164.43ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 8097.3,
            "range": "± 30.5",
            "unit": "ns/iter",
            "extra": "min: 7534.00ns  p75: 7905.00ns  p99: 14828.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 132.41,
            "range": "± 1.72",
            "unit": "ns/iter",
            "extra": "min: 124.58ns  p75: 132.43ns  p99: 173.12ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 2002.99,
            "range": "± 24.41",
            "unit": "ns/iter",
            "extra": "min: 1969.94ns  p75: 2026.66ns  p99: 2118.21ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 11087.85,
            "range": "± 24.99",
            "unit": "ns/iter",
            "extra": "min: 11034.99ns  p75: 11102.12ns  p99: 11146.16ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 635603.99,
            "range": "± 7875",
            "unit": "ns/iter",
            "extra": "min: 607532.00ns  p75: 631588.00ns  p99: 839048.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 98.94,
            "range": "± 1.31",
            "unit": "ns/iter",
            "extra": "min: 95.68ns  p75: 99.06ns  p99: 145.05ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 3061.63,
            "range": "± 22.23",
            "unit": "ns/iter",
            "extra": "min: 3012.14ns  p75: 3067.12ns  p99: 3229.30ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 3601.33,
            "range": "± 25.67",
            "unit": "ns/iter",
            "extra": "min: 3544.94ns  p75: 3600.22ns  p99: 3963.29ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 144.69,
            "range": "± 1.45",
            "unit": "ns/iter",
            "extra": "min: 137.40ns  p75: 145.23ns  p99: 158.16ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 5030.52,
            "range": "± 45",
            "unit": "ns/iter",
            "extra": "min: 4679.00ns  p75: 4879.00ns  p99: 9779.00ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 5314.42,
            "range": "± 39.61",
            "unit": "ns/iter",
            "extra": "min: 5248.40ns  p75: 5343.34ns  p99: 5435.63ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 154.31,
            "range": "± 1.14",
            "unit": "ns/iter",
            "extra": "min: 151.06ns  p75: 154.62ns  p99: 166.88ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 11153.64,
            "range": "± 582.69",
            "unit": "ns/iter",
            "extra": "min: 9144.53ns  p75: 11428.17ns  p99: 11725.36ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 11126.18,
            "range": "± 659.68",
            "unit": "ns/iter",
            "extra": "min: 9873.43ns  p75: 11387.21ns  p99: 11969.23ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "10725179+TomStrepsil@users.noreply.github.com",
            "name": "Tom Pereira",
            "username": "TomStrepsil"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0006990266bf41170f2877dee072942b98c6f0c9",
          "message": "[78] expose lookaround capture (#79)\n\n* expose lookaroundCapture feature\n* scout rule perf improvements\n* update js-yaml",
          "timestamp": "2026-08-31T14:00:42+01:00",
          "tree_id": "855b1d1b4efeeeaaae86c4ab40f4fe7b537ff186",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/0006990266bf41170f2877dee072942b98c6f0c9"
        },
        "date": 1788181291555,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 44.5,
            "range": "± 0.38",
            "unit": "ns/iter",
            "extra": "min: 39.82ns  p75: 43.46ns  p99: 82.46ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 90.34,
            "range": "± 1.64",
            "unit": "ns/iter",
            "extra": "min: 84.77ns  p75: 89.30ns  p99: 132.38ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 92.01,
            "range": "± 1.91",
            "unit": "ns/iter",
            "extra": "min: 86.18ns  p75: 92.38ns  p99: 131.85ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.87,
            "range": "± 0.14",
            "unit": "ns/iter",
            "extra": "min: 33.40ns  p75: 33.91ns  p99: 62.48ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 78.07,
            "range": "± 1.36",
            "unit": "ns/iter",
            "extra": "min: 73.18ns  p75: 76.65ns  p99: 162.78ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 83.82,
            "range": "± 1.58",
            "unit": "ns/iter",
            "extra": "min: 74.92ns  p75: 79.81ns  p99: 206.80ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 53855.79,
            "range": "± 456",
            "unit": "ns/iter",
            "extra": "min: 50524.00ns  p75: 52348.00ns  p99: 99886.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 74297.03,
            "range": "± 731.5",
            "unit": "ns/iter",
            "extra": "min: 69760.00ns  p75: 72836.00ns  p99: 109013.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 58633.12,
            "range": "± 486",
            "unit": "ns/iter",
            "extra": "min: 55073.00ns  p75: 57508.00ns  p99: 84488.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 230566.49,
            "range": "± 13299.5",
            "unit": "ns/iter",
            "extra": "min: 192189.00ns  p75: 222245.00ns  p99: 401529.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 363.19,
            "range": "± 1.23",
            "unit": "ns/iter",
            "extra": "min: 357.14ns  p75: 361.47ns  p99: 380.40ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1416.99,
            "range": "± 4.47",
            "unit": "ns/iter",
            "extra": "min: 1397.25ns  p75: 1421.30ns  p99: 1435.59ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 2200.19,
            "range": "± 13.96",
            "unit": "ns/iter",
            "extra": "min: 2139.23ns  p75: 2204.29ns  p99: 2422.40ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 207.9,
            "range": "± 0.35",
            "unit": "ns/iter",
            "extra": "min: 202.73ns  p75: 206.12ns  p99: 222.83ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 382.9,
            "range": "± 2.35",
            "unit": "ns/iter",
            "extra": "min: 376.74ns  p75: 384.33ns  p99: 399.06ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 812.9,
            "range": "± 4.1",
            "unit": "ns/iter",
            "extra": "min: 798.28ns  p75: 810.97ns  p99: 882.43ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 46.26,
            "range": "± 1.47",
            "unit": "ns/iter",
            "extra": "min: 40.21ns  p75: 43.54ns  p99: 93.58ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 67.54,
            "range": "± 1.33",
            "unit": "ns/iter",
            "extra": "min: 64.15ns  p75: 67.29ns  p99: 128.19ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1892.24,
            "range": "± 20.25",
            "unit": "ns/iter",
            "extra": "min: 1840.39ns  p75: 1891.83ns  p99: 2210.66ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1799.16,
            "range": "± 11.72",
            "unit": "ns/iter",
            "extra": "min: 1772.89ns  p75: 1802.22ns  p99: 1883.21ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 91.88,
            "range": "± 1.41",
            "unit": "ns/iter",
            "extra": "min: 87.50ns  p75: 92.46ns  p99: 132.97ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 123.51,
            "range": "± 2.81",
            "unit": "ns/iter",
            "extra": "min: 113.53ns  p75: 125.45ns  p99: 161.24ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7898.42,
            "range": "± 60",
            "unit": "ns/iter",
            "extra": "min: 7484.00ns  p75: 7704.00ns  p99: 14807.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 132.61,
            "range": "± 1.57",
            "unit": "ns/iter",
            "extra": "min: 125.77ns  p75: 130.82ns  p99: 218.03ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 1884.66,
            "range": "± 11.14",
            "unit": "ns/iter",
            "extra": "min: 1861.12ns  p75: 1888.98ns  p99: 1978.89ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 10578.84,
            "range": "± 32.87",
            "unit": "ns/iter",
            "extra": "min: 10513.14ns  p75: 10603.63ns  p99: 10658.98ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 629139.03,
            "range": "± 7559.5",
            "unit": "ns/iter",
            "extra": "min: 607733.00ns  p75: 631137.00ns  p99: 766729.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 97.16,
            "range": "± 1.25",
            "unit": "ns/iter",
            "extra": "min: 94.10ns  p75: 97.86ns  p99: 113.03ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 2933.71,
            "range": "± 20.25",
            "unit": "ns/iter",
            "extra": "min: 2882.46ns  p75: 2939.87ns  p99: 3074.65ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 3588.4,
            "range": "± 94.15",
            "unit": "ns/iter",
            "extra": "min: 3483.38ns  p75: 3682.12ns  p99: 3839.73ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 138.92,
            "range": "± 1.8",
            "unit": "ns/iter",
            "extra": "min: 133.05ns  p75: 140.23ns  p99: 154.06ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 4435.11,
            "range": "± 25.59",
            "unit": "ns/iter",
            "extra": "min: 4356.25ns  p75: 4428.59ns  p99: 4578.52ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 5125.87,
            "range": "± 165.13",
            "unit": "ns/iter",
            "extra": "min: 4938.61ns  p75: 5284.68ns  p99: 5330.52ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 151.42,
            "range": "± 1.25",
            "unit": "ns/iter",
            "extra": "min: 146.43ns  p75: 151.76ns  p99: 168.57ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 10033.39,
            "range": "± 375.08",
            "unit": "ns/iter",
            "extra": "min: 8359.92ns  p75: 10577.51ns  p99: 10629.42ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 11165.9,
            "range": "± 240.29",
            "unit": "ns/iter",
            "extra": "min: 9276.86ns  p75: 11527.21ns  p99: 12205.04ns"
          }
        ]
      }
    ]
  }
}