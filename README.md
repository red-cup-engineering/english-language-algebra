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

Established limits remain evidence, not euphemism: unsuffixed adjectives such
as `difficult` fall to `noun`, and a bare regular verb stem with neither an
irregular-table entry nor a recognized 3sg/past/nonfin suffix (e.g. `chase`,
as opposed to its own `chases`) does not anchor subject/object arcs. The
tests retain both limits so future grammar work must improve the data rather
than quietly change the claim.

```sh
npm run check
npm run build
npm test
```

The release closure contains no linguistics-root, legacy RMN runtime or RDF
projection dependency.
