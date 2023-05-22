import { useState } from "react";
import { FlatList, ListRenderItem} from "react-native";
import {  View } from "react-native";
import { Lift } from "../firestore/UserStatsTypes";
import { ScreenStyle } from "../../constants/styles";
import { GraphProps, SquatChart } from "./LiftHistory/SquatChart";

interface CarouselProps {
	liftsData: Lift[]

}

export const Carousel = ({liftsData} : CarouselProps) => {

	return (
			<FlatList
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={200}
				pagingEnabled
				decelerationRate="fast"
                data={liftsData}
				renderItem={({ item }) => <SquatChart lifts={[item]} />}
				keyExtractor={(item, index) => index.toString()}
			/>
	);
}

export default Carousel;
