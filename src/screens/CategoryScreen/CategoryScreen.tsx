import { NativeStackScreenProps } from "@react-navigation/native-stack";
import _ from "lodash";
import { Box, Button, ScrollView, View } from "native-base";
import React, { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import BaseButton from "../../components/BaseButton";
import CategoryCard from "../../components/CategoryCard";
import ItemCard from "../../components/ItemCard";
import { ItemProps } from "../../interfaces/Category";
import { RootState } from "../../redux/store";
import { RootStackParams } from "../RootNavigation";

type Props = NativeStackScreenProps<RootStackParams, 'CategoryScreen'>

const CategoryScreen = ({route, navigation}: Props) => {
    const id = route.params.id
    const dispatch = useDispatch()

    
    const categoryList  = useSelector((state: RootState) => state.category.category)
    const categoryIndex = _.findIndex(categoryList, item => item.id == id);

    const onAddNewItem = () => {
        const newCategory = [...categoryList];
        const newData = [];

        newCategory[categoryIndex].fields.map(field => 
            newData.push({isTitle: field.isTitle, name: field?.value, type: field.type, value: ''})
        ) 
        const fieldItem = _.find(newCategory[categoryIndex].fields, field => field.isTitle);

        const newItem = {}
        newItem.title = fieldItem?.value
        newItem.data = newData
        
        newCategory[categoryIndex].items.push(newItem)
        
        dispatch({type: 'SET_CATEGORY', payload: {category: newCategory}})
    }

    const renderCategory = ({ item, index } : {item: ItemProps, index: number}) =>
        <ItemCard item={item} index={index} categoryIndex={categoryIndex} />

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16}}>
                <Text numberOfLines={2} style={{fontSize: 26, fontWeight: 'bold'}}>{categoryList[categoryIndex].title}</Text>
                <BaseButton title='ADD NEW ITEM' onPress={onAddNewItem} />
            </View>
            <FlatList
                data={categoryList[categoryIndex]?.items}
                renderItem={renderCategory}
                keyExtractor={(_, index) => String(index)}
                contentContainerStyle={{padding: 16}}
            />
            <View p='3' style={{backgroundColor: '#F5F5F5'}}>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: Dimensions.get('window').height,
        minWidth: Dimensions.get('window').width,
        position: 'absolute'
    }
})

export default CategoryScreen