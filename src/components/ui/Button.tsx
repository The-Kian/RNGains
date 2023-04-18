import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { buttonStyles, screenStyle } from '../../constants/styles';

function Button(props:{ children: ReactNode, onPress: () => void }) {
  return (
    <Pressable
      style={({ pressed }) => [buttonStyles.buttons, pressed && buttonStyles.buttonPressed]}
      onPress={props.onPress}
    >
      <View>
        <Text style={buttonStyles.buttonText}>{props.children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

