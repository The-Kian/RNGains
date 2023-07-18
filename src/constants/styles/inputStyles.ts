"use strict";
import { StyleSheet } from "react-native";
import { Colors } from "../colors";


export const inputStyles = StyleSheet.create({
  inputContainer: {
    marginVertical: 0,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: Colors.primaryLight,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
