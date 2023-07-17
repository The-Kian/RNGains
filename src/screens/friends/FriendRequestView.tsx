import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthProvider';
import { getFriendRequests } from '../../components/friends/FriendFeedGetter';
import { acceptFriendRequest } from '../../components/friends/FriendRequest';




export default function FriendRequestView() {
    const { user } = useContext(AuthContext);
	const [friendRequests, setFriendRequests] = useState<{ id: string; displayName: string; }[]>([]);

	const userID = user.uid;

        useEffect(() => {
			const fetchFriendRequests = async () => {
				const friendRequests = await getFriendRequests(userID);
				setFriendRequests(friendRequests);
			};
			fetchFriendRequests()

        }, [friendRequests])

		return (
			<View>
			  {friendRequests.map((request) => (
				<View key={request.id}>
				  <Text>FriendRequest from {request.displayName}</Text>
				  <Button
					title="Accept"
					onPress={() => acceptFriendRequest({ userID, friendID: request.id })}
				  />
				</View>
			  ))}
			</View>
		);
}
