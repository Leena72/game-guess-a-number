import React from 'react';
import { View, Text, StyleSheet, TextBase } from 'react-native'
import Color from './Constant/colors'

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>
                {props.title}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        backgroundColor: Color.primary,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#000',
        fontSize: 20

    }

})

export default Header