import { ActivityIndicator, Text, View } from 'react-native'
import { ScreenStyle } from '../constants/styles'

function LoadingOverlay(props: { message: string }) {
	return (
		<View style={ScreenStyle.rootContainer}>
			<Text style={ScreenStyle.loadingMessage}>{props.message}</Text>
			<ActivityIndicator size="large" />
		</View>
	)
}

export default LoadingOverlay


