import React, {Component} from "react";
import {View, Text, Image} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import styles from "../../styles/picker";
import history from "../../history";

import Button from "../widgets/button";
import { isRequired } from "react-native/Libraries/StyleSheet/ColorPropType";

class PickerScreen extends Component {


    resartPicker = () => {
        this.props.clearStudent();
        history.push("/");
    }

    render(){
        const {pickStudent, students, student} = this.props;
        return(
            <View style={styles.container}>
                <Image source={require("../../assets/ktslogo.png")}/>
                {   (student && students.length > 0) &&
                    <View>
                        <Text style={styles.student}>Student</Text>
                        <Text style={styles.student}>{student.toString()}</Text>
                    </View>
                }
                {   (!student && students.length > 0) &&
                    <View>
                        <Text style={styles.student}>Are you the luck one?</Text>
                    </View>
                }
                {   (students.length == 0) ?
                    <View>
                        <Text style={styles.student}>Student</Text>
                        <Text style={styles.student}>{student.toString()}</Text>
                        <Button content="Restart" onClick={this.resartPicker}/>
                    </View>
                    :
                    <View>
                        <Button content="Feeling Lucky?" onClick={() => pickStudent(students)}/>
                        <Button content="Restart" onClick={this.resartPicker} />
                    </View>
                }
            </View>
        );
    }
}

function mapStateToProps(state){
    const {students, student} = state.students;
    return{
        students,
        student
    }
}

export default connect(mapStateToProps, actions)(PickerScreen);