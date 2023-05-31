import { useContext, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { AuthContext } from "../../components/auth/AuthProvider";

import { UserStatsContext } from "../../components/firestore/UserStatsProvider";

import { liftHistoryList } from "../../components/ui/LiftHistory/LiftHistoryList";
import { ScreenStyle } from "../../constants/styles";

function LiftHistoryScreen() {
	const { fetchAllLifts, allLifts } = useContext(UserStatsContext);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		fetchAllLifts(user.uid);
	}, []);

	return (

			<View style={ScreenStyle.rootContainer}>
				<Text style={ScreenStyle.title}>Welcome!</Text>
				<Text style={ScreenStyle.welcomeText}> </Text>
				<FlatList
					data={allLifts}
					keyExtractor={(item) => item.id}
					renderItem={liftHistoryList}
				/>
			</View>
		
	);
}

export default LiftHistoryScreen;
