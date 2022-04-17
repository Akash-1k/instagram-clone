import { View, Text, TextInput, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'

const SignupForm = () => {

    const LoginFormSchema = Yup.object().shape({
        email: Yup
          .string()
          .email("Please enter valid email")
          .required("An email is required"),
        password: Yup
          .string()
          .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
          .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
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
            {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (   
    
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
                  <Text>
                  {(errors.email && touched.email) &&
                      <Text style={styles.errorText}>{errors.email}</Text>
                    }
                  </Text>
                  <View 
                    style={[
                        styles.inputField, 
                        {
                          borderColor: 
                            (1 > values.password.length || values.password.length > 7) && isValid ? '#ccc' : 'red'
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
                  <Text>
                  {(errors.password && touched.password) &&
                      <Text style={styles.errorText}>{errors.password}</Text>
                    }
                  </Text>
                  <Pressable  
                      style={styles.button(isValid)}
                      onPress={handleSubmit}
                      disabled={!isValid} 
                  >
                      <Text style={styles.buttonText}>Log In</Text>
                  </Pressable>
                  <Text>By signing up, you agree to our Terms , Data</Text>
                  <Text>Policy and Cookies Policy</Text>
                  <View style={[styles.signupContainer, {flex:1,alignItems:'flex-end'}]}>
                      <Text>Have an account? </Text>
                      <TouchableOpacity disabled={false} onPress={()=> console.log("Sign up")}>
                          <Text style={{color:'#0095f6'}}>
                              Log in
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
        borderWidth: 1,
    },
    button: (isValid) => ({
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
    errorText: {
        fontSize: 15,
        color: 'red',
        alignContent: 'center',
      },
})

export default SignupForm