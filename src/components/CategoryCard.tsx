import { Box, Text } from "native-base";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import Modal from 'react-native-modal';
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
    const [visible, setVisible] = useState(false)
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

    const onSelectTitle = (itemTitle: any, indexField: number) => {
        
        const indexCategory = index
        const newCategoryList = [...categoryList];
        const newField = [];
        newCategoryList[indexCategory].fields.map((item, index) => {
            const itemField = {...item}
            itemField.isTitle = index === indexField ? true : false
            newField.push(itemField)
        })
        const newItem = []
        newCategoryList[indexCategory].items.map((item, index) => {
            const itemList = {...item}
            const newData = []
            itemList.data.map((obj) => {
                const data = {...obj}
                data.isTitle = itemTitle.value === obj.name ? true : false
                newData.push(data)
            })
            itemList.data = newData
            itemList.title = itemTitle.value 
            newItem.push(itemList)
        })
  
        newCategoryList[index].fields = newField;
        newCategoryList[index].items = newItem;

        dispatch({type: 'SET_CATEGORY', payload: {category: newCategoryList}})
        setVisible(false)
    }

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
            <BaseButton title={`TITLE FIELD : ${titleField ? titleField.value : 'UNNAMED FIELD'}`} onPress={() => setVisible(true)} />
            <View style={{flexDirection: 'row'}}>
                <BaseButton transparent title='ADD NEW FIELD' onPress={onAddField}/>
                <Pressable style={styles.removeButton} onPress={onDeleteCategory}>
                    <DeleteIcon size={16} color='#5D3FD3' />
                    <Text style={styles.removeText}>REMOVE</Text>
                </Pressable>
            </View>
            <ModalSelect 
                visible={visible} 
                onClose={() => setVisible(false)}
                data={categoryList[index].fields} 
                onSelect={(item, index) => onSelectTitle(item, index)}
            />
        </Box>
    )
}

export default CategoryCard


const ModalSelect = ({visible, onClose, data, onSelect}) => {
    return (
        <Modal
            animationIn="slideInUp"
            isVisible={visible}
            onBackdropPress={onClose}
            style={{}}>
            <View style={styles.modalView}>
                <Text style={{fontSize: 20, fontWeight: '600', textAlign: 'center', marginBottom: 16}}>Select field to be title</Text>
                {data?.map((item, index) => (
                    <BaseButton transparent title={item.value} onPress={() => onSelect(item, index)}/>
                ))}
            </View>
        </Modal>
    )
} 

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
    },
    modalView: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})