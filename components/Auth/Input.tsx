import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';

import { Colors } from '../../constants/colors';

function Input(props: {
  label: string,
  keyboardType?: KeyboardTypeOptions,
  onUpdateValue: ((enteredValue: string) => void),
  secure?: boolean,
  value: string,
  isInvalid: boolean,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, props.isInvalid && styles.labelInvalid]}>
        {props.label}
      </Text>
      <TextInput
        style={[styles.input, props.isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={props.keyboardType}
        secureTextEntry={props.secure}
        onChangeText={props.onUpdateValue}
        value={props.value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
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
    paddingHorizontal: 6,
    backgroundColor: Colors.primaryLight,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});