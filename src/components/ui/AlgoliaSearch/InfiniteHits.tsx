import {  View, FlatList } from 'react-native'
import { useInfiniteHits, UseInfiniteHitsProps } from 'react-instantsearch-hooks'

type InfiniteHitsProps<THit> = UseInfiniteHitsProps & {
  hitComponent: (props: {hit: THit}) => JSX.Element;
}

export function InfiniteHits<THit>({ hitComponent: Hit, hide, ...props }: InfiniteHitsProps<THit> & {hide: boolean}) {
	const { hits, isLastPage, showMore } = useInfiniteHits(props)

	if (hide) {
		return null
	}

	return (
		<FlatList
			data={hits}
			keyExtractor={(item) => item.objectID}
			ItemSeparatorComponent={() => <View />}
			onEndReached={() => {
				if (!isLastPage) {
					showMore()
				}
			}}
			renderItem={({ item }) => (
				<View >
					<Hit hit={item as THit}/>
				</View>
			)}
		/>
	)
}

