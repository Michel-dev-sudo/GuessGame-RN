import React from 'react';
import {Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback, 
    Platform} from 'react-native';

import Colors from '../constants/color';

const MainButton = props =>{

    let ButtonComponent = TouchableOpacity;
    if( Platform.Version >= 21 ){
        ButtonComponent = TouchableNativeFeedback;
    }
    return(
    <View style={styles.buttonContainer}>
        <ButtonComponent  activeOpacity={0.6} onPress ={props.onPress}>
        <View style ={{...styles.button,...props.style}}>
            <Text style={{...styles.buttonText , ...props.style}}>{props.children}</Text>
        </View>
        </ButtonComponent>
    </View>
    );
};
const styles = StyleSheet.create({
    button:{
        paddingVertical:8,
        paddingHorizontal:20,
        backgroundColor:Colors.accent,
        borderRadius:10,
        marginHorizontal:-6,
     
    },
    buttonContainer:{
        borderRadius:10,
        overflow:'hidden',
    },
    buttonText:{
        color:'white',
        fontFamily:'open-sans',
        fontSize:16,
        textAlign:'center',
    
        
    }
}) ;
export default MainButton;