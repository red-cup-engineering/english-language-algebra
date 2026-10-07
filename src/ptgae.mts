// ptgae.mts — Plain Technical General American English as an English language fiber.
export const PTGAE_FIBER_VERSION = "0.2.0" as const;
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

export type PtgaeTermResolutionState =
  | "resolved"
  | "unresolved"
  | "ambiguous"
  | "deprecated";

export interface PtgaeTermReading {
  readonly termId: string;
  readonly sourceRevision: string;
  readonly locale?: string;
}

export interface PtgaeTermResolution {
  readonly surface: string;
  readonly state: PtgaeTermResolutionState;
  readonly canonicalId?: string;
  readonly sourceRevision?: string;
  readonly readings?: readonly PtgaeTermReading[];
  readonly replacementId?: string;
}

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
  readonly rawFrequency: "never-authoritative";
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

export interface PtgaeProjectionReceipt {
  readonly fiberId: "ptgae";
  readonly fiberVersion: typeof PTGAE_FIBER_VERSION;
  readonly register: PtgaeRegister;
  readonly claimStatus?: PtgaeClaimStatus;
  readonly terms: readonly PtgaeTermResolution[];
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
  rawFrequency: "never-authoritative",
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

export function isAdmissiblePtgaeTermResolution(
  resolution: PtgaeTermResolution,
): boolean {
  if (resolution.surface.trim().length === 0) return false;
  switch (resolution.state) {
    case "resolved":
      return Boolean(resolution.canonicalId && resolution.sourceRevision);
    case "deprecated":
      return Boolean(
        resolution.canonicalId
        && resolution.sourceRevision
        && resolution.replacementId,
      );
    case "ambiguous":
      return Boolean(
        resolution.readings
        && resolution.readings.length >= 2
        && resolution.readings.every(
          (reading) => reading.termId.length > 0 && reading.sourceRevision.length > 0,
        ),
      );
    case "unresolved":
      return !resolution.canonicalId && !resolution.sourceRevision;
  }
}

export function makePtgaeProjectionReceipt(
  fiber: PtgaeFiber,
  terms: readonly PtgaeTermResolution[],
): PtgaeProjectionReceipt {
  if (!terms.every(isAdmissiblePtgaeTermResolution)) {
    throw new TypeError("PTGAE term resolution lacks required provenance.");
  }
  return {
    fiberId: fiber.id,
    fiberVersion: fiber.version,
    register: fiber.register,
    ...(fiber.claimStatus ? { claimStatus: fiber.claimStatus } : {}),
    terms,
  };
}

export const ptgae = resolvePtgaeFiber();
