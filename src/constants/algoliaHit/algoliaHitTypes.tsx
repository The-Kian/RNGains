import {Hit as AlgoliaHit} from '@algolia/client-search'
import { Text } from 'react-native';

export type userDetailHit = AlgoliaHit<{
    displayName: string;
    email: string;
}>;
