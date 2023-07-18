"use strict";
import { StyleSheet } from "react-native";
import { Colors } from "../colors";


export const buttonStyles = StyleSheet.create({
  buttons: {
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: Colors.primaryMedium,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 16
  },
  flatButton: {
    backgroundColor: 'none'
  },
  iconButton: {
    margin: 8,
    borderRadius: 20,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 16,
  },
});
