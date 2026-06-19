/**
 * Scenario 3: keystroke simulation
 *
 * Models a user typing character-by-character into a validated input field.
 * Each prefix is exec'd once — this is the primary real-world use case for
 * partial matching.
 *
 * Compares:
 *   - native exec (no partial, returns null for incomplete input)
 *   - createPartialMatchRegex result (plain RegExp, no class overhead)
 *   - PartialMatchRegExp.exec
 *
 * Two patterns exercise different prefix lengths:
 *   - phone number: 18 chars (+1 (555) 123-4567)
 *   - ISO date:     10 chars (2024-12-31)
 */

import { bench, group } from "mitata";
import createPartialMatchRegex from "../../src/createPartialMatchRegex.ts";
import PartialMatchRegExp from "../../src/partialMatchRegExp.ts";

// E.164-style phone number
const phonePattern = /^\+?1?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const phoneInput = "+1 (555) 123-4567";
const phonePrefixes = Array.from({ length: phoneInput.length }, (_, i) =>
  phoneInput.slice(0, i + 1)
);
const nativePhone = phonePattern;
const plainPartialPhone = createPartialMatchRegex(phonePattern);
const classPartialPhone = new PartialMatchRegExp(phonePattern);

// ISO 8601 date
const datePattern = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;
const dateInput = "2024-12-31";
const datePrefixes = Array.from({ length: dateInput.length }, (_, i) =>
  dateInput.slice(0, i + 1)
);
const nativeDate = datePattern;
const plainPartialDate = createPartialMatchRegex(datePattern);
const classPartialDate = new PartialMatchRegExp(datePattern);

group("keystroke simulation — phone number (18 chars)", () => {
  bench("native RegExp.test per keystroke (fails until full input)", () => {
    for (const s of phonePrefixes) nativePhone.test(s);
  });
  bench("plain partial RegExp.test per keystroke", () => {
    for (const s of phonePrefixes) plainPartialPhone.test(s);
  });
  bench("PartialMatchRegExp.test per keystroke", () => {
    for (const s of phonePrefixes) classPartialPhone.test(s);
  });
});

group("keystroke simulation — ISO date (10 chars)", () => {
  bench("native RegExp.test per keystroke (fails until full input)", () => {
    for (const s of datePrefixes) nativeDate.test(s);
  });
  bench("plain partial RegExp.test per keystroke", () => {
    for (const s of datePrefixes) plainPartialDate.test(s);
  });
  bench("PartialMatchRegExp.test per keystroke", () => {
    for (const s of datePrefixes) classPartialDate.test(s);
  });
});
