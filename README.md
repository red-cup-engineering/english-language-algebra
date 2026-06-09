# language-parsing-english

`@561-group/language-parsing-english` is the English language bundle for `@561-group/language-parsing`.

It provides English closed-class tables, morphology, pronoun/reference features, SVO word order, left-side determiners/adjectives, and English segmentation rules. The bundle is data: the parser stays language-neutral and reads this package through the language-parsing `load()` contract.

Use it as the default reference bundle for English parsing, language-editing linting, and language-generation realization.

The package is authored as `.mts` TypeScript and consumed from emitted
`dist/*.mjs` files with declarations. Use the package root for the compiled
bundle and `@561-group/language-parsing-english/bundle` for the raw bundle data.
