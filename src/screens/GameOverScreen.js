import React from 'react';
import {Text,View,StyleSheet,Image,Dimensions} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TextTitle';
import Colors from '../constants/color';
import MainButton from '../components/MainButton';
import {Ionicons} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';


const GameOverScreen = props =>{
    return (
        <ScrollView>
        <View style={styles.screen}>
            <TitleText>Game is Over</TitleText>
            <View style={styles.imageContainer}>
            <Image source={require('../../assets/success.png.png')}
                style={styles.image}
                resizeMode='cover'
            />
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>
            Your phone needed 
             <Text style={styles.highlight}>{' '}{props.roundsNumber}</Text>
             {' '}rounds to guess the number <Text style={styles.highlight}>{' '}{props.userNumber}
             </Text>
            </BodyText>
            </View>
            <MainButton  onPress={props.onRestart}>
            New Game
            </MainButton>
        </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({ 
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center', 
        paddingVertical:15,
    },
    imageContainer:{
        width:Dimensions.get('window').width * 0.5 , //70%
        height:Dimensions.get('window').width * 0.5 , //70%,
        borderRadius:Dimensions.get('window').width * 0.7 / 2 , //70%,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:Dimensions.get('window').height / 20,
    },
    image:{
        width:'100%',
        height:'100%',
    },
    highlight:{
        color:Colors.primary
    },
    resultContainer:{
        marginHorizontal:25,
       // textAlign:"center", 
       marginVertical:Dimensions.get('window').height / 20, //15 was previous margin
    },
    resultText:{
        textAlign:'center',
        fontSize:Dimensions.get('window').height < 400 ? 16 : 20,
    }
});

export default GameOverScreen;
