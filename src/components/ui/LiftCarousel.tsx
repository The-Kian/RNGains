import { FlatList } from "react-native";
import { Lift } from "../firestore/UserStatsTypes";

import { LiftChart } from "./LiftHistory/LiftChart";
import { ScrollView } from "react-native-gesture-handler";

interface LiftCarouselProps {
	liftsData: Lift[];
	children: (lifts: Lift[]) => JSX.Element;
}

export const LiftCarousel = ({ liftsData, children }: LiftCarouselProps) => {
	return (
			<FlatList
				horizontal={true}
				showsHorizontalScrollIndicator={true}
				scrollEventThrottle={200}
				pagingEnabled = {true}
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

export default LiftCarousel;
