import { Text, View } from "react-native";
import { screenStyle } from "../../../constants/styles";
import { Lift } from "../../firestore/UserStatsTypes";

export const liftHistoryGraph = ({ item }: { item: Lift }) => {
    return (
      <View style={screenStyle.liftContent}>
        <Text> Graph </Text>
      </View>
    );
  };
