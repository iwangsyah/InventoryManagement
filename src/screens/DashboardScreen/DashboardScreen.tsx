import _ from "lodash";
import React from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from "react-redux";
import DeviceInfo from 'react-native-device-info';
import BaseButton from "../../components/BaseButton";
import ItemCard from "../../components/ItemCard";
import { CategoryItemProps, ItemProps } from "../../interfaces/Category";
import { RootState } from "../../redux/store";

const DashboardScreen = () => {
    const categoryList  = useSelector((state: RootState) => state.category.category)
    const isTablet = DeviceInfo.isTablet();
    const dispatch = useDispatch()

    const onAddNewItem = (categoryIndex: number) => {
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

    const renderItem = (item: ItemProps, index: number, categoryIndex: number) =>
        <ItemCard item={item} index={index} categoryIndex={categoryIndex} />


    const renderCategory = ({ item, index } : {item: CategoryItemProps, index: number}) => {
        const categoryIndex = index
        return (
            <View style={{flex: 1}}>
                <View style={[styles.headerContainer, {paddingHorizontal: isTablet ? 8 : 16}]}>
                    <Text numberOfLines={2} style={{flex: 1, fontSize: 26, fontWeight: 'bold'}}>{item.title}</Text>
                    <BaseButton title='ADD NEW ITEM' onPress={() => onAddNewItem(categoryIndex)} />
                </View>
                <FlatList
                    data={item.items}
                    numColumns={isTablet ? 2 : 1}
                    renderItem={({item, index} : {item: ItemProps, index: number}) => (
                        renderItem(item, index, categoryIndex)
                    )}
                    keyExtractor={(_, index) => String(index)}
                    ListEmptyComponent={() => <Text style={styles.emptyText}>No items to display</Text>}
                />
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
            <KeyboardAwareScrollView extraScrollHeight={20}>
                <FlatList
                    data={categoryList}
                    renderItem={renderCategory}
                    keyExtractor={(_, index) => String(index)}
                    contentContainerStyle={{paddingVertical: 16, paddingHorizontal: isTablet ? 0 : 16}}
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
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },
    emptyText: {
        textAlign: 'center', 
        color: '#696969', 
        marginVertical: 16
    }
})

export default DashboardScreen