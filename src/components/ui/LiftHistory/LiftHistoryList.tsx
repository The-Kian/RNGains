import { Text, View } from "react-native";
import { screenStyle } from "../../../constants/styles";
import { Lift } from "../../firestore/UserStatsTypes";

export const liftHistoryList = ({ item }: { item: Lift }) => {
    return (
      <View style={screenStyle.liftContent}>
        <Text>{`User Weight: ${item.userWeight}`}</Text>
        <Text>{`Squat: ${item.squatWeight}`}</Text>
        <Text>{`Deadlift: ${item.deadliftWeight}`}</Text>
        <Text>{`Bench: ${item.benchWeight}`}</Text>
        <Text>{`Time: ${item.timestamp?.toDate().toLocaleString()}`}</Text>
      </View>
    );
  };
