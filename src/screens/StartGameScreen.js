import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,Button,Keyboard,TouchableWithoutFeedback, Alert,
        Dimensions,
        KeyboardAvoidingView} from 'react-native';
import Card from '../components/Card';
import color from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TextTitle from '../components/TextTitle';
import MainButton from '../components/MainButton';
import { ScrollView } from 'react-native-gesture-handler';

const StartGameScreen = props =>{
    //to manage button width for orientation changes
    const[buttonWidth,setButtonWidth] = useState(Dimensions.get('window').width / 4);

    useEffect(()=>{
        const  updateLayout = ()=>{
            setButtonWidth(Dimensions.get('window').width / 4);
        }
        Dimensions.addEventListener('change',updateLayout);
        return ()=>{
            Dimensions.removeEventListener('change',updateLayout);
        };
    },[]);

    const[enteredValue,setEnteredValue] = useState('');
    //to confirm the input
    const[confirmed,setConfirmed] = useState(false); 
    const[selectedNumber,setSelectedNumber] = useState( );

    const numberInputHandler = inputNumber =>{
// setEnteredValue(inputNumber);  to validate input we do following bt this also works
    //validation for input number to be only numeric value
        setEnteredValue(inputNumber.replace(/[^0-9]/g,''));
    };
    //validation
    const confirmInputHandler =() =>{

        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber<=0 ||chosenNumber>99){
            Alert.alert(
                'Invalid Number!',
                'Number has to be between 1 to 99.',
                [{text:'Okay',style:'destructive',onPress:resetInputHandler}]
            );
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue(''); //to clean textInput
        Keyboard.dismiss(); // to dismiss the keyboard after we press confirm
    };

    const resetInputHandler = () =>{
        setEnteredValue('');
        setConfirmed(false);
    };
    let confirmedOutput
    if(confirmed){
        confirmedOutput =( 
        <Card style = {styles.summaryContainer}>
            <BodyText>You Selected</BodyText>
                
                  <NumberContainer>{selectedNumber}</NumberContainer>
                  <MainButton  onPress={() => props.onStartGame(selectedNumber)}>
                    Start Game
                  </MainButton>              
        </Card>
        );
    }

   return(
       <ScrollView>
        <KeyboardAvoidingView behaviour='padding' keyboardVerticalOffset={60}>
        <TouchableWithoutFeedback 
        onPress={()=>Keyboard.dismiss()} > 
        <View style={styles.screen}>
            <TextTitle >Start a new game!</TextTitle>
            <Card style = {styles.inputContainer}>
                <BodyText style={styles.text}>Select a number</BodyText>
                <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={2}
                keyboardType="number-pad"
                onChangeText={numberInputHandler}
                value={enteredValue}
                 />
                <View style = {styles.buttonContainer}>
                    <View style={{width:buttonWidth}}>
                    <MainButton  
                       onPress={confirmInputHandler}
                       color={color.accent}
                    >
                    Confrom
                    </MainButton>
                    </View>
                    <View style={{width:buttonWidth}}><MainButton 
                       onPress={resetInputHandler}
                       color={color.secondary}
                    >Reset</MainButton>
                    </View>
                </View>
            </Card>
            {confirmedOutput}
         </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        //justifyContent:'center',
        padding:10
    },
  
    inputContainer:{
        width:'80%',
        maxWidth:'95%',
        minWidth:300,
        alignItems:'center',
        height:150,

        
    },
    buttonContainer:{
        marginTop:20,
        flexDirection:'row',
        width:'90%',
        justifyContent:'space-between',
       // paddingHorizontal:15,
       
    },
    // button:{
    //     //width:100,
    //     width:Dimensions.get('window').width/4,
    //     borderRadius:10
    // },
    input:{
        width:50,
        marginTop:10,
        textAlign:"center",
    },
    summaryContainer:{
        marginTop:10,
        alignItems:'center',
     
    },
    text:{
        fontFamily:'open-sans-bold'
    }
});

export default StartGameScreen;