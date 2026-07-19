window.BENCHMARK_DATA = {
  "lastUpdate": 1784487823301,
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
      }
    ]
  }
}