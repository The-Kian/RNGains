import { Colors } from '../../constants/colors'
import LoginScreen from '../../screens/authScreens/LoginScreen'
import SignupScreen from '../../screens/authScreens/SignupScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../context/navigation/NavigationTypes'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthStack() {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primaryDark },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primaryLight },
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="SignUp" component={SignupScreen} />
		</Stack.Navigator>
	)
}
