import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Input from './Input';

export const LiftsForm = () => {
  return (
    <View>
      <Text>LiftsForm</Text>
      <Input></Input>
    </View>
  )
}


const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
