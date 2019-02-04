import React from "react";
import {View, Text} from "react-native";

import style from "../../styles";

const Error = (props) => {
    const {error} = props;
    if(!error){
        return <View></View>;
    }
    return(
        <View style={style.error}>
            <Text style={style.errorText}>{error}</Text>
        </View>
    );
}

export default Error;