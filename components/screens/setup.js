import React, {Component} from "react";
import {View, Text, TextInput, Image, KeyboardAvoidingView} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import style from "../../styles/setup";
import history from "../../history";

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

    startPicker = () => {
        const {students} = this.state;
        if(students != ""){
            this.props.generateStudents(parseInt(students));
            history.push("/picker");
        }else{
            this.setState({
                error: "You must provide a number."
            });
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
                    <Button onClick={this.startPicker} content="Start"/>
                    <Error error={error}/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default connect(null, actions)(SetupScreen);