import { StyleSheet } from "react-native";
import { Colors } from "../colors";

export const contentStyle = StyleSheet.create({
updateLiftsContent: {
    marginHorizontal: 2,
    padding: 64,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    backgroundColor: Colors.primaryDark
  },
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primaryDark,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  liftContent: {
    marginTop: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    flex: 1,
    flexDirection: 'column' 
  },
  friendFeedContent: {
    marginTop: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    flex: 1,
    flexDirection: 'column'
  },
  
});