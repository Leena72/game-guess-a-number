import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './Components/header';
import StartGameScreen from './Screen/StartGameScreen';
import GameScreen from './Screen/GameScreen'
import GameOverScreen from './Screen/GameOverScreen'
// import { AppLoading } from 'expo'


export default function App() {
  const [userNumber, setuserNumber] = useState();
  const [guessRound, setguessRound] = useState(0)
const [dataLoad, setdataLoad] = useState(false)

// -- skipping app loading for a while--
// if(!dataLoad){
//   return <AppLoading/>
// }

  const startGameHandler = (selectedNumber) => {
    console.log("selectedNumber", selectedNumber)
    setuserNumber(selectedNumber)

  }

  const gameOverHandler = (numberOfRound) => {
    console.log("number>>", numberOfRound)
    setguessRound(numberOfRound)
  }

  const restartHandler = () => {
    setguessRound(0)
    setuserNumber(null)
  }

  let content = <StartGameScreen onStartGameHandler={startGameHandler} />

  if (userNumber && guessRound <= 0) {
    console.log("userNumber>>", userNumber)
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRound > 0) {
    content = <GameOverScreen noOfRound={guessRound} userNumber={userNumber} restartHandler={restartHandler} />
  }

  return (
    <View style={styles.screen} >
      <Header title="Guess a number" />
      {content}
      {/* <GameScreen userChoice={userNumber}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
