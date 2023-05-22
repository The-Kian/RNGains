import { useContext, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { AuthContext } from "../../components/auth/AuthProvider";

import { UserStatsContext } from "../../components/firestore/UserStatsProvider";
import Carousel from "../../components/ui/Carousel";
import {
	
	SquatChart,
} from "../../components/ui/LiftHistory/SquatChart";
import { ScreenStyle } from "../../constants/styles";

function LiftGraphScreen() {
	const { fetchAllLifts, allLifts } = useContext(UserStatsContext);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		fetchAllLifts(user.uid);
	}, []);

	return (
		<View style={ScreenStyle.rootContainer}>
			<Text style={ScreenStyle.title}>grphs!</Text>
			<Text style={ScreenStyle.welcomeText}> </Text>
			{ <Carousel
				liftsData={allLifts || []}
			/>}
		</View>
	);
}

export default LiftGraphScreen;
