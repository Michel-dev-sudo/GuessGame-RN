import React from 'react';
import {Text,
    StyleSheet,
    View,
    TouchableOpacity,
     
    Platform} from 'react-native';

import Colors from '../constants/color';

const MainButton = props =>{

    let ButtonComponent = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21 ){
        ButtonComponent = TouchableNativeFeedback;
    }
    return(
    
        <TouchableOpacity  activeOpacity={0.6} onPress ={props.onPress}>
        <View style ={{...styles.button,...props.style}}>
            <Text style={{...styles.buttonText , ...props.style}}>{props.children}</Text>
        </View>
        </TouchableOpacity>
    
    );
};
const styles = StyleSheet.create({
    button:{
        paddingVertical:8,
        paddingHorizontal:18,
        backgroundColor:Colors.accent,
        borderRadius:20,
     
    },
  
    buttonText:{
        color:'white',
        fontFamily:'open-sans',
        fontSize:18,
    
        
    }
}) ;
export default MainButton;