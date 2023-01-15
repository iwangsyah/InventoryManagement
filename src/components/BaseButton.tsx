import { Button } from "native-base";
import React, { forwardRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import DeleteIcon from "../icons/DeleteIcon";

interface Props extends TextInputProps {
    title?: string;
    transparent?: boolean;
    onPress?: () => void;
}


const BaseButton: React.FC<Props> = ({title, transparent, onPress}) => (
  <Button 
    borderWidth={1}
    borderColor='#5D3FD3'
    bg={transparent ? 'transparent' : '#5D3FD3'}
    variant={transparent ? 'outline' : 'solid'}
    mt='2' onPress={onPress} 
    _text={{
      fontSize: 14,
      color: transparent ? '#5D3FD3' : '#FFFFFF', 
      fontWeight: 'bold'
    }}
  >
    {title}
  </Button>
)

export default BaseButton