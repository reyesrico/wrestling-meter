export const rosterSorts = ['meter-desc', 'meter-asc', 'name-asc', 'name-desc'] as const
export type RosterSortValue = (typeof rosterSorts)[number]