import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ScreenStyle } from "../../../constants/styles";
import { Lift } from "../../userStats/UserStatsTypes";
import { useEffect, useState } from "react";
import LoadingOverlay from "../../../screens/LoadingOverlay";
import { Colors } from "../../../constants/colors";

export interface GraphProps {
	lifts: Lift[];
	chartType: string
}

export const LiftChart = ({ lifts, chartType }: GraphProps) => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (lifts.length >0) {
			setLoading(false)
		}
	}, [lifts])

	if (loading) {
		return <LoadingOverlay message="Fetching lifts"/>
	}

	const liftWeightKey = `${chartType}Weight` as keyof Lift
	const liftData = lifts.map((lift) => lift[liftWeightKey] as number);

	const labels = lifts.map((lift) => {

		console.log(`timestampsdmf = ${lift.timestamp.toDate()}`)
		const date = lift.timestamp.toDate(); // Converts Firestore Timestamp to JavaScript Date
		const dateString = `${date.getDate()}/${date.getMonth()}`
		return dateString
	  });

	const line = {
		labels: labels.slice(0,6).reverse(),
		datasets: [
			{
				data: liftData.slice(0,6).reverse(),
				strokeWidth: 2,
			},
		],
	};

	return (
		
		<View style={ScreenStyle.chartContainer}>
			<Text> {chartType} </Text>
			<LineChart
				data={line}
				width={Dimensions.get("window").width/1.3} // from react-native
				height={400}
				yAxisLabel=""
				yAxisSuffix="kg"
				yAxisInterval={1} // optional, defaults to 1
				chartConfig={{
					backgroundColor: Colors.primaryMedium,
					backgroundGradientFrom: Colors.primaryDark,
					backgroundGradientTo: Colors.primaryDark,
					decimalPlaces: 1, // optional, defaults to 2dp
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 16,
					},
					propsForDots: {
						r: "6",
						strokeWidth: "2",
						stroke: "#ffa726",
					},
				}}
				bezier
				style={{
					marginVertical: 8,
					borderRadius: 16,
				}}
			/>
		</View>
	);
};

