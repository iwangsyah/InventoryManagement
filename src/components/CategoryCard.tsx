import { Box, Text } from "native-base";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import _ from 'lodash';
import { CategoryItemProps, CateoryItemFieldProps } from "../interfaces/Category";
import BaseButton from "./BaseButton";
import BaseInput from "./BaseInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DeleteIcon from "../icons/DeleteIcon";

interface Props {
    item: CategoryItemProps;
    index: number
  }

const CategoryCard: React.FC<Props> = ({item, index}) => {
    const categoryList  = useSelector((state: RootState) => state.category.category)
    const titleField = _.find(item?.fields, field => field.isTitle);
    const dispatch = useDispatch()
    
    const setCategoryName = (text: string) => {
        const newCategoryList = [...categoryList];
        const newCategory = {...item};
        newCategory.title = text;
        newCategoryList[index] = newCategory;
        dispatch({type: 'SET_CATEGORY', payload: {category: newCategoryList}})
    } 

    const onChangeText = (text: string, indexItem: number) => {
        const newCategoryList = [...categoryList];
        const newCategory = {...item};  
        newCategory.fields[indexItem].value = text;
        if (newCategory.fields.length > 0 && !titleField) {
            newCategory.fields[0].isTitle = true;
        }
        newCategoryList[index] = newCategory;
        dispatch({type: 'SET_CATEGORY', payload: {category: newCategoryList}})
    }

    const onDeleteField = (indexItem: number) => {
        const newCategoryList = [...categoryList];
        const newCategory = {...item};  
        newCategory.fields.splice(indexItem, 1)
        newCategoryList[index] = newCategory;
        dispatch({type: 'SET_CATEGORY', payload: {category: newCategoryList}})
    }

    const onAddField = () => {
        const newCategoryList = [...categoryList];
        const newCategory = {...item};  
        const lastFieldId = _.last(newCategory.fields)?.id || 0;
        newCategory.fields.push({id: newCategoryList.id * 10 + (lastFieldId + 1),  type: 'text', value: '', isTitle: false})
        dispatch({type: 'SET_CATEGORY', payload: {category: newCategoryList}})
    }

    const onDeleteCategory = () => {
        const newCategoryList = [...categoryList];
        newCategoryList.splice(index, 1)
        dispatch({type: 'SET_CATEGORY', payload: {category: newCategoryList}})
    }

    const renderFields = ({item, index}: {item: CateoryItemFieldProps, index: number}) => 
        <BaseInput 
            type={item.type}
            placeholder='Input Field Name'
            onChangeText={(text) => onChangeText(text, index)} 
            value={item.value}
            onDelete={() => onDeleteField(index)}
        />

    return (
        <Box backgroundColor='white' p='3' shadow='5' mb='3' borderRadius={6}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>{item?.title}</Text>
            <BaseInput 
                label='Category Name'
                onChangeText={(text) => setCategoryName(text)} 
                value={item?.title}
            />
            <FlatList
                data={item?.fields}
                renderItem={renderFields}
                keyExtractor={(_, index) => String(index)}
            />
            <BaseButton title={`TITLE FIELD : ${titleField ? titleField.value : 'UNNAMED FIELD'}`} onPress={() => {}} />
            <View style={{flexDirection: 'row'}}>
                <BaseButton transparent title='ADD NEW FIELD' onPress={onAddField}/>
                <Pressable style={styles.removeButton} onPress={onDeleteCategory}>
                    <DeleteIcon size={16} color='#5D3FD3' />
                    <Text style={styles.removeText}>REMOVE</Text>
                </Pressable>
            </View>
        </Box>
    )
    }

export default CategoryCard

const styles = StyleSheet.create({
    removeButton: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 16,
        marginTop: 8
    },
    removeText: {
        fontSize: 14,
        color: '#5D3FD3', 
        fontWeight: 'bold',
        marginLeft: 4
      }
})