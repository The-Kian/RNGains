import { FlatList } from "react-native";
import { Lift } from "../firestore/UserStatsTypes";

import { LiftChart } from "./LiftHistory/LiftChart";
import { ScrollView } from "react-native-gesture-handler";

interface CarouselProps {
	liftsData: Lift[];
	children: (lifts: Lift[]) => JSX.Element;
}

export const Carousel = ({ liftsData, children }: CarouselProps) => {
	return (
			<FlatList
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={200}
				pagingEnabled
				decelerationRate="fast"
	            data={[liftsData]}
				renderItem = {({ item }) => children(item)}
				keyExtractor={(item, index) => index.toString()}
			/>
	);

	// return (
	// 	<ScrollView horizontal showsHorizontalScrollIndicator={false}>
	// 		{children(liftsData)}
	// 	</ScrollView>
	// );
};

export default Carousel;
