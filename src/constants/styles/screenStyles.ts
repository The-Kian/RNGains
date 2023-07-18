"use strict";
import { StyleSheet } from "react-native";
import { Colors } from "../colors";

export const ScreenStyle = StyleSheet.create({
	default: {
		backgroundColor: Colors.primaryMedium,
	},
	rootContainer: {
		flex: 1,
		padding: 32,
		backgroundColor: Colors.primaryMedium,
		justifyContent: 'center',
		alignItems: 'center'
	},
	chartContainer: {
		flex: 1,
		padding: 8,
		alignItems: 'center'
	},
	loadingMessage: {
		fontSize: 16,
		marginBottom: 12,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},
	welcomeText: {
		padding: 6,
	},
	friendStatusContainer: {
		//flex: 1,
		padding: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		borderWidth: 1,
	},
});

