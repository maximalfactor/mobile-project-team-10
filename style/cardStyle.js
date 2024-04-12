import { StyleSheet } from "react-native";

export default StyleSheet.create({

    card: {
        flexDirection: "row",
        borderRadius: 25,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        backgroundColor: "white"
    },
    shadow: {
        shadowColor: "#171717",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5
    },
    image: {
        width: 150,
        height: 150,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25
    },
    textContainer: {
        flexDirection: "column",
        flex: 1,
        padding: 10
    },
    headingContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headingText: {
        fontSize: 14,
        fontWeight: "900"
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    infoText: {
        fontSize: 12,
        fontWeight: "400",
        color: "#9BA5B7"
    },
    category: {
        marginLeft: 5,
        marginRight: 10
    },
    newsContainer: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1
    },
    newsText: {
        fontSize: 12,
        fontWeight: "400"
    }
})