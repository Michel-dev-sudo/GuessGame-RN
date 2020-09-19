import React from 'react';
import {Text,StyleSheet,View} from 'react-native';

const Card =props =>{
    return(
        <View style ={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
};
const styles = StyleSheet.create({
    card:{
        shadowColor:'black',
        shadowOffset:{width:0,height:4},
        shadowRadius:0,
        shadowOpacity:0.5,
        elevation:5,
        backgroundColor:'white',
        borderRadius:10,
        padding:10,
    },
});
export default Card ;