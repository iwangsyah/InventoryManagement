import { KeyboardAvoidingView } from "native-base";
import React, { forwardRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import DeleteIcon from "../icons/DeleteIcon";

interface InputProps extends TextInputProps {
    label?: string;
    placeholder?: string;
    onDelete?: () => void;
    type?: string
}

type Ref = TextInput;

export const BaseInput = forwardRef<Ref, InputProps>((props, ref) => {
  const [focus, setFocus] = useState<boolean>(false);

  return (
   <View style={{marginTop: 10}}>
      <Text style={[styles.label, focus && {color: '#A000FF'}]}>{props.label || 'Field'}</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, focus && {borderColor: '#A000FF'}]}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder={props.placeholder}
            {...props}
          />
          {props.type && <Text style={styles.inputType}>{props.type.toUpperCase()}</Text>}
        </View>
        {props.onDelete && (
          <Pressable style={{paddingHorizontal: 16}} onPress={props.onDelete}>
            <DeleteIcon size={20} />
          </Pressable>
        )}
      </View>
    </View>
  )
})

export default BaseInput

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontSize: 10,
    color: '#696969',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 4,
    position: 'absolute',
    left: 16,
    top: -5,
    zIndex: 4
  },
  inputContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 4
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderColor: 'grey',
    borderRadius: 4,
    borderWidth: 1,
  },
  inputType: {
    paddingHorizontal: 16, 
    fontWeight: '600', 
    color: '#A000FF'
  }
})
