// ptgae.mts — Plain Technical General American English as an English language fiber.
export const PTGAE_FIBER_VERSION = "0.1.0" as const;
export const PTGAE_LOCALE = "en-US" as const;

export const PTGAE_CLAIM_STATUSES = [
  "Observed", "Measured", "Inferred", "Hypothesis", "Model", "Proposed",
  "Required", "Intended", "Simulated", "Unverified", "Disputed",
  "Deprecated", "Unknown",
] as const;
export type PtgaeClaimStatus = typeof PTGAE_CLAIM_STATUSES[number];

export const PTGAE_REGISTERS = [
  "executive",
  "technical",
  "scientific",
  "legal-compliance",
  "public-service",
  "customer",
  "product",
  "media-editorial",
  "internal-operational",
] as const;
export type PtgaeRegister = typeof PTGAE_REGISTERS[number];

export interface PtgaeAccessibilityProfile {
  readonly headings: "descriptive";
  readonly linkText: "purpose";
  readonly altText: "contextual";
  readonly readingBurden: "minimize-without-loss";
}

export interface PtgaeTermPolicy {
  readonly canonical: "resolve-by-id";
  readonly deprecated: "provenance-only";
  readonly unresolved: "preserve-surface-and-mark-unresolved";
  readonly contested: "preserve-distinct-readings";
}

export interface PtgaeFiberRequest {
  readonly locale?: "en-US";
  readonly register?: PtgaeRegister;
  readonly claimStatus?: PtgaeClaimStatus;
  readonly audience?: string;
  readonly contentClass?: string;
}

export interface PtgaeFiber {
  readonly id: "ptgae";
  readonly version: typeof PTGAE_FIBER_VERSION;
  readonly locale: typeof PTGAE_LOCALE;
  readonly register: PtgaeRegister;
  readonly claimStatus?: PtgaeClaimStatus;
  readonly audience?: string;
  readonly contentClass?: string;
  readonly sentencePolicy: {
    readonly propositionFirst: true;
    readonly explicitAgents: true;
    readonly shortDependencyChains: true;
    readonly activeVoiceWhenClearer: true;
    readonly uncertaintyOnlyWhenMaterial: true;
  };
  readonly terminology: PtgaeTermPolicy;
  readonly accessibility: PtgaeAccessibilityProfile;
  readonly sourcePreservation: {
    readonly quotations: true;
    readonly code: true;
    readonly identifiers: true;
    readonly citations: true;
  };
}

const accessibility: PtgaeAccessibilityProfile = Object.freeze({
  headings: "descriptive",
  linkText: "purpose",
  altText: "contextual",
  readingBurden: "minimize-without-loss",
});

const terminology: PtgaeTermPolicy = Object.freeze({
  canonical: "resolve-by-id",
  deprecated: "provenance-only",
  unresolved: "preserve-surface-and-mark-unresolved",
  contested: "preserve-distinct-readings",
});

export function resolvePtgaeFiber(request: PtgaeFiberRequest = {}): PtgaeFiber {
  const base = {
    id: "ptgae" as const,
    version: PTGAE_FIBER_VERSION,
    locale: PTGAE_LOCALE,
    register: request.register ?? "technical",
    sentencePolicy: {
      propositionFirst: true as const,
      explicitAgents: true as const,
      shortDependencyChains: true as const,
      activeVoiceWhenClearer: true as const,
      uncertaintyOnlyWhenMaterial: true as const,
    },
    terminology,
    accessibility,
    sourcePreservation: {
      quotations: true as const,
      code: true as const,
      identifiers: true as const,
      citations: true as const,
    },
  };
  return {
    ...base,
    ...(request.claimStatus ? { claimStatus: request.claimStatus } : {}),
    ...(request.audience ? { audience: request.audience } : {}),
    ...(request.contentClass ? { contentClass: request.contentClass } : {}),
  };
}

export const ptgae = resolvePtgaeFiber();
