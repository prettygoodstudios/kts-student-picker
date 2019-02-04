import React from "react";
import {View, Text, TouchableOpacity} from "react-native";

import style from "../../styles";

const Button = (props) => {
    const {content, onClick} = props;
    return(
        <TouchableOpacity onPress={onClick}>
            <View style={style.button}>
                <Text style={style.buttonText}>{content}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Button;