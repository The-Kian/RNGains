


import { Text, View } from 'react-native';
import { ScreenStyle } from '../constants/styles';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, UseHitsProps, useHits } from 'react-instantsearch-hooks';
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY } from '../constants/algolia';
import { SearchBox } from '../components/ui/AlgoliaSearch/SearchBox';
import { InfiniteHits } from '../components/ui/AlgoliaSearch/InfiniteHits';
import { userDetailHit } from '../context/userDetail/userDetailHitTypes';


const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_API_KEY);

interface HitProps {
  hit: userDetailHit;
}

function Hit({ hit }: HitProps) {
  return (
    <Text>
      {hit.displayName}
    </Text>
  );
}



export default function FriendsScreen() {

  return (
    <View style={ScreenStyle.rootContainer}>
      <InstantSearch searchClient={searchClient} indexName="dev_RNGains">
        <Text>Search</Text>
        <SearchBox />
        <InfiniteHits hitComponent={Hit} />
      </InstantSearch>

    </View>
  );
}
