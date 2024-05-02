import { Text, SafeAreaView, View, Pressable, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from "../firebaseConfig";
import { KeyboardAvoidingView, TextInput } from "react-native";
import loginstyle from "../style/loginstyle";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function Account() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('')
    const auth = FIREBASE_AUTH



    let loggeduser = 'Current users email is:   ' + user;

    const signIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            setUser(email)
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your email')
        } catch (error) {
            console.log(error);
            alert('Signup failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        
        <KeyboardAvoidingView style={loginstyle.container} behavior="padding">
        <SafeAreaView>
            <View style={loginstyle.inputContainer}>
                <TextInput value={email} style={loginstyle.textinput} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput secureTextEntry={true} value={password} style={loginstyle.textinput} placeholder="password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
                {loading ? <ActivityIndicator size="large" color="#0000ff" />
                : <>
                <Pressable style={loginstyle.button} title="Login" onPress={signIn}>
                    <Text style={loginstyle.buttonText}>Login</Text>
                </Pressable>
                <Pressable style={loginstyle.button} title="Create account" onPress={signUp}>
                    <Text style={loginstyle.buttonText}>Create account</Text>
                </Pressable>
                </>}
            </View>
            <View style={loginstyle.currentuserbg}>
            <Text style={loginstyle.currentusertext}>{loggeduser}</Text>
            </View>
        </SafeAreaView>
        </KeyboardAvoidingView>
    )
}