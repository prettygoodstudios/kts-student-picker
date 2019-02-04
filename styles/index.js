import {StyleSheet} from "react-native";

export const PRIMARY_COLOR = '#E5344F';


export default StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column"
    },
    button: {
        margin: 20,
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 100
    },
    buttonText: {
        color: PRIMARY_COLOR,
        fontSize: 20
    },
    error: {
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        margin: 20,
        padding: 20
    },
    errorText: {
        color: PRIMARY_COLOR,
        fontSize: 20
    }
});