import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default class InputTextField extends React.Component {
    render() {
        return (
            <View style={this.props.style}>
                <Text style={styles.inputTitle}>{this.props.title}</Text>
                <TextInput
                    value={this.props.value}
                    multiline={this.props.multiline}
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholderText}
                    secureTextEntry={this.props.isSecure}
                    style={styles.input}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputTitle: {
        color: "#ABB4BD",
        fontSize: 14
    },
    input: {
        paddingVertical: 5,
        color: "#1D2029",
        fontSize: 14,
        borderWidth:1,
        borderColor:"#0278ae",
        borderRadius:10,
        marginVertical:10,
        fontFamily: "Avenir Next"
    }
});