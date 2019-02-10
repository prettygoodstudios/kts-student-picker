import {StyleSheet} from "react-native";

import {PRIMARY_COLOR} from "./index";

export default StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    label: {
        marginTop: 20,
        marginBottom: 20,
        color: PRIMARY_COLOR,
        fontSize: 20
    },
    picker: {
        marginTop: -50,
        marginBottom: 150,
        height: 30,
        width: 100,
        display: "flex"
    },
    textInput: {
        borderColor: PRIMARY_COLOR,
        color: PRIMARY_COLOR,
        borderWidth: 2,
        padding: 10,
        fontSize: 20,
        width: "70%"
    }
});