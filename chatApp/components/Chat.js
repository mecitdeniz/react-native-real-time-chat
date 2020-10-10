import React,{ useEffect } from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import io from 'socket.io-client/dist/socket.io';
const windowWidth = Dimensions.get('window').width;

class Chat extends React.Component{

    constructor(props){
        super(props)
        const { username, room } = props.route.params;
        this.state = {
            username,
            room,
            message:"",
            messages : [
            ],
        }
        const connectionConfig = {
            jsonp: false,
            reconnection: true,
            reconnectionDelay: 100,
            reconnectionAttempts: 100000,
            transports: ['websocket'], 
        };
        this.socket = io("http://192.168.1.4:3000", connectionConfig);
        this.socket.emit('joinRoom',{ username, room })
        this.socket.on('message',(msg)=>this.onReceiveMessage(msg))
        
    }

    componentWillUnmount(){
        this.socket.disconnect()
    }

    onReceiveMessage = (msg)=>{
        const { messages } = this.state;
        messages.push(msg)
        this.setState({messages})
    }
    
    handleMessageSend = () =>{
        const { message } = this.state;
        if(message.trim().length > 0){
            this.socket.emit('chat-message',message);
            this.setState({message:""});
        }else{
            return
        }
    }
    renderItem = ({ item })=>{
        const { username } = this.state;
        if(item.username !== username){
            return(
                <View style={styles.messageOuterContainer}>
                    <View style={{flex:2,flexDirection:"row"}}>
                        <View style={{width:60,alignItems:"center",justifyContent:"center"}}>
                            <SvgUri
                                width="45"
                                height="45"
                                uri={item.avatar}
                            />
                            <Text>{item.username}</Text>
                        </View>
                    
                        <View style={[styles.messageContainer,{flex:1}]}>
                            <Text style={{color:"white"}}>{item.text}</Text>
                        </View>
                    </View>
                    
                    <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}>
                        <Text>{item.time}</Text>
                    </View>
                </View> 
                
            )
        }else{
            return(
                <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                    <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}>
                        <Text>{item.time}</Text>
                    </View>

                    <View style={styles.messageContainer2}>
                        <Text style={{color:"white"}}>{item.text}</Text>
                    </View> 
                </View>
                          
            )
        }
        
    }

    render(){
        return(
            <View style={styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{justifyContent:"flex-end",paddingTop:10,paddingBottom:80,paddingHorizontal:10}}
                        data={this.state.messages}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                    />
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Bir şeyler yaz"
                        value={this.state.message}
                        onChangeText={(text)=>this.setState({message:text})}
                    />
                    <TouchableOpacity
                    onPress={()=>this.handleMessageSend()} 
                    style={styles.button}>
                        <Image source = { require('../src/iconSend.png')}style={styles.iconSend}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    inputContainer:{
        width:windowWidth-60,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        borderRadius:20,
        position:"absolute",
        bottom:0,
        alignSelf:"center",
        margin:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        alignItems:"center",
        elevation: 7,
    },
    messagesContainer:{
        flex:1,
        borderWidth:2
    },
    button:{
        justifyContent:"center",
        alignItems:"center",
        marginRight:20
    },
    iconSend:{
        width:30,
        height:30
    },
    textInput:{
        flex:1,
        borderRadius:10,
        borderColor:"#0278ae",
        marginHorizontal:5,
        padding:10
    },
    messageContainer:{
        maxWidth:windowWidth/2-10,
        minWidth:100,
        padding:15,
        backgroundColor:"gray",
        margin:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 5,
    },
    messageContainer2:{
        maxWidth:windowWidth/2-10,
        minWidth:80,
        padding:15,
        backgroundColor:"#0278ae",
        margin:10,
        alignSelf:"flex-end",
        borderBottomLeftRadius:10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 5,
    },messageOuterContainer:{
        flexDirection:"row",
    }
});

export default Chat;