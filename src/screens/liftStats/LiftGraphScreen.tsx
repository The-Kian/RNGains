import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../../components/auth/AuthProvider";

import { UserStatsContext } from "../../components/firestore/UserStatsProvider";
import LiftCarousel from "../../components/ui/LiftCarousel";

import { ScreenStyle } from "../../constants/styles";
import { LiftChart } from "../../components/ui/LiftHistory/LiftChart";

function LiftGraphScreen() {
	const { fetchAllLifts, allLifts } = useContext(UserStatsContext);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const timer = setTimeout(() => { //This needs work
			fetchAllLifts(user.uid);
			console.log(`lifts for graph = ${allLifts}`)
		}, 5000)

	}, [allLifts]);

	return (
		<View style={ScreenStyle.rootContainer}>
			<Text style={ScreenStyle.title}>grphs!</Text>
			<Text style={ScreenStyle.welcomeText}> </Text>
			<LiftCarousel liftsData={allLifts || []}>
				{(lifts) => (
					<>
						<LiftChart lifts={lifts} chartType="squat"/>
						<LiftChart lifts={lifts} chartType="deadlift"/>
						<LiftChart lifts={lifts} chartType="bench" />
					</>
				)}
			</LiftCarousel>
		</View>
	);
}

export default LiftGraphScreen;
