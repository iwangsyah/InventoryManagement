import { Box, Text } from "native-base";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import _ from 'lodash';
import { CategoryItemProps, CateoryItemFieldProps, ItemDataProps, ItemProps } from "../interfaces/Category";
import BaseButton from "./BaseButton";
import BaseInput from "./BaseInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DeleteIcon from "../icons/DeleteIcon";

interface Props {
    item: ItemProps;
    index: number
    categoryIndex: number
  }

const ItemCard: React.FC<Props> = ({item, index, categoryIndex}) => {

    const categoryList  = useSelector((state: RootState) => state.category.category)
    
    const titleField = _.find(item.data, field => field.isTitle);
    
    const dispatch = useDispatch()

    const onChangeText = (text: string, fieldIndex: number) => {
        const newCategoryList = [...categoryList];
        newCategoryList[categoryIndex].items[index].data[fieldIndex].value = text;        
        dispatch({type: 'SET_CATEGORY', payload: {category: newCategoryList}})
    }

    const onDeleteItem = () => {
        const newCategoryList = [...categoryList];
        newCategoryList[categoryIndex].items.splice(index, 1)
        dispatch({type: 'SET_CATEGORY', payload: {category: newCategoryList}})
    }

    const renderItemField = ({item, index}: {item: ItemDataProps, index: number}) => 
        <BaseInput 
            label={item.name}
            onChangeText={(text) => onChangeText(text, index)} 
            value={item.value}
            type={item.type}
        />

    return (
        <Box backgroundColor='white' p='3' shadow='5' mb='3' borderRadius={6}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>{titleField?.value || titleField?.name}</Text>
            <FlatList
                data={item.data}
                renderItem={renderItemField}
                keyExtractor={(_, index) => String(index)}
            />
            <Pressable style={styles.removeButton} onPress={onDeleteItem}>
                <DeleteIcon size={16} color='#5D3FD3' />
                <Text style={styles.removeText}>REMOVE</Text>
            </Pressable>
        </Box>
    )
}

export default ItemCard

const styles = StyleSheet.create({
    removeButton: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 8
    },
    removeText: {
        fontSize: 14,
        color: '#5D3FD3', 
        fontWeight: 'bold',
        marginLeft: 4
      }
})