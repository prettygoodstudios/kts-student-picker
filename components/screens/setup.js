import React, {Component} from "react";
import {View, Text, TextInput, Image, KeyboardAvoidingView, Picker} from "react-native";
import {connect} from "react-redux";
import * as ImagePicker from 'expo-image-picker';

import * as actions from "../../actions";
import style from "../../styles/setup";
import history from "../../history";

import Button from "../widgets/button";
import Error from "../widgets/error";
import { PRIMARY_COLOR } from "../../styles";

class SetupScreen extends Component {

    constructor(){
        super();
        this.state = {
            students: "",
            error: "",
            speed: "standard",
            image: ""
        }
    }

    updateInput = (t) => {
        if(parseInt(t.trim()) || t.trim() == ""){ 
            if(t.indexOf(".") != -1){
                this.setState({
                    error: "You must provide an integer."
                });
            }else{
                if(t.indexOf("-") != -1){
                    this.setState({
                        error: "You must provide a positive number"
                    });
                }else{
                    this.setState({
                        students: t,
                        error: ""
                    });
                }
            }
        }else{
            this.setState({
                error: "You must provide a number."
            })
        }
    }

    startPicker = () => {
        const {students, speed, image} = this.state;
        if(students != ""){
            this.props.generateStudents(parseInt(students), speed, image);
            history.push("/picker");
        }else{
            this.setState({
                error: "You must provide a number."
            });
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };


    render(){
        const {students, error, speed} = this.state;
        return(
            <KeyboardAvoidingView behavior="padding" enabled>
                <View style={style.container}>
                    <Image source={require("../../assets/ktslogo.png")} />
                    <Text style={style.label}>Number of Students</Text>
                    <TextInput style={style.textInput} value={this.state.students} onChangeText={(t) => this.updateInput(t)}/>
                    <Text style={style.label}>Animation Speed</Text>
                    <Picker
                        selectedValue={this.state.speed}
                        style={style.picker}
                        itemStyle={{color: PRIMARY_COLOR}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({speed: itemValue})
                        }
                    >
                        <Picker.Item label="Standard" value="standard" />
                        <Picker.Item label="Fast" value="fast" />
                    </Picker>
                    <Text style={style.label}>Background Image (Optional)</Text>
                    <Button onClick={this.pickImage} content="Pick Image"/>
                    <Button onClick={this.startPicker} content="Start"/>
                    <Error error={error}/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default connect(null, actions)(SetupScreen);