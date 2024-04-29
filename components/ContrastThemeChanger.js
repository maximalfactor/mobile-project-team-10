import React, { useState, useEffect } from 'react'
import { Switch } from 'react-native-paper'
import { contrastTheme, lightTheme } from '../constants/Themes'
import { useTheme } from '../context/ThemeContext'

export default function ContrastThemeChanger() {
    const { theme, setTheme } = useTheme()
    const [contrastModeOn, setContrastModeOn] = useState(false)
    const [previousTheme, setPreviousTheme] = useState(lightTheme) // Määrittää aikasemman teeman

    // Päivittää teeman
    useEffect(() => {
        if (theme === contrastTheme) {
            setContrastModeOn(true)
        } else {
            setContrastModeOn(false)
        }
    }, [theme])
    
    // Jos contrast mode on päällä, switchiä painamalla vaihtaa sen aikaisempaan teemaan
    // Jos contrast mode ei ole päällä, vaihtaa sen päälle
    const onThemeToggleSwitch = () => {
        if (contrastModeOn) {
            setTheme(previousTheme)             
            console.log("contrast mode off")
        } else {
            setPreviousTheme(theme)
            setTheme(contrastTheme)     // Contextia ei tarvi erikseen määrittää, kun käytetään setThemeä suoraan tässä changerissa,
            console.log("contrast mode on")         // eli themeContextin togglethemeä ei käytetä teeman vaihtamiseen, vaan teeman vaihto tehdään kokonaan tässä funktiossa
        }
    }

    return (
        <Switch
            value={contrastModeOn}
            onValueChange={onThemeToggleSwitch}
            color="#F28705"
        />
    )
}