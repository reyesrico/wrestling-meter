import type { CompanyId, Wrestler } from '../data/types';

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? 'https://example.invalid/api';

export interface PublicRating {
  average: number | null;
  voteCount: number;
}

interface VoteResponse {
  vote: {
    id: string;
    wrestlerId: string;
    seasonId: string;
    score: number;
  };
  rating: PublicRating;
}

interface CatalogWrestler {
  id: string;
  slug: string;
  name: string;
  nickname: string;
  hometown: string;
  billedHeight: string;
  signatureMove: string;
  bio: { en: string };
  imageUrl: string;
  profileSourceUrl: string;
  featured: boolean;
  promotions: Array<{ slug: CompanyId; primary?: boolean }>;
  latestMatch?: CatalogMatch | null;
  matches?: CatalogMatch[];
  history?: Array<{
    year: number;
    average: number;
    voteCount: number;
    closedAt: string;
  }>;
  rating: PublicRating;
}

interface CatalogMatch {
  date: string;
  event: string;
  opponent: string;
  result: Wrestler['lastMatch']['outcome'];
  method: string;
  sourceUrl: string;
}

function mapCatalogWrestler(wrestler: CatalogWrestler): Wrestler | null {
  const companyId =
    wrestler.promotions.find(({ primary }) => primary)?.slug ?? wrestler.promotions[0]?.slug;
  if (!companyId) return null;
  const latestMatch = wrestler.latestMatch ?? wrestler.matches?.[0] ?? null;

  return {
    id: wrestler.id,
    slug: wrestler.slug,
    name: wrestler.name,
    nickname: wrestler.nickname,
    companyId,
    companyIds: wrestler.promotions.map(({ slug }) => slug),
    hometown: wrestler.hometown,
    billedHeight: wrestler.billedHeight,
    signatureMove: wrestler.signatureMove,
    bio: wrestler.bio.en,
    imageUrl: wrestler.imageUrl,
    profileSourceUrl: wrestler.profileSourceUrl,
    lastMatch: latestMatch
      ? {
          date: latestMatch.date,
          event: latestMatch.event,
          opponent: latestMatch.opponent,
          outcome: latestMatch.result,
          method: latestMatch.method,
          sourceUrl: latestMatch.sourceUrl,
          verified: true,
        }
      : {
          date: '',
          event: '',
          opponent: '',
          outcome: 'draw',
          method: '',
          sourceUrl: wrestler.profileSourceUrl,
          verified: false,
        },
    currentRating: { ...wrestler.rating, minimumVotes: 3 },
    ratingHistory: (wrestler.history ?? []).map((snapshot) => ({
      season: snapshot.year,
      average: snapshot.average,
      voteCount: snapshot.voteCount,
      closedAt: snapshot.closedAt.slice(0, 10),
    })),
    featured: wrestler.featured,
  };
}

export async function getCatalogWrestlers(): Promise<Wrestler[]> {
  const response = await fetch(`${apiBaseUrl}/catalog/wrestlers`);
  const result = (await response.json()) as CatalogWrestler[] | { error?: string };
  if (!response.ok || !Array.isArray(result)) {
    throw new ApiError(
      !Array.isArray(result) && result.error ? result.error : 'Roster could not be loaded',
      response.status,
    );
  }

  return result.map(mapCatalogWrestler).filter((wrestler) => wrestler !== null);
}

export async function getCatalogWrestler(wrestlerSlug: string): Promise<Wrestler> {
  const response = await fetch(`${apiBaseUrl}/catalog/wrestlers/${wrestlerSlug}`);
  const result = (await response.json()) as CatalogWrestler | { error?: string };
  const wrestler = response.ok && 'slug' in result ? mapCatalogWrestler(result) : null;
  if (!wrestler) {
    throw new ApiError(
      'error' in result && result.error ? result.error : 'Wrestler not found',
      response.status,
    );
  }
  return wrestler;
}

export async function getWrestlerRating(wrestlerSlug: string): Promise<PublicRating> {
  const response = await fetch(`${apiBaseUrl}/catalog/wrestlers/${wrestlerSlug}`);
  const result = (await response.json()) as { rating?: PublicRating; error?: string };
  if (!response.ok || !result.rating) {
    throw new ApiError(result.error ?? 'Rating could not be loaded', response.status);
  }
  return result.rating;
}

export async function getCurrentVote(
  wrestlerSlug: string,
  accessToken: string,
): Promise<number | null> {
  const response = await fetch(`${apiBaseUrl}/votes/${wrestlerSlug}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const result = (await response.json()) as { score?: number | null; error?: string };
  if (!response.ok) {
    throw new ApiError(result.error ?? 'Vote could not be loaded', response.status);
  }
  return result.score ?? null;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function castVote(
  wrestlerSlug: string,
  score: number,
  accessToken: string,
): Promise<VoteResponse> {
  const response = await fetch(`${apiBaseUrl}/votes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wrestlerSlug, score }),
  });

  const result = (await response.json()) as VoteResponse | { error?: string };
  if (!response.ok) {
    throw new ApiError(
      'error' in result && result.error ? result.error : 'Vote could not be saved',
      response.status,
    );
  }

  return result as VoteResponse;
}
