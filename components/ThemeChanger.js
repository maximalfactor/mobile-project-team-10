import React, { useState, useEffect } from 'react'
import { Appearance } from "react-native"
import { Switch } from 'react-native-paper'
import { darkTheme, lightTheme } from '../constants/Themes'
import { useTheme } from '../context/ThemeContext'

export default function ThemeChanger() {
    const [themeSwitchOn, setThemeSwitchOn] = useState(false)
    const [currentTheme, setCurrentTheme] = useState(lightTheme)
    const { theme, toggleTheme } = useTheme()

    const onThemeToggleSwitch = () => {
        setThemeSwitchOn(!themeSwitchOn)
        const newTheme = !themeSwitchOn ? darkTheme : lightTheme
        setCurrentTheme(newTheme)
        toggleTheme()
        console.log("theme changed")
    }

    useEffect(() => {
        const colorScheme = Appearance.getColorScheme()
        if (colorScheme === "dark") {
            setCurrentTheme(darkTheme)
        } else {
            setCurrentTheme(lightTheme)
        }
    }, [])

    return (
        <Switch
            value={theme === darkTheme}
            onValueChange={onThemeToggleSwitch}
            color="#F28705"
        />
    )
}