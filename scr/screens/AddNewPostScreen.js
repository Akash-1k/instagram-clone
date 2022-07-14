import { View, Text, Image, StyleSheet, Platform, TextInput, Pressable } from 'react-native'
import React from 'react'
import Styles from '../styles/Styles'
import { Formik } from 'formik'
import * as Yup from 'yup'

const AddNewPostScreen = () => {


  const LoginFormSchema = Yup.object().shape({
    email: Yup
      .string()
      .email("Please enter valid email")
      .required("An email is required"),
    password: Yup
      .string()
      .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
})
  return (
    <View style={[Styles.androidSafeArea, {backgroundColor: "#fff", alignItems: 'center'}
      ]}
    >
       <Formik
            initialValues={{email: '', password: '',}}
            onSubmit={(values) => {
                console.log(values)
            }}
            validateOnMount={true}
            validationSchema={LoginFormSchema}
          >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (
              <>
                <View style={styles.inputField}>
                    <TextInput  
                        placeholderTextColour='#444'
                        placeholder='Phone number, username, or email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textColourType='emailAddress'
                        autoFocus={false}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                </View>
                {(errors.email && touched.email) ?
                  <Text style={{color:'orange'}}>{errors.email}</Text>: null
                }
                <View style={styles.inputField}>
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
                {(errors.password && touched.password) &&
                  <Text style={{color:'orange'}}>{errors.password}</Text>
                }
                <Pressable
                  style={styles.button}
                >
                  <Text>Log In</Text>
                </Pressable>
              </>
            )}
        </Formik>      

      <Text style={{color: 'white'}}> DEMO </Text>

      {/* <Text>{route.params.paramKey.title}</Text>
      <Text>{route.params.paramKey.caption}</Text>
      <Image
        source={{ uri: route.params.paramKey.imgUrl }}
        style={styles.postImage}
      // style={{ width: 300, height: 250, resizeMode: 'contain',}}
      /> */}
    </View>
  )
}

export default AddNewPostScreen

const styles = StyleSheet.create({
  postImage: {
    width: '100%',
    height: 400,
  },
  inputField: {
    borderRadius: 4,
    padding: 7,
    backgroundColor: '#fafafa',
    borderWidth: 1,
  },
  button:{
    backgroundColor:  '#0096F6' ,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42, 
    borderRadius: 4,
  },
})