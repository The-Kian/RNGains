/* eslint-disable */

import firestore from '@react-native-firebase/firestore'

import { View, Text } from 'react-native'
import React from 'react'

export default async function Standards() {
	const standards = await firestore().collection('standards')

	const powerliftingStandards = await standards.doc('powerliftingStandards').get()

}
