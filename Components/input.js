import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const Input = props => {
    return (
        <TextInput {...props} style={{ ...styles.input, ...props.style }}>
            {props.children}
        </TextInput>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: 'grey',
        height:30,
        borderBottomWidth: 1,
        marginVertical: 10,
        fontSize:20
    }
})

export default Input;