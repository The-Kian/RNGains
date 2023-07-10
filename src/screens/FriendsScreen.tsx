


import { Text, View } from 'react-native';
import { ScreenStyle } from '../constants/styles';
import { InstantSearch, UseHitsProps, useHits } from 'react-instantsearch-hooks';
import { SearchBox } from '../components/ui/AlgoliaSearch/SearchBox';
import { InfiniteHits } from '../components/ui/AlgoliaSearch/InfiniteHits';
import { DisplayNameHitElement } from '../components/ui/AlgoliaSearch/DisplayNameHitElement';
import { algoliaClient } from '../constants/algoliaHit/algolia';
import { useState } from 'react';




export default function FriendsScreen() {
  const [query, setQuery] = useState('');

  return (
    <View style={ScreenStyle.rootContainer}>
      <InstantSearch searchClient={algoliaClient} indexName="dev_RNGains">
        <Text>Search</Text>
        <SearchBox onQueryChange={setQuery}/>
        <InfiniteHits hitComponent={DisplayNameHitElement} hide={query.trim() === ''}/>
      </InstantSearch>

    </View>
  );
}
