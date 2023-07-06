import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useInfiniteHits, UseInfiniteHitsProps } from 'react-instantsearch-hooks';
import { userDetailHit } from '../../../context/userDetail/userDetailHitTypes';

type InfiniteHitsProps<THit> = UseInfiniteHitsProps & {
  hitComponent: (props: {hit: THit}) => JSX.Element;
}

export function InfiniteHits<THit>({ hitComponent: Hit, ...props }: InfiniteHitsProps<THit>) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);

  return (
    <FlatList
      data={hits}
      keyExtractor={(item) => item.objectID}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => {
        if (!isLastPage) {
          showMore();
        }
      }}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Hit hit={item as THit}/>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    padding: 18,
  },
});