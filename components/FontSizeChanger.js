import React, { useContext } from "react"
import { TouchableOpacity, View, Text } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useFont } from "../context/FontSizeContext"
import { smallFont, mediumFont, largeFont } from "../constants/FontSize"
import { useTheme } from "../context/ThemeContext"

export default function FontSizeChanger() {
    const { theme } = useTheme()
    const { fontSize, setFontSize} = useFont()
    
    const increaseFontSize = () => {
        if (fontSize === smallFont) {
            setFontSize(mediumFont)
        } else if (fontSize === mediumFont) {
            setFontSize(largeFont)
        } else {
            setFontSize(smallFont)
        }
    }

    const decreaseFontSize = () => {
        if (fontSize === smallFont) {
            setFontSize(largeFont)
        } else if (fontSize === mediumFont) {
            setFontSize(smallFont)
        } else {
            setFontSize(mediumFont)
        }
    }

    return (
        <View style={{flexDirection: "row", alignItems: "center"}}>

            <TouchableOpacity onPress={decreaseFontSize}>
                <MaterialCommunityIcons name="chevron-left" size={24} style={{color: theme.fontBtnColor}}/>
            </TouchableOpacity>

            <Text style={{fontSize: fontSize.newsText, color: theme.textColor}}>{fontSize === smallFont ? "Small" : fontSize === mediumFont ? "Medium" : "Large"}</Text>

            <TouchableOpacity onPress={increaseFontSize}>
                <MaterialCommunityIcons name="chevron-right" size={24} style={{color: theme.fontBtnColor}}/>
            </TouchableOpacity>

        </View>
    )
}
