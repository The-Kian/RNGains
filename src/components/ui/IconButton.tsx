import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { buttonStyles } from '../../constants/styles';

function IconButton(props: { icon: keyof typeof Ionicons.glyphMap , color: string, size: number, onPress: () => {
  
} }) {
  return (
    <Pressable
      style={({ pressed }) => [buttonStyles.iconButton, pressed && buttonStyles.buttonPressed]}
      onPress={props.onPress}
    >
      <Ionicons name={props.icon} color={props.color} size={props.size} />
    </Pressable>
  );
}

export default IconButton;

