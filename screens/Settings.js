import React from 'react'
import { SafeAreaView, TouchableOpacity } from "react-native"
import { List, Switch } from 'react-native-paper'
import ThemeChanger from '../components/ThemeChanger'
import ContrastThemeChanger from '../components/ContrastThemeChanger'
import FontSizeChanger from '../components/FontSizeChanger'
import { useTheme } from "../context/ThemeContext"
import { useContrastTheme } from '../context/ContrastThemeContext'
import { useFont } from '../context/FontSizeContext'
import { useNavigation } from '@react-navigation/native'

export default function Settings() {
    const { theme } = useTheme()
    const { contrastTheme } = useContrastTheme()
    const navigation = useNavigation()
    const { fontSize } = useFont()

    return (
        <SafeAreaView style={{backgroundColor: theme.containerBackgroundColor, height: "100%"}}>

            <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                <List.Item
                    title="Account"
                    titleStyle={{color: theme.textColor, fontSize: fontSize.headingText}}
                />
            </TouchableOpacity>

            <List.Item
                title="Theme"
                titleStyle={{color: theme.textColor, fontSize: fontSize.headingText}}
                right={(props) => <ThemeChanger {...props} />}
            />

            <List.Item
                title="Font Size"
                titleStyle={{color: theme.textColor, fontSize: fontSize.headingText}}
                right={(props) => <FontSizeChanger {...props} />}
            />

            <List.Item
                title="High Contrast Mode"
                //tähän kun pistää contrastTheme eikä pelkkä theme nii se valittaa textColor undefined, jos se ei vaikuta siihen miksi switchi ei tee muuta ku pistää console logii viesti nii en oo ihan varma missä tää menee rikki
                titleStyle={{color: contrastTheme.textColor, fontSize: fontSize.headingText}}
                right={(props) => <ContrastThemeChanger {...props} />}
            />

            <TouchableOpacity onPress={() => navigation.navigate("Hidden Categories")}>
                <List.Item
                    title="Hidden categories"
                    titleStyle={{color: theme.textColor, fontSize: fontSize.headingText}}
                />
            </TouchableOpacity>

        </SafeAreaView>
    )
}