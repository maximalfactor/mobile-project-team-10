import { createContext, useState, useContext } from "react"
import { mediumFont } from "../constants/FontSize"

const FontSizeContext = createContext()

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(mediumFont)

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  )
}

export const useFont = () => useContext(FontSizeContext)
