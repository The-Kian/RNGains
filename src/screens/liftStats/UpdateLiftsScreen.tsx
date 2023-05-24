

import { Text, View } from "react-native";
import { LiftsForm } from "../../components/firestore/LiftsForm";
import { ScreenStyle } from "../../constants/styles";

export default function UpdateLiftsScreen() {

  return (
    <View style={ScreenStyle.rootContainer}>
      <Text style={ScreenStyle.title}>New PR?</Text>
      <LiftsForm></LiftsForm>
    </View>  );
}
