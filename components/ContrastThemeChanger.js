import React, { useState, useEffect } from 'react'
import { Appearance } from "react-native"
import { Switch } from 'react-native-paper'
import { contrastTheme, lightTheme } from '../constants/Themes'
import { useContrastTheme } from '../context/ContrastThemeContext'

//yritin ainaki saaha aikaseksi sillä periaattella että contrast mode ois vaa teema joka laitetaa päälle niinku tol toisel switchil vaihetaa light themestä dark themee et täl vaihtais light themestä high contrast themee
export default function ContrastThemeChanger() {
    const [themeSwitchOn, setThemeSwitchOn] = useState(false)
    const [currentTheme, setCurrentTheme] = useState(lightTheme)
    const { theme, toggleTheme } = useContrastTheme()

    const onThemeToggleSwitch = () => {
        setThemeSwitchOn(!themeSwitchOn)
        const newTheme = !themeSwitchOn ? contrastTheme : lightTheme
        setCurrentTheme(newTheme)
        toggleTheme()
        console.log("contrast changed")
    }

    useEffect(() => {
        const colorScheme = Appearance.getColorScheme()
        if (colorScheme === "contrast") {
            setCurrentTheme(contrastTheme)
        } else {
            setCurrentTheme(lightTheme)
        }
    }, [])

    return (
        <Switch
            value={theme === contrastTheme}
            onValueChange={onThemeToggleSwitch}
            color="#F28705"
        />
    )
}