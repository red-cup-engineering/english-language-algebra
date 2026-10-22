// Revived from linguistics-services-section/lib/legacy/2026-07-03-
// communicating-in-english/src/realizing/realize.mts.  This fiber owns
// English surface realization; communicating remains the shared operation
// algebra and supplies conjugation.
import { conjugate, load } from "@red-cup-engineering/communicating";
import { rawBundle } from "./bundle.mjs";

const bundle = load(rawBundle);

function plural(subject) {
  const features = bundle.pronounFeatures(subject.toLowerCase());
  if (features?.number === "pl" || features?.number === "both") return true;
  if (features?.number === "sg") return false;
  // The English bundle's attested personal-name table is singular, even
  // when the name ends in -s (James). Do not guess a plural from a suffix.
  if (Object.hasOwn(rawBundle.reference?.nameGender ?? {}, subject.toLowerCase())) return false;
  return /s$/u.test(subject.toLowerCase()) && !/(ss|us|is|ous)$/u.test(subject.toLowerCase());
}

function nounPhrase(noun) {
  if (typeof noun !== "string" || noun.trim() === "") return "";
  if (bundle.isPronoun(noun.toLowerCase()) || /^[A-Z]/u.test(noun) || /^(?:the|a|an)\s/iu.test(noun)) return noun;
  return `the ${noun}`;
}

/**
 * Realizes one typed English clause.  It is pure: a caller owns selection of
 * the semantic role frame and any publication/effect using the resulting text.
 * @param {{subject: string, verb: string, object?: string, negated?: boolean, tense?: "past"|"present"|"future", obliques?: readonly {prep: string, object: string}[]}} spec
 */
export function realizeClause(spec) {
  if (typeof spec?.subject !== "string" || typeof spec?.verb !== "string" ||
      !spec.subject.trim() || !spec.verb.trim()) throw new TypeError("realizeClause requires subject and verb");
  const tense = spec.tense ?? "present";
  if (!["present", "past", "future"].includes(tense)) throw new TypeError("unsupported English tense");
  if (spec.negated !== undefined && typeof spec.negated !== "boolean")
    throw new TypeError("English negation must be boolean");
  const subject = spec.subject.trim();
  const features = bundle.pronounFeatures(subject.toLowerCase());
  const person = features?.person ?? 3;
  const isPlural = plural(subject);
  const thirdSingular = person === 3 && !isPlural;
  const verb = spec.verb.trim().toLowerCase();
  const tokens = [nounPhrase(subject)];

  // Future is an auxiliary construction. The generic finite conjugator's
  // fallback cannot itself carry the time or preserve future negation.
  if (tense === "future") {
    tokens.push(spec.negated ? "will not" : "will", verb);
  } else if (verb === "be") {
    // Be conjugates for person/number without do-support.
    const finite = tense === "past"
      ? (isPlural || person === 2 ? "were" : "was")
      : (isPlural || person === 2 ? "are" : person === 1 ? "am" : "is");
    tokens.push(spec.negated ? finite + " not" : finite);
  } else if (spec.negated) {
    // Present first/second person and plural subjects take do; only third
    // person singular takes does. Past finite do-support takes did.
    const auxiliary = tense === "past" ? "did" : thirdSingular ? "does" : "do";
    tokens.push(auxiliary + " not", verb);
  } else {
    // Morphological conjugation still belongs to the shared language-neutral
    // provider. This English clause layer selects its actual agreement frame.
    tokens.push(conjugate(verb, { tense, person, number: isPlural ? "pl" : "sg" }, bundle));
  }
  if (spec.object !== undefined) tokens.push(nounPhrase(spec.object));
  for (const oblique of spec.obliques ?? []) tokens.push(oblique.prep, nounPhrase(oblique.object));
  const realized = tokens.filter(Boolean);
  return Object.freeze({ text: realized.join(" "), tokens: Object.freeze(realized) });
}

/** Converts the shared role-frame form to the English clause form. */
export function frameToClause(frame, { tense, negated } = {}) {
  if (typeof frame?.verb !== "string" || frame.verb === "") throw new TypeError("frame.verb is required");
  const obliques = [
    ...(frame.instrument === undefined ? [] : [{ prep: "with", object: frame.instrument }]),
    ...(frame.recipient === undefined ? [] : [{ prep: "to", object: frame.recipient }]),
    ...(frame.location === undefined ? [] : [{ prep: "in", object: frame.location }]),
    ...(frame.obliques ?? []),
  ];
  return Object.freeze({ subject: frame.agent ?? "someone", verb: frame.verb, ...(frame.patient === undefined ? {} : { object: frame.patient }), ...(tense === undefined ? {} : { tense }), ...(negated === undefined ? {} : { negated }), ...(obliques.length === 0 ? {} : { obliques: Object.freeze(obliques) }) });
}
