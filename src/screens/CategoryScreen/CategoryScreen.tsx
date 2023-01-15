import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import _ from "lodash";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from "react-redux";
import DeviceInfo from 'react-native-device-info';
import BaseButton from "../../components/BaseButton";
import ItemCard from "../../components/ItemCard";
import { ItemProps } from "../../interfaces/Category";
import { RootState } from "../../redux/store";
import { RootStackParams } from "../RootNavigation";

type Props = NativeStackScreenProps<RootStackParams, 'CategoryScreen'>

const CategoryScreen = ({route}: Props) => {
    const id = route.params.id
    const dispatch = useDispatch()
    const categoryList  = useSelector((state: RootState) => state.category.category)
    const categoryIndex = _.findIndex(categoryList, item => item.id == id);
    const isTablet = DeviceInfo.isTablet();

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

    const renderItem = ({ item, index } : {item: ItemProps, index: number}) =>
        <ItemCard item={item} index={index} categoryIndex={categoryIndex} />

    return (
        <View style={{flex: 1}}>
            <View style={styles.headerContainer}>
                <Text numberOfLines={2} style={{flex: 1, fontSize: 26, fontWeight: 'bold'}}>{categoryList[categoryIndex].title}</Text>
                <BaseButton title='ADD NEW ITEM' onPress={onAddNewItem} />
            </View>
            <KeyboardAwareScrollView extraScrollHeight={80}>
                <FlatList
                    numColumns={isTablet ? 2 : 1}
                    data={categoryList[categoryIndex]?.items}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => String(index)}
                    contentContainerStyle={{paddingVertical: 16, paddingHorizontal: isTablet ? 0 : 16}}
                    ListEmptyComponent={() => <Text style={styles.emptyText}>No items to display</Text>}
                />
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: Dimensions.get('window').height,
        minWidth: Dimensions.get('window').width,
        position: 'absolute'
    },
    headerContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    emptyText: {
        textAlign: 'center', 
        color: '#696969', 
        marginVertical: 16
    }
})

export default CategoryScreen