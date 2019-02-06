import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";

class PickerScreen extends Component {
    render(){
        return(
            <View style={{flexDirection: "column", justifyContent: "flex-start", display: "flex", marginTop: 20}}>
                {this.props.students.map((x, i) => {
                    return(<Text key={i} style={{color: "black", fontSize: 30}}>Student - {x}</Text>)
                })}
            </View>
        );
    }
}

function mapStateToProps(state){
    const {students} = state.students;
    return{
        students
    }
}

export default connect(mapStateToProps, actions)(PickerScreen);