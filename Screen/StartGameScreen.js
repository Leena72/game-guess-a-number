import React, { useState } from 'react'
import { View,
     Text, 
     StyleSheet,
    TextInput, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert, 
    Dimensions,
ScrollView,
KeyboardAvoidingView
} from 'react-native'

import Card from '../Components/card';
import Input from '../Components/input';
// import { Ionicons } from "@expo/vector-icons";
import Color from '../Components/Constant/colors'

const StartGameScreen = props => {
    const [enteredNumber, setEnteredNumber] = useState('')
    const [isConfirmd, setisConfirmed] = useState(false)
    const [selected, setselected] = useState()


    // entering number without (, .)
    const NumberHandler = inputNumber => {
        setEnteredNumber(inputNumber.replace(/[^0-9]/g, ''))
    }

    // to close the keyboard specially in ios
    const KeyBoardClose = () => {
        Keyboard.dismiss()
    }

    //reset 
    const resetHandler = () => {
        setEnteredNumber('');
        setisConfirmed(false)
    }

    //confirm
    const confirmHandler = () => {
        const chooseNumber = parseInt(enteredNumber)
        if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
            Alert.alert('Invalid number', 'Number exit between 1-99', [{ text: 'Okay', style: 'destructive', onPress: resetHandler }])
            return
        }
        setisConfirmed(true);
        setselected(chooseNumber)
        setEnteredNumber('');
        Keyboard.dismiss();
    }

    return (

  
            <ScrollView>
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
                <TouchableWithoutFeedback onPress={KeyBoardClose}>
            <View style={styles.screen}>
                <Text style={styles.screenText}>
                    Start a New Game !
                </Text>
                <Card style={styles.screenContainer}>
                    <Text style={styles.screenText}>
                        Select a Number
                    </Text>
                    <Input style={styles.screenTextContainer}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={NumberHandler}
                        value={enteredNumber}
                    />

                    <View style={styles.screenButton}>
                        <View style={styles.buttonContainer}>
                            <Button style={styles.button} title="Reset" color={Color.secondary} onPress={resetHandler} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button style={styles.button} title="Confirm" color={Color.primary} onPress={confirmHandler} />
                        </View>

                    </View>
                </Card>
                {isConfirmd && <Card style={styles.chooseNumberContainer}>
                    <Text style={styles.screenText}>
                        Choose Number: {selected}
                    </Text>
                    <Button title='Start Game' onPress={() => props.onStartGameHandler(selected)} />
                </Card>}
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    screenContainer: {
        maxWidth: '80%',
        padding: 20,
        width: 300,
        alignItems: 'center',
    },

    screenText: {
        color: '#000',
        fontSize: 20,
        paddingBottom: 20
    },
    screenTextContainer: {
        width: 150,
        textAlign: 'center',

    },
    screenButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        paddingTop: 20
    },
    buttonContainer: {
        width: 80,
    },

    button: {
        // width: '100%'
        width: Dimensions.get('window').width / 4
    },

    chooseNumberContainer: {
        marginTop: 30,
        padding: 20,

    }

})

export default StartGameScreen;