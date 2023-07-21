import {  View, Text} from 'react-native';
import { Button } from 'react-native';
import { respondToFriendRequest } from '../../friends/FriendRequest';

export function FriendRequests() {
	return (
		<View>
			<Text>FriendRequest from </Text>
			<Button title="Accept" onPress={() => {respondToFriendRequest}}/>
		</View>
	)
}