import { useContext, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { AuthContext } from "../components/auth/AuthProvider";

import { UserStatsContext } from "../components/firestore/UserStatsProvider";
import { Lift } from "../components/firestore/UserStatsTypes";
import Button from "../components/ui/Button";
import Carousel from "../components/ui/Carousel";
import { liftHistoryList } from "../components/ui/LiftHistory/LiftHistoryList";
import { screenStyle } from "../constants/styles";

function LiftHistoryScreen() {
	const { fetchAllLifts, allLifts } = useContext(UserStatsContext);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		fetchAllLifts(user.uid);
	}, []);


	return (
		// <View>
			// <View>
			// 	<Carousel items={allLifts || []} itemsPerInterval={1} ItemComponent = {Button}></Carousel>
			// </View>
			
			<View style={screenStyle.rootContainer}>
				<Text style={screenStyle.title}>Welcome!</Text>
				<Text style={screenStyle.welcomeText}> </Text>
				<FlatList
					data={allLifts}
					keyExtractor={(item) => item.id}
					renderItem={liftHistoryList}
				/>
			</View>
		// {/* </View> */}
		
	);
}

export default LiftHistoryScreen;
