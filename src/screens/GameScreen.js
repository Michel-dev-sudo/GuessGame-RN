import React,{useState,useRef,useEffect} from 'react';
import {Text,StyleSheet,View,FlatList,Alert,Dimensions} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import color from '../constants/color';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import {Ionicons} from '@expo/vector-icons';

import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  };
  //to display the list of the items
  const renderListItem = (listLength,itemData) =>(
       
        <View  style = {styles.listItem}>
        <BodyText>#{listLength-itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
        </View>
        
  );
 //this is for scrollview
       {/* <View key={value} style = {styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
        </View>*/}
const GameScreen = props =>{
    //to list the guesses
    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const [currentGuess,setCurrentGuess] = useState(initialGuess);
        
    const currentLow = useRef(1);
    const currentHigh = useRef(100); 
    //const [rounds,setRounds] = useState(0);
    //to list the guesses
    const[pastGuesses,setPastGuesses] =useState([initialGuess.toString()]);
                                    //to use flatlist key for string we convert to
                                    //string all the random no generated
    const{userChoice,onGameOver} = props;  

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    },[currentGuess,userChoice,onGameOver]);

    const nextGuessHandler = direction =>{
        if((direction==='lower' && currentGuess < props.userChoice)||
          (direction==='greater' && currentGuess > props.userChoice)){
            Alert.alert('Dont\'t lie!','You know that this is wrong..',[
                {text:'Sorry!', style:'cancel'}]);
                return;
        }
        if(direction === 'lower'){
            currentHigh.current=currentGuess;
        }
        else{
            currentLow.current = currentGuess+1;//1 is added to remove same rand num generation
        }
        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,
            currentGuess);
        setCurrentGuess(nextNumber);
       // setRounds(curRounds=>curRounds+1);
       //to add the list of the guesses done or number input by the user
       setPastGuesses(curPastGuesses =>[nextNumber.toString(),...curPastGuesses])
    };

    //to maintain the width in  screen rotation
    const[availableDeviceWidth,setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width);
        const[availableDeviceHeight,setAvailableDeviceHeight] = useState(
            Dimensions.get('window').height);
        
        useEffect(()=>{
            const updateLayout = () =>{
                setAvailableDeviceWidth(Dimensions.get('window').width)
                setAvailableDeviceHeight(Dimensions.get('window').height)
            };
            Dimensions.addEventListener('change',updateLayout)
            return()=>{
                Dimensions.removeEventListener('change',updateLayout);
            };

        });
        let listContainerStyle = styles.listContainer
     if(availableDeviceWidth < 350 ){
         listContainerStyle =styles.listContainerBig 
     }  
     if(availableDeviceHeight < 600 ){
         return (  <View style={styles.screen}>            
            <Text style = {DefaultStyles.bodyText}>Opponent Guess!</Text>
            <View style={styles.controls}>
                <MainButton   onPress={
                    nextGuessHandler.bind(this,'lower')}
                    color={color.secondary}> 
                    <Ionicons name="md-remove" size={20} color="white"/>
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>    
                
                <MainButton onPress={
                    nextGuessHandler.bind(this,'greater')}
                    color={color.accent}> 
                    <Ionicons name="md-add" size={20} color="white"/>
                </MainButton>
             </View>
        <View style={listContainerStyle}>
            {/*<ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess,index)=>renderListItem(guess, pastGuesses.length- index))}
            </ScrollView>*/}
            <FlatList 
              contentContainerStyle={styles.list}
              data={pastGuesses} keyExtractor={(item)=>item}  
              renderItem={renderListItem.bind(this,pastGuesses.length)}
            />
            </View>
        </View>);
     }
    return(
        <View style={styles.screen}>            
            <Text style = {DefaultStyles.bodyText}>Opponent Guess!</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style = {styles.buttonContainer}>
            
                <MainButton   onPress={
                    nextGuessHandler.bind(this,'lower')}
                    color={color.secondary}> 
                    <Ionicons name="md-remove" size={20} color="white"/>
                    </MainButton>
                <MainButton onPress={
                    nextGuessHandler.bind(this,'greater')}
                    color={color.accent}> 
                    <Ionicons name="md-add" size={20} color="white"/>
                    </MainButton>
            </Card>
            
            <View style={listContainerStyle}>
            {/*<ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess,index)=>renderListItem(guess, pastGuesses.length- index))}
            </ScrollView>*/}
            <FlatList 
              contentContainerStyle={styles.list}
              data={pastGuesses} keyExtractor={(item)=>item}  
              renderItem={renderListItem.bind(this,pastGuesses.length)}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center',
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:Dimensions.get('window').height > 400 ? 25 : 10,
        width:250,
        maxWidth:'80%',
    },
    listContainer:{
        flex:1,
        width:'50%'
    },
    listContainerBig:{
        flex:1,
        width:'80%'
    },
    controls:{
        flex:1,
        justifyContent:'space-around',
        flexDirection:'row',
        width:'60%',
        alignItems:'center'
    },
    list:{
        flexGrow:1,
       // alignItems:'center',
        justifyContent:'flex-end'
    },
    listItem:{
        borderColor:'#ccc',
        borderWidth:2,
        padding:10,
        marginVertical:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%' //this causes scrollview to be in the left align not in center so we do 
                    // edited scroll view by list
    }
});

export default GameScreen;