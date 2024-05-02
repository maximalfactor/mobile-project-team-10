import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      inputContainer: {
          marginTop: '20%',
          justifyContent: 'center',
        alignItems: 'center'

      },
      textinput: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        margin: 10,
        borderWidth: 2,
        borderColor: '#000000',
        width: 250

      },
      buttonContainer: {
        marginTop: 20
      },
      button: {
        backgroundColor: '#e07509',
          borderRadius: 10,
          alignItems: 'center',
          width: "100%",
          height: 50,
          justifyContent: 'center',
          marginTop: 10,
          color: '#ffffff'
      }, 
      buttonText: {
        color:'black',
        fontWeight: '700',
        fontSize: 30
      },
      currentusertext: {
        fontSize: 20,
        margin: 20
      },
      currentuserbg: {
        borderRadius: 10,
        margin: 30,
        backgroundColor: '#deb287'
      }
})