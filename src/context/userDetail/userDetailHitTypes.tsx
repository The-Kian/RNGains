import {Hit as AlgoliaHit} from '@algolia/client-search'

export type userDetailHit = AlgoliaHit<{
    displayName: string;
    email: string;
}>;

