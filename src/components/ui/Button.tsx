import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { buttonStyles } from "../../constants/styles/buttonStyles";

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

