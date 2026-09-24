window.BENCHMARK_DATA = {
  "lastUpdate": 1790275524640,
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
            "value": 0.6777,
            "range": "± 0.0061",
            "unit": "× calibration",
            "extra": "44.40ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3075,
            "range": "± 0.0256",
            "unit": "× calibration",
            "extra": "85.66ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3464,
            "range": "± 0.0270",
            "unit": "× calibration",
            "extra": "88.21ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5281,
            "range": "± 0.0031",
            "unit": "× calibration",
            "extra": "34.60ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.0737,
            "range": "± 0.0200",
            "unit": "× calibration",
            "extra": "70.34ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.1915,
            "range": "± 0.0240",
            "unit": "× calibration",
            "extra": "78.06ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 830.6882,
            "range": "± 8.4867",
            "unit": "× calibration",
            "extra": "54421.74ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1018.0477,
            "range": "± 9.5552",
            "unit": "× calibration",
            "extra": "66696.42ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 876.2613,
            "range": "± 9.0286",
            "unit": "× calibration",
            "extra": "57407.42ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2192.9986,
            "range": "± 25.4526",
            "unit": "× calibration",
            "extra": "143672.20ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.4353,
            "range": "± 0.0206",
            "unit": "× calibration",
            "extra": "356.09ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.506,
            "range": "± 0.0608",
            "unit": "× calibration",
            "extra": "1343.43ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 28.407,
            "range": "± 0.0847",
            "unit": "× calibration",
            "extra": "1861.06ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.1344,
            "range": "± 0.0137",
            "unit": "× calibration",
            "extra": "205.35ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.5923,
            "range": "± 0.1526",
            "unit": "× calibration",
            "extra": "431.89ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.6438,
            "range": "± 0.0430",
            "unit": "× calibration",
            "extra": "697.32ns  calibration: 65.51ns  [bridged from native exec (~5% extra noise)]"
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
            "value": 0.6777,
            "range": "± 0.0030",
            "unit": "× calibration",
            "extra": "42.49ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3566,
            "range": "± 0.0244",
            "unit": "× calibration",
            "extra": "85.05ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3666,
            "range": "± 0.0225",
            "unit": "× calibration",
            "extra": "85.68ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5801,
            "range": "± 0.0368",
            "unit": "× calibration",
            "extra": "36.37ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1771,
            "range": "± 0.0408",
            "unit": "× calibration",
            "extra": "73.80ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2803,
            "range": "± 0.0303",
            "unit": "× calibration",
            "extra": "80.27ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 828.8277,
            "range": "± 1.8598",
            "unit": "× calibration",
            "extra": "51963.98ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1174.1177,
            "range": "± 9.9050",
            "unit": "× calibration",
            "extra": "73612.20ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 941.8589,
            "range": "± 8.5492",
            "unit": "× calibration",
            "extra": "59050.56ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2452.2288,
            "range": "± 14.2992",
            "unit": "× calibration",
            "extra": "153744.34ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.857,
            "range": "± 0.0183",
            "unit": "× calibration",
            "extra": "367.21ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.6204,
            "range": "± 0.0400",
            "unit": "× calibration",
            "extra": "1355.51ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 31.083,
            "range": "± 0.0906",
            "unit": "× calibration",
            "extra": "1948.77ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.3131,
            "range": "± 0.0069",
            "unit": "× calibration",
            "extra": "207.72ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.3507,
            "range": "± 0.0727",
            "unit": "× calibration",
            "extra": "398.16ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.7627,
            "range": "± 0.0775",
            "unit": "× calibration",
            "extra": "737.47ns  calibration: 62.70ns  [bridged from native exec (~5% extra noise)]"
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
            "value": 0.6777,
            "range": "± 0.0062",
            "unit": "× calibration",
            "extra": "42.65ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3383,
            "range": "± 0.0245",
            "unit": "× calibration",
            "extra": "84.22ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3599,
            "range": "± 0.0232",
            "unit": "× calibration",
            "extra": "85.58ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5509,
            "range": "± 0.0021",
            "unit": "× calibration",
            "extra": "34.67ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1104,
            "range": "± 0.0203",
            "unit": "× calibration",
            "extra": "69.88ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2003,
            "range": "± 0.0219",
            "unit": "× calibration",
            "extra": "75.54ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 823.4017,
            "range": "± 6.6103",
            "unit": "× calibration",
            "extra": "51818.19ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1163.8984,
            "range": "± 10.9801",
            "unit": "× calibration",
            "extra": "73246.27ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 928.3202,
            "range": "± 6.8487",
            "unit": "× calibration",
            "extra": "58420.90ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2957.2945,
            "range": "± 21.1816",
            "unit": "× calibration",
            "extra": "186108.00ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.8476,
            "range": "± 0.0189",
            "unit": "× calibration",
            "extra": "368.00ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.7616,
            "range": "± 0.0645",
            "unit": "× calibration",
            "extra": "1369.50ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 31.4133,
            "range": "± 0.1821",
            "unit": "× calibration",
            "extra": "1976.90ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.4293,
            "range": "± 0.0138",
            "unit": "× calibration",
            "extra": "215.81ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.3551,
            "range": "± 0.0815",
            "unit": "× calibration",
            "extra": "399.94ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 12.1528,
            "range": "± 0.0485",
            "unit": "× calibration",
            "extra": "764.80ns  calibration: 62.93ns  [bridged from native exec (~5% extra noise)]"
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
            "value": 0.6777,
            "range": "± 0.0039",
            "unit": "× calibration",
            "extra": "42.90ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3336,
            "range": "± 0.0251",
            "unit": "× calibration",
            "extra": "84.42ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.352,
            "range": "± 0.0234",
            "unit": "× calibration",
            "extra": "85.58ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5479,
            "range": "± 0.0019",
            "unit": "× calibration",
            "extra": "34.68ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.0975,
            "range": "± 0.0188",
            "unit": "× calibration",
            "extra": "69.47ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.1941,
            "range": "± 0.0209",
            "unit": "× calibration",
            "extra": "75.59ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 838.9553,
            "range": "± 1.3824",
            "unit": "× calibration",
            "extra": "53106.48ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1249.3816,
            "range": "± 21.1293",
            "unit": "× calibration",
            "extra": "79086.77ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 928.2825,
            "range": "± 11.2400",
            "unit": "× calibration",
            "extra": "58760.96ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2777.3536,
            "range": "± 17.4011",
            "unit": "× calibration",
            "extra": "175808.51ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.6898,
            "range": "± 0.0193",
            "unit": "× calibration",
            "extra": "360.17ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.5125,
            "range": "± 0.0542",
            "unit": "× calibration",
            "extra": "1361.76ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 32.6421,
            "range": "± 0.3575",
            "unit": "× calibration",
            "extra": "2066.27ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.4292,
            "range": "± 0.0594",
            "unit": "× calibration",
            "extra": "217.07ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.5443,
            "range": "± 0.0766",
            "unit": "× calibration",
            "extra": "414.26ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.3871,
            "range": "± 0.0352",
            "unit": "× calibration",
            "extra": "720.81ns  calibration: 63.30ns  [bridged from native exec (~5% extra noise)]"
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
            "value": 0.6777,
            "range": "± 0.0057",
            "unit": "× calibration",
            "extra": "44.37ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3038,
            "range": "± 0.0217",
            "unit": "× calibration",
            "extra": "85.36ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3234,
            "range": "± 0.0220",
            "unit": "× calibration",
            "extra": "86.64ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.527,
            "range": "± 0.0024",
            "unit": "× calibration",
            "extra": "34.50ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.0703,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "70.07ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.1682,
            "range": "± 0.0200",
            "unit": "× calibration",
            "extra": "76.48ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 777.6523,
            "range": "± 7.3011",
            "unit": "× calibration",
            "extra": "50912.72ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1038.5586,
            "range": "± 10.4552",
            "unit": "× calibration",
            "extra": "67994.20ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 907.2098,
            "range": "± 10.5545",
            "unit": "× calibration",
            "extra": "59394.82ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2156.2693,
            "range": "± 86.5819",
            "unit": "× calibration",
            "extra": "141170.47ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.4631,
            "range": "± 0.0221",
            "unit": "× calibration",
            "extra": "357.67ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.6701,
            "range": "± 0.1036",
            "unit": "× calibration",
            "extra": "1353.27ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 29.2779,
            "range": "± 0.2299",
            "unit": "× calibration",
            "extra": "1916.82ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.3944,
            "range": "± 0.0305",
            "unit": "× calibration",
            "extra": "222.23ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.0231,
            "range": "± 0.0428",
            "unit": "× calibration",
            "extra": "394.33ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.8627,
            "range": "± 0.0408",
            "unit": "× calibration",
            "extra": "711.18ns  calibration: 65.47ns  [bridged from native exec (~5% extra noise)]"
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
            "value": 0.6777,
            "range": "± 0.0079",
            "unit": "× calibration",
            "extra": "44.73ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3216,
            "range": "± 0.0330",
            "unit": "× calibration",
            "extra": "87.23ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.33,
            "range": "± 0.0274",
            "unit": "× calibration",
            "extra": "87.78ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5236,
            "range": "± 0.0032",
            "unit": "× calibration",
            "extra": "34.56ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.0701,
            "range": "± 0.0203",
            "unit": "× calibration",
            "extra": "70.63ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.1547,
            "range": "± 0.0209",
            "unit": "× calibration",
            "extra": "76.21ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 756.3446,
            "range": "± 8.2650",
            "unit": "× calibration",
            "extra": "49919.48ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1002.25,
            "range": "± 10.0908",
            "unit": "× calibration",
            "extra": "66149.47ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 873.0938,
            "range": "± 10.3938",
            "unit": "× calibration",
            "extra": "57625.04ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2121.1867,
            "range": "± 15.1664",
            "unit": "× calibration",
            "extra": "140000.38ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.3945,
            "range": "± 0.0180",
            "unit": "× calibration",
            "extra": "356.04ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.2885,
            "range": "± 0.0630",
            "unit": "× calibration",
            "extra": "1339.06ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 28.2231,
            "range": "± 0.1186",
            "unit": "× calibration",
            "extra": "1862.75ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.1012,
            "range": "± 0.0159",
            "unit": "× calibration",
            "extra": "204.68ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.8901,
            "range": "± 0.0758",
            "unit": "× calibration",
            "extra": "454.75ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.6183,
            "range": "± 0.0395",
            "unit": "× calibration",
            "extra": "700.82ns  calibration: 66.00ns  [bridged from native exec (~5% extra noise)]"
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
            "value": 5.637,
            "range": "± 0.0157",
            "unit": "× calibration",
            "extra": "362.48ns  calibration: 64.30ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 21.4145,
            "range": "± 0.0406",
            "unit": "× calibration",
            "extra": "1377.03ns  calibration: 64.30ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.4017,
            "range": "± 0.0286",
            "unit": "× calibration",
            "extra": "218.74ns  calibration: 64.30ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 6.5303,
            "range": "± 0.1964",
            "unit": "× calibration",
            "extra": "419.92ns  calibration: 64.30ns  [bridged from native test (~7% extra noise)]"
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
            "value": 5.637,
            "range": "± 0.0343",
            "unit": "× calibration",
            "extra": "368.07ns  calibration: 65.30ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 21.689,
            "range": "± 0.0697",
            "unit": "× calibration",
            "extra": "1416.19ns  calibration: 65.30ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.4157,
            "range": "± 0.0271",
            "unit": "× calibration",
            "extra": "223.03ns  calibration: 65.30ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 6.1283,
            "range": "± 0.0654",
            "unit": "× calibration",
            "extra": "400.15ns  calibration: 65.30ns  [bridged from native test (~7% extra noise)]"
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
            "value": 5.637,
            "range": "± 0.0159",
            "unit": "× calibration",
            "extra": "361.73ns  calibration: 64.17ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 21.8368,
            "range": "± 0.0961",
            "unit": "× calibration",
            "extra": "1401.28ns  calibration: 64.17ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.3628,
            "range": "± 0.0477",
            "unit": "× calibration",
            "extra": "215.79ns  calibration: 64.17ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 6.349,
            "range": "± 0.0781",
            "unit": "× calibration",
            "extra": "407.42ns  calibration: 64.17ns  [bridged from native test (~7% extra noise)]"
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
            "value": 5.637,
            "range": "± 0.0201",
            "unit": "× calibration",
            "extra": "356.20ns  calibration: 63.19ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 21.9967,
            "range": "± 0.2127",
            "unit": "× calibration",
            "extra": "1389.96ns  calibration: 63.19ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.3898,
            "range": "± 0.0413",
            "unit": "× calibration",
            "extra": "214.20ns  calibration: 63.19ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 6.2544,
            "range": "± 0.0421",
            "unit": "× calibration",
            "extra": "395.21ns  calibration: 63.19ns  [bridged from native test (~7% extra noise)]"
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
            "value": 5.637,
            "range": "± 0.0632",
            "unit": "× calibration",
            "extra": "371.70ns  calibration: 65.94ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 21.552,
            "range": "± 0.4412",
            "unit": "× calibration",
            "extra": "1421.12ns  calibration: 65.94ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.2263,
            "range": "± 0.0214",
            "unit": "× calibration",
            "extra": "212.74ns  calibration: 65.94ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 5.9018,
            "range": "± 0.0358",
            "unit": "× calibration",
            "extra": "389.16ns  calibration: 65.94ns  [bridged from native test (~7% extra noise)]"
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
            "value": 5.637,
            "range": "± 0.0197",
            "unit": "× calibration",
            "extra": "366.69ns  calibration: 65.05ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — partial RegExp.test per keystroke",
            "value": 21.1546,
            "range": "± 0.1251",
            "unit": "× calibration",
            "extra": "1376.12ns  calibration: 65.05ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.1932,
            "range": "± 0.0065",
            "unit": "× calibration",
            "extra": "207.72ns  calibration: 65.05ns  [bridged from native test (~7% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — partial RegExp.test per keystroke",
            "value": 5.8704,
            "range": "± 0.0347",
            "unit": "× calibration",
            "extra": "381.87ns  calibration: 65.05ns  [bridged from native test (~7% extra noise)]"
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
            "value": 0.6777,
            "range": "± 0.0065",
            "unit": "× calibration",
            "extra": "44.70ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.404,
            "range": "± 0.0280",
            "unit": "× calibration",
            "extra": "92.60ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4346,
            "range": "± 0.0303",
            "unit": "× calibration",
            "extra": "94.62ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5284,
            "range": "± 0.0035",
            "unit": "× calibration",
            "extra": "34.85ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1564,
            "range": "± 0.0194",
            "unit": "× calibration",
            "extra": "76.27ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2507,
            "range": "± 0.0214",
            "unit": "× calibration",
            "extra": "82.49ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 804.0502,
            "range": "± 7.2927",
            "unit": "× calibration",
            "extra": "53032.50ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1036.2605,
            "range": "± 15.3358",
            "unit": "× calibration",
            "extra": "68348.33ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 871.1701,
            "range": "± 8.2024",
            "unit": "× calibration",
            "extra": "57459.51ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2267.9958,
            "range": "± 76.5275",
            "unit": "× calibration",
            "extra": "149589.53ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.5374,
            "range": "± 0.0558",
            "unit": "× calibration",
            "extra": "365.23ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.7735,
            "range": "± 0.0796",
            "unit": "× calibration",
            "extra": "1370.15ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 29.0057,
            "range": "± 0.1354",
            "unit": "× calibration",
            "extra": "1913.12ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.2066,
            "range": "± 0.0277",
            "unit": "× calibration",
            "extra": "211.50ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.0531,
            "range": "± 0.0355",
            "unit": "× calibration",
            "extra": "399.24ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.4952,
            "range": "± 0.0763",
            "unit": "× calibration",
            "extra": "692.23ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6242,
            "range": "± 0.0039",
            "unit": "× calibration",
            "extra": "41.17ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 0.8976,
            "range": "± 0.0167",
            "unit": "× calibration",
            "extra": "59.20ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 29.7691,
            "range": "± 0.1631",
            "unit": "× calibration",
            "extra": "1963.47ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 28.5352,
            "range": "± 0.1158",
            "unit": "× calibration",
            "extra": "1882.09ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5057,
            "range": "± 0.0291",
            "unit": "× calibration",
            "extra": "99.31ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.7505,
            "range": "± 0.0220",
            "unit": "× calibration",
            "extra": "115.46ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 118.1433,
            "range": "± 1.6678",
            "unit": "× calibration",
            "extra": "7792.34ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 164.9359,
            "range": "± 0.3912",
            "unit": "× calibration",
            "extra": "10878.63ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9377.0028,
            "range": "± 89.3541",
            "unit": "× calibration",
            "extra": "618476.20ns  calibration: 65.96ns  [bridged from native exec (~5% extra noise)]"
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
            "value": 0.6777,
            "range": "± 0.0067",
            "unit": "× calibration",
            "extra": "44.38ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.5805,
            "range": "± 0.0525",
            "unit": "× calibration",
            "extra": "103.50ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4629,
            "range": "± 0.0283",
            "unit": "× calibration",
            "extra": "95.80ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5267,
            "range": "± 0.0031",
            "unit": "× calibration",
            "extra": "34.49ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1704,
            "range": "± 0.0203",
            "unit": "× calibration",
            "extra": "76.64ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2594,
            "range": "± 0.0218",
            "unit": "× calibration",
            "extra": "82.47ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 790.2454,
            "range": "± 8.4829",
            "unit": "× calibration",
            "extra": "51748.85ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1133.968,
            "range": "± 37.4669",
            "unit": "× calibration",
            "extra": "74257.36ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 877.4341,
            "range": "± 8.7196",
            "unit": "× calibration",
            "extra": "57458.36ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2175.0311,
            "range": "± 17.1262",
            "unit": "× calibration",
            "extra": "142430.89ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.5462,
            "range": "± 0.0334",
            "unit": "× calibration",
            "extra": "363.19ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.7011,
            "range": "± 0.0774",
            "unit": "× calibration",
            "extra": "1355.60ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 28.4954,
            "range": "± 0.0667",
            "unit": "× calibration",
            "extra": "1866.01ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.1375,
            "range": "± 0.0136",
            "unit": "× calibration",
            "extra": "205.46ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.8841,
            "range": "± 0.0076",
            "unit": "× calibration",
            "extra": "450.80ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.4191,
            "range": "± 0.0353",
            "unit": "× calibration",
            "extra": "682.29ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6293,
            "range": "± 0.0047",
            "unit": "× calibration",
            "extra": "41.21ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 0.8901,
            "range": "± 0.0182",
            "unit": "× calibration",
            "extra": "58.29ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 29.7925,
            "range": "± 0.4074",
            "unit": "× calibration",
            "extra": "1950.95ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 29.2732,
            "range": "± 0.4082",
            "unit": "× calibration",
            "extra": "1916.94ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5028,
            "range": "± 0.0208",
            "unit": "× calibration",
            "extra": "98.41ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.7555,
            "range": "± 0.0221",
            "unit": "× calibration",
            "extra": "114.96ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 120.0932,
            "range": "± 2.1379",
            "unit": "× calibration",
            "extra": "7864.25ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 163.3418,
            "range": "± 0.5079",
            "unit": "× calibration",
            "extra": "10696.36ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9562.5439,
            "range": "± 95.4271",
            "unit": "× calibration",
            "extra": "626198.70ns  calibration: 65.48ns  [bridged from native exec (~5% extra noise)]"
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
            "value": 0.6777,
            "range": "± 0.0285",
            "unit": "× calibration",
            "extra": "36.19ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.6635,
            "range": "± 0.1197",
            "unit": "× calibration",
            "extra": "88.83ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.7142,
            "range": "± 0.0706",
            "unit": "× calibration",
            "extra": "91.54ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.6612,
            "range": "± 0.0305",
            "unit": "× calibration",
            "extra": "35.31ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.4418,
            "range": "± 0.0702",
            "unit": "× calibration",
            "extra": "76.99ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.3966,
            "range": "± 0.0826",
            "unit": "× calibration",
            "extra": "74.58ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 993.4379,
            "range": "± 38.8765",
            "unit": "× calibration",
            "extra": "53049.43ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1358.8505,
            "range": "± 138.0716",
            "unit": "× calibration",
            "extra": "72562.41ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 1101.1908,
            "range": "± 66.0208",
            "unit": "× calibration",
            "extra": "58803.42ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2447.7059,
            "range": "± 138.3337",
            "unit": "× calibration",
            "extra": "130707.12ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 6.3101,
            "range": "± 0.4642",
            "unit": "× calibration",
            "extra": "336.96ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.1753,
            "range": "± 0.5294",
            "unit": "× calibration",
            "extra": "1077.36ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 33.137,
            "range": "± 0.9139",
            "unit": "× calibration",
            "extra": "1769.51ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.3347,
            "range": "± 0.0564",
            "unit": "× calibration",
            "extra": "178.07ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.8652,
            "range": "± 0.1094",
            "unit": "× calibration",
            "extra": "313.20ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 12.2195,
            "range": "± 0.3796",
            "unit": "× calibration",
            "extra": "652.52ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.7114,
            "range": "± 0.0335",
            "unit": "× calibration",
            "extra": "37.99ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 0.9208,
            "range": "± 0.0581",
            "unit": "× calibration",
            "extra": "49.17ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 29.0566,
            "range": "± 1.0077",
            "unit": "× calibration",
            "extra": "1551.62ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 27.7754,
            "range": "± 0.5979",
            "unit": "× calibration",
            "extra": "1483.20ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5137,
            "range": "± 0.0807",
            "unit": "× calibration",
            "extra": "80.83ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.8526,
            "range": "± 0.1294",
            "unit": "× calibration",
            "extra": "98.93ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 138.5867,
            "range": "± 8.6143",
            "unit": "× calibration",
            "extra": "7400.51ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 156.6737,
            "range": "± 3.3468",
            "unit": "× calibration",
            "extra": "8366.35ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9942.7047,
            "range": "± 321.1994",
            "unit": "× calibration",
            "extra": "530938.90ns  calibration: 53.40ns  [bridged from native exec (~5% extra noise)]"
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
            "value": 0.6777,
            "range": "± 0.0054",
            "unit": "× calibration",
            "extra": "42.47ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4314,
            "range": "± 0.0294",
            "unit": "× calibration",
            "extra": "89.70ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4421,
            "range": "± 0.0276",
            "unit": "× calibration",
            "extra": "90.37ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5504,
            "range": "± 0.0018",
            "unit": "× calibration",
            "extra": "34.49ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1997,
            "range": "± 0.0214",
            "unit": "× calibration",
            "extra": "75.18ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2903,
            "range": "± 0.0249",
            "unit": "× calibration",
            "extra": "80.86ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 940.461,
            "range": "± 6.0000",
            "unit": "× calibration",
            "extra": "58935.16ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1193.8661,
            "range": "± 35.2502",
            "unit": "× calibration",
            "extra": "74815.11ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 945.3451,
            "range": "± 9.9096",
            "unit": "× calibration",
            "extra": "59241.23ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2616.81,
            "range": "± 21.4948",
            "unit": "× calibration",
            "extra": "163985.66ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.9806,
            "range": "± 0.0199",
            "unit": "× calibration",
            "extra": "374.78ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.8531,
            "range": "± 0.1478",
            "unit": "× calibration",
            "extra": "1369.45ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 31.7043,
            "range": "± 0.2111",
            "unit": "× calibration",
            "extra": "1986.79ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.3353,
            "range": "± 0.0099",
            "unit": "× calibration",
            "extra": "209.01ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.33,
            "range": "± 0.0619",
            "unit": "× calibration",
            "extra": "396.68ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.935,
            "range": "± 0.0934",
            "unit": "× calibration",
            "extra": "747.92ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6635,
            "range": "± 0.0034",
            "unit": "× calibration",
            "extra": "41.58ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 0.9152,
            "range": "± 0.0206",
            "unit": "× calibration",
            "extra": "57.35ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 30.9497,
            "range": "± 0.2023",
            "unit": "× calibration",
            "extra": "1939.50ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 29.5116,
            "range": "± 0.1931",
            "unit": "× calibration",
            "extra": "1849.38ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5426,
            "range": "± 0.0169",
            "unit": "× calibration",
            "extra": "96.67ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.7493,
            "range": "± 0.0203",
            "unit": "× calibration",
            "extra": "109.62ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 126.6447,
            "range": "± 1.3564",
            "unit": "× calibration",
            "extra": "7936.35ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 173.2837,
            "range": "± 0.3552",
            "unit": "× calibration",
            "extra": "10859.04ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 10161.688,
            "range": "± 127.1019",
            "unit": "× calibration",
            "extra": "636794.85ns  calibration: 62.67ns  [bridged from native exec (~5% extra noise)]"
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
            "value": 0.6777,
            "range": "± 0.0057",
            "unit": "× calibration",
            "extra": "42.94ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4287,
            "range": "± 0.0257",
            "unit": "× calibration",
            "extra": "90.52ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4531,
            "range": "± 0.0232",
            "unit": "× calibration",
            "extra": "92.07ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5778,
            "range": "± 0.0264",
            "unit": "× calibration",
            "extra": "36.61ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2014,
            "range": "± 0.0199",
            "unit": "× calibration",
            "extra": "76.12ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2805,
            "range": "± 0.0224",
            "unit": "× calibration",
            "extra": "81.13ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 897.7335,
            "range": "± 28.7801",
            "unit": "× calibration",
            "extra": "56880.17ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1172.0797,
            "range": "± 20.9597",
            "unit": "× calibration",
            "extra": "74262.68ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 944.2171,
            "range": "± 17.3849",
            "unit": "× calibration",
            "extra": "59825.36ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2970.0309,
            "range": "± 32.4181",
            "unit": "× calibration",
            "extra": "188180.42ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.7263,
            "range": "± 0.0204",
            "unit": "× calibration",
            "extra": "362.82ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.5321,
            "range": "± 0.1094",
            "unit": "× calibration",
            "extra": "1364.27ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 30.7055,
            "range": "± 0.1461",
            "unit": "× calibration",
            "extra": "1945.49ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.4142,
            "range": "± 0.0093",
            "unit": "× calibration",
            "extra": "216.32ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.3343,
            "range": "± 0.0726",
            "unit": "× calibration",
            "extra": "401.34ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.0337,
            "range": "± 0.0440",
            "unit": "× calibration",
            "extra": "699.09ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6589,
            "range": "± 0.0032",
            "unit": "× calibration",
            "extra": "41.75ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 0.9187,
            "range": "± 0.0185",
            "unit": "× calibration",
            "extra": "58.21ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 31.163,
            "range": "± 0.1520",
            "unit": "× calibration",
            "extra": "1974.48ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 29.7804,
            "range": "± 0.0494",
            "unit": "× calibration",
            "extra": "1886.88ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.476,
            "range": "± 0.0218",
            "unit": "× calibration",
            "extra": "93.52ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.7399,
            "range": "± 0.0199",
            "unit": "× calibration",
            "extra": "110.24ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 125.679,
            "range": "± 0.6313",
            "unit": "× calibration",
            "extra": "7962.99ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 173.6048,
            "range": "± 0.4214",
            "unit": "× calibration",
            "extra": "10999.56ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 10118.1256,
            "range": "± 107.7735",
            "unit": "× calibration",
            "extra": "641081.92ns  calibration: 63.36ns  [bridged from native exec (~5% extra noise)]"
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
            "value": 0.6487,
            "range": "± 0.0038",
            "unit": "× calibration",
            "extra": "42.50ns  calibration: 65.51ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3735,
            "range": "± 0.0269",
            "unit": "× calibration",
            "extra": "89.98ns  calibration: 65.51ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4021,
            "range": "± 0.0244",
            "unit": "× calibration",
            "extra": "91.85ns  calibration: 65.51ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5295,
            "range": "± 0.0014",
            "unit": "× calibration",
            "extra": "34.69ns  calibration: 65.51ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1792,
            "range": "± 0.0201",
            "unit": "× calibration",
            "extra": "77.25ns  calibration: 65.51ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2335,
            "range": "± 0.0203",
            "unit": "× calibration",
            "extra": "80.81ns  calibration: 65.51ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 862.9839,
            "range": "± 48.9386",
            "unit": "× calibration",
            "extra": "56534.67ns  calibration: 65.51ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1135.1582,
            "range": "± 18.2031",
            "unit": "× calibration",
            "extra": "74364.99ns  calibration: 65.51ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 911.7841,
            "range": "± 13.7687",
            "unit": "× calibration",
            "extra": "59731.60ns  calibration: 65.51ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2631.4157,
            "range": "± 99.6402",
            "unit": "× calibration",
            "extra": "172385.85ns  calibration: 65.51ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.5214,
            "range": "± 0.0246",
            "unit": "× calibration",
            "extra": "361.71ns  calibration: 65.51ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.8926,
            "range": "± 0.1120",
            "unit": "× calibration",
            "extra": "1368.69ns  calibration: 65.51ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 30.4967,
            "range": "± 0.1714",
            "unit": "× calibration",
            "extra": "1997.86ns  calibration: 65.51ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.205,
            "range": "± 0.0081",
            "unit": "× calibration",
            "extra": "209.96ns  calibration: 65.51ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.8903,
            "range": "± 0.0327",
            "unit": "× calibration",
            "extra": "385.88ns  calibration: 65.51ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.5493,
            "range": "± 0.0563",
            "unit": "× calibration",
            "extra": "756.60ns  calibration: 65.51ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6294,
            "range": "± 0.0017",
            "unit": "× calibration",
            "extra": "41.23ns  calibration: 65.51ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 0.8736,
            "range": "± 0.0188",
            "unit": "× calibration",
            "extra": "57.23ns  calibration: 65.51ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 29.6017,
            "range": "± 0.1720",
            "unit": "× calibration",
            "extra": "1939.23ns  calibration: 65.51ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 28.4337,
            "range": "± 0.1325",
            "unit": "× calibration",
            "extra": "1862.71ns  calibration: 65.51ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.3999,
            "range": "± 0.0160",
            "unit": "× calibration",
            "extra": "91.71ns  calibration: 65.51ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.6658,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "109.13ns  calibration: 65.51ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 119.4894,
            "range": "± 2.3660",
            "unit": "× calibration",
            "extra": "7827.83ns  calibration: 65.51ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 166.6733,
            "range": "± 0.3522",
            "unit": "× calibration",
            "extra": "10918.88ns  calibration: 65.51ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9617.6337,
            "range": "± 134.5811",
            "unit": "× calibration",
            "extra": "630057.78ns  calibration: 65.51ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.5414,
            "range": "± 0.0189",
            "unit": "× calibration",
            "extra": "100.98ns  calibration: 65.51ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 45.116,
            "range": "± 0.2493",
            "unit": "× calibration",
            "extra": "2955.58ns  calibration: 65.51ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 53.9724,
            "range": "± 0.3117",
            "unit": "× calibration",
            "extra": "3535.77ns  calibration: 65.51ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.2227,
            "range": "± 0.0252",
            "unit": "× calibration",
            "extra": "145.61ns  calibration: 65.51ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 66.4522,
            "range": "± 0.2600",
            "unit": "× calibration",
            "extra": "4353.33ns  calibration: 65.51ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 75.1627,
            "range": "± 0.4219",
            "unit": "× calibration",
            "extra": "4923.96ns  calibration: 65.51ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3985,
            "range": "± 0.0183",
            "unit": "× calibration",
            "extra": "157.13ns  calibration: 65.51ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 153.5081,
            "range": "± 8.8276",
            "unit": "× calibration",
            "extra": "10056.42ns  calibration: 65.51ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 160.8797,
            "range": "± 14.7887",
            "unit": "× calibration",
            "extra": "10539.34ns  calibration: 65.51ns"
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
            "value": 0.7369,
            "range": "± 0.0285",
            "unit": "× calibration",
            "extra": "30.24ns  calibration: 41.04ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.5047,
            "range": "± 0.0422",
            "unit": "× calibration",
            "extra": "61.75ns  calibration: 41.04ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.5055,
            "range": "± 0.0412",
            "unit": "× calibration",
            "extra": "61.78ns  calibration: 41.04ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5809,
            "range": "± 0.0119",
            "unit": "× calibration",
            "extra": "23.84ns  calibration: 41.04ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2481,
            "range": "± 0.0439",
            "unit": "× calibration",
            "extra": "51.22ns  calibration: 41.04ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.3551,
            "range": "± 0.0531",
            "unit": "× calibration",
            "extra": "55.61ns  calibration: 41.04ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 885.529,
            "range": "± 23.5761",
            "unit": "× calibration",
            "extra": "36339.78ns  calibration: 41.04ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1145.5869,
            "range": "± 24.9163",
            "unit": "× calibration",
            "extra": "47011.87ns  calibration: 41.04ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 1141.8839,
            "range": "± 63.2626",
            "unit": "× calibration",
            "extra": "46859.91ns  calibration: 41.04ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2733.7006,
            "range": "± 54.9865",
            "unit": "× calibration",
            "extra": "112183.88ns  calibration: 41.04ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 7.0277,
            "range": "± 0.0658",
            "unit": "× calibration",
            "extra": "288.40ns  calibration: 41.04ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 23.9703,
            "range": "± 0.1564",
            "unit": "× calibration",
            "extra": "983.68ns  calibration: 41.04ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 38.8168,
            "range": "± 0.3102",
            "unit": "× calibration",
            "extra": "1592.94ns  calibration: 41.04ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.7239,
            "range": "± 0.2795",
            "unit": "× calibration",
            "extra": "152.82ns  calibration: 41.04ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.8807,
            "range": "± 0.0712",
            "unit": "× calibration",
            "extra": "241.33ns  calibration: 41.04ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 12.6109,
            "range": "± 0.4511",
            "unit": "× calibration",
            "extra": "517.52ns  calibration: 41.04ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.7325,
            "range": "± 0.0214",
            "unit": "× calibration",
            "extra": "30.06ns  calibration: 41.04ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0642,
            "range": "± 0.0617",
            "unit": "× calibration",
            "extra": "43.67ns  calibration: 41.04ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 31.9328,
            "range": "± 0.3258",
            "unit": "× calibration",
            "extra": "1310.44ns  calibration: 41.04ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 27.9957,
            "range": "± 0.2861",
            "unit": "× calibration",
            "extra": "1148.87ns  calibration: 41.04ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.821,
            "range": "± 0.1192",
            "unit": "× calibration",
            "extra": "74.73ns  calibration: 41.04ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 2.0031,
            "range": "± 0.0621",
            "unit": "× calibration",
            "extra": "82.20ns  calibration: 41.04ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 131.3525,
            "range": "± 2.5952",
            "unit": "× calibration",
            "extra": "5390.36ns  calibration: 41.04ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 162.4427,
            "range": "± 0.7932",
            "unit": "× calibration",
            "extra": "6666.22ns  calibration: 41.04ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 10345.458,
            "range": "± 168.2491",
            "unit": "× calibration",
            "extra": "424550.37ns  calibration: 41.04ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.3571,
            "range": "± 0.0207",
            "unit": "× calibration",
            "extra": "55.69ns  calibration: 41.04ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 44.8301,
            "range": "± 1.1758",
            "unit": "× calibration",
            "extra": "1839.71ns  calibration: 41.04ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 55.5174,
            "range": "± 0.8909",
            "unit": "× calibration",
            "extra": "2278.29ns  calibration: 41.04ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.0718,
            "range": "± 0.0295",
            "unit": "× calibration",
            "extra": "85.02ns  calibration: 41.04ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 74.4373,
            "range": "± 1.2479",
            "unit": "× calibration",
            "extra": "3054.71ns  calibration: 41.04ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 84.5091,
            "range": "± 1.0603",
            "unit": "× calibration",
            "extra": "3468.03ns  calibration: 41.04ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.2394,
            "range": "± 0.0266",
            "unit": "× calibration",
            "extra": "91.90ns  calibration: 41.04ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 156.6572,
            "range": "± 6.3150",
            "unit": "× calibration",
            "extra": "6428.80ns  calibration: 41.04ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 162.5363,
            "range": "± 13.6997",
            "unit": "× calibration",
            "extra": "6670.06ns  calibration: 41.04ns"
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
            "value": 0.7182,
            "range": "± 0.0478",
            "unit": "× calibration",
            "extra": "47.04ns  calibration: 65.49ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.449,
            "range": "± 0.0928",
            "unit": "× calibration",
            "extra": "94.90ns  calibration: 65.49ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4468,
            "range": "± 0.0766",
            "unit": "× calibration",
            "extra": "94.76ns  calibration: 65.49ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.6126,
            "range": "± 0.0331",
            "unit": "× calibration",
            "extra": "40.12ns  calibration: 65.49ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2358,
            "range": "± 0.0895",
            "unit": "× calibration",
            "extra": "80.94ns  calibration: 65.49ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2476,
            "range": "± 0.0797",
            "unit": "× calibration",
            "extra": "81.71ns  calibration: 65.49ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 784.7209,
            "range": "± 12.1231",
            "unit": "× calibration",
            "extra": "51395.19ns  calibration: 65.49ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1047.9149,
            "range": "± 34.4302",
            "unit": "× calibration",
            "extra": "68633.05ns  calibration: 65.49ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 873.1519,
            "range": "± 14.9019",
            "unit": "× calibration",
            "extra": "57186.97ns  calibration: 65.49ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2499.4655,
            "range": "± 50.7673",
            "unit": "× calibration",
            "extra": "163702.16ns  calibration: 65.49ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.0326,
            "range": "± 0.0438",
            "unit": "× calibration",
            "extra": "329.61ns  calibration: 65.49ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 18.9929,
            "range": "± 0.1455",
            "unit": "× calibration",
            "extra": "1243.94ns  calibration: 65.49ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 31.1701,
            "range": "± 0.1643",
            "unit": "× calibration",
            "extra": "2041.48ns  calibration: 65.49ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.0004,
            "range": "± 0.0289",
            "unit": "× calibration",
            "extra": "196.51ns  calibration: 65.49ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.5985,
            "range": "± 0.0892",
            "unit": "× calibration",
            "extra": "366.67ns  calibration: 65.49ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.2265,
            "range": "± 0.0681",
            "unit": "× calibration",
            "extra": "735.28ns  calibration: 65.49ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6811,
            "range": "± 0.0286",
            "unit": "× calibration",
            "extra": "44.61ns  calibration: 65.49ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 0.9363,
            "range": "± 0.0502",
            "unit": "× calibration",
            "extra": "61.32ns  calibration: 65.49ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 28.8442,
            "range": "± 0.7219",
            "unit": "× calibration",
            "extra": "1889.15ns  calibration: 65.49ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 28.5444,
            "range": "± 0.3368",
            "unit": "× calibration",
            "extra": "1869.51ns  calibration: 65.49ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.3396,
            "range": "± 0.0551",
            "unit": "× calibration",
            "extra": "87.74ns  calibration: 65.49ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.6635,
            "range": "± 0.0666",
            "unit": "× calibration",
            "extra": "108.95ns  calibration: 65.49ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 113.4657,
            "range": "± 3.2216",
            "unit": "× calibration",
            "extra": "7431.42ns  calibration: 65.49ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 160.6825,
            "range": "± 0.3782",
            "unit": "× calibration",
            "extra": "10523.88ns  calibration: 65.49ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9053.5144,
            "range": "± 140.1331",
            "unit": "× calibration",
            "extra": "592958.72ns  calibration: 65.49ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.3923,
            "range": "± 0.0357",
            "unit": "× calibration",
            "extra": "91.19ns  calibration: 65.49ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 49.4856,
            "range": "± 0.3770",
            "unit": "× calibration",
            "extra": "3241.05ns  calibration: 65.49ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 57.8363,
            "range": "± 0.4419",
            "unit": "× calibration",
            "extra": "3787.98ns  calibration: 65.49ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 1.9287,
            "range": "± 0.0319",
            "unit": "× calibration",
            "extra": "126.32ns  calibration: 65.49ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 75.0146,
            "range": "± 0.6830",
            "unit": "× calibration",
            "extra": "4913.07ns  calibration: 65.49ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 82.8392,
            "range": "± 0.3315",
            "unit": "× calibration",
            "extra": "5425.54ns  calibration: 65.49ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.0136,
            "range": "± 0.0301",
            "unit": "× calibration",
            "extra": "131.88ns  calibration: 65.49ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 164.1376,
            "range": "± 8.4678",
            "unit": "× calibration",
            "extra": "10750.17ns  calibration: 65.49ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 175.1458,
            "range": "± 1.6395",
            "unit": "× calibration",
            "extra": "11471.15ns  calibration: 65.49ns"
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
            "value": 0.6665,
            "range": "± 0.0136",
            "unit": "× calibration",
            "extra": "43.48ns  calibration: 65.24ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4261,
            "range": "± 0.0271",
            "unit": "× calibration",
            "extra": "93.04ns  calibration: 65.24ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4379,
            "range": "± 0.0256",
            "unit": "× calibration",
            "extra": "93.81ns  calibration: 65.24ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5274,
            "range": "± 0.0012",
            "unit": "× calibration",
            "extra": "34.41ns  calibration: 65.24ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.159,
            "range": "± 0.0193",
            "unit": "× calibration",
            "extra": "75.61ns  calibration: 65.24ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2364,
            "range": "± 0.0210",
            "unit": "× calibration",
            "extra": "80.66ns  calibration: 65.24ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 849.9498,
            "range": "± 4.6904",
            "unit": "× calibration",
            "extra": "55450.72ns  calibration: 65.24ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1148.377,
            "range": "± 17.8878",
            "unit": "× calibration",
            "extra": "74920.11ns  calibration: 65.24ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 909.409,
            "range": "± 12.2088",
            "unit": "× calibration",
            "extra": "59329.84ns  calibration: 65.24ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2580.1631,
            "range": "± 24.2643",
            "unit": "× calibration",
            "extra": "168329.83ns  calibration: 65.24ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.559,
            "range": "± 0.0176",
            "unit": "× calibration",
            "extra": "362.67ns  calibration: 65.24ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.2249,
            "range": "± 0.0556",
            "unit": "× calibration",
            "extra": "1384.71ns  calibration: 65.24ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 32.7036,
            "range": "± 0.2013",
            "unit": "× calibration",
            "extra": "2133.58ns  calibration: 65.24ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.1576,
            "range": "± 0.0071",
            "unit": "× calibration",
            "extra": "206.00ns  calibration: 65.24ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.7716,
            "range": "± 0.0236",
            "unit": "× calibration",
            "extra": "376.54ns  calibration: 65.24ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.4793,
            "range": "± 0.0392",
            "unit": "× calibration",
            "extra": "748.91ns  calibration: 65.24ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6583,
            "range": "± 0.0090",
            "unit": "× calibration",
            "extra": "42.95ns  calibration: 65.24ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 0.9549,
            "range": "± 0.0213",
            "unit": "× calibration",
            "extra": "62.30ns  calibration: 65.24ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 29.6148,
            "range": "± 0.1188",
            "unit": "× calibration",
            "extra": "1932.07ns  calibration: 65.24ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 28.675,
            "range": "± 0.1120",
            "unit": "× calibration",
            "extra": "1870.76ns  calibration: 65.24ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.4264,
            "range": "± 0.0202",
            "unit": "× calibration",
            "extra": "93.06ns  calibration: 65.24ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.6704,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "108.98ns  calibration: 65.24ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 120.9968,
            "range": "± 0.6898",
            "unit": "× calibration",
            "extra": "7893.83ns  calibration: 65.24ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 168.4528,
            "range": "± 0.4457",
            "unit": "× calibration",
            "extra": "10989.86ns  calibration: 65.24ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9642.5374,
            "range": "± 103.9700",
            "unit": "× calibration",
            "extra": "629079.11ns  calibration: 65.24ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.5005,
            "range": "± 0.0196",
            "unit": "× calibration",
            "extra": "97.89ns  calibration: 65.24ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 47.4836,
            "range": "± 0.2423",
            "unit": "× calibration",
            "extra": "3097.83ns  calibration: 65.24ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 54.6559,
            "range": "± 0.2103",
            "unit": "× calibration",
            "extra": "3565.75ns  calibration: 65.24ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1775,
            "range": "± 0.0258",
            "unit": "× calibration",
            "extra": "142.06ns  calibration: 65.24ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 73.3527,
            "range": "± 0.3041",
            "unit": "× calibration",
            "extra": "4785.53ns  calibration: 65.24ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 81.6723,
            "range": "± 0.1631",
            "unit": "× calibration",
            "extra": "5328.30ns  calibration: 65.24ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3722,
            "range": "± 0.0175",
            "unit": "× calibration",
            "extra": "154.76ns  calibration: 65.24ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 161.9324,
            "range": "± 7.4834",
            "unit": "× calibration",
            "extra": "10564.47ns  calibration: 65.24ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 171.5284,
            "range": "± 8.4641",
            "unit": "× calibration",
            "extra": "11190.51ns  calibration: 65.24ns"
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
            "value": 0.6561,
            "range": "± 0.0051",
            "unit": "× calibration",
            "extra": "42.39ns  calibration: 64.60ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3892,
            "range": "± 0.0283",
            "unit": "× calibration",
            "extra": "89.75ns  calibration: 64.60ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4903,
            "range": "± 0.0402",
            "unit": "× calibration",
            "extra": "96.28ns  calibration: 64.60ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5979,
            "range": "± 0.0195",
            "unit": "× calibration",
            "extra": "38.63ns  calibration: 64.60ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1696,
            "range": "± 0.0201",
            "unit": "× calibration",
            "extra": "75.56ns  calibration: 64.60ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2484,
            "range": "± 0.0212",
            "unit": "× calibration",
            "extra": "80.65ns  calibration: 64.60ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 811.6784,
            "range": "± 4.1870",
            "unit": "× calibration",
            "extra": "52437.94ns  calibration: 64.60ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1136.3494,
            "range": "± 9.9297",
            "unit": "× calibration",
            "extra": "73413.09ns  calibration: 64.60ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 949.0952,
            "range": "± 14.7436",
            "unit": "× calibration",
            "extra": "61315.66ns  calibration: 64.60ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2567.0886,
            "range": "± 19.8439",
            "unit": "× calibration",
            "extra": "165845.04ns  calibration: 64.60ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.8118,
            "range": "± 0.0215",
            "unit": "× calibration",
            "extra": "375.47ns  calibration: 64.60ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.3558,
            "range": "± 0.0878",
            "unit": "× calibration",
            "extra": "1379.68ns  calibration: 64.60ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 30.6662,
            "range": "± 0.1101",
            "unit": "× calibration",
            "extra": "1981.17ns  calibration: 64.60ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.2422,
            "range": "± 0.0111",
            "unit": "× calibration",
            "extra": "209.46ns  calibration: 64.60ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.8267,
            "range": "± 0.0282",
            "unit": "× calibration",
            "extra": "376.43ns  calibration: 64.60ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.4229,
            "range": "± 0.0788",
            "unit": "× calibration",
            "extra": "737.97ns  calibration: 64.60ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6453,
            "range": "± 0.0033",
            "unit": "× calibration",
            "extra": "41.69ns  calibration: 64.60ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0516,
            "range": "± 0.0190",
            "unit": "× calibration",
            "extra": "67.94ns  calibration: 64.60ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 31.207,
            "range": "± 0.1339",
            "unit": "× calibration",
            "extra": "2016.11ns  calibration: 64.60ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 29.5507,
            "range": "± 0.2268",
            "unit": "× calibration",
            "extra": "1909.10ns  calibration: 64.60ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.4369,
            "range": "± 0.0161",
            "unit": "× calibration",
            "extra": "92.83ns  calibration: 64.60ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.9293,
            "range": "± 0.0200",
            "unit": "× calibration",
            "extra": "124.64ns  calibration: 64.60ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 124.5591,
            "range": "± 0.6269",
            "unit": "× calibration",
            "extra": "8047.06ns  calibration: 64.60ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.1221,
            "range": "± 0.0311",
            "unit": "× calibration",
            "extra": "137.10ns  calibration: 64.60ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 30.8944,
            "range": "± 0.1322",
            "unit": "× calibration",
            "extra": "1995.91ns  calibration: 64.60ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 172.6329,
            "range": "± 0.2930",
            "unit": "× calibration",
            "extra": "11152.83ns  calibration: 64.60ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 10054.4408,
            "range": "± 101.0381",
            "unit": "× calibration",
            "extra": "649560.41ns  calibration: 64.60ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.524,
            "range": "± 0.0200",
            "unit": "× calibration",
            "extra": "98.46ns  calibration: 64.60ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 48.7554,
            "range": "± 0.5325",
            "unit": "× calibration",
            "extra": "3149.81ns  calibration: 64.60ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 55.8144,
            "range": "± 0.3503",
            "unit": "× calibration",
            "extra": "3605.85ns  calibration: 64.60ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.2164,
            "range": "± 0.0251",
            "unit": "× calibration",
            "extra": "143.19ns  calibration: 64.60ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 74.9454,
            "range": "± 0.4158",
            "unit": "× calibration",
            "extra": "4841.80ns  calibration: 64.60ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 82.9853,
            "range": "± 0.3684",
            "unit": "× calibration",
            "extra": "5361.21ns  calibration: 64.60ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3858,
            "range": "± 0.0183",
            "unit": "× calibration",
            "extra": "154.13ns  calibration: 64.60ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 164.6588,
            "range": "± 7.8066",
            "unit": "× calibration",
            "extra": "10637.67ns  calibration: 64.60ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 174.7004,
            "range": "± 8.2903",
            "unit": "× calibration",
            "extra": "11286.40ns  calibration: 64.60ns"
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
            "value": 0.6551,
            "range": "± 0.0046",
            "unit": "× calibration",
            "extra": "42.46ns  calibration: 64.82ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4364,
            "range": "± 0.0284",
            "unit": "× calibration",
            "extra": "93.10ns  calibration: 64.82ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4248,
            "range": "± 0.0235",
            "unit": "× calibration",
            "extra": "92.35ns  calibration: 64.82ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5371,
            "range": "± 0.0020",
            "unit": "× calibration",
            "extra": "34.81ns  calibration: 64.82ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2017,
            "range": "± 0.0201",
            "unit": "× calibration",
            "extra": "77.89ns  calibration: 64.82ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2926,
            "range": "± 0.0258",
            "unit": "× calibration",
            "extra": "83.78ns  calibration: 64.82ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 817.7786,
            "range": "± 6.3411",
            "unit": "× calibration",
            "extra": "53004.37ns  calibration: 64.82ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1156.575,
            "range": "± 11.4402",
            "unit": "× calibration",
            "extra": "74963.48ns  calibration: 64.82ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 919.0715,
            "range": "± 14.6108",
            "unit": "× calibration",
            "extra": "59569.68ns  calibration: 64.82ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2562.4182,
            "range": "± 20.4891",
            "unit": "× calibration",
            "extra": "166083.30ns  calibration: 64.82ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.6021,
            "range": "± 0.0188",
            "unit": "× calibration",
            "extra": "363.10ns  calibration: 64.82ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.3432,
            "range": "± 0.0744",
            "unit": "× calibration",
            "extra": "1383.36ns  calibration: 64.82ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 30.666,
            "range": "± 0.3809",
            "unit": "× calibration",
            "extra": "1987.62ns  calibration: 64.82ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.3886,
            "range": "± 0.0068",
            "unit": "× calibration",
            "extra": "219.63ns  calibration: 64.82ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.8588,
            "range": "± 0.0301",
            "unit": "× calibration",
            "extra": "379.74ns  calibration: 64.82ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.009,
            "range": "± 0.1171",
            "unit": "× calibration",
            "extra": "713.55ns  calibration: 64.82ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6406,
            "range": "± 0.0023",
            "unit": "× calibration",
            "extra": "41.52ns  calibration: 64.82ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0508,
            "range": "± 0.0191",
            "unit": "× calibration",
            "extra": "68.11ns  calibration: 64.82ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 30.3593,
            "range": "± 0.1603",
            "unit": "× calibration",
            "extra": "1967.74ns  calibration: 64.82ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 29.5468,
            "range": "± 0.2098",
            "unit": "× calibration",
            "extra": "1915.08ns  calibration: 64.82ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.4109,
            "range": "± 0.0207",
            "unit": "× calibration",
            "extra": "91.45ns  calibration: 64.82ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.853,
            "range": "± 0.0214",
            "unit": "× calibration",
            "extra": "120.10ns  calibration: 64.82ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 124.9293,
            "range": "± 0.4706",
            "unit": "× calibration",
            "extra": "8097.30ns  calibration: 64.82ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.0429,
            "range": "± 0.0265",
            "unit": "× calibration",
            "extra": "132.41ns  calibration: 64.82ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 30.9032,
            "range": "± 0.3766",
            "unit": "× calibration",
            "extra": "2002.99ns  calibration: 64.82ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 171.069,
            "range": "± 0.3856",
            "unit": "× calibration",
            "extra": "11087.85ns  calibration: 64.82ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9806.424,
            "range": "± 121.4995",
            "unit": "× calibration",
            "extra": "635603.99ns  calibration: 64.82ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.5265,
            "range": "± 0.0202",
            "unit": "× calibration",
            "extra": "98.94ns  calibration: 64.82ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 47.2364,
            "range": "± 0.3430",
            "unit": "× calibration",
            "extra": "3061.63ns  calibration: 64.82ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 55.5632,
            "range": "± 0.3960",
            "unit": "× calibration",
            "extra": "3601.33ns  calibration: 64.82ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.2324,
            "range": "± 0.0224",
            "unit": "× calibration",
            "extra": "144.69ns  calibration: 64.82ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 77.6134,
            "range": "± 0.6943",
            "unit": "× calibration",
            "extra": "5030.52ns  calibration: 64.82ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 81.9936,
            "range": "± 0.6111",
            "unit": "× calibration",
            "extra": "5314.42ns  calibration: 64.82ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3808,
            "range": "± 0.0176",
            "unit": "× calibration",
            "extra": "154.31ns  calibration: 64.82ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 172.0841,
            "range": "± 8.9900",
            "unit": "× calibration",
            "extra": "11153.64ns  calibration: 64.82ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 171.6604,
            "range": "± 10.1779",
            "unit": "× calibration",
            "extra": "11126.18ns  calibration: 64.82ns"
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
            "value": 0.6768,
            "range": "± 0.0058",
            "unit": "× calibration",
            "extra": "44.50ns  calibration: 65.75ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3739,
            "range": "± 0.0249",
            "unit": "× calibration",
            "extra": "90.34ns  calibration: 65.75ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3993,
            "range": "± 0.0290",
            "unit": "× calibration",
            "extra": "92.01ns  calibration: 65.75ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5303,
            "range": "± 0.0021",
            "unit": "× calibration",
            "extra": "34.87ns  calibration: 65.75ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1873,
            "range": "± 0.0207",
            "unit": "× calibration",
            "extra": "78.07ns  calibration: 65.75ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2747,
            "range": "± 0.0240",
            "unit": "× calibration",
            "extra": "83.82ns  calibration: 65.75ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 819.0467,
            "range": "± 6.9349",
            "unit": "× calibration",
            "extra": "53855.79ns  calibration: 65.75ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1129.92,
            "range": "± 11.1248",
            "unit": "× calibration",
            "extra": "74297.03ns  calibration: 65.75ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 891.701,
            "range": "± 7.3912",
            "unit": "× calibration",
            "extra": "58633.12ns  calibration: 65.75ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 3506.4886,
            "range": "± 202.2607",
            "unit": "× calibration",
            "extra": "230566.49ns  calibration: 65.75ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.5234,
            "range": "± 0.0187",
            "unit": "× calibration",
            "extra": "363.19ns  calibration: 65.75ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.5498,
            "range": "± 0.0680",
            "unit": "× calibration",
            "extra": "1416.99ns  calibration: 65.75ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 33.4608,
            "range": "± 0.2123",
            "unit": "× calibration",
            "extra": "2200.19ns  calibration: 65.75ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.1618,
            "range": "± 0.0053",
            "unit": "× calibration",
            "extra": "207.90ns  calibration: 65.75ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.8232,
            "range": "± 0.0357",
            "unit": "× calibration",
            "extra": "382.90ns  calibration: 65.75ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 12.3627,
            "range": "± 0.0624",
            "unit": "× calibration",
            "extra": "812.90ns  calibration: 65.75ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.7035,
            "range": "± 0.0224",
            "unit": "× calibration",
            "extra": "46.26ns  calibration: 65.75ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0272,
            "range": "± 0.0202",
            "unit": "× calibration",
            "extra": "67.54ns  calibration: 65.75ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 28.7775,
            "range": "± 0.3080",
            "unit": "× calibration",
            "extra": "1892.24ns  calibration: 65.75ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 27.3619,
            "range": "± 0.1782",
            "unit": "× calibration",
            "extra": "1799.16ns  calibration: 65.75ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.3973,
            "range": "± 0.0214",
            "unit": "× calibration",
            "extra": "91.88ns  calibration: 65.75ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.8784,
            "range": "± 0.0427",
            "unit": "× calibration",
            "extra": "123.51ns  calibration: 65.75ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 120.1203,
            "range": "± 0.9125",
            "unit": "× calibration",
            "extra": "7898.42ns  calibration: 65.75ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.0168,
            "range": "± 0.0239",
            "unit": "× calibration",
            "extra": "132.61ns  calibration: 65.75ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 28.6622,
            "range": "± 0.1694",
            "unit": "× calibration",
            "extra": "1884.66ns  calibration: 65.75ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 160.8845,
            "range": "± 0.4999",
            "unit": "× calibration",
            "extra": "10578.84ns  calibration: 65.75ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9568.0375,
            "range": "± 114.9660",
            "unit": "× calibration",
            "extra": "629139.03ns  calibration: 65.75ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.4776,
            "range": "± 0.0190",
            "unit": "× calibration",
            "extra": "97.16ns  calibration: 65.75ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 44.6163,
            "range": "± 0.3080",
            "unit": "× calibration",
            "extra": "2933.71ns  calibration: 65.75ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 54.5729,
            "range": "± 1.4318",
            "unit": "× calibration",
            "extra": "3588.40ns  calibration: 65.75ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1127,
            "range": "± 0.0274",
            "unit": "× calibration",
            "extra": "138.92ns  calibration: 65.75ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 67.4498,
            "range": "± 0.3892",
            "unit": "× calibration",
            "extra": "4435.11ns  calibration: 65.75ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 77.955,
            "range": "± 2.5113",
            "unit": "× calibration",
            "extra": "5125.87ns  calibration: 65.75ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3028,
            "range": "± 0.0190",
            "unit": "× calibration",
            "extra": "151.42ns  calibration: 65.75ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 152.5892,
            "range": "± 5.7043",
            "unit": "× calibration",
            "extra": "10033.39ns  calibration: 65.75ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 169.8126,
            "range": "± 3.6544",
            "unit": "× calibration",
            "extra": "11165.90ns  calibration: 65.75ns"
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
            "value": 0.7092,
            "range": "± 0.0073",
            "unit": "× calibration",
            "extra": "44.85ns  calibration: 63.24ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4491,
            "range": "± 0.0267",
            "unit": "× calibration",
            "extra": "91.64ns  calibration: 63.24ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4546,
            "range": "± 0.0259",
            "unit": "× calibration",
            "extra": "91.99ns  calibration: 63.24ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.54,
            "range": "± 0.0025",
            "unit": "× calibration",
            "extra": "34.15ns  calibration: 63.24ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2004,
            "range": "± 0.0206",
            "unit": "× calibration",
            "extra": "75.91ns  calibration: 63.24ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2848,
            "range": "± 0.0220",
            "unit": "× calibration",
            "extra": "81.25ns  calibration: 63.24ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 813.2348,
            "range": "± 8.3175",
            "unit": "× calibration",
            "extra": "51428.82ns  calibration: 63.24ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1064.4708,
            "range": "± 10.1360",
            "unit": "× calibration",
            "extra": "67316.94ns  calibration: 63.24ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 901.4857,
            "range": "± 8.2385",
            "unit": "× calibration",
            "extra": "57009.79ns  calibration: 63.24ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2509.6042,
            "range": "± 87.6584",
            "unit": "× calibration",
            "extra": "158706.91ns  calibration: 63.24ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.7342,
            "range": "± 0.0201",
            "unit": "× calibration",
            "extra": "362.63ns  calibration: 63.24ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.5432,
            "range": "± 0.0827",
            "unit": "× calibration",
            "extra": "1362.39ns  calibration: 63.24ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 29.489,
            "range": "± 0.0898",
            "unit": "× calibration",
            "extra": "1864.88ns  calibration: 63.24ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.2878,
            "range": "± 0.0152",
            "unit": "× calibration",
            "extra": "207.92ns  calibration: 63.24ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.2788,
            "range": "± 0.0299",
            "unit": "× calibration",
            "extra": "397.07ns  calibration: 63.24ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.9208,
            "range": "± 0.0444",
            "unit": "× calibration",
            "extra": "690.63ns  calibration: 63.24ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6743,
            "range": "± 0.0049",
            "unit": "× calibration",
            "extra": "42.64ns  calibration: 63.24ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0912,
            "range": "± 0.0193",
            "unit": "× calibration",
            "extra": "69.01ns  calibration: 63.24ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 28.894,
            "range": "± 0.4009",
            "unit": "× calibration",
            "extra": "1827.25ns  calibration: 63.24ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 27.3911,
            "range": "± 0.2155",
            "unit": "× calibration",
            "extra": "1732.21ns  calibration: 63.24ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5596,
            "range": "± 0.0201",
            "unit": "× calibration",
            "extra": "98.63ns  calibration: 63.24ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.9752,
            "range": "± 0.0215",
            "unit": "× calibration",
            "extra": "124.91ns  calibration: 63.24ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 121.4273,
            "range": "± 2.5301",
            "unit": "× calibration",
            "extra": "7679.04ns  calibration: 63.24ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.9089,
            "range": "± 0.0201",
            "unit": "× calibration",
            "extra": "120.72ns  calibration: 63.24ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 29.1282,
            "range": "± 0.1534",
            "unit": "× calibration",
            "extra": "1842.06ns  calibration: 63.24ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 164.4111,
            "range": "± 0.5661",
            "unit": "× calibration",
            "extra": "10397.33ns  calibration: 63.24ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9707.5821,
            "range": "± 242.8533",
            "unit": "× calibration",
            "extra": "613905.72ns  calibration: 63.24ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.41,
            "range": "± 0.0185",
            "unit": "× calibration",
            "extra": "89.17ns  calibration: 63.24ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 45.7354,
            "range": "± 0.4211",
            "unit": "× calibration",
            "extra": "2892.30ns  calibration: 63.24ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 55.2046,
            "range": "± 1.2552",
            "unit": "× calibration",
            "extra": "3491.13ns  calibration: 63.24ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1298,
            "range": "± 0.0275",
            "unit": "× calibration",
            "extra": "134.69ns  calibration: 63.24ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 69.2548,
            "range": "± 0.5003",
            "unit": "× calibration",
            "extra": "4379.66ns  calibration: 63.24ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 79.9694,
            "range": "± 1.4186",
            "unit": "× calibration",
            "extra": "5057.25ns  calibration: 63.24ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.4205,
            "range": "± 0.0293",
            "unit": "× calibration",
            "extra": "153.07ns  calibration: 63.24ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 160.1877,
            "range": "± 7.5408",
            "unit": "× calibration",
            "extra": "10130.24ns  calibration: 63.24ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 171.8694,
            "range": "± 11.9679",
            "unit": "× calibration",
            "extra": "10868.99ns  calibration: 63.24ns"
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
            "value": 0.695,
            "range": "± 0.0098",
            "unit": "× calibration",
            "extra": "45.48ns  calibration: 65.44ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4623,
            "range": "± 0.0359",
            "unit": "× calibration",
            "extra": "95.70ns  calibration: 65.44ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4293,
            "range": "± 0.0290",
            "unit": "× calibration",
            "extra": "93.54ns  calibration: 65.44ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5203,
            "range": "± 0.0021",
            "unit": "× calibration",
            "extra": "34.05ns  calibration: 65.44ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1682,
            "range": "± 0.0205",
            "unit": "× calibration",
            "extra": "76.45ns  calibration: 65.44ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2479,
            "range": "± 0.0212",
            "unit": "× calibration",
            "extra": "81.67ns  calibration: 65.44ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 803.3556,
            "range": "± 6.8074",
            "unit": "× calibration",
            "extra": "52574.40ns  calibration: 65.44ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1042.8599,
            "range": "± 10.3295",
            "unit": "× calibration",
            "extra": "68248.40ns  calibration: 65.44ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 872.531,
            "range": "± 7.0366",
            "unit": "× calibration",
            "extra": "57101.48ns  calibration: 65.44ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2912.7225,
            "range": "± 970.2644",
            "unit": "× calibration",
            "extra": "190618.75ns  calibration: 65.44ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.5127,
            "range": "± 0.0278",
            "unit": "× calibration",
            "extra": "360.77ns  calibration: 65.44ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.7063,
            "range": "± 0.0683",
            "unit": "× calibration",
            "extra": "1355.09ns  calibration: 65.44ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 28.6047,
            "range": "± 0.1060",
            "unit": "× calibration",
            "extra": "1871.99ns  calibration: 65.44ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.1818,
            "range": "± 0.0234",
            "unit": "× calibration",
            "extra": "208.23ns  calibration: 65.44ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.937,
            "range": "± 0.0240",
            "unit": "× calibration",
            "extra": "388.54ns  calibration: 65.44ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.5835,
            "range": "± 0.0507",
            "unit": "× calibration",
            "extra": "692.62ns  calibration: 65.44ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6245,
            "range": "± 0.0031",
            "unit": "× calibration",
            "extra": "40.87ns  calibration: 65.44ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0962,
            "range": "± 0.0194",
            "unit": "× calibration",
            "extra": "71.74ns  calibration: 65.44ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 32.0029,
            "range": "± 0.4092",
            "unit": "× calibration",
            "extra": "2094.38ns  calibration: 65.44ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 30.6927,
            "range": "± 0.4653",
            "unit": "× calibration",
            "extra": "2008.64ns  calibration: 65.44ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.4915,
            "range": "± 0.0202",
            "unit": "× calibration",
            "extra": "97.61ns  calibration: 65.44ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.9615,
            "range": "± 0.0215",
            "unit": "× calibration",
            "extra": "128.37ns  calibration: 65.44ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 136.5425,
            "range": "± 2.0628",
            "unit": "× calibration",
            "extra": "8935.82ns  calibration: 65.44ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.8592,
            "range": "± 0.0211",
            "unit": "× calibration",
            "extra": "121.67ns  calibration: 65.44ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 30.5103,
            "range": "± 0.3918",
            "unit": "× calibration",
            "extra": "1996.70ns  calibration: 65.44ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 179.0855,
            "range": "± 16.0130",
            "unit": "× calibration",
            "extra": "11719.98ns  calibration: 65.44ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 10867.6278,
            "range": "± 164.8980",
            "unit": "× calibration",
            "extra": "711215.59ns  calibration: 65.44ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.439,
            "range": "± 0.0185",
            "unit": "× calibration",
            "extra": "94.17ns  calibration: 65.44ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 52.1569,
            "range": "± 0.4798",
            "unit": "× calibration",
            "extra": "3413.33ns  calibration: 65.44ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 62.2989,
            "range": "± 1.6961",
            "unit": "× calibration",
            "extra": "4077.06ns  calibration: 65.44ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.142,
            "range": "± 0.0243",
            "unit": "× calibration",
            "extra": "140.18ns  calibration: 65.44ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 75.6845,
            "range": "± 0.5438",
            "unit": "× calibration",
            "extra": "4953.06ns  calibration: 65.44ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 87.5471,
            "range": "± 2.7445",
            "unit": "× calibration",
            "extra": "5729.39ns  calibration: 65.44ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.2719,
            "range": "± 0.0174",
            "unit": "× calibration",
            "extra": "148.68ns  calibration: 65.44ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 175.0009,
            "range": "± 2.2487",
            "unit": "× calibration",
            "extra": "11452.67ns  calibration: 65.44ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 183.229,
            "range": "± 2.1805",
            "unit": "× calibration",
            "extra": "11991.15ns  calibration: 65.44ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.449,
            "range": "± 0.0183",
            "unit": "× calibration",
            "extra": "94.83ns  calibration: 65.44ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 93.6774,
            "range": "± 7.9476",
            "unit": "× calibration",
            "extra": "6130.58ns  calibration: 65.44ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 104.5509,
            "range": "± 5.6634",
            "unit": "× calibration",
            "extra": "6842.18ns  calibration: 65.44ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.5911,
            "range": "± 0.0177",
            "unit": "× calibration",
            "extra": "104.13ns  calibration: 65.44ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 172.2522,
            "range": "± 2.3692",
            "unit": "× calibration",
            "extra": "11272.79ns  calibration: 65.44ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 185.2901,
            "range": "± 3.2588",
            "unit": "× calibration",
            "extra": "12126.03ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 69.6204,
            "range": "± 1.5095",
            "unit": "× calibration",
            "extra": "4556.20ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 146.3664,
            "range": "± 1.9864",
            "unit": "× calibration",
            "extra": "9578.73ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 137.808,
            "range": "± 0.3522",
            "unit": "× calibration",
            "extra": "9018.64ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.344,
            "range": "± 0.0351",
            "unit": "× calibration",
            "extra": "676.95ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.2627,
            "range": "± 0.0419",
            "unit": "× calibration",
            "extra": "737.07ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 153.4493,
            "range": "± 11.9433",
            "unit": "× calibration",
            "extra": "10042.26ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 237.8818,
            "range": "± 3.4457",
            "unit": "× calibration",
            "extra": "15567.82ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 12.396,
            "range": "± 0.0425",
            "unit": "× calibration",
            "extra": "811.24ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 105.1822,
            "range": "± 6.2925",
            "unit": "× calibration",
            "extra": "6883.49ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 162.8435,
            "range": "± 2.6514",
            "unit": "× calibration",
            "extra": "10657.05ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 241.1628,
            "range": "± 6.1270",
            "unit": "× calibration",
            "extra": "15782.54ns  calibration: 65.44ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 12.521,
            "range": "± 0.0451",
            "unit": "× calibration",
            "extra": "819.42ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 74.3377,
            "range": "± 2.1260",
            "unit": "× calibration",
            "extra": "4864.92ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 64.7924,
            "range": "± 1.8721",
            "unit": "× calibration",
            "extra": "4240.24ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 70.1133,
            "range": "± 1.7553",
            "unit": "× calibration",
            "extra": "4588.46ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 99.5353,
            "range": "± 2.1234",
            "unit": "× calibration",
            "extra": "6513.94ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 102.4831,
            "range": "± 2.1371",
            "unit": "× calibration",
            "extra": "6706.85ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 102.4293,
            "range": "± 2.3634",
            "unit": "× calibration",
            "extra": "6703.33ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 99.4841,
            "range": "± 2.6209",
            "unit": "× calibration",
            "extra": "6510.59ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 102.8198,
            "range": "± 1.0189",
            "unit": "× calibration",
            "extra": "6728.89ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 95.7531,
            "range": "± 1.9033",
            "unit": "× calibration",
            "extra": "6266.42ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 106.1494,
            "range": "± 2.0784",
            "unit": "× calibration",
            "extra": "6946.79ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 71.0153,
            "range": "± 2.4979",
            "unit": "× calibration",
            "extra": "4647.49ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 62.0651,
            "range": "± 1.9001",
            "unit": "× calibration",
            "extra": "4061.76ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 67.6202,
            "range": "± 1.8255",
            "unit": "× calibration",
            "extra": "4425.30ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 65.2196,
            "range": "± 2.1021",
            "unit": "× calibration",
            "extra": "4268.20ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 66.77,
            "range": "± 1.8387",
            "unit": "× calibration",
            "extra": "4369.66ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 97.7694,
            "range": "± 1.9391",
            "unit": "× calibration",
            "extra": "6398.37ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 140.0182,
            "range": "± 14.2359",
            "unit": "× calibration",
            "extra": "9163.28ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 141.4713,
            "range": "± 14.7789",
            "unit": "× calibration",
            "extra": "9258.38ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 115.2753,
            "range": "± 8.2991",
            "unit": "× calibration",
            "extra": "7544.02ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 199.2219,
            "range": "± 0.2242",
            "unit": "× calibration",
            "extra": "13037.78ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.531,
            "range": "± 0.0021",
            "unit": "× calibration",
            "extra": "34.75ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.513,
            "range": "± 0.0020",
            "unit": "× calibration",
            "extra": "33.57ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 30.209,
            "range": "± 0.1288",
            "unit": "× calibration",
            "extra": "1976.98ns  calibration: 65.44ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0493,
            "range": "± 0.0194",
            "unit": "× calibration",
            "extra": "68.67ns  calibration: 65.44ns"
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
            "value": 0.6787,
            "range": "± 0.0066",
            "unit": "× calibration",
            "extra": "43.02ns  calibration: 63.39ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4664,
            "range": "± 0.0364",
            "unit": "× calibration",
            "extra": "92.95ns  calibration: 63.39ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4203,
            "range": "± 0.0322",
            "unit": "× calibration",
            "extra": "90.03ns  calibration: 63.39ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5676,
            "range": "± 0.0024",
            "unit": "× calibration",
            "extra": "35.98ns  calibration: 63.39ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.3237,
            "range": "± 0.0218",
            "unit": "× calibration",
            "extra": "83.91ns  calibration: 63.39ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.328,
            "range": "± 0.0251",
            "unit": "× calibration",
            "extra": "84.18ns  calibration: 63.39ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 844.0179,
            "range": "± 6.9492",
            "unit": "× calibration",
            "extra": "53500.80ns  calibration: 63.39ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1174.6554,
            "range": "± 11.2955",
            "unit": "× calibration",
            "extra": "74459.33ns  calibration: 63.39ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 932.6554,
            "range": "± 10.8301",
            "unit": "× calibration",
            "extra": "59119.38ns  calibration: 63.39ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 3206.667,
            "range": "± 137.9751",
            "unit": "× calibration",
            "extra": "203264.95ns  calibration: 63.39ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.6906,
            "range": "± 0.0185",
            "unit": "× calibration",
            "extra": "360.72ns  calibration: 63.39ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.9836,
            "range": "± 0.0782",
            "unit": "× calibration",
            "extra": "1393.50ns  calibration: 63.39ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 31.8283,
            "range": "± 0.1216",
            "unit": "× calibration",
            "extra": "2017.54ns  calibration: 63.39ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.3667,
            "range": "± 0.0670",
            "unit": "× calibration",
            "extra": "213.41ns  calibration: 63.39ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.0753,
            "range": "± 0.0293",
            "unit": "× calibration",
            "extra": "385.10ns  calibration: 63.39ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.3125,
            "range": "± 0.0669",
            "unit": "× calibration",
            "extra": "717.08ns  calibration: 63.39ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6638,
            "range": "± 0.0052",
            "unit": "× calibration",
            "extra": "42.08ns  calibration: 63.39ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.1286,
            "range": "± 0.0249",
            "unit": "× calibration",
            "extra": "71.54ns  calibration: 63.39ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 33.1281,
            "range": "± 0.5064",
            "unit": "× calibration",
            "extra": "2099.93ns  calibration: 63.39ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 31.3624,
            "range": "± 0.4261",
            "unit": "× calibration",
            "extra": "1988.01ns  calibration: 63.39ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.4542,
            "range": "± 0.0205",
            "unit": "× calibration",
            "extra": "92.18ns  calibration: 63.39ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.8617,
            "range": "± 0.0221",
            "unit": "× calibration",
            "extra": "118.01ns  calibration: 63.39ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 139.0157,
            "range": "± 1.3409",
            "unit": "× calibration",
            "extra": "8811.96ns  calibration: 63.39ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.2256,
            "range": "± 0.0249",
            "unit": "× calibration",
            "extra": "141.08ns  calibration: 63.39ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 31.4644,
            "range": "± 0.3318",
            "unit": "× calibration",
            "extra": "1994.47ns  calibration: 63.39ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 187.2407,
            "range": "± 16.7720",
            "unit": "× calibration",
            "extra": "11868.86ns  calibration: 63.39ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 11080.9842,
            "range": "± 125.4176",
            "unit": "× calibration",
            "extra": "702404.00ns  calibration: 63.39ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.4735,
            "range": "± 0.0221",
            "unit": "× calibration",
            "extra": "93.40ns  calibration: 63.39ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 54.2217,
            "range": "± 0.4099",
            "unit": "× calibration",
            "extra": "3437.02ns  calibration: 63.39ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 64.517,
            "range": "± 2.3642",
            "unit": "× calibration",
            "extra": "4089.62ns  calibration: 63.39ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1621,
            "range": "± 0.0330",
            "unit": "× calibration",
            "extra": "137.05ns  calibration: 63.39ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 80.6817,
            "range": "± 0.6814",
            "unit": "× calibration",
            "extra": "5114.27ns  calibration: 63.39ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 90.7743,
            "range": "± 2.7780",
            "unit": "× calibration",
            "extra": "5754.02ns  calibration: 63.39ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3885,
            "range": "± 0.0205",
            "unit": "× calibration",
            "extra": "151.40ns  calibration: 63.39ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 184.0007,
            "range": "± 4.7633",
            "unit": "× calibration",
            "extra": "11663.48ns  calibration: 63.39ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 197.501,
            "range": "± 1.9035",
            "unit": "× calibration",
            "extra": "12519.24ns  calibration: 63.39ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.5127,
            "range": "± 0.0204",
            "unit": "× calibration",
            "extra": "95.89ns  calibration: 63.39ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 97.151,
            "range": "± 8.7041",
            "unit": "× calibration",
            "extra": "6158.23ns  calibration: 63.39ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 113.2575,
            "range": "± 8.8660",
            "unit": "× calibration",
            "extra": "7179.19ns  calibration: 63.39ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.6596,
            "range": "± 0.0202",
            "unit": "× calibration",
            "extra": "105.20ns  calibration: 63.39ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 178.4503,
            "range": "± 1.5441",
            "unit": "× calibration",
            "extra": "11311.65ns  calibration: 63.39ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 192.098,
            "range": "± 3.5955",
            "unit": "× calibration",
            "extra": "12176.75ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 73.1396,
            "range": "± 2.4658",
            "unit": "× calibration",
            "extra": "4636.19ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 163.2551,
            "range": "± 1.8221",
            "unit": "× calibration",
            "extra": "10348.45ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 147.8036,
            "range": "± 0.5192",
            "unit": "× calibration",
            "extra": "9369.01ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 11.4158,
            "range": "± 0.0563",
            "unit": "× calibration",
            "extra": "723.63ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 12.3261,
            "range": "± 0.0355",
            "unit": "× calibration",
            "extra": "781.33ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 165.4395,
            "range": "± 10.8749",
            "unit": "× calibration",
            "extra": "10486.92ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 269.8835,
            "range": "± 4.9773",
            "unit": "× calibration",
            "extra": "17107.44ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 14.255,
            "range": "± 0.0634",
            "unit": "× calibration",
            "extra": "903.60ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 110.8523,
            "range": "± 8.3064",
            "unit": "× calibration",
            "extra": "7026.73ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 169.8604,
            "range": "± 3.0013",
            "unit": "× calibration",
            "extra": "10767.15ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 267.8527,
            "range": "± 3.1630",
            "unit": "× calibration",
            "extra": "16978.71ns  calibration: 63.39ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 13.9291,
            "range": "± 0.0513",
            "unit": "× calibration",
            "extra": "882.94ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 82.8826,
            "range": "± 2.5129",
            "unit": "× calibration",
            "extra": "5253.78ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 84.496,
            "range": "± 3.4410",
            "unit": "× calibration",
            "extra": "5356.05ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 82.2612,
            "range": "± 2.8048",
            "unit": "× calibration",
            "extra": "5214.39ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 108.2452,
            "range": "± 2.0223",
            "unit": "× calibration",
            "extra": "6861.47ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 109.9057,
            "range": "± 1.0892",
            "unit": "× calibration",
            "extra": "6966.73ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 108.4466,
            "range": "± 0.9622",
            "unit": "× calibration",
            "extra": "6874.24ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 109.8097,
            "range": "± 1.6331",
            "unit": "× calibration",
            "extra": "6960.64ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 110.7794,
            "range": "± 1.4132",
            "unit": "× calibration",
            "extra": "7022.11ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 117.123,
            "range": "± 1.9669",
            "unit": "× calibration",
            "extra": "7424.22ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 113.0655,
            "range": "± 1.8445",
            "unit": "× calibration",
            "extra": "7167.02ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 84.8271,
            "range": "± 2.2329",
            "unit": "× calibration",
            "extra": "5377.04ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 84.1158,
            "range": "± 2.9925",
            "unit": "× calibration",
            "extra": "5331.95ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 85.1213,
            "range": "± 2.3487",
            "unit": "× calibration",
            "extra": "5395.69ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 85.0136,
            "range": "± 2.6772",
            "unit": "× calibration",
            "extra": "5388.86ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 85.9566,
            "range": "± 2.5322",
            "unit": "× calibration",
            "extra": "5448.64ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 102.1249,
            "range": "± 2.1062",
            "unit": "× calibration",
            "extra": "6473.52ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 147.3873,
            "range": "± 13.9862",
            "unit": "× calibration",
            "extra": "9342.62ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 147.6795,
            "range": "± 15.4734",
            "unit": "× calibration",
            "extra": "9361.14ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 120.2501,
            "range": "± 9.2318",
            "unit": "× calibration",
            "extra": "7622.44ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 207.828,
            "range": "± 0.7853",
            "unit": "× calibration",
            "extra": "13173.85ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5667,
            "range": "± 0.0024",
            "unit": "× calibration",
            "extra": "35.92ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5413,
            "range": "± 0.0024",
            "unit": "× calibration",
            "extra": "34.31ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 31.1648,
            "range": "± 0.1341",
            "unit": "× calibration",
            "extra": "1975.48ns  calibration: 63.39ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0576,
            "range": "± 0.0208",
            "unit": "× calibration",
            "extra": "67.04ns  calibration: 63.39ns"
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
            "value": 0.6957,
            "range": "± 0.0257",
            "unit": "× calibration",
            "extra": "35.76ns  calibration: 51.40ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.5599,
            "range": "± 0.0677",
            "unit": "× calibration",
            "extra": "80.18ns  calibration: 51.40ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.5494,
            "range": "± 0.0656",
            "unit": "× calibration",
            "extra": "79.64ns  calibration: 51.40ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.6465,
            "range": "± 0.0325",
            "unit": "× calibration",
            "extra": "33.23ns  calibration: 51.40ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.3434,
            "range": "± 0.0696",
            "unit": "× calibration",
            "extra": "69.05ns  calibration: 51.40ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.4064,
            "range": "± 0.0776",
            "unit": "× calibration",
            "extra": "72.29ns  calibration: 51.40ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 1065.34,
            "range": "± 36.8386",
            "unit": "× calibration",
            "extra": "54758.36ns  calibration: 51.40ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1239.0898,
            "range": "± 179.0471",
            "unit": "× calibration",
            "extra": "63689.08ns  calibration: 51.40ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 1160.97,
            "range": "± 40.4670",
            "unit": "× calibration",
            "extra": "59673.73ns  calibration: 51.40ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2645.3718,
            "range": "± 182.3058",
            "unit": "× calibration",
            "extra": "135971.82ns  calibration: 51.40ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.8759,
            "range": "± 0.1150",
            "unit": "× calibration",
            "extra": "302.02ns  calibration: 51.40ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.2382,
            "range": "± 0.2253",
            "unit": "× calibration",
            "extra": "1040.24ns  calibration: 51.40ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 32.6086,
            "range": "± 0.4444",
            "unit": "× calibration",
            "extra": "1676.08ns  calibration: 51.40ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.3996,
            "range": "± 0.0681",
            "unit": "× calibration",
            "extra": "174.74ns  calibration: 51.40ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.0311,
            "range": "± 0.0932",
            "unit": "× calibration",
            "extra": "310.00ns  calibration: 51.40ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 12.6234,
            "range": "± 0.3113",
            "unit": "× calibration",
            "extra": "648.84ns  calibration: 51.40ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.7514,
            "range": "± 0.0325",
            "unit": "× calibration",
            "extra": "38.62ns  calibration: 51.40ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0951,
            "range": "± 0.0802",
            "unit": "× calibration",
            "extra": "56.29ns  calibration: 51.40ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 31.8639,
            "range": "± 1.1325",
            "unit": "× calibration",
            "extra": "1637.80ns  calibration: 51.40ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 30.5995,
            "range": "± 0.5148",
            "unit": "× calibration",
            "extra": "1572.81ns  calibration: 51.40ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5494,
            "range": "± 0.0578",
            "unit": "× calibration",
            "extra": "79.64ns  calibration: 51.40ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.9558,
            "range": "± 0.0767",
            "unit": "× calibration",
            "extra": "100.53ns  calibration: 51.40ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 152.4048,
            "range": "± 5.4378",
            "unit": "× calibration",
            "extra": "7833.59ns  calibration: 51.40ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.3841,
            "range": "± 0.1086",
            "unit": "× calibration",
            "extra": "122.54ns  calibration: 51.40ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 31.3806,
            "range": "± 0.6261",
            "unit": "× calibration",
            "extra": "1612.96ns  calibration: 51.40ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 177.5918,
            "range": "± 19.5109",
            "unit": "× calibration",
            "extra": "9128.20ns  calibration: 51.40ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 11698.703,
            "range": "± 348.6875",
            "unit": "× calibration",
            "extra": "601312.06ns  calibration: 51.40ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.4374,
            "range": "± 0.0529",
            "unit": "× calibration",
            "extra": "73.88ns  calibration: 51.40ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 57.9939,
            "range": "± 0.9463",
            "unit": "× calibration",
            "extra": "2980.88ns  calibration: 51.40ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 67.6424,
            "range": "± 1.3045",
            "unit": "× calibration",
            "extra": "3476.81ns  calibration: 51.40ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1926,
            "range": "± 0.0407",
            "unit": "× calibration",
            "extra": "112.70ns  calibration: 51.40ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 84.9457,
            "range": "± 1.4693",
            "unit": "× calibration",
            "extra": "4366.20ns  calibration: 51.40ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 96.206,
            "range": "± 2.6735",
            "unit": "× calibration",
            "extra": "4944.98ns  calibration: 51.40ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.4245,
            "range": "± 0.0358",
            "unit": "× calibration",
            "extra": "124.62ns  calibration: 51.40ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 184.3333,
            "range": "± 3.9975",
            "unit": "× calibration",
            "extra": "9474.71ns  calibration: 51.40ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 197.166,
            "range": "± 3.6090",
            "unit": "× calibration",
            "extra": "10134.31ns  calibration: 51.40ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.4862,
            "range": "± 0.0632",
            "unit": "× calibration",
            "extra": "76.39ns  calibration: 51.40ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 100.4617,
            "range": "± 9.2810",
            "unit": "× calibration",
            "extra": "5163.72ns  calibration: 51.40ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 115.2178,
            "range": "± 6.7712",
            "unit": "× calibration",
            "extra": "5922.18ns  calibration: 51.40ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.6911,
            "range": "± 0.0463",
            "unit": "× calibration",
            "extra": "86.92ns  calibration: 51.40ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 179.0545,
            "range": "± 2.6911",
            "unit": "× calibration",
            "extra": "9203.38ns  calibration: 51.40ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 194.2882,
            "range": "± 4.2562",
            "unit": "× calibration",
            "extra": "9986.39ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 75.2515,
            "range": "± 2.2288",
            "unit": "× calibration",
            "extra": "3867.92ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 155.2159,
            "range": "± 7.2082",
            "unit": "× calibration",
            "extra": "7978.08ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 148.667,
            "range": "± 1.9784",
            "unit": "× calibration",
            "extra": "7641.47ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.9432,
            "range": "± 0.2136",
            "unit": "× calibration",
            "extra": "562.48ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 12.43,
            "range": "± 0.4428",
            "unit": "× calibration",
            "extra": "638.90ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 164.3717,
            "range": "± 15.0354",
            "unit": "× calibration",
            "extra": "8448.69ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 259.1437,
            "range": "± 11.9942",
            "unit": "× calibration",
            "extra": "13319.96ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 13.4675,
            "range": "± 0.4321",
            "unit": "× calibration",
            "extra": "692.23ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 115.4117,
            "range": "± 9.1732",
            "unit": "× calibration",
            "extra": "5932.15ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 166.5198,
            "range": "± 6.6922",
            "unit": "× calibration",
            "extra": "8559.10ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 247.2112,
            "range": "± 3.0582",
            "unit": "× calibration",
            "extra": "12706.63ns  calibration: 51.40ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 13.4726,
            "range": "± 0.1879",
            "unit": "× calibration",
            "extra": "692.49ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 88.8416,
            "range": "± 2.4115",
            "unit": "× calibration",
            "extra": "4566.45ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 88.9698,
            "range": "± 2.2769",
            "unit": "× calibration",
            "extra": "4573.04ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 86.6512,
            "range": "± 2.5580",
            "unit": "× calibration",
            "extra": "4453.86ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 111.8281,
            "range": "± 1.3255",
            "unit": "× calibration",
            "extra": "5747.95ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 113.2214,
            "range": "± 2.7362",
            "unit": "× calibration",
            "extra": "5819.57ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 115.2084,
            "range": "± 3.4199",
            "unit": "× calibration",
            "extra": "5921.70ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 115.8952,
            "range": "± 4.8261",
            "unit": "× calibration",
            "extra": "5957.00ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 112.1347,
            "range": "± 2.7389",
            "unit": "× calibration",
            "extra": "5763.71ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 120.8271,
            "range": "± 4.1901",
            "unit": "× calibration",
            "extra": "6210.50ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 118.9215,
            "range": "± 3.2346",
            "unit": "× calibration",
            "extra": "6112.55ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 90.8652,
            "range": "± 2.6193",
            "unit": "× calibration",
            "extra": "4670.46ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 89.1768,
            "range": "± 3.2045",
            "unit": "× calibration",
            "extra": "4583.68ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 89.7278,
            "range": "± 2.4136",
            "unit": "× calibration",
            "extra": "4612.00ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 88.2525,
            "range": "± 2.4198",
            "unit": "× calibration",
            "extra": "4536.17ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 91.6634,
            "range": "± 3.0206",
            "unit": "× calibration",
            "extra": "4711.49ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 105.1364,
            "range": "± 2.6463",
            "unit": "× calibration",
            "extra": "5404.00ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 149.1653,
            "range": "± 15.1152",
            "unit": "× calibration",
            "extra": "7667.08ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 151.0163,
            "range": "± 14.9413",
            "unit": "× calibration",
            "extra": "7762.22ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 123.3292,
            "range": "± 11.6168",
            "unit": "× calibration",
            "extra": "6339.11ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 211.4137,
            "range": "± 4.2977",
            "unit": "× calibration",
            "extra": "10866.64ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.6222,
            "range": "± 0.0276",
            "unit": "× calibration",
            "extra": "31.98ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.6132,
            "range": "± 0.0278",
            "unit": "× calibration",
            "extra": "31.52ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 30.3458,
            "range": "± 0.7446",
            "unit": "× calibration",
            "extra": "1559.77ns  calibration: 51.40ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.1333,
            "range": "± 0.0872",
            "unit": "× calibration",
            "extra": "58.25ns  calibration: 51.40ns"
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
            "value": 0.7231,
            "range": "± 0.0531",
            "unit": "× calibration",
            "extra": "37.72ns  calibration: 52.16ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4638,
            "range": "± 0.0497",
            "unit": "× calibration",
            "extra": "76.36ns  calibration: 52.16ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4583,
            "range": "± 0.0418",
            "unit": "× calibration",
            "extra": "76.07ns  calibration: 52.16ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.5648,
            "range": "± 0.0360",
            "unit": "× calibration",
            "extra": "29.46ns  calibration: 52.16ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2754,
            "range": "± 0.0742",
            "unit": "× calibration",
            "extra": "66.53ns  calibration: 52.16ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.3632,
            "range": "± 0.0773",
            "unit": "× calibration",
            "extra": "71.11ns  calibration: 52.16ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 895.6946,
            "range": "± 59.3892",
            "unit": "× calibration",
            "extra": "46723.34ns  calibration: 52.16ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1121.4503,
            "range": "± 115.1744",
            "unit": "× calibration",
            "extra": "58499.74ns  calibration: 52.16ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 1053.2194,
            "range": "± 62.0730",
            "unit": "× calibration",
            "extra": "54940.52ns  calibration: 52.16ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2656.1601,
            "range": "± 186.1616",
            "unit": "× calibration",
            "extra": "138556.90ns  calibration: 52.16ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 6.5192,
            "range": "± 0.1507",
            "unit": "× calibration",
            "extra": "340.07ns  calibration: 52.16ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 22.6515,
            "range": "± 0.3796",
            "unit": "× calibration",
            "extra": "1181.60ns  calibration: 52.16ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 34.4544,
            "range": "± 0.6727",
            "unit": "× calibration",
            "extra": "1797.29ns  calibration: 52.16ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.557,
            "range": "± 0.1135",
            "unit": "× calibration",
            "extra": "185.55ns  calibration: 52.16ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.4745,
            "range": "± 0.1597",
            "unit": "× calibration",
            "extra": "337.74ns  calibration: 52.16ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.9614,
            "range": "± 0.5868",
            "unit": "× calibration",
            "extra": "623.96ns  calibration: 52.16ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.7467,
            "range": "± 0.0274",
            "unit": "× calibration",
            "extra": "38.95ns  calibration: 52.16ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0753,
            "range": "± 0.0734",
            "unit": "× calibration",
            "extra": "56.09ns  calibration: 52.16ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 30.3167,
            "range": "± 1.4282",
            "unit": "× calibration",
            "extra": "1581.45ns  calibration: 52.16ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 29.9287,
            "range": "± 0.8360",
            "unit": "× calibration",
            "extra": "1561.21ns  calibration: 52.16ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5158,
            "range": "± 0.0991",
            "unit": "× calibration",
            "extra": "79.07ns  calibration: 52.16ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.8718,
            "range": "± 0.1001",
            "unit": "× calibration",
            "extra": "97.64ns  calibration: 52.16ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 141.6942,
            "range": "± 6.1153",
            "unit": "× calibration",
            "extra": "7391.39ns  calibration: 52.16ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.1076,
            "range": "± 0.1150",
            "unit": "× calibration",
            "extra": "109.94ns  calibration: 52.16ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 29.0121,
            "range": "± 0.8464",
            "unit": "× calibration",
            "extra": "1513.40ns  calibration: 52.16ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 173.9295,
            "range": "± 13.8968",
            "unit": "× calibration",
            "extra": "9072.92ns  calibration: 52.16ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 11400.9976,
            "range": "± 583.9906",
            "unit": "× calibration",
            "extra": "594725.78ns  calibration: 52.16ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.3829,
            "range": "± 0.0702",
            "unit": "× calibration",
            "extra": "72.14ns  calibration: 52.16ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 57.171,
            "range": "± 2.2552",
            "unit": "× calibration",
            "extra": "2982.29ns  calibration: 52.16ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 66.7615,
            "range": "± 3.9266",
            "unit": "× calibration",
            "extra": "3482.57ns  calibration: 52.16ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.2763,
            "range": "± 0.1693",
            "unit": "× calibration",
            "extra": "118.74ns  calibration: 52.16ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 79.3039,
            "range": "± 1.0952",
            "unit": "× calibration",
            "extra": "4136.84ns  calibration: 52.16ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 91.8156,
            "range": "± 2.7293",
            "unit": "× calibration",
            "extra": "4789.50ns  calibration: 52.16ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.357,
            "range": "± 0.0548",
            "unit": "× calibration",
            "extra": "122.95ns  calibration: 52.16ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 178.773,
            "range": "± 4.2270",
            "unit": "× calibration",
            "extra": "9325.58ns  calibration: 52.16ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 186.8214,
            "range": "± 3.4305",
            "unit": "× calibration",
            "extra": "9745.42ns  calibration: 52.16ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.418,
            "range": "± 0.0661",
            "unit": "× calibration",
            "extra": "73.97ns  calibration: 52.16ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 107.289,
            "range": "± 7.4486",
            "unit": "× calibration",
            "extra": "5596.66ns  calibration: 52.16ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 119.1482,
            "range": "± 10.9609",
            "unit": "× calibration",
            "extra": "6215.29ns  calibration: 52.16ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.6465,
            "range": "± 0.0633",
            "unit": "× calibration",
            "extra": "85.89ns  calibration: 52.16ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 183.68,
            "range": "± 4.7295",
            "unit": "× calibration",
            "extra": "9581.55ns  calibration: 52.16ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 195.0377,
            "range": "± 7.1225",
            "unit": "× calibration",
            "extra": "10174.02ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 71.7651,
            "range": "± 2.4670",
            "unit": "× calibration",
            "extra": "3743.58ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 152.5413,
            "range": "± 10.2369",
            "unit": "× calibration",
            "extra": "7957.22ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 153.3658,
            "range": "± 3.2275",
            "unit": "× calibration",
            "extra": "8000.23ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.6425,
            "range": "± 0.4386",
            "unit": "× calibration",
            "extra": "555.16ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.4222,
            "range": "± 0.3167",
            "unit": "× calibration",
            "extra": "595.83ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 160.3857,
            "range": "± 5.1223",
            "unit": "× calibration",
            "extra": "8366.42ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 251.6429,
            "range": "± 14.1380",
            "unit": "× calibration",
            "extra": "13126.79ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 13.3622,
            "range": "± 0.2923",
            "unit": "× calibration",
            "extra": "697.03ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 115.313,
            "range": "± 4.7216",
            "unit": "× calibration",
            "extra": "6015.23ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 168.4734,
            "range": "± 9.6186",
            "unit": "× calibration",
            "extra": "8788.31ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 247.0342,
            "range": "± 1.8106",
            "unit": "× calibration",
            "extra": "12886.38ns  calibration: 52.16ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 13.3762,
            "range": "± 0.7555",
            "unit": "× calibration",
            "extra": "697.76ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 86.5173,
            "range": "± 3.5785",
            "unit": "× calibration",
            "extra": "4513.12ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 89.8625,
            "range": "± 4.4015",
            "unit": "× calibration",
            "extra": "4687.62ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 89.5776,
            "range": "± 4.5922",
            "unit": "× calibration",
            "extra": "4672.76ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 112.5955,
            "range": "± 4.9576",
            "unit": "× calibration",
            "extra": "5873.47ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 115.3356,
            "range": "± 4.0008",
            "unit": "× calibration",
            "extra": "6016.41ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 112.4252,
            "range": "± 2.9712",
            "unit": "× calibration",
            "extra": "5864.59ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 122.0195,
            "range": "± 2.8146",
            "unit": "× calibration",
            "extra": "6365.07ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 109.3898,
            "range": "± 3.5020",
            "unit": "× calibration",
            "extra": "5706.25ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 122.4643,
            "range": "± 5.1422",
            "unit": "× calibration",
            "extra": "6388.27ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 112.4772,
            "range": "± 3.0383",
            "unit": "× calibration",
            "extra": "5867.30ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 93.2577,
            "range": "± 4.8062",
            "unit": "× calibration",
            "extra": "4864.73ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 91.1766,
            "range": "± 6.7115",
            "unit": "× calibration",
            "extra": "4756.17ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 89.6378,
            "range": "± 2.2799",
            "unit": "× calibration",
            "extra": "4675.90ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 89.3986,
            "range": "± 4.0783",
            "unit": "× calibration",
            "extra": "4663.42ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 92.6889,
            "range": "± 2.7047",
            "unit": "× calibration",
            "extra": "4835.06ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 104.8578,
            "range": "± 4.4751",
            "unit": "× calibration",
            "extra": "5469.84ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 143.667,
            "range": "± 13.0127",
            "unit": "× calibration",
            "extra": "7494.30ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 157.64,
            "range": "± 14.9662",
            "unit": "× calibration",
            "extra": "8223.19ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 123.2439,
            "range": "± 8.2328",
            "unit": "× calibration",
            "extra": "6428.94ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 206.7743,
            "range": "± 3.7236",
            "unit": "× calibration",
            "extra": "10786.25ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5383,
            "range": "± 0.0305",
            "unit": "× calibration",
            "extra": "28.08ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5042,
            "range": "± 0.0299",
            "unit": "× calibration",
            "extra": "26.30ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 29.2872,
            "range": "± 1.4188",
            "unit": "× calibration",
            "extra": "1527.75ns  calibration: 52.16ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0137,
            "range": "± 0.0713",
            "unit": "× calibration",
            "extra": "52.88ns  calibration: 52.16ns"
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
            "value": 0.6235,
            "range": "± 0.0050",
            "unit": "× calibration",
            "extra": "42.25ns  calibration: 67.76ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3604,
            "range": "± 0.0246",
            "unit": "× calibration",
            "extra": "92.18ns  calibration: 67.76ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.339,
            "range": "± 0.0201",
            "unit": "× calibration",
            "extra": "90.73ns  calibration: 67.76ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.348,
            "range": "± 0.0000",
            "unit": "× calibration",
            "extra": "23.58ns  calibration: 67.76ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1652,
            "range": "± 0.0179",
            "unit": "× calibration",
            "extra": "78.95ns  calibration: 67.76ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2804,
            "range": "± 0.0258",
            "unit": "× calibration",
            "extra": "86.76ns  calibration: 67.76ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 804.1295,
            "range": "± 17.4697",
            "unit": "× calibration",
            "extra": "54487.16ns  calibration: 67.76ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1159.9268,
            "range": "± 11.7549",
            "unit": "× calibration",
            "extra": "78595.70ns  calibration: 67.76ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 862.045,
            "range": "± 6.8847",
            "unit": "× calibration",
            "extra": "58411.47ns  calibration: 67.76ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 3215.9578,
            "range": "± 1061.7601",
            "unit": "× calibration",
            "extra": "217910.69ns  calibration: 67.76ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.3724,
            "range": "± 0.0297",
            "unit": "× calibration",
            "extra": "364.03ns  calibration: 67.76ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.5157,
            "range": "± 0.0593",
            "unit": "× calibration",
            "extra": "1390.13ns  calibration: 67.76ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 31.6592,
            "range": "± 0.1470",
            "unit": "× calibration",
            "extra": "2145.20ns  calibration: 67.76ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.2433,
            "range": "± 0.0061",
            "unit": "× calibration",
            "extra": "219.76ns  calibration: 67.76ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.6406,
            "range": "± 0.0581",
            "unit": "× calibration",
            "extra": "382.20ns  calibration: 67.76ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.3615,
            "range": "± 0.0341",
            "unit": "× calibration",
            "extra": "702.09ns  calibration: 67.76ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6105,
            "range": "± 0.0018",
            "unit": "× calibration",
            "extra": "41.37ns  calibration: 67.76ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 0.982,
            "range": "± 0.0184",
            "unit": "× calibration",
            "extra": "66.54ns  calibration: 67.76ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 30.4003,
            "range": "± 0.4109",
            "unit": "× calibration",
            "extra": "2059.90ns  calibration: 67.76ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 29.4384,
            "range": "± 0.3775",
            "unit": "× calibration",
            "extra": "1994.72ns  calibration: 67.76ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.3583,
            "range": "± 0.0131",
            "unit": "× calibration",
            "extra": "92.04ns  calibration: 67.76ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.8586,
            "range": "± 0.0198",
            "unit": "× calibration",
            "extra": "125.94ns  calibration: 67.76ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 131.2439,
            "range": "± 1.1069",
            "unit": "× calibration",
            "extra": "8892.98ns  calibration: 67.76ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.8864,
            "range": "± 0.0310",
            "unit": "× calibration",
            "extra": "127.82ns  calibration: 67.76ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 28.7999,
            "range": "± 0.1924",
            "unit": "× calibration",
            "extra": "1951.46ns  calibration: 67.76ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 171.6836,
            "range": "± 13.7341",
            "unit": "× calibration",
            "extra": "11633.14ns  calibration: 67.76ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 10614.7949,
            "range": "± 110.7378",
            "unit": "× calibration",
            "extra": "719249.88ns  calibration: 67.76ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.6038,
            "range": "± 0.0362",
            "unit": "× calibration",
            "extra": "108.67ns  calibration: 67.76ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 50.2277,
            "range": "± 0.1865",
            "unit": "× calibration",
            "extra": "3403.39ns  calibration: 67.76ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 59.9886,
            "range": "± 2.4938",
            "unit": "× calibration",
            "extra": "4064.78ns  calibration: 67.76ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1309,
            "range": "± 0.0205",
            "unit": "× calibration",
            "extra": "144.39ns  calibration: 67.76ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 73.1384,
            "range": "± 0.1950",
            "unit": "× calibration",
            "extra": "4955.80ns  calibration: 67.76ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 83.745,
            "range": "± 2.4197",
            "unit": "× calibration",
            "extra": "5674.49ns  calibration: 67.76ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.2942,
            "range": "± 0.0182",
            "unit": "× calibration",
            "extra": "155.45ns  calibration: 67.76ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 168.5686,
            "range": "± 1.4163",
            "unit": "× calibration",
            "extra": "11422.07ns  calibration: 67.76ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 180.6678,
            "range": "± 2.1026",
            "unit": "× calibration",
            "extra": "12241.90ns  calibration: 67.76ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.5183,
            "range": "± 0.0201",
            "unit": "× calibration",
            "extra": "102.88ns  calibration: 67.76ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 90.0616,
            "range": "± 7.3749",
            "unit": "× calibration",
            "extra": "6102.50ns  calibration: 67.76ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 100.3734,
            "range": "± 6.9115",
            "unit": "× calibration",
            "extra": "6801.22ns  calibration: 67.76ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.686,
            "range": "± 0.0202",
            "unit": "× calibration",
            "extra": "114.24ns  calibration: 67.76ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 168.4915,
            "range": "± 0.2106",
            "unit": "× calibration",
            "extra": "11416.85ns  calibration: 67.76ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 180.4759,
            "range": "± 1.0319",
            "unit": "× calibration",
            "extra": "12228.90ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 67.084,
            "range": "± 2.4423",
            "unit": "× calibration",
            "extra": "4545.56ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 150.1755,
            "range": "± 1.7710",
            "unit": "× calibration",
            "extra": "10175.77ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 137.4543,
            "range": "± 1.0812",
            "unit": "× calibration",
            "extra": "9313.79ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.8241,
            "range": "± 0.0441",
            "unit": "× calibration",
            "extra": "733.43ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.3242,
            "range": "± 0.0458",
            "unit": "× calibration",
            "extra": "767.32ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 151.5259,
            "range": "± 10.3100",
            "unit": "× calibration",
            "extra": "10267.27ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 249.9773,
            "range": "± 3.1804",
            "unit": "× calibration",
            "extra": "16938.26ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 12.3394,
            "range": "± 0.0435",
            "unit": "× calibration",
            "extra": "836.11ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 101.4047,
            "range": "± 6.5299",
            "unit": "× calibration",
            "extra": "6871.10ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 157.397,
            "range": "± 1.4832",
            "unit": "× calibration",
            "extra": "10665.09ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 237.1206,
            "range": "± 8.6406",
            "unit": "× calibration",
            "extra": "16067.10ns  calibration: 67.76ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 12.557,
            "range": "± 0.0620",
            "unit": "× calibration",
            "extra": "850.85ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 76.2052,
            "range": "± 2.6597",
            "unit": "× calibration",
            "extra": "5163.60ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 77.2106,
            "range": "± 2.1358",
            "unit": "× calibration",
            "extra": "5231.73ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 75.5399,
            "range": "± 2.2542",
            "unit": "× calibration",
            "extra": "5118.52ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 99.8003,
            "range": "± 1.7559",
            "unit": "× calibration",
            "extra": "6762.39ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 100.6492,
            "range": "± 0.6113",
            "unit": "× calibration",
            "extra": "6819.91ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 100.735,
            "range": "± 0.8507",
            "unit": "× calibration",
            "extra": "6825.72ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 107.5302,
            "range": "± 1.0195",
            "unit": "× calibration",
            "extra": "7286.16ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 100.2773,
            "range": "± 1.2561",
            "unit": "× calibration",
            "extra": "6794.71ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 104.3957,
            "range": "± 1.0698",
            "unit": "× calibration",
            "extra": "7073.77ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 102.9369,
            "range": "± 2.9082",
            "unit": "× calibration",
            "extra": "6974.92ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 77.5663,
            "range": "± 2.0365",
            "unit": "× calibration",
            "extra": "5255.83ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 77.0378,
            "range": "± 2.5360",
            "unit": "× calibration",
            "extra": "5220.02ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 77.6962,
            "range": "± 2.2207",
            "unit": "× calibration",
            "extra": "5264.63ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 77.342,
            "range": "± 2.1385",
            "unit": "× calibration",
            "extra": "5240.63ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 79.4345,
            "range": "± 2.3160",
            "unit": "× calibration",
            "extra": "5382.42ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 95.7336,
            "range": "± 2.7562",
            "unit": "× calibration",
            "extra": "6486.83ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 134.7881,
            "range": "± 12.4625",
            "unit": "× calibration",
            "extra": "9133.13ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 149.3341,
            "range": "± 14.3365",
            "unit": "× calibration",
            "extra": "10118.76ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 111.7255,
            "range": "± 7.5960",
            "unit": "× calibration",
            "extra": "7570.43ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 194.1161,
            "range": "± 0.4159",
            "unit": "× calibration",
            "extra": "13153.15ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5289,
            "range": "± 0.0013",
            "unit": "× calibration",
            "extra": "35.84ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5071,
            "range": "± 0.0016",
            "unit": "× calibration",
            "extra": "34.36ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 29.199,
            "range": "± 0.1027",
            "unit": "× calibration",
            "extra": "1978.50ns  calibration: 67.76ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 0.9898,
            "range": "± 0.0187",
            "unit": "× calibration",
            "extra": "67.07ns  calibration: 67.76ns"
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
            "value": 0.6585,
            "range": "± 0.0187",
            "unit": "× calibration",
            "extra": "45.19ns  calibration: 68.63ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3424,
            "range": "± 0.0278",
            "unit": "× calibration",
            "extra": "92.13ns  calibration: 68.63ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3254,
            "range": "± 0.0236",
            "unit": "× calibration",
            "extra": "90.96ns  calibration: 68.63ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3716,
            "range": "± 0.0015",
            "unit": "× calibration",
            "extra": "25.50ns  calibration: 68.63ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1737,
            "range": "± 0.0194",
            "unit": "× calibration",
            "extra": "80.55ns  calibration: 68.63ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.3522,
            "range": "± 0.0345",
            "unit": "× calibration",
            "extra": "92.80ns  calibration: 68.63ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 1155.0299,
            "range": "± 411.8063",
            "unit": "× calibration",
            "extra": "79270.35ns  calibration: 68.63ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1131.6118,
            "range": "± 11.6712",
            "unit": "× calibration",
            "extra": "77663.15ns  calibration: 68.63ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 859.1578,
            "range": "± 15.2483",
            "unit": "× calibration",
            "extra": "58964.48ns  calibration: 68.63ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2773.649,
            "range": "± 115.9105",
            "unit": "× calibration",
            "extra": "190357.08ns  calibration: 68.63ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.2908,
            "range": "± 0.0163",
            "unit": "× calibration",
            "extra": "363.11ns  calibration: 68.63ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.2104,
            "range": "± 0.0590",
            "unit": "× calibration",
            "extra": "1387.05ns  calibration: 68.63ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 29.8905,
            "range": "± 0.2269",
            "unit": "× calibration",
            "extra": "2051.40ns  calibration: 68.63ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.0507,
            "range": "± 0.0090",
            "unit": "× calibration",
            "extra": "209.37ns  calibration: 68.63ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.4929,
            "range": "± 0.0341",
            "unit": "× calibration",
            "extra": "376.98ns  calibration: 68.63ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.1465,
            "range": "± 0.0277",
            "unit": "× calibration",
            "extra": "696.36ns  calibration: 68.63ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6026,
            "range": "± 0.0017",
            "unit": "× calibration",
            "extra": "41.36ns  calibration: 68.63ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 0.9861,
            "range": "± 0.0194",
            "unit": "× calibration",
            "extra": "67.68ns  calibration: 68.63ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 36.4932,
            "range": "± 0.3716",
            "unit": "× calibration",
            "extra": "2504.55ns  calibration: 68.63ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 28.8902,
            "range": "± 0.3701",
            "unit": "× calibration",
            "extra": "1982.75ns  calibration: 68.63ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.345,
            "range": "± 0.0127",
            "unit": "× calibration",
            "extra": "92.31ns  calibration: 68.63ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.8388,
            "range": "± 0.0267",
            "unit": "× calibration",
            "extra": "126.20ns  calibration: 68.63ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 127.0446,
            "range": "± 1.2458",
            "unit": "× calibration",
            "extra": "8719.14ns  calibration: 68.63ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.8566,
            "range": "± 0.0286",
            "unit": "× calibration",
            "extra": "127.42ns  calibration: 68.63ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 28.6814,
            "range": "± 0.2607",
            "unit": "× calibration",
            "extra": "1968.42ns  calibration: 68.63ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 170.5251,
            "range": "± 13.6387",
            "unit": "× calibration",
            "extra": "11703.23ns  calibration: 68.63ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 10247.8535,
            "range": "± 104.8804",
            "unit": "× calibration",
            "extra": "703315.92ns  calibration: 68.63ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.5187,
            "range": "± 0.0187",
            "unit": "× calibration",
            "extra": "104.23ns  calibration: 68.63ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 49.7347,
            "range": "± 0.2422",
            "unit": "× calibration",
            "extra": "3413.32ns  calibration: 68.63ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 58.3029,
            "range": "± 1.8103",
            "unit": "× calibration",
            "extra": "4001.36ns  calibration: 68.63ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1372,
            "range": "± 0.0179",
            "unit": "× calibration",
            "extra": "146.68ns  calibration: 68.63ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 72.0491,
            "range": "± 0.2021",
            "unit": "× calibration",
            "extra": "4944.77ns  calibration: 68.63ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 83.0084,
            "range": "± 1.8919",
            "unit": "× calibration",
            "extra": "5696.91ns  calibration: 68.63ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.2452,
            "range": "± 0.0226",
            "unit": "× calibration",
            "extra": "154.09ns  calibration: 68.63ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 166.8445,
            "range": "± 2.0816",
            "unit": "× calibration",
            "extra": "11450.63ns  calibration: 68.63ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 176.7705,
            "range": "± 3.1656",
            "unit": "× calibration",
            "extra": "12131.86ns  calibration: 68.63ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.4919,
            "range": "± 0.0187",
            "unit": "× calibration",
            "extra": "102.39ns  calibration: 68.63ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 88.4908,
            "range": "± 6.9256",
            "unit": "× calibration",
            "extra": "6073.17ns  calibration: 68.63ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 98.7368,
            "range": "± 6.8268",
            "unit": "× calibration",
            "extra": "6776.36ns  calibration: 68.63ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.6539,
            "range": "± 0.0188",
            "unit": "× calibration",
            "extra": "113.51ns  calibration: 68.63ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 166.6444,
            "range": "± 0.2833",
            "unit": "× calibration",
            "extra": "11436.90ns  calibration: 68.63ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 179.5841,
            "range": "± 1.4604",
            "unit": "× calibration",
            "extra": "12324.96ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 66.3524,
            "range": "± 2.1435",
            "unit": "× calibration",
            "extra": "4553.80ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 143.2782,
            "range": "± 1.8213",
            "unit": "× calibration",
            "extra": "9833.26ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 136.3017,
            "range": "± 1.1212",
            "unit": "× calibration",
            "extra": "9354.46ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.3986,
            "range": "± 0.0290",
            "unit": "× calibration",
            "extra": "713.66ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.2532,
            "range": "± 0.0290",
            "unit": "× calibration",
            "extra": "772.31ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 148.3526,
            "range": "± 8.1783",
            "unit": "× calibration",
            "extra": "10181.52ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 249.475,
            "range": "± 2.9870",
            "unit": "× calibration",
            "extra": "17121.61ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 12.5988,
            "range": "± 0.0309",
            "unit": "× calibration",
            "extra": "864.66ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 102.3426,
            "range": "± 6.5453",
            "unit": "× calibration",
            "extra": "7023.83ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 157.665,
            "range": "± 1.4571",
            "unit": "× calibration",
            "extra": "10820.64ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 232.0013,
            "range": "± 6.8392",
            "unit": "× calibration",
            "extra": "15922.38ns  calibration: 68.63ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 12.6914,
            "range": "± 0.0804",
            "unit": "× calibration",
            "extra": "871.02ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 75.1279,
            "range": "± 2.2509",
            "unit": "× calibration",
            "extra": "5156.07ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 76.029,
            "range": "± 1.9353",
            "unit": "× calibration",
            "extra": "5217.91ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 74.5905,
            "range": "± 2.0811",
            "unit": "× calibration",
            "extra": "5119.19ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 97.2575,
            "range": "± 1.0140",
            "unit": "× calibration",
            "extra": "6674.84ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 98.4754,
            "range": "± 1.3749",
            "unit": "× calibration",
            "extra": "6758.42ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 98.8124,
            "range": "± 1.9305",
            "unit": "× calibration",
            "extra": "6781.55ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 105.8088,
            "range": "± 1.1912",
            "unit": "× calibration",
            "extra": "7261.72ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 99.0202,
            "range": "± 0.9856",
            "unit": "× calibration",
            "extra": "6795.81ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 103.5817,
            "range": "± 1.6067",
            "unit": "× calibration",
            "extra": "7108.87ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 101.9387,
            "range": "± 1.8506",
            "unit": "× calibration",
            "extra": "6996.11ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 76.0695,
            "range": "± 1.7087",
            "unit": "× calibration",
            "extra": "5220.69ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 76.1881,
            "range": "± 2.1069",
            "unit": "× calibration",
            "extra": "5228.83ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 76.7623,
            "range": "± 1.9069",
            "unit": "× calibration",
            "extra": "5268.24ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 76.3106,
            "range": "± 1.8569",
            "unit": "× calibration",
            "extra": "5237.24ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 78.2074,
            "range": "± 2.0548",
            "unit": "× calibration",
            "extra": "5367.42ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 93.3921,
            "range": "± 2.0929",
            "unit": "× calibration",
            "extra": "6409.55ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 130.8545,
            "range": "± 11.5081",
            "unit": "× calibration",
            "extra": "8980.62ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 145.5835,
            "range": "± 12.6349",
            "unit": "× calibration",
            "extra": "9991.48ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 109.928,
            "range": "± 7.3024",
            "unit": "× calibration",
            "extra": "7544.42ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 190.0818,
            "range": "± 0.3946",
            "unit": "× calibration",
            "extra": "13045.42ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5211,
            "range": "± 0.0016",
            "unit": "× calibration",
            "extra": "35.76ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5103,
            "range": "± 0.0016",
            "unit": "× calibration",
            "extra": "35.02ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 28.6056,
            "range": "± 0.1772",
            "unit": "× calibration",
            "extra": "1963.22ns  calibration: 68.63ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 0.9866,
            "range": "± 0.0185",
            "unit": "× calibration",
            "extra": "67.71ns  calibration: 68.63ns"
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
            "value": 0.7094,
            "range": "± 0.0237",
            "unit": "× calibration",
            "extra": "34.36ns  calibration: 48.44ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.5375,
            "range": "± 0.0310",
            "unit": "× calibration",
            "extra": "74.47ns  calibration: 48.44ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.5375,
            "range": "± 0.0465",
            "unit": "× calibration",
            "extra": "74.47ns  calibration: 48.44ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.486,
            "range": "± 0.0114",
            "unit": "× calibration",
            "extra": "23.54ns  calibration: 48.44ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.351,
            "range": "± 0.0314",
            "unit": "× calibration",
            "extra": "65.44ns  calibration: 48.44ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.4419,
            "range": "± 0.0479",
            "unit": "× calibration",
            "extra": "69.84ns  calibration: 48.44ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 897.8287,
            "range": "± 39.1337",
            "unit": "× calibration",
            "extra": "43487.74ns  calibration: 48.44ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1138.6712,
            "range": "± 69.5342",
            "unit": "× calibration",
            "extra": "55153.32ns  calibration: 48.44ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 1007.1367,
            "range": "± 38.3595",
            "unit": "× calibration",
            "extra": "48782.24ns  calibration: 48.44ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2733.6838,
            "range": "± 137.3343",
            "unit": "× calibration",
            "extra": "132410.25ns  calibration: 48.44ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 6.0442,
            "range": "± 0.0785",
            "unit": "× calibration",
            "extra": "292.76ns  calibration: 48.44ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.1468,
            "range": "± 0.1354",
            "unit": "× calibration",
            "extra": "1024.28ns  calibration: 48.44ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 32.3718,
            "range": "± 0.3165",
            "unit": "× calibration",
            "extra": "1567.98ns  calibration: 48.44ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.4051,
            "range": "± 0.0485",
            "unit": "× calibration",
            "extra": "164.93ns  calibration: 48.44ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.0485,
            "range": "± 0.0545",
            "unit": "× calibration",
            "extra": "292.97ns  calibration: 48.44ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.6598,
            "range": "± 0.3588",
            "unit": "× calibration",
            "extra": "564.76ns  calibration: 48.44ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6549,
            "range": "± 0.0367",
            "unit": "× calibration",
            "extra": "31.72ns  calibration: 48.44ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 0.9842,
            "range": "± 0.0281",
            "unit": "× calibration",
            "extra": "47.67ns  calibration: 48.44ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 31.7318,
            "range": "± 0.3392",
            "unit": "× calibration",
            "extra": "1536.98ns  calibration: 48.44ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 31.0548,
            "range": "± 0.3268",
            "unit": "× calibration",
            "extra": "1504.19ns  calibration: 48.44ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5909,
            "range": "± 0.0456",
            "unit": "× calibration",
            "extra": "77.06ns  calibration: 48.44ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.9917,
            "range": "± 0.0419",
            "unit": "× calibration",
            "extra": "96.47ns  calibration: 48.44ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 143.301,
            "range": "± 1.4349",
            "unit": "× calibration",
            "extra": "6941.01ns  calibration: 48.44ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.9174,
            "range": "± 0.0487",
            "unit": "× calibration",
            "extra": "92.87ns  calibration: 48.44ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 29.332,
            "range": "± 0.3361",
            "unit": "× calibration",
            "extra": "1420.74ns  calibration: 48.44ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 175.6807,
            "range": "± 15.3101",
            "unit": "× calibration",
            "extra": "8509.37ns  calibration: 48.44ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 11364.0793,
            "range": "± 122.4282",
            "unit": "× calibration",
            "extra": "550436.96ns  calibration: 48.44ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.4097,
            "range": "± 0.0324",
            "unit": "× calibration",
            "extra": "68.28ns  calibration: 48.44ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 60.0063,
            "range": "± 1.2445",
            "unit": "× calibration",
            "extra": "2906.50ns  calibration: 48.44ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 64.0892,
            "range": "± 2.1862",
            "unit": "× calibration",
            "extra": "3104.26ns  calibration: 48.44ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.2184,
            "range": "± 0.0295",
            "unit": "× calibration",
            "extra": "107.45ns  calibration: 48.44ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 80.3777,
            "range": "± 1.4041",
            "unit": "× calibration",
            "extra": "3893.22ns  calibration: 48.44ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 95.2743,
            "range": "± 2.5179",
            "unit": "× calibration",
            "extra": "4614.76ns  calibration: 48.44ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.4436,
            "range": "± 0.0250",
            "unit": "× calibration",
            "extra": "118.36ns  calibration: 48.44ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 178.9607,
            "range": "± 5.5468",
            "unit": "× calibration",
            "extra": "8668.24ns  calibration: 48.44ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 188.6827,
            "range": "± 2.3071",
            "unit": "× calibration",
            "extra": "9139.14ns  calibration: 48.44ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.4361,
            "range": "± 0.0320",
            "unit": "× calibration",
            "extra": "69.56ns  calibration: 48.44ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 96.3875,
            "range": "± 6.4583",
            "unit": "× calibration",
            "extra": "4668.68ns  calibration: 48.44ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 109.1463,
            "range": "± 8.1963",
            "unit": "× calibration",
            "extra": "5286.67ns  calibration: 48.44ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.6948,
            "range": "± 0.0434",
            "unit": "× calibration",
            "extra": "82.09ns  calibration: 48.44ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 181.8285,
            "range": "± 4.2658",
            "unit": "× calibration",
            "extra": "8807.15ns  calibration: 48.44ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 193.822,
            "range": "± 1.9580",
            "unit": "× calibration",
            "extra": "9388.07ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 73.3859,
            "range": "± 2.8165",
            "unit": "× calibration",
            "extra": "3554.56ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 151.8561,
            "range": "± 2.2297",
            "unit": "× calibration",
            "extra": "7355.39ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 149.1745,
            "range": "± 1.5338",
            "unit": "× calibration",
            "extra": "7225.50ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 11.1657,
            "range": "± 0.0875",
            "unit": "× calibration",
            "extra": "540.83ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.4961,
            "range": "± 0.0659",
            "unit": "× calibration",
            "extra": "556.83ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 158.5038,
            "range": "± 11.3006",
            "unit": "× calibration",
            "extra": "7677.38ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 248.0217,
            "range": "± 1.3799",
            "unit": "× calibration",
            "extra": "12013.32ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 13.1739,
            "range": "± 0.0987",
            "unit": "× calibration",
            "extra": "638.10ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 109.862,
            "range": "± 6.0580",
            "unit": "× calibration",
            "extra": "5321.34ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 162.2124,
            "range": "± 2.3311",
            "unit": "× calibration",
            "extra": "7857.01ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 241.086,
            "range": "± 0.7657",
            "unit": "× calibration",
            "extra": "11677.38ns  calibration: 48.44ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 13.2303,
            "range": "± 0.1078",
            "unit": "× calibration",
            "extra": "640.83ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 86.2427,
            "range": "± 2.9558",
            "unit": "× calibration",
            "extra": "4177.30ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 86.534,
            "range": "± 1.7609",
            "unit": "× calibration",
            "extra": "4191.41ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 84.206,
            "range": "± 2.0286",
            "unit": "× calibration",
            "extra": "4078.65ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 108.8911,
            "range": "± 2.8270",
            "unit": "× calibration",
            "extra": "5274.31ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 109.6413,
            "range": "± 2.2964",
            "unit": "× calibration",
            "extra": "5310.65ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 111.0754,
            "range": "± 1.7927",
            "unit": "× calibration",
            "extra": "5380.11ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 116.6602,
            "range": "± 2.6412",
            "unit": "× calibration",
            "extra": "5650.62ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 109.8117,
            "range": "± 2.9661",
            "unit": "× calibration",
            "extra": "5318.90ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 116.9779,
            "range": "± 2.5873",
            "unit": "× calibration",
            "extra": "5666.01ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 113.5252,
            "range": "± 1.8393",
            "unit": "× calibration",
            "extra": "5498.77ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 87.658,
            "range": "± 2.3662",
            "unit": "× calibration",
            "extra": "4245.85ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 85.3095,
            "range": "± 2.3703",
            "unit": "× calibration",
            "extra": "4132.10ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 86.797,
            "range": "± 2.1876",
            "unit": "× calibration",
            "extra": "4204.15ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 86.6529,
            "range": "± 2.2116",
            "unit": "× calibration",
            "extra": "4197.17ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 89.706,
            "range": "± 1.7057",
            "unit": "× calibration",
            "extra": "4345.05ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 102.6828,
            "range": "± 3.1532",
            "unit": "× calibration",
            "extra": "4973.60ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 141.8592,
            "range": "± 10.1574",
            "unit": "× calibration",
            "extra": "6871.17ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 156.7293,
            "range": "± 12.6175",
            "unit": "× calibration",
            "extra": "7591.43ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 119.1016,
            "range": "± 7.7956",
            "unit": "× calibration",
            "extra": "5768.87ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 205.7549,
            "range": "± 1.1770",
            "unit": "× calibration",
            "extra": "9966.06ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5285,
            "range": "± 0.0120",
            "unit": "× calibration",
            "extra": "25.60ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.4934,
            "range": "± 0.0068",
            "unit": "× calibration",
            "extra": "23.90ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 29.4976,
            "range": "± 0.2655",
            "unit": "× calibration",
            "extra": "1428.76ns  calibration: 48.44ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 0.9961,
            "range": "± 0.0260",
            "unit": "× calibration",
            "extra": "48.25ns  calibration: 48.44ns"
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
            "value": 0.6638,
            "range": "± 0.0157",
            "unit": "× calibration",
            "extra": "45.20ns  calibration: 68.09ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3729,
            "range": "± 0.0333",
            "unit": "× calibration",
            "extra": "93.48ns  calibration: 68.09ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3413,
            "range": "± 0.0269",
            "unit": "× calibration",
            "extra": "91.33ns  calibration: 68.09ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3517,
            "range": "± 0.0000",
            "unit": "× calibration",
            "extra": "23.95ns  calibration: 68.09ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1764,
            "range": "± 0.0223",
            "unit": "× calibration",
            "extra": "80.10ns  calibration: 68.09ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.3059,
            "range": "± 0.0288",
            "unit": "× calibration",
            "extra": "88.92ns  calibration: 68.09ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 816.0663,
            "range": "± 6.9174",
            "unit": "× calibration",
            "extra": "55565.45ns  calibration: 68.09ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1103.7333,
            "range": "± 10.2953",
            "unit": "× calibration",
            "extra": "75152.52ns  calibration: 68.09ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 880.5418,
            "range": "± 12.1311",
            "unit": "× calibration",
            "extra": "59955.55ns  calibration: 68.09ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2473.3474,
            "range": "± 27.1188",
            "unit": "× calibration",
            "extra": "168408.70ns  calibration: 68.09ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.3374,
            "range": "± 0.0157",
            "unit": "× calibration",
            "extra": "363.42ns  calibration: 68.09ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.172,
            "range": "± 0.1207",
            "unit": "× calibration",
            "extra": "1373.50ns  calibration: 68.09ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 31.4704,
            "range": "± 0.1237",
            "unit": "× calibration",
            "extra": "2142.80ns  calibration: 68.09ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.2017,
            "range": "± 0.0079",
            "unit": "× calibration",
            "extra": "218.00ns  calibration: 68.09ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.7439,
            "range": "± 0.0517",
            "unit": "× calibration",
            "extra": "391.10ns  calibration: 68.09ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.5585,
            "range": "± 0.0761",
            "unit": "× calibration",
            "extra": "718.92ns  calibration: 68.09ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6168,
            "range": "± 0.0022",
            "unit": "× calibration",
            "extra": "42.00ns  calibration: 68.09ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0004,
            "range": "± 0.0198",
            "unit": "× calibration",
            "extra": "68.12ns  calibration: 68.09ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 31.3883,
            "range": "± 0.2203",
            "unit": "× calibration",
            "extra": "2137.21ns  calibration: 68.09ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 26.747,
            "range": "± 0.1304",
            "unit": "× calibration",
            "extra": "1821.19ns  calibration: 68.09ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.3733,
            "range": "± 0.0239",
            "unit": "× calibration",
            "extra": "93.51ns  calibration: 68.09ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.7652,
            "range": "± 0.0263",
            "unit": "× calibration",
            "extra": "120.19ns  calibration: 68.09ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 114.6327,
            "range": "± 0.8078",
            "unit": "× calibration",
            "extra": "7805.27ns  calibration: 68.09ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.9316,
            "range": "± 0.0216",
            "unit": "× calibration",
            "extra": "131.52ns  calibration: 68.09ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 27.8437,
            "range": "± 0.1251",
            "unit": "× calibration",
            "extra": "1895.86ns  calibration: 68.09ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 155.3225,
            "range": "± 0.2182",
            "unit": "× calibration",
            "extra": "10575.81ns  calibration: 68.09ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9304.4893,
            "range": "± 117.2650",
            "unit": "× calibration",
            "extra": "633536.93ns  calibration: 68.09ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.5064,
            "range": "± 0.0203",
            "unit": "× calibration",
            "extra": "102.57ns  calibration: 68.09ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 52.2394,
            "range": "± 0.3534",
            "unit": "× calibration",
            "extra": "3556.95ns  calibration: 68.09ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 61.1643,
            "range": "± 2.2586",
            "unit": "× calibration",
            "extra": "4164.64ns  calibration: 68.09ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1056,
            "range": "± 0.0217",
            "unit": "× calibration",
            "extra": "143.37ns  calibration: 68.09ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 74.3608,
            "range": "± 0.5885",
            "unit": "× calibration",
            "extra": "5063.18ns  calibration: 68.09ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 85.6664,
            "range": "± 2.0673",
            "unit": "× calibration",
            "extra": "5832.97ns  calibration: 68.09ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.2522,
            "range": "± 0.0169",
            "unit": "× calibration",
            "extra": "153.35ns  calibration: 68.09ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 181.607,
            "range": "± 4.7345",
            "unit": "× calibration",
            "extra": "12365.51ns  calibration: 68.09ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 187.6821,
            "range": "± 3.3976",
            "unit": "× calibration",
            "extra": "12779.16ns  calibration: 68.09ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.5013,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "102.22ns  calibration: 68.09ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 94.2345,
            "range": "± 7.9391",
            "unit": "× calibration",
            "extra": "6416.37ns  calibration: 68.09ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 105.8086,
            "range": "± 7.8948",
            "unit": "× calibration",
            "extra": "7204.44ns  calibration: 68.09ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.6769,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "114.18ns  calibration: 68.09ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 175.6867,
            "range": "± 0.8307",
            "unit": "× calibration",
            "extra": "11962.40ns  calibration: 68.09ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 189.567,
            "range": "± 0.4222",
            "unit": "× calibration",
            "extra": "12907.50ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 70.3409,
            "range": "± 2.2100",
            "unit": "× calibration",
            "extra": "4789.47ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 156.7252,
            "range": "± 1.6155",
            "unit": "× calibration",
            "extra": "10671.32ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 141.1556,
            "range": "± 0.9391",
            "unit": "× calibration",
            "extra": "9611.20ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.7772,
            "range": "± 0.0664",
            "unit": "× calibration",
            "extra": "733.81ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.5768,
            "range": "± 0.0432",
            "unit": "× calibration",
            "extra": "788.26ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 154.1453,
            "range": "± 8.2229",
            "unit": "× calibration",
            "extra": "10495.66ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 262.298,
            "range": "± 4.2591",
            "unit": "× calibration",
            "extra": "17859.71ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 12.624,
            "range": "± 0.0726",
            "unit": "× calibration",
            "extra": "859.56ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 99.4933,
            "range": "± 0.7160",
            "unit": "× calibration",
            "extra": "6774.44ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 162.5177,
            "range": "± 2.0802",
            "unit": "× calibration",
            "extra": "11065.73ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 248.4807,
            "range": "± 1.9565",
            "unit": "× calibration",
            "extra": "16918.90ns  calibration: 68.09ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 12.7043,
            "range": "± 0.0482",
            "unit": "× calibration",
            "extra": "865.03ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 78.4266,
            "range": "± 2.2688",
            "unit": "× calibration",
            "extra": "5340.02ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 80.1937,
            "range": "± 2.7821",
            "unit": "× calibration",
            "extra": "5460.34ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 77.9846,
            "range": "± 2.3211",
            "unit": "× calibration",
            "extra": "5309.92ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 102.7019,
            "range": "± 1.3080",
            "unit": "× calibration",
            "extra": "6992.91ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 105.3201,
            "range": "± 1.7238",
            "unit": "× calibration",
            "extra": "7171.18ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 104.318,
            "range": "± 1.6094",
            "unit": "× calibration",
            "extra": "7102.95ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 111.0617,
            "range": "± 1.4187",
            "unit": "× calibration",
            "extra": "7562.12ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 103.082,
            "range": "± 1.6323",
            "unit": "× calibration",
            "extra": "7018.79ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 112.0949,
            "range": "± 2.4220",
            "unit": "× calibration",
            "extra": "7632.47ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 108.531,
            "range": "± 2.1210",
            "unit": "× calibration",
            "extra": "7389.81ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 79.9354,
            "range": "± 2.1510",
            "unit": "× calibration",
            "extra": "5442.75ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 78.5491,
            "range": "± 1.9118",
            "unit": "× calibration",
            "extra": "5348.36ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 80.3444,
            "range": "± 2.4321",
            "unit": "× calibration",
            "extra": "5470.60ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 80.6615,
            "range": "± 2.1212",
            "unit": "× calibration",
            "extra": "5492.19ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 81.3678,
            "range": "± 1.9480",
            "unit": "× calibration",
            "extra": "5540.28ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 98.0191,
            "range": "± 1.8517",
            "unit": "× calibration",
            "extra": "6674.06ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 140.1051,
            "range": "± 12.8406",
            "unit": "× calibration",
            "extra": "9539.67ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 157.0132,
            "range": "± 13.7369",
            "unit": "× calibration",
            "extra": "10690.93ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 115.5882,
            "range": "± 7.3133",
            "unit": "× calibration",
            "extra": "7870.33ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 198.2971,
            "range": "± 0.7727",
            "unit": "× calibration",
            "extra": "13501.93ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5311,
            "range": "± 0.0022",
            "unit": "× calibration",
            "extra": "36.16ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5037,
            "range": "± 0.0018",
            "unit": "× calibration",
            "extra": "34.30ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 27.1982,
            "range": "± 0.1573",
            "unit": "× calibration",
            "extra": "1851.91ns  calibration: 68.09ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 0.9883,
            "range": "± 0.0191",
            "unit": "× calibration",
            "extra": "67.29ns  calibration: 68.09ns"
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
        "date": 1788542022354,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.7454,
            "range": "± 0.0419",
            "unit": "× calibration",
            "extra": "46.11ns  calibration: 61.86ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4963,
            "range": "± 0.0449",
            "unit": "× calibration",
            "extra": "92.56ns  calibration: 61.86ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.496,
            "range": "± 0.0433",
            "unit": "× calibration",
            "extra": "92.54ns  calibration: 61.86ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.45,
            "range": "± 0.0094",
            "unit": "× calibration",
            "extra": "27.84ns  calibration: 61.86ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2965,
            "range": "± 0.0446",
            "unit": "× calibration",
            "extra": "80.20ns  calibration: 61.86ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.3639,
            "range": "± 0.0533",
            "unit": "× calibration",
            "extra": "84.37ns  calibration: 61.86ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 959.7436,
            "range": "± 30.0679",
            "unit": "× calibration",
            "extra": "59369.81ns  calibration: 61.86ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1257.0053,
            "range": "± 135.6125",
            "unit": "× calibration",
            "extra": "77758.44ns  calibration: 61.86ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 1064.7671,
            "range": "± 27.4895",
            "unit": "× calibration",
            "extra": "65866.57ns  calibration: 61.86ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2290.7454,
            "range": "± 79.9385",
            "unit": "× calibration",
            "extra": "141705.68ns  calibration: 61.86ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.6347,
            "range": "± 0.0923",
            "unit": "× calibration",
            "extra": "348.56ns  calibration: 61.86ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 19.7767,
            "range": "± 0.1772",
            "unit": "× calibration",
            "extra": "1223.39ns  calibration: 61.86ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 30.7297,
            "range": "± 0.3063",
            "unit": "× calibration",
            "extra": "1900.94ns  calibration: 61.86ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.214,
            "range": "± 0.0564",
            "unit": "× calibration",
            "extra": "198.82ns  calibration: 61.86ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.743,
            "range": "± 0.0580",
            "unit": "× calibration",
            "extra": "355.26ns  calibration: 61.86ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.6584,
            "range": "± 0.1615",
            "unit": "× calibration",
            "extra": "721.19ns  calibration: 61.86ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6885,
            "range": "± 0.0259",
            "unit": "× calibration",
            "extra": "42.59ns  calibration: 61.86ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0669,
            "range": "± 0.0702",
            "unit": "× calibration",
            "extra": "66.00ns  calibration: 61.86ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 28.8556,
            "range": "± 0.5658",
            "unit": "× calibration",
            "extra": "1785.01ns  calibration: 61.86ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 25.2879,
            "range": "± 0.2155",
            "unit": "× calibration",
            "extra": "1564.31ns  calibration: 61.86ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5065,
            "range": "± 0.0403",
            "unit": "× calibration",
            "extra": "93.19ns  calibration: 61.86ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.9445,
            "range": "± 0.0478",
            "unit": "× calibration",
            "extra": "120.29ns  calibration: 61.86ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 119.4586,
            "range": "± 1.9803",
            "unit": "× calibration",
            "extra": "7389.72ns  calibration: 61.86ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.2931,
            "range": "± 0.0797",
            "unit": "× calibration",
            "extra": "141.85ns  calibration: 61.86ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 26.4057,
            "range": "± 0.2367",
            "unit": "× calibration",
            "extra": "1633.46ns  calibration: 61.86ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 144.5428,
            "range": "± 0.7549",
            "unit": "× calibration",
            "extra": "8941.43ns  calibration: 61.86ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9307.5393,
            "range": "± 92.2566",
            "unit": "× calibration",
            "extra": "575765.08ns  calibration: 61.86ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.3416,
            "range": "± 0.0302",
            "unit": "× calibration",
            "extra": "82.99ns  calibration: 61.86ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 53.7929,
            "range": "± 0.5960",
            "unit": "× calibration",
            "extra": "3327.63ns  calibration: 61.86ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 62.6866,
            "range": "± 1.9520",
            "unit": "× calibration",
            "extra": "3877.80ns  calibration: 61.86ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1044,
            "range": "± 0.0262",
            "unit": "× calibration",
            "extra": "130.18ns  calibration: 61.86ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 77.7857,
            "range": "± 0.5388",
            "unit": "× calibration",
            "extra": "4811.83ns  calibration: 61.86ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 88.7568,
            "range": "± 2.1613",
            "unit": "× calibration",
            "extra": "5490.50ns  calibration: 61.86ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3194,
            "range": "± 0.0283",
            "unit": "× calibration",
            "extra": "143.48ns  calibration: 61.86ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 179.9413,
            "range": "± 3.7719",
            "unit": "× calibration",
            "extra": "11131.18ns  calibration: 61.86ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 191.2835,
            "range": "± 3.4218",
            "unit": "× calibration",
            "extra": "11832.81ns  calibration: 61.86ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.4214,
            "range": "± 0.0533",
            "unit": "× calibration",
            "extra": "87.93ns  calibration: 61.86ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 95.0348,
            "range": "± 8.3374",
            "unit": "× calibration",
            "extra": "5878.86ns  calibration: 61.86ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 105.0383,
            "range": "± 5.2911",
            "unit": "× calibration",
            "extra": "6497.68ns  calibration: 61.86ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.6009,
            "range": "± 0.0380",
            "unit": "× calibration",
            "extra": "99.03ns  calibration: 61.86ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 173.5979,
            "range": "± 0.7245",
            "unit": "× calibration",
            "extra": "10738.78ns  calibration: 61.86ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 185.0475,
            "range": "± 1.3649",
            "unit": "× calibration",
            "extra": "11447.05ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 70.3384,
            "range": "± 2.5744",
            "unit": "× calibration",
            "extra": "4351.14ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 145.6293,
            "range": "± 2.6026",
            "unit": "× calibration",
            "extra": "9008.64ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 141.0527,
            "range": "± 1.0417",
            "unit": "× calibration",
            "extra": "8725.53ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.4222,
            "range": "± 0.0786",
            "unit": "× calibration",
            "extra": "644.72ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.054,
            "range": "± 0.0684",
            "unit": "× calibration",
            "extra": "683.80ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 146.8325,
            "range": "± 9.1752",
            "unit": "× calibration",
            "extra": "9083.07ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 231.7836,
            "range": "± 4.2273",
            "unit": "× calibration",
            "extra": "14338.15ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 12.4937,
            "range": "± 0.0915",
            "unit": "× calibration",
            "extra": "772.86ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 100.1358,
            "range": "± 0.4567",
            "unit": "× calibration",
            "extra": "6194.41ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 159.9445,
            "range": "± 2.8023",
            "unit": "× calibration",
            "extra": "9894.18ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 238.9279,
            "range": "± 4.3566",
            "unit": "× calibration",
            "extra": "14780.10ns  calibration: 61.86ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 12.418,
            "range": "± 0.1028",
            "unit": "× calibration",
            "extra": "768.18ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 83.7146,
            "range": "± 2.4046",
            "unit": "× calibration",
            "extra": "5178.59ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 84.3166,
            "range": "± 2.0218",
            "unit": "× calibration",
            "extra": "5215.83ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 82.3779,
            "range": "± 1.4596",
            "unit": "× calibration",
            "extra": "5095.90ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 105.3064,
            "range": "± 1.2443",
            "unit": "× calibration",
            "extra": "6514.26ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 107.2621,
            "range": "± 2.1798",
            "unit": "× calibration",
            "extra": "6635.24ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 106.297,
            "range": "± 1.4069",
            "unit": "× calibration",
            "extra": "6575.54ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 113.5482,
            "range": "± 1.1916",
            "unit": "× calibration",
            "extra": "7024.10ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 106.0577,
            "range": "± 1.4610",
            "unit": "× calibration",
            "extra": "6560.74ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 115.9493,
            "range": "± 2.9711",
            "unit": "× calibration",
            "extra": "7172.63ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 110.6929,
            "range": "± 2.6287",
            "unit": "× calibration",
            "extra": "6847.47ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 86.132,
            "range": "± 1.9525",
            "unit": "× calibration",
            "extra": "5328.13ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 83.7395,
            "range": "± 1.9132",
            "unit": "× calibration",
            "extra": "5180.13ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 85.1257,
            "range": "± 2.1081",
            "unit": "× calibration",
            "extra": "5265.88ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 85.8017,
            "range": "± 2.4239",
            "unit": "× calibration",
            "extra": "5307.70ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 87.6467,
            "range": "± 2.2221",
            "unit": "× calibration",
            "extra": "5421.83ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 100.0946,
            "range": "± 1.8406",
            "unit": "× calibration",
            "extra": "6191.86ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 139.7446,
            "range": "± 13.3679",
            "unit": "× calibration",
            "extra": "8644.61ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 157.9592,
            "range": "± 12.1023",
            "unit": "× calibration",
            "extra": "9771.37ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 117.1292,
            "range": "± 9.3115",
            "unit": "× calibration",
            "extra": "7245.62ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 199.0652,
            "range": "± 1.6912",
            "unit": "× calibration",
            "extra": "12314.19ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.6077,
            "range": "± 0.0254",
            "unit": "× calibration",
            "extra": "37.59ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.563,
            "range": "± 0.0165",
            "unit": "× calibration",
            "extra": "34.83ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 25.4248,
            "range": "± 0.1385",
            "unit": "× calibration",
            "extra": "1572.78ns  calibration: 61.86ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.1877,
            "range": "± 0.0957",
            "unit": "× calibration",
            "extra": "73.47ns  calibration: 61.86ns"
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
        "date": 1788542169442,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.6394,
            "range": "± 0.0060",
            "unit": "× calibration",
            "extra": "44.70ns  calibration: 69.91ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3771,
            "range": "± 0.0289",
            "unit": "× calibration",
            "extra": "96.28ns  calibration: 69.91ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3497,
            "range": "± 0.0247",
            "unit": "× calibration",
            "extra": "94.36ns  calibration: 69.91ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3566,
            "range": "± 0.0024",
            "unit": "× calibration",
            "extra": "24.93ns  calibration: 69.91ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2222,
            "range": "± 0.0227",
            "unit": "× calibration",
            "extra": "85.45ns  calibration: 69.91ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2066,
            "range": "± 0.0196",
            "unit": "× calibration",
            "extra": "84.36ns  calibration: 69.91ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 761.866,
            "range": "± 10.1768",
            "unit": "× calibration",
            "extra": "53264.98ns  calibration: 69.91ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1019.6709,
            "range": "± 11.5285",
            "unit": "× calibration",
            "extra": "71289.11ns  calibration: 69.91ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 977.6167,
            "range": "± 10.8133",
            "unit": "× calibration",
            "extra": "68348.94ns  calibration: 69.91ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2197.6125,
            "range": "± 23.9938",
            "unit": "× calibration",
            "extra": "153643.53ns  calibration: 69.91ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.1073,
            "range": "± 0.0175",
            "unit": "× calibration",
            "extra": "357.07ns  calibration: 69.91ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 19.422,
            "range": "± 0.0675",
            "unit": "× calibration",
            "extra": "1357.87ns  calibration: 69.91ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 27.1526,
            "range": "± 0.1103",
            "unit": "× calibration",
            "extra": "1898.34ns  calibration: 69.91ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 2.9308,
            "range": "± 0.0154",
            "unit": "× calibration",
            "extra": "204.90ns  calibration: 69.91ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.5664,
            "range": "± 0.0227",
            "unit": "× calibration",
            "extra": "389.17ns  calibration: 69.91ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.2282,
            "range": "± 0.0277",
            "unit": "× calibration",
            "extra": "715.09ns  calibration: 69.91ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.5903,
            "range": "± 0.0033",
            "unit": "× calibration",
            "extra": "41.27ns  calibration: 69.91ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0762,
            "range": "± 0.0180",
            "unit": "× calibration",
            "extra": "75.24ns  calibration: 69.91ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 30.0926,
            "range": "± 0.2861",
            "unit": "× calibration",
            "extra": "2103.89ns  calibration: 69.91ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 25.9555,
            "range": "± 0.0722",
            "unit": "× calibration",
            "extra": "1814.65ns  calibration: 69.91ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.406,
            "range": "± 0.0190",
            "unit": "× calibration",
            "extra": "98.30ns  calibration: 69.91ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.8258,
            "range": "± 0.0205",
            "unit": "× calibration",
            "extra": "127.65ns  calibration: 69.91ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 112.0778,
            "range": "± 1.7951",
            "unit": "× calibration",
            "extra": "7835.79ns  calibration: 69.91ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.8793,
            "range": "± 0.0190",
            "unit": "× calibration",
            "extra": "131.39ns  calibration: 69.91ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 27.1285,
            "range": "± 0.1649",
            "unit": "× calibration",
            "extra": "1896.66ns  calibration: 69.91ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 152.5432,
            "range": "± 0.3403",
            "unit": "× calibration",
            "extra": "10664.88ns  calibration: 69.91ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9026.7235,
            "range": "± 77.5669",
            "unit": "× calibration",
            "extra": "631092.90ns  calibration: 69.91ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.5641,
            "range": "± 0.0175",
            "unit": "× calibration",
            "extra": "109.35ns  calibration: 69.91ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 48.9843,
            "range": "± 0.2522",
            "unit": "× calibration",
            "extra": "3424.68ns  calibration: 69.91ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 58.8217,
            "range": "± 2.1654",
            "unit": "× calibration",
            "extra": "4112.45ns  calibration: 69.91ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1731,
            "range": "± 0.0154",
            "unit": "× calibration",
            "extra": "151.93ns  calibration: 69.91ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 74.7948,
            "range": "± 1.2972",
            "unit": "× calibration",
            "extra": "5229.19ns  calibration: 69.91ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 83.7539,
            "range": "± 2.0891",
            "unit": "× calibration",
            "extra": "5855.56ns  calibration: 69.91ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.4799,
            "range": "± 0.0149",
            "unit": "× calibration",
            "extra": "173.38ns  calibration: 69.91ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 174.7743,
            "range": "± 5.8323",
            "unit": "× calibration",
            "extra": "12219.14ns  calibration: 69.91ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 195.8672,
            "range": "± 13.1171",
            "unit": "× calibration",
            "extra": "13693.83ns  calibration: 69.91ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.5359,
            "range": "± 0.0169",
            "unit": "× calibration",
            "extra": "107.38ns  calibration: 69.91ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 89.3322,
            "range": "± 8.3048",
            "unit": "× calibration",
            "extra": "6245.56ns  calibration: 69.91ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 98.5826,
            "range": "± 7.3930",
            "unit": "× calibration",
            "extra": "6892.29ns  calibration: 69.91ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.6693,
            "range": "± 0.0166",
            "unit": "× calibration",
            "extra": "116.71ns  calibration: 69.91ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 164.2447,
            "range": "± 0.9533",
            "unit": "× calibration",
            "extra": "11482.98ns  calibration: 69.91ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 176.4011,
            "range": "± 1.0244",
            "unit": "× calibration",
            "extra": "12332.88ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 66.6154,
            "range": "± 1.9122",
            "unit": "× calibration",
            "extra": "4657.34ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 139.2996,
            "range": "± 2.2957",
            "unit": "× calibration",
            "extra": "9738.97ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 135.2054,
            "range": "± 0.9516",
            "unit": "× calibration",
            "extra": "9452.73ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.5134,
            "range": "± 0.0418",
            "unit": "× calibration",
            "extra": "735.03ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.3962,
            "range": "± 0.0408",
            "unit": "× calibration",
            "extra": "796.75ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 145.9315,
            "range": "± 7.9938",
            "unit": "× calibration",
            "extra": "10202.63ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 224.7133,
            "range": "± 4.0049",
            "unit": "× calibration",
            "extra": "15710.57ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 12.6521,
            "range": "± 0.0591",
            "unit": "× calibration",
            "extra": "884.56ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 94.7795,
            "range": "± 0.5424",
            "unit": "× calibration",
            "extra": "6626.40ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 158.452,
            "range": "± 1.9398",
            "unit": "× calibration",
            "extra": "11077.99ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 227.1813,
            "range": "± 1.3750",
            "unit": "× calibration",
            "extra": "15883.12ns  calibration: 69.91ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 12.6676,
            "range": "± 0.0658",
            "unit": "× calibration",
            "extra": "885.64ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 75.8076,
            "range": "± 2.3592",
            "unit": "× calibration",
            "extra": "5300.00ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 76.5291,
            "range": "± 1.8979",
            "unit": "× calibration",
            "extra": "5350.44ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 75.8731,
            "range": "± 2.7345",
            "unit": "× calibration",
            "extra": "5304.58ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 97.5956,
            "range": "± 1.0822",
            "unit": "× calibration",
            "extra": "6823.28ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 98.8008,
            "range": "± 1.0901",
            "unit": "× calibration",
            "extra": "6907.54ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 99.2798,
            "range": "± 1.0104",
            "unit": "× calibration",
            "extra": "6941.03ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 104.4343,
            "range": "± 0.8367",
            "unit": "× calibration",
            "extra": "7301.40ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 97.9341,
            "range": "± 1.0387",
            "unit": "× calibration",
            "extra": "6846.95ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 107.5695,
            "range": "± 3.6216",
            "unit": "× calibration",
            "extra": "7520.60ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 104.0592,
            "range": "± 1.7187",
            "unit": "× calibration",
            "extra": "7275.18ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 78.4473,
            "range": "± 1.9165",
            "unit": "× calibration",
            "extra": "5484.55ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 77.7843,
            "range": "± 2.4878",
            "unit": "× calibration",
            "extra": "5438.20ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 78.9286,
            "range": "± 2.0471",
            "unit": "× calibration",
            "extra": "5518.20ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 78.6256,
            "range": "± 2.1188",
            "unit": "× calibration",
            "extra": "5497.02ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 80.0183,
            "range": "± 2.0424",
            "unit": "× calibration",
            "extra": "5594.39ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 97.4608,
            "range": "± 1.9667",
            "unit": "× calibration",
            "extra": "6813.86ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 135.6218,
            "range": "± 13.5308",
            "unit": "× calibration",
            "extra": "9481.84ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 147.9179,
            "range": "± 15.9674",
            "unit": "× calibration",
            "extra": "10341.51ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 111.6297,
            "range": "± 8.5068",
            "unit": "× calibration",
            "extra": "7804.46ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 190.5257,
            "range": "± 2.1371",
            "unit": "× calibration",
            "extra": "13320.38ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5101,
            "range": "± 0.0030",
            "unit": "× calibration",
            "extra": "35.66ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.492,
            "range": "± 0.0029",
            "unit": "× calibration",
            "extra": "34.40ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 26.4496,
            "range": "± 0.1529",
            "unit": "× calibration",
            "extra": "1849.19ns  calibration: 69.91ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0645,
            "range": "± 0.0180",
            "unit": "× calibration",
            "extra": "74.42ns  calibration: 69.91ns"
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
        "date": 1788542399871,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.653,
            "range": "± 0.0061",
            "unit": "× calibration",
            "extra": "43.66ns  calibration: 66.86ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.358,
            "range": "± 0.0253",
            "unit": "× calibration",
            "extra": "90.80ns  calibration: 66.86ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3375,
            "range": "± 0.0202",
            "unit": "× calibration",
            "extra": "89.43ns  calibration: 66.86ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3516,
            "range": "± 0.0022",
            "unit": "× calibration",
            "extra": "23.51ns  calibration: 66.86ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1748,
            "range": "± 0.0170",
            "unit": "× calibration",
            "extra": "78.55ns  calibration: 66.86ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2629,
            "range": "± 0.0202",
            "unit": "× calibration",
            "extra": "84.44ns  calibration: 66.86ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 791.5991,
            "range": "± 5.7729",
            "unit": "× calibration",
            "extra": "52929.42ns  calibration: 66.86ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1116.92,
            "range": "± 10.9401",
            "unit": "× calibration",
            "extra": "74681.65ns  calibration: 66.86ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 899.5403,
            "range": "± 18.7246",
            "unit": "× calibration",
            "extra": "60146.79ns  calibration: 66.86ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2710.1634,
            "range": "± 19.7042",
            "unit": "× calibration",
            "extra": "181212.15ns  calibration: 66.86ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.6394,
            "range": "± 0.0211",
            "unit": "× calibration",
            "extra": "377.07ns  calibration: 66.86ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 22.8573,
            "range": "± 1.8668",
            "unit": "× calibration",
            "extra": "1528.33ns  calibration: 66.86ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 31.9096,
            "range": "± 0.4237",
            "unit": "× calibration",
            "extra": "2133.60ns  calibration: 66.86ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.0863,
            "range": "± 0.0049",
            "unit": "× calibration",
            "extra": "206.36ns  calibration: 66.86ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.6643,
            "range": "± 0.0205",
            "unit": "× calibration",
            "extra": "378.74ns  calibration: 66.86ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.5361,
            "range": "± 0.0522",
            "unit": "× calibration",
            "extra": "771.35ns  calibration: 66.86ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6308,
            "range": "± 0.0051",
            "unit": "× calibration",
            "extra": "42.18ns  calibration: 66.86ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0061,
            "range": "± 0.0182",
            "unit": "× calibration",
            "extra": "67.27ns  calibration: 66.86ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 31.7168,
            "range": "± 0.2960",
            "unit": "× calibration",
            "extra": "2120.71ns  calibration: 66.86ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 30.5193,
            "range": "± 0.2559",
            "unit": "× calibration",
            "extra": "2040.64ns  calibration: 66.86ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.3719,
            "range": "± 0.0162",
            "unit": "× calibration",
            "extra": "91.73ns  calibration: 66.86ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.7657,
            "range": "± 0.0193",
            "unit": "× calibration",
            "extra": "118.06ns  calibration: 66.86ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 131.3013,
            "range": "± 1.1292",
            "unit": "× calibration",
            "extra": "8779.32ns  calibration: 66.86ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.0992,
            "range": "± 0.0253",
            "unit": "× calibration",
            "extra": "140.36ns  calibration: 66.86ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 30.1213,
            "range": "± 0.2634",
            "unit": "× calibration",
            "extra": "2014.03ns  calibration: 66.86ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 177.7965,
            "range": "± 14.9013",
            "unit": "× calibration",
            "extra": "11888.17ns  calibration: 66.86ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 10567.3135,
            "range": "± 104.2042",
            "unit": "× calibration",
            "extra": "706572.02ns  calibration: 66.86ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.5315,
            "range": "± 0.0184",
            "unit": "× calibration",
            "extra": "102.40ns  calibration: 66.86ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 53.3379,
            "range": "± 0.3293",
            "unit": "× calibration",
            "extra": "3566.38ns  calibration: 66.86ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 62.3683,
            "range": "± 2.4508",
            "unit": "× calibration",
            "extra": "4170.19ns  calibration: 66.86ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1394,
            "range": "± 0.0217",
            "unit": "× calibration",
            "extra": "143.05ns  calibration: 66.86ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 76.3463,
            "range": "± 0.3229",
            "unit": "× calibration",
            "extra": "5104.81ns  calibration: 66.86ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 86.9101,
            "range": "± 2.3181",
            "unit": "× calibration",
            "extra": "5811.15ns  calibration: 66.86ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3045,
            "range": "± 0.0181",
            "unit": "× calibration",
            "extra": "154.09ns  calibration: 66.86ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 177.5129,
            "range": "± 2.1010",
            "unit": "× calibration",
            "extra": "11869.21ns  calibration: 66.86ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 188.649,
            "range": "± 1.5336",
            "unit": "× calibration",
            "extra": "12613.81ns  calibration: 66.86ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.5864,
            "range": "± 0.0199",
            "unit": "× calibration",
            "extra": "106.07ns  calibration: 66.86ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 95.4899,
            "range": "± 7.8073",
            "unit": "× calibration",
            "extra": "6384.83ns  calibration: 66.86ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 106.589,
            "range": "± 6.8198",
            "unit": "× calibration",
            "extra": "7126.96ns  calibration: 66.86ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.7661,
            "range": "± 0.0190",
            "unit": "× calibration",
            "extra": "118.09ns  calibration: 66.86ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 179.1756,
            "range": "± 0.4155",
            "unit": "× calibration",
            "extra": "11980.38ns  calibration: 66.86ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 189.9358,
            "range": "± 0.6978",
            "unit": "× calibration",
            "extra": "12699.85ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 70.1522,
            "range": "± 2.3940",
            "unit": "× calibration",
            "extra": "4690.65ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 156.6184,
            "range": "± 2.2434",
            "unit": "× calibration",
            "extra": "10472.12ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 144.1152,
            "range": "± 0.9673",
            "unit": "× calibration",
            "extra": "9636.11ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.825,
            "range": "± 0.0468",
            "unit": "× calibration",
            "extra": "723.80ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.5665,
            "range": "± 0.0441",
            "unit": "× calibration",
            "extra": "773.38ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 158.6332,
            "range": "± 10.7527",
            "unit": "× calibration",
            "extra": "10606.84ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 254.9019,
            "range": "± 3.2155",
            "unit": "× calibration",
            "extra": "17043.74ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 13.3018,
            "range": "± 0.0751",
            "unit": "× calibration",
            "extra": "889.41ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 105.5782,
            "range": "± 6.9638",
            "unit": "× calibration",
            "extra": "7059.37ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 165.0241,
            "range": "± 1.1214",
            "unit": "× calibration",
            "extra": "11034.16ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 252.3745,
            "range": "± 2.7743",
            "unit": "× calibration",
            "extra": "16874.75ns  calibration: 66.86ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 13.1646,
            "range": "± 0.0852",
            "unit": "× calibration",
            "extra": "880.24ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 78.3659,
            "range": "± 1.6857",
            "unit": "× calibration",
            "extra": "5239.85ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 79.8644,
            "range": "± 1.7634",
            "unit": "× calibration",
            "extra": "5340.05ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 78.6325,
            "range": "± 2.1224",
            "unit": "× calibration",
            "extra": "5257.68ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 103.8303,
            "range": "± 1.9867",
            "unit": "× calibration",
            "extra": "6942.50ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 104.7469,
            "range": "± 1.4885",
            "unit": "× calibration",
            "extra": "7003.79ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 104.8751,
            "range": "± 1.5675",
            "unit": "× calibration",
            "extra": "7012.36ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 113.1175,
            "range": "± 1.7060",
            "unit": "× calibration",
            "extra": "7563.48ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 105.0836,
            "range": "± 1.6478",
            "unit": "× calibration",
            "extra": "7026.30ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 111.5403,
            "range": "± 2.0727",
            "unit": "× calibration",
            "extra": "7458.02ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 109.443,
            "range": "± 2.0889",
            "unit": "× calibration",
            "extra": "7317.79ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 80.2611,
            "range": "± 1.8433",
            "unit": "× calibration",
            "extra": "5366.57ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 80.6667,
            "range": "± 2.5712",
            "unit": "× calibration",
            "extra": "5393.69ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 80.4338,
            "range": "± 1.5796",
            "unit": "× calibration",
            "extra": "5378.12ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 81.4052,
            "range": "± 2.5389",
            "unit": "× calibration",
            "extra": "5443.07ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 81.863,
            "range": "± 2.3201",
            "unit": "× calibration",
            "extra": "5473.68ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 99.0187,
            "range": "± 1.5579",
            "unit": "× calibration",
            "extra": "6620.78ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 141.1956,
            "range": "± 12.5319",
            "unit": "× calibration",
            "extra": "9440.89ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 155.3672,
            "range": "± 14.9827",
            "unit": "× calibration",
            "extra": "10388.46ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 118.0608,
            "range": "± 9.5950",
            "unit": "× calibration",
            "extra": "7894.01ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 203.1103,
            "range": "± 0.9624",
            "unit": "× calibration",
            "extra": "13580.75ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5399,
            "range": "± 0.0018",
            "unit": "× calibration",
            "extra": "36.10ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5163,
            "range": "± 0.0015",
            "unit": "× calibration",
            "extra": "34.52ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 30.0276,
            "range": "± 0.1442",
            "unit": "× calibration",
            "extra": "2007.76ns  calibration: 66.86ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0095,
            "range": "± 0.0184",
            "unit": "× calibration",
            "extra": "67.50ns  calibration: 66.86ns"
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
        "date": 1788542981436,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.7098,
            "range": "± 0.0040",
            "unit": "× calibration",
            "extra": "44.33ns  calibration: 62.45ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.5057,
            "range": "± 0.0351",
            "unit": "× calibration",
            "extra": "94.03ns  calibration: 62.45ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4845,
            "range": "± 0.0285",
            "unit": "× calibration",
            "extra": "92.71ns  calibration: 62.45ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3928,
            "range": "± 0.0027",
            "unit": "× calibration",
            "extra": "24.53ns  calibration: 62.45ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.252,
            "range": "± 0.0208",
            "unit": "× calibration",
            "extra": "78.19ns  calibration: 62.45ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.3495,
            "range": "± 0.0224",
            "unit": "× calibration",
            "extra": "84.28ns  calibration: 62.45ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 839.5725,
            "range": "± 8.8229",
            "unit": "× calibration",
            "extra": "52432.32ns  calibration: 62.45ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1103.5213,
            "range": "± 9.5354",
            "unit": "× calibration",
            "extra": "68916.24ns  calibration: 62.45ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 912.1654,
            "range": "± 9.2232",
            "unit": "× calibration",
            "extra": "56965.83ns  calibration: 62.45ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2388.3765,
            "range": "± 25.3398",
            "unit": "× calibration",
            "extra": "149157.00ns  calibration: 62.45ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.6865,
            "range": "± 0.0205",
            "unit": "× calibration",
            "extra": "355.13ns  calibration: 62.45ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.6547,
            "range": "± 0.0756",
            "unit": "× calibration",
            "extra": "1352.36ns  calibration: 62.45ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 30.0872,
            "range": "± 0.0781",
            "unit": "× calibration",
            "extra": "1878.98ns  calibration: 62.45ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.2778,
            "range": "± 0.0187",
            "unit": "× calibration",
            "extra": "204.70ns  calibration: 62.45ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.2928,
            "range": "± 0.0307",
            "unit": "× calibration",
            "extra": "392.99ns  calibration: 62.45ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.0339,
            "range": "± 0.0327",
            "unit": "× calibration",
            "extra": "689.08ns  calibration: 62.45ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6599,
            "range": "± 0.0034",
            "unit": "× calibration",
            "extra": "41.21ns  calibration: 62.45ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.1111,
            "range": "± 0.0203",
            "unit": "× calibration",
            "extra": "69.39ns  calibration: 62.45ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 33.1761,
            "range": "± 0.3203",
            "unit": "× calibration",
            "extra": "2071.89ns  calibration: 62.45ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 27.8413,
            "range": "± 0.0974",
            "unit": "× calibration",
            "extra": "1738.72ns  calibration: 62.45ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.6395,
            "range": "± 0.0215",
            "unit": "× calibration",
            "extra": "102.39ns  calibration: 62.45ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 2.0128,
            "range": "± 0.0263",
            "unit": "× calibration",
            "extra": "125.70ns  calibration: 62.45ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 124.9331,
            "range": "± 1.7694",
            "unit": "× calibration",
            "extra": "7802.22ns  calibration: 62.45ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.9755,
            "range": "± 0.0207",
            "unit": "× calibration",
            "extra": "123.37ns  calibration: 62.45ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 28.6793,
            "range": "± 0.1212",
            "unit": "× calibration",
            "extra": "1791.06ns  calibration: 62.45ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 161.5099,
            "range": "± 0.5742",
            "unit": "× calibration",
            "extra": "10086.49ns  calibration: 62.45ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9965.9937,
            "range": "± 87.4843",
            "unit": "× calibration",
            "extra": "622388.35ns  calibration: 62.45ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.4088,
            "range": "± 0.0184",
            "unit": "× calibration",
            "extra": "87.98ns  calibration: 62.45ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 54.7839,
            "range": "± 0.3556",
            "unit": "× calibration",
            "extra": "3421.32ns  calibration: 62.45ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 66.3577,
            "range": "± 3.1016",
            "unit": "× calibration",
            "extra": "4144.12ns  calibration: 62.45ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1332,
            "range": "± 0.0194",
            "unit": "× calibration",
            "extra": "133.22ns  calibration: 62.45ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 81.5999,
            "range": "± 0.4158",
            "unit": "× calibration",
            "extra": "5096.01ns  calibration: 62.45ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 93.0832,
            "range": "± 2.5526",
            "unit": "× calibration",
            "extra": "5813.16ns  calibration: 62.45ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3606,
            "range": "± 0.0165",
            "unit": "× calibration",
            "extra": "147.42ns  calibration: 62.45ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 193.6376,
            "range": "± 6.5728",
            "unit": "× calibration",
            "extra": "12092.90ns  calibration: 62.45ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 199.4322,
            "range": "± 2.3915",
            "unit": "× calibration",
            "extra": "12454.78ns  calibration: 62.45ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.4682,
            "range": "± 0.0203",
            "unit": "× calibration",
            "extra": "91.69ns  calibration: 62.45ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 98.7926,
            "range": "± 8.8732",
            "unit": "× calibration",
            "extra": "6169.72ns  calibration: 62.45ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 110.1138,
            "range": "± 8.9050",
            "unit": "× calibration",
            "extra": "6876.74ns  calibration: 62.45ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.5639,
            "range": "± 0.0191",
            "unit": "× calibration",
            "extra": "97.67ns  calibration: 62.45ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 182.4205,
            "range": "± 0.2685",
            "unit": "× calibration",
            "extra": "11392.38ns  calibration: 62.45ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 196.2082,
            "range": "± 1.1026",
            "unit": "× calibration",
            "extra": "12253.44ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 75.4562,
            "range": "± 2.2815",
            "unit": "× calibration",
            "extra": "4712.33ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 154.2233,
            "range": "± 2.3298",
            "unit": "× calibration",
            "extra": "9631.43ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 147.7337,
            "range": "± 1.4360",
            "unit": "× calibration",
            "extra": "9226.15ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.3574,
            "range": "± 0.0309",
            "unit": "× calibration",
            "extra": "646.83ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.2124,
            "range": "± 0.0357",
            "unit": "× calibration",
            "extra": "700.23ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 160.2983,
            "range": "± 7.6111",
            "unit": "× calibration",
            "extra": "10010.82ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 252.8249,
            "range": "± 4.0111",
            "unit": "× calibration",
            "extra": "15789.22ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 12.5277,
            "range": "± 0.0389",
            "unit": "× calibration",
            "extra": "782.37ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 107.653,
            "range": "± 0.7348",
            "unit": "× calibration",
            "extra": "6723.06ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 173.0745,
            "range": "± 3.4132",
            "unit": "× calibration",
            "extra": "10808.71ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 253.4076,
            "range": "± 3.7629",
            "unit": "× calibration",
            "extra": "15825.61ns  calibration: 62.45ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 12.5527,
            "range": "± 0.0388",
            "unit": "× calibration",
            "extra": "783.93ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 85.0847,
            "range": "± 2.5610",
            "unit": "× calibration",
            "extra": "5313.64ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 87.1405,
            "range": "± 3.2283",
            "unit": "× calibration",
            "extra": "5442.03ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 84.1945,
            "range": "± 2.7244",
            "unit": "× calibration",
            "extra": "5258.05ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 108.8962,
            "range": "± 1.1868",
            "unit": "× calibration",
            "extra": "6800.70ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 110.8385,
            "range": "± 1.4203",
            "unit": "× calibration",
            "extra": "6922.00ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 110.4653,
            "range": "± 1.2885",
            "unit": "× calibration",
            "extra": "6898.69ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 117.6121,
            "range": "± 1.3956",
            "unit": "× calibration",
            "extra": "7345.02ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 110.7128,
            "range": "± 1.7260",
            "unit": "× calibration",
            "extra": "6914.15ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 118.7258,
            "range": "± 2.2675",
            "unit": "× calibration",
            "extra": "7414.57ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 114.8266,
            "range": "± 1.6602",
            "unit": "× calibration",
            "extra": "7171.06ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 88.3557,
            "range": "± 2.8112",
            "unit": "× calibration",
            "extra": "5517.92ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 87.9128,
            "range": "± 3.0536",
            "unit": "× calibration",
            "extra": "5490.26ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 88.1458,
            "range": "± 1.9005",
            "unit": "× calibration",
            "extra": "5504.81ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 88.331,
            "range": "± 2.2289",
            "unit": "× calibration",
            "extra": "5516.38ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 89.1904,
            "range": "± 2.1960",
            "unit": "× calibration",
            "extra": "5570.05ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 104.7788,
            "range": "± 2.5918",
            "unit": "× calibration",
            "extra": "6543.56ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 152.6393,
            "range": "± 11.7368",
            "unit": "× calibration",
            "extra": "9532.51ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 164.9275,
            "range": "± 14.7787",
            "unit": "× calibration",
            "extra": "10299.92ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 122.744,
            "range": "± 7.9172",
            "unit": "× calibration",
            "extra": "7665.51ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 211.1062,
            "range": "± 0.8144",
            "unit": "× calibration",
            "extra": "13183.84ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5672,
            "range": "± 0.0027",
            "unit": "× calibration",
            "extra": "35.42ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5497,
            "range": "± 0.0024",
            "unit": "× calibration",
            "extra": "34.33ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 28.1985,
            "range": "± 0.1062",
            "unit": "× calibration",
            "extra": "1761.03ns  calibration: 62.45ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.1226,
            "range": "± 0.0200",
            "unit": "× calibration",
            "extra": "70.11ns  calibration: 62.45ns"
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
          "id": "a2fcefc47ff4ff50c7d73edd22154dd7da46f426",
          "message": "[89] unsound match of optional or unquantified group followed by backref to itself (#92)\n\n* fix for immediately-following backreference of optional group\n* toMatchPartially update\n* split compilePartial\n* cache regex in the KMP\n* update CONTRIBUTING with Node 24.12+ requirement",
          "timestamp": "2026-09-05T21:21:26+01:00",
          "tree_id": "2b3286fd8e6a3939c416f0b2248065cbb07b071b",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/a2fcefc47ff4ff50c7d73edd22154dd7da46f426"
        },
        "date": 1788639764865,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.6428,
            "range": "± 0.0058",
            "unit": "× calibration",
            "extra": "42.43ns  calibration: 66.01ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3487,
            "range": "± 0.0259",
            "unit": "× calibration",
            "extra": "89.02ns  calibration: 66.01ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3563,
            "range": "± 0.0221",
            "unit": "× calibration",
            "extra": "89.52ns  calibration: 66.01ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3648,
            "range": "± 0.0000",
            "unit": "× calibration",
            "extra": "24.08ns  calibration: 66.01ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2369,
            "range": "± 0.0214",
            "unit": "× calibration",
            "extra": "81.64ns  calibration: 66.01ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2272,
            "range": "± 0.0197",
            "unit": "× calibration",
            "extra": "81.00ns  calibration: 66.01ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 857.7918,
            "range": "± 7.5903",
            "unit": "× calibration",
            "extra": "56618.89ns  calibration: 66.01ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1158.3995,
            "range": "± 14.4988",
            "unit": "× calibration",
            "extra": "76460.62ns  calibration: 66.01ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 893.0021,
            "range": "± 11.2339",
            "unit": "× calibration",
            "extra": "58942.96ns  calibration: 66.01ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2403.3362,
            "range": "± 36.1334",
            "unit": "× calibration",
            "extra": "158633.16ns  calibration: 66.01ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.6412,
            "range": "± 0.0379",
            "unit": "× calibration",
            "extra": "372.35ns  calibration: 66.01ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.171,
            "range": "± 0.0911",
            "unit": "× calibration",
            "extra": "1397.40ns  calibration: 66.01ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 29.9519,
            "range": "± 0.1053",
            "unit": "× calibration",
            "extra": "1976.99ns  calibration: 66.01ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.1244,
            "range": "± 0.0065",
            "unit": "× calibration",
            "extra": "206.23ns  calibration: 66.01ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.7364,
            "range": "± 0.0758",
            "unit": "× calibration",
            "extra": "444.64ns  calibration: 66.01ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.8384,
            "range": "± 0.0756",
            "unit": "× calibration",
            "extra": "715.39ns  calibration: 66.01ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6272,
            "range": "± 0.0061",
            "unit": "× calibration",
            "extra": "41.40ns  calibration: 66.01ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.014,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "66.93ns  calibration: 66.01ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 51.5923,
            "range": "± 0.4545",
            "unit": "× calibration",
            "extra": "3405.37ns  calibration: 66.01ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 47.3631,
            "range": "± 0.2830",
            "unit": "× calibration",
            "extra": "3126.22ns  calibration: 66.01ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.3882,
            "range": "± 0.0195",
            "unit": "× calibration",
            "extra": "91.63ns  calibration: 66.01ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.8129,
            "range": "± 0.0203",
            "unit": "× calibration",
            "extra": "119.66ns  calibration: 66.01ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 172.4662,
            "range": "± 1.7423",
            "unit": "× calibration",
            "extra": "11383.70ns  calibration: 66.01ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.9677,
            "range": "± 0.0282",
            "unit": "× calibration",
            "extra": "129.88ns  calibration: 66.01ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 45.7047,
            "range": "± 0.2447",
            "unit": "× calibration",
            "extra": "3016.76ns  calibration: 66.01ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 280.398,
            "range": "± 0.2824",
            "unit": "× calibration",
            "extra": "18507.78ns  calibration: 66.01ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 12866.4887,
            "range": "± 67.1612",
            "unit": "× calibration",
            "extra": "849257.69ns  calibration: 66.01ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.5556,
            "range": "± 0.0201",
            "unit": "× calibration",
            "extra": "102.68ns  calibration: 66.01ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 53.3132,
            "range": "± 0.2682",
            "unit": "× calibration",
            "extra": "3518.96ns  calibration: 66.01ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 67.2259,
            "range": "± 2.4250",
            "unit": "× calibration",
            "extra": "4437.27ns  calibration: 66.01ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1668,
            "range": "± 0.0245",
            "unit": "× calibration",
            "extra": "143.02ns  calibration: 66.01ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 76.3701,
            "range": "± 0.3824",
            "unit": "× calibration",
            "extra": "5040.84ns  calibration: 66.01ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 93.2322,
            "range": "± 2.7690",
            "unit": "× calibration",
            "extra": "6153.83ns  calibration: 66.01ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3597,
            "range": "± 0.0223",
            "unit": "× calibration",
            "extra": "155.75ns  calibration: 66.01ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 190.7386,
            "range": "± 5.3141",
            "unit": "× calibration",
            "extra": "12589.78ns  calibration: 66.01ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 206.4313,
            "range": "± 3.5555",
            "unit": "× calibration",
            "extra": "13625.58ns  calibration: 66.01ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.5502,
            "range": "± 0.0200",
            "unit": "× calibration",
            "extra": "102.32ns  calibration: 66.01ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 94.1518,
            "range": "± 6.7169",
            "unit": "× calibration",
            "extra": "6214.53ns  calibration: 66.01ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 110.3517,
            "range": "± 7.3727",
            "unit": "× calibration",
            "extra": "7283.81ns  calibration: 66.01ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.7205,
            "range": "± 0.0197",
            "unit": "× calibration",
            "extra": "113.56ns  calibration: 66.01ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 178.7557,
            "range": "± 0.3709",
            "unit": "× calibration",
            "extra": "11798.84ns  calibration: 66.01ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 200.1233,
            "range": "± 2.1415",
            "unit": "× calibration",
            "extra": "13209.22ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 75.4843,
            "range": "± 2.2939",
            "unit": "× calibration",
            "extra": "4982.37ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 162.3582,
            "range": "± 1.8256",
            "unit": "× calibration",
            "extra": "10716.52ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 150.4372,
            "range": "± 1.4622",
            "unit": "× calibration",
            "extra": "9929.67ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.7838,
            "range": "± 0.0214",
            "unit": "× calibration",
            "extra": "711.79ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.4885,
            "range": "± 0.0429",
            "unit": "× calibration",
            "extra": "758.30ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 193.213,
            "range": "± 1.3590",
            "unit": "× calibration",
            "extra": "12753.10ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 318.9521,
            "range": "± 3.1134",
            "unit": "× calibration",
            "extra": "21052.56ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 14.9809,
            "range": "± 0.0323",
            "unit": "× calibration",
            "extra": "988.82ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 137.8595,
            "range": "± 0.2557",
            "unit": "× calibration",
            "extra": "9099.47ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 171.7538,
            "range": "± 1.9953",
            "unit": "× calibration",
            "extra": "11336.68ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 260.213,
            "range": "± 6.7157",
            "unit": "× calibration",
            "extra": "17175.46ns  calibration: 66.01ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 13.077,
            "range": "± 0.0424",
            "unit": "× calibration",
            "extra": "863.15ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 83.901,
            "range": "± 2.1113",
            "unit": "× calibration",
            "extra": "5537.92ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 85.1518,
            "range": "± 2.3672",
            "unit": "× calibration",
            "extra": "5620.48ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 83.7971,
            "range": "± 2.4425",
            "unit": "× calibration",
            "extra": "5531.06ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 108.3514,
            "range": "± 1.4141",
            "unit": "× calibration",
            "extra": "7151.78ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 110.7965,
            "range": "± 1.5917",
            "unit": "× calibration",
            "extra": "7313.17ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 110.9009,
            "range": "± 1.6480",
            "unit": "× calibration",
            "extra": "7320.06ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 117.8193,
            "range": "± 0.6053",
            "unit": "× calibration",
            "extra": "7776.71ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 109.9245,
            "range": "± 1.6929",
            "unit": "× calibration",
            "extra": "7255.61ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 116.6761,
            "range": "± 2.2853",
            "unit": "× calibration",
            "extra": "7701.25ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 114.246,
            "range": "± 2.2883",
            "unit": "× calibration",
            "extra": "7540.85ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 86.471,
            "range": "± 2.4996",
            "unit": "× calibration",
            "extra": "5707.55ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 84.4411,
            "range": "± 1.9206",
            "unit": "× calibration",
            "extra": "5573.57ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 86.592,
            "range": "± 2.7171",
            "unit": "× calibration",
            "extra": "5715.54ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 86.0821,
            "range": "± 1.9686",
            "unit": "× calibration",
            "extra": "5681.88ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 87.3403,
            "range": "± 1.8352",
            "unit": "× calibration",
            "extra": "5764.93ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 104.8136,
            "range": "± 0.6546",
            "unit": "× calibration",
            "extra": "6918.26ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 160.1013,
            "range": "± 11.5442",
            "unit": "× calibration",
            "extra": "10567.55ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 169.5639,
            "range": "± 15.1932",
            "unit": "× calibration",
            "extra": "11192.13ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 121.0281,
            "range": "± 6.9799",
            "unit": "× calibration",
            "extra": "7988.51ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 211.1085,
            "range": "± 1.1664",
            "unit": "× calibration",
            "extra": "13934.30ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5568,
            "range": "± 0.0026",
            "unit": "× calibration",
            "extra": "36.75ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5401,
            "range": "± 0.0023",
            "unit": "× calibration",
            "extra": "35.65ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 47.6747,
            "range": "± 0.2524",
            "unit": "× calibration",
            "extra": "3146.79ns  calibration: 66.01ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0248,
            "range": "± 0.0200",
            "unit": "× calibration",
            "extra": "67.64ns  calibration: 66.01ns"
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
          "id": "a2fcefc47ff4ff50c7d73edd22154dd7da46f426",
          "message": "[89] unsound match of optional or unquantified group followed by backref to itself (#92)\n\n* fix for immediately-following backreference of optional group\n* toMatchPartially update\n* split compilePartial\n* cache regex in the KMP\n* update CONTRIBUTING with Node 24.12+ requirement",
          "timestamp": "2026-09-05T21:21:26+01:00",
          "tree_id": "2b3286fd8e6a3939c416f0b2248065cbb07b071b",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/a2fcefc47ff4ff50c7d73edd22154dd7da46f426"
        },
        "date": 1788640311288,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.7055,
            "range": "± 0.0122",
            "unit": "× calibration",
            "extra": "35.99ns  calibration: 51.01ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4322,
            "range": "± 0.0349",
            "unit": "× calibration",
            "extra": "73.06ns  calibration: 51.01ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4537,
            "range": "± 0.0294",
            "unit": "× calibration",
            "extra": "74.16ns  calibration: 51.01ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3803,
            "range": "± 0.0025",
            "unit": "× calibration",
            "extra": "19.40ns  calibration: 51.01ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2183,
            "range": "± 0.0198",
            "unit": "× calibration",
            "extra": "62.15ns  calibration: 51.01ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2994,
            "range": "± 0.0247",
            "unit": "× calibration",
            "extra": "66.29ns  calibration: 51.01ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 782.9743,
            "range": "± 4.4695",
            "unit": "× calibration",
            "extra": "39942.72ns  calibration: 51.01ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1043.7339,
            "range": "± 9.6150",
            "unit": "× calibration",
            "extra": "53245.13ns  calibration: 51.01ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 875.8538,
            "range": "± 3.6186",
            "unit": "× calibration",
            "extra": "44680.88ns  calibration: 51.01ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2195.8157,
            "range": "± 14.5254",
            "unit": "× calibration",
            "extra": "112017.53ns  calibration: 51.01ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.4212,
            "range": "± 0.0161",
            "unit": "× calibration",
            "extra": "276.56ns  calibration: 51.01ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.5202,
            "range": "± 0.0812",
            "unit": "× calibration",
            "extra": "1046.82ns  calibration: 51.01ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 28.5488,
            "range": "± 0.1204",
            "unit": "× calibration",
            "extra": "1456.39ns  calibration: 51.01ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.1162,
            "range": "± 0.0159",
            "unit": "× calibration",
            "extra": "158.97ns  calibration: 51.01ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.8674,
            "range": "± 0.0208",
            "unit": "× calibration",
            "extra": "299.32ns  calibration: 51.01ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.5771,
            "range": "± 0.0518",
            "unit": "× calibration",
            "extra": "539.58ns  calibration: 51.01ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6377,
            "range": "± 0.0027",
            "unit": "× calibration",
            "extra": "32.53ns  calibration: 51.01ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.056,
            "range": "± 0.0145",
            "unit": "× calibration",
            "extra": "53.87ns  calibration: 51.01ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 52.1015,
            "range": "± 0.8919",
            "unit": "× calibration",
            "extra": "2657.91ns  calibration: 51.01ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 48.4915,
            "range": "± 0.2835",
            "unit": "× calibration",
            "extra": "2473.75ns  calibration: 51.01ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.4943,
            "range": "± 0.0196",
            "unit": "× calibration",
            "extra": "76.23ns  calibration: 51.01ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.8965,
            "range": "± 0.0204",
            "unit": "× calibration",
            "extra": "96.75ns  calibration: 51.01ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 177.4579,
            "range": "± 3.2344",
            "unit": "× calibration",
            "extra": "9052.85ns  calibration: 51.01ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.8973,
            "range": "± 0.0347",
            "unit": "× calibration",
            "extra": "96.79ns  calibration: 51.01ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 47.6958,
            "range": "± 0.2670",
            "unit": "× calibration",
            "extra": "2433.16ns  calibration: 51.01ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 287.7907,
            "range": "± 1.2900",
            "unit": "× calibration",
            "extra": "14681.38ns  calibration: 51.01ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 13053.2277,
            "range": "± 86.8780",
            "unit": "× calibration",
            "extra": "665898.47ns  calibration: 51.01ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.4175,
            "range": "± 0.0196",
            "unit": "× calibration",
            "extra": "72.31ns  calibration: 51.01ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 52.8603,
            "range": "± 0.3246",
            "unit": "× calibration",
            "extra": "2696.62ns  calibration: 51.01ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 66.1833,
            "range": "± 1.3784",
            "unit": "× calibration",
            "extra": "3376.28ns  calibration: 51.01ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.0722,
            "range": "± 0.0233",
            "unit": "× calibration",
            "extra": "105.71ns  calibration: 51.01ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 77.2046,
            "range": "± 0.4820",
            "unit": "× calibration",
            "extra": "3938.52ns  calibration: 51.01ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 92.0783,
            "range": "± 2.2531",
            "unit": "× calibration",
            "extra": "4697.29ns  calibration: 51.01ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.2798,
            "range": "± 0.0196",
            "unit": "× calibration",
            "extra": "116.30ns  calibration: 51.01ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 201.2634,
            "range": "± 7.4291",
            "unit": "× calibration",
            "extra": "10267.27ns  calibration: 51.01ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 213.8692,
            "range": "± 6.8414",
            "unit": "× calibration",
            "extra": "10910.34ns  calibration: 51.01ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.3567,
            "range": "± 0.0178",
            "unit": "× calibration",
            "extra": "69.21ns  calibration: 51.01ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 95.1649,
            "range": "± 9.5768",
            "unit": "× calibration",
            "extra": "4854.75ns  calibration: 51.01ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 112.1729,
            "range": "± 8.2938",
            "unit": "× calibration",
            "extra": "5722.40ns  calibration: 51.01ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.5849,
            "range": "± 0.0182",
            "unit": "× calibration",
            "extra": "80.85ns  calibration: 51.01ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 178.8437,
            "range": "± 2.0953",
            "unit": "× calibration",
            "extra": "9123.55ns  calibration: 51.01ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 199.6968,
            "range": "± 1.3761",
            "unit": "× calibration",
            "extra": "10187.35ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 74.3955,
            "range": "± 2.2927",
            "unit": "× calibration",
            "extra": "3795.22ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 144.2353,
            "range": "± 2.2543",
            "unit": "× calibration",
            "extra": "7358.03ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 143.9091,
            "range": "± 1.7013",
            "unit": "× calibration",
            "extra": "7341.39ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 9.9233,
            "range": "± 0.0382",
            "unit": "× calibration",
            "extra": "506.23ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 10.8823,
            "range": "± 0.0474",
            "unit": "× calibration",
            "extra": "555.15ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 189.7801,
            "range": "± 12.4107",
            "unit": "× calibration",
            "extra": "9681.46ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 287.3101,
            "range": "± 4.1263",
            "unit": "× calibration",
            "extra": "14656.86ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 13.5864,
            "range": "± 0.0572",
            "unit": "× calibration",
            "extra": "693.10ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 133.8922,
            "range": "± 0.4338",
            "unit": "× calibration",
            "extra": "6830.39ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 168.5689,
            "range": "± 8.2887",
            "unit": "× calibration",
            "extra": "8599.39ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 238.2475,
            "range": "± 0.5006",
            "unit": "× calibration",
            "extra": "12153.98ns  calibration: 51.01ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 11.8461,
            "range": "± 0.0451",
            "unit": "× calibration",
            "extra": "604.32ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 84.7805,
            "range": "± 2.8026",
            "unit": "× calibration",
            "extra": "4325.00ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 85.83,
            "range": "± 2.2302",
            "unit": "× calibration",
            "extra": "4378.54ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 83.7294,
            "range": "± 2.5883",
            "unit": "× calibration",
            "extra": "4271.38ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 106.9309,
            "range": "± 2.1543",
            "unit": "× calibration",
            "extra": "5454.98ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 108.4238,
            "range": "± 2.3544",
            "unit": "× calibration",
            "extra": "5531.14ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 109.637,
            "range": "± 2.8912",
            "unit": "× calibration",
            "extra": "5593.03ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 115.386,
            "range": "± 2.8241",
            "unit": "× calibration",
            "extra": "5886.31ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 107.8737,
            "range": "± 2.4585",
            "unit": "× calibration",
            "extra": "5503.08ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 116.2898,
            "range": "± 1.7613",
            "unit": "× calibration",
            "extra": "5932.42ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 113.0221,
            "range": "± 1.2399",
            "unit": "× calibration",
            "extra": "5765.72ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 87.7281,
            "range": "± 2.7294",
            "unit": "× calibration",
            "extra": "4475.37ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 86.5978,
            "range": "± 2.4485",
            "unit": "× calibration",
            "extra": "4417.71ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 87.31,
            "range": "± 2.0565",
            "unit": "× calibration",
            "extra": "4454.04ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 88.137,
            "range": "± 2.3558",
            "unit": "× calibration",
            "extra": "4496.23ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 88.3581,
            "range": "± 2.4758",
            "unit": "× calibration",
            "extra": "4507.51ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 102.5468,
            "range": "± 1.9712",
            "unit": "× calibration",
            "extra": "5231.33ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 158.5717,
            "range": "± 18.4727",
            "unit": "× calibration",
            "extra": "8089.39ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 174.6355,
            "range": "± 19.6655",
            "unit": "× calibration",
            "extra": "8908.87ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 122.1518,
            "range": "± 9.3023",
            "unit": "× calibration",
            "extra": "6231.46ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 212.9186,
            "range": "± 1.2655",
            "unit": "× calibration",
            "extra": "10861.85ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5549,
            "range": "± 0.0025",
            "unit": "× calibration",
            "extra": "28.31ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5342,
            "range": "± 0.0024",
            "unit": "× calibration",
            "extra": "27.25ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 48.8169,
            "range": "± 0.2736",
            "unit": "× calibration",
            "extra": "2490.35ns  calibration: 51.01ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0762,
            "range": "± 0.0174",
            "unit": "× calibration",
            "extra": "54.90ns  calibration: 51.01ns"
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
          "id": "c0013b3bb99ba2dee8be0a9e147242ec78426058",
          "message": "Release version 1.3.0",
          "timestamp": "2026-09-06T14:43:27Z",
          "tree_id": "9989547ac237baa9b055b325e0de9a97e40b3828",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/c0013b3bb99ba2dee8be0a9e147242ec78426058"
        },
        "date": 1788705889860,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.6484,
            "range": "± 0.0067",
            "unit": "× calibration",
            "extra": "42.72ns  calibration: 65.89ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3863,
            "range": "± 0.0355",
            "unit": "× calibration",
            "extra": "91.34ns  calibration: 65.89ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3793,
            "range": "± 0.0345",
            "unit": "× calibration",
            "extra": "90.88ns  calibration: 65.89ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3571,
            "range": "± 0.0000",
            "unit": "× calibration",
            "extra": "23.53ns  calibration: 65.89ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.202,
            "range": "± 0.0187",
            "unit": "× calibration",
            "extra": "79.20ns  calibration: 65.89ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.3018,
            "range": "± 0.0234",
            "unit": "× calibration",
            "extra": "85.77ns  calibration: 65.89ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 798.5209,
            "range": "± 5.2438",
            "unit": "× calibration",
            "extra": "52612.81ns  calibration: 65.89ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1176.2427,
            "range": "± 12.1570",
            "unit": "× calibration",
            "extra": "77500.08ns  calibration: 65.89ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 888.2209,
            "range": "± 13.3788",
            "unit": "× calibration",
            "extra": "58522.95ns  calibration: 65.89ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2553.8233,
            "range": "± 30.0359",
            "unit": "× calibration",
            "extra": "168265.88ns  calibration: 65.89ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.4851,
            "range": "± 0.0200",
            "unit": "× calibration",
            "extra": "361.40ns  calibration: 65.89ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.0068,
            "range": "± 0.0906",
            "unit": "× calibration",
            "extra": "1384.09ns  calibration: 65.89ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 31.4311,
            "range": "± 0.9440",
            "unit": "× calibration",
            "extra": "2070.93ns  calibration: 65.89ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.1305,
            "range": "± 0.0070",
            "unit": "× calibration",
            "extra": "206.26ns  calibration: 65.89ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.8228,
            "range": "± 0.0351",
            "unit": "× calibration",
            "extra": "383.65ns  calibration: 65.89ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.5273,
            "range": "± 0.0354",
            "unit": "× calibration",
            "extra": "693.62ns  calibration: 65.89ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6308,
            "range": "± 0.0024",
            "unit": "× calibration",
            "extra": "41.56ns  calibration: 65.89ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0254,
            "range": "± 0.0191",
            "unit": "× calibration",
            "extra": "67.56ns  calibration: 65.89ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 51.5989,
            "range": "± 0.6071",
            "unit": "× calibration",
            "extra": "3399.74ns  calibration: 65.89ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 47.3297,
            "range": "± 0.2705",
            "unit": "× calibration",
            "extra": "3118.45ns  calibration: 65.89ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.3975,
            "range": "± 0.0143",
            "unit": "× calibration",
            "extra": "92.08ns  calibration: 65.89ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.9278,
            "range": "± 0.0212",
            "unit": "× calibration",
            "extra": "127.02ns  calibration: 65.89ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 176.2687,
            "range": "± 2.2766",
            "unit": "× calibration",
            "extra": "11613.96ns  calibration: 65.89ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.0867,
            "range": "± 0.0255",
            "unit": "× calibration",
            "extra": "137.49ns  calibration: 65.89ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 45.9971,
            "range": "± 0.2985",
            "unit": "× calibration",
            "extra": "3030.65ns  calibration: 65.89ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 281.8411,
            "range": "± 2.4039",
            "unit": "× calibration",
            "extra": "18569.90ns  calibration: 65.89ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 12898.7032,
            "range": "± 65.4597",
            "unit": "× calibration",
            "extra": "849867.59ns  calibration: 65.89ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.5423,
            "range": "± 0.0193",
            "unit": "× calibration",
            "extra": "101.62ns  calibration: 65.89ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 54.1244,
            "range": "± 0.3542",
            "unit": "× calibration",
            "extra": "3566.14ns  calibration: 65.89ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 67.8747,
            "range": "± 2.4782",
            "unit": "× calibration",
            "extra": "4472.12ns  calibration: 65.89ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1968,
            "range": "± 0.0193",
            "unit": "× calibration",
            "extra": "144.74ns  calibration: 65.89ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 76.7425,
            "range": "± 0.3623",
            "unit": "× calibration",
            "extra": "5056.40ns  calibration: 65.89ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 92.8821,
            "range": "± 2.9625",
            "unit": "× calibration",
            "extra": "6119.80ns  calibration: 65.89ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3221,
            "range": "± 0.0182",
            "unit": "× calibration",
            "extra": "153.00ns  calibration: 65.89ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 194.9873,
            "range": "± 5.6751",
            "unit": "× calibration",
            "extra": "12847.29ns  calibration: 65.89ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 209.4926,
            "range": "± 3.9437",
            "unit": "× calibration",
            "extra": "13803.01ns  calibration: 65.89ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.5532,
            "range": "± 0.0199",
            "unit": "× calibration",
            "extra": "102.34ns  calibration: 65.89ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 94.9664,
            "range": "± 7.6324",
            "unit": "× calibration",
            "extra": "6257.13ns  calibration: 65.89ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 112.1936,
            "range": "± 7.1986",
            "unit": "× calibration",
            "extra": "7392.19ns  calibration: 65.89ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.7328,
            "range": "± 0.0191",
            "unit": "× calibration",
            "extra": "114.17ns  calibration: 65.89ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 181.3632,
            "range": "± 0.5159",
            "unit": "× calibration",
            "extra": "11949.63ns  calibration: 65.89ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 202.3157,
            "range": "± 1.2339",
            "unit": "× calibration",
            "extra": "13330.14ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 76.1544,
            "range": "± 2.8377",
            "unit": "× calibration",
            "extra": "5017.65ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 150.9666,
            "range": "± 1.6695",
            "unit": "× calibration",
            "extra": "9946.86ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 142.446,
            "range": "± 1.0837",
            "unit": "× calibration",
            "extra": "9385.46ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.8154,
            "range": "± 0.0307",
            "unit": "× calibration",
            "extra": "712.60ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.4959,
            "range": "± 0.0375",
            "unit": "× calibration",
            "extra": "757.44ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 196.2769,
            "range": "± 0.8939",
            "unit": "× calibration",
            "extra": "12932.26ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 308.4404,
            "range": "± 5.0920",
            "unit": "× calibration",
            "extra": "20322.47ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 14.9181,
            "range": "± 0.0841",
            "unit": "× calibration",
            "extra": "982.92ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 127.6098,
            "range": "± 0.4058",
            "unit": "× calibration",
            "extra": "8407.93ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 173.7586,
            "range": "± 4.3562",
            "unit": "× calibration",
            "extra": "11448.58ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 245.1111,
            "range": "± 1.9026",
            "unit": "× calibration",
            "extra": "16149.84ns  calibration: 65.89ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 12.6876,
            "range": "± 0.0486",
            "unit": "× calibration",
            "extra": "835.96ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 85.2358,
            "range": "± 2.6571",
            "unit": "× calibration",
            "extra": "5616.00ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 86.4887,
            "range": "± 2.4804",
            "unit": "× calibration",
            "extra": "5698.55ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 84.6903,
            "range": "± 2.6006",
            "unit": "× calibration",
            "extra": "5580.06ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 109.7594,
            "range": "± 1.4089",
            "unit": "× calibration",
            "extra": "7231.81ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 112.2644,
            "range": "± 0.8662",
            "unit": "× calibration",
            "extra": "7396.86ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 111.938,
            "range": "± 1.2511",
            "unit": "× calibration",
            "extra": "7375.35ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 119.8419,
            "range": "± 1.6396",
            "unit": "× calibration",
            "extra": "7896.12ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 110.8576,
            "range": "± 1.8143",
            "unit": "× calibration",
            "extra": "7304.17ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 119.2117,
            "range": "± 2.0726",
            "unit": "× calibration",
            "extra": "7854.60ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 116.1721,
            "range": "± 2.5084",
            "unit": "× calibration",
            "extra": "7654.33ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 86.5859,
            "range": "± 2.3828",
            "unit": "× calibration",
            "extra": "5704.96ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 86.4204,
            "range": "± 2.8981",
            "unit": "× calibration",
            "extra": "5694.05ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 86.4923,
            "range": "± 2.4023",
            "unit": "× calibration",
            "extra": "5698.79ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 86.6284,
            "range": "± 2.5052",
            "unit": "× calibration",
            "extra": "5707.76ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 88.6897,
            "range": "± 2.5471",
            "unit": "× calibration",
            "extra": "5843.57ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 105.4668,
            "range": "± 1.5177",
            "unit": "× calibration",
            "extra": "6948.98ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 160.3276,
            "range": "± 12.8600",
            "unit": "× calibration",
            "extra": "10563.64ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 177.7928,
            "range": "± 11.8602",
            "unit": "× calibration",
            "extra": "11714.38ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 122.3531,
            "range": "± 7.6756",
            "unit": "× calibration",
            "extra": "8061.58ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 215.14,
            "range": "± 0.5719",
            "unit": "× calibration",
            "extra": "14175.11ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5626,
            "range": "± 0.0021",
            "unit": "× calibration",
            "extra": "37.07ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5356,
            "range": "± 0.0018",
            "unit": "× calibration",
            "extra": "35.29ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 47.2908,
            "range": "± 0.3523",
            "unit": "× calibration",
            "extra": "3115.89ns  calibration: 65.89ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0275,
            "range": "± 0.0193",
            "unit": "× calibration",
            "extra": "67.70ns  calibration: 65.89ns"
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
          "id": "c0013b3bb99ba2dee8be0a9e147242ec78426058",
          "message": "Release version 1.3.0",
          "timestamp": "2026-09-06T14:43:27Z",
          "tree_id": "9989547ac237baa9b055b325e0de9a97e40b3828",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/c0013b3bb99ba2dee8be0a9e147242ec78426058"
        },
        "date": 1788715333263,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.708,
            "range": "± 0.0062",
            "unit": "× calibration",
            "extra": "44.32ns  calibration: 62.60ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4671,
            "range": "± 0.0319",
            "unit": "× calibration",
            "extra": "91.84ns  calibration: 62.60ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4618,
            "range": "± 0.0257",
            "unit": "× calibration",
            "extra": "91.51ns  calibration: 62.60ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.392,
            "range": "± 0.0027",
            "unit": "× calibration",
            "extra": "24.54ns  calibration: 62.60ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2835,
            "range": "± 0.0212",
            "unit": "× calibration",
            "extra": "80.35ns  calibration: 62.60ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.3843,
            "range": "± 0.0267",
            "unit": "× calibration",
            "extra": "86.66ns  calibration: 62.60ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 891.5554,
            "range": "± 9.6805",
            "unit": "× calibration",
            "extra": "55811.47ns  calibration: 62.60ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1126.7743,
            "range": "± 9.6805",
            "unit": "× calibration",
            "extra": "70536.20ns  calibration: 62.60ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 946.7288,
            "range": "± 9.6805",
            "unit": "× calibration",
            "extra": "59265.33ns  calibration: 62.60ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2401.6614,
            "range": "± 24.8003",
            "unit": "× calibration",
            "extra": "150344.28ns  calibration: 62.60ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.8156,
            "range": "± 0.0315",
            "unit": "× calibration",
            "extra": "364.06ns  calibration: 62.60ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.7987,
            "range": "± 0.0800",
            "unit": "× calibration",
            "extra": "1364.60ns  calibration: 62.60ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 30.2102,
            "range": "± 0.1238",
            "unit": "× calibration",
            "extra": "1891.16ns  calibration: 62.60ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.3014,
            "range": "± 0.0195",
            "unit": "× calibration",
            "extra": "206.67ns  calibration: 62.60ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.1666,
            "range": "± 0.0259",
            "unit": "× calibration",
            "extra": "386.03ns  calibration: 62.60ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.2243,
            "range": "± 0.0457",
            "unit": "× calibration",
            "extra": "702.64ns  calibration: 62.60ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.7,
            "range": "± 0.0056",
            "unit": "× calibration",
            "extra": "43.82ns  calibration: 62.60ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.1225,
            "range": "± 0.0198",
            "unit": "× calibration",
            "extra": "70.27ns  calibration: 62.60ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 54.8461,
            "range": "± 0.7987",
            "unit": "× calibration",
            "extra": "3433.37ns  calibration: 62.60ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 51.0213,
            "range": "± 0.2538",
            "unit": "× calibration",
            "extra": "3193.94ns  calibration: 62.60ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5625,
            "range": "± 0.0212",
            "unit": "× calibration",
            "extra": "97.81ns  calibration: 62.60ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 2.0388,
            "range": "± 0.0233",
            "unit": "× calibration",
            "extra": "127.63ns  calibration: 62.60ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 183.3567,
            "range": "± 2.7955",
            "unit": "× calibration",
            "extra": "11478.15ns  calibration: 62.60ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.9323,
            "range": "± 0.0227",
            "unit": "× calibration",
            "extra": "120.96ns  calibration: 62.60ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 49.2464,
            "range": "± 0.2919",
            "unit": "× calibration",
            "extra": "3082.83ns  calibration: 62.60ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 296.3384,
            "range": "± 2.7955",
            "unit": "× calibration",
            "extra": "18550.82ns  calibration: 62.60ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 13591.6923,
            "range": "± 64.4008",
            "unit": "× calibration",
            "extra": "850841.50ns  calibration: 62.60ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.4125,
            "range": "± 0.0184",
            "unit": "× calibration",
            "extra": "88.42ns  calibration: 62.60ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 55.6378,
            "range": "± 0.3081",
            "unit": "× calibration",
            "extra": "3482.93ns  calibration: 62.60ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 70.5288,
            "range": "± 2.5711",
            "unit": "× calibration",
            "extra": "4415.11ns  calibration: 62.60ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1208,
            "range": "± 0.0188",
            "unit": "× calibration",
            "extra": "132.76ns  calibration: 62.60ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 80.6535,
            "range": "± 0.5032",
            "unit": "× calibration",
            "extra": "5048.92ns  calibration: 62.60ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 96.5832,
            "range": "± 2.6612",
            "unit": "× calibration",
            "extra": "6046.12ns  calibration: 62.60ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.4244,
            "range": "± 0.0190",
            "unit": "× calibration",
            "extra": "151.77ns  calibration: 62.60ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 204.8549,
            "range": "± 9.6519",
            "unit": "× calibration",
            "extra": "12823.94ns  calibration: 62.60ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 214.7082,
            "range": "± 4.2305",
            "unit": "× calibration",
            "extra": "13440.76ns  calibration: 62.60ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.4359,
            "range": "± 0.0188",
            "unit": "× calibration",
            "extra": "89.89ns  calibration: 62.60ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 99.095,
            "range": "± 8.0637",
            "unit": "× calibration",
            "extra": "6203.36ns  calibration: 62.60ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 116.398,
            "range": "± 7.4401",
            "unit": "× calibration",
            "extra": "7286.53ns  calibration: 62.60ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.58,
            "range": "± 0.0195",
            "unit": "× calibration",
            "extra": "98.91ns  calibration: 62.60ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 186.0747,
            "range": "± 0.6521",
            "unit": "× calibration",
            "extra": "11648.30ns  calibration: 62.60ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 207.5621,
            "range": "± 0.2827",
            "unit": "× calibration",
            "extra": "12993.41ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 78.8562,
            "range": "± 1.8633",
            "unit": "× calibration",
            "extra": "4936.41ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 146.6564,
            "range": "± 2.1645",
            "unit": "× calibration",
            "extra": "9180.71ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 144.8545,
            "range": "± 1.9866",
            "unit": "× calibration",
            "extra": "9067.91ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.0565,
            "range": "± 0.0398",
            "unit": "× calibration",
            "extra": "629.54ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.181,
            "range": "± 0.0363",
            "unit": "× calibration",
            "extra": "699.93ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 196.5071,
            "range": "± 1.0208",
            "unit": "× calibration",
            "extra": "12301.37ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 286.8619,
            "range": "± 4.6326",
            "unit": "× calibration",
            "extra": "17957.59ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 14.9143,
            "range": "± 0.0494",
            "unit": "× calibration",
            "extra": "933.64ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 132.6461,
            "range": "± 0.3233",
            "unit": "× calibration",
            "extra": "8303.66ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 175.7652,
            "range": "± 4.9805",
            "unit": "× calibration",
            "extra": "11002.92ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 253.0912,
            "range": "± 4.4010",
            "unit": "× calibration",
            "extra": "15843.54ns  calibration: 62.60ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 13.1433,
            "range": "± 0.0546",
            "unit": "× calibration",
            "extra": "822.77ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 89.2703,
            "range": "± 2.6136",
            "unit": "× calibration",
            "extra": "5588.33ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 91.0933,
            "range": "± 2.3594",
            "unit": "× calibration",
            "extra": "5702.45ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 88.2615,
            "range": "± 2.2367",
            "unit": "× calibration",
            "extra": "5525.18ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 113.9047,
            "range": "± 1.7046",
            "unit": "× calibration",
            "extra": "7130.45ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 115.8076,
            "range": "± 0.9770",
            "unit": "× calibration",
            "extra": "7249.57ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 115.0996,
            "range": "± 2.2131",
            "unit": "× calibration",
            "extra": "7205.25ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 122.4549,
            "range": "± 1.0046",
            "unit": "× calibration",
            "extra": "7665.69ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 113.853,
            "range": "± 1.2049",
            "unit": "× calibration",
            "extra": "7127.21ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 122.9026,
            "range": "± 2.1326",
            "unit": "× calibration",
            "extra": "7693.72ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 120.1702,
            "range": "± 1.9248",
            "unit": "× calibration",
            "extra": "7522.67ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 92.4877,
            "range": "± 2.1481",
            "unit": "× calibration",
            "extra": "5789.74ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 91.1431,
            "range": "± 2.4626",
            "unit": "× calibration",
            "extra": "5705.57ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 92.3439,
            "range": "± 1.6553",
            "unit": "× calibration",
            "extra": "5780.74ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 93.2572,
            "range": "± 2.4538",
            "unit": "× calibration",
            "extra": "5837.91ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 93.5132,
            "range": "± 2.5233",
            "unit": "× calibration",
            "extra": "5853.94ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 108.2832,
            "range": "± 1.9303",
            "unit": "× calibration",
            "extra": "6778.54ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 164.0863,
            "range": "± 16.9143",
            "unit": "× calibration",
            "extra": "10271.82ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 177.7716,
            "range": "± 17.5463",
            "unit": "× calibration",
            "extra": "11128.52ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 128.7557,
            "range": "± 7.7952",
            "unit": "× calibration",
            "extra": "8060.12ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 222.1071,
            "range": "± 1.2636",
            "unit": "× calibration",
            "extra": "13903.93ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5784,
            "range": "± 0.0029",
            "unit": "× calibration",
            "extra": "36.21ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5573,
            "range": "± 0.0024",
            "unit": "× calibration",
            "extra": "34.89ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 51.8057,
            "range": "± 0.2712",
            "unit": "× calibration",
            "extra": "3243.04ns  calibration: 62.60ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.122,
            "range": "± 0.0200",
            "unit": "× calibration",
            "extra": "70.24ns  calibration: 62.60ns"
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
          "id": "d2ad26187d3081cdc7b2ff1e70f02222b76445e3",
          "message": "Bump js-yaml from 4.3.1 to 4.3.2 in the npm_and_yarn group across 1 directory (#96)\n\nBump js-yaml in the npm_and_yarn group across 1 directory\n\nBumps the npm_and_yarn group with 1 update in the / directory: [js-yaml](https://github.com/nodeca/js-yaml).\n\n\nUpdates `js-yaml` from 4.3.1 to 4.3.2\n- [Changelog](https://github.com/nodeca/js-yaml/blob/4.3.2/CHANGELOG.md)\n- [Commits](https://github.com/nodeca/js-yaml/compare/4.3.1...4.3.2)\n\n---\nupdated-dependencies:\n- dependency-name: js-yaml\n  dependency-version: 4.3.2\n  dependency-type: indirect\n  dependency-group: npm_and_yarn\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-09-13T12:56:47+01:00",
          "tree_id": "2891cbbb60aad5eafd33f174a55d0033c1357662",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/d2ad26187d3081cdc7b2ff1e70f02222b76445e3"
        },
        "date": 1789300685582,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.7057,
            "range": "± 0.0023",
            "unit": "× calibration",
            "extra": "34.20ns  calibration: 48.46ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4589,
            "range": "± 0.0274",
            "unit": "× calibration",
            "extra": "70.70ns  calibration: 48.46ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.468,
            "range": "± 0.0262",
            "unit": "× calibration",
            "extra": "71.14ns  calibration: 48.46ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3935,
            "range": "± 0.0000",
            "unit": "× calibration",
            "extra": "19.07ns  calibration: 48.46ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2639,
            "range": "± 0.0206",
            "unit": "× calibration",
            "extra": "61.25ns  calibration: 48.46ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.351,
            "range": "± 0.0217",
            "unit": "× calibration",
            "extra": "65.47ns  calibration: 48.46ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 832.1188,
            "range": "± 10.0133",
            "unit": "× calibration",
            "extra": "40325.70ns  calibration: 48.46ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1104.2389,
            "range": "± 10.0286",
            "unit": "× calibration",
            "extra": "53513.04ns  calibration: 48.46ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 930.2281,
            "range": "± 15.2096",
            "unit": "× calibration",
            "extra": "45080.22ns  calibration: 48.46ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2369.9659,
            "range": "± 27.2897",
            "unit": "× calibration",
            "extra": "114852.03ns  calibration: 48.46ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.6899,
            "range": "± 0.0167",
            "unit": "× calibration",
            "extra": "275.74ns  calibration: 48.46ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.9075,
            "range": "± 0.1676",
            "unit": "× calibration",
            "extra": "1061.67ns  calibration: 48.46ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 30.5164,
            "range": "± 0.5968",
            "unit": "× calibration",
            "extra": "1478.87ns  calibration: 48.46ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.2725,
            "range": "± 0.0182",
            "unit": "× calibration",
            "extra": "158.59ns  calibration: 48.46ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.3234,
            "range": "± 0.0312",
            "unit": "× calibration",
            "extra": "306.44ns  calibration: 48.46ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.0742,
            "range": "± 0.0359",
            "unit": "× calibration",
            "extra": "536.67ns  calibration: 48.46ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6727,
            "range": "± 0.0033",
            "unit": "× calibration",
            "extra": "32.60ns  calibration: 48.46ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.1337,
            "range": "± 0.0206",
            "unit": "× calibration",
            "extra": "54.94ns  calibration: 48.46ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 55.0076,
            "range": "± 1.3413",
            "unit": "× calibration",
            "extra": "2665.75ns  calibration: 48.46ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 51.418,
            "range": "± 0.3945",
            "unit": "× calibration",
            "extra": "2491.79ns  calibration: 48.46ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5813,
            "range": "± 0.0217",
            "unit": "× calibration",
            "extra": "76.63ns  calibration: 48.46ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 2.0078,
            "range": "± 0.0229",
            "unit": "× calibration",
            "extra": "97.30ns  calibration: 48.46ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 185.82,
            "range": "± 3.3119",
            "unit": "× calibration",
            "extra": "9005.11ns  calibration: 48.46ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 1.9603,
            "range": "± 0.0227",
            "unit": "× calibration",
            "extra": "95.00ns  calibration: 48.46ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 50.6204,
            "range": "± 0.3454",
            "unit": "× calibration",
            "extra": "2453.14ns  calibration: 48.46ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 300.1182,
            "range": "± 1.4707",
            "unit": "× calibration",
            "extra": "14544.17ns  calibration: 48.46ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 13733.7834,
            "range": "± 85.7485",
            "unit": "× calibration",
            "extra": "665559.32ns  calibration: 48.46ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.417,
            "range": "± 0.0190",
            "unit": "× calibration",
            "extra": "68.67ns  calibration: 48.46ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 55.9655,
            "range": "± 0.2959",
            "unit": "× calibration",
            "extra": "2712.17ns  calibration: 48.46ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 70.1974,
            "range": "± 2.2011",
            "unit": "× calibration",
            "extra": "3401.87ns  calibration: 48.46ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.112,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "102.35ns  calibration: 48.46ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 81.0689,
            "range": "± 0.4476",
            "unit": "× calibration",
            "extra": "3928.72ns  calibration: 48.46ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 97.7684,
            "range": "± 2.8255",
            "unit": "× calibration",
            "extra": "4738.00ns  calibration: 48.46ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3891,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "115.78ns  calibration: 48.46ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 204.1271,
            "range": "± 6.8046",
            "unit": "× calibration",
            "extra": "9892.30ns  calibration: 48.46ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 219.4579,
            "range": "± 5.1096",
            "unit": "× calibration",
            "extra": "10635.25ns  calibration: 48.46ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — native new RegExp()",
            "value": 1.4354,
            "range": "± 0.0196",
            "unit": "× calibration",
            "extra": "69.56ns  calibration: 48.46ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — compilePartial()",
            "value": 98.912,
            "range": "± 8.6848",
            "unit": "× calibration",
            "extra": "4793.42ns  calibration: 48.46ns"
          },
          {
            "name": "construction — legacy numeric escape reclassification — new PartialMatchRegExp()",
            "value": 115.2361,
            "range": "± 7.2080",
            "unit": "× calibration",
            "extra": "5584.51ns  calibration: 48.46ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — native new RegExp()",
            "value": 1.5897,
            "range": "± 0.0186",
            "unit": "× calibration",
            "extra": "77.04ns  calibration: 48.46ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — compilePartial()",
            "value": 183.6125,
            "range": "± 0.4003",
            "unit": "× calibration",
            "extra": "8898.13ns  calibration: 48.46ns"
          },
          {
            "name": "construction — legacy named escape fallback (double walk()) — new PartialMatchRegExp()",
            "value": 208.5077,
            "range": "± 1.6456",
            "unit": "× calibration",
            "extra": "10104.59ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 78.3658,
            "range": "± 2.1324",
            "unit": "× calibration",
            "extra": "3797.72ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 150.9725,
            "range": "± 2.3730",
            "unit": "× calibration",
            "extra": "7316.35ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 144.7969,
            "range": "± 1.8801",
            "unit": "× calibration",
            "extra": "7017.07ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.1864,
            "range": "± 0.0316",
            "unit": "× calibration",
            "extra": "493.65ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.363,
            "range": "± 0.0349",
            "unit": "× calibration",
            "extra": "550.67ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 197.1645,
            "range": "± 5.9394",
            "unit": "× calibration",
            "extra": "9554.88ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 289.5321,
            "range": "± 4.2405",
            "unit": "× calibration",
            "extra": "14031.15ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 14.6273,
            "range": "± 0.0631",
            "unit": "× calibration",
            "extra": "708.86ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 131.6605,
            "range": "± 0.8718",
            "unit": "× calibration",
            "extra": "6380.46ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 177.7261,
            "range": "± 7.3266",
            "unit": "× calibration",
            "extra": "8612.87ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 247.1881,
            "range": "± 0.8165",
            "unit": "× calibration",
            "extra": "11979.10ns  calibration: 48.46ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 12.9268,
            "range": "± 0.0402",
            "unit": "× calibration",
            "extra": "626.45ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 88.7575,
            "range": "± 2.3055",
            "unit": "× calibration",
            "extra": "4301.32ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 90.2705,
            "range": "± 2.0784",
            "unit": "× calibration",
            "extra": "4374.64ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 88.1793,
            "range": "± 2.7009",
            "unit": "× calibration",
            "extra": "4273.30ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 112.516,
            "range": "± 1.8334",
            "unit": "× calibration",
            "extra": "5452.69ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 114.1821,
            "range": "± 2.4273",
            "unit": "× calibration",
            "extra": "5533.43ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 114.8519,
            "range": "± 2.1312",
            "unit": "× calibration",
            "extra": "5565.89ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 120.8564,
            "range": "± 2.0881",
            "unit": "× calibration",
            "extra": "5856.88ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 114.0993,
            "range": "± 3.0234",
            "unit": "× calibration",
            "extra": "5529.42ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 123.4983,
            "range": "± 2.8456",
            "unit": "× calibration",
            "extra": "5984.91ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 119.732,
            "range": "± 1.5418",
            "unit": "× calibration",
            "extra": "5802.39ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 92.374,
            "range": "± 2.2216",
            "unit": "× calibration",
            "extra": "4476.58ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 90.8456,
            "range": "± 2.3268",
            "unit": "× calibration",
            "extra": "4402.51ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 92.4823,
            "range": "± 2.1594",
            "unit": "× calibration",
            "extra": "4481.83ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 92.4371,
            "range": "± 1.8701",
            "unit": "× calibration",
            "extra": "4479.64ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 97.3615,
            "range": "± 2.9518",
            "unit": "× calibration",
            "extra": "4718.28ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 108.1366,
            "range": "± 2.3984",
            "unit": "× calibration",
            "extra": "5240.46ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 166.1528,
            "range": "± 17.2285",
            "unit": "× calibration",
            "extra": "8052.01ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 182.3125,
            "range": "± 19.1014",
            "unit": "× calibration",
            "extra": "8835.13ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 129.2714,
            "range": "± 9.6922",
            "unit": "× calibration",
            "extra": "6264.68ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 222.7275,
            "range": "± 1.0557",
            "unit": "× calibration",
            "extra": "10793.70ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5788,
            "range": "± 0.0027",
            "unit": "× calibration",
            "extra": "28.05ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5607,
            "range": "± 0.0025",
            "unit": "× calibration",
            "extra": "27.17ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 51.791,
            "range": "± 0.2489",
            "unit": "× calibration",
            "extra": "2509.87ns  calibration: 48.46ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.1097,
            "range": "± 0.0180",
            "unit": "× calibration",
            "extra": "53.78ns  calibration: 48.46ns"
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
          "id": "ad1b0bd69585e4dff985c7c610b1188fa424e4d6",
          "message": "[95] isComplete -> hitEnd refactor (#97)\n\n* move to hitEnd\n* append multiline caret fix / refactor\n* constants refactor\n* README caveat about {n,m} atom conservatism",
          "timestamp": "2026-09-14T22:26:11+01:00",
          "tree_id": "a9279375c0ad12b9a55438e72d80b09da813ddda",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/ad1b0bd69585e4dff985c7c610b1188fa424e4d6"
        },
        "date": 1789421257802,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.6454,
            "range": "± 0.0147",
            "unit": "× calibration",
            "extra": "21.12ns  calibration: 32.73ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.2308,
            "range": "± 0.0290",
            "unit": "× calibration",
            "extra": "40.28ns  calibration: 32.73ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.2663,
            "range": "± 0.0303",
            "unit": "× calibration",
            "extra": "41.44ns  calibration: 32.73ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3636,
            "range": "± 0.0061",
            "unit": "× calibration",
            "extra": "11.90ns  calibration: 32.73ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1291,
            "range": "± 0.0287",
            "unit": "× calibration",
            "extra": "36.95ns  calibration: 32.73ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.1932,
            "range": "± 0.0180",
            "unit": "× calibration",
            "extra": "39.05ns  calibration: 32.73ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 837.2895,
            "range": "± 16.3631",
            "unit": "× calibration",
            "extra": "27401.19ns  calibration: 32.73ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1247.0467,
            "range": "± 21.2415",
            "unit": "× calibration",
            "extra": "40810.93ns  calibration: 32.73ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 884.2762,
            "range": "± 12.3907",
            "unit": "× calibration",
            "extra": "28938.88ns  calibration: 32.73ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2530.6662,
            "range": "± 63.8024",
            "unit": "× calibration",
            "extra": "82818.74ns  calibration: 32.73ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 6.1208,
            "range": "± 0.0657",
            "unit": "× calibration",
            "extra": "200.31ns  calibration: 32.73ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.1287,
            "range": "± 0.1827",
            "unit": "× calibration",
            "extra": "691.46ns  calibration: 32.73ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 30.6609,
            "range": "± 0.2555",
            "unit": "× calibration",
            "extra": "1003.41ns  calibration: 32.73ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.5409,
            "range": "± 0.0440",
            "unit": "× calibration",
            "extra": "115.88ns  calibration: 32.73ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.1587,
            "range": "± 0.1247",
            "unit": "× calibration",
            "extra": "201.55ns  calibration: 32.73ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.1015,
            "range": "± 0.2234",
            "unit": "× calibration",
            "extra": "363.31ns  calibration: 32.73ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6842,
            "range": "± 0.0046",
            "unit": "× calibration",
            "extra": "22.39ns  calibration: 32.73ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.1358,
            "range": "± 0.0138",
            "unit": "× calibration",
            "extra": "37.17ns  calibration: 32.73ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 70.6037,
            "range": "± 1.3751",
            "unit": "× calibration",
            "extra": "2310.58ns  calibration: 32.73ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 62.489,
            "range": "± 1.0582",
            "unit": "× calibration",
            "extra": "2045.02ns  calibration: 32.73ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5306,
            "range": "± 0.0186",
            "unit": "× calibration",
            "extra": "50.09ns  calibration: 32.73ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.9807,
            "range": "± 0.0269",
            "unit": "× calibration",
            "extra": "64.82ns  calibration: 32.73ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 237.9415,
            "range": "± 5.0571",
            "unit": "× calibration",
            "extra": "7786.89ns  calibration: 32.73ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.0812,
            "range": "± 0.0235",
            "unit": "× calibration",
            "extra": "68.11ns  calibration: 32.73ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 59.4887,
            "range": "± 0.9922",
            "unit": "× calibration",
            "extra": "1946.83ns  calibration: 32.73ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 377.9501,
            "range": "± 1.9789",
            "unit": "× calibration",
            "extra": "12368.82ns  calibration: 32.73ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 17247.6656,
            "range": "± 165.4033",
            "unit": "× calibration",
            "extra": "564448.19ns  calibration: 32.73ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.5495,
            "range": "± 0.0134",
            "unit": "× calibration",
            "extra": "50.71ns  calibration: 32.73ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 64.566,
            "range": "± 0.7242",
            "unit": "× calibration",
            "extra": "2112.99ns  calibration: 32.73ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 72.8792,
            "range": "± 1.2012",
            "unit": "× calibration",
            "extra": "2385.05ns  calibration: 32.73ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.4943,
            "range": "± 0.0296",
            "unit": "× calibration",
            "extra": "81.63ns  calibration: 32.73ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 88.905,
            "range": "± 0.7373",
            "unit": "× calibration",
            "extra": "2909.51ns  calibration: 32.73ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 98.2978,
            "range": "± 2.8519",
            "unit": "× calibration",
            "extra": "3216.90ns  calibration: 32.73ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.6862,
            "range": "± 0.0226",
            "unit": "× calibration",
            "extra": "87.91ns  calibration: 32.73ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 231.2524,
            "range": "± 2.6034",
            "unit": "× calibration",
            "extra": "7567.98ns  calibration: 32.73ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 251.3905,
            "range": "± 2.3076",
            "unit": "× calibration",
            "extra": "8227.02ns  calibration: 32.73ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — native new RegExp()",
            "value": 1.61,
            "range": "± 0.0229",
            "unit": "× calibration",
            "extra": "52.69ns  calibration: 32.73ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — compilePartial()",
            "value": 109.7694,
            "range": "± 1.6085",
            "unit": "× calibration",
            "extra": "3592.32ns  calibration: 32.73ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — new PartialMatchRegExp()",
            "value": 123.8695,
            "range": "± 3.2784",
            "unit": "× calibration",
            "extra": "4053.76ns  calibration: 32.73ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — native new RegExp()",
            "value": 1.768,
            "range": "± 0.0196",
            "unit": "× calibration",
            "extra": "57.86ns  calibration: 32.73ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — compilePartial()",
            "value": 117.7862,
            "range": "± 0.9561",
            "unit": "× calibration",
            "extra": "3854.68ns  calibration: 32.73ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — new PartialMatchRegExp()",
            "value": 128.5318,
            "range": "± 5.9020",
            "unit": "× calibration",
            "extra": "4206.34ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 77.5593,
            "range": "± 0.8730",
            "unit": "× calibration",
            "extra": "2538.21ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 211.8027,
            "range": "± 5.3474",
            "unit": "× calibration",
            "extra": "6931.47ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 204.691,
            "range": "± 4.5520",
            "unit": "× calibration",
            "extra": "6698.73ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 11.2855,
            "range": "± 0.0602",
            "unit": "× calibration",
            "extra": "369.33ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 12.4222,
            "range": "± 0.1286",
            "unit": "× calibration",
            "extra": "406.53ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec (baseline, never asks)",
            "value": 69.5776,
            "range": "± 1.5972",
            "unit": "× calibration",
            "extra": "2277.00ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 152.2744,
            "range": "± 3.4819",
            "unit": "× calibration",
            "extra": "4983.34ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (complete, includes probe build)",
            "value": 155.3322,
            "range": "± 3.2460",
            "unit": "× calibration",
            "extra": "5083.41ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — incomplete match, warm probe",
            "value": 9.4824,
            "range": "± 0.1238",
            "unit": "× calibration",
            "extra": "310.32ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — complete match, warm probe",
            "value": 10.5228,
            "range": "± 0.2616",
            "unit": "× calibration",
            "extra": "344.37ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec (baseline, never asks)",
            "value": 81.8788,
            "range": "± 1.1480",
            "unit": "× calibration",
            "extra": "2679.57ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (includes probe build)",
            "value": 214.3778,
            "range": "± 2.4341",
            "unit": "× calibration",
            "extra": "7015.74ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 220.325,
            "range": "± 2.1940",
            "unit": "× calibration",
            "extra": "7210.37ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — incomplete match, warm probe",
            "value": 14.3491,
            "range": "± 0.0681",
            "unit": "× calibration",
            "extra": "469.59ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — complete match, warm probe",
            "value": 18.6888,
            "range": "± 0.1011",
            "unit": "× calibration",
            "extra": "611.61ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec (baseline, never asks)",
            "value": 69.2858,
            "range": "± 0.7077",
            "unit": "× calibration",
            "extra": "2267.45ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 152.0815,
            "range": "± 3.3411",
            "unit": "× calibration",
            "extra": "4977.03ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (taken, includes probe build)",
            "value": 155.37,
            "range": "± 4.3904",
            "unit": "× calibration",
            "extra": "5084.65ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — untaken atom, warm probe",
            "value": 9.3409,
            "range": "± 0.1244",
            "unit": "× calibration",
            "extra": "305.69ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — taken atom, warm probe",
            "value": 10.7178,
            "range": "± 0.1723",
            "unit": "× calibration",
            "extra": "350.75ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 241.2319,
            "range": "± 6.4215",
            "unit": "× calibration",
            "extra": "7894.57ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 373.9218,
            "range": "± 6.7377",
            "unit": "× calibration",
            "extra": "12236.99ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 19.8392,
            "range": "± 0.2588",
            "unit": "× calibration",
            "extra": "649.26ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, same capture, probe shared",
            "value": 95.5297,
            "range": "± 2.0800",
            "unit": "× calibration",
            "extra": "3126.31ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 201.7252,
            "range": "± 5.9482",
            "unit": "× calibration",
            "extra": "6601.67ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 184.8774,
            "range": "± 7.2120",
            "unit": "× calibration",
            "extra": "6050.31ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 299.2477,
            "range": "± 4.6605",
            "unit": "× calibration",
            "extra": "9793.20ns  calibration: 32.73ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 15.4403,
            "range": "± 0.1066",
            "unit": "× calibration",
            "extra": "505.30ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 93.3186,
            "range": "± 3.3218",
            "unit": "× calibration",
            "extra": "3053.95ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 95.7298,
            "range": "± 2.2606",
            "unit": "× calibration",
            "extra": "3132.86ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 90.8227,
            "range": "± 1.6910",
            "unit": "× calibration",
            "extra": "2972.27ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 114.5818,
            "range": "± 2.9942",
            "unit": "× calibration",
            "extra": "3749.81ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 115.9415,
            "range": "± 1.9578",
            "unit": "× calibration",
            "extra": "3794.31ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 115.6021,
            "range": "± 2.8143",
            "unit": "× calibration",
            "extra": "3783.20ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 122.7053,
            "range": "± 2.1359",
            "unit": "× calibration",
            "extra": "4015.66ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 117.6399,
            "range": "± 2.1292",
            "unit": "× calibration",
            "extra": "3849.89ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 129.9114,
            "range": "± 5.8140",
            "unit": "× calibration",
            "extra": "4251.49ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 125.5091,
            "range": "± 4.3210",
            "unit": "× calibration",
            "extra": "4107.42ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 94.1488,
            "range": "± 1.7634",
            "unit": "× calibration",
            "extra": "3081.12ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 94.0128,
            "range": "± 2.7941",
            "unit": "× calibration",
            "extra": "3076.67ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 97.2188,
            "range": "± 1.3949",
            "unit": "× calibration",
            "extra": "3181.59ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 95.9394,
            "range": "± 2.6551",
            "unit": "× calibration",
            "extra": "3139.72ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 98.3247,
            "range": "± 1.5709",
            "unit": "× calibration",
            "extra": "3217.78ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 114.0806,
            "range": "± 1.7353",
            "unit": "× calibration",
            "extra": "3733.41ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 184.7005,
            "range": "± 23.5937",
            "unit": "× calibration",
            "extra": "6044.52ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 211.2298,
            "range": "± 18.8425",
            "unit": "× calibration",
            "extra": "6912.72ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 126.7788,
            "range": "± 4.4704",
            "unit": "× calibration",
            "extra": "4148.97ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 135.4119,
            "range": "± 2.8152",
            "unit": "× calibration",
            "extra": "4431.50ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.554,
            "range": "± 0.0150",
            "unit": "× calibration",
            "extra": "18.13ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5534,
            "range": "± 0.0119",
            "unit": "× calibration",
            "extra": "18.11ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 61.3924,
            "range": "± 2.3296",
            "unit": "× calibration",
            "extra": "2009.13ns  calibration: 32.73ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.2809,
            "range": "± 0.0205",
            "unit": "× calibration",
            "extra": "41.92ns  calibration: 32.73ns"
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
          "id": "352a6b9b461b9a78545479404b82cc47f8c75c77",
          "message": "[103] Calibrate benchmarks against an in-run native baseline (#105)\n\n* [103] Calibrate benchmarks against an in-run native baseline\n\nReport every benchmark as a ratio to a calibration workload measured in\nthe same run, instead of in raw nanoseconds. GitHub's hosted fleet\nmeasures the same commit roughly 2x apart between machines, which is far\nlarger than any change this suite exists to catch, so the alert was\ntesting runner assignment rather than the library.\n\ncalibration.bench.ts contributes two frozen native-RegExp workloads, one\nexec and one new RegExp(), and the converter divides every other\nbenchmark by their geometric mean. Two rather than one because the suite\nspans exec-bound and construction-bound benchmarks and runners do not\nscale the two identically; against the stored history the blend gives a\nlower worst-case swing than either calibrator alone. Raw nanoseconds and\nthe calibration figure stay in each point's extra, so absolute cost and\nmachine speed remain visible in the dashboard tooltip.\n\nThe converter throws when the calibration group is absent, so a dropped\nimport fails loudly rather than silently reverting to raw nanoseconds.\n\nBenchmarks that would trip the 150% threshold fall from 27/36 to 5/36,\nand the median worst consecutive-run swing from 1.61x to 1.22x. The five\nthat remain are the backreference slow-path benches, which step at\na2fcefc4 rather than drifting; that regression is real and needs its own\nissue.\n\nScout rule: add an enhancement issue template, which #103 is written\nagainst. The existing templates cover bugs, features and documentation,\nwith nothing for improving something that already works.\n\n* [103] Match the calibration workloads to the benches they recalibrate\n\nTwo fixes from review.\n\nThe construction calibrator was passing the pattern's source string where\nthe benchmark it mirrors passes a RegExp. `new RegExp(regexp)` and\n`new RegExp(string)` are different constructor paths and differ by about\n1.2x here (38.49ns against 31.39ns, medians of seven rounds), so the\nblended calibration would have come out sqrt(1.2) smaller than the one\nthe stored history was recalculated against, inflating every published\nratio by about 11% at the join. Both calibrators now match their\ncounterparts to within about 1%.\n\nThe converter also only rejected an empty calibration group. Losing one\nof the two workloads would have silently calibrated on the survivor, and\nadding a third would have silently changed the scale the other way; both\nput every ratio on a different footing from the baseline it is compared\nagainst. It now requires exactly two results and says so.\n\n* [103] Add the CHANGELOG entry the CI check requires\n\nTooling-only, but the project logs tooling changes — 1.3.0 records the\nbenchmark scenarios and the test:coverage script the same way.\n\n* [103] Drop the README's archive reference\n\nThe gh-pages archive is gone: git history and each point's tooltip\nalready hold the raw nanosecond figures.\n\n* [103] State the calibration rule as a standing invariant\n\nThe comments justified freezing the calibration group by pointing at the\none-off recalculation of the stored history. That reading expires the\nmoment this lands, and takes the rule's force with it.\n\nThe reason is permanent: every published number is a ratio to this\ngroup's geometric mean, so changing a workload or the group's membership\nputs every later result on a different scale from every earlier one.\nAlso say plainly why the two duplicate the native baselines in the\nscenario files — those stay free to change, these have to hold still —\nsince that is the other thing a reader would otherwise try to tidy up.",
          "timestamp": "2026-09-18T08:45:57+01:00",
          "tree_id": "3d5ff060f21c4ba32554dbb8e626d7efb51ab1b7",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/352a6b9b461b9a78545479404b82cc47f8c75c77"
        },
        "date": 1789717645153,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.6879,
            "range": "± 0.0026",
            "unit": "× calibration",
            "extra": "33.88ns  (min: 31.91ns  p75: 33.17ns  p99: 56.95ns)  calibration: 49.25ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4217,
            "range": "± 0.027",
            "unit": "× calibration",
            "extra": "70.02ns  (min: 67.11ns  p75: 70.72ns  p99: 92.29ns)  calibration: 49.25ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.4571,
            "range": "± 0.031",
            "unit": "× calibration",
            "extra": "71.76ns  (min: 68.71ns  p75: 72.49ns  p99: 96.58ns)  calibration: 49.25ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3873,
            "range": "± 0",
            "unit": "× calibration",
            "extra": "19.08ns  (min: 18.73ns  p75: 18.76ns  p99: 23.45ns)  calibration: 49.25ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2846,
            "range": "± 0.0205",
            "unit": "× calibration",
            "extra": "63.27ns  (min: 59.35ns  p75: 61.83ns  p99: 100.14ns)  calibration: 49.25ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2787,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "62.98ns  (min: 60.88ns  p75: 63.32ns  p99: 79.59ns)  calibration: 49.25ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 825.6541,
            "range": "± 8.8526",
            "unit": "× calibration",
            "extra": "40664.25ns  (min: 38536.00ns  p75: 40280.00ns  p99: 50905.00ns)  calibration: 49.25ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1080.6307,
            "range": "± 10.9846",
            "unit": "× calibration",
            "extra": "53222.09ns  (min: 49964.00ns  p75: 52097.00ns  p99: 97865.00ns)  calibration: 49.25ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 904.7782,
            "range": "± 9.7562",
            "unit": "× calibration",
            "extra": "44561.19ns  (min: 41091.00ns  p75: 43855.00ns  p99: 77164.00ns)  calibration: 49.25ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2252.3964,
            "range": "± 53.6842",
            "unit": "× calibration",
            "extra": "110932.66ns  (min: 104965.00ns  p75: 112136.00ns  p99: 141690.00ns)  calibration: 49.25ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.5876,
            "range": "± 0.0146",
            "unit": "× calibration",
            "extra": "275.20ns  (min: 273.26ns  p75: 274.99ns  p99: 291.52ns)  calibration: 49.25ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 21.3664,
            "range": "± 0.0837",
            "unit": "× calibration",
            "extra": "1052.32ns  (min: 1040.54ns  p75: 1053.72ns  p99: 1091.79ns)  calibration: 49.25ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 29.4595,
            "range": "± 0.0932",
            "unit": "× calibration",
            "extra": "1450.91ns  (min: 1435.78ns  p75: 1452.19ns  p99: 1493.99ns)  calibration: 49.25ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.2469,
            "range": "± 0.0213",
            "unit": "× calibration",
            "extra": "159.91ns  (min: 154.99ns  p75: 159.34ns  p99: 218.07ns)  calibration: 49.25ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.1408,
            "range": "± 0.0247",
            "unit": "× calibration",
            "extra": "302.44ns  (min: 298.16ns  p75: 302.81ns  p99: 318.75ns)  calibration: 49.25ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.9691,
            "range": "± 0.0383",
            "unit": "× calibration",
            "extra": "540.24ns  (min: 531.29ns  p75: 538.87ns  p99: 575.71ns)  calibration: 49.25ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6465,
            "range": "± 0.0027",
            "unit": "× calibration",
            "extra": "31.84ns  (min: 30.80ns  p75: 31.35ns  p99: 49.58ns)  calibration: 49.25ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0961,
            "range": "± 0.0106",
            "unit": "× calibration",
            "extra": "53.99ns  (min: 52.45ns  p75: 53.86ns  p99: 82.81ns)  calibration: 49.25ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 52.9443,
            "range": "± 0.7106",
            "unit": "× calibration",
            "extra": "2607.56ns  (min: 2413.00ns  p75: 2554.00ns  p99: 4417.00ns)  calibration: 49.25ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 50.0815,
            "range": "± 0.1668",
            "unit": "× calibration",
            "extra": "2466.56ns  (min: 2438.48ns  p75: 2468.38ns  p99: 2537.23ns)  calibration: 49.25ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5558,
            "range": "± 0.0208",
            "unit": "× calibration",
            "extra": "76.63ns  (min: 71.71ns  p75: 76.37ns  p99: 123.67ns)  calibration: 49.25ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.9997,
            "range": "± 0.0234",
            "unit": "× calibration",
            "extra": "98.49ns  (min: 92.42ns  p75: 97.26ns  p99: 169.78ns)  calibration: 49.25ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 179.5334,
            "range": "± 3.2588",
            "unit": "× calibration",
            "extra": "8842.19ns  (min: 8232.00ns  p75: 8793.00ns  p99: 15934.00ns)  calibration: 49.25ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.0407,
            "range": "± 0.027",
            "unit": "× calibration",
            "extra": "100.51ns  (min: 90.89ns  p75: 94.23ns  p99: 292.08ns)  calibration: 49.25ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 48.1772,
            "range": "± 0.8137",
            "unit": "× calibration",
            "extra": "2372.77ns  (min: 2323.05ns  p75: 2410.08ns  p99: 2535.09ns)  calibration: 49.25ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 294.1502,
            "range": "± 2.9092",
            "unit": "× calibration",
            "extra": "14487.18ns  (min: 13977.82ns  p75: 14281.74ns  p99: 14395.71ns)  calibration: 49.25ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 13246.7648,
            "range": "± 95.5718",
            "unit": "× calibration",
            "extra": "652415.77ns  (min: 627757.00ns  p75: 647917.00ns  p99: 935051.00ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.417,
            "range": "± 0.0198",
            "unit": "× calibration",
            "extra": "69.79ns  (min: 67.01ns  p75: 69.53ns  p99: 121.29ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 55.4304,
            "range": "± 0.5462",
            "unit": "× calibration",
            "extra": "2730.00ns  (min: 2674.93ns  p75: 2735.36ns  p99: 3041.20ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 65.0815,
            "range": "± 2.1987",
            "unit": "× calibration",
            "extra": "3205.33ns  (min: 3076.26ns  p75: 3301.53ns  p99: 3652.14ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1305,
            "range": "± 0.0195",
            "unit": "× calibration",
            "extra": "104.93ns  (min: 102.22ns  p75: 105.47ns  p99: 117.89ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 80.2934,
            "range": "± 0.4903",
            "unit": "× calibration",
            "extra": "3954.53ns  (min: 3906.05ns  p75: 3965.32ns  p99: 4111.19ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 91.2013,
            "range": "± 2.2671",
            "unit": "× calibration",
            "extra": "4491.75ns  (min: 4346.49ns  p75: 4598.76ns  p99: 4730.90ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3743,
            "range": "± 0.0188",
            "unit": "× calibration",
            "extra": "116.94ns  (min: 114.51ns  p75: 117.24ns  p99: 129.58ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 199.6332,
            "range": "± 5.437",
            "unit": "× calibration",
            "extra": "9832.12ns  (min: 8181.60ns  p75: 10157.93ns  p99: 11090.87ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 214.1739,
            "range": "± 4.0226",
            "unit": "× calibration",
            "extra": "10548.27ns  (min: 8942.07ns  p75: 10985.95ns  p99: 11066.18ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — native new RegExp()",
            "value": 1.4076,
            "range": "± 0.0194",
            "unit": "× calibration",
            "extra": "69.32ns  (min: 67.54ns  p75: 70.00ns  p99: 80.79ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — compilePartial()",
            "value": 94.3834,
            "range": "± 0.4786",
            "unit": "× calibration",
            "extra": "4648.47ns  (min: 4593.37ns  p75: 4649.21ns  p99: 4928.32ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — new PartialMatchRegExp()",
            "value": 108.7426,
            "range": "± 3.1489",
            "unit": "× calibration",
            "extra": "5355.68ns  (min: 5138.43ns  p75: 5471.36ns  p99: 5617.89ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — native new RegExp()",
            "value": 1.567,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "77.18ns  (min: 75.18ns  p75: 77.76ns  p99: 89.05ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — compilePartial()",
            "value": 104.4613,
            "range": "± 0.464",
            "unit": "× calibration",
            "extra": "5144.82ns  (min: 5101.03ns  p75: 5156.98ns  p99: 5264.90ns)  calibration: 49.25ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — new PartialMatchRegExp()",
            "value": 118.9628,
            "range": "± 2.4441",
            "unit": "× calibration",
            "extra": "5859.03ns  (min: 5688.35ns  p75: 5964.91ns  p99: 6037.32ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 74.2853,
            "range": "± 2.1472",
            "unit": "× calibration",
            "extra": "3658.62ns  (min: 3535.28ns  p75: 3757.14ns  p99: 4134.67ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 180.7215,
            "range": "± 3.3603",
            "unit": "× calibration",
            "extra": "8900.71ns  (min: 7862.00ns  p75: 8443.00ns  p99: 17246.00ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 166.723,
            "range": "± 1.5032",
            "unit": "× calibration",
            "extra": "8211.27ns  (min: 8066.97ns  p75: 8271.27ns  p99: 8319.36ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.0806,
            "range": "± 0.0251",
            "unit": "× calibration",
            "extra": "496.48ns  (min: 488.30ns  p75: 493.05ns  p99: 540.78ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.0425,
            "range": "± 0.0321",
            "unit": "× calibration",
            "extra": "543.85ns  (min: 535.43ns  p75: 540.53ns  p99: 589.21ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec (baseline, never asks)",
            "value": 61.9045,
            "range": "± 2.2305",
            "unit": "× calibration",
            "extra": "3048.86ns  (min: 2916.86ns  p75: 3146.41ns  p99: 3420.63ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 136.1307,
            "range": "± 1.9833",
            "unit": "× calibration",
            "extra": "6704.57ns  (min: 6441.65ns  p75: 6796.87ns  p99: 7031.87ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (complete, includes probe build)",
            "value": 138.5682,
            "range": "± 2.255",
            "unit": "× calibration",
            "extra": "6824.61ns  (min: 6535.90ns  p75: 6925.38ns  p99: 7159.81ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — incomplete match, warm probe",
            "value": 8.1066,
            "range": "± 0.0298",
            "unit": "× calibration",
            "extra": "399.26ns  (min: 391.65ns  p75: 397.96ns  p99: 440.31ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — complete match, warm probe",
            "value": 9.2823,
            "range": "± 0.0258",
            "unit": "× calibration",
            "extra": "457.16ns  (min: 450.29ns  p75: 456.21ns  p99: 497.09ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec (baseline, never asks)",
            "value": 76.0344,
            "range": "± 2.6531",
            "unit": "× calibration",
            "extra": "3744.77ns  (min: 3589.69ns  p75: 3866.76ns  p99: 4051.87ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (includes probe build)",
            "value": 206.5868,
            "range": "± 3.5634",
            "unit": "× calibration",
            "extra": "10174.59ns  (min: 8883.00ns  p75: 9464.00ns  p99: 24616.00ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 191.9399,
            "range": "± 0.7733",
            "unit": "× calibration",
            "extra": "9453.22ns  (min: 9381.36ns  p75: 9464.31ns  p99: 9581.79ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — incomplete match, warm probe",
            "value": 12.5156,
            "range": "± 0.0414",
            "unit": "× calibration",
            "extra": "616.40ns  (min: 607.10ns  p75: 615.29ns  p99: 655.03ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — complete match, warm probe",
            "value": 16.3511,
            "range": "± 0.0577",
            "unit": "× calibration",
            "extra": "805.31ns  (min: 792.15ns  p75: 799.71ns  p99: 893.10ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec (baseline, never asks)",
            "value": 62.0173,
            "range": "± 1.9725",
            "unit": "× calibration",
            "extra": "3054.41ns  (min: 2935.01ns  p75: 3140.73ns  p99: 3417.56ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 140.3023,
            "range": "± 2.868",
            "unit": "× calibration",
            "extra": "6910.02ns  (min: 6532.68ns  p75: 6989.41ns  p99: 7549.21ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (taken, includes probe build)",
            "value": 140.341,
            "range": "± 1.2164",
            "unit": "× calibration",
            "extra": "6911.93ns  (min: 6609.81ns  p75: 6967.62ns  p99: 7320.16ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — untaken atom, warm probe",
            "value": 8.1504,
            "range": "± 0.0336",
            "unit": "× calibration",
            "extra": "401.41ns  (min: 391.64ns  p75: 399.13ns  p99: 446.69ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — taken atom, warm probe",
            "value": 9.2894,
            "range": "± 0.0242",
            "unit": "× calibration",
            "extra": "457.51ns  (min: 449.19ns  p75: 454.76ns  p99: 510.00ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 202.9226,
            "range": "± 4.4202",
            "unit": "× calibration",
            "extra": "9994.13ns  (min: 8731.23ns  p75: 10156.90ns  p99: 11108.19ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 329.6124,
            "range": "± 4.1707",
            "unit": "× calibration",
            "extra": "16233.72ns  (min: 15426.32ns  p75: 15952.00ns  p99: 17298.15ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 17.0025,
            "range": "± 0.0589",
            "unit": "× calibration",
            "extra": "837.39ns  (min: 824.07ns  p75: 833.10ns  p99: 976.47ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, same capture, probe shared",
            "value": 74.9767,
            "range": "± 0.3663",
            "unit": "× calibration",
            "extra": "3692.67ns  (min: 3645.77ns  p75: 3692.09ns  p99: 3889.93ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 181.6967,
            "range": "± 2.0406",
            "unit": "× calibration",
            "extra": "8948.73ns  (min: 8122.00ns  p75: 8533.00ns  p99: 15564.00ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 171.0917,
            "range": "± 1.5223",
            "unit": "× calibration",
            "extra": "8426.43ns  (min: 8132.25ns  p75: 8453.15ns  p99: 8821.66ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 268.4121,
            "range": "± 3.324",
            "unit": "× calibration",
            "extra": "13219.55ns  (min: 12982.45ns  p75: 13368.51ns  p99: 13504.69ns)  calibration: 49.25ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 12.3222,
            "range": "± 0.0326",
            "unit": "× calibration",
            "extra": "606.88ns  (min: 599.31ns  p75: 604.88ns  p99: 648.21ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 84.2806,
            "range": "± 2.3429",
            "unit": "× calibration",
            "extra": "4150.90ns  (min: 4012.57ns  p75: 4266.60ns  p99: 4394.48ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 85.3556,
            "range": "± 2.8767",
            "unit": "× calibration",
            "extra": "4203.84ns  (min: 4055.16ns  p75: 4351.35ns  p99: 4470.40ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 83.2139,
            "range": "± 2.4122",
            "unit": "× calibration",
            "extra": "4098.36ns  (min: 3968.68ns  p75: 4216.40ns  p99: 4316.46ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 107.7413,
            "range": "± 3.0423",
            "unit": "× calibration",
            "extra": "5306.36ns  (min: 5114.34ns  p75: 5433.85ns  p99: 5587.53ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 109.2753,
            "range": "± 2.7208",
            "unit": "× calibration",
            "extra": "5381.91ns  (min: 5190.77ns  p75: 5499.40ns  p99: 5582.23ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 109.6225,
            "range": "± 2.3474",
            "unit": "× calibration",
            "extra": "5399.01ns  (min: 5198.89ns  p75: 5479.66ns  p99: 5655.56ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 114.9643,
            "range": "± 2.682",
            "unit": "× calibration",
            "extra": "5662.10ns  (min: 5477.73ns  p75: 5780.32ns  p99: 5856.68ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 109.3778,
            "range": "± 2.5013",
            "unit": "× calibration",
            "extra": "5386.96ns  (min: 5193.30ns  p75: 5484.36ns  p99: 5650.14ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 125.4342,
            "range": "± 2.1176",
            "unit": "× calibration",
            "extra": "6177.75ns  (min: 5775.47ns  p75: 6179.61ns  p99: 6575.17ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 115.2483,
            "range": "± 2.2586",
            "unit": "× calibration",
            "extra": "5676.09ns  (min: 5348.63ns  p75: 5774.50ns  p99: 6076.19ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 86.9742,
            "range": "± 2.2826",
            "unit": "× calibration",
            "extra": "4283.56ns  (min: 4153.36ns  p75: 4395.40ns  p99: 4463.17ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 85.9513,
            "range": "± 2.0887",
            "unit": "× calibration",
            "extra": "4233.18ns  (min: 4090.01ns  p75: 4320.78ns  p99: 4525.99ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 87.5551,
            "range": "± 2.7178",
            "unit": "× calibration",
            "extra": "4312.17ns  (min: 4158.98ns  p75: 4442.75ns  p99: 4518.35ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 87.3996,
            "range": "± 2.8091",
            "unit": "× calibration",
            "extra": "4304.51ns  (min: 4151.15ns  p75: 4439.60ns  p99: 4487.74ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 90.3227,
            "range": "± 3.6094",
            "unit": "× calibration",
            "extra": "4448.48ns  (min: 4161.50ns  p75: 4542.44ns  p99: 5009.67ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 103.2027,
            "range": "± 1.6936",
            "unit": "× calibration",
            "extra": "5082.83ns  (min: 4915.74ns  p75: 5142.76ns  p99: 5314.30ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 162.4862,
            "range": "± 17.0285",
            "unit": "× calibration",
            "extra": "8002.60ns  (min: 6863.55ns  p75: 8638.07ns  p99: 8916.18ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 180.0018,
            "range": "± 19.8384",
            "unit": "× calibration",
            "extra": "8865.26ns  (min: 7314.44ns  p75: 9476.24ns  p99: 9696.27ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 121.2985,
            "range": "± 2.6503",
            "unit": "× calibration",
            "extra": "5974.07ns  (min: 5707.34ns  p75: 6049.07ns  p99: 6177.42ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 127.4312,
            "range": "± 2.0285",
            "unit": "× calibration",
            "extra": "6276.11ns  (min: 6091.57ns  p75: 6348.56ns  p99: 6400.63ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5713,
            "range": "± 0.0027",
            "unit": "× calibration",
            "extra": "28.14ns  (min: 27.03ns  p75: 27.62ns  p99: 43.34ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.552,
            "range": "± 0.0026",
            "unit": "× calibration",
            "extra": "27.19ns  (min: 26.17ns  p75: 26.69ns  p99: 45.48ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 50.7855,
            "range": "± 0.2687",
            "unit": "× calibration",
            "extra": "2501.23ns  (min: 2459.63ns  p75: 2492.17ns  p99: 2993.68ns)  calibration: 49.25ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0875,
            "range": "± 0.0137",
            "unit": "× calibration",
            "extra": "53.56ns  (min: 51.74ns  p75: 53.47ns  p99: 89.15ns)  calibration: 49.25ns"
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
          "id": "ad5d5d1d826aab8674b7a29e232f7e13116674e5",
          "message": "[98] start anchors in groups (#102)\n\n* fix for start anchors in groups\n* split out documentation",
          "timestamp": "2026-09-18T08:59:58+01:00",
          "tree_id": "ad943370aee86ea4886b020e616ae0db465f110f",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/ad5d5d1d826aab8674b7a29e232f7e13116674e5"
        },
        "date": 1789718487750,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.6279,
            "range": "± 0.0073",
            "unit": "× calibration",
            "extra": "41.38ns  (min: 39.35ns  p75: 41.08ns  p99: 59.58ns)  calibration: 65.91ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.237,
            "range": "± 0.0224",
            "unit": "× calibration",
            "extra": "81.54ns  (min: 78.03ns  p75: 81.86ns  p99: 103.38ns)  calibration: 65.91ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.2718,
            "range": "± 0.0209",
            "unit": "× calibration",
            "extra": "83.83ns  (min: 80.20ns  p75: 84.55ns  p99: 103.37ns)  calibration: 65.91ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.359,
            "range": "± 0",
            "unit": "× calibration",
            "extra": "23.67ns  (min: 23.06ns  p75: 23.14ns  p99: 33.23ns)  calibration: 65.91ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.1586,
            "range": "± 0.0211",
            "unit": "× calibration",
            "extra": "76.37ns  (min: 69.71ns  p75: 74.43ns  p99: 114.05ns)  calibration: 65.91ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.1476,
            "range": "± 0.0159",
            "unit": "× calibration",
            "extra": "75.64ns  (min: 71.72ns  p75: 76.03ns  p99: 89.23ns)  calibration: 65.91ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 803.9471,
            "range": "± 4.3239",
            "unit": "× calibration",
            "extra": "52990.22ns  (min: 50676.00ns  p75: 51938.00ns  p99: 78839.00ns)  calibration: 65.91ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1135.3638,
            "range": "± 14.3599",
            "unit": "× calibration",
            "extra": "74834.75ns  (min: 70894.00ns  p75: 74009.00ns  p99: 97735.00ns)  calibration: 65.91ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 934.1429,
            "range": "± 15.8088",
            "unit": "× calibration",
            "extra": "61571.76ns  (min: 57449.00ns  p75: 61065.00ns  p99: 90100.00ns)  calibration: 65.91ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2631.0847,
            "range": "± 20.0569",
            "unit": "× calibration",
            "extra": "173421.56ns  (min: 166574.00ns  p75: 170832.00ns  p99: 278455.00ns)  calibration: 65.91ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.6314,
            "range": "± 0.0181",
            "unit": "× calibration",
            "extra": "371.18ns  (min: 367.25ns  p75: 371.60ns  p99: 386.93ns)  calibration: 65.91ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.8992,
            "range": "± 0.1148",
            "unit": "× calibration",
            "extra": "1377.52ns  (min: 1349.58ns  p75: 1381.93ns  p99: 1433.01ns)  calibration: 65.91ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 31.28,
            "range": "± 0.0914",
            "unit": "× calibration",
            "extra": "2061.75ns  (min: 2003.87ns  p75: 2069.77ns  p99: 2111.99ns)  calibration: 65.91ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.2638,
            "range": "± 0.0448",
            "unit": "× calibration",
            "extra": "215.13ns  (min: 208.82ns  p75: 218.01ns  p99: 232.02ns)  calibration: 65.91ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.7322,
            "range": "± 0.0273",
            "unit": "× calibration",
            "extra": "377.83ns  (min: 371.93ns  p75: 378.19ns  p99: 410.05ns)  calibration: 65.91ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 11.0508,
            "range": "± 0.0289",
            "unit": "× calibration",
            "extra": "728.39ns  (min: 690.89ns  p75: 724.21ns  p99: 812.61ns)  calibration: 65.91ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.628,
            "range": "± 0.0042",
            "unit": "× calibration",
            "extra": "41.39ns  (min: 40.03ns  p75: 40.84ns  p99: 62.77ns)  calibration: 65.91ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0111,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "66.64ns  (min: 64.74ns  p75: 67.75ns  p99: 87.64ns)  calibration: 65.91ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 50.243,
            "range": "± 0.3034",
            "unit": "× calibration",
            "extra": "3311.65ns  (min: 3096.00ns  p75: 3206.00ns  p99: 6412.00ns)  calibration: 65.91ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 46.5431,
            "range": "± 0.2864",
            "unit": "× calibration",
            "extra": "3067.77ns  (min: 3018.97ns  p75: 3067.46ns  p99: 3342.38ns)  calibration: 65.91ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.3916,
            "range": "± 0.0169",
            "unit": "× calibration",
            "extra": "91.72ns  (min: 87.29ns  p75: 92.37ns  p99: 115.03ns)  calibration: 65.91ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.8224,
            "range": "± 0.022",
            "unit": "× calibration",
            "extra": "120.12ns  (min: 113.90ns  p75: 120.37ns  p99: 146.58ns)  calibration: 65.91ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 167.6283,
            "range": "± 1.6765",
            "unit": "× calibration",
            "extra": "11048.81ns  (min: 10440.00ns  p75: 10831.00ns  p99: 22452.00ns)  calibration: 65.91ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.1569,
            "range": "± 0.0245",
            "unit": "× calibration",
            "extra": "142.17ns  (min: 135.10ns  p75: 142.08ns  p99: 169.37ns)  calibration: 65.91ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 43.7185,
            "range": "± 0.1911",
            "unit": "× calibration",
            "extra": "2881.60ns  (min: 2852.98ns  p75: 2888.31ns  p99: 2979.26ns)  calibration: 65.91ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 274.0215,
            "range": "± 0.6993",
            "unit": "× calibration",
            "extra": "18061.46ns  (min: 17568.09ns  p75: 17674.17ns  p99: 17915.51ns)  calibration: 65.91ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 12254.2715,
            "range": "± 47.5782",
            "unit": "× calibration",
            "extra": "807710.56ns  (min: 784269.00ns  p75: 807673.00ns  p99: 920355.00ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.5353,
            "range": "± 0.0189",
            "unit": "× calibration",
            "extra": "101.20ns  (min: 98.60ns  p75: 101.73ns  p99: 124.57ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 54.0657,
            "range": "± 0.2589",
            "unit": "× calibration",
            "extra": "3563.61ns  (min: 3516.24ns  p75: 3567.22ns  p99: 3744.57ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 64.2388,
            "range": "± 2.9047",
            "unit": "× calibration",
            "extra": "4234.14ns  (min: 4009.42ns  p75: 4403.62ns  p99: 4714.59ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1766,
            "range": "± 0.0184",
            "unit": "× calibration",
            "extra": "143.47ns  (min: 140.43ns  p75: 144.09ns  p99: 157.74ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 77.6482,
            "range": "± 0.4518",
            "unit": "× calibration",
            "extra": "5117.99ns  (min: 5066.44ns  p75: 5141.91ns  p99: 5261.84ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 88.3953,
            "range": "± 2.5722",
            "unit": "× calibration",
            "extra": "5826.36ns  (min: 5589.03ns  p75: 5959.27ns  p99: 6095.69ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3191,
            "range": "± 0.0174",
            "unit": "× calibration",
            "extra": "152.86ns  (min: 148.56ns  p75: 152.61ns  p99: 177.28ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 190.0882,
            "range": "± 6.6546",
            "unit": "× calibration",
            "extra": "12529.21ns  (min: 10735.02ns  p75: 12952.35ns  p99: 13613.66ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 222.9057,
            "range": "± 6.0244",
            "unit": "× calibration",
            "extra": "14692.29ns  (min: 11831.57ns  p75: 14408.72ns  p99: 18492.07ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — native new RegExp()",
            "value": 1.5619,
            "range": "± 0.0196",
            "unit": "× calibration",
            "extra": "102.95ns  (min: 99.75ns  p75: 103.21ns  p99: 123.44ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — compilePartial()",
            "value": 91.9333,
            "range": "± 0.2998",
            "unit": "× calibration",
            "extra": "6059.56ns  (min: 6007.02ns  p75: 6066.46ns  p99: 6133.38ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — new PartialMatchRegExp()",
            "value": 107.4331,
            "range": "± 0.7059",
            "unit": "× calibration",
            "extra": "7081.19ns  (min: 6774.57ns  p75: 7151.27ns  p99: 7208.58ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — native new RegExp()",
            "value": 1.7281,
            "range": "± 0.0192",
            "unit": "× calibration",
            "extra": "113.91ns  (min: 111.01ns  p75: 114.56ns  p99: 126.89ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — compilePartial()",
            "value": 101.1836,
            "range": "± 0.4271",
            "unit": "× calibration",
            "extra": "6669.27ns  (min: 6606.03ns  p75: 6676.83ns  p99: 6789.37ns)  calibration: 65.91ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — new PartialMatchRegExp()",
            "value": 117.2057,
            "range": "± 0.8262",
            "unit": "× calibration",
            "extra": "7725.33ns  (min: 7459.29ns  p75: 7780.59ns  p99: 7859.79ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 72.64,
            "range": "± 2.0759",
            "unit": "× calibration",
            "extra": "4787.89ns  (min: 4599.59ns  p75: 4900.92ns  p99: 5148.71ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 182.5757,
            "range": "± 2.0482",
            "unit": "× calibration",
            "extra": "12034.04ns  (min: 10750.00ns  p75: 11261.00ns  p99: 28534.00ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 168.1332,
            "range": "± 1.2107",
            "unit": "× calibration",
            "extra": "11082.09ns  (min: 10921.53ns  p75: 11132.14ns  p99: 11249.14ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.882,
            "range": "± 0.0195",
            "unit": "× calibration",
            "extra": "717.26ns  (min: 709.08ns  p75: 715.98ns  p99: 749.75ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.8536,
            "range": "± 0.0362",
            "unit": "× calibration",
            "extra": "781.30ns  (min: 774.32ns  p75: 781.06ns  p99: 815.19ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec (baseline, never asks)",
            "value": 61.5416,
            "range": "± 2.6851",
            "unit": "× calibration",
            "extra": "4056.37ns  (min: 3803.96ns  p75: 4172.39ns  p99: 4958.37ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 135.4602,
            "range": "± 1.3151",
            "unit": "× calibration",
            "extra": "8928.53ns  (min: 8657.51ns  p75: 8917.82ns  p99: 9339.91ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (complete, includes probe build)",
            "value": 135.7484,
            "range": "± 1.6412",
            "unit": "× calibration",
            "extra": "8947.53ns  (min: 8716.89ns  p75: 9018.45ns  p99: 9203.00ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — incomplete match, warm probe",
            "value": 8.463,
            "range": "± 0.0377",
            "unit": "× calibration",
            "extra": "557.82ns  (min: 548.20ns  p75: 557.67ns  p99: 603.79ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — complete match, warm probe",
            "value": 10.0132,
            "range": "± 0.0337",
            "unit": "× calibration",
            "extra": "659.99ns  (min: 648.56ns  p75: 656.93ns  p99: 710.21ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec (baseline, never asks)",
            "value": 73.2429,
            "range": "± 2.6677",
            "unit": "× calibration",
            "extra": "4827.63ns  (min: 4590.35ns  p75: 4950.44ns  p99: 5520.31ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (includes probe build)",
            "value": 184.7183,
            "range": "± 0.5995",
            "unit": "× calibration",
            "extra": "12175.26ns  (min: 12007.90ns  p75: 12200.12ns  p99: 12287.93ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 188.1054,
            "range": "± 0.7934",
            "unit": "× calibration",
            "extra": "12398.51ns  (min: 12237.33ns  p75: 12394.77ns  p99: 12572.28ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — incomplete match, warm probe",
            "value": 13.5512,
            "range": "± 0.0473",
            "unit": "× calibration",
            "extra": "893.19ns  (min: 881.03ns  p75: 890.92ns  p99: 942.03ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — complete match, warm probe",
            "value": 16.652,
            "range": "± 0.043",
            "unit": "× calibration",
            "extra": "1097.57ns  (min: 1085.59ns  p75: 1093.66ns  p99: 1177.54ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec (baseline, never asks)",
            "value": 61.0504,
            "range": "± 3.4571",
            "unit": "× calibration",
            "extra": "4023.99ns  (min: 3807.18ns  p75: 4270.26ns  p99: 4427.26ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 138.3032,
            "range": "± 1.9998",
            "unit": "× calibration",
            "extra": "9115.92ns  (min: 8848.12ns  p75: 9196.35ns  p99: 9518.08ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (taken, includes probe build)",
            "value": 141.5639,
            "range": "± 1.5926",
            "unit": "× calibration",
            "extra": "9330.84ns  (min: 9107.45ns  p75: 9365.53ns  p99: 9625.52ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — untaken atom, warm probe",
            "value": 8.7015,
            "range": "± 0.0388",
            "unit": "× calibration",
            "extra": "573.54ns  (min: 563.77ns  p75: 573.59ns  p99: 619.19ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — taken atom, warm probe",
            "value": 9.8146,
            "range": "± 0.0379",
            "unit": "× calibration",
            "extra": "646.91ns  (min: 633.10ns  p75: 643.69ns  p99: 694.78ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 191.2204,
            "range": "± 2.4337",
            "unit": "× calibration",
            "extra": "12603.83ns  (min: 11529.37ns  p75: 12862.59ns  p99: 13050.84ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 327.727,
            "range": "± 3.3378",
            "unit": "× calibration",
            "extra": "21601.33ns  (min: 18996.00ns  p75: 19887.00ns  p99: 48922.00ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 16.3583,
            "range": "± 0.0612",
            "unit": "× calibration",
            "extra": "1078.22ns  (min: 1064.40ns  p75: 1075.76ns  p99: 1172.14ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, same capture, probe shared",
            "value": 70.6226,
            "range": "± 0.2321",
            "unit": "× calibration",
            "extra": "4654.92ns  (min: 4619.18ns  p75: 4665.72ns  p99: 4708.18ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 164.551,
            "range": "± 0.9862",
            "unit": "× calibration",
            "extra": "10845.98ns  (min: 10249.00ns  p75: 10590.00ns  p99: 23634.00ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 171.1776,
            "range": "± 0.7111",
            "unit": "× calibration",
            "extra": "11282.76ns  (min: 11071.32ns  p75: 11307.14ns  p99: 11432.46ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 283.6533,
            "range": "± 3.7929",
            "unit": "× calibration",
            "extra": "18696.32ns  (min: 16241.00ns  p75: 17122.00ns  p99: 45135.00ns)  calibration: 65.91ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 10.3679,
            "range": "± 0.0238",
            "unit": "× calibration",
            "extra": "683.37ns  (min: 675.65ns  p75: 681.77ns  p99: 722.39ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 83.0789,
            "range": "± 2.6451",
            "unit": "× calibration",
            "extra": "5475.94ns  (min: 5124.00ns  p75: 5559.10ns  p99: 5864.44ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 82.1759,
            "range": "± 2.3326",
            "unit": "× calibration",
            "extra": "5416.42ns  (min: 5215.81ns  p75: 5536.61ns  p99: 5626.26ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 81.4212,
            "range": "± 2.4805",
            "unit": "× calibration",
            "extra": "5366.68ns  (min: 5111.85ns  p75: 5485.32ns  p99: 5549.17ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 106.3519,
            "range": "± 1.6687",
            "unit": "× calibration",
            "extra": "7009.93ns  (min: 6712.45ns  p75: 7137.36ns  p99: 7229.80ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 106.5692,
            "range": "± 0.9831",
            "unit": "× calibration",
            "extra": "7024.25ns  (min: 6769.21ns  p75: 7082.74ns  p99: 7195.46ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 108.6823,
            "range": "± 1.3448",
            "unit": "× calibration",
            "extra": "7163.53ns  (min: 6798.05ns  p75: 7183.51ns  p99: 7579.81ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 114.0095,
            "range": "± 1.2057",
            "unit": "× calibration",
            "extra": "7514.66ns  (min: 7208.58ns  p75: 7608.34ns  p99: 7657.82ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 107.1055,
            "range": "± 1.7174",
            "unit": "× calibration",
            "extra": "7059.60ns  (min: 6783.14ns  p75: 7198.29ns  p99: 7240.47ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 114.7986,
            "range": "± 2.7938",
            "unit": "× calibration",
            "extra": "7566.67ns  (min: 7105.70ns  p75: 7730.44ns  p99: 7879.29ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 112.0156,
            "range": "± 2.6164",
            "unit": "× calibration",
            "extra": "7383.24ns  (min: 7073.30ns  p75: 7547.78ns  p99: 7715.02ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 82.7191,
            "range": "± 2.6071",
            "unit": "× calibration",
            "extra": "5452.23ns  (min: 5223.36ns  p75: 5589.56ns  p99: 5697.07ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 81.6744,
            "range": "± 2.0194",
            "unit": "× calibration",
            "extra": "5383.37ns  (min: 5199.69ns  p75: 5493.23ns  p99: 5615.12ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 82.9311,
            "range": "± 2.127",
            "unit": "× calibration",
            "extra": "5466.20ns  (min: 5265.32ns  p75: 5577.50ns  p99: 5730.62ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 82.7258,
            "range": "± 2.2625",
            "unit": "× calibration",
            "extra": "5452.67ns  (min: 5231.64ns  p75: 5573.47ns  p99: 5725.23ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 84.5249,
            "range": "± 2.4559",
            "unit": "× calibration",
            "extra": "5571.26ns  (min: 5315.14ns  p75: 5672.37ns  p99: 5749.43ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 100.2447,
            "range": "± 2.2692",
            "unit": "× calibration",
            "extra": "6607.39ns  (min: 6376.30ns  p75: 6711.58ns  p99: 6781.16ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 155.1678,
            "range": "± 13.6506",
            "unit": "× calibration",
            "extra": "10227.51ns  (min: 8924.56ns  p75: 10983.39ns  p99: 11040.19ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 175.1314,
            "range": "± 10.9037",
            "unit": "× calibration",
            "extra": "11543.36ns  (min: 9712.98ns  p75: 11933.88ns  p99: 12522.89ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 117.0703,
            "range": "± 0.9463",
            "unit": "× calibration",
            "extra": "7716.40ns  (min: 7406.75ns  p75: 7747.16ns  p99: 7955.06ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 122.3958,
            "range": "± 0.8976",
            "unit": "× calibration",
            "extra": "8067.43ns  (min: 7753.04ns  p75: 8144.08ns  p99: 8196.40ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.5631,
            "range": "± 0.0025",
            "unit": "× calibration",
            "extra": "37.11ns  (min: 35.72ns  p75: 36.35ns  p99: 62.28ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.536,
            "range": "± 0.0022",
            "unit": "× calibration",
            "extra": "35.33ns  (min: 33.95ns  p75: 34.53ns  p99: 59.47ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 46.6579,
            "range": "± 0.2596",
            "unit": "× calibration",
            "extra": "3075.34ns  (min: 3040.90ns  p75: 3085.49ns  p99: 3163.49ns)  calibration: 65.91ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0502,
            "range": "± 0.0202",
            "unit": "× calibration",
            "extra": "69.22ns  (min: 66.78ns  p75: 69.96ns  p99: 102.85ns)  calibration: 65.91ns"
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
          "id": "eda95224c6afb8ed6299a61394a8aa641c644cb7",
          "message": "[106] Fix BackReference path performance regression (#107)\n\n* fix regression",
          "timestamp": "2026-09-21T11:08:51+01:00",
          "tree_id": "b4e93c1c242446e451c7191900600a5ef6c48b7b",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/eda95224c6afb8ed6299a61394a8aa641c644cb7"
        },
        "date": 1789985424145,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.7122,
            "range": "± 0.0239",
            "unit": "× calibration",
            "extra": "35.76ns  (min: 30.79ns  p75: 36.34ns  p99: 57.71ns)  calibration: 50.20ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.3367,
            "range": "± 0.0268",
            "unit": "× calibration",
            "extra": "67.11ns  (min: 62.48ns  p75: 68.01ns  p99: 89.74ns)  calibration: 50.20ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3599,
            "range": "± 0.0293",
            "unit": "× calibration",
            "extra": "68.27ns  (min: 63.29ns  p75: 69.14ns  p99: 91.14ns)  calibration: 50.20ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.4495,
            "range": "± 0.0124",
            "unit": "× calibration",
            "extra": "22.57ns  (min: 19.59ns  p75: 22.95ns  p99: 33.11ns)  calibration: 50.20ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2862,
            "range": "± 0.0873",
            "unit": "× calibration",
            "extra": "64.57ns  (min: 53.70ns  p75: 67.22ns  p99: 98.15ns)  calibration: 50.20ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2731,
            "range": "± 0.0674",
            "unit": "× calibration",
            "extra": "63.92ns  (min: 55.57ns  p75: 66.60ns  p99: 93.35ns)  calibration: 50.20ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 878.7709,
            "range": "± 13.0229",
            "unit": "× calibration",
            "extra": "44118.33ns  (min: 42429.18ns  p75: 44399.30ns  p99: 45824.37ns)  calibration: 50.20ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1213.3074,
            "range": "± 114.5115",
            "unit": "× calibration",
            "extra": "60913.59ns  (min: 49844.00ns  p75: 64429.00ns  p99: 111580.00ns)  calibration: 50.20ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 1045.7574,
            "range": "± 35.4251",
            "unit": "× calibration",
            "extra": "52501.81ns  (min: 41551.00ns  p75: 53166.00ns  p99: 75815.00ns)  calibration: 50.20ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2283.3557,
            "range": "± 75.76",
            "unit": "× calibration",
            "extra": "114634.92ns  (min: 105239.00ns  p75: 116738.00ns  p99: 152350.00ns)  calibration: 50.20ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.9138,
            "range": "± 0.0672",
            "unit": "× calibration",
            "extra": "296.90ns  (min: 282.51ns  p75: 298.90ns  p99: 311.02ns)  calibration: 50.20ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.9408,
            "range": "± 0.1842",
            "unit": "× calibration",
            "extra": "1051.33ns  (min: 996.08ns  p75: 1026.77ns  p99: 1466.76ns)  calibration: 50.20ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 31.3798,
            "range": "± 0.2777",
            "unit": "× calibration",
            "extra": "1575.41ns  (min: 1547.04ns  p75: 1585.79ns  p99: 1629.42ns)  calibration: 50.20ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.288,
            "range": "± 0.0475",
            "unit": "× calibration",
            "extra": "165.07ns  (min: 154.80ns  p75: 166.86ns  p99: 180.53ns)  calibration: 50.20ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.9373,
            "range": "± 0.0641",
            "unit": "× calibration",
            "extra": "298.08ns  (min: 283.80ns  p75: 299.45ns  p99: 317.14ns)  calibration: 50.20ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 12.0496,
            "range": "± 0.2057",
            "unit": "× calibration",
            "extra": "604.94ns  (min: 567.76ns  p75: 599.01ns  p99: 897.39ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6734,
            "range": "± 0.0373",
            "unit": "× calibration",
            "extra": "33.81ns  (min: 28.93ns  p75: 34.77ns  p99: 58.30ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0085,
            "range": "± 0.0434",
            "unit": "× calibration",
            "extra": "50.63ns  (min: 44.77ns  p75: 51.71ns  p99: 82.36ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 36.401,
            "range": "± 0.6107",
            "unit": "× calibration",
            "extra": "1827.50ns  (min: 1554.06ns  p75: 1647.99ns  p99: 3771.07ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 35.3999,
            "range": "± 0.3575",
            "unit": "× calibration",
            "extra": "1777.24ns  (min: 1545.26ns  p75: 1599.73ns  p99: 3483.72ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.4996,
            "range": "± 0.047",
            "unit": "× calibration",
            "extra": "75.29ns  (min: 68.94ns  p75: 76.87ns  p99: 105.85ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.8596,
            "range": "± 0.0589",
            "unit": "× calibration",
            "extra": "93.36ns  (min: 86.75ns  p75: 95.45ns  p99: 125.19ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 144.1669,
            "range": "± 2.2807",
            "unit": "× calibration",
            "extra": "7237.84ns  (min: 6098.00ns  p75: 6527.00ns  p99: 11006.00ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.1177,
            "range": "± 0.1074",
            "unit": "× calibration",
            "extra": "106.32ns  (min: 90.77ns  p75: 110.84ns  p99: 134.63ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 51.2384,
            "range": "± 1.9321",
            "unit": "× calibration",
            "extra": "2572.40ns  (min: 2195.00ns  p75: 2484.00ns  p99: 3957.00ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — capture agreement, irrelevant input ahead of the match — 4-character input",
            "value": 90.4728,
            "range": "± 9.9781",
            "unit": "× calibration",
            "extra": "4542.15ns  (min: 4078.19ns  p75: 5112.26ns  p99: 5353.02ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — capture agreement, irrelevant input ahead of the match — 10004-character input",
            "value": 547.4691,
            "range": "± 11.5895",
            "unit": "× calibration",
            "extra": "27485.46ns  (min: 26843.45ns  p75: 28031.32ns  p99: 28206.63ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 203.1439,
            "range": "± 16.0119",
            "unit": "× calibration",
            "extra": "10198.76ns  (min: 9113.17ns  p75: 10771.28ns  p99: 10866.93ns)  calibration: 50.20ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 11247.2378,
            "range": "± 141.1325",
            "unit": "× calibration",
            "extra": "564662.88ns  (min: 480220.00ns  p75: 503808.00ns  p99: 907397.00ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.3652,
            "range": "± 0.0313",
            "unit": "× calibration",
            "extra": "68.54ns  (min: 64.29ns  p75: 69.50ns  p99: 83.03ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 57.2107,
            "range": "± 0.3928",
            "unit": "× calibration",
            "extra": "2872.24ns  (min: 2809.43ns  p75: 2873.61ns  p99: 3144.73ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 66.3726,
            "range": "± 1.987",
            "unit": "× calibration",
            "extra": "3332.21ns  (min: 3208.34ns  p75: 3435.53ns  p99: 3622.42ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.1418,
            "range": "± 0.0237",
            "unit": "× calibration",
            "extra": "107.53ns  (min: 102.59ns  p75: 107.93ns  p99: 126.09ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 84.2991,
            "range": "± 0.5598",
            "unit": "× calibration",
            "extra": "4232.20ns  (min: 4154.96ns  p75: 4230.03ns  p99: 4589.32ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 93.8024,
            "range": "± 2.4959",
            "unit": "× calibration",
            "extra": "4709.31ns  (min: 4522.35ns  p75: 4824.94ns  p99: 4970.39ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.3823,
            "range": "± 0.0266",
            "unit": "× calibration",
            "extra": "119.60ns  (min: 113.87ns  p75: 119.89ns  p99: 137.55ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 190.0476,
            "range": "± 1.2369",
            "unit": "× calibration",
            "extra": "9541.26ns  (min: 8110.40ns  p75: 9639.53ns  p99: 10164.71ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 201.3149,
            "range": "± 1.4519",
            "unit": "× calibration",
            "extra": "10106.93ns  (min: 8781.35ns  p75: 10352.32ns  p99: 10383.75ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — native new RegExp()",
            "value": 1.4303,
            "range": "± 0.0302",
            "unit": "× calibration",
            "extra": "71.81ns  (min: 66.26ns  p75: 72.50ns  p99: 88.95ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — compilePartial()",
            "value": 95.7431,
            "range": "± 0.3562",
            "unit": "× calibration",
            "extra": "4806.74ns  (min: 4732.18ns  p75: 4808.97ns  p99: 4853.24ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — new PartialMatchRegExp()",
            "value": 108.3394,
            "range": "± 2.3259",
            "unit": "× calibration",
            "extra": "5439.13ns  (min: 5250.71ns  p75: 5531.12ns  p99: 5696.59ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — native new RegExp()",
            "value": 1.6723,
            "range": "± 0.0394",
            "unit": "× calibration",
            "extra": "83.96ns  (min: 78.86ns  p75: 84.96ns  p99: 101.61ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — compilePartial()",
            "value": 107.7402,
            "range": "± 0.559",
            "unit": "× calibration",
            "extra": "5409.05ns  (min: 5352.48ns  p75: 5431.91ns  p99: 5468.04ns)  calibration: 50.20ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — new PartialMatchRegExp()",
            "value": 120.0814,
            "range": "± 3.2863",
            "unit": "× calibration",
            "extra": "6028.64ns  (min: 5795.72ns  p75: 6179.19ns  p99: 6215.37ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 74.6784,
            "range": "± 1.5829",
            "unit": "× calibration",
            "extra": "3749.20ns  (min: 3633.40ns  p75: 3819.86ns  p99: 3941.43ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 178.5,
            "range": "± 3.3762",
            "unit": "× calibration",
            "extra": "8961.52ns  (min: 8015.00ns  p75: 8568.00ns  p99: 17814.00ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 169.7218,
            "range": "± 1.1307",
            "unit": "× calibration",
            "extra": "8520.81ns  (min: 8346.82ns  p75: 8540.21ns  p99: 8762.88ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.8144,
            "range": "± 0.0787",
            "unit": "× calibration",
            "extra": "542.93ns  (min: 525.74ns  p75: 543.09ns  p99: 582.45ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.4753,
            "range": "± 0.1013",
            "unit": "× calibration",
            "extra": "576.11ns  (min: 561.87ns  p75: 579.42ns  p99: 619.08ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec (baseline, never asks)",
            "value": 63.8653,
            "range": "± 1.1683",
            "unit": "× calibration",
            "extra": "3206.33ns  (min: 3109.98ns  p75: 3251.84ns  p99: 3437.66ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 132.2287,
            "range": "± 1.3727",
            "unit": "× calibration",
            "extra": "6638.49ns  (min: 6449.64ns  p75: 6662.07ns  p99: 6936.22ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (complete, includes probe build)",
            "value": 134.238,
            "range": "± 1.3129",
            "unit": "× calibration",
            "extra": "6739.36ns  (min: 6503.52ns  p75: 6818.09ns  p99: 6905.31ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — incomplete match, warm probe",
            "value": 8.4946,
            "range": "± 0.0807",
            "unit": "× calibration",
            "extra": "426.47ns  (min: 411.44ns  p75: 427.35ns  p99: 458.98ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — complete match, warm probe",
            "value": 10.2113,
            "range": "± 0.1415",
            "unit": "× calibration",
            "extra": "512.66ns  (min: 479.64ns  p75: 502.74ns  p99: 798.52ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec (baseline, never asks)",
            "value": 75.1137,
            "range": "± 2.05",
            "unit": "× calibration",
            "extra": "3771.05ns  (min: 3624.80ns  p75: 3855.13ns  p99: 4128.31ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (includes probe build)",
            "value": 187.2468,
            "range": "± 1.0804",
            "unit": "× calibration",
            "extra": "9400.65ns  (min: 9217.75ns  p75: 9416.25ns  p99: 9558.87ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 192.1878,
            "range": "± 0.7763",
            "unit": "× calibration",
            "extra": "9648.71ns  (min: 9553.67ns  p75: 9655.26ns  p99: 9711.18ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — incomplete match, warm probe",
            "value": 13.805,
            "range": "± 0.1666",
            "unit": "× calibration",
            "extra": "693.07ns  (min: 662.96ns  p75: 690.71ns  p99: 847.91ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — complete match, warm probe",
            "value": 17.399,
            "range": "± 0.1013",
            "unit": "× calibration",
            "extra": "873.51ns  (min: 855.74ns  p75: 872.16ns  p99: 1055.06ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec (baseline, never asks)",
            "value": 64.7056,
            "range": "± 1.5186",
            "unit": "× calibration",
            "extra": "3248.52ns  (min: 3126.87ns  p75: 3304.81ns  p99: 3558.66ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 138.3386,
            "range": "± 1.7347",
            "unit": "× calibration",
            "extra": "6945.23ns  (min: 6615.70ns  p75: 6983.05ns  p99: 7355.99ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (taken, includes probe build)",
            "value": 138.2479,
            "range": "± 2.0343",
            "unit": "× calibration",
            "extra": "6940.68ns  (min: 6672.60ns  p75: 7041.10ns  p99: 7335.12ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — untaken atom, warm probe",
            "value": 8.7309,
            "range": "± 0.1061",
            "unit": "× calibration",
            "extra": "438.33ns  (min: 417.23ns  p75: 441.56ns  p99: 503.09ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — taken atom, warm probe",
            "value": 10.1701,
            "range": "± 0.1037",
            "unit": "× calibration",
            "extra": "510.59ns  (min: 486.30ns  p75: 512.68ns  p99: 595.47ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 172.4719,
            "range": "± 15.5151",
            "unit": "× calibration",
            "extra": "8658.88ns  (min: 7555.89ns  p75: 9264.88ns  p99: 9394.99ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 293.0978,
            "range": "± 2.7679",
            "unit": "× calibration",
            "extra": "14714.85ns  (min: 14119.01ns  p75: 14532.04ns  p99: 14832.42ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 15.9997,
            "range": "± 0.0803",
            "unit": "× calibration",
            "extra": "803.26ns  (min: 785.23ns  p75: 801.01ns  p99: 931.39ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, same capture, probe shared",
            "value": 57.6554,
            "range": "± 0.4455",
            "unit": "× calibration",
            "extra": "2894.57ns  (min: 2708.91ns  p75: 2766.87ns  p99: 3665.01ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 155.8121,
            "range": "± 1.5636",
            "unit": "× calibration",
            "extra": "7822.48ns  (min: 7278.00ns  p75: 7617.00ns  p99: 12653.00ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 163.7844,
            "range": "± 1.5461",
            "unit": "× calibration",
            "extra": "8222.73ns  (min: 8016.91ns  p75: 8311.45ns  p99: 8340.35ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 249.8858,
            "range": "± 0.4711",
            "unit": "× calibration",
            "extra": "12545.41ns  (min: 12343.04ns  p75: 12441.73ns  p99: 12954.84ns)  calibration: 50.20ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 10.3819,
            "range": "± 0.088",
            "unit": "× calibration",
            "extra": "521.22ns  (min: 504.71ns  p75: 523.12ns  p99: 555.72ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 88.2419,
            "range": "± 2.1605",
            "unit": "× calibration",
            "extra": "4430.15ns  (min: 4277.71ns  p75: 4523.87ns  p99: 4706.95ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 88.1988,
            "range": "± 2.0364",
            "unit": "× calibration",
            "extra": "4427.98ns  (min: 4290.40ns  p75: 4521.26ns  p99: 4642.33ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 86.8405,
            "range": "± 2.3038",
            "unit": "× calibration",
            "extra": "4359.79ns  (min: 4214.22ns  p75: 4472.68ns  p99: 4614.18ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 110.7834,
            "range": "± 1.6121",
            "unit": "× calibration",
            "extra": "5561.83ns  (min: 5402.26ns  p75: 5630.95ns  p99: 5690.35ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 112.8415,
            "range": "± 2.2353",
            "unit": "× calibration",
            "extra": "5665.16ns  (min: 5486.27ns  p75: 5741.95ns  p99: 5863.71ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 114.109,
            "range": "± 3.1168",
            "unit": "× calibration",
            "extra": "5728.80ns  (min: 5514.85ns  p75: 5849.27ns  p99: 6016.17ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 119.9185,
            "range": "± 3.5476",
            "unit": "× calibration",
            "extra": "6020.46ns  (min: 5728.87ns  p75: 6157.50ns  p99: 6312.78ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 113.5785,
            "range": "± 2.4197",
            "unit": "× calibration",
            "extra": "5702.16ns  (min: 5519.73ns  p75: 5809.08ns  p99: 5891.74ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 120.3263,
            "range": "± 2.4647",
            "unit": "× calibration",
            "extra": "6040.93ns  (min: 5727.50ns  p75: 6182.14ns  p99: 6329.78ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 116.9269,
            "range": "± 2.5336",
            "unit": "× calibration",
            "extra": "5870.27ns  (min: 5537.44ns  p75: 6019.68ns  p99: 6240.39ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 90.6115,
            "range": "± 1.9787",
            "unit": "× calibration",
            "extra": "4549.11ns  (min: 4398.62ns  p75: 4641.78ns  p99: 4715.06ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 89.6906,
            "range": "± 2.0724",
            "unit": "× calibration",
            "extra": "4502.88ns  (min: 4362.52ns  p75: 4607.82ns  p99: 4657.01ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 90.1521,
            "range": "± 2.1899",
            "unit": "× calibration",
            "extra": "4526.05ns  (min: 4366.25ns  p75: 4628.30ns  p99: 4726.84ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 92.4665,
            "range": "± 2.4337",
            "unit": "× calibration",
            "extra": "4642.24ns  (min: 4367.14ns  p75: 4667.77ns  p99: 5387.87ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 89.9211,
            "range": "± 2.0405",
            "unit": "× calibration",
            "extra": "4514.45ns  (min: 4379.36ns  p75: 4607.58ns  p99: 4701.79ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 106.3168,
            "range": "± 3.2541",
            "unit": "× calibration",
            "extra": "5337.59ns  (min: 5126.29ns  p75: 5472.44ns  p99: 5536.01ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 158.6038,
            "range": "± 15.9422",
            "unit": "× calibration",
            "extra": "7962.64ns  (min: 6853.44ns  p75: 8560.36ns  p99: 8789.37ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 182.2283,
            "range": "± 6.8953",
            "unit": "× calibration",
            "extra": "9148.69ns  (min: 7521.60ns  p75: 9428.23ns  p99: 10125.02ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 119.806,
            "range": "± 3.1684",
            "unit": "× calibration",
            "extra": "6014.81ns  (min: 5773.08ns  p75: 6148.50ns  p99: 6261.69ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 129.2323,
            "range": "± 1.3257",
            "unit": "× calibration",
            "extra": "6488.05ns  (min: 6291.26ns  p75: 6555.11ns  p99: 6575.46ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.613,
            "range": "± 0.0223",
            "unit": "× calibration",
            "extra": "30.77ns  (min: 26.31ns  p75: 31.05ns  p99: 54.44ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5556,
            "range": "± 0.0188",
            "unit": "× calibration",
            "extra": "27.89ns  (min: 24.64ns  p75: 28.04ns  p99: 52.72ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 35.4054,
            "range": "± 0.4421",
            "unit": "× calibration",
            "extra": "1777.51ns  (min: 1560.93ns  p75: 1620.91ns  p99: 3299.37ns)  calibration: 50.20ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0477,
            "range": "± 0.0521",
            "unit": "× calibration",
            "extra": "52.60ns  (min: 47.02ns  p75: 54.62ns  p99: 78.60ns)  calibration: 50.20ns"
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
          "id": "2232b66a8e3ba228d119bceb0e61daa21c97ca02",
          "message": "[108] Add TypeCheck to CI, Fix TS error with identity escapes, avoid release-invariancy in CHANGELOG etc. (#109)\n\n* add typecheck command\n* fix typescript complaint about non-existent backreference\n* update actions/setup-node & actions/create-github-app-token\n* purge CHANGELOG of bundle-agnostic changes\n* add integrity comparison for detecting semver-worthy PRs",
          "timestamp": "2026-09-22T08:19:44+01:00",
          "tree_id": "7104646d8c5a26264401e312bb8f3b83a5df1857",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/2232b66a8e3ba228d119bceb0e61daa21c97ca02"
        },
        "date": 1790061680632,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.744,
            "range": "± 0.0308",
            "unit": "× calibration",
            "extra": "36.72ns  (min: 31.63ns  p75: 37.47ns  p99: 59.06ns)  calibration: 49.36ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.4434,
            "range": "± 0.066",
            "unit": "× calibration",
            "extra": "71.24ns  (min: 63.51ns  p75: 73.76ns  p99: 100.38ns)  calibration: 49.36ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.5032,
            "range": "± 0.0715",
            "unit": "× calibration",
            "extra": "74.20ns  (min: 66.53ns  p75: 77.00ns  p99: 107.63ns)  calibration: 49.36ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.463,
            "range": "± 0.0098",
            "unit": "× calibration",
            "extra": "22.85ns  (min: 19.72ns  p75: 23.25ns  p99: 25.16ns)  calibration: 49.36ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.3025,
            "range": "± 0.0943",
            "unit": "× calibration",
            "extra": "64.29ns  (min: 54.25ns  p75: 67.31ns  p99: 98.37ns)  calibration: 49.36ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.2999,
            "range": "± 0.0794",
            "unit": "× calibration",
            "extra": "64.16ns  (min: 55.27ns  p75: 67.62ns  p99: 81.49ns)  calibration: 49.36ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 1030.6617,
            "range": "± 93.3482",
            "unit": "× calibration",
            "extra": "50871.59ns  (min: 39121.00ns  p75: 53624.00ns  p99: 67710.00ns)  calibration: 49.36ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1234.3734,
            "range": "± 179.4231",
            "unit": "× calibration",
            "extra": "60926.43ns  (min: 48173.00ns  p75: 68872.00ns  p99: 94082.00ns)  calibration: 49.36ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 1059.7524,
            "range": "± 111.1771",
            "unit": "× calibration",
            "extra": "52307.46ns  (min: 44260.00ns  p75: 57519.00ns  p99: 75748.00ns)  calibration: 49.36ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2393.3539,
            "range": "± 122.2594",
            "unit": "× calibration",
            "extra": "118131.60ns  (min: 104422.00ns  p75: 121505.00ns  p99: 227924.00ns)  calibration: 49.36ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 6.0011,
            "range": "± 0.0816",
            "unit": "× calibration",
            "extra": "296.21ns  (min: 280.81ns  p75: 299.83ns  p99: 313.29ns)  calibration: 49.36ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 20.6768,
            "range": "± 0.1286",
            "unit": "× calibration",
            "extra": "1020.57ns  (min: 1000.35ns  p75: 1024.81ns  p99: 1064.12ns)  calibration: 49.36ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 32.4376,
            "range": "± 0.3454",
            "unit": "× calibration",
            "extra": "1601.06ns  (min: 1559.68ns  p75: 1613.47ns  p99: 1666.95ns)  calibration: 49.36ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.3906,
            "range": "± 0.0634",
            "unit": "× calibration",
            "extra": "167.35ns  (min: 156.34ns  p75: 169.32ns  p99: 196.50ns)  calibration: 49.36ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 6.0862,
            "range": "± 0.0595",
            "unit": "× calibration",
            "extra": "300.40ns  (min: 288.37ns  p75: 302.81ns  p99: 316.95ns)  calibration: 49.36ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 12.1883,
            "range": "± 0.1766",
            "unit": "× calibration",
            "extra": "601.59ns  (min: 572.53ns  p75: 604.13ns  p99: 679.45ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.7382,
            "range": "± 0.0212",
            "unit": "× calibration",
            "extra": "36.44ns  (min: 33.15ns  p75: 36.21ns  p99: 63.48ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0959,
            "range": "± 0.0742",
            "unit": "× calibration",
            "extra": "54.09ns  (min: 47.22ns  p75: 57.12ns  p99: 78.05ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 36.8812,
            "range": "± 0.4704",
            "unit": "× calibration",
            "extra": "1820.39ns  (min: 1575.66ns  p75: 1647.69ns  p99: 3704.70ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 36.5718,
            "range": "± 0.3498",
            "unit": "× calibration",
            "extra": "1805.12ns  (min: 1577.95ns  p75: 1630.10ns  p99: 3644.01ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.5767,
            "range": "± 0.058",
            "unit": "× calibration",
            "extra": "77.82ns  (min: 72.14ns  p75: 80.13ns  p99: 117.39ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.9603,
            "range": "± 0.0777",
            "unit": "× calibration",
            "extra": "96.76ns  (min: 89.25ns  p75: 99.76ns  p99: 136.41ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 150.9254,
            "range": "± 3.971",
            "unit": "× calibration",
            "extra": "7449.40ns  (min: 6068.00ns  p75: 6725.00ns  p99: 11079.00ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.7258,
            "range": "± 0.098",
            "unit": "× calibration",
            "extra": "134.54ns  (min: 102.64ns  p75: 139.18ns  p99: 176.73ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 54.9587,
            "range": "± 3.9406",
            "unit": "× calibration",
            "extra": "2712.66ns  (min: 2212.00ns  p75: 2713.00ns  p99: 4095.00ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — capture agreement, irrelevant input ahead of the match — 4-character input",
            "value": 94.3045,
            "range": "± 12.3596",
            "unit": "× calibration",
            "extra": "4654.70ns  (min: 4138.40ns  p75: 5378.88ns  p99: 5600.91ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — capture agreement, irrelevant input ahead of the match — 10004-character input",
            "value": 561.1561,
            "range": "± 12.2039",
            "unit": "× calibration",
            "extra": "27697.64ns  (min: 26861.50ns  p75: 28094.39ns  p99: 28298.46ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 209.4301,
            "range": "± 16.2595",
            "unit": "× calibration",
            "extra": "10337.09ns  (min: 9116.06ns  p75: 10950.09ns  p99: 11043.23ns)  calibration: 49.36ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 11736.1891,
            "range": "± 118.7138",
            "unit": "× calibration",
            "extra": "579276.99ns  (min: 484435.00ns  p75: 505410.00ns  p99: 900285.00ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.471,
            "range": "± 0.0405",
            "unit": "× calibration",
            "extra": "72.61ns  (min: 65.35ns  p75: 73.18ns  p99: 121.84ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 60.6509,
            "range": "± 0.753",
            "unit": "× calibration",
            "extra": "2993.62ns  (min: 2906.87ns  p75: 3004.51ns  p99: 3421.96ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 68.9147,
            "range": "± 2.4172",
            "unit": "× calibration",
            "extra": "3401.50ns  (min: 3232.30ns  p75: 3523.77ns  p99: 3709.24ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.2043,
            "range": "± 0.0265",
            "unit": "× calibration",
            "extra": "108.80ns  (min: 102.86ns  p75: 108.75ns  p99: 131.99ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 83.9952,
            "range": "± 0.6669",
            "unit": "× calibration",
            "extra": "4145.85ns  (min: 4088.60ns  p75: 4167.59ns  p99: 4229.48ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 95.7746,
            "range": "± 2.5145",
            "unit": "× calibration",
            "extra": "4727.26ns  (min: 4567.78ns  p75: 4848.19ns  p99: 4976.49ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.4951,
            "range": "± 0.0551",
            "unit": "× calibration",
            "extra": "123.16ns  (min: 114.33ns  p75: 123.23ns  p99: 186.85ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 202.3353,
            "range": "± 2.5702",
            "unit": "× calibration",
            "extra": "9986.90ns  (min: 8495.00ns  p75: 10263.77ns  p99: 10559.90ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 215.7737,
            "range": "± 1.5695",
            "unit": "× calibration",
            "extra": "10650.20ns  (min: 9206.78ns  p75: 10966.18ns  p99: 11052.51ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — native new RegExp()",
            "value": 1.5446,
            "range": "± 0.0462",
            "unit": "× calibration",
            "extra": "76.24ns  (min: 67.85ns  p75: 75.36ns  p99: 141.31ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — compilePartial()",
            "value": 100.2586,
            "range": "± 0.5685",
            "unit": "× calibration",
            "extra": "4948.58ns  (min: 4878.17ns  p75: 4968.38ns  p99: 5017.15ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — new PartialMatchRegExp()",
            "value": 112.2536,
            "range": "± 3.4978",
            "unit": "× calibration",
            "extra": "5540.63ns  (min: 5309.61ns  p75: 5704.16ns  p99: 5773.54ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — native new RegExp()",
            "value": 1.7129,
            "range": "± 0.0385",
            "unit": "× calibration",
            "extra": "84.54ns  (min: 79.13ns  p75: 85.33ns  p99: 103.84ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — compilePartial()",
            "value": 110.9949,
            "range": "± 0.9333",
            "unit": "× calibration",
            "extra": "5478.51ns  (min: 5355.86ns  p75: 5513.59ns  p99: 5647.63ns)  calibration: 49.36ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — new PartialMatchRegExp()",
            "value": 126.237,
            "range": "± 3.4974",
            "unit": "× calibration",
            "extra": "6230.83ns  (min: 5944.77ns  p75: 6321.65ns  p99: 6972.44ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 77.35,
            "range": "± 1.9737",
            "unit": "× calibration",
            "extra": "3817.86ns  (min: 3684.80ns  p75: 3916.98ns  p99: 4084.56ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 180.6135,
            "range": "± 4.9435",
            "unit": "× calibration",
            "extra": "8914.76ns  (min: 7992.00ns  p75: 8707.00ns  p99: 16777.00ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 172.0693,
            "range": "± 1.9362",
            "unit": "× calibration",
            "extra": "8493.03ns  (min: 8321.28ns  p75: 8583.40ns  p99: 8624.83ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 10.962,
            "range": "± 0.0769",
            "unit": "× calibration",
            "extra": "541.06ns  (min: 521.59ns  p75: 537.73ns  p99: 661.70ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.8057,
            "range": "± 0.0805",
            "unit": "× calibration",
            "extra": "582.71ns  (min: 566.39ns  p75: 584.65ns  p99: 644.05ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec (baseline, never asks)",
            "value": 65.4441,
            "range": "± 1.542",
            "unit": "× calibration",
            "extra": "3230.20ns  (min: 3105.41ns  p75: 3294.81ns  p99: 3555.93ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 136.4938,
            "range": "± 1.2914",
            "unit": "× calibration",
            "extra": "6737.09ns  (min: 6468.63ns  p75: 6744.97ns  p99: 7145.94ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (complete, includes probe build)",
            "value": 136.8256,
            "range": "± 1.5235",
            "unit": "× calibration",
            "extra": "6753.46ns  (min: 6536.07ns  p75: 6762.94ns  p99: 7049.64ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — incomplete match, warm probe",
            "value": 8.7969,
            "range": "± 0.1405",
            "unit": "× calibration",
            "extra": "434.20ns  (min: 413.02ns  p75: 437.29ns  p99: 548.50ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — complete match, warm probe",
            "value": 10.1274,
            "range": "± 0.1016",
            "unit": "× calibration",
            "extra": "499.87ns  (min: 482.06ns  p75: 501.23ns  p99: 562.71ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec (baseline, never asks)",
            "value": 78.5268,
            "range": "± 2.4015",
            "unit": "× calibration",
            "extra": "3875.94ns  (min: 3701.01ns  p75: 3986.65ns  p99: 4263.62ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (includes probe build)",
            "value": 192.4744,
            "range": "± 0.7748",
            "unit": "× calibration",
            "extra": "9500.19ns  (min: 9374.97ns  p75: 9502.76ns  p99: 9604.14ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 195.2942,
            "range": "± 1.3356",
            "unit": "× calibration",
            "extra": "9639.37ns  (min: 9498.90ns  p75: 9659.96ns  p99: 9899.61ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — incomplete match, warm probe",
            "value": 13.5289,
            "range": "± 0.1123",
            "unit": "× calibration",
            "extra": "667.76ns  (min: 648.59ns  p75: 670.24ns  p99: 726.38ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — complete match, warm probe",
            "value": 16.3494,
            "range": "± 0.1118",
            "unit": "× calibration",
            "extra": "806.98ns  (min: 786.83ns  p75: 809.20ns  p99: 863.87ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec (baseline, never asks)",
            "value": 66.039,
            "range": "± 2.0266",
            "unit": "× calibration",
            "extra": "3259.57ns  (min: 3133.76ns  p75: 3357.69ns  p99: 3532.17ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 140.5873,
            "range": "± 2.5648",
            "unit": "× calibration",
            "extra": "6939.13ns  (min: 6692.49ns  p75: 7053.48ns  p99: 7357.90ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (taken, includes probe build)",
            "value": 140.2494,
            "range": "± 1.7422",
            "unit": "× calibration",
            "extra": "6922.46ns  (min: 6716.31ns  p75: 7006.94ns  p99: 7151.60ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — untaken atom, warm probe",
            "value": 9.0458,
            "range": "± 0.1264",
            "unit": "× calibration",
            "extra": "446.49ns  (min: 414.80ns  p75: 450.93ns  p99: 506.43ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — taken atom, warm probe",
            "value": 10.092,
            "range": "± 0.107",
            "unit": "× calibration",
            "extra": "498.12ns  (min: 479.53ns  p75: 500.77ns  p99: 553.36ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 178.0342,
            "range": "± 14.6412",
            "unit": "× calibration",
            "extra": "8787.44ns  (min: 7669.79ns  p75: 9350.72ns  p99: 9457.22ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 301.493,
            "range": "± 2.1059",
            "unit": "× calibration",
            "extra": "14881.15ns  (min: 14406.52ns  p75: 14623.35ns  p99: 15036.13ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 15.9183,
            "range": "± 0.0786",
            "unit": "× calibration",
            "extra": "785.70ns  (min: 765.47ns  p75: 780.66ns  p99: 965.57ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, same capture, probe shared",
            "value": 60.4226,
            "range": "± 0.9156",
            "unit": "× calibration",
            "extra": "2982.35ns  (min: 2758.19ns  p75: 2877.20ns  p99: 3831.74ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 159.1994,
            "range": "± 1.7728",
            "unit": "× calibration",
            "extra": "7857.79ns  (min: 7220.00ns  p75: 7577.00ns  p99: 12528.00ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 172.2606,
            "range": "± 1.8967",
            "unit": "× calibration",
            "extra": "8502.47ns  (min: 8218.41ns  p75: 8592.20ns  p99: 8612.63ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 253.4674,
            "range": "± 0.8732",
            "unit": "× calibration",
            "extra": "12510.69ns  (min: 12414.16ns  p75: 12547.03ns  p99: 12588.97ns)  calibration: 49.36ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 10.4465,
            "range": "± 0.1561",
            "unit": "× calibration",
            "extra": "515.62ns  (min: 485.33ns  p75: 521.44ns  p99: 581.25ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 90.6298,
            "range": "± 3.1248",
            "unit": "× calibration",
            "extra": "4473.32ns  (min: 4284.20ns  p75: 4635.55ns  p99: 4765.63ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 89.6275,
            "range": "± 2.5305",
            "unit": "× calibration",
            "extra": "4423.85ns  (min: 4272.19ns  p75: 4545.73ns  p99: 4665.45ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 89.5667,
            "range": "± 2.7885",
            "unit": "× calibration",
            "extra": "4420.85ns  (min: 4232.59ns  p75: 4553.03ns  p99: 4618.57ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 115.954,
            "range": "± 2.39",
            "unit": "× calibration",
            "extra": "5723.28ns  (min: 5513.71ns  p75: 5814.74ns  p99: 5939.91ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 117.3469,
            "range": "± 3.6452",
            "unit": "× calibration",
            "extra": "5792.03ns  (min: 5515.58ns  p75: 5946.80ns  p99: 6000.43ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 118.5158,
            "range": "± 2.8171",
            "unit": "× calibration",
            "extra": "5849.73ns  (min: 5554.66ns  p75: 5942.00ns  p99: 6038.10ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 123.7484,
            "range": "± 3.5643",
            "unit": "× calibration",
            "extra": "6108.00ns  (min: 5828.46ns  p75: 6227.84ns  p99: 6369.79ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 116.3169,
            "range": "± 3.318",
            "unit": "× calibration",
            "extra": "5741.19ns  (min: 5493.53ns  p75: 5875.36ns  p99: 5955.90ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 124.2634,
            "range": "± 2.5399",
            "unit": "× calibration",
            "extra": "6133.41ns  (min: 5794.95ns  p75: 6299.93ns  p99: 6525.07ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 119.2437,
            "range": "± 2.7248",
            "unit": "× calibration",
            "extra": "5885.65ns  (min: 5543.20ns  p75: 6058.56ns  p99: 6201.75ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 91.8234,
            "range": "± 1.9756",
            "unit": "× calibration",
            "extra": "4532.23ns  (min: 4354.73ns  p75: 4614.11ns  p99: 4751.25ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 91.5053,
            "range": "± 2.9741",
            "unit": "× calibration",
            "extra": "4516.53ns  (min: 4310.20ns  p75: 4652.80ns  p99: 4738.99ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 91.3194,
            "range": "± 2.6318",
            "unit": "× calibration",
            "extra": "4507.36ns  (min: 4356.56ns  p75: 4639.31ns  p99: 4705.96ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 91.6151,
            "range": "± 2.5507",
            "unit": "× calibration",
            "extra": "4521.96ns  (min: 4360.57ns  p75: 4643.13ns  p99: 4720.05ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 92.5015,
            "range": "± 2.1486",
            "unit": "× calibration",
            "extra": "4565.71ns  (min: 4408.58ns  p75: 4662.11ns  p99: 4801.18ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 110.3145,
            "range": "± 2.7556",
            "unit": "× calibration",
            "extra": "5444.92ns  (min: 5246.15ns  p75: 5571.57ns  p99: 5621.28ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 166.4295,
            "range": "± 16.443",
            "unit": "× calibration",
            "extra": "8214.66ns  (min: 6995.79ns  p75: 8854.98ns  p99: 9094.98ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 184.5586,
            "range": "± 18.2862",
            "unit": "× calibration",
            "extra": "9109.48ns  (min: 7574.14ns  p75: 9620.55ns  p99: 9869.50ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 124.549,
            "range": "± 2.3156",
            "unit": "× calibration",
            "extra": "6147.51ns  (min: 5949.75ns  p75: 6255.82ns  p99: 6325.20ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 132.835,
            "range": "± 1.7979",
            "unit": "× calibration",
            "extra": "6556.49ns  (min: 6390.14ns  p75: 6611.86ns  p99: 6679.55ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.6551,
            "range": "± 0.0185",
            "unit": "× calibration",
            "extra": "32.34ns  (min: 29.16ns  p75: 32.10ns  p99: 51.43ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.6244,
            "range": "± 0.0151",
            "unit": "× calibration",
            "extra": "30.82ns  (min: 28.03ns  p75: 30.44ns  p99: 42.09ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 36.8979,
            "range": "± 0.3887",
            "unit": "× calibration",
            "extra": "1821.21ns  (min: 1595.50ns  p75: 1642.98ns  p99: 3432.18ns)  calibration: 49.36ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.1004,
            "range": "± 0.0704",
            "unit": "× calibration",
            "extra": "54.32ns  (min: 48.21ns  p75: 57.06ns  p99: 84.47ns)  calibration: 49.36ns"
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
          "id": "6691e4caa623fdf79c9ea3207b55e6db6a20cdc0",
          "message": "[110] Fix incomplete Annex B \\c, \\x and \\u escapes swallowing following characters (#112)\n\n* fix for incomplete c, x, u escapes\n* fix for jsdoc comment on /extend\n* code formatting",
          "timestamp": "2026-09-24T19:43:51+01:00",
          "tree_id": "bcb4c3f5e0d6e188bd61a057e022772360596151",
          "url": "https://github.com/TomStrepsil/regex-partial-match/commit/6691e4caa623fdf79c9ea3207b55e6db6a20cdc0"
        },
        "date": 1790275524063,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "dispatch overhead — full match input — native RegExp.exec",
            "value": 0.6526,
            "range": "± 0.0166",
            "unit": "× calibration",
            "extra": "42.19ns  (min: 39.52ns  p75: 42.81ns  p99: 63.14ns)  calibration: 64.64ns"
          },
          {
            "name": "dispatch overhead — full match input — plain partial RegExp (no class wrapper)",
            "value": 1.2877,
            "range": "± 0.0266",
            "unit": "× calibration",
            "extra": "83.23ns  (min: 78.20ns  p75: 83.53ns  p99: 111.13ns)  calibration: 64.64ns"
          },
          {
            "name": "dispatch overhead — full match input — PartialMatchRegExp.exec",
            "value": 1.3011,
            "range": "± 0.0233",
            "unit": "× calibration",
            "extra": "84.10ns  (min: 80.38ns  p75: 84.69ns  p99: 114.49ns)  calibration: 64.64ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — native RegExp.exec",
            "value": 0.3719,
            "range": "± 0.0096",
            "unit": "× calibration",
            "extra": "24.04ns  (min: 23.06ns  p75: 24.38ns  p99: 30.73ns)  calibration: 64.64ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — plain partial RegExp (no class wrapper)",
            "value": 1.2423,
            "range": "± 0.0425",
            "unit": "× calibration",
            "extra": "80.30ns  (min: 69.04ns  p75: 75.85ns  p99: 158.99ns)  calibration: 64.64ns"
          },
          {
            "name": "dispatch overhead — partial input (returns null on native) — PartialMatchRegExp.exec",
            "value": 1.1788,
            "range": "± 0.0257",
            "unit": "× calibration",
            "extra": "76.20ns  (min: 70.87ns  p75: 74.93ns  p99: 160.52ns)  calibration: 64.64ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — native RegExp (global exec loop)",
            "value": 905.7408,
            "range": "± 27.4994",
            "unit": "× calibration",
            "extra": "58545.07ns  (min: 50435.00ns  p75: 54962.00ns  p99: 117910.00ns)  calibration: 64.64ns"
          },
          {
            "name": "hot loop — manual global exec (~700 matches) — PartialMatchRegExp (global exec loop)",
            "value": 1233.6131,
            "range": "± 19.7562",
            "unit": "× calibration",
            "extra": "79738.01ns  (min: 70041.00ns  p75: 74188.00ns  p99: 152376.00ns)  calibration: 64.64ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — native matchAll",
            "value": 950.0898,
            "range": "± 21.5431",
            "unit": "× calibration",
            "extra": "61411.69ns  (min: 55553.00ns  p75: 61054.00ns  p99: 86081.00ns)  calibration: 64.64ns"
          },
          {
            "name": "hot loop — String.prototype.matchAll (~700 matches) — PartialMatchRegExp matchAll",
            "value": 2704.0147,
            "range": "± 44.4864",
            "unit": "× calibration",
            "extra": "174781.50ns  (min: 158185.00ns  p75: 167173.00ns  p99: 336640.00ns)  calibration: 64.64ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 5.811,
            "range": "± 0.0561",
            "unit": "× calibration",
            "extra": "375.61ns  (min: 362.69ns  p75: 374.36ns  p99: 420.22ns)  calibration: 64.64ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — plain partial RegExp.test per keystroke",
            "value": 22.2059,
            "range": "± 0.1492",
            "unit": "× calibration",
            "extra": "1435.34ns  (min: 1352.77ns  p75: 1381.00ns  p99: 2912.65ns)  calibration: 64.64ns"
          },
          {
            "name": "keystroke simulation — phone number (18 chars) — PartialMatchRegExp.test per keystroke",
            "value": 30.927,
            "range": "± 0.1629",
            "unit": "× calibration",
            "extra": "1999.05ns  (min: 1961.48ns  p75: 2006.40ns  p99: 2047.96ns)  calibration: 64.64ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — native RegExp.test per keystroke (fails until full input)",
            "value": 3.4972,
            "range": "± 0.0538",
            "unit": "× calibration",
            "extra": "226.05ns  (min: 215.85ns  p75: 227.60ns  p99: 288.96ns)  calibration: 64.64ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — plain partial RegExp.test per keystroke",
            "value": 5.9198,
            "range": "± 0.0387",
            "unit": "× calibration",
            "extra": "382.64ns  (min: 372.46ns  p75: 381.28ns  p99: 437.15ns)  calibration: 64.64ns"
          },
          {
            "name": "keystroke simulation — ISO date (10 chars) — PartialMatchRegExp.test per keystroke",
            "value": 10.7914,
            "range": "± 0.0887",
            "unit": "× calibration",
            "extra": "697.54ns  (min: 683.92ns  p75: 698.99ns  p99: 751.94ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — native exec (full match only)",
            "value": 0.6414,
            "range": "± 0.0027",
            "unit": "× calibration",
            "extra": "41.46ns  (min: 40.13ns  p75: 40.82ns  p99: 54.02ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.0361,
            "range": "± 0.0191",
            "unit": "× calibration",
            "extra": "66.97ns  (min: 64.96ns  p75: 67.91ns  p99: 91.03ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial pre-backref (slow path)",
            "value": 35.0127,
            "range": "± 0.3094",
            "unit": "× calibration",
            "extra": "2263.15ns  (min: 2113.00ns  p75: 2204.00ns  p99: 3697.00ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — single exec, repeated-word pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 32.131,
            "range": "± 0.32",
            "unit": "× calibration",
            "extra": "2076.88ns  (min: 2044.75ns  p75: 2092.21ns  p99: 2194.97ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — native exec (full match only)",
            "value": 1.4619,
            "range": "± 0.0259",
            "unit": "× calibration",
            "extra": "94.49ns  (min: 87.56ns  p75: 93.99ns  p99: 144.11ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — full match (native fast path)",
            "value": 1.9326,
            "range": "± 0.0251",
            "unit": "× calibration",
            "extra": "124.92ns  (min: 116.33ns  p75: 124.03ns  p99: 224.53ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — single exec, HTML tag pattern — PartialMatchRegExp — partial mid-backref (slow path)",
            "value": 117.8209,
            "range": "± 0.6188",
            "unit": "× calibration",
            "extra": "7615.68ns  (min: 7294.00ns  p75: 7464.00ns  p99: 13976.00ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound rejects quickly — native wins, no pipeline",
            "value": 2.1098,
            "range": "± 0.0206",
            "unit": "× calibration",
            "extra": "136.37ns  (min: 129.66ns  p75: 135.70ns  p99: 177.52ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — leftmost bound check (native match at a later index) — bound doesn't reject — full pipeline still runs",
            "value": 46.9991,
            "range": "± 0.3945",
            "unit": "× calibration",
            "extra": "3037.92ns  (min: 2845.00ns  p75: 2966.00ns  p99: 5270.00ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — capture agreement, irrelevant input ahead of the match — 4-character input",
            "value": 83.7457,
            "range": "± 0.3145",
            "unit": "× calibration",
            "extra": "5413.14ns  (min: 5366.60ns  p75: 5431.01ns  p99: 5487.26ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — capture agreement, irrelevant input ahead of the match — 10004-character input",
            "value": 484.7782,
            "range": "± 1.9467",
            "unit": "× calibration",
            "extra": "31334.99ns  (min: 30711.32ns  p75: 31178.73ns  p99: 31370.51ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — repeated word: 7 keystrokes",
            "value": 186.3833,
            "range": "± 0.2474",
            "unit": "× calibration",
            "extra": "12047.40ns  (min: 11986.33ns  p75: 12062.11ns  p99: 12072.71ns)  calibration: 64.64ns"
          },
          {
            "name": "backref — keystroke simulation (accumulated exec cost) — HTML tag: 90 keystrokes",
            "value": 9411.0638,
            "range": "± 108.5047",
            "unit": "× calibration",
            "extra": "608310.25ns  (min: 590196.00ns  p75: 609172.00ns  p99: 727563.00ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — native new RegExp()",
            "value": 1.516,
            "range": "± 0.02",
            "unit": "× calibration",
            "extra": "97.99ns  (min: 95.53ns  p75: 98.94ns  p99: 110.73ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — compilePartial()",
            "value": 55.3418,
            "range": "± 0.3674",
            "unit": "× calibration",
            "extra": "3577.17ns  (min: 3498.80ns  p75: 3565.47ns  p99: 4043.86ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — simple pattern (no groups, no backreferences) — new PartialMatchRegExp()",
            "value": 65.3597,
            "range": "± 2.315",
            "unit": "× calibration",
            "extra": "4224.71ns  (min: 3993.71ns  p75: 4314.96ns  p99: 5259.75ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — native new RegExp()",
            "value": 2.0694,
            "range": "± 0.025",
            "unit": "× calibration",
            "extra": "133.76ns  (min: 128.04ns  p75: 134.75ns  p99: 149.20ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — compilePartial()",
            "value": 78.8922,
            "range": "± 0.4525",
            "unit": "× calibration",
            "extra": "5099.41ns  (min: 5030.57ns  p75: 5113.34ns  p99: 5224.33ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — phone pattern (character classes, optional groups) — new PartialMatchRegExp()",
            "value": 89.8756,
            "range": "± 2.2952",
            "unit": "× calibration",
            "extra": "5809.36ns  (min: 5543.83ns  p75: 5910.68ns  p99: 6106.49ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — native new RegExp()",
            "value": 2.1671,
            "range": "± 0.0211",
            "unit": "× calibration",
            "extra": "140.08ns  (min: 134.20ns  p75: 139.90ns  p99: 189.02ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — compilePartial()",
            "value": 197.2213,
            "range": "± 6.1838",
            "unit": "× calibration",
            "extra": "12747.95ns  (min: 10651.53ns  p75: 13161.13ns  p99: 13326.75ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — HTML tag pattern (capturing group + backreference) — new PartialMatchRegExp()",
            "value": 212.8832,
            "range": "± 5.5018",
            "unit": "× calibration",
            "extra": "13760.29ns  (min: 11807.46ns  p75: 14224.50ns  p99: 14359.20ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — native new RegExp()",
            "value": 1.4649,
            "range": "± 0.0202",
            "unit": "× calibration",
            "extra": "94.69ns  (min: 92.30ns  p75: 95.63ns  p99: 108.33ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — compilePartial()",
            "value": 94.2444,
            "range": "± 0.5172",
            "unit": "× calibration",
            "extra": "6091.75ns  (min: 6010.45ns  p75: 6100.31ns  p99: 6212.16ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — legacy numeric escape (\\N past the group count) — new PartialMatchRegExp()",
            "value": 110.2801,
            "range": "± 2.2579",
            "unit": "× calibration",
            "extra": "7128.26ns  (min: 6733.23ns  p75: 7278.63ns  p99: 7363.44ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — native new RegExp()",
            "value": 1.6425,
            "range": "± 0.0211",
            "unit": "× calibration",
            "extra": "106.17ns  (min: 103.26ns  p75: 106.99ns  p99: 120.29ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — compilePartial()",
            "value": 102.4648,
            "range": "± 0.5379",
            "unit": "× calibration",
            "extra": "6623.10ns  (min: 6574.24ns  p75: 6651.36ns  p99: 6721.37ns)  calibration: 64.64ns"
          },
          {
            "name": "construction — legacy named escape (\\k<name> naming no group) — new PartialMatchRegExp()",
            "value": 119.6219,
            "range": "± 1.6144",
            "unit": "× calibration",
            "extra": "7732.09ns  (min: 7315.50ns  p75: 7851.31ns  p99: 8021.02ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec (baseline, never asks)",
            "value": 73.4982,
            "range": "± 1.8791",
            "unit": "× calibration",
            "extra": "4750.76ns  (min: 4559.40ns  p75: 4832.06ns  p99: 5099.90ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (includes probe build)",
            "value": 185.8703,
            "range": "± 2.4753",
            "unit": "× calibration",
            "extra": "12014.25ns  (min: 10660.00ns  p75: 11241.00ns  p99: 28624.00ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 171.6992,
            "range": "± 1.2007",
            "unit": "× calibration",
            "extra": "11098.26ns  (min: 10920.79ns  p75: 11155.08ns  p99: 11272.05ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — incomplete match, warm probe",
            "value": 11.1234,
            "range": "± 0.0211",
            "unit": "× calibration",
            "extra": "718.99ns  (min: 708.58ns  p75: 714.35ns  p99: 776.31ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — static path (ISO date) — hitEnd — complete match, warm probe",
            "value": 11.9728,
            "range": "± 0.0252",
            "unit": "× calibration",
            "extra": "773.89ns  (min: 764.77ns  p75: 769.71ns  p99: 830.73ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec (baseline, never asks)",
            "value": 62.9963,
            "range": "± 2.7644",
            "unit": "× calibration",
            "extra": "4071.94ns  (min: 3858.00ns  p75: 4247.03ns  p99: 4485.89ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 136.6987,
            "range": "± 1.3427",
            "unit": "× calibration",
            "extra": "8835.90ns  (min: 8611.82ns  p75: 8885.29ns  p99: 9013.38ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — construct + exec + hitEnd (complete, includes probe build)",
            "value": 139.0421,
            "range": "± 1.3306",
            "unit": "× calibration",
            "extra": "8987.37ns  (min: 8727.10ns  p75: 9027.58ns  p99: 9307.45ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — incomplete match, warm probe",
            "value": 9.2196,
            "range": "± 0.0351",
            "unit": "× calibration",
            "extra": "595.93ns  (min: 582.59ns  p75: 595.96ns  p99: 645.10ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — word boundary at truncation end — hitEnd — complete match, warm probe",
            "value": 10.0795,
            "range": "± 0.0227",
            "unit": "× calibration",
            "extra": "651.52ns  (min: 643.49ns  p75: 649.47ns  p99: 698.64ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec (baseline, never asks)",
            "value": 74.9969,
            "range": "± 2.203",
            "unit": "× calibration",
            "extra": "4847.63ns  (min: 4642.08ns  p75: 4971.84ns  p99: 5210.31ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (includes probe build)",
            "value": 189.5256,
            "range": "± 1.7134",
            "unit": "× calibration",
            "extra": "12250.51ns  (min: 12061.28ns  p75: 12312.95ns  p99: 12422.72ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — construct + exec + hitEnd (complete, includes probe build)",
            "value": 192.3729,
            "range": "± 0.2983",
            "unit": "× calibration",
            "extra": "12434.55ns  (min: 12320.73ns  p75: 12439.78ns  p99: 12516.42ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — incomplete match, warm probe",
            "value": 13.8425,
            "range": "± 0.0751",
            "unit": "× calibration",
            "extra": "894.75ns  (min: 882.27ns  p75: 895.59ns  p99: 959.19ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — open-ended quantifiers and end anchor (email-like pattern) — hitEnd — complete match, warm probe",
            "value": 17.6561,
            "range": "± 0.0764",
            "unit": "× calibration",
            "extra": "1141.25ns  (min: 1123.62ns  p75: 1137.32ns  p99: 1284.10ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec (baseline, never asks)",
            "value": 63.918,
            "range": "± 2.3816",
            "unit": "× calibration",
            "extra": "4131.52ns  (min: 3891.66ns  p75: 4239.81ns  p99: 4483.13ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (includes probe build)",
            "value": 142.5468,
            "range": "± 0.9366",
            "unit": "× calibration",
            "extra": "9213.91ns  (min: 9059.88ns  p75: 9266.07ns  p99: 9361.73ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — construct + exec + hitEnd (taken, includes probe build)",
            "value": 144.8754,
            "range": "± 2.1744",
            "unit": "× calibration",
            "extra": "9364.42ns  (min: 9097.32ns  p75: 9436.16ns  p99: 9585.49ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — untaken atom, warm probe",
            "value": 9.1109,
            "range": "± 0.0397",
            "unit": "× calibration",
            "extra": "588.91ns  (min: 572.58ns  p75: 584.91ns  p99: 642.11ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — optional atom at truncation end — hitEnd — taken atom, warm probe",
            "value": 10.101,
            "range": "± 0.0257",
            "unit": "× calibration",
            "extra": "652.91ns  (min: 642.71ns  p75: 648.19ns  p99: 706.23ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec (baseline, never asks)",
            "value": 178.1019,
            "range": "± 12.0371",
            "unit": "× calibration",
            "extra": "11512.11ns  (min: 10316.85ns  p75: 12106.00ns  p99: 12274.24ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — construct + exec + hitEnd (includes probe build)",
            "value": 317.7969,
            "range": "± 1.595",
            "unit": "× calibration",
            "extra": "20541.68ns  (min: 19667.46ns  p75: 19995.69ns  p99: 20171.26ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — hitEnd — same match, expansion probe cached",
            "value": 16.2115,
            "range": "± 0.0614",
            "unit": "× calibration",
            "extra": "1047.88ns  (min: 1030.20ns  p75: 1043.79ns  p99: 1135.52ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, same capture, probe shared",
            "value": 55.8768,
            "range": "± 0.5373",
            "unit": "× calibration",
            "extra": "3611.75ns  (min: 3546.55ns  p75: 3626.74ns  p99: 3701.17ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — backreference path (repeated word) — exec + hitEnd — fresh match, alternating capture, probe rebuilt per match",
            "value": 154.2942,
            "range": "± 1.2454",
            "unit": "× calibration",
            "extra": "9973.23ns  (min: 9377.00ns  p75: 9739.00ns  p99: 22082.00ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec (baseline, never asks)",
            "value": 171.3389,
            "range": "± 2.2315",
            "unit": "× calibration",
            "extra": "11074.96ns  (min: 10812.30ns  p75: 11157.39ns  p99: 11316.37ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — construct + exec + hitEnd (includes probe build)",
            "value": 273.899,
            "range": "± 7.3644",
            "unit": "× calibration",
            "extra": "17704.22ns  (min: 16440.48ns  p75: 17619.36ns  p99: 18210.38ns)  calibration: 64.64ns"
          },
          {
            "name": "hitEnd — raw lookaround backreference renumbering — hitEnd — warm instance",
            "value": 10.4676,
            "range": "± 0.0268",
            "unit": "× calibration",
            "extra": "676.60ns  (min: 666.99ns  p75: 673.67ns  p99: 726.31ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — literal characters (baseline)",
            "value": 82.188,
            "range": "± 2.8948",
            "unit": "× calibration",
            "extra": "5312.45ns  (min: 5063.74ns  p75: 5476.17ns  p99: 5750.15ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — character class",
            "value": 83.0049,
            "range": "± 2.2786",
            "unit": "× calibration",
            "extra": "5365.25ns  (min: 5142.88ns  p75: 5487.59ns  p99: 5651.92ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — quantifier",
            "value": 81.3261,
            "range": "± 2.4632",
            "unit": "× calibration",
            "extra": "5256.74ns  (min: 5040.23ns  p75: 5391.27ns  p99: 5457.50ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — disjunction",
            "value": 106.8788,
            "range": "± 1.1122",
            "unit": "× calibration",
            "extra": "6908.41ns  (min: 6658.63ns  p75: 6989.86ns  p99: 7187.48ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — non-capturing group",
            "value": 108.1533,
            "range": "± 1.8067",
            "unit": "× calibration",
            "extra": "6990.79ns  (min: 6702.62ns  p75: 7149.56ns  p99: 7169.45ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — capturing group",
            "value": 108.4862,
            "range": "± 3.0351",
            "unit": "× calibration",
            "extra": "7012.31ns  (min: 6721.97ns  p75: 7176.74ns  p99: 7223.22ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — named group",
            "value": 115.8115,
            "range": "± 1.7957",
            "unit": "× calibration",
            "extra": "7485.80ns  (min: 7233.80ns  p75: 7575.92ns  p99: 7687.94ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookahead",
            "value": 108.8265,
            "range": "± 2.3412",
            "unit": "× calibration",
            "extra": "7034.31ns  (min: 6734.11ns  p75: 7164.44ns  p99: 7279.66ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — negative lookahead (raw)",
            "value": 116.235,
            "range": "± 2.2321",
            "unit": "× calibration",
            "extra": "7513.17ns  (min: 7021.84ns  p75: 7652.11ns  p99: 7930.34ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — lookbehind (raw)",
            "value": 112.6158,
            "range": "± 3.1229",
            "unit": "× calibration",
            "extra": "7279.23ns  (min: 6819.32ns  p75: 7472.14ns  p99: 7662.60ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control escapes",
            "value": 83.729,
            "range": "± 2.516",
            "unit": "× calibration",
            "extra": "5412.05ns  (min: 5178.27ns  p75: 5560.22ns  p99: 5675.46ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — control-letter escape",
            "value": 82.9467,
            "range": "± 2.1894",
            "unit": "× calibration",
            "extra": "5361.49ns  (min: 5163.62ns  p75: 5476.59ns  p99: 5619.00ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — hex and unicode escapes",
            "value": 87.1284,
            "range": "± 3.1147",
            "unit": "× calibration",
            "extra": "5631.79ns  (min: 5328.18ns  p75: 5776.10ns  p99: 5929.35ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — unicode property escape (u)",
            "value": 82.9494,
            "range": "± 2.2817",
            "unit": "× calibration",
            "extra": "5361.66ns  (min: 5166.43ns  p75: 5489.10ns  p99: 5591.70ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, one construct per bench — nested character class (v)",
            "value": 84.1888,
            "range": "± 2.5231",
            "unit": "× calibration",
            "extra": "5441.78ns  (min: 5224.69ns  p75: 5586.58ns  p99: 5677.27ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — capturing group, no reference (static path)",
            "value": 102.6956,
            "range": "± 2.8379",
            "unit": "× calibration",
            "extra": "6638.02ns  (min: 6327.38ns  p75: 6787.37ns  p99: 6855.52ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — numeric backreference (dynamic path)",
            "value": 163.5022,
            "range": "± 11.8255",
            "unit": "× calibration",
            "extra": "10568.42ns  (min: 8949.92ns  p75: 11213.99ns  p99: 11507.16ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — named backreference (dynamic path)",
            "value": 178.6767,
            "range": "± 13.9822",
            "unit": "× calibration",
            "extra": "11549.26ns  (min: 9648.38ns  p75: 12138.47ns  p99: 12212.24ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified octal escape (static)",
            "value": 119.0796,
            "range": "± 0.869",
            "unit": "× calibration",
            "extra": "7697.04ns  (min: 7394.52ns  p75: 7777.19ns  p99: 7844.90ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — construction, backreferences and legacy escapes — reclassified \\k literal (static)",
            "value": 124.3089,
            "range": "± 1.1167",
            "unit": "× calibration",
            "extra": "8035.05ns  (min: 7786.20ns  p75: 8108.76ns  p99: 8203.78ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — partial input",
            "value": 0.575,
            "range": "± 0.0093",
            "unit": "× calibration",
            "extra": "37.17ns  (min: 35.40ns  p75: 36.94ns  p99: 62.48ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — legacy \\k literal — full match",
            "value": 0.5418,
            "range": "± 0.0022",
            "unit": "× calibration",
            "extra": "35.02ns  (min: 33.86ns  p75: 34.43ns  p99: 43.35ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — partial input",
            "value": 32.3574,
            "range": "± 0.1291",
            "unit": "× calibration",
            "extra": "2091.51ns  (min: 2061.25ns  p75: 2089.33ns  p99: 2267.22ns)  calibration: 64.64ns"
          },
          {
            "name": "feature cost — exec, legacy escape vs genuine backreference — genuine backreference — full match",
            "value": 1.0498,
            "range": "± 0.02",
            "unit": "× calibration",
            "extra": "67.86ns  (min: 65.78ns  p75: 68.83ns  p99: 91.43ns)  calibration: 64.64ns"
          }
        ]
      }
    ]
  }
}