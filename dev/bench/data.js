window.BENCHMARK_DATA = {
  "lastUpdate": 1784740485789,
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
      }
    ]
  }
}