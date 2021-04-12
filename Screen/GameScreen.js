import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert, ScrollView,FlatList,Dimensions } from 'react-native'
import Card from '../Components/card';
import Color from '../Components/Constant/colors'
import { Ionicons, AntDesign } from "@expo/vector-icons";

// global function for generate randm number

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNum = Math.floor(Math.random() * (max - min)) + min;
    if (randomNum === exclude) {
        return generateRandomNumber(min, max, exclude); //recursion
    }
    else {
        return randomNum;
    }
}


//main function
const GameScreen = (props) => {
    const intialGuess = generateRandomNumber(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(
        intialGuess
    );
    const [pastGuesses, setpastGuesses] = useState([intialGuess])
    const { userChoice, onGameOver } = props

    useEffect(() => {
        console.log(">>")
        if (currentGuess === userChoice) {
            console.log("round", pastGuesses.length)
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const nextGuessHander = (direction) => {

        console.log("direction", direction, currentGuess, props.userChoice);
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Oops!!', 'Try again', [{ text: 'Sorry!', style: 'cancel' }])
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        }
        else {
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber)
        // correctGuess(nextNumber)
        // setrounds(crtRound => crtRound + 1)
        setpastGuesses((curPastGuess) => [nextNumber, ...curPastGuess])
    }

    const correctGuess = (nextNumber) => {
        if (nextNumber === props.userChoice) {
            Alert.alert('Hurray!!', 'guess is correct', [{ text: 'keep playing!', style: 'cancel' }])
        }
    }

    return (
        
            <ScrollView>
        <View style={styles.screen}>
            <Card style={styles.GameScreen}>
                <AntDesign name="star" size={24} color="black" />
                <Text style={styles.gameScreenStyleText}>
                    Opponent's Guess
            </Text>
                <Text style={styles.gameScreenGuess}>{currentGuess}</Text>
                <View style={styles.gameScreenButtonContainer}>
                    <View style={styles.buttonContainer}>
                        <Button title="Lower" color={Color.primary} onPress={() => nextGuessHander('lower')} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Greater" color={Color.primary} onPress={() => nextGuessHander('greater')} />
                    </View>
                </View>
            </Card>
            <ScrollView style={styles.listcontainer} >
                <View style={styles.listelement}><Text style={styles.list}>List:</Text></View>
                {pastGuesses.map((guess, index) => (

                    <View style={styles.listblock} key={guess} >
                        <Text style={styles.listtext}>
                            #{index + 1}
                        </Text>
                        <Text style={styles.listtext1}>
                            {guess}
                        </Text>
                    </View>
                ))}
            </ScrollView>
            {/* <FlatList
           keyExtractor={item=>item}
           data={pastGuesses}
        //    renderItem={pastGuesses.length}
           >
            </FlatList> */}
           
        </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    list: {
        fontSize: 25,
        paddingLeft: 10
    },
    listcontainer: {
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        backgroundColor: '#eaeaea',
        width: 250,
        padding: 10,

    },
    listtext: {
        fontSize: 18,
        color: '#fff',
       
    },
    listtext1: {
        fontSize: 20,
        color: '#fff',
        fontWeight:'bold',
        textAlign:'center'
    },
    listblock: {
        backgroundColor: '#f7287b',
        borderRadius: 10,
        margin: 5
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,

    },
    GameScreen: {
        padding: 30
    },
    gameScreenStyleText: {
        textAlign: 'center',
        fontSize: 22,
        marginTop: 20

    },
    gameScreenGuess: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20,
    },
    gameScreenButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        width: 200,
        maxWidth: '80%'
    },
    buttonContainer: {
        width: 80,
    },

})

export default GameScreen;