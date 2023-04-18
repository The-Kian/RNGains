
import { Text, View } from "react-native";
import { LiftsForm, liftStatsType } from "../components/ui/LiftsForm";
import { screenStyle } from "../constants/styles";

//const {uploadStats} = useContext(UserStatsContext)
//const { user } = useContext(AuthContext);

export default function UpdateLiftsScreen() {
  // async function submitStatsHandler(weight: number, bench: number, deadlift: number, squat: number) {
  //   await uploadStats({ user,weight, bench, deadlift, squat });
  // }

  return (
    <View style={screenStyle.rootContainer}>
      <Text style={screenStyle.title}>New PR?</Text>
      {/* <LiftsForm
        onSubmit={(liftStats: liftStatsType) => {
          console.log("onSubmit");
          submitStatsHandler(
            liftStats.userWeight,
            liftStats.benchWeight,
            liftStats.deadliftWeight,
            liftStats.squatWeight
          );
        }}
      ></LiftsForm> */}
    </View>
  );
}
