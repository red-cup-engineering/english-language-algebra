# english-language-algebra

`@emsenn/english-language-algebra` is English's language-fiber data (lexicon,
morphology, reference, attachment, segmentation) presented live as a
discoverable, directly contractable micro-enterprise — a "die" — of
`linguistics-services-section`. It mirrors `latin-language-algebra`'s,
`lakota-language-algebra`'s, and `tokipona-language-algebra`'s structure and
CLI contract exactly, and shares those dies' ported settlement engine rather
than re-porting it.

It records SVO word order with left-headed determiners and adjectives
(`attachment: { determiner: "left", adjective: "left", subject: "left",
object: "right" }`) and carries no `roleBy` flag (word order alone resolves
nsubj/dobj, unlike Latin's case-based resolution). Unlike Latin, Lakota, and
Toki Pona, English's recovered `morphology.suffixRules` genuinely includes an
adjective-suffix rule, so `amod` fires for real here — see "what's real"
below. It does NOT escape its own gap in the shared engine's generic rules,
though: see "what's still stubbed."

This die is the sibling of a second, separate die,
`../english-language-codecs/`, which was split out for the settlement's "one
die, one function" principle rather than folded in here — see that die's own
README for why, and for the real, larger generation surface
(`realizeClause`/`plan`/`realizeSection`/`sectionFromText`/`model`) recovered
alongside this parsing package.

## What's real

- `src/bundle.mjs` — the actual English lexicon/morphology/reference data,
  transcribed unchanged from the recovered `src/bundle.mts`. Confirmed
  data-identical (diffed directly, only the type-only import path differs) to
  the duplicate copy under the older package-naming scheme at
  `content/assets/legacy/github-language-packages/language-parsing-english/src/bundle.mts`
  — the same provenance-duplication `tokipona-language-algebra`'s README
  documents for its own recovered package.
- `../../lib/language-engine/` — linguistics-services-section's shared,
  language-agnostic settlement pipeline, the exact same code that backs
  `latin-language-algebra`, `lakota-language-algebra`, and
  `tokipona-language-algebra`. **Nothing needed additional porting into this
  shared pipeline for English's own `tag()`/`parse()`/`articulate()` needs**
  — confirmed by reading the recovered English package's own imports
  (`content/assets/legacy/github-language-packages/english-language-algebra/src/`):
  `parity.test.mts` imports only `articulate`, `parse`, `tag` from
  `@emsenn/language-topology`, and `index.mts` imports `load` from
  `@emsenn/language-codecs` — which is itself a bare re-export of
  `@emsenn/language-algebra`'s `load` (confirmed by reading
  `content/assets/legacy/github-language-packages/language-codecs/src/index.mts`),
  the exact function already ported as `compile.mjs`'s `load()`. A strict
  subset of what the already-ported shared engine already carries — same
  situation as Lakota's and Toki Pona's ports. (The shared engine *was*
  extended this session, for the first time since Latin's original port —
  see `../english-language-codecs/README.md` — but that extension
  [`morphology.mjs`'s `conjugate`/`lemma`, `polarity.mjs`, `temporal.mjs`] is
  for the sibling generation die's real needs, not this parsing die's.)
- `src/tag.mjs` — wires the die's own `invoke-service` operation to the
  shared engine exactly as the other three dies' `tag.mjs` do: `tagText(text)`
  articulates, parses every sentence, and extracts real syntax-derived
  semantic role frames — a real, deterministic function of `(text,
  rawBundle)`, computed by actually running the settlement engine.
- **`amod` genuinely fires for English's own recovered suffix rules**, unlike
  Latin and Lakota (whose READMEs both document that their own recovered
  `suffixRules` produce no `"adj"` tag at all). English's recovered
  `suffixRules` includes `.{2,}(ous|ful|ible|able|ive|ical|ic|ish|less|al|
  ant|ent|ary|ese|most)$ → adj`, and parsing `"The famous teacher graded the
  exam."` yields a real `amod: teacher→famous` arc. See
  `test/engine.test.mjs`'s `"amod fires for suffix-derived English
  adjectives..."` test.
- `content/contracts/tagging-english-text.rml` — a real RMN law, compiled by
  `@emsenn/rmn-semantic-conformance/law`'s `compileRmlLaw` to a real
  content-addressed `ni:///sha-256;E4oyukcW65rWX811iOwukNpTi0SShob1Hmp6afcl-Vc`
  contract id.
- `content/evm/accounts/eip155-31337.json` — a real (freshly minted, not
  reused from any sibling die, not chain-deployed)
  `org.emsenn.evm.sovereign-enterprise-account.v3` binding that
  `loadSettlementAccount` from `@lenticule-science/witness-journal-rdf-projection-service/client` actually
  accepts (verified below).
- `content/micro-enterprises/english-language-algebra.json` — validated
  against the live `emsenn/schema/micro-enterprise` schema through the house
  schema reader (borrowed from the sibling `divination` node's installed
  `lib/management/skills/read-a-schema.js`, pointed at its own `lib/schemas`
  pool — the schema content is the same live schema everywhere it is seated;
  `linguistics-services-section` carries no private copy of its own).
- `src/english-die.mjs` — the live bin script `run-leader-movement.js`'s
  `invokeOperation` spawns as a subprocess, implementing the real
  `--operation solicit-service` / `--operation invoke-service` CLI contract
  over stdin/stdout JSON — the exact contract `latin-die.mjs`/`lakota-
  die.mjs`/`tokipona-die.mjs` implement, with `EnglishTaggingRequest`/
  `EnglishTaggingResult` names and this die's own actor/contract substituted
  in.

## What's still stubbed or out of scope

- `data/evm/keystores/eip155-31337.json` exists for file-shape parity with
  working sibling providers, but its key material is all zeros — it is not
  a usable signing key. `loadSettlementAccount` never reads it, so nothing
  in the discovery/admission path depends on it. (Same convention as every
  sibling die's.)
- `src/bundle.mts`, `src/index.mts`, `src/parity.test.mts`, and the
  `tsconfig*.json` files are kept from the original recovered TypeScript
  package for provenance only; they are not built or executed. `src/bundle.mjs`
  is a plain-JS hand-transcription (types stripped, logic unchanged), not
  compiler output.
- Everything the sibling READMEs list as unported from `@emsenn/language-
  analysis`'s other semantic/discourse layers (`scope`, `presuppositions`,
  `logicalForm`, `linking`/`referring`) remains unported here too — this
  die's own recovered `parity.test.mts` never called any of it.
  `@emsenn/language-algebra`'s generative-inflection layer (`conjugate`/
  `pluralize`/`indefiniteArticle`/`lemma`) and `@emsenn/language-analysis`'s
  `polarity`/`temporal` WERE ported this session — but into the shared
  engine for `../english-language-codecs/`'s real generation needs, not
  because this parsing die's own recovered `parity.test.mts` calls them (it
  doesn't).
- **GAP (real, reproducible): a bare adjective with no recognized
  derivational suffix floors to `"noun"` and steals the `dobj` arc ahead of
  the true object.** Many ordinary English adjectives ("big", "red", "old",
  "difficult", "good") carry no derivational suffix at all, so they match
  none of `rawBundle.morphology.suffixRules`'s adjective patterns and
  `tagging.mjs`'s open-class floor assigns them `["noun"]`. `dobj()` then
  scans rightward from the verb for the nearest noun-or-pronoun and stops at
  the mistagged adjective before ever reaching the true object. Verified
  directly: parsing `"The teacher graded the difficult exam."` yields
  `dobj: graded→difficult` (wrong — should be `exam`); `exam` is left
  `connected: "void"`, and `roles()` inherits the same wrong resolution
  (`patient: "difficult"`). Contrast with `"The teacher graded the famous
  exam."`, where `famous` DOES carry a recognized adjective suffix (`-ous`)
  and `dobj` resolves correctly to `exam`. This is real, reproducible
  behavior of the shared engine's generic `dobj()` rule confronted with
  English's own real recovered `suffixRules` data — not a new defect
  introduced by this port. See `test/engine.test.mjs`'s first `GAP` test for
  the reproduction.
- **GAP (real, reproducible): no rule in the recovered `suffixRules` ever
  tags a bare or regular 3sg present-tense verb, so `nsubj`/`dobj`/`roles()`
  never fire for present-tense sentences.** `rawBundle.morphology.
  suffixRules` covers `-ly` (adv), `-ize/-ise/-ify/-ate` (verb, but only when
  the word itself ends that way — a 3sg `-s` suffix added on top, e.g.
  "translates", breaks the match), `-ing` (verb), `-ed` (verb), and `-en`
  (verb/noun) — but nothing covers a bare present-tense stem or its regular
  3sg `-s` form ("read"/"reads", "eat"/"eats", "chase"/"chases",
  "run"/"runs"). They all float to `["noun"]` by the open-class floor. The
  shared engine's `nsubj()`/`dobj()` rules require a word tagged `"verb"` or
  `"aux"` to anchor an arc on; without one, neither rule ever fires — the
  same *shape* of gap Toki Pona's README documents (no verb tag → inert
  nsubj/dobj/roles), but for a different underlying reason (a specific
  missing tense rule in otherwise-tensed English morphology data, not a
  fully isolating language). Verified directly: parsing `"Mary reads a
  book."` yields no `nsubj` or `dobj` arc, `roles()` returns `[]`, and both
  `Mary` and `reads` are left `connected: "void"`. This is a real gap in the
  recovered English *data* — Latin's own recovered `suffixRules` DO cover
  present tense (`.{2,}t$` 3sg, `.{2,}nt$` 3pl) — not in the ported
  *engine*. See `test/engine.test.mjs`'s second `GAP` test for the
  reproduction.

## Verify

```sh
npm run check   # node --check on every real .mjs source file, including the shared ../../lib/language-engine/
npm test        # node --test test/  (test/english-die.test.mjs + test/engine.test.mjs)
```

Every sentence exercised in `test/engine.test.mjs` beyond the recovered
`parity.test.mts`'s own fixture (`"The teacher graded the exam."`, and
`tag()` on `"The"`/`"teacher"`/`"graded"`) is built only from closed-class
lexicon items and open-class words actually present in `src/bundle.mjs`'s
own data or its `irregularVerbs`/common-word vocabulary — no invented English
grammar.

`../../lib/language-engine/` is shared with `latin-language-algebra`,
`lakota-language-algebra`, and `tokipona-language-algebra`; its own
correctness is exercised from all four dies' `test/engine.test.mjs`, not by a
test suite of its own. All three sibling dies' own suites (`npm test` inside
each of their own directories) still pass in full, unchanged, after this die
started sharing the same engine location and after the shared engine gained
`morphology.mjs`/`polarity.mjs`/`temporal.mjs` for `../english-language-
codecs/`'s sake (purely additive barrel exports — nothing existing changed).

Discovery and admission are exercised for real by
`run-leader-movement.js`'s own `discoverAdvertisements`, `providerAdvertisement`,
and `invokeOperation` — see this die's seating record at
`content/micro-enterprises/english-language-algebra.json`, validated against
the live `emsenn/schema/micro-enterprise` schema. Verified directly:
`discoverAdvertisements({ searchRoots: ["services"] })` from
`linguistics-services-section` finds all five dies (`latin-language-algebra`,
`lakota-language-algebra`, `tokipona-language-algebra`,
`english-language-algebra`, `english-language-codecs`) with no throw, and the
full `solicit-service` → `invoke-service` CLI contract runs end-to-end over
real stdin/stdout JSON for `"The teacher graded the exam."`.
