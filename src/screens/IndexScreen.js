import React,{useState} from 'react';
import {Text,StyleSheet,View} from 'react-native';
import Header from '../components/Header';
import StartGameScreen from './StartGameScreen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

const fetchFonts =()=>{
    return Font.loadAsync({
        'open-sans':require('../../assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold':require('../../assets/fonts/OpenSans-Bold.ttf'),
    });
};

const IndexScreen = props =>{

    const[userNumber,setUserNumber] = useState();
    const[guessRounds,setGuessRounds] = useState(0);

    //to load the font
    const[dataLoaded,setDataLoaded] = useState(false);
    if(!dataLoaded){
        return(
            <AppLoading 
                startAsync={fetchFonts}
                onFinish={()=>setDataLoaded(true)}
                onError={()=>console.log(err)}
            />
        )
    }
    const startGameHandler = (selectedNumber) =>{
        setUserNumber(selectedNumber);
        setGuessRounds(0);// for new game no of rounds to be zero
    };
    const gameOverHandler = numOfRounds =>{
        setGuessRounds(numOfRounds);
    };

    //to start the new game
    const configureNewGameHandler=()=>{
        setGuessRounds(0);
        setUserNumber(false);
    }
    let content = <StartGameScreen  onStartGame={startGameHandler}/>

    if(userNumber && guessRounds <= 0){
        console.log(userNumber)
        content = <GameScreen userChoice={userNumber}  
            onGameOver={gameOverHandler}
        />;
    }else if(guessRounds > 0){
        content = <GameOverScreen
            roundsNumber = {guessRounds}
            userNumber={userNumber}
            onRestart = {configureNewGameHandler}
         />

    }

    return(
        <View style = {styles.screen}>
            <Header title="Guess A Number"/>
            {content}
           
        </View>
    );
};
IndexScreen.navigationOptions={
    headerShown:false
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        //padding:20,
        marginTop:30
    }
});
export default IndexScreen;