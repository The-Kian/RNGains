
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../components/auth/AuthProvider";
import { AuthContextType } from "../components/auth/AuthTypes";
import { LiftsForm, liftStatsType } from "../components/firestore/LiftsForm";
import { UserStatsContext, UserStatsProvider } from "../components/firestore/UserStatsProvider";
import { screenStyle } from "../constants/styles";

export default function UpdateLiftsScreen() {

  const { uploadStats } = useContext(UserStatsContext)
  console.log(`uploadStats from context`, uploadStats)
  const {user} = useContext(AuthContext)

  async function submitStatsHandler(userID: string, userWeight: number, benchWeight: number, deadliftWeight: number, squatWeight: number) {
    console.log('before uploadStats')
    await uploadStats({userID, userWeight, squatWeight, benchWeight, deadliftWeight})
    console.log('after uploadStats')
  }

  return (
    <UserStatsProvider>
    <View style={screenStyle.rootContainer}>
      <Text style={screenStyle.title}>New PR?</Text>
      <LiftsForm></LiftsForm>
    </View>
    </UserStatsProvider>
  );
}
