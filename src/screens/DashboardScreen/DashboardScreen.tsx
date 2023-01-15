import React from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import CommonContainer from "../../components/CommonContainer";

const DashboardScreen = () => {
    const [logging, setLogging] = React.useState(false)
    const dispatch = useDispatch()

    return (
        <View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: Dimensions.get('window').height,
        minWidth: Dimensions.get('window').width,
        position: 'absolute'
    }
})

export default DashboardScreen