# @lenticule-science/english-language-algebra

<!-- 561-group-standards:badges:start -->
[![Red Cup Engineering](https://img.shields.io/badge/561%20Group-Red%20Cup%20Engineering-c0392b)](https://github.com/red-cup-engineering)
[![License: MIT](https://img.shields.io/badge/license-MIT-c0392b)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/red-cup-engineering/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->

English's language fiber: lexicon, morphology, reference, SVO attachment and
segmentation data, plus a directly invocable tagging die.

The package owns English data. `@lenticule-science/communicating@0.0.5` owns the
language-neutral Mark admission, articulation, charged parse, role and
cohomology machinery. `./tag` composes those public readings with this bundle;
it does not import a private section engine. Activity and request IDs preserve
the established SCIS v2 `objectKind`/`value`/empty-`witnessRoot` law.

Exports:

- `.` and `./bundle`: the immutable raw English bundle
- `./tag`: compiled bundle, word tagging, tokenization and full-text readings
- `solicit-service` and `invoke-service`: ActivityStreams process faces

The English bundle now registers `difficult` as an adjective so the
shared parser can attach `the difficult exam` to `exam` rather than treating
`difficult` as the verb's object. Other unsuffixed and ambiguous adjectives
remain outside the narrow verified lexicon; the analyzer must not claim
unrestricted English parsing. The earlier example that `chase` lacked verb
evidence was stale: the current bundle already declares the exact bare stem
`chase`, and the native parsing suite exercises it.

`./realizing` uses the shared communicating provider for ordinary English
verb conjugation, while English-specific clause syntax supplies finite
auxiliaries and pronoun agreement. It distinguishes `I write` from `she
writes`, `I do not write` from `she does not write`, the finite forms of
`be`, and future `will [not] ...`. All are bounded clauses, not general
semantic equivalence or an automatic right to rewrite an author.

Source changes and native regressions on a development branch are not proof
that a downstream installed package has received them. Validate the declared
package closure and source revisions before using parser/realizer results.

```sh
npm run check
npm run build
npm test
```

The release closure contains no linguistics-root, legacy RMN runtime or RDF
projection dependency.
