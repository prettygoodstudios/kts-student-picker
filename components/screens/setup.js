import React, {Component} from "react";
import {View, Text, TextInput, Image, KeyboardAvoidingView} from "react-native";

import style from "../../styles/setup";

import Button from "../widgets/button";
import Error from "../widgets/error";

class SetupScreen extends Component {

    constructor(){
        super();
        this.state = {
            students: "",
            error: ""
        }
    }

    updateInput = (t) => {
        if(parseInt(t.trim()) || t.trim() == ""){ 
            if(t.indexOf(".") != -1){
                this.setState({
                    error: "You must provide an integer."
                });
            }else{
                this.setState({
                    students: t,
                    error: ""
                });
            }
        }else{
            this.setState({
                error: "You must provide a number."
            })
        }
    }


    render(){
        const {students, error} = this.state;
        return(
            <KeyboardAvoidingView behavior="padding" enabled>
                <View style={style.container}>
                    <Image source={require("../../assets/ktslogo.png")} />
                    <Text style={style.label}>Number of Students</Text>
                    <TextInput style={style.textInput} value={this.state.students} onChangeText={(t) => this.updateInput(t)}/>
                    <Button onClick={() => alert("Hello")} content="Start"/>
                    <Error error={error}/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default SetupScreen;