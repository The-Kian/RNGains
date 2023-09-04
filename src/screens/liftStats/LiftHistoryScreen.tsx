import { useContext, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { AuthContext } from "../../context/auth/AuthProvider";

import { UserStatsContext } from "../../context/userStats/UserStatsProvider";

import { LiftDisplayList } from "../../components/ui/LiftFeed/LiftDisplayList";
import { ScreenStyle } from "../../constants/styles/screenStyles";

function LiftHistoryScreen() {
	const { fetchAllLifts, allLifts, liftsAdded } = useContext(UserStatsContext);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		fetchAllLifts(user.uid);
	}, [liftsAdded]);

	return (

		<View style={ScreenStyle.rootContainer}>
			<Text style={ScreenStyle.title}>Welcome!</Text>
			<Text style={ScreenStyle.welcomeText}> </Text>
			<FlatList
				data={allLifts}
				keyExtractor={(item) => item.id}
				renderItem={(props) => LiftDisplayList({ ...props, userID: user.uid })}
			/>
		</View>
		
	);
}

export default LiftHistoryScreen;
