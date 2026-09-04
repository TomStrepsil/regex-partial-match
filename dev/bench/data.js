window.BENCHMARK_DATA = {
  "lastUpdate": 1788541893472,
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
          "id": "6a5eeb4b432a715d11c9b2b8c255dc4a4bf896ea",
          "message": "Release version 1.2.0",
          "timestamp": "2026-08-31T13:07:50Z",
          "tree_id": "41cb064923e25e61ccb9861a80724ceda23e0f87",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/6a5eeb4b432a715d11c9b2b8c255dc4a4bf896ea"
        },
        "date": 1788181717961,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 44.85,
            "range": "± 0.46",
            "unit": "ns/iter",
            "extra": "min: 41.17ns  p75: 43.58ns  p99: 89.00ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 91.64,
            "range": "± 1.69",
            "unit": "ns/iter",
            "extra": "min: 86.40ns  p75: 90.50ns  p99: 138.47ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 91.99,
            "range": "± 1.64",
            "unit": "ns/iter",
            "extra": "min: 88.10ns  p75: 92.76ns  p99: 125.64ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.15,
            "range": "± 0.16",
            "unit": "ns/iter",
            "extra": "min: 32.74ns  p75: 33.39ns  p99: 61.83ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 75.91,
            "range": "± 1.3",
            "unit": "ns/iter",
            "extra": "min: 72.93ns  p75: 76.67ns  p99: 109.26ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 81.25,
            "range": "± 1.39",
            "unit": "ns/iter",
            "extra": "min: 74.42ns  p75: 78.67ns  p99: 130.13ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 51428.82,
            "range": "± 526",
            "unit": "ns/iter",
            "extra": "min: 48192.00ns  p75: 50786.00ns  p99: 64818.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 67316.94,
            "range": "± 641",
            "unit": "ns/iter",
            "extra": "min: 63495.00ns  p75: 66080.00ns  p99: 94512.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 57009.79,
            "range": "± 521",
            "unit": "ns/iter",
            "extra": "min: 52989.00ns  p75: 56075.00ns  p99: 79680.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 158706.91,
            "range": "± 5543.5",
            "unit": "ns/iter",
            "extra": "min: 134252.00ns  p75: 147592.00ns  p99: 298459.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 362.63,
            "range": "± 1.27",
            "unit": "ns/iter",
            "extra": "min: 356.08ns  p75: 363.13ns  p99: 379.16ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1362.39,
            "range": "± 5.23",
            "unit": "ns/iter",
            "extra": "min: 1350.35ns  p75: 1366.79ns  p99: 1392.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1864.88,
            "range": "± 5.68",
            "unit": "ns/iter",
            "extra": "min: 1848.57ns  p75: 1866.81ns  p99: 1912.86ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 207.92,
            "range": "± 0.96",
            "unit": "ns/iter",
            "extra": "min: 200.36ns  p75: 206.88ns  p99: 249.28ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 397.07,
            "range": "± 1.89",
            "unit": "ns/iter",
            "extra": "min: 389.47ns  p75: 398.39ns  p99: 412.73ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 690.63,
            "range": "± 2.81",
            "unit": "ns/iter",
            "extra": "min: 675.39ns  p75: 686.57ns  p99: 754.86ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 42.64,
            "range": "± 0.31",
            "unit": "ns/iter",
            "extra": "min: 40.68ns  p75: 41.69ns  p99: 78.15ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 69.01,
            "range": "± 1.22",
            "unit": "ns/iter",
            "extra": "min: 65.97ns  p75: 68.88ns  p99: 115.32ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1827.25,
            "range": "± 25.35",
            "unit": "ns/iter",
            "extra": "min: 1778.63ns  p75: 1834.47ns  p99: 2138.94ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1732.21,
            "range": "± 13.63",
            "unit": "ns/iter",
            "extra": "min: 1709.17ns  p75: 1741.08ns  p99: 1810.31ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 98.63,
            "range": "± 1.27",
            "unit": "ns/iter",
            "extra": "min: 93.22ns  p75: 99.27ns  p99: 121.04ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 124.91,
            "range": "± 1.36",
            "unit": "ns/iter",
            "extra": "min: 118.74ns  p75: 124.62ns  p99: 177.28ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7679.04,
            "range": "± 160",
            "unit": "ns/iter",
            "extra": "min: 7180.00ns  p75: 7631.00ns  p99: 13410.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 120.72,
            "range": "± 1.27",
            "unit": "ns/iter",
            "extra": "min: 116.41ns  p75: 119.68ns  p99: 167.82ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 1842.06,
            "range": "± 9.7",
            "unit": "ns/iter",
            "extra": "min: 1820.31ns  p75: 1844.79ns  p99: 1949.85ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 10397.33,
            "range": "± 35.8",
            "unit": "ns/iter",
            "extra": "min: 10341.08ns  p75: 10425.19ns  p99: 10454.33ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 613905.72,
            "range": "± 15358",
            "unit": "ns/iter",
            "extra": "min: 584590.00ns  p75: 626472.00ns  p99: 707304.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 89.17,
            "range": "± 1.17",
            "unit": "ns/iter",
            "extra": "min: 86.62ns  p75: 89.74ns  p99: 102.01ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 2892.3,
            "range": "± 26.63",
            "unit": "ns/iter",
            "extra": "min: 2837.16ns  p75: 2901.13ns  p99: 3183.50ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 3491.13,
            "range": "± 79.38",
            "unit": "ns/iter",
            "extra": "min: 3384.22ns  p75: 3559.60ns  p99: 3729.35ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 134.69,
            "range": "± 1.74",
            "unit": "ns/iter",
            "extra": "min: 124.33ns  p75: 130.41ns  p99: 235.98ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 4379.66,
            "range": "± 31.64",
            "unit": "ns/iter",
            "extra": "min: 4330.62ns  p75: 4407.34ns  p99: 4464.43ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 5057.25,
            "range": "± 89.71",
            "unit": "ns/iter",
            "extra": "min: 4923.59ns  p75: 5135.80ns  p99: 5251.65ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 153.07,
            "range": "± 1.85",
            "unit": "ns/iter",
            "extra": "min: 140.10ns  p75: 147.22ns  p99: 245.65ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 10130.24,
            "range": "± 476.88",
            "unit": "ns/iter",
            "extra": "min: 8269.18ns  p75: 10770.44ns  p99: 11072.62ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 10868.99,
            "range": "± 756.85",
            "unit": "ns/iter",
            "extra": "min: 9228.72ns  p75: 11305.97ns  p99: 11747.63ns"
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
          "id": "265f6aace1e1283c574dcffecd772732f610c9cf",
          "message": "[77] Report whether a match is complete or a prefix (#82)\n\n* add isComplete()\n* split into files\n* fix legacy escape\n* classify Annex B literals vs backreferences\n* named references inside raw lookarounds\n* test:coverage\n* docs / benchmark fixes\n* fix warm/cold mitata tests\n* standardise benchmarks to single-line comments\n* add coverage for legacyEscape\n* re-home some tests\n* prefer single-line comments\n* prefer non-null assertion\n* prefer implicit return types\n* octal escape fix\n* fix for quantified non-empty backreference\n* add benchmark for control letter escape\n* fix octal test",
          "timestamp": "2026-09-02T23:01:46+01:00",
          "tree_id": "e5dad3817d2e0e05aeb5ec613333ea39338d7fc5",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/265f6aace1e1283c574dcffecd772732f610c9cf"
        },
        "date": 1788386581811,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 45.48,
            "range": "± 0.64",
            "unit": "ns/iter",
            "extra": "min: 40.12ns  p75: 43.50ns  p99: 87.77ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 95.7,
            "range": "± 2.35",
            "unit": "ns/iter",
            "extra": "min: 86.69ns  p75: 91.83ns  p99: 173.10ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 93.54,
            "range": "± 1.9",
            "unit": "ns/iter",
            "extra": "min: 88.05ns  p75: 93.17ns  p99: 172.23ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 34.05,
            "range": "± 0.14",
            "unit": "ns/iter",
            "extra": "min: 32.68ns  p75: 33.26ns  p99: 59.42ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 76.45,
            "range": "± 1.34",
            "unit": "ns/iter",
            "extra": "min: 72.83ns  p75: 76.85ns  p99: 108.86ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 81.67,
            "range": "± 1.39",
            "unit": "ns/iter",
            "extra": "min: 74.85ns  p75: 79.21ns  p99: 132.65ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 52574.4,
            "range": "± 445.5",
            "unit": "ns/iter",
            "extra": "min: 48612.00ns  p75: 51046.00ns  p99: 99298.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 68248.4,
            "range": "± 676",
            "unit": "ns/iter",
            "extra": "min: 63654.00ns  p75: 67380.00ns  p99: 92968.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 57101.48,
            "range": "± 460.5",
            "unit": "ns/iter",
            "extra": "min: 52911.00ns  p75: 55432.00ns  p99: 85161.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 190618.75,
            "range": "± 63497.5",
            "unit": "ns/iter",
            "extra": "min: 135809.00ns  p75: 270105.00ns  p99: 421467.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 360.77,
            "range": "± 1.82",
            "unit": "ns/iter",
            "extra": "min: 351.93ns  p75: 356.96ns  p99: 538.94ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1355.09,
            "range": "± 4.47",
            "unit": "ns/iter",
            "extra": "min: 1341.07ns  p75: 1356.67ns  p99: 1392.23ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1871.99,
            "range": "± 6.94",
            "unit": "ns/iter",
            "extra": "min: 1853.35ns  p75: 1873.81ns  p99: 1935.67ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 208.23,
            "range": "± 1.53",
            "unit": "ns/iter",
            "extra": "min: 199.16ns  p75: 205.78ns  p99: 373.37ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 388.54,
            "range": "± 1.57",
            "unit": "ns/iter",
            "extra": "min: 383.01ns  p75: 389.42ns  p99: 404.72ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 692.62,
            "range": "± 3.32",
            "unit": "ns/iter",
            "extra": "min: 679.50ns  p75: 690.09ns  p99: 735.68ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 40.87,
            "range": "± 0.2",
            "unit": "ns/iter",
            "extra": "min: 39.50ns  p75: 40.26ns  p99: 62.23ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 71.74,
            "range": "± 1.27",
            "unit": "ns/iter",
            "extra": "min: 69.79ns  p75: 72.71ns  p99: 106.12ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 2094.38,
            "range": "± 26.78",
            "unit": "ns/iter",
            "extra": "min: 1829.27ns  p75: 1901.02ns  p99: 4682.13ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 2008.64,
            "range": "± 30.45",
            "unit": "ns/iter",
            "extra": "min: 1713.77ns  p75: 1828.36ns  p99: 4535.52ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 97.61,
            "range": "± 1.32",
            "unit": "ns/iter",
            "extra": "min: 92.25ns  p75: 98.45ns  p99: 118.53ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 128.37,
            "range": "± 1.41",
            "unit": "ns/iter",
            "extra": "min: 122.86ns  p75: 129.08ns  p99: 145.32ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 8935.82,
            "range": "± 135",
            "unit": "ns/iter",
            "extra": "min: 7431.00ns  p75: 8092.00ns  p99: 15273.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 121.67,
            "range": "± 1.38",
            "unit": "ns/iter",
            "extra": "min: 116.42ns  p75: 121.01ns  p99: 163.89ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 1996.7,
            "range": "± 25.64",
            "unit": "ns/iter",
            "extra": "min: 1776.17ns  p75: 1870.44ns  p99: 3571.22ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 11719.98,
            "range": "± 1047.95",
            "unit": "ns/iter",
            "extra": "min: 10191.23ns  p75: 12593.87ns  p99: 12629.88ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 711215.59,
            "range": "± 10791.5",
            "unit": "ns/iter",
            "extra": "min: 592403.00ns  p75: 633225.00ns  p99: 1064958.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 94.17,
            "range": "± 1.21",
            "unit": "ns/iter",
            "extra": "min: 91.65ns  p75: 94.86ns  p99: 109.27ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 3413.33,
            "range": "± 31.4",
            "unit": "ns/iter",
            "extra": "min: 3344.96ns  p75: 3416.35ns  p99: 3810.46ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 4077.06,
            "range": "± 111",
            "unit": "ns/iter",
            "extra": "min: 3949.77ns  p75: 4186.14ns  p99: 4334.05ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 140.18,
            "range": "± 1.59",
            "unit": "ns/iter",
            "extra": "min: 131.24ns  p75: 140.97ns  p99: 167.13ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 4953.06,
            "range": "± 35.59",
            "unit": "ns/iter",
            "extra": "min: 4877.67ns  p75: 4974.50ns  p99: 5033.19ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 5729.39,
            "range": "± 179.61",
            "unit": "ns/iter",
            "extra": "min: 5497.08ns  p75: 5875.28ns  p99: 5989.14ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 148.68,
            "range": "± 1.14",
            "unit": "ns/iter",
            "extra": "min: 143.22ns  p75: 148.48ns  p99: 167.99ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 11452.67,
            "range": "± 147.16",
            "unit": "ns/iter",
            "extra": "min: 9767.81ns  p75: 11674.61ns  p99: 11779.92ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 11991.15,
            "range": "± 142.7",
            "unit": "ns/iter",
            "extra": "min: 10634.65ns  p75: 12311.98ns  p99: 12416.00ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 94.83,
            "range": "± 1.20",
            "unit": "ns/iter",
            "extra": "min: 92.34ns  p75: 95.52ns  p99: 109.96ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 6130.58,
            "range": "± 520.12",
            "unit": "ns/iter",
            "extra": "min: 5649.30ns  p75: 6731.62ns  p99: 6769.57ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 6842.18,
            "range": "± 370.63",
            "unit": "ns/iter",
            "extra": "min: 6141.45ns  p75: 7238.23ns  p99: 7558.61ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 104.13,
            "range": "± 1.16",
            "unit": "ns/iter",
            "extra": "min: 101.71ns  p75: 104.84ns  p99: 115.83ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 11272.79,
            "range": "± 155.05",
            "unit": "ns/iter",
            "extra": "min: 10529.50ns  p75: 11463.61ns  p99: 11489.74ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 12126.03,
            "range": "± 213.27",
            "unit": "ns/iter",
            "extra": "min: 11354.83ns  p75: 12281.33ns  p99: 12479.04ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 4556.2,
            "range": "± 98.79",
            "unit": "ns/iter",
            "extra": "min: 4439.63ns  p75: 4650.61ns  p99: 4739.47ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (includes probe build)",
            "value": 9578.73,
            "range": "± 130.00",
            "unit": "ns/iter",
            "extra": "min: 8563.00ns  p75: 9123.00ns  p99: 20100.00ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (complete, includes probe build)",
            "value": 9018.64,
            "range": "± 23.05",
            "unit": "ns/iter",
            "extra": "min: 8943.48ns  p75: 9021.66ns  p99: 9084.58ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — incomplete match, warm probe",
            "value": 676.95,
            "range": "± 2.30",
            "unit": "ns/iter",
            "extra": "min: 665.98ns  p75: 674.68ns  p99: 726.04ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — complete match, warm probe",
            "value": 737.07,
            "range": "± 2.74",
            "unit": "ns/iter",
            "extra": "min: 721.79ns  p75: 731.32ns  p99: 858.55ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 10042.26,
            "range": "± 781.61",
            "unit": "ns/iter",
            "extra": "min: 9040.88ns  p75: 10730.39ns  p99: 10991.06ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec + isComplete (includes probe build)",
            "value": 15567.82,
            "range": "± 225.50",
            "unit": "ns/iter",
            "extra": "min: 13560.00ns  p75: 14422.00ns  p99: 27501.00ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — isComplete — same match, expansion probe cached",
            "value": 811.24,
            "range": "± 2.78",
            "unit": "ns/iter",
            "extra": "min: 799.56ns  p75: 808.85ns  p99: 863.31ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — exec + isComplete — fresh match, probe rebuilt per match",
            "value": 6883.49,
            "range": "± 411.80",
            "unit": "ns/iter",
            "extra": "min: 6508.17ns  p75: 7391.05ns  p99: 7547.89ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 10657.05,
            "range": "± 173.52",
            "unit": "ns/iter",
            "extra": "min: 10290.84ns  p75: 10782.46ns  p99: 10824.54ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec + isComplete (includes probe build)",
            "value": 15782.54,
            "range": "± 400.97",
            "unit": "ns/iter",
            "extra": "min: 14577.33ns  p75: 15755.58ns  p99: 16554.80ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — isComplete — warm instance",
            "value": 819.42,
            "range": "± 2.95",
            "unit": "ns/iter",
            "extra": "min: 808.11ns  p75: 817.86ns  p99: 865.74ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 4864.92,
            "range": "± 139.13",
            "unit": "ns/iter",
            "extra": "min: 4687.12ns  p75: 4979.77ns  p99: 5142.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 4240.24,
            "range": "± 122.52",
            "unit": "ns/iter",
            "extra": "min: 4088.40ns  p75: 4339.17ns  p99: 4552.67ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 4588.46,
            "range": "± 114.87",
            "unit": "ns/iter",
            "extra": "min: 4446.23ns  p75: 4691.48ns  p99: 4795.87ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 6513.94,
            "range": "± 138.96",
            "unit": "ns/iter",
            "extra": "min: 6265.13ns  p75: 6601.78ns  p99: 6730.77ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 6706.85,
            "range": "± 139.86",
            "unit": "ns/iter",
            "extra": "min: 6460.10ns  p75: 6803.59ns  p99: 6920.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 6703.33,
            "range": "± 154.67",
            "unit": "ns/iter",
            "extra": "min: 6452.03ns  p75: 6824.55ns  p99: 6910.29ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 6510.59,
            "range": "± 171.52",
            "unit": "ns/iter",
            "extra": "min: 6168.67ns  p75: 6693.42ns  p99: 6792.00ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 6728.89,
            "range": "± 66.68",
            "unit": "ns/iter",
            "extra": "min: 6496.73ns  p75: 6811.22ns  p99: 6913.37ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 6266.42,
            "range": "± 124.56",
            "unit": "ns/iter",
            "extra": "min: 5908.15ns  p75: 6446.82ns  p99: 6554.69ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 6946.79,
            "range": "± 136.02",
            "unit": "ns/iter",
            "extra": "min: 6542.79ns  p75: 7059.39ns  p99: 7244.49ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 4647.49,
            "range": "± 163.47",
            "unit": "ns/iter",
            "extra": "min: 4464.23ns  p75: 4818.22ns  p99: 4897.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 4061.76,
            "range": "± 124.35",
            "unit": "ns/iter",
            "extra": "min: 3927.44ns  p75: 4186.72ns  p99: 4286.55ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 4425.3,
            "range": "± 119.47",
            "unit": "ns/iter",
            "extra": "min: 4266.08ns  p75: 4525.96ns  p99: 4706.74ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 4268.2,
            "range": "± 137.57",
            "unit": "ns/iter",
            "extra": "min: 4102.88ns  p75: 4392.12ns  p99: 4612.98ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 4369.66,
            "range": "± 120.33",
            "unit": "ns/iter",
            "extra": "min: 4216.71ns  p75: 4473.58ns  p99: 4564.61ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 6398.37,
            "range": "± 126.90",
            "unit": "ns/iter",
            "extra": "min: 6170.18ns  p75: 6488.15ns  p99: 6579.23ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 9163.28,
            "range": "± 931.65",
            "unit": "ns/iter",
            "extra": "min: 7910.04ns  p75: 9876.07ns  p99: 10050.35ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 9258.38,
            "range": "± 967.18",
            "unit": "ns/iter",
            "extra": "min: 8030.81ns  p75: 10120.75ns  p99: 10252.00ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 7544.02,
            "range": "± 543.12",
            "unit": "ns/iter",
            "extra": "min: 6777.02ns  p75: 8077.91ns  p99: 8438.32ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 13037.78,
            "range": "± 14.67",
            "unit": "ns/iter",
            "extra": "min: 12592.45ns  p75: 13091.17ns  p99: 13111.52ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 34.75,
            "range": "± 0.14",
            "unit": "ns/iter",
            "extra": "min: 33.47ns  p75: 34.08ns  p99: 46.95ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 33.57,
            "range": "± 0.13",
            "unit": "ns/iter",
            "extra": "min: 32.38ns  p75: 32.95ns  p99: 44.02ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 1976.98,
            "range": "± 8.43",
            "unit": "ns/iter",
            "extra": "min: 1756.33ns  p75: 1795.51ns  p99: 4032.13ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 68.67,
            "range": "± 1.27",
            "unit": "ns/iter",
            "extra": "min: 66.29ns  p75: 69.21ns  p99: 109.11ns"
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
          "id": "a0259844191dab2e869658ce63de35111dac7887",
          "message": "fix scenario 7 (#85)\n\n* fix scenario 7",
          "timestamp": "2026-09-03T07:35:38+01:00",
          "tree_id": "4bd102d4e09b43ebd132255c4173e39ff812e7a8",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/a0259844191dab2e869658ce63de35111dac7887"
        },
        "date": 1788417417081,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 43.02,
            "range": "± 0.42",
            "unit": "ns/iter",
            "extra": "min: 39.60ns  p75: 41.59ns  p99: 82.05ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 92.95,
            "range": "± 2.31",
            "unit": "ns/iter",
            "extra": "min: 84.68ns  p75: 91.86ns  p99: 168.24ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 90.03,
            "range": "± 2.04",
            "unit": "ns/iter",
            "extra": "min: 86.16ns  p75: 90.86ns  p99: 130.62ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 35.98,
            "range": "± 0.15",
            "unit": "ns/iter",
            "extra": "min: 33.42ns  p75: 33.96ns  p99: 72.60ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 83.91,
            "range": "± 1.38",
            "unit": "ns/iter",
            "extra": "min: 73.34ns  p75: 79.37ns  p99: 161.22ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 84.18,
            "range": "± 1.59",
            "unit": "ns/iter",
            "extra": "min: 75.28ns  p75: 81.33ns  p99: 146.14ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 53500.8,
            "range": "± 440.5",
            "unit": "ns/iter",
            "extra": "min: 50534.00ns  p75: 52107.00ns  p99: 99806.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 74459.33,
            "range": "± 716",
            "unit": "ns/iter",
            "extra": "min: 69941.00ns  p75: 72956.00ns  p99: 113382.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 59119.38,
            "range": "± 686.5",
            "unit": "ns/iter",
            "extra": "min: 55093.00ns  p75: 58069.00ns  p99: 87844.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 203264.95,
            "range": "± 8746",
            "unit": "ns/iter",
            "extra": "min: 171340.00ns  p75: 191577.00ns  p99: 374699.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 360.72,
            "range": "± 1.17",
            "unit": "ns/iter",
            "extra": "min: 356.60ns  p75: 360.53ns  p99: 384.82ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1393.5,
            "range": "± 4.96",
            "unit": "ns/iter",
            "extra": "min: 1377.57ns  p75: 1396.28ns  p99: 1420.58ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 2017.54,
            "range": "± 7.71",
            "unit": "ns/iter",
            "extra": "min: 1996.39ns  p75: 2020.52ns  p99: 2065.85ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 213.41,
            "range": "± 4.25",
            "unit": "ns/iter",
            "extra": "min: 204.81ns  p75: 216.14ns  p99: 229.07ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 385.1,
            "range": "± 1.86",
            "unit": "ns/iter",
            "extra": "min: 376.04ns  p75: 382.61ns  p99: 446.86ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 717.08,
            "range": "± 4.24",
            "unit": "ns/iter",
            "extra": "min: 692.43ns  p75: 705.30ns  p99: 1034.33ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 42.08,
            "range": "± 0.33",
            "unit": "ns/iter",
            "extra": "min: 40.12ns  p75: 41.18ns  p99: 84.99ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 71.54,
            "range": "± 1.58",
            "unit": "ns/iter",
            "extra": "min: 64.56ns  p75: 68.18ns  p99: 133.98ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 2099.93,
            "range": "± 32.1",
            "unit": "ns/iter",
            "extra": "min: 1807.26ns  p75: 1917.05ns  p99: 4640.68ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1988.01,
            "range": "± 27.01",
            "unit": "ns/iter",
            "extra": "min: 1741.13ns  p75: 1811.36ns  p99: 4252.78ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 92.18,
            "range": "± 1.3",
            "unit": "ns/iter",
            "extra": "min: 87.42ns  p75: 93.01ns  p99: 116.44ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 118.01,
            "range": "± 1.4",
            "unit": "ns/iter",
            "extra": "min: 112.72ns  p75: 117.91ns  p99: 163.60ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 8811.96,
            "range": "± 85",
            "unit": "ns/iter",
            "extra": "min: 7473.00ns  p75: 7784.00ns  p99: 15219.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 141.08,
            "range": "± 1.58",
            "unit": "ns/iter",
            "extra": "min: 127.70ns  p75: 139.61ns  p99: 250.96ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 1994.47,
            "range": "± 21.03",
            "unit": "ns/iter",
            "extra": "min: 1795.33ns  p75: 1842.77ns  p99: 3635.14ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 11868.86,
            "range": "± 1063.15",
            "unit": "ns/iter",
            "extra": "min: 10305.85ns  p75: 12620.75ns  p99: 12657.05ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 702404,
            "range": "± 7950",
            "unit": "ns/iter",
            "extra": "min: 598236.00ns  p75: 623504.00ns  p99: 812085.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 93.4,
            "range": "± 1.4",
            "unit": "ns/iter",
            "extra": "min: 90.91ns  p75: 94.39ns  p99: 105.87ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 3437.02,
            "range": "± 25.98",
            "unit": "ns/iter",
            "extra": "min: 3389.86ns  p75: 3451.71ns  p99: 3610.46ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 4089.62,
            "range": "± 149.86",
            "unit": "ns/iter",
            "extra": "min: 3923.98ns  p75: 4233.62ns  p99: 4402.24ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 137.05,
            "range": "± 2.09",
            "unit": "ns/iter",
            "extra": "min: 131.13ns  p75: 138.26ns  p99: 152.22ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 5114.27,
            "range": "± 43.19",
            "unit": "ns/iter",
            "extra": "min: 4926.00ns  p75: 5020.46ns  p99: 6811.70ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 5754.02,
            "range": "± 176.09",
            "unit": "ns/iter",
            "extra": "min: 5513.91ns  p75: 5880.76ns  p99: 5993.72ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 151.4,
            "range": "± 1.3",
            "unit": "ns/iter",
            "extra": "min: 146.00ns  p75: 151.42ns  p99: 171.16ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 11663.48,
            "range": "± 301.94",
            "unit": "ns/iter",
            "extra": "min: 9812.16ns  p75: 12078.93ns  p99: 12140.92ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 12519.24,
            "range": "± 120.66",
            "unit": "ns/iter",
            "extra": "min: 10900.41ns  p75: 12732.73ns  p99: 12862.52ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 95.89,
            "range": "± 1.29",
            "unit": "ns/iter",
            "extra": "min: 93.12ns  p75: 96.47ns  p99: 114.29ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 6158.23,
            "range": "± 551.74",
            "unit": "ns/iter",
            "extra": "min: 5616.59ns  p75: 6737.70ns  p99: 6797.05ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 7179.19,
            "range": "± 562",
            "unit": "ns/iter",
            "extra": "min: 6169.91ns  p75: 7612.66ns  p99: 8482.61ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 105.2,
            "range": "± 1.28",
            "unit": "ns/iter",
            "extra": "min: 102.31ns  p75: 105.91ns  p99: 120.79ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 11311.65,
            "range": "± 97.88",
            "unit": "ns/iter",
            "extra": "min: 10516.04ns  p75: 11491.60ns  p99: 11516.94ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 12176.75,
            "range": "± 227.91",
            "unit": "ns/iter",
            "extra": "min: 11406.67ns  p75: 12476.17ns  p99: 12534.93ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 4636.19,
            "range": "± 156.3",
            "unit": "ns/iter",
            "extra": "min: 4408.04ns  p75: 4743.14ns  p99: 5345.76ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (includes probe build)",
            "value": 10348.45,
            "range": "± 115.5",
            "unit": "ns/iter",
            "extra": "min: 8907.00ns  p75: 9378.00ns  p99: 27562.00ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (complete, includes probe build)",
            "value": 9369.01,
            "range": "± 32.91",
            "unit": "ns/iter",
            "extra": "min: 9273.76ns  p75: 9390.69ns  p99: 9427.06ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — incomplete match, warm probe",
            "value": 723.63,
            "range": "± 3.57",
            "unit": "ns/iter",
            "extra": "min: 709.90ns  p75: 722.51ns  p99: 774.91ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — complete match, warm probe",
            "value": 781.33,
            "range": "± 2.25",
            "unit": "ns/iter",
            "extra": "min: 769.48ns  p75: 780.57ns  p99: 831.18ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 10486.92,
            "range": "± 689.34",
            "unit": "ns/iter",
            "extra": "min: 9327.28ns  p75: 11085.85ns  p99: 11094.64ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec + isComplete (includes probe build)",
            "value": 17107.44,
            "range": "± 315.5",
            "unit": "ns/iter",
            "extra": "min: 14436.00ns  p75: 15449.00ns  p99: 39013.00ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — isComplete — same match, expansion probe cached",
            "value": 903.6,
            "range": "± 4.02",
            "unit": "ns/iter",
            "extra": "min: 885.56ns  p75: 899.45ns  p99: 1002.24ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — exec + isComplete — fresh match, probe rebuilt per match",
            "value": 7026.73,
            "range": "± 526.53",
            "unit": "ns/iter",
            "extra": "min: 6617.99ns  p75: 7694.61ns  p99: 7754.35ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 10767.15,
            "range": "± 190.25",
            "unit": "ns/iter",
            "extra": "min: 10050.29ns  p75: 10939.02ns  p99: 10984.13ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec + isComplete (includes probe build)",
            "value": 16978.71,
            "range": "± 200.5",
            "unit": "ns/iter",
            "extra": "min: 14837.00ns  p75: 15559.00ns  p99: 39143.00ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — isComplete — warm instance",
            "value": 882.94,
            "range": "± 3.25",
            "unit": "ns/iter",
            "extra": "min: 867.98ns  p75: 882.47ns  p99: 935.92ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 5253.78,
            "range": "± 159.29",
            "unit": "ns/iter",
            "extra": "min: 5016.99ns  p75: 5383.23ns  p99: 5542.90ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 5356.05,
            "range": "± 218.12",
            "unit": "ns/iter",
            "extra": "min: 5089.31ns  p75: 5568.43ns  p99: 5676.72ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 5214.39,
            "range": "± 177.79",
            "unit": "ns/iter",
            "extra": "min: 4990.86ns  p75: 5377.40ns  p99: 5458.78ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 6861.47,
            "range": "± 128.19",
            "unit": "ns/iter",
            "extra": "min: 6549.93ns  p75: 6965.32ns  p99: 7130.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 6966.73,
            "range": "± 69.04",
            "unit": "ns/iter",
            "extra": "min: 6632.71ns  p75: 7018.43ns  p99: 7378.83ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 6874.24,
            "range": "± 60.99",
            "unit": "ns/iter",
            "extra": "min: 6604.72ns  p75: 6955.26ns  p99: 7070.78ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 6960.64,
            "range": "± 103.52",
            "unit": "ns/iter",
            "extra": "min: 6724.61ns  p75: 7103.98ns  p99: 7156.18ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 7022.11,
            "range": "± 89.58",
            "unit": "ns/iter",
            "extra": "min: 6649.90ns  p75: 7052.15ns  p99: 7647.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 7424.22,
            "range": "± 124.68",
            "unit": "ns/iter",
            "extra": "min: 6929.61ns  p75: 7543.77ns  p99: 7736.47ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 7167.02,
            "range": "± 116.92",
            "unit": "ns/iter",
            "extra": "min: 6730.29ns  p75: 7285.46ns  p99: 7483.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 5377.04,
            "range": "± 141.54",
            "unit": "ns/iter",
            "extra": "min: 5150.42ns  p75: 5492.61ns  p99: 5609.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 5331.95,
            "range": "± 189.69",
            "unit": "ns/iter",
            "extra": "min: 5098.03ns  p75: 5497.33ns  p99: 5581.62ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 5395.69,
            "range": "± 148.88",
            "unit": "ns/iter",
            "extra": "min: 5169.74ns  p75: 5507.01ns  p99: 5718.79ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 5388.86,
            "range": "± 169.7",
            "unit": "ns/iter",
            "extra": "min: 5158.81ns  p75: 5520.39ns  p99: 5699.28ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 5448.64,
            "range": "± 160.51",
            "unit": "ns/iter",
            "extra": "min: 5239.03ns  p75: 5580.78ns  p99: 5637.60ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 6473.52,
            "range": "± 133.51",
            "unit": "ns/iter",
            "extra": "min: 6214.22ns  p75: 6547.15ns  p99: 6769.93ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 9342.62,
            "range": "± 886.56",
            "unit": "ns/iter",
            "extra": "min: 8084.82ns  p75: 10067.95ns  p99: 10283.13ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 9361.14,
            "range": "± 980.83",
            "unit": "ns/iter",
            "extra": "min: 8213.56ns  p75: 10252.46ns  p99: 10295.07ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 7622.44,
            "range": "± 585.19",
            "unit": "ns/iter",
            "extra": "min: 6725.49ns  p75: 8212.13ns  p99: 8497.21ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 13173.85,
            "range": "± 49.78",
            "unit": "ns/iter",
            "extra": "min: 12890.24ns  p75: 13214.53ns  p99: 13317.26ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 35.92,
            "range": "± 0.15",
            "unit": "ns/iter",
            "extra": "min: 34.37ns  p75: 35.06ns  p99: 76.55ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 34.31,
            "range": "± 0.15",
            "unit": "ns/iter",
            "extra": "min: 32.79ns  p75: 33.40ns  p99: 71.05ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 1975.48,
            "range": "± 8.5",
            "unit": "ns/iter",
            "extra": "min: 1761.52ns  p75: 1785.27ns  p99: 4159.77ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 67.04,
            "range": "± 1.32",
            "unit": "ns/iter",
            "extra": "min: 64.83ns  p75: 67.88ns  p99: 93.32ns"
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
          "id": "416531033b531dcb088a47c1ef50e609754e18c6",
          "message": "Bump @humanfs/node from 0.16.7 to 0.16.8 in the npm_and_yarn group across 1 directory (#86)\n\nBump @humanfs/node in the npm_and_yarn group across 1 directory\n\nBumps the npm_and_yarn group with 1 update in the / directory: [@humanfs/node](https://github.com/humanwhocodes/humanfs/tree/HEAD/packages/node).\n\n\nUpdates `@humanfs/node` from 0.16.7 to 0.16.8\n- [Release notes](https://github.com/humanwhocodes/humanfs/releases)\n- [Changelog](https://github.com/humanwhocodes/humanfs/blob/main/packages/node/CHANGELOG.md)\n- [Commits](https://github.com/humanwhocodes/humanfs/commits/node-v0.16.8/packages/node)\n\n---\nupdated-dependencies:\n- dependency-name: \"@humanfs/node\"\n  dependency-version: 0.16.8\n  dependency-type: indirect\n  dependency-group: npm_and_yarn\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Tom Pereira <10725179+TomStrepsil@users.noreply.github.com>",
          "timestamp": "2026-09-03T13:33:20+01:00",
          "tree_id": "862ae95c54b5b1620f3fc35993e353f9b5e53f10",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/416531033b531dcb088a47c1ef50e609754e18c6"
        },
        "date": 1788438877973,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 35.76,
            "range": "± 1.32",
            "unit": "ns/iter",
            "extra": "min: 30.23ns  p75: 36.06ns  p99: 67.24ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 80.18,
            "range": "± 3.48",
            "unit": "ns/iter",
            "extra": "min: 70.69ns  p75: 81.56ns  p99: 114.45ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 79.64,
            "range": "± 3.37",
            "unit": "ns/iter",
            "extra": "min: 71.16ns  p75: 81.63ns  p99: 115.12ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 33.23,
            "range": "± 1.67",
            "unit": "ns/iter",
            "extra": "min: 27.91ns  p75: 34.18ns  p99: 55.95ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 69.05,
            "range": "± 3.58",
            "unit": "ns/iter",
            "extra": "min: 59.75ns  p75: 71.53ns  p99: 107.30ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 72.29,
            "range": "± 3.99",
            "unit": "ns/iter",
            "extra": "min: 62.60ns  p75: 74.31ns  p99: 107.38ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 54758.36,
            "range": "± 1893.5",
            "unit": "ns/iter",
            "extra": "min: 40320.00ns  p75: 56072.00ns  p99: 79463.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 63689.08,
            "range": "± 9203",
            "unit": "ns/iter",
            "extra": "min: 48831.00ns  p75: 71366.00ns  p99: 107269.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 59673.73,
            "range": "± 2080",
            "unit": "ns/iter",
            "extra": "min: 44019.00ns  p75: 60932.00ns  p99: 81272.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 135971.82,
            "range": "± 9370.5",
            "unit": "ns/iter",
            "extra": "min: 107686.00ns  p75: 134780.00ns  p99: 270980.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 302.02,
            "range": "± 5.91",
            "unit": "ns/iter",
            "extra": "min: 280.54ns  p75: 304.55ns  p99: 344.83ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1040.24,
            "range": "± 11.58",
            "unit": "ns/iter",
            "extra": "min: 1007.46ns  p75: 1047.66ns  p99: 1118.48ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1676.08,
            "range": "± 22.84",
            "unit": "ns/iter",
            "extra": "min: 1607.09ns  p75: 1691.25ns  p99: 1817.79ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 174.74,
            "range": "± 3.5",
            "unit": "ns/iter",
            "extra": "min: 158.77ns  p75: 172.89ns  p99: 321.13ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 310,
            "range": "± 4.79",
            "unit": "ns/iter",
            "extra": "min: 287.87ns  p75: 308.71ns  p99: 549.92ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 648.84,
            "range": "± 16",
            "unit": "ns/iter",
            "extra": "min: 601.01ns  p75: 654.53ns  p99: 815.18ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 38.62,
            "range": "± 1.67",
            "unit": "ns/iter",
            "extra": "min: 33.75ns  p75: 39.10ns  p99: 69.46ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 56.29,
            "range": "± 4.12",
            "unit": "ns/iter",
            "extra": "min: 48.98ns  p75: 59.76ns  p99: 91.09ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1637.8,
            "range": "± 58.21",
            "unit": "ns/iter",
            "extra": "min: 1335.40ns  p75: 1488.98ns  p99: 3769.61ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1572.81,
            "range": "± 26.46",
            "unit": "ns/iter",
            "extra": "min: 1296.76ns  p75: 1394.20ns  p99: 3697.26ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 79.64,
            "range": "± 2.97",
            "unit": "ns/iter",
            "extra": "min: 72.57ns  p75: 82.15ns  p99: 102.49ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 100.53,
            "range": "± 3.94",
            "unit": "ns/iter",
            "extra": "min: 89.92ns  p75: 102.19ns  p99: 162.27ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7833.59,
            "range": "± 279.5",
            "unit": "ns/iter",
            "extra": "min: 6084.00ns  p75: 7190.00ns  p99: 11699.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 122.54,
            "range": "± 5.58",
            "unit": "ns/iter",
            "extra": "min: 101.78ns  p75: 127.33ns  p99: 175.18ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 1612.96,
            "range": "± 32.18",
            "unit": "ns/iter",
            "extra": "min: 1360.78ns  p75: 1501.80ns  p99: 3212.18ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 9128.2,
            "range": "± 1002.86",
            "unit": "ns/iter",
            "extra": "min: 7786.13ns  p75: 9900.60ns  p99: 10136.46ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 601312.06,
            "range": "± 17922.5",
            "unit": "ns/iter",
            "extra": "min: 488980.00ns  p75: 538050.00ns  p99: 948314.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 73.88,
            "range": "± 2.72",
            "unit": "ns/iter",
            "extra": "min: 66.10ns  p75: 75.72ns  p99: 93.23ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 2980.88,
            "range": "± 48.64",
            "unit": "ns/iter",
            "extra": "min: 2856.32ns  p75: 3001.40ns  p99: 3463.26ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 3476.81,
            "range": "± 67.05",
            "unit": "ns/iter",
            "extra": "min: 3310.77ns  p75: 3520.80ns  p99: 3775.75ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 112.7,
            "range": "± 2.09",
            "unit": "ns/iter",
            "extra": "min: 102.72ns  p75: 112.92ns  p99: 147.14ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 4366.2,
            "range": "± 75.52",
            "unit": "ns/iter",
            "extra": "min: 4186.35ns  p75: 4431.29ns  p99: 4700.82ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 4944.98,
            "range": "± 137.42",
            "unit": "ns/iter",
            "extra": "min: 4697.84ns  p75: 5035.64ns  p99: 5329.09ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 124.62,
            "range": "± 1.84",
            "unit": "ns/iter",
            "extra": "min: 114.82ns  p75: 124.40ns  p99: 161.44ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 9474.71,
            "range": "± 205.47",
            "unit": "ns/iter",
            "extra": "min: 8012.52ns  p75: 9795.00ns  p99: 9923.37ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 10134.31,
            "range": "± 185.5",
            "unit": "ns/iter",
            "extra": "min: 8869.86ns  p75: 10540.14ns  p99: 10631.87ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 76.39,
            "range": "± 3.25",
            "unit": "ns/iter",
            "extra": "min: 70.38ns  p75: 79.04ns  p99: 96.47ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 5163.72,
            "range": "± 477.04",
            "unit": "ns/iter",
            "extra": "min: 4670.44ns  p75: 5695.56ns  p99: 5868.83ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 5922.18,
            "range": "± 348.04",
            "unit": "ns/iter",
            "extra": "min: 5061.51ns  p75: 6175.21ns  p99: 7193.36ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 86.92,
            "range": "± 2.38",
            "unit": "ns/iter",
            "extra": "min: 79.83ns  p75: 88.47ns  p99: 105.74ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 9203.38,
            "range": "± 138.32",
            "unit": "ns/iter",
            "extra": "min: 8586.92ns  p75: 9379.30ns  p99: 9440.38ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 9986.39,
            "range": "± 218.77",
            "unit": "ns/iter",
            "extra": "min: 9243.68ns  p75: 10263.09ns  p99: 10454.58ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 3867.92,
            "range": "± 114.56",
            "unit": "ns/iter",
            "extra": "min: 3666.60ns  p75: 3956.30ns  p99: 4365.07ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (includes probe build)",
            "value": 7978.08,
            "range": "± 370.5",
            "unit": "ns/iter",
            "extra": "min: 6763.00ns  p75: 7859.00ns  p99: 15398.00ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (complete, includes probe build)",
            "value": 7641.47,
            "range": "± 101.69",
            "unit": "ns/iter",
            "extra": "min: 7375.03ns  p75: 7717.02ns  p99: 7876.08ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — incomplete match, warm probe",
            "value": 562.48,
            "range": "± 10.98",
            "unit": "ns/iter",
            "extra": "min: 532.06ns  p75: 569.18ns  p99: 645.04ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — complete match, warm probe",
            "value": 638.9,
            "range": "± 22.76",
            "unit": "ns/iter",
            "extra": "min: 595.93ns  p75: 664.98ns  p99: 726.59ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 8448.69,
            "range": "± 772.82",
            "unit": "ns/iter",
            "extra": "min: 7431.07ns  p75: 9120.65ns  p99: 9292.04ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec + isComplete (includes probe build)",
            "value": 13319.96,
            "range": "± 616.5",
            "unit": "ns/iter",
            "extra": "min: 10834.00ns  p75: 12583.00ns  p99: 26502.00ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — isComplete — same match, expansion probe cached",
            "value": 692.23,
            "range": "± 22.21",
            "unit": "ns/iter",
            "extra": "min: 648.42ns  p75: 715.69ns  p99: 768.76ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — exec + isComplete — fresh match, probe rebuilt per match",
            "value": 5932.15,
            "range": "± 471.5",
            "unit": "ns/iter",
            "extra": "min: 5390.19ns  p75: 6439.92ns  p99: 6836.06ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 8559.1,
            "range": "± 343.98",
            "unit": "ns/iter",
            "extra": "min: 7974.29ns  p75: 8853.31ns  p99: 8919.85ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec + isComplete (includes probe build)",
            "value": 12706.63,
            "range": "± 157.19",
            "unit": "ns/iter",
            "extra": "min: 12347.83ns  p75: 12762.32ns  p99: 13229.04ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — isComplete — warm instance",
            "value": 692.49,
            "range": "± 9.66",
            "unit": "ns/iter",
            "extra": "min: 658.84ns  p75: 696.65ns  p99: 764.35ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 4566.45,
            "range": "± 123.95",
            "unit": "ns/iter",
            "extra": "min: 4321.80ns  p75: 4663.98ns  p99: 4880.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 4573.04,
            "range": "± 117.03",
            "unit": "ns/iter",
            "extra": "min: 4336.27ns  p75: 4671.33ns  p99: 4837.96ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 4453.86,
            "range": "± 131.48",
            "unit": "ns/iter",
            "extra": "min: 4241.09ns  p75: 4566.27ns  p99: 4771.90ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 5747.95,
            "range": "± 68.13",
            "unit": "ns/iter",
            "extra": "min: 5567.58ns  p75: 5797.02ns  p99: 5987.12ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 5819.57,
            "range": "± 140.64",
            "unit": "ns/iter",
            "extra": "min: 5582.11ns  p75: 5961.41ns  p99: 6079.04ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 5921.7,
            "range": "± 175.78",
            "unit": "ns/iter",
            "extra": "min: 5620.74ns  p75: 6095.14ns  p99: 6274.21ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 5957,
            "range": "± 248.06",
            "unit": "ns/iter",
            "extra": "min: 5561.32ns  p75: 6190.82ns  p99: 6348.34ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 5763.71,
            "range": "± 140.78",
            "unit": "ns/iter",
            "extra": "min: 5447.81ns  p75: 5869.62ns  p99: 6170.26ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 6210.5,
            "range": "± 215.37",
            "unit": "ns/iter",
            "extra": "min: 5843.30ns  p75: 6417.41ns  p99: 6549.83ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 6112.55,
            "range": "± 166.26",
            "unit": "ns/iter",
            "extra": "min: 5765.90ns  p75: 6274.61ns  p99: 6511.67ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 4670.46,
            "range": "± 134.63",
            "unit": "ns/iter",
            "extra": "min: 4406.90ns  p75: 4804.25ns  p99: 5096.52ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 4583.68,
            "range": "± 164.71",
            "unit": "ns/iter",
            "extra": "min: 4288.08ns  p75: 4730.08ns  p99: 4923.59ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 4612,
            "range": "± 124.06",
            "unit": "ns/iter",
            "extra": "min: 4403.78ns  p75: 4718.31ns  p99: 4867.03ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 4536.17,
            "range": "± 124.38",
            "unit": "ns/iter",
            "extra": "min: 4364.31ns  p75: 4644.24ns  p99: 4771.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 4711.49,
            "range": "± 155.26",
            "unit": "ns/iter",
            "extra": "min: 4443.17ns  p75: 4841.55ns  p99: 4999.29ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 5404,
            "range": "± 136.02",
            "unit": "ns/iter",
            "extra": "min: 5147.17ns  p75: 5504.96ns  p99: 5696.99ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 7667.08,
            "range": "± 776.92",
            "unit": "ns/iter",
            "extra": "min: 6473.95ns  p75: 8304.31ns  p99: 8506.56ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 7762.22,
            "range": "± 767.98",
            "unit": "ns/iter",
            "extra": "min: 6595.95ns  p75: 8415.15ns  p99: 8612.49ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 6339.11,
            "range": "± 597.1",
            "unit": "ns/iter",
            "extra": "min: 5581.03ns  p75: 6949.48ns  p99: 7247.42ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 10866.64,
            "range": "± 220.9",
            "unit": "ns/iter",
            "extra": "min: 9929.16ns  p75: 11148.99ns  p99: 11285.28ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 31.98,
            "range": "± 1.42",
            "unit": "ns/iter",
            "extra": "min: 27.97ns  p75: 32.47ns  p99: 43.41ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 31.52,
            "range": "± 1.43",
            "unit": "ns/iter",
            "extra": "min: 27.21ns  p75: 31.32ns  p99: 77.84ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 1559.77,
            "range": "± 38.27",
            "unit": "ns/iter",
            "extra": "min: 1344.58ns  p75: 1437.02ns  p99: 3382.07ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 58.25,
            "range": "± 4.48",
            "unit": "ns/iter",
            "extra": "min: 50.75ns  p75: 61.94ns  p99: 81.50ns"
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
          "id": "b78d9b84bb115d49afc4d3cabb250c3674428c98",
          "message": "[83] fix forward backreferences (#87)\n\n* fix forward backreferences\n* split into separate files\n* prefer parenthesis\n* fix for duplicate named groups\n* clarification regarding self-referencing groups\n* clarity regarding incomplete numeric references\n* prove expand() keeps a forward reference",
          "timestamp": "2026-09-03T22:12:17+01:00",
          "tree_id": "aad408e24aa54658036979624e2366a17c63665e",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/b78d9b84bb115d49afc4d3cabb250c3674428c98"
        },
        "date": 1788470013890,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 37.72,
            "range": "± 2.77",
            "unit": "ns/iter",
            "extra": "min: 29.87ns  p75: 39.20ns  p99: 67.59ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 76.36,
            "range": "± 2.59",
            "unit": "ns/iter",
            "extra": "min: 67.42ns  p75: 76.36ns  p99: 122.53ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 76.07,
            "range": "± 2.18",
            "unit": "ns/iter",
            "extra": "min: 68.65ns  p75: 76.33ns  p99: 104.76ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 29.46,
            "range": "± 1.88",
            "unit": "ns/iter",
            "extra": "min: 24.39ns  p75: 30.89ns  p99: 49.38ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 66.53,
            "range": "± 3.87",
            "unit": "ns/iter",
            "extra": "min: 57.67ns  p75: 70.01ns  p99: 87.44ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 71.11,
            "range": "± 4.03",
            "unit": "ns/iter",
            "extra": "min: 60.16ns  p75: 72.75ns  p99: 115.39ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 46723.34,
            "range": "± 3098",
            "unit": "ns/iter",
            "extra": "min: 37638.00ns  p75: 48764.00ns  p99: 67026.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 58499.74,
            "range": "± 6008",
            "unit": "ns/iter",
            "extra": "min: 47138.00ns  p75: 62751.00ns  p99: 89281.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 54940.52,
            "range": "± 3238",
            "unit": "ns/iter",
            "extra": "min: 42172.00ns  p75: 57340.00ns  p99: 76700.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 138556.9,
            "range": "± 9711",
            "unit": "ns/iter",
            "extra": "min: 108221.00ns  p75: 137318.00ns  p99: 276547.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 340.07,
            "range": "± 7.86",
            "unit": "ns/iter",
            "extra": "min: 286.02ns  p75: 348.29ns  p99: 368.50ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1181.6,
            "range": "± 19.8",
            "unit": "ns/iter",
            "extra": "min: 1021.54ns  p75: 1203.48ns  p99: 1259.78ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1797.29,
            "range": "± 35.09",
            "unit": "ns/iter",
            "extra": "min: 1718.99ns  p75: 1830.06ns  p99: 1910.46ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 185.55,
            "range": "± 5.92",
            "unit": "ns/iter",
            "extra": "min: 158.44ns  p75: 192.70ns  p99: 208.14ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 337.74,
            "range": "± 8.33",
            "unit": "ns/iter",
            "extra": "min: 289.53ns  p75: 347.00ns  p99: 366.76ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 623.96,
            "range": "± 30.61",
            "unit": "ns/iter",
            "extra": "min: 578.09ns  p75: 655.63ns  p99: 717.89ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 38.95,
            "range": "± 1.43",
            "unit": "ns/iter",
            "extra": "min: 32.81ns  p75: 39.62ns  p99: 52.95ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 56.09,
            "range": "± 3.83",
            "unit": "ns/iter",
            "extra": "min: 46.34ns  p75: 58.65ns  p99: 80.81ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1581.45,
            "range": "± 74.5",
            "unit": "ns/iter",
            "extra": "min: 1320.39ns  p75: 1505.34ns  p99: 3516.77ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1561.21,
            "range": "± 43.61",
            "unit": "ns/iter",
            "extra": "min: 1304.79ns  p75: 1421.90ns  p99: 3489.76ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 79.07,
            "range": "± 5.17",
            "unit": "ns/iter",
            "extra": "min: 69.57ns  p75: 83.80ns  p99: 99.68ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 97.64,
            "range": "± 5.22",
            "unit": "ns/iter",
            "extra": "min: 87.99ns  p75: 101.55ns  p99: 128.74ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7391.39,
            "range": "± 319",
            "unit": "ns/iter",
            "extra": "min: 6025.00ns  p75: 6876.00ns  p99: 10915.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 109.94,
            "range": "± 6",
            "unit": "ns/iter",
            "extra": "min: 92.35ns  p75: 114.91ns  p99: 142.66ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 1513.4,
            "range": "± 44.15",
            "unit": "ns/iter",
            "extra": "min: 1319.95ns  p75: 1432.82ns  p99: 2917.45ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 9072.92,
            "range": "± 724.92",
            "unit": "ns/iter",
            "extra": "min: 7759.99ns  p75: 9528.44ns  p99: 9827.96ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 594725.78,
            "range": "± 30463.5",
            "unit": "ns/iter",
            "extra": "min: 474296.00ns  p75: 548989.00ns  p99: 901838.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 72.14,
            "range": "± 3.66",
            "unit": "ns/iter",
            "extra": "min: 64.74ns  p75: 75.09ns  p99: 94.54ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 2982.29,
            "range": "± 117.64",
            "unit": "ns/iter",
            "extra": "min: 2779.41ns  p75: 3068.89ns  p99: 3374.84ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 3482.57,
            "range": "± 204.83",
            "unit": "ns/iter",
            "extra": "min: 3135.29ns  p75: 3653.64ns  p99: 4023.82ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 118.74,
            "range": "± 8.83",
            "unit": "ns/iter",
            "extra": "min: 102.45ns  p75: 125.75ns  p99: 188.67ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 4136.84,
            "range": "± 57.13",
            "unit": "ns/iter",
            "extra": "min: 3976.67ns  p75: 4140.45ns  p99: 4484.39ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 4789.5,
            "range": "± 142.37",
            "unit": "ns/iter",
            "extra": "min: 4487.28ns  p75: 4901.67ns  p99: 5249.27ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 122.95,
            "range": "± 2.86",
            "unit": "ns/iter",
            "extra": "min: 114.38ns  p75: 123.34ns  p99: 151.13ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 9325.58,
            "range": "± 220.5",
            "unit": "ns/iter",
            "extra": "min: 7810.19ns  p75: 9559.59ns  p99: 10158.84ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 9745.42,
            "range": "± 178.95",
            "unit": "ns/iter",
            "extra": "min: 8970.07ns  p75: 9938.08ns  p99: 10259.85ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 73.97,
            "range": "± 3.45",
            "unit": "ns/iter",
            "extra": "min: 66.51ns  p75: 76.21ns  p99: 96.77ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 5596.66,
            "range": "± 388.55",
            "unit": "ns/iter",
            "extra": "min: 4674.54ns  p75: 6017.05ns  p99: 6267.07ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 6215.29,
            "range": "± 571.77",
            "unit": "ns/iter",
            "extra": "min: 5316.87ns  p75: 6728.76ns  p99: 7190.03ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 85.89,
            "range": "± 3.3",
            "unit": "ns/iter",
            "extra": "min: 78.38ns  p75: 87.61ns  p99: 105.85ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 9581.55,
            "range": "± 246.71",
            "unit": "ns/iter",
            "extra": "min: 8905.91ns  p75: 9764.42ns  p99: 10202.50ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 10174.02,
            "range": "± 371.54",
            "unit": "ns/iter",
            "extra": "min: 9536.02ns  p75: 10529.96ns  p99: 10833.92ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 3743.58,
            "range": "± 128.69",
            "unit": "ns/iter",
            "extra": "min: 3518.82ns  p75: 3806.19ns  p99: 4093.06ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (includes probe build)",
            "value": 7957.22,
            "range": "± 534",
            "unit": "ns/iter",
            "extra": "min: 6891.00ns  p75: 8210.00ns  p99: 14337.00ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (complete, includes probe build)",
            "value": 8000.23,
            "range": "± 168.36",
            "unit": "ns/iter",
            "extra": "min: 7377.05ns  p75: 8139.17ns  p99: 8470.86ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — incomplete match, warm probe",
            "value": 555.16,
            "range": "± 22.88",
            "unit": "ns/iter",
            "extra": "min: 519.99ns  p75: 572.18ns  p99: 670.46ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — complete match, warm probe",
            "value": 595.83,
            "range": "± 16.52",
            "unit": "ns/iter",
            "extra": "min: 565.01ns  p75: 603.19ns  p99: 703.88ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 8366.42,
            "range": "± 267.2",
            "unit": "ns/iter",
            "extra": "min: 7213.29ns  p75: 8695.03ns  p99: 9375.45ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec + isComplete (includes probe build)",
            "value": 13126.79,
            "range": "± 737.5",
            "unit": "ns/iter",
            "extra": "min: 10721.00ns  p75: 12546.00ns  p99: 25762.00ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — isComplete — same match, expansion probe cached",
            "value": 697.03,
            "range": "± 15.25",
            "unit": "ns/iter",
            "extra": "min: 652.30ns  p75: 701.74ns  p99: 801.41ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — exec + isComplete — fresh match, probe rebuilt per match",
            "value": 6015.23,
            "range": "± 246.3",
            "unit": "ns/iter",
            "extra": "min: 5297.19ns  p75: 6206.59ns  p99: 6847.58ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 8788.31,
            "range": "± 501.75",
            "unit": "ns/iter",
            "extra": "min: 7891.64ns  p75: 9230.54ns  p99: 9358.12ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec + isComplete (includes probe build)",
            "value": 12886.38,
            "range": "± 94.45",
            "unit": "ns/iter",
            "extra": "min: 12535.80ns  p75: 12802.20ns  p99: 13539.11ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — isComplete — warm instance",
            "value": 697.76,
            "range": "± 39.41",
            "unit": "ns/iter",
            "extra": "min: 647.22ns  p75: 738.37ns  p99: 808.04ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 4513.12,
            "range": "± 186.67",
            "unit": "ns/iter",
            "extra": "min: 4173.53ns  p75: 4655.05ns  p99: 4927.80ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 4687.62,
            "range": "± 229.6",
            "unit": "ns/iter",
            "extra": "min: 4298.78ns  p75: 4917.27ns  p99: 5106.99ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 4672.76,
            "range": "± 239.55",
            "unit": "ns/iter",
            "extra": "min: 4229.73ns  p75: 4887.35ns  p99: 5064.05ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 5873.47,
            "range": "± 258.61",
            "unit": "ns/iter",
            "extra": "min: 5337.05ns  p75: 6115.85ns  p99: 6368.92ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 6016.41,
            "range": "± 208.7",
            "unit": "ns/iter",
            "extra": "min: 5448.83ns  p75: 6246.01ns  p99: 6441.05ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 5864.59,
            "range": "± 154.99",
            "unit": "ns/iter",
            "extra": "min: 5487.74ns  p75: 5985.45ns  p99: 6453.02ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 6365.07,
            "range": "± 146.82",
            "unit": "ns/iter",
            "extra": "min: 6121.17ns  p75: 6486.12ns  p99: 6634.28ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 5706.25,
            "range": "± 182.68",
            "unit": "ns/iter",
            "extra": "min: 5339.22ns  p75: 5888.20ns  p99: 5988.23ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 6388.27,
            "range": "± 268.24",
            "unit": "ns/iter",
            "extra": "min: 5720.02ns  p75: 6634.45ns  p99: 6840.97ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 5867.3,
            "range": "± 158.49",
            "unit": "ns/iter",
            "extra": "min: 5400.84ns  p75: 6035.01ns  p99: 6278.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 4864.73,
            "range": "± 250.71",
            "unit": "ns/iter",
            "extra": "min: 4398.93ns  p75: 5080.89ns  p99: 5274.05ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 4756.17,
            "range": "± 350.1",
            "unit": "ns/iter",
            "extra": "min: 4232.65ns  p75: 5088.40ns  p99: 5184.93ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 4675.9,
            "range": "± 118.93",
            "unit": "ns/iter",
            "extra": "min: 4402.60ns  p75: 4779.92ns  p99: 5091.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 4663.42,
            "range": "± 212.74",
            "unit": "ns/iter",
            "extra": "min: 4281.30ns  p75: 4807.70ns  p99: 5219.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 4835.06,
            "range": "± 141.09",
            "unit": "ns/iter",
            "extra": "min: 4528.12ns  p75: 4963.72ns  p99: 5289.81ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 5469.84,
            "range": "± 233.44",
            "unit": "ns/iter",
            "extra": "min: 5052.10ns  p75: 5672.36ns  p99: 5931.86ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 7494.3,
            "range": "± 678.8",
            "unit": "ns/iter",
            "extra": "min: 6427.61ns  p75: 8172.19ns  p99: 8487.91ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 8223.19,
            "range": "± 780.7",
            "unit": "ns/iter",
            "extra": "min: 6925.37ns  p75: 8832.54ns  p99: 9075.71ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 6428.94,
            "range": "± 429.46",
            "unit": "ns/iter",
            "extra": "min: 5495.45ns  p75: 6801.00ns  p99: 7485.30ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 10786.25,
            "range": "± 194.24",
            "unit": "ns/iter",
            "extra": "min: 10242.29ns  p75: 10971.61ns  p99: 11143.04ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 28.08,
            "range": "± 1.59",
            "unit": "ns/iter",
            "extra": "min: 24.06ns  p75: 29.02ns  p99: 46.62ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 26.3,
            "range": "± 1.56",
            "unit": "ns/iter",
            "extra": "min: 22.70ns  p75: 27.44ns  p99: 36.15ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 1527.75,
            "range": "± 74.01",
            "unit": "ns/iter",
            "extra": "min: 1295.51ns  p75: 1459.82ns  p99: 3240.14ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 52.88,
            "range": "± 3.72",
            "unit": "ns/iter",
            "extra": "min: 45.66ns  p75: 55.87ns  p99: 81.65ns"
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
          "id": "fb664ceb5322e45354473455c0f6b555be24381d",
          "message": "[77] ensure tree-shaking consumers can avoid importing isComplete (#90)\n\n* ensure tree-shaking consumers can avoid importing isComplete\n* enable sideEffects only for /extend",
          "timestamp": "2026-09-04T15:25:14+01:00",
          "tree_id": "c9ed3e5e66e728cc2829c6e9863d0a280f976da8",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/fb664ceb5322e45354473455c0f6b555be24381d"
        },
        "date": 1788531991986,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 42.25,
            "range": "± 0.34",
            "unit": "ns/iter",
            "extra": "min: 39.39ns  p75: 40.92ns  p99: 79.12ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 92.18,
            "range": "± 1.67",
            "unit": "ns/iter",
            "extra": "min: 84.93ns  p75: 89.23ns  p99: 169.60ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 90.73,
            "range": "± 1.36",
            "unit": "ns/iter",
            "extra": "min: 86.62ns  p75: 91.50ns  p99: 112.06ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 23.58,
            "range": "± 0",
            "unit": "ns/iter",
            "extra": "min: 23.05ns  p75: 23.13ns  p99: 29.70ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 78.95,
            "range": "± 1.21",
            "unit": "ns/iter",
            "extra": "min: 75.78ns  p75: 79.67ns  p99: 97.88ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 86.76,
            "range": "± 1.75",
            "unit": "ns/iter",
            "extra": "min: 78.07ns  p75: 84.16ns  p99: 173.64ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 54487.16,
            "range": "± 1183.73",
            "unit": "ns/iter",
            "extra": "min: 52331.76ns  p75: 55079.89ns  p99: 57012.85ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 78595.7,
            "range": "± 796.5",
            "unit": "ns/iter",
            "extra": "min: 73197.00ns  p75: 76262.00ns  p99: 135322.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 58411.47,
            "range": "± 466.5",
            "unit": "ns/iter",
            "extra": "min: 54983.00ns  p75: 57037.00ns  p99: 84827.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 217910.69,
            "range": "± 71944",
            "unit": "ns/iter",
            "extra": "min: 163525.00ns  p75: 311140.00ns  p99: 389305.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 364.03,
            "range": "± 2.01",
            "unit": "ns/iter",
            "extra": "min: 357.85ns  p75: 364.83ns  p99: 391.94ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1390.13,
            "range": "± 4.02",
            "unit": "ns/iter",
            "extra": "min: 1362.82ns  p75: 1391.36ns  p99: 1412.50ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 2145.2,
            "range": "± 9.96",
            "unit": "ns/iter",
            "extra": "min: 2117.21ns  p75: 2154.70ns  p99: 2181.82ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 219.76,
            "range": "± 0.41",
            "unit": "ns/iter",
            "extra": "min: 207.77ns  p75: 217.89ns  p99: 248.38ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 382.2,
            "range": "± 3.94",
            "unit": "ns/iter",
            "extra": "min: 371.99ns  p75: 385.14ns  p99: 402.27ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 702.09,
            "range": "± 2.31",
            "unit": "ns/iter",
            "extra": "min: 693.79ns  p75: 702.05ns  p99: 726.67ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 41.37,
            "range": "± 0.12",
            "unit": "ns/iter",
            "extra": "min: 40.24ns  p75: 40.73ns  p99: 55.92ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 66.54,
            "range": "± 1.25",
            "unit": "ns/iter",
            "extra": "min: 64.82ns  p75: 67.66ns  p99: 88.26ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 2059.9,
            "range": "± 27.84",
            "unit": "ns/iter",
            "extra": "min: 1810.70ns  p75: 1887.33ns  p99: 4424.81ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1994.72,
            "range": "± 25.58",
            "unit": "ns/iter",
            "extra": "min: 1752.55ns  p75: 1816.78ns  p99: 4342.28ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 92.04,
            "range": "± 0.89",
            "unit": "ns/iter",
            "extra": "min: 88.66ns  p75: 92.49ns  p99: 115.17ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 125.94,
            "range": "± 1.34",
            "unit": "ns/iter",
            "extra": "min: 119.85ns  p75: 125.28ns  p99: 202.55ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 8892.98,
            "range": "± 75",
            "unit": "ns/iter",
            "extra": "min: 7724.00ns  p75: 7985.00ns  p99: 15519.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 127.82,
            "range": "± 2.1",
            "unit": "ns/iter",
            "extra": "min: 119.75ns  p75: 128.76ns  p99: 153.75ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 1951.46,
            "range": "± 13.04",
            "unit": "ns/iter",
            "extra": "min: 1790.40ns  p75: 1823.14ns  p99: 3468.78ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 11633.14,
            "range": "± 930.61",
            "unit": "ns/iter",
            "extra": "min: 10265.28ns  p75: 12416.72ns  p99: 12527.97ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 719249.88,
            "range": "± 7503.5",
            "unit": "ns/iter",
            "extra": "min: 608568.00ns  p75: 633253.00ns  p99: 1648982.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 108.67,
            "range": "± 2.45",
            "unit": "ns/iter",
            "extra": "min: 98.49ns  p75: 104.22ns  p99: 195.51ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 3403.39,
            "range": "± 12.64",
            "unit": "ns/iter",
            "extra": "min: 3368.07ns  p75: 3407.32ns  p99: 3463.95ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 4064.78,
            "range": "± 168.98",
            "unit": "ns/iter",
            "extra": "min: 3854.53ns  p75: 4212.87ns  p99: 4842.17ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 144.39,
            "range": "± 1.39",
            "unit": "ns/iter",
            "extra": "min: 138.28ns  p75: 144.87ns  p99: 164.97ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 4955.8,
            "range": "± 13.21",
            "unit": "ns/iter",
            "extra": "min: 4906.83ns  p75: 4953.65ns  p99: 5113.09ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 5674.49,
            "range": "± 163.96",
            "unit": "ns/iter",
            "extra": "min: 5426.24ns  p75: 5789.88ns  p99: 5959.33ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 155.45,
            "range": "± 1.23",
            "unit": "ns/iter",
            "extra": "min: 150.14ns  p75: 155.27ns  p99: 173.57ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 11422.07,
            "range": "± 95.97",
            "unit": "ns/iter",
            "extra": "min: 9867.12ns  p75: 11620.10ns  p99: 11786.75ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 12241.9,
            "range": "± 142.47",
            "unit": "ns/iter",
            "extra": "min: 11011.66ns  p75: 12497.03ns  p99: 12611.18ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 102.88,
            "range": "± 1.36",
            "unit": "ns/iter",
            "extra": "min: 99.15ns  p75: 102.82ns  p99: 161.35ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 6102.5,
            "range": "± 499.72",
            "unit": "ns/iter",
            "extra": "min: 5658.74ns  p75: 6671.30ns  p99: 6711.85ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 6801.22,
            "range": "± 468.32",
            "unit": "ns/iter",
            "extra": "min: 6151.40ns  p75: 7360.89ns  p99: 7510.34ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 114.24,
            "range": "± 1.37",
            "unit": "ns/iter",
            "extra": "min: 111.13ns  p75: 114.60ns  p99: 137.12ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 11416.85,
            "range": "± 14.27",
            "unit": "ns/iter",
            "extra": "min: 10711.72ns  p75: 11500.39ns  p99: 11527.56ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 12228.9,
            "range": "± 69.92",
            "unit": "ns/iter",
            "extra": "min: 11806.72ns  p75: 12334.82ns  p99: 12366.20ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 4545.56,
            "range": "± 165.49",
            "unit": "ns/iter",
            "extra": "min: 4357.97ns  p75: 4712.74ns  p99: 4859.49ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (includes probe build)",
            "value": 10175.77,
            "range": "± 120",
            "unit": "ns/iter",
            "extra": "min: 8896.00ns  p75: 9377.00ns  p99: 24656.00ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (complete, includes probe build)",
            "value": 9313.79,
            "range": "± 73.26",
            "unit": "ns/iter",
            "extra": "min: 9078.50ns  p75: 9374.80ns  p99: 9468.82ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — incomplete match, warm probe",
            "value": 733.43,
            "range": "± 2.99",
            "unit": "ns/iter",
            "extra": "min: 722.79ns  p75: 732.00ns  p99: 767.86ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — complete match, warm probe",
            "value": 767.32,
            "range": "± 3.1",
            "unit": "ns/iter",
            "extra": "min: 756.88ns  p75: 767.78ns  p99: 799.60ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 10267.27,
            "range": "± 698.6",
            "unit": "ns/iter",
            "extra": "min: 9226.25ns  p75: 10827.92ns  p99: 11199.60ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec + isComplete (includes probe build)",
            "value": 16938.26,
            "range": "± 215.5",
            "unit": "ns/iter",
            "extra": "min: 14397.00ns  p75: 15228.00ns  p99: 40245.00ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — isComplete — same match, expansion probe cached",
            "value": 836.11,
            "range": "± 2.95",
            "unit": "ns/iter",
            "extra": "min: 826.56ns  p75: 836.15ns  p99: 878.26ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — exec + isComplete — fresh match, probe rebuilt per match",
            "value": 6871.1,
            "range": "± 442.46",
            "unit": "ns/iter",
            "extra": "min: 6522.87ns  p75: 7419.75ns  p99: 7518.27ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 10665.09,
            "range": "± 100.5",
            "unit": "ns/iter",
            "extra": "min: 9708.00ns  p75: 10119.00ns  p99: 22362.00ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec + isComplete (includes probe build)",
            "value": 16067.1,
            "range": "± 585.48",
            "unit": "ns/iter",
            "extra": "min: 14842.88ns  p75: 16475.27ns  p99: 17236.75ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — isComplete — warm instance",
            "value": 850.85,
            "range": "± 4.2",
            "unit": "ns/iter",
            "extra": "min: 841.46ns  p75: 852.66ns  p99: 893.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 5163.6,
            "range": "± 180.22",
            "unit": "ns/iter",
            "extra": "min: 4941.97ns  p75: 5336.11ns  p99: 5458.51ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 5231.73,
            "range": "± 144.72",
            "unit": "ns/iter",
            "extra": "min: 5048.85ns  p75: 5370.31ns  p99: 5435.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 5118.52,
            "range": "± 152.74",
            "unit": "ns/iter",
            "extra": "min: 4922.06ns  p75: 5246.84ns  p99: 5321.57ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 6762.39,
            "range": "± 118.98",
            "unit": "ns/iter",
            "extra": "min: 6472.99ns  p75: 6909.88ns  p99: 6973.67ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 6819.91,
            "range": "± 41.42",
            "unit": "ns/iter",
            "extra": "min: 6558.87ns  p75: 6902.24ns  p99: 7003.54ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 6825.72,
            "range": "± 57.64",
            "unit": "ns/iter",
            "extra": "min: 6562.00ns  p75: 6911.17ns  p99: 7065.17ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 7286.16,
            "range": "± 69.08",
            "unit": "ns/iter",
            "extra": "min: 7004.93ns  p75: 7367.79ns  p99: 7433.65ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 6794.71,
            "range": "± 85.11",
            "unit": "ns/iter",
            "extra": "min: 6517.85ns  p75: 6887.20ns  p99: 7032.54ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 7073.77,
            "range": "± 72.49",
            "unit": "ns/iter",
            "extra": "min: 6841.93ns  p75: 7160.91ns  p99: 7248.14ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 6974.92,
            "range": "± 197.06",
            "unit": "ns/iter",
            "extra": "min: 6660.23ns  p75: 7085.30ns  p99: 7195.97ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 5255.83,
            "range": "± 137.99",
            "unit": "ns/iter",
            "extra": "min: 5063.15ns  p75: 5374.29ns  p99: 5551.83ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 5220.02,
            "range": "± 171.84",
            "unit": "ns/iter",
            "extra": "min: 4995.80ns  p75: 5361.23ns  p99: 5510.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 5264.63,
            "range": "± 150.47",
            "unit": "ns/iter",
            "extra": "min: 5084.57ns  p75: 5405.40ns  p99: 5516.03ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 5240.63,
            "range": "± 144.9",
            "unit": "ns/iter",
            "extra": "min: 5067.39ns  p75: 5362.93ns  p99: 5481.79ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 5382.42,
            "range": "± 156.93",
            "unit": "ns/iter",
            "extra": "min: 5170.92ns  p75: 5513.09ns  p99: 5632.90ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 6486.83,
            "range": "± 186.76",
            "unit": "ns/iter",
            "extra": "min: 6190.39ns  p75: 6608.57ns  p99: 6732.33ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 9133.13,
            "range": "± 844.45",
            "unit": "ns/iter",
            "extra": "min: 8119.65ns  p75: 9894.29ns  p99: 10201.44ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 10118.76,
            "range": "± 971.43",
            "unit": "ns/iter",
            "extra": "min: 8854.92ns  p75: 10829.20ns  p99: 10998.73ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 7570.43,
            "range": "± 514.7",
            "unit": "ns/iter",
            "extra": "min: 6949.37ns  p75: 8082.75ns  p99: 8331.39ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 13153.15,
            "range": "± 28.18",
            "unit": "ns/iter",
            "extra": "min: 13083.15ns  p75: 13156.58ns  p99: 13276.05ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 35.84,
            "range": "± 0.09",
            "unit": "ns/iter",
            "extra": "min: 34.70ns  p75: 35.10ns  p99: 57.14ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 34.36,
            "range": "± 0.11",
            "unit": "ns/iter",
            "extra": "min: 33.16ns  p75: 33.65ns  p99: 57.21ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 1978.5,
            "range": "± 6.96",
            "unit": "ns/iter",
            "extra": "min: 1778.57ns  p75: 1797.95ns  p99: 4035.37ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 67.07,
            "range": "± 1.27",
            "unit": "ns/iter",
            "extra": "min: 64.94ns  p75: 67.87ns  p99: 92.31ns"
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
          "id": "fb664ceb5322e45354473455c0f6b555be24381d",
          "message": "[77] ensure tree-shaking consumers can avoid importing isComplete (#90)\n\n* ensure tree-shaking consumers can avoid importing isComplete\n* enable sideEffects only for /extend",
          "timestamp": "2026-09-04T15:25:14+01:00",
          "tree_id": "c9ed3e5e66e728cc2829c6e9863d0a280f976da8",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/fb664ceb5322e45354473455c0f6b555be24381d"
        },
        "date": 1788532356659,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 45.19,
            "range": "± 1.28",
            "unit": "ns/iter",
            "extra": "min: 39.67ns  p75: 43.47ns  p99: 95.74ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 92.13,
            "range": "± 1.91",
            "unit": "ns/iter",
            "extra": "min: 84.61ns  p75: 91.03ns  p99: 133.41ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 90.96,
            "range": "± 1.62",
            "unit": "ns/iter",
            "extra": "min: 86.61ns  p75: 90.20ns  p99: 191.00ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 25.5,
            "range": "± 0.1",
            "unit": "ns/iter",
            "extra": "min: 23.05ns  p75: 23.33ns  p99: 48.59ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 80.55,
            "range": "± 1.33",
            "unit": "ns/iter",
            "extra": "min: 75.60ns  p75: 79.56ns  p99: 166.18ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 92.8,
            "range": "± 2.37",
            "unit": "ns/iter",
            "extra": "min: 77.69ns  p75: 83.72ns  p99: 180.70ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 79270.35,
            "range": "± 28262.5",
            "unit": "ns/iter",
            "extra": "min: 50484.00ns  p75: 107921.00ns  p99: 140603.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 77663.15,
            "range": "± 801",
            "unit": "ns/iter",
            "extra": "min: 70191.00ns  p75: 73317.00ns  p99: 155030.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 58964.48,
            "range": "± 1046.5",
            "unit": "ns/iter",
            "extra": "min: 55173.00ns  p75: 58449.00ns  p99: 91041.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 190357.08,
            "range": "± 7955",
            "unit": "ns/iter",
            "extra": "min: 155291.00ns  p75: 173986.00ns  p99: 360686.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 363.11,
            "range": "± 1.12",
            "unit": "ns/iter",
            "extra": "min: 358.61ns  p75: 363.19ns  p99: 382.74ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1387.05,
            "range": "± 4.05",
            "unit": "ns/iter",
            "extra": "min: 1354.98ns  p75: 1391.19ns  p99: 1416.17ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 2051.4,
            "range": "± 15.57",
            "unit": "ns/iter",
            "extra": "min: 1981.15ns  p75: 2062.48ns  p99: 2190.80ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 209.37,
            "range": "± 0.62",
            "unit": "ns/iter",
            "extra": "min: 204.04ns  p75: 208.06ns  p99: 270.89ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 376.98,
            "range": "± 2.34",
            "unit": "ns/iter",
            "extra": "min: 369.89ns  p75: 378.36ns  p99: 395.72ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 696.36,
            "range": "± 1.9",
            "unit": "ns/iter",
            "extra": "min: 683.69ns  p75: 690.74ns  p99: 831.27ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 41.36,
            "range": "± 0.12",
            "unit": "ns/iter",
            "extra": "min: 40.05ns  p75: 40.53ns  p99: 61.45ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 67.68,
            "range": "± 1.33",
            "unit": "ns/iter",
            "extra": "min: 65.18ns  p75: 68.30ns  p99: 88.70ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 2504.55,
            "range": "± 25.5",
            "unit": "ns/iter",
            "extra": "min: 2164.00ns  p75: 2285.00ns  p99: 4549.00ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1982.75,
            "range": "± 25.4",
            "unit": "ns/iter",
            "extra": "min: 1755.68ns  p75: 1816.50ns  p99: 4064.56ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 92.31,
            "range": "± 0.87",
            "unit": "ns/iter",
            "extra": "min: 88.08ns  p75: 92.68ns  p99: 113.87ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 126.2,
            "range": "± 1.83",
            "unit": "ns/iter",
            "extra": "min: 119.49ns  p75: 126.39ns  p99: 153.53ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 8719.14,
            "range": "± 85.5",
            "unit": "ns/iter",
            "extra": "min: 7564.00ns  p75: 7855.00ns  p99: 15328.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 127.42,
            "range": "± 1.96",
            "unit": "ns/iter",
            "extra": "min: 119.62ns  p75: 128.33ns  p99: 156.27ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 1968.42,
            "range": "± 17.89",
            "unit": "ns/iter",
            "extra": "min: 1784.00ns  p75: 1826.33ns  p99: 3552.99ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 11703.23,
            "range": "± 936.03",
            "unit": "ns/iter",
            "extra": "min: 10361.56ns  p75: 12427.10ns  p99: 12669.00ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 703315.92,
            "range": "± 7198",
            "unit": "ns/iter",
            "extra": "min: 607907.00ns  p75: 628685.00ns  p99: 779909.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 104.23,
            "range": "± 1.28",
            "unit": "ns/iter",
            "extra": "min: 101.01ns  p75: 104.86ns  p99: 125.07ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 3413.32,
            "range": "± 16.62",
            "unit": "ns/iter",
            "extra": "min: 3371.83ns  p75: 3419.54ns  p99: 3549.97ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 4001.36,
            "range": "± 124.24",
            "unit": "ns/iter",
            "extra": "min: 3849.47ns  p75: 4108.74ns  p99: 4345.22ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 146.68,
            "range": "± 1.23",
            "unit": "ns/iter",
            "extra": "min: 141.25ns  p75: 147.40ns  p99: 158.99ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 4944.77,
            "range": "± 13.87",
            "unit": "ns/iter",
            "extra": "min: 4909.95ns  p75: 4949.12ns  p99: 4999.19ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 5696.91,
            "range": "± 129.84",
            "unit": "ns/iter",
            "extra": "min: 5446.30ns  p75: 5719.73ns  p99: 6226.76ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 154.09,
            "range": "± 1.55",
            "unit": "ns/iter",
            "extra": "min: 148.85ns  p75: 154.86ns  p99: 170.17ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 11450.63,
            "range": "± 142.86",
            "unit": "ns/iter",
            "extra": "min: 9855.03ns  p75: 11640.32ns  p99: 11935.45ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 12131.86,
            "range": "± 217.26",
            "unit": "ns/iter",
            "extra": "min: 10895.75ns  p75: 12410.52ns  p99: 12502.32ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 102.39,
            "range": "± 1.28",
            "unit": "ns/iter",
            "extra": "min: 99.26ns  p75: 102.96ns  p99: 116.21ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 6073.17,
            "range": "± 475.31",
            "unit": "ns/iter",
            "extra": "min: 5650.12ns  p75: 6609.11ns  p99: 6657.99ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 6776.36,
            "range": "± 468.53",
            "unit": "ns/iter",
            "extra": "min: 6153.80ns  p75: 7358.54ns  p99: 7444.47ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 113.51,
            "range": "± 1.29",
            "unit": "ns/iter",
            "extra": "min: 110.72ns  p75: 114.21ns  p99: 128.38ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 11436.9,
            "range": "± 19.44",
            "unit": "ns/iter",
            "extra": "min: 10731.13ns  p75: 11517.16ns  p99: 11557.58ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 12324.96,
            "range": "± 100.23",
            "unit": "ns/iter",
            "extra": "min: 11703.88ns  p75: 12428.47ns  p99: 12594.10ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 4553.8,
            "range": "± 147.11",
            "unit": "ns/iter",
            "extra": "min: 4346.24ns  p75: 4663.07ns  p99: 4953.25ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (includes probe build)",
            "value": 9833.26,
            "range": "± 125",
            "unit": "ns/iter",
            "extra": "min: 8857.00ns  p75: 9307.00ns  p99: 24135.00ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (complete, includes probe build)",
            "value": 9354.46,
            "range": "± 76.95",
            "unit": "ns/iter",
            "extra": "min: 9132.55ns  p75: 9344.37ns  p99: 9803.97ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — incomplete match, warm probe",
            "value": 713.66,
            "range": "± 1.99",
            "unit": "ns/iter",
            "extra": "min: 703.64ns  p75: 711.21ns  p99: 752.06ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — complete match, warm probe",
            "value": 772.31,
            "range": "± 1.99",
            "unit": "ns/iter",
            "extra": "min: 762.31ns  p75: 769.75ns  p99: 836.27ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 10181.52,
            "range": "± 561.28",
            "unit": "ns/iter",
            "extra": "min: 9194.20ns  p75: 10740.91ns  p99: 10811.10ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec + isComplete (includes probe build)",
            "value": 17121.61,
            "range": "± 205",
            "unit": "ns/iter",
            "extra": "min: 14537.00ns  p75: 15338.00ns  p99: 40445.00ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — isComplete — same match, expansion probe cached",
            "value": 864.66,
            "range": "± 2.12",
            "unit": "ns/iter",
            "extra": "min: 849.70ns  p75: 861.33ns  p99: 958.54ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — exec + isComplete — fresh match, probe rebuilt per match",
            "value": 7023.83,
            "range": "± 449.21",
            "unit": "ns/iter",
            "extra": "min: 6592.12ns  p75: 7534.14ns  p99: 7562.68ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 10820.64,
            "range": "± 100",
            "unit": "ns/iter",
            "extra": "min: 9678.00ns  p75: 10109.00ns  p99: 22172.00ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec + isComplete (includes probe build)",
            "value": 15922.38,
            "range": "± 469.38",
            "unit": "ns/iter",
            "extra": "min: 14717.76ns  p75: 16051.48ns  p99: 17007.83ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — isComplete — warm instance",
            "value": 871.02,
            "range": "± 5.52",
            "unit": "ns/iter",
            "extra": "min: 859.80ns  p75: 873.78ns  p99: 912.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 5156.07,
            "range": "± 154.48",
            "unit": "ns/iter",
            "extra": "min: 4952.84ns  p75: 5282.43ns  p99: 5391.83ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 5217.91,
            "range": "± 132.82",
            "unit": "ns/iter",
            "extra": "min: 5052.11ns  p75: 5335.02ns  p99: 5453.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 5119.19,
            "range": "± 142.83",
            "unit": "ns/iter",
            "extra": "min: 4922.68ns  p75: 5252.24ns  p99: 5358.19ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 6674.84,
            "range": "± 69.59",
            "unit": "ns/iter",
            "extra": "min: 6473.83ns  p75: 6772.34ns  p99: 6827.78ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 6758.42,
            "range": "± 94.36",
            "unit": "ns/iter",
            "extra": "min: 6542.02ns  p75: 6859.73ns  p99: 6959.43ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 6781.55,
            "range": "± 132.49",
            "unit": "ns/iter",
            "extra": "min: 6535.00ns  p75: 6865.10ns  p99: 7079.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 7261.72,
            "range": "± 81.75",
            "unit": "ns/iter",
            "extra": "min: 6993.94ns  p75: 7347.47ns  p99: 7472.41ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 6795.81,
            "range": "± 67.64",
            "unit": "ns/iter",
            "extra": "min: 6537.46ns  p75: 6846.14ns  p99: 7184.29ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 7108.87,
            "range": "± 110.27",
            "unit": "ns/iter",
            "extra": "min: 6832.91ns  p75: 7183.42ns  p99: 7325.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 6996.11,
            "range": "± 127.01",
            "unit": "ns/iter",
            "extra": "min: 6683.46ns  p75: 7099.23ns  p99: 7246.85ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 5220.69,
            "range": "± 117.27",
            "unit": "ns/iter",
            "extra": "min: 5081.25ns  p75: 5335.80ns  p99: 5422.28ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 5228.83,
            "range": "± 144.6",
            "unit": "ns/iter",
            "extra": "min: 5019.38ns  p75: 5355.17ns  p99: 5465.32ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 5268.24,
            "range": "± 130.87",
            "unit": "ns/iter",
            "extra": "min: 5104.58ns  p75: 5375.96ns  p99: 5514.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 5237.24,
            "range": "± 127.44",
            "unit": "ns/iter",
            "extra": "min: 5070.23ns  p75: 5349.57ns  p99: 5415.52ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 5367.42,
            "range": "± 141.02",
            "unit": "ns/iter",
            "extra": "min: 5179.43ns  p75: 5481.97ns  p99: 5598.63ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 6409.55,
            "range": "± 143.64",
            "unit": "ns/iter",
            "extra": "min: 6174.83ns  p75: 6493.76ns  p99: 6668.98ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 8980.62,
            "range": "± 789.81",
            "unit": "ns/iter",
            "extra": "min: 7965.48ns  p75: 9681.39ns  p99: 10009.16ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 9991.48,
            "range": "± 867.14",
            "unit": "ns/iter",
            "extra": "min: 8719.27ns  p75: 10567.37ns  p99: 10831.83ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 7544.42,
            "range": "± 501.17",
            "unit": "ns/iter",
            "extra": "min: 6852.59ns  p75: 7992.94ns  p99: 8467.29ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 13045.42,
            "range": "± 27.08",
            "unit": "ns/iter",
            "extra": "min: 12652.91ns  p75: 13098.32ns  p99: 13150.05ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 35.76,
            "range": "± 0.11",
            "unit": "ns/iter",
            "extra": "min: 34.71ns  p75: 35.15ns  p99: 47.42ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 35.02,
            "range": "± 0.11",
            "unit": "ns/iter",
            "extra": "min: 33.87ns  p75: 34.32ns  p99: 56.06ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 1963.22,
            "range": "± 12.16",
            "unit": "ns/iter",
            "extra": "min: 1765.79ns  p75: 1796.67ns  p99: 3884.70ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 67.71,
            "range": "± 1.27",
            "unit": "ns/iter",
            "extra": "min: 65.13ns  p75: 68.27ns  p99: 89.42ns"
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
          "id": "fb664ceb5322e45354473455c0f6b555be24381d",
          "message": "[77] ensure tree-shaking consumers can avoid importing isComplete (#90)\n\n* ensure tree-shaking consumers can avoid importing isComplete\n* enable sideEffects only for /extend",
          "timestamp": "2026-09-04T15:25:14+01:00",
          "tree_id": "c9ed3e5e66e728cc2829c6e9863d0a280f976da8",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/fb664ceb5322e45354473455c0f6b555be24381d"
        },
        "date": 1788532971032,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 34.36,
            "range": "± 1.15",
            "unit": "ns/iter",
            "extra": "min: 29.20ns  p75: 34.39ns  p99: 64.96ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 74.47,
            "range": "± 1.5",
            "unit": "ns/iter",
            "extra": "min: 66.65ns  p75: 73.90ns  p99: 110.31ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 74.47,
            "range": "± 2.25",
            "unit": "ns/iter",
            "extra": "min: 67.51ns  p75: 75.64ns  p99: 99.50ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 23.54,
            "range": "± 0.55",
            "unit": "ns/iter",
            "extra": "min: 20.54ns  p75: 23.65ns  p99: 37.45ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 65.44,
            "range": "± 1.52",
            "unit": "ns/iter",
            "extra": "min: 58.94ns  p75: 65.82ns  p99: 96.64ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 69.84,
            "range": "± 2.32",
            "unit": "ns/iter",
            "extra": "min: 60.89ns  p75: 69.78ns  p99: 103.10ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 43487.74,
            "range": "± 1895.5",
            "unit": "ns/iter",
            "extra": "min: 36293.00ns  p75: 43651.00ns  p99: 75512.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 55153.32,
            "range": "± 3368",
            "unit": "ns/iter",
            "extra": "min: 47477.00ns  p75: 57266.00ns  p99: 76858.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 48782.24,
            "range": "± 1858",
            "unit": "ns/iter",
            "extra": "min: 41750.00ns  p75: 49516.00ns  p99: 74627.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 132410.25,
            "range": "± 6652",
            "unit": "ns/iter",
            "extra": "min: 107375.00ns  p75: 125985.00ns  p99: 256397.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 292.76,
            "range": "± 3.8",
            "unit": "ns/iter",
            "extra": "min: 274.27ns  p75: 295.09ns  p99: 311.59ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1024.28,
            "range": "± 6.56",
            "unit": "ns/iter",
            "extra": "min: 1002.98ns  p75: 1029.21ns  p99: 1060.35ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 1567.98,
            "range": "± 15.33",
            "unit": "ns/iter",
            "extra": "min: 1534.38ns  p75: 1580.44ns  p99: 1635.74ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 164.93,
            "range": "± 2.35",
            "unit": "ns/iter",
            "extra": "min: 155.87ns  p75: 166.79ns  p99: 176.72ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 292.97,
            "range": "± 2.64",
            "unit": "ns/iter",
            "extra": "min: 279.80ns  p75: 294.67ns  p99: 315.27ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 564.76,
            "range": "± 17.38",
            "unit": "ns/iter",
            "extra": "min: 527.02ns  p75: 580.29ns  p99: 654.46ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 31.72,
            "range": "± 1.78",
            "unit": "ns/iter",
            "extra": "min: 27.85ns  p75: 32.98ns  p99: 47.77ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 47.67,
            "range": "± 1.36",
            "unit": "ns/iter",
            "extra": "min: 43.77ns  p75: 48.33ns  p99: 72.37ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 1536.98,
            "range": "± 16.43",
            "unit": "ns/iter",
            "extra": "min: 1328.27ns  p75: 1382.44ns  p99: 3438.56ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1504.19,
            "range": "± 15.83",
            "unit": "ns/iter",
            "extra": "min: 1299.12ns  p75: 1348.64ns  p99: 3358.67ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 77.06,
            "range": "± 2.21",
            "unit": "ns/iter",
            "extra": "min: 70.40ns  p75: 77.76ns  p99: 112.34ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 96.47,
            "range": "± 2.03",
            "unit": "ns/iter",
            "extra": "min: 86.94ns  p75: 93.35ns  p99: 197.73ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 6941.01,
            "range": "± 69.5",
            "unit": "ns/iter",
            "extra": "min: 5996.00ns  p75: 6255.00ns  p99: 10364.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 92.87,
            "range": "± 2.36",
            "unit": "ns/iter",
            "extra": "min: 84.39ns  p75: 93.03ns  p99: 136.22ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 1420.74,
            "range": "± 16.28",
            "unit": "ns/iter",
            "extra": "min: 1277.03ns  p75: 1317.91ns  p99: 2408.02ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 8509.37,
            "range": "± 741.57",
            "unit": "ns/iter",
            "extra": "min: 7466.73ns  p75: 9071.77ns  p99: 9251.12ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 550436.96,
            "range": "± 5930",
            "unit": "ns/iter",
            "extra": "min: 469974.00ns  p75: 490160.00ns  p99: 941093.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 68.28,
            "range": "± 1.57",
            "unit": "ns/iter",
            "extra": "min: 63.58ns  p75: 69.05ns  p99: 87.05ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 2906.5,
            "range": "± 60.28",
            "unit": "ns/iter",
            "extra": "min: 2718.80ns  p75: 2876.62ns  p99: 3697.52ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 3104.26,
            "range": "± 105.89",
            "unit": "ns/iter",
            "extra": "min: 2914.69ns  p75: 3151.66ns  p99: 4012.38ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 107.45,
            "range": "± 1.43",
            "unit": "ns/iter",
            "extra": "min: 102.10ns  p75: 107.71ns  p99: 131.50ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 3893.22,
            "range": "± 68.01",
            "unit": "ns/iter",
            "extra": "min: 3781.61ns  p75: 3958.39ns  p99: 4076.47ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 4614.76,
            "range": "± 121.96",
            "unit": "ns/iter",
            "extra": "min: 4352.80ns  p75: 4651.22ns  p99: 5318.54ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 118.36,
            "range": "± 1.21",
            "unit": "ns/iter",
            "extra": "min: 112.87ns  p75: 118.49ns  p99: 142.50ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 8668.24,
            "range": "± 268.67",
            "unit": "ns/iter",
            "extra": "min: 7607.27ns  p75: 9025.91ns  p99: 9187.69ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 9139.14,
            "range": "± 111.75",
            "unit": "ns/iter",
            "extra": "min: 8252.73ns  p75: 9385.95ns  p99: 9456.87ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 69.56,
            "range": "± 1.55",
            "unit": "ns/iter",
            "extra": "min: 65.05ns  p75: 70.52ns  p99: 84.61ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 4668.68,
            "range": "± 312.82",
            "unit": "ns/iter",
            "extra": "min: 4315.97ns  p75: 4981.81ns  p99: 5083.10ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 5286.67,
            "range": "± 397",
            "unit": "ns/iter",
            "extra": "min: 4736.36ns  p75: 5715.23ns  p99: 5899.20ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 82.09,
            "range": "± 2.1",
            "unit": "ns/iter",
            "extra": "min: 78.03ns  p75: 83.66ns  p99: 96.22ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 8807.15,
            "range": "± 206.62",
            "unit": "ns/iter",
            "extra": "min: 8113.72ns  p75: 8948.38ns  p99: 9100.27ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 9388.07,
            "range": "± 94.84",
            "unit": "ns/iter",
            "extra": "min: 8779.72ns  p75: 9529.38ns  p99: 9581.29ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 3554.56,
            "range": "± 136.42",
            "unit": "ns/iter",
            "extra": "min: 3383.04ns  p75: 3683.63ns  p99: 4068.74ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (includes probe build)",
            "value": 7355.39,
            "range": "± 108",
            "unit": "ns/iter",
            "extra": "min: 6717.00ns  p75: 7098.00ns  p99: 13681.00ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (complete, includes probe build)",
            "value": 7225.5,
            "range": "± 74.29",
            "unit": "ns/iter",
            "extra": "min: 6918.82ns  p75: 7276.47ns  p99: 7435.63ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — incomplete match, warm probe",
            "value": 540.83,
            "range": "± 4.24",
            "unit": "ns/iter",
            "extra": "min: 524.39ns  p75: 544.16ns  p99: 572.58ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — complete match, warm probe",
            "value": 556.83,
            "range": "± 3.19",
            "unit": "ns/iter",
            "extra": "min: 545.69ns  p75: 558.24ns  p99: 593.71ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 7677.38,
            "range": "± 547.36",
            "unit": "ns/iter",
            "extra": "min: 6965.31ns  p75: 8125.10ns  p99: 8302.72ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec + isComplete (includes probe build)",
            "value": 12013.32,
            "range": "± 66.84",
            "unit": "ns/iter",
            "extra": "min: 11667.26ns  p75: 11967.91ns  p99: 12501.24ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — isComplete — same match, expansion probe cached",
            "value": 638.1,
            "range": "± 4.78",
            "unit": "ns/iter",
            "extra": "min: 623.45ns  p75: 640.82ns  p99: 672.97ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — exec + isComplete — fresh match, probe rebuilt per match",
            "value": 5321.34,
            "range": "± 293.43",
            "unit": "ns/iter",
            "extra": "min: 5027.84ns  p75: 5636.37ns  p99: 5773.19ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 7857.01,
            "range": "± 112.91",
            "unit": "ns/iter",
            "extra": "min: 7513.93ns  p75: 7927.93ns  p99: 8086.83ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec + isComplete (includes probe build)",
            "value": 11677.38,
            "range": "± 37.09",
            "unit": "ns/iter",
            "extra": "min: 11572.00ns  p75: 11670.36ns  p99: 11824.13ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — isComplete — warm instance",
            "value": 640.83,
            "range": "± 5.22",
            "unit": "ns/iter",
            "extra": "min: 622.94ns  p75: 642.79ns  p99: 687.30ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 4177.3,
            "range": "± 143.17",
            "unit": "ns/iter",
            "extra": "min: 3983.74ns  p75: 4314.30ns  p99: 4525.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 4191.41,
            "range": "± 85.29",
            "unit": "ns/iter",
            "extra": "min: 4065.88ns  p75: 4268.27ns  p99: 4401.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 4078.65,
            "range": "± 98.26",
            "unit": "ns/iter",
            "extra": "min: 3943.24ns  p75: 4161.81ns  p99: 4324.27ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 5274.31,
            "range": "± 136.93",
            "unit": "ns/iter",
            "extra": "min: 5052.86ns  p75: 5390.69ns  p99: 5540.71ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 5310.65,
            "range": "± 111.23",
            "unit": "ns/iter",
            "extra": "min: 5136.84ns  p75: 5414.61ns  p99: 5484.95ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 5380.11,
            "range": "± 86.83",
            "unit": "ns/iter",
            "extra": "min: 5225.96ns  p75: 5450.50ns  p99: 5615.79ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 5650.62,
            "range": "± 127.93",
            "unit": "ns/iter",
            "extra": "min: 5468.39ns  p75: 5759.93ns  p99: 5863.33ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 5318.9,
            "range": "± 143.67",
            "unit": "ns/iter",
            "extra": "min: 5092.90ns  p75: 5454.14ns  p99: 5549.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 5666.01,
            "range": "± 125.32",
            "unit": "ns/iter",
            "extra": "min: 5378.04ns  p75: 5762.33ns  p99: 5968.49ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 5498.77,
            "range": "± 89.09",
            "unit": "ns/iter",
            "extra": "min: 5204.10ns  p75: 5573.56ns  p99: 5887.19ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 4245.85,
            "range": "± 114.61",
            "unit": "ns/iter",
            "extra": "min: 4089.33ns  p75: 4356.93ns  p99: 4454.66ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 4132.1,
            "range": "± 114.81",
            "unit": "ns/iter",
            "extra": "min: 3974.74ns  p75: 4224.26ns  p99: 4367.98ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 4204.15,
            "range": "± 105.96",
            "unit": "ns/iter",
            "extra": "min: 4051.74ns  p75: 4313.74ns  p99: 4409.04ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 4197.17,
            "range": "± 107.12",
            "unit": "ns/iter",
            "extra": "min: 4067.64ns  p75: 4306.79ns  p99: 4413.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 4345.05,
            "range": "± 82.62",
            "unit": "ns/iter",
            "extra": "min: 4178.20ns  p75: 4404.32ns  p99: 4689.27ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 4973.6,
            "range": "± 152.73",
            "unit": "ns/iter",
            "extra": "min: 4765.47ns  p75: 5101.74ns  p99: 5263.98ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 6871.17,
            "range": "± 491.99",
            "unit": "ns/iter",
            "extra": "min: 6020.12ns  p75: 7287.75ns  p99: 7671.04ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 7591.43,
            "range": "± 611.15",
            "unit": "ns/iter",
            "extra": "min: 6647.17ns  p75: 8044.63ns  p99: 8248.07ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 5768.87,
            "range": "± 377.59",
            "unit": "ns/iter",
            "extra": "min: 5158.75ns  p75: 6157.96ns  p99: 6365.56ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 9966.06,
            "range": "± 57.01",
            "unit": "ns/iter",
            "extra": "min: 9820.28ns  p75: 10024.22ns  p99: 10108.67ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 25.6,
            "range": "± 0.58",
            "unit": "ns/iter",
            "extra": "min: 23.45ns  p75: 25.63ns  p99: 49.54ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 23.9,
            "range": "± 0.33",
            "unit": "ns/iter",
            "extra": "min: 22.33ns  p75: 23.70ns  p99: 34.65ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 1428.76,
            "range": "± 12.86",
            "unit": "ns/iter",
            "extra": "min: 1272.90ns  p75: 1305.80ns  p99: 2813.89ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 48.25,
            "range": "± 1.26",
            "unit": "ns/iter",
            "extra": "min: 44.35ns  p75: 48.74ns  p99: 76.43ns"
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
          "id": "12461f63618977bb4b97528e74f0945767f1f3bf",
          "message": "[88] fixup feature-cost.bench (#91)\n\n* fixup feature-cost.bench",
          "timestamp": "2026-09-04T18:10:12+01:00",
          "tree_id": "a95b9697d4932f938d8f49fb4b7ded1620ea8813",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/12461f63618977bb4b97528e74f0945767f1f3bf"
        },
        "date": 1788541892437,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 45.2,
            "range": "± 1.07",
            "unit": "ns/iter",
            "extra": "min: 39.69ns  p75: 43.04ns  p99: 94.71ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 93.48,
            "range": "± 2.27",
            "unit": "ns/iter",
            "extra": "min: 84.77ns  p75: 89.83ns  p99: 194.13ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 91.33,
            "range": "± 1.83",
            "unit": "ns/iter",
            "extra": "min: 87.12ns  p75: 91.79ns  p99: 128.82ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 23.95,
            "range": "± 0",
            "unit": "ns/iter",
            "extra": "min: 23.06ns  p75: 23.14ns  p99: 44.96ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 80.1,
            "range": "± 1.52",
            "unit": "ns/iter",
            "extra": "min: 75.75ns  p75: 79.75ns  p99: 163.82ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 88.92,
            "range": "± 1.96",
            "unit": "ns/iter",
            "extra": "min: 78.04ns  p75: 83.59ns  p99: 170.94ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 55565.45,
            "range": "± 471",
            "unit": "ns/iter",
            "extra": "min: 50434.00ns  p75: 52207.00ns  p99: 105917.00ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 75152.52,
            "range": "± 701",
            "unit": "ns/iter",
            "extra": "min: 70311.00ns  p75: 73136.00ns  p99: 141233.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 59955.55,
            "range": "± 826",
            "unit": "ns/iter",
            "extra": "min: 55226.00ns  p75: 58561.00ns  p99: 116303.00ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 168408.7,
            "range": "± 1846.5",
            "unit": "ns/iter",
            "extra": "min: 157504.00ns  p75: 163672.00ns  p99: 330872.00ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 363.42,
            "range": "± 1.07",
            "unit": "ns/iter",
            "extra": "min: 359.32ns  p75: 363.75ns  p99: 384.60ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 1373.5,
            "range": "± 8.22",
            "unit": "ns/iter",
            "extra": "min: 1354.61ns  p75: 1380.54ns  p99: 1392.58ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 2142.8,
            "range": "± 8.42",
            "unit": "ns/iter",
            "extra": "min: 2119.20ns  p75: 2146.29ns  p99: 2206.51ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 218,
            "range": "± 0.54",
            "unit": "ns/iter",
            "extra": "min: 209.05ns  p75: 218.36ns  p99: 234.05ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 391.1,
            "range": "± 3.52",
            "unit": "ns/iter",
            "extra": "min: 376.70ns  p75: 389.88ns  p99: 468.05ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 718.92,
            "range": "± 5.18",
            "unit": "ns/iter",
            "extra": "min: 696.36ns  p75: 719.46ns  p99: 769.08ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 42,
            "range": "± 0.15",
            "unit": "ns/iter",
            "extra": "min: 40.34ns  p75: 40.99ns  p99: 82.51ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 68.12,
            "range": "± 1.35",
            "unit": "ns/iter",
            "extra": "min: 65.38ns  p75: 69.07ns  p99: 99.48ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 2137.21,
            "range": "± 15",
            "unit": "ns/iter",
            "extra": "min: 1994.00ns  p75: 2074.00ns  p99: 3718.00ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 1821.19,
            "range": "± 8.88",
            "unit": "ns/iter",
            "extra": "min: 1792.53ns  p75: 1816.05ns  p99: 2074.44ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 93.51,
            "range": "± 1.63",
            "unit": "ns/iter",
            "extra": "min: 87.70ns  p75: 94.13ns  p99: 118.09ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 120.19,
            "range": "± 1.79",
            "unit": "ns/iter",
            "extra": "min: 113.00ns  p75: 119.91ns  p99: 169.07ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 7805.27,
            "range": "± 55",
            "unit": "ns/iter",
            "extra": "min: 7374.00ns  p75: 7614.00ns  p99: 14688.00ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 131.52,
            "range": "± 1.47",
            "unit": "ns/iter",
            "extra": "min: 126.72ns  p75: 130.96ns  p99: 177.47ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 1895.86,
            "range": "± 8.52",
            "unit": "ns/iter",
            "extra": "min: 1877.04ns  p75: 1898.93ns  p99: 1959.31ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 10575.81,
            "range": "± 14.86",
            "unit": "ns/iter",
            "extra": "min: 10507.27ns  p75: 10591.41ns  p99: 10620.16ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 633536.93,
            "range": "± 7984.5",
            "unit": "ns/iter",
            "extra": "min: 611752.00ns  p75: 632911.00ns  p99: 846471.00ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 102.57,
            "range": "± 1.38",
            "unit": "ns/iter",
            "extra": "min: 99.47ns  p75: 103.08ns  p99: 124.46ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 3556.95,
            "range": "± 24.06",
            "unit": "ns/iter",
            "extra": "min: 3508.95ns  p75: 3568.46ns  p99: 3670.45ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 4164.64,
            "range": "± 153.79",
            "unit": "ns/iter",
            "extra": "min: 3995.44ns  p75: 4313.90ns  p99: 4481.01ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 143.37,
            "range": "± 1.48",
            "unit": "ns/iter",
            "extra": "min: 137.72ns  p75: 144.15ns  p99: 189.87ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 5063.18,
            "range": "± 40.07",
            "unit": "ns/iter",
            "extra": "min: 5000.69ns  p75: 5093.53ns  p99: 5271.74ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 5832.97,
            "range": "± 140.76",
            "unit": "ns/iter",
            "extra": "min: 5598.11ns  p75: 5941.20ns  p99: 6033.52ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 153.35,
            "range": "± 1.15",
            "unit": "ns/iter",
            "extra": "min: 149.25ns  p75: 153.90ns  p99: 172.30ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 12365.51,
            "range": "± 322.37",
            "unit": "ns/iter",
            "extra": "min: 10521.09ns  p75: 12757.67ns  p99: 12978.67ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 12779.16,
            "range": "± 231.34",
            "unit": "ns/iter",
            "extra": "min: 11391.42ns  p75: 13060.09ns  p99: 13531.58ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 102.22,
            "range": "± 1.31",
            "unit": "ns/iter",
            "extra": "min: 99.65ns  p75: 103.00ns  p99: 118.49ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 6416.37,
            "range": "± 540.57",
            "unit": "ns/iter",
            "extra": "min: 5880.31ns  p75: 6997.21ns  p99: 7064.58ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 7204.44,
            "range": "± 537.55",
            "unit": "ns/iter",
            "extra": "min: 6527.77ns  p75: 7822.97ns  p99: 8068.85ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 114.18,
            "range": "± 1.31",
            "unit": "ns/iter",
            "extra": "min: 110.83ns  p75: 114.43ns  p99: 129.60ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 11962.4,
            "range": "± 56.56",
            "unit": "ns/iter",
            "extra": "min: 11163.47ns  p75: 12065.02ns  p99: 12147.95ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 12907.5,
            "range": "± 28.75",
            "unit": "ns/iter",
            "extra": "min: 12182.85ns  p75: 12996.46ns  p99: 13089.52ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 4789.47,
            "range": "± 150.48",
            "unit": "ns/iter",
            "extra": "min: 4534.13ns  p75: 4860.84ns  p99: 5572.52ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (includes probe build)",
            "value": 10671.32,
            "range": "± 110",
            "unit": "ns/iter",
            "extra": "min: 9177.00ns  p75: 9638.00ns  p99: 26860.00ns"
          },
          {
            "name": "isComplete — static path (ISO date) — construct + exec + isComplete (complete, includes probe build)",
            "value": 9611.2,
            "range": "± 63.94",
            "unit": "ns/iter",
            "extra": "min: 9434.28ns  p75: 9628.75ns  p99: 9796.29ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — incomplete match, warm probe",
            "value": 733.81,
            "range": "± 4.52",
            "unit": "ns/iter",
            "extra": "min: 722.18ns  p75: 735.56ns  p99: 780.94ns"
          },
          {
            "name": "isComplete — static path (ISO date) — isComplete — complete match, warm probe",
            "value": 788.26,
            "range": "± 2.94",
            "unit": "ns/iter",
            "extra": "min: 778.51ns  p75: 787.92ns  p99: 834.53ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 10495.66,
            "range": "± 559.89",
            "unit": "ns/iter",
            "extra": "min: 9621.39ns  p75: 10879.93ns  p99: 11044.09ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — construct + exec + isComplete (includes probe build)",
            "value": 17859.71,
            "range": "± 290",
            "unit": "ns/iter",
            "extra": "min: 15499.00ns  p75: 16530.00ns  p99: 42018.00ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — isComplete — same match, expansion probe cached",
            "value": 859.56,
            "range": "± 4.94",
            "unit": "ns/iter",
            "extra": "min: 847.37ns  p75: 859.88ns  p99: 920.85ns"
          },
          {
            "name": "isComplete — backreference path (repeated word) — exec + isComplete — fresh match, probe rebuilt per match",
            "value": 6774.44,
            "range": "± 48.75",
            "unit": "ns/iter",
            "extra": "min: 6660.83ns  p75: 6780.76ns  p99: 6813.73ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 11065.73,
            "range": "± 141.64",
            "unit": "ns/iter",
            "extra": "min: 10350.94ns  p75: 11220.81ns  p99: 11300.58ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — construct + exec + isComplete (includes probe build)",
            "value": 16918.9,
            "range": "± 133.22",
            "unit": "ns/iter",
            "extra": "min: 15504.58ns  p75: 16327.03ns  p99: 17140.81ns"
          },
          {
            "name": "isComplete — raw lookaround backreference renumbering — isComplete — warm instance",
            "value": 865.03,
            "range": "± 3.28",
            "unit": "ns/iter",
            "extra": "min: 851.37ns  p75: 861.86ns  p99: 913.61ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 5340.02,
            "range": "± 154.48",
            "unit": "ns/iter",
            "extra": "min: 5122.14ns  p75: 5454.65ns  p99: 5672.59ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 5460.34,
            "range": "± 189.43",
            "unit": "ns/iter",
            "extra": "min: 5214.70ns  p75: 5617.40ns  p99: 5783.96ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 5309.92,
            "range": "± 158.04",
            "unit": "ns/iter",
            "extra": "min: 5110.67ns  p75: 5441.22ns  p99: 5568.26ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 6992.91,
            "range": "± 89.06",
            "unit": "ns/iter",
            "extra": "min: 6690.37ns  p75: 7077.52ns  p99: 7182.67ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 7171.18,
            "range": "± 117.37",
            "unit": "ns/iter",
            "extra": "min: 6746.40ns  p75: 7289.32ns  p99: 7405.08ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 7102.95,
            "range": "± 109.58",
            "unit": "ns/iter",
            "extra": "min: 6815.48ns  p75: 7227.96ns  p99: 7344.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 7562.12,
            "range": "± 96.6",
            "unit": "ns/iter",
            "extra": "min: 7238.37ns  p75: 7685.47ns  p99: 7805.79ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 7018.79,
            "range": "± 111.14",
            "unit": "ns/iter",
            "extra": "min: 6732.14ns  p75: 7143.26ns  p99: 7259.79ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 7632.47,
            "range": "± 164.91",
            "unit": "ns/iter",
            "extra": "min: 7275.37ns  p75: 7761.82ns  p99: 7938.35ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 7389.81,
            "range": "± 144.42",
            "unit": "ns/iter",
            "extra": "min: 6953.64ns  p75: 7516.49ns  p99: 7716.38ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 5442.75,
            "range": "± 146.46",
            "unit": "ns/iter",
            "extra": "min: 5229.38ns  p75: 5560.60ns  p99: 5673.14ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 5348.36,
            "range": "± 130.17",
            "unit": "ns/iter",
            "extra": "min: 5172.19ns  p75: 5455.10ns  p99: 5600.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 5470.6,
            "range": "± 165.6",
            "unit": "ns/iter",
            "extra": "min: 5252.06ns  p75: 5599.54ns  p99: 5716.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 5492.19,
            "range": "± 144.43",
            "unit": "ns/iter",
            "extra": "min: 5250.85ns  p75: 5597.36ns  p99: 5856.14ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 5540.28,
            "range": "± 132.64",
            "unit": "ns/iter",
            "extra": "min: 5342.04ns  p75: 5644.29ns  p99: 5742.24ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 6674.06,
            "range": "± 126.08",
            "unit": "ns/iter",
            "extra": "min: 6423.88ns  p75: 6736.93ns  p99: 7050.87ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 9539.67,
            "range": "± 874.31",
            "unit": "ns/iter",
            "extra": "min: 8371.82ns  p75: 10323.13ns  p99: 10549.92ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 10690.93,
            "range": "± 935.34",
            "unit": "ns/iter",
            "extra": "min: 9192.12ns  p75: 11288.51ns  p99: 11452.17ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 7870.33,
            "range": "± 497.96",
            "unit": "ns/iter",
            "extra": "min: 7193.69ns  p75: 8338.68ns  p99: 8718.31ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 13501.93,
            "range": "± 52.61",
            "unit": "ns/iter",
            "extra": "min: 12994.83ns  p75: 13586.30ns  p99: 13610.19ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 36.16,
            "range": "± 0.15",
            "unit": "ns/iter",
            "extra": "min: 34.75ns  p75: 35.36ns  p99: 47.97ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 34.3,
            "range": "± 0.12",
            "unit": "ns/iter",
            "extra": "min: 33.16ns  p75: 33.65ns  p99: 46.42ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 1851.91,
            "range": "± 10.71",
            "unit": "ns/iter",
            "extra": "min: 1820.96ns  p75: 1852.80ns  p99: 2054.94ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 67.29,
            "range": "± 1.3",
            "unit": "ns/iter",
            "extra": "min: 65.07ns  p75: 68.09ns  p99: 105.13ns"
          }
        ]
      }
    ]
  }
}