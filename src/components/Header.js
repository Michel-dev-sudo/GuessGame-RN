import React from 'react';
import {Text,StyleSheet,View,Platform} from 'react-native';
import color from '../constants/color';
import TextTitle from './TextTitle';

const Header = props =>{
    return(
        <View style ={{...styles.header,
                      ...Platform.select({
                        ios:styles.headerIos,
                        android:styles.headerAndroid
                      })
                    }}>
            <TextTitle style={styles.headerTitle}>{props.title}</TextTitle>
        </View>
    );
};
const styles = StyleSheet.create({
    header:{
       // marginTop:36,
        padding:10,
        width:'100%',
        height:80,
        //backgroundColor:Platform.Os === 'android' ? color.primary : 'white',
        alignItems:'center',
        justifyContent:'center',
      //  borderBottomColor:Platform.Os === 'android' ? 'red' : 'transparent',
       // borderBottomWidth:Platform.Os ==='android' ? 2 :0
    },
    headerAndroid:{
        backgroundColor:'white',
        borderBottomColor:'black',
        borderBottomWidth:2,
    },
    headerIos:{
        backgroundColor:color.primary,
    },

});
export default Header;