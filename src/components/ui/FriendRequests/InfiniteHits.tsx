import {  View, FlatList } from 'react-native';
import { useInfiniteHits, UseInfiniteHitsProps } from 'react-instantsearch-hooks';
import { algoliaStyles } from "../../../constants/styles/algoliaStyles";
import { Button } from 'react-native';

type InfiniteHitsProps<THit> = UseInfiniteHitsProps & {
  hitComponent: (props: {hit: THit}) => JSX.Element;
}

export function InfiniteHits<THit>({ hitComponent: Hit, hide, ...props }: InfiniteHitsProps<THit> & {hide: boolean}) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);

  if (hide) {
    return null;
  }

  return (
    <FlatList
      data={hits}
      keyExtractor={(item) => item.objectID}
      ItemSeparatorComponent={() => <View style={algoliaStyles.seperator}/>}
      onEndReached={() => {
        if (!isLastPage) {
          showMore();
        }
      }}
      renderItem={({ item }) => (
        <View style={algoliaStyles.item}>
          <Hit hit={item as THit}/>
        </View>
      )}
    />
  );
};

