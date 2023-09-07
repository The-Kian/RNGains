import {  View, FlatList } from 'react-native';
import { useInfiniteHits, UseInfiniteHitsProps } from 'react-instantsearch-core';
import { algoliaStyles } from "../../../constants/styles/algoliaStyles";


type InfiniteHitsProps<THit> = UseInfiniteHitsProps & {
  hitComponent: (props: {hit: THit}) => JSX.Element;
}

export function InfiniteHits<THit>({ hitComponent: Hit, hide, friendFilters, ...props }: InfiniteHitsProps<THit> & {hide: boolean, friendFilters: string[]}) {
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

			renderItem={({ item }) => {
				const isCurrentFriend = friendFilters.some(friendID => friendID === item.objectID);
				
				if (isCurrentFriend) {
					return null;
				}
				return (
					<View style={algoliaStyles.item}>
						<Hit hit={item as THit}/>
					</View>
				)
			}}
		/>
	);
}; 

