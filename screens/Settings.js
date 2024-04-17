import React from 'react'
import { SafeAreaView, TouchableOpacity } from "react-native"
import { List, Switch } from 'react-native-paper'
import ThemeChanger from '../components/ThemeChanger'
import FontSizeChanger from '../components/FontSizeChanger'
import { useTheme } from "../context/ThemeContext"
import { useFont } from '../context/FontSizeContext'
import { useNavigation } from '@react-navigation/native'

export default function Settings() {
    const { theme } = useTheme()
    const navigation = useNavigation()
    const { fontSize } = useFont()
    const [contrastSwitchOn, setContrastSwitchOn] = React.useState(false)
    const onContrastToggleSwitch = () => setContrastSwitchOn(!contrastSwitchOn)

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
                titleStyle={{color: theme.textColor, fontSize: fontSize.headingText}}
                right={props => <Switch {...props} value={contrastSwitchOn} onValueChange={onContrastToggleSwitch} />}
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