import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ScreenStyle } from "../../../constants/styles";
import { Lift } from "../../firestore/UserStatsTypes";

export interface GraphProps {
	lifts: Lift[];
}

export const SquatChart = ({ lifts }: GraphProps) => {
	const squatData = lifts.map((lift) => lift.squatWeight);
	const labels = lifts.map((lift) => {
		const date = lift.timestamp.toDate(); // Converts Firestore Timestamp to JavaScript Date
		return date.toLocaleDateString();
	  });
  

	const line = {
		labels: [],
		datasets: [
			{
				data: squatData,
				strokeWidth: 2,
			},
		],
	};

	return (
		<View style={ScreenStyle.rootContainer}>
			<Text> Graph </Text>
			<LineChart
				data={line}
				width={Dimensions.get("window").width} // from react-native
				height={220}
				yAxisLabel="$"
				yAxisSuffix="k"
				yAxisInterval={1} // optional, defaults to 1
				chartConfig={{
					backgroundColor: "#e26a00",
					backgroundGradientFrom: "#fb8c00",
					backgroundGradientTo: "#ffa726",
					decimalPlaces: 2, // optional, defaults to 2dp
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

