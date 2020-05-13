import {StyleSheet} from "react-native";
import { PRIMARY_COLOR } from "./index";

export default StyleSheet.create({
    container: {
        flexDirection: "column",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%"
    },
    student: {
        textAlign: "center",
        fontSize: 40,
        color: PRIMARY_COLOR
    },
    starWorld: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 2
    }
});