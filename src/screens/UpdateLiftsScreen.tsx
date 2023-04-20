
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../components/auth/AuthProvider";
import { AuthContextType } from "../components/auth/AuthTypes";
import { LiftsForm } from "../components/firestore/LiftsForm";
import { UserStatsContext, UserStatsProvider } from "../components/firestore/UserStatsProvider";
import { screenStyle } from "../constants/styles";

export default function UpdateLiftsScreen() {

  return (
    <View style={screenStyle.rootContainer}>
      <Text style={screenStyle.title}>New PR?</Text>
      <LiftsForm></LiftsForm>
    </View>  );
}
