import { View, Text, TextInput, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'

const LoginForm = () => {
  const LoginFormSchema = Yup.object().shape({
      email: Yup
        .string()
        .email("Please enter valid email")
        .required("An email is required"),
      password: Yup
        .string()
        .required()
        .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
        .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
        .matches(/\d/, "Password must have a number")
        .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
  })

  return (
    <View style={styles.wrapper}> 
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values) => {
              console.log(values)
          }}
          validationSchema={LoginFormSchema}
          validateOnMount={true}
        >    
            {({handleChange, handleBlur, handleSubmit, values, errors, isValid}) => ( 
                
            <>
                <View 
                  style={[
                       styles.inputField, 
                      {
                        borderColor: 
                          values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
                      },
                      ]}
                >
                    <TextInput  
                        placeholderTextColour='#444'
                        placeholder='Phone number, username, or email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textColourType='emailAddress'
                        autoFocus={true}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    
                </View>
                <View 
                  style={[
                      styles.inputField, 
                      {
                        borderColor: 
                          1 > values.password.length || Validator.validate(values.password) >= 6 ? 'green' : 'red'
                      }
                      ]}
                >
                    <TextInput  
                        placeholderTextColour='#444'
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        textColourType='password'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                </View>
                <Pressable  
                    style={styles.button(isValid)}
                    onPress={handleSubmit}
                    disabled={!isValid} 
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </Pressable>
                <View style={{flexDirection: 'row', alignItems: 'center', padding:20, }}>
                    <View style={{flex: 1, height: 1, backgroundColor: '#bab6b6'}} />
                    <View>
                        <Text style={{width: 50, textAlign: 'center', color: '#bab6b6', fontWeight: 'bold'}}>OR</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: '#bab6b6'}} />
                </View>
                <View style={{marginTop: 20}}>
                    <TouchableOpacity 
                    style={styles.signupContainer} 
                    onPress={()=> console.log("Facebook")}
                    >
                        <Image
                            style={{width: 20, height: 20, marginRight: 10}}
                            source={require("../assets/fbLogo.png")}
                            />
                        <Text style={{color: '#385185'}}>
                            Log in with Facebook
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[{alignItems: 'center',}, {marginTop: 20}]}>
                    <TouchableOpacity
                    onPress={() => console.log("Forget Password")}
                    >
                        <Text style={{color: '#385185'}}>Forgett Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.signupContainer, {flex:1,alignItems:'flex-end'}]}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity disabled={false} onPress={()=> console.log("Sign up")}>
                        <Text style={{color:'#0095f6'}}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
          )}
        </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80,
        padding: '8%',
        flex: 1,
    },
    inputField: {
        borderRadius: 4,
        padding: 7,
        backgroundColor: '#fafafa',
        marginBottom: 10,
        borderWidth: 1,
    },
    button: isValid => ({
        backgroundColor: isValid ? '#0096F6' : '#9acaf7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42, 
        borderRadius: 4,
    }),
    buttonText: {
        color: '#fff',
        fontSize: 19,
    },
    signupContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
})

export default LoginForm