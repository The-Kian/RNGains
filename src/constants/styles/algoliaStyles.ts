"use strict";
import { StyleSheet } from "react-native";
import { Colors } from "../colors";


export const algoliaStyles = StyleSheet.create({
  container: {
    backgroundColor: '#252b33',
    padding: 16,
    marginBottom: 16,
  },
  seperator: {
    padding: 8,
  },
  item: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    borderColor: Colors.primaryDark,
  },
  input: {
    height: 48,
    width: 200,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
