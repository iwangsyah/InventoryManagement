import React from 'react';
import { Text } from 'react-native';
import DashboardScreen from './DashboardScreen/DashboardScreen';
import ManageCategoryScreen from './ManageCategoryScreen/ManageCategoryScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CategoryScreen from './CategoryScreen/CategoryScreen';

export type RootStackParams = {
    Dashboard: undefined;
    ManageCategory: undefined;
    CategoryScreen: {
        id: number;
        title: string
    }
};

const RootStack = createDrawerNavigator<RootStackParams>();

const RootNavigation = () => {
    const categoryList  = useSelector((state: RootState) => state.category.category)    

    return (
        <NavigationContainer>
        <RootStack.Navigator initialRouteName="Dashboard">
            <RootStack.Screen name="Dashboard" component={DashboardScreen} options={{
                drawerLabel: "Dashboard",
                title: "Dashboard"
            }} />
            {categoryList?.map((item, index) => (
                <RootStack.Screen initialParams={{ id: item?.id }} name={item?.title+ ' '+index} component={CategoryScreen} options={{
                    drawerLabel: ({ color }) => <Text style={{color, fontWeight: '500'}}>{item?.title}</Text>,
                    title: item?.title,
                }} />
            ))}
            <RootStack.Screen name="ManageCategory" component={ManageCategoryScreen} options={{
                drawerLabel: "Manage Categories",
                title: "Manage Categories"
            }} />
        </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigation;