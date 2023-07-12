import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthProvider';




export default function FeedView() {
    const { user } = useContext(AuthContext);
    return (
        useEffect(() => {
            //fetchFeed();
        }, []),
        
        <View>
            <Text>Feed</Text>
        </View>
    );
}
