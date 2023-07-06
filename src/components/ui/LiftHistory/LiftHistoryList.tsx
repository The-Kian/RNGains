import { Text, View } from "react-native";
import { ScreenStyle } from "../../../constants/styles";
import { Lift } from "../../userStats/UserStatsTypes";

export const liftHistoryList = ({ item }: { item: Lift }) => {
    return (
      <View style={ScreenStyle.liftContent}>
        <Text>{`User Weight: ${item.userWeight}`}</Text>
        <Text>{`Squat: ${item.squatWeight}`}</Text>
        <Text>{`Deadlift: ${item.deadliftWeight}`}</Text>
        <Text>{`Bench: ${item.benchWeight}`}</Text>
        <Text>{`Time: ${item.timestamp?.toDate().toLocaleString()}`}</Text>
      </View>
    );
  };
