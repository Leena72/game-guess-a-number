import React from 'react'
import {View,Text, StyleSheet, Button, Image,ScrollView, SafeAreaView} from 'react-native' 
import colors from '../Components/Constant/colors'


const GameOverScreen = (props) => {
    return(
        <ScrollView>
        <View style={styles.screen}>
            <Text style={styles.gameOverText} >
              Game Over !
            </Text>
           <Image style={styles.successImage}
        //    source={require('../assets/tick.png')} //--local img
           source={{uri:'https://www.thebmc.co.uk/Handlers/ArticleImageHandler.ashx?id=8911&index=0&w=605&h=434'}} //--web img
           resizeMode="cover"/> 
            <Text style={styles.rounds}>Number of rounds: {props.noOfRound}</Text>
            <Text style={styles.rounds}>User Number: {props.userNumber}</Text>
            <Button title="RESTART GAME" color={colors.primary} onPress={props.restartHandler}/>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
screen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
successImage:{
    width:'80%',
    height:300,
    borderRadius:250
},

gameOverText:{
fontSize:25,
color: '#f7287b',
marginBottom: 10
},
rounds:{
    fontSize:20,
    marginBottom: 5,
    marginTop: 5
    }

})

export default GameOverScreen ;