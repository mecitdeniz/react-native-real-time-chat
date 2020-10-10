import React,{ useEffect } from 'react'
import {
    View,
    Text,
    Alert,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import InputTextField from './InputTextField';
const windowWidth = Dimensions.get('window').width;
const Logo = require('../src/Logo.png');

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            username:"",
            room:""
        }
    }

    handleTextInput = (index,text)=>{
        switch (index) {
            case 0:
                this.setState({username:text})  
                break;
            case 1:
                this.setState({room:text})  
                break;
            default:
                break;
        }
    }

    handleLogin = ()=>{
        const { username, room } = this.state;
        if(!username.trim().length > 0 || !room.trim().length > 0 ) {
            return Alert.alert("","Lütfen tüm alanları doldurunuz!")
        }else{
            this.props.navigation.navigate('Chat',{ username, room })
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Image source={Logo}/>
                <View style={styles.form}>
                    <InputTextField
                        title="Username"
                        onChangeText={(text)=>this.handleTextInput(0,text)}
                    />
                    <InputTextField
                        title="Room ID"
                        onChangeText={(text)=>this.handleTextInput(1,text)}
                    />
                    <TouchableOpacity 
                    onPress={()=>this.handleLogin()}
                    style={styles.button}>
                        <Text style={styles.buttonTitle}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white"
    },
    form:{
        width:windowWidth-40,
        padding:20,
        borderRadius:10,
        justifyContent:"center",
    },
    button:{
        backgroundColor:"#0278ae",
        height:40,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10
    },
    buttonTitle:{
        color:"white"
    }
});

export default Login;