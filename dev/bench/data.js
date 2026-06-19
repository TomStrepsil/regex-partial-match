window.BENCHMARK_DATA = {
  "lastUpdate": 1781899572024,
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
      }
    ]
  }
}