import React from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { View } from "native-base";
import _ from "lodash";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from "react-redux";
import BaseButton from "../../components/BaseButton";
import CategoryCard from "../../components/CategoryCard";
import { CategoryItemProps } from "../../interfaces/Category";
import { RootState } from "../../redux/store";
import DeviceInfo from "react-native-device-info";

const ManageCategoryScreen = () => {
    const categoryList  = useSelector((state: RootState) => state.category.category)
    const isTablet = DeviceInfo.isTablet();
    const dispatch = useDispatch()

    const onAddNewCategory = () => {
        const lastCategoryId = _.last(categoryList)?.id || 0;
        const newCategory = [...categoryList, {
            id: lastCategoryId + 1,
            title: 'New Category', 
            fields: [
                {id: lastCategoryId * 10 + 1, type: 'text', value: '', isTitle: false}
            ],
            items: []
        }]

        dispatch({type: 'SET_CATEGORY', payload: {category: newCategory}})
    }

    const renderCategory = ({ item, index } : {item: CategoryItemProps, index: number}) => (
        <CategoryCard item={item} index={index} />
    )

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAwareScrollView extraScrollHeight={20}>
                <FlatList
                    numColumns={isTablet ? 2 : 1}
                    data={categoryList}
                    renderItem={renderCategory}
                    keyExtractor={(_, index) => String(index)}
                    contentContainerStyle={{paddingVertical: 16, paddingHorizontal: isTablet ? 0 : 16}}
                />
            </KeyboardAwareScrollView>
            <View p='3' style={{backgroundColor: '#F5F5F5'}}>
                <BaseButton title='ADD NEW CATEGORY' onPress={onAddNewCategory} />
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

export default ManageCategoryScreen