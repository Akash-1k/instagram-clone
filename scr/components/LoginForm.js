 
import { View, Text, TextInput, Image, StyleSheet, Pressable, Button, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { signupData } from '../data/signupData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../config/userContext'


const LoginForm = ({ navigation }) => {
  const axios = require('axios').default
  const [logErr, setLogErr] = useState(null)
  const abc = useContext(UserContext)

  const userInfo = {
        "email": "admin@gmail.com",
        "fullname": "Admin",
        "password": "Pass1234@",
        "username": "admin",
        "avtar": 'https://randomuser.me/api/portraits/men/32.jpg',
    }
  
    useEffect(() => {
        getData()
       },[])
      
    const getData = () => {
    try{
        AsyncStorage.getItem('loginDetails')
        .then(value => {
            if(value != null){
            navigation.navigate('NewsFeed')
            }
        })
    }
    catch (error){
        console.log(error)
    }
    }
    
  const _login = async(values) =>{
      try{

          if(userInfo.email === values.email && userInfo.password === values.password){
              // await AsyncStorage.setItem('isLoggedIn', '1')
              console.log(abc.setUservalue)
              console.log(abc.userValue)

              abc.setUservalue({isLogged: true, userDetails: userInfo})
              await AsyncStorage.setItem('loginDetails', JSON.stringify(userInfo))
            //   navigation.navigate('NewsFeed')           
            } 
          else {
                alert('Invalid credentials')
            }
        }
        catch(error){
            console.log(error)
        }
    }

  const LoginFormSchema = Yup.object().shape({
      username: Yup
        .string()
        .matches(/\w*[a-z]\w*/,  "Username must have a small letter"),
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
    <View style={styles.wrapper}> 
        
        <Formik
          initialValues={{username: '', email: '', password: ''}}
          onSubmit={(values) => {
              console.log(values)   
          }}
          validationSchema={LoginFormSchema}
          validateOnMount={true}
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
                {(errors.username && touched.username) ?
                    <Text style={styles.errorText}>{errors.username}</Text>: null
                  }
                {(errors.email && touched.email) ?
                    <Text style={styles.errorText}>{errors.email}</Text>: null
                  }
                
                <View 
                  style={styles.inputField}>
                    <TextInput  
                        placeholderTextColour='#444'
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        textColourType='password'
                        onChangeText={handleChange('password') }
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                </View>
                
                {(errors.password && touched.password) ?
                    <Text style={styles.errorText}>{errors.password}</Text> :
                    null
                }
                    {logErr && <Text style={[styles.errorText, {alignSelf: 'center', fontSize: 16}]}>{logErr}</Text>}
                
                <Pressable  
                    // style={styles.button(isValid)}
                    style={styles.button}
                    disabled={!isValid} 
                    onPress={()=>{
                        // console.log(values)
                        _login(values, navigation)
                    }}
                    // onPress={() => {
                        
                    //     axios.post('http://3.19.53.10:4201/loginUser', {
                    //     // axios.post('https://jsonplaceholder.typicode.com/todos/', {
                    //         email: values.email,
                    //         password: values.password
                    //       })
                    //       .then(function (response) {
                    //         console.log(response.data);
                    //         // navigations.navigate('NewsFeed')
                    //         for(let i = 0; i < signupData.length; i++){
                    //             if (values.email === signupData[i].email){
                    //                 // console.log('Login Pressed 2')
                    //                 if (values.password === signupData[i].password){
                    //                     navigation.navigate('NewsFeed', {
                    //                         paramKey: signupData[i],
                    //                     })
                    //                     break
                    //                 }
                    //                 else{
                    //                     // console.log('Login Pressed 4')
                    //                     setLogErr('Wrong Password')
                    //                     alert('Wrong Password')
                    //                     break
                    //                 }
                    //             }
                    //             else{
                    //                 setLogErr('No such User not found')
                    //                 alert('No such User  found')
                    //                 break
                    //             }
                    //             console.log(i)
                    //         }
                    //       })
                    //       .catch(function (error) {
                    //         console.log(error);
                    //       });
                        
                    // }}
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
                        <Text style={{color: '#385185'}}>Forget Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.signupContainer, { flex:1, marginBottom: '10%', alignItems:'flex-end'}]}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity disabled={false} onPress={() => navigation.navigate('Signup')}>
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
        marginTop: '5%',
        flex: 5,
        width: '85%',
    },
    inputField: {
        borderRadius: 4,
        padding: 7,
        backgroundColor: '#fafafa',
        borderWidth: 1,
        marginTop: '5%',
    },
    button: {
        marginTop: '5%',
        backgroundColor: '#0096F6',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42, 
        borderRadius: 4,
    },
    // button: (isValid) => ({
    //     backgroundColor: isValid ? '#0096F6' : '#9acaf7',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     minHeight: 42, 
    //     borderRadius: 4,
    // }),
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

export default LoginForm

// ************************************************************************

 
// import { View, Text, TextInput, Image, StyleSheet, Pressable, Button, TouchableOpacity } from 'react-native'
// import React, {useState} from 'react'
// import { Formik } from 'formik'
// import * as Yup from 'yup'
// import { signupData } from '../data/signupData'
// import AsyncStorage from '@react-native-async-storage/async-storage'


// const LoginForm = ({ navigation }) => {
//   const axios = require('axios').default
//   const [logErr, setLogErr] = useState(null)
//   const userInfo = {
//         "email": "admin@gmail.com",
//         "fullname": "Admin",
//         "password": "Pass1234@",
//         "username": "admin",
//         "avtar": 'https://randomuser.me/api/portraits/men/32.jpg',
//     }
  
//   const _login = async(values) =>{
//       if(userInfo.email === values.email && userInfo.password === values.password){
//         await AsyncStorage.setItem('isLoggedIn', '1')
//         await AsyncStorage.setItem('loginDetails', JSON.stringify(values))
//         navigation.navigate('NewsFeed', userInfo)
//       } else {
//         alert('Invalid credentials')
//       }
//   }

//   const LoginFormSchema = Yup.object().shape({
//       username: Yup
//         .string()
//         .matches(/\w*[a-z]\w*/,  "Username must have a small letter"),
//       email: Yup
//         .string()
//         .email("Please enter valid email")
//         .required("An email is required"),
//       password: Yup
//         .string()
//         .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
//         .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
//         .matches(/\d/, "Password must have a number")
//         .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
//         .min(8, ({ min }) => `Password must be at least ${min} characters`)
//         .required('Password is required'),
//   })


//   return (
//     <View style={styles.wrapper}> 
        
//         <Formik
//           initialValues={{username: '', email: '', password: ''}}
//           onSubmit={(values) => {
//               console.log(values)   
//           }}
//           validationSchema={LoginFormSchema}
//           validateOnMount={true}
//         >    

//             {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (   
  
//             <>
//                 <View style={styles.inputField}>
//                     <TextInput  
//                         placeholderTextColour='#444'
//                         placeholder='Phone number, username, or email'
//                         autoCapitalize='none'
//                         keyboardType='email-address'
//                         textColourType='emailAddress'
//                         autoFocus={false}
//                         onChangeText={handleChange('email')}
//                         onBlur={handleBlur('email')}
//                         value={values.email}
//                     />
//                 </View>
//                 {(errors.username && touched.username) ?
//                     <Text style={styles.errorText}>{errors.username}</Text>: null
//                   }
//                 {(errors.email && touched.email) ?
//                     <Text style={styles.errorText}>{errors.email}</Text>: null
//                   }
                
//                 <View 
//                   style={styles.inputField}>
//                     <TextInput  
//                         placeholderTextColour='#444'
//                         placeholder='Password'
//                         autoCapitalize='none'
//                         autoCorrect={false}
//                         secureTextEntry={true}
//                         textColourType='password'
//                         onChangeText={handleChange('password') }
//                         onBlur={handleBlur('password')}
//                         value={values.password}
//                     />
//                 </View>
                
//                 {(errors.password && touched.password) ?
//                     <Text style={styles.errorText}>{errors.password}</Text> :
//                     null
//                 }
//                     {logErr && <Text style={[styles.errorText, {alignSelf: 'center', fontSize: 16}]}>{logErr}</Text>}
                
//                 <Pressable  
//                     // style={styles.button(isValid)}
//                     style={styles.button}
//                     disabled={!isValid} 
//                     onPress={()=>{
//                         // console.log(values)
//                         _login(values, navigation)
//                     }}
//                     // onPress={() => {
                        
//                     //     axios.post('http://3.19.53.10:4201/loginUser', {
//                     //     // axios.post('https://jsonplaceholder.typicode.com/todos/', {
//                     //         email: values.email,
//                     //         password: values.password
//                     //       })
//                     //       .then(function (response) {
//                     //         console.log(response.data);
//                     //         // navigations.navigate('NewsFeed')
//                     //         for(let i = 0; i < signupData.length; i++){
//                     //             if (values.email === signupData[i].email){
//                     //                 // console.log('Login Pressed 2')
//                     //                 if (values.password === signupData[i].password){
//                     //                     navigation.navigate('NewsFeed', {
//                     //                         paramKey: signupData[i],
//                     //                     })
//                     //                     break
//                     //                 }
//                     //                 else{
//                     //                     // console.log('Login Pressed 4')
//                     //                     setLogErr('Wrong Password')
//                     //                     alert('Wrong Password')
//                     //                     break
//                     //                 }
//                     //             }
//                     //             else{
//                     //                 setLogErr('No such User not found')
//                     //                 alert('No such User  found')
//                     //                 break
//                     //             }
//                     //             console.log(i)
//                     //         }
//                     //       })
//                     //       .catch(function (error) {
//                     //         console.log(error);
//                     //       });
                        
//                     // }}
//                 >
//                     <Text style={styles.buttonText}>Log In</Text>
//                 </Pressable>
//                 <View style={{flexDirection: 'row', alignItems: 'center', padding:20, }}>
//                     <View style={{flex: 1, height: 1, backgroundColor: '#bab6b6'}} />
//                     <View>
//                         <Text style={{width: 50, textAlign: 'center', color: '#bab6b6', fontWeight: 'bold'}}>OR</Text>
//                     </View>
//                     <View style={{flex: 1, height: 1, backgroundColor: '#bab6b6'}} />
//                 </View>

//                 <View style={{marginTop: 20}}>
//                     <TouchableOpacity 
//                     style={styles.signupContainer} 
//                     onPress={()=> console.log("Facebook")}
//                     >
//                         <Image
//                             style={{width: 20, height: 20, marginRight: 10}}
//                             source={require("../assets/fbLogo.png")}
//                             />
//                         <Text style={{color: '#385185'}}>
//                             Log in with Facebook
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={[{alignItems: 'center',}, {marginTop: 20}]}>
//                     <TouchableOpacity
//                     onPress={() => console.log("Forget Password")}
//                     >
//                         <Text style={{color: '#385185'}}>Forget Password?</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={[styles.signupContainer, { flex:1, marginBottom: '10%', alignItems:'flex-end'}]}>
//                     <Text>Don't have an account? </Text>
//                     <TouchableOpacity disabled={false} onPress={() => navigation.navigate('Signup')}>
//                         <Text style={{color:'#0095f6'}}>
//                             Sign Up
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </>
//           )}
//         </Formik>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     wrapper: {
//         marginTop: '5%',
//         flex: 5,
//         width: '85%',
//     },
//     inputField: {
//         borderRadius: 4,
//         padding: 7,
//         backgroundColor: '#fafafa',
//         borderWidth: 1,
//         marginTop: '5%',
//     },
//     button: {
//         marginTop: '5%',
//         backgroundColor: '#0096F6',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: 42, 
//         borderRadius: 4,
//     },
//     // button: (isValid) => ({
//     //     backgroundColor: isValid ? '#0096F6' : '#9acaf7',
//     //     alignItems: 'center',
//     //     justifyContent: 'center',
//     //     minHeight: 42, 
//     //     borderRadius: 4,
//     // }),
//     buttonText: {
//         color: '#fff',
//         fontSize: 19,
//     },
//     signupContainer: {
//         flexDirection: 'row',
//         width: '100%',
//         justifyContent: 'center',
//     },
//     errorText: {
//         fontSize: 15,
//         color: 'red',
//         alignContent: 'center',
//       },
// })

// export default LoginForm