export type CompanyId = 'wwe' | 'aew' | 'aaa';

export interface Company {
  id: CompanyId;
  name: string;
  shortName: string;
  country: string;
  accent: string;
  rosterSourceUrl: string;
}

export interface MatchResult {
  date: string;
  event: string;
  opponent: string;
  outcome: 'win' | 'loss' | 'draw';
  method: string;
  sourceUrl: string;
  verified?: boolean;
}

export interface RatingSummary {
  average: number | null;
  voteCount: number;
  minimumVotes: number;
}

export interface RatingSnapshot {
  season: number;
  average: number;
  voteCount: number;
  closedAt: string;
}

export interface Wrestler {
  id: string;
  slug: string;
  name: string;
  nickname: string;
  companyId: CompanyId;
  companyIds?: CompanyId[];
  hometown: string;
  billedHeight: string;
  signatureMove: string;
  bio: string;
  imageUrl: string;
  profileSourceUrl: string;
  lastMatch: MatchResult;
  currentRating: RatingSummary;
  ratingHistory: RatingSnapshot[];
  featured?: boolean;
}
