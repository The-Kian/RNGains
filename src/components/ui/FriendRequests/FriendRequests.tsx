import {  View, Text} from 'react-native';
import { algoliaStyles } from '../../../constants/styles';
import { Button } from 'react-native';
import { acceptFriendRequest } from '../../friends/FriendRequest';

export function FriendRequests() {
  return (
    <View>
      <Text>FriendRequest from </Text>
      <Button title="Accept" onPress={() => {acceptFriendRequest}}/>
    </View>
  )
}