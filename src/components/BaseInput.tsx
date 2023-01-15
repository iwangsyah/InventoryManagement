import React, { forwardRef, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, TextInputProps, View } from "react-native";
import { DatePickerModal } from 'react-native-paper-dates';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import DeleteIcon from "../icons/DeleteIcon";

interface InputProps extends TextInputProps {
    label?: string;
    placeholder?: string;
    onDelete?: () => void;
    showType?: boolean;
    type?: string
}

type Ref = TextInput;



export const BaseInput = forwardRef<Ref, InputProps>((props, ref) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [date, setDate] = React.useState(props.value);
  const [open, setOpen] = React.useState(false);

  let keyboardType = 'default'
  if (props.type == 'Number') {
    keyboardType = 'numeric'
  }

  const toggleSwitch = () => {
    props.onChangeText(!props.value)
  }

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {            
      setOpen(false);
      setDate(params.date);
      props.onChangeText(params.date)
    },
    [setOpen, setDate]
  );

  const renderFormInput = () => {
    if (props.showType) {
      return (
        <>
          <Text style={[styles.label, focus && {color: '#A000FF'}]}>{props.label || 'Field'}</Text>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, focus && {borderColor: '#A000FF'}]}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                placeholder={props.placeholder}
                keyboardType={keyboardType}
                {...props}
              />
              {props.showType && <Text style={styles.inputType}>{props.type.toUpperCase()}</Text>}
            </View>
            {props.onDelete && (
              <Pressable style={{paddingHorizontal: 16}} onPress={props.onDelete}>
                <DeleteIcon size={20} />
              </Pressable>
            )}
          </View>
        </>
      )
    } else {
      switch (props.type) {
        case 'Checkbox':
          return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={props.value ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={props.value}
                />
              <Text style={{fontSize: 14, color: '#696969', marginLeft: 16}}>{props.label || 'Field'}</Text>
            </View>
          )
        case 'Date':
          return (
            <View style={{flex: 1}}>
              <Text style={[styles.label, focus && {color: '#A000FF'}]}>{props.label || 'Field'}</Text>
              <Pressable style={[styles.inputContainer, styles.input]} onPress={() => setOpen(true)}>
                <Text>{props.value ? moment(props.value).format('DD/MM/YYYY') : 'Select Date'}</Text>
                <Icon name='calendar-month' size={24} />
              </Pressable>
              <DatePickerModal
                locale="en"
                mode="single"
                label="SELECT DATE"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
              />
            </View>
          )
        default:
          return (
            <>
              <Text style={[styles.label, focus && {color: '#A000FF'}]}>{props.label || 'Field'}</Text>
              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, focus && {borderColor: '#A000FF'}]}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    placeholder={props.placeholder}
                    keyboardType={keyboardType}
                    {...props}
                  />
                  {props.showType && <Text style={styles.inputType}>{props.type.toUpperCase()}</Text>}
                </View>
                {props.onDelete && (
                  <Pressable style={{paddingHorizontal: 16}} onPress={props.onDelete}>
                    <DeleteIcon size={20} />
                  </Pressable>
                )}
              </View>
            </>
          )
      }
    }
  }

  return (
   <View style={{marginTop: 10}}>
      {renderFormInput()}
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
