import { View, Text, TextInput, Image, StyleSheet, Pressable, TouchableOpacity, Platform, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { signupData } from '../data/signupData'
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import { RadioButton, } from 'react-native-paper'
import CalendarPicker from 'react-native-calendar-picker'
import * as ImagePicker from 'expo-image-picker'


// import Test from './Test'
// import DatePicker from 'react-native-datepicker'
// import RadioButtonRN from 'radio-buttons-react-native'


// firstname, --> X
// lastname, --> X
// email, --> X
// password, --> X
// dob, --> X
// login_provider, --> X
// city, --> X,


// country, --> X
// image, --> X
// about, --> X
// gender --> X

const gallery = 'https://gravatar.com/avatar/66313b341ec4890e8d82a7cb908da1cf?s=800&d=mp&r=pg'

const SignupForm = ({ navigation }) => {

  const axios = require('axios').default

  const [countryCode, setcountryCode] = useState('IN');
  const [callingCode, setcallingCode] = useState('91');
  const [genderValue, setValue] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(gallery)

  // Modal Start
  
  
  // Modal end  


  const SignupFormSchema = Yup.object().shape({
    email: Yup
      .string()
      .email("Please enter valid email")
      .required("An email is required"),
    password: Yup
      .string()
      .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
      .matches(/\w*[a-z]\w*/, "Password must have a small letter")
      .matches(/\d/, "Password must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    fullname: Yup
      .string()
      .required("Name is required")
      .min(3),
    username: Yup
      .string()
      .required("Username is required")
      .matches(/^[A-Za-z0-9/_\.]+$/, "Username pattern not followed.")
      .min(4, 'Username should be min for 4 character'),
    confirmPassword: Yup
      .string()
      .required('Confirm Password is required')
      .oneOf(
        [Yup.ref('password'), null],
        'Password must match'
      ),
    mobile: Yup
      .string()
      .length(10)
      .required('Mobile number is required'),
  })

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '', fullname: '', confirmPassword: '', username: '', mobile: '', about: '', city: '', }}
        onSubmit={(values) => {
          values.countryCallingCode = callingCode
          values.gender = genderValue
          values.loginProvide = 'direct'
          values.avatar = thumbnailUrl
          console.log(values)
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (

          <>
            <AvatarUploader setThumbnailUrl={setThumbnailUrl} thumbnailUrl={thumbnailUrl}/>
            <View
              style={styles.inputField}>
              <TextInput
                style={styles.textInputStyle}
                placeholder='Email'
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
              <Text style={styles.errorText}>{errors.email}</Text> : null
            }
            <View style={styles.inputField}>
              <TextInput
                style={styles.textInputStyle}
                placeholder='Full Name'
                autoFocus={false}
                onChangeText={handleChange('fullname')}
                onBlur={handleBlur('fullname')}
                value={values.fullname}
              />
            </View>
            {(errors.fullname && touched.fullname) &&
              <Text style={styles.errorText}>{errors.fullname}</Text>
            }
            <View style={styles.inputField}>
              <TextInput
                style={styles.textInputStyle}
                placeholder='Username'
                autoFocus={false}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>
            {(errors.username && touched.username) &&
              <Text style={styles.errorText}>{errors.username}</Text>
            }
            <View style={styles.inputField}>
              <TextInput
                style={styles.textInputStyle}
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
              <Text style={styles.errorText}>{errors.password}</Text>
            }
            <View style={styles.inputField}>
              <TextInput
                style={styles.textInputStyle}
                placeholder='Confirm Password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                // textColourType='confirmPassword'
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
            </View>
            {(errors.confirmPassword && touched.confirmPassword) &&
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            }
            <View>
              {/* <Text style={{fontSize: 19.5}}>Country</Text> */}
              <View style={[styles.inputField, { flexDirection: 'row' }]}>
                <CountryPicker
                  withFilter
                  countryCode={countryCode}
                  // withFlag
                  // withEmoji
                  withAlphaFilter={false}
                  withCurrencyButton={false}
                  withCallingCodeButton={true}
                  // withCountryNameButton
                  // theme={DARK_THEME}
                  onSelect={country => {
                    console.log('country', country);
                    // const cca1 = country.cca2
                    // const cc = country.callingCode
                    const { cca2, callingCode } = country;
                    console.log(cca2, callingCode)
                    setcountryCode(cca2);
                    setcallingCode(callingCode[0]);
                  }}
                  containerButtonStyle={{
                    alignitems: 'center',
                    marginleft: 10,

                  }}
                />
                <TextInput
                  style={styles.textInputStyle}
                  placeholder='Mobile Number'
                  keyboardType='number-pad'
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  value={values.mobile}
                />
              </View>
              {(errors.mobile && touched.mobile) &&
                <Text style={styles.errorText}>{errors.mobile}</Text>
              }
            </View>
            {/* <DOB selectedStartDate={selectedStartDate} setSelectedStartDate={setSelectedStartDate}/> */}
            <DOB/>
            
            <View style={styles.inputField}>
              <TextInput
                style={styles.textInputStyle}
                placeholder='City'
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.city}
              />
            </View>
            <View style={styles.inputField}>
              <TextInput
                style={[styles.textInputStyle, { textAlignVertical: "top", }]}
                placeholderTextColour
                placeholder='Write about yourself...'
                multiline={true}
                numberOfLines={4}
                onChangeText={handleChange('about')}
                onBlur={handleBlur('about')}
                value={values.about}
              />
            </View>
            <View style={styles.inputField}>
              <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={genderValue}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Text>Gender</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="Male" />
                    <Text>Male</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="Female" />
                    <Text>Female</Text>
                  </View>

                </View>
              </RadioButton.Group>
            </View>

            

            <Pressable
              style={styles.signupButton}
              // style={styles.button(isValid)}
              onPress={(v)=>{
                handleSubmit(v)
                // console.log(typeof(v))
                axios.post('http://3.19.53.10:4201/registerUser', {
                  values
                })  
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
              }}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <Text styles={{ textAlign: 'center', }}>By signing up, you agree to our Terms , Data Policy and Cookies Policy</Text>
            <View style={[styles.signupContainer, { flex: 1, marginBottom: '10%', alignItems: 'flex-end', marginTop: '3.5%' }]}>
              <Text>Have an account? </Text>
              <TouchableOpacity disabled={false} onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#0095f6' }}>
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

// const DOB = ({selectedStartDate, setSelectedStartDate})  => {
const DOB = ()  => {
  const [modalDobVisible, setModalDobVisible] = useState(false);
  const minDate = new Date(1950, 1, 1);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const maxDate = new Date();
  const startDate = selectedStartDate
    ? selectedStartDate.format('DD-MM-YYYY').toString()
    : 'DD-MM-YYYY';

  return(
    <View>
      {/* Modal Start */}
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalDobVisible}
      onRequestClose={() => {
        Alert.alert("Date of birth is required");
        setModalDobVisible(!modalDobVisible);
      }}
    >
      <View style={[styles.centeredView, { marginHorizontal: Platform.OS === "web" ? '33%' : 0, }]}>
        <View style={styles.modalView}>
          <View>
            <CalendarPicker
              minDate={minDate}
              maxDate={maxDate}
              startFromMonday={true}
              width={390}
              horizontal={true}
              scrollable
              // headingLevel={200}
              showDayStragglers
              selectedDayColor="#222"
              selectedDayTextColor="#FFF"
              onDateChange={currentDate => {
                // console.log(typeof(currentDate))
                // console.log(currentDate)
                setSelectedStartDate(currentDate)
                setModalDobVisible(!modalDobVisible)
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
    {/* Modal End */}
    <View style={[styles.inputField]}>
      <Pressable onPress={() => setModalDobVisible(true)}>
        <TextInput
          style={styles.textInputStyle}
          placeholder={startDate}
          value={startDate}
          editable={false}
          selectTextOnFocus={false}
        />
      </Pressable>
    </View>


  </View>
  )
}



const AvatarUploader = ({thumbnailUrl, setThumbnailUrl}) => {
  // console.log('user deat: ',userDetails)
  // const [thumbnailUrl, setThumbnailUrl] = useState(gallery)
  const [modalVisible, setModalVisible] = useState(false);
  // const [show_Hide, setShowHide] = useState('flex');

  // const letToggle = () => {
  //   setShowHide('flex');
  // }

  // The path of the picked image
  // const [pickedImagePath, setPickedImagePath] = useState('');

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    // Explore the result
    // console.log(result);

    if (!result.cancelled) {
      // setPickedImagePath(result.uri);
      setThumbnailUrl(result.uri);
      // console.log(result.uri);
    }
  }

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    // console.log(result);

    if (!result.cancelled) {
      // setPickedImagePath(result.uri);
      setThumbnailUrl(result.uri);
      // console.log(result.uri);
    }
  }


  return (
    <View style={{alignItems: 'center',}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{marginHorizontal: Platform.OS === "web" ? '33%' : 0, flex:1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View style={[styles.modalView, { padding: 30}]}>
            <Text style={styles.modalText}>Add Photo!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                console.log('Take Photo')
                setModalVisible(!modalVisible)
                openCamera()
              }}
            >
              <Text style={styles.textStyle}>Take Photo</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                console.log('Choose Photo')
                setModalVisible(!modalVisible)
                showImagePicker()
              }}
            >
              <Text style={styles.textStyle}>Choose Photo</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                console.log('Cancel')
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <Pressable onPress={() => {
          setModalVisible(true)
          console.log('image')
        }}
        >
          {thumbnailUrl &&
            <Image
              source={{ uri: thumbnailUrl }}
              style={{ width: 75, height: 75, borderRadius: 50, backgroundColor: '#444' }}
            />
          }
        </Pressable>
      </View>

      {/* { values.imgUrl &&
                <Image source={{ uri: values.imgUrl }}
                  style={{ width: 300, height: 250, resizeMode: 'contain', display: show_Hide }} />} */}
    </View>

  )
}


const styles = StyleSheet.create({
  wrapper: {
    // marginTop: 80,
    // padding: '8%',
    flex: 1,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  inputField: {
    borderRadius: 4,
    padding: 7,
    marginTop: 12,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    // marginBottom: 20,
  },
  signupButton: {
    marginTop: 12,
    backgroundColor: '#0096F6',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  },
  // button: (isValid) => ({
  //   backgroundColor: isValid ? '#0096F6' : '#9acaf7',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   minHeight: 42, 
  //   borderRadius: 4,
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
  date: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: '100%',
    marginBottom: 20,
  },
  textInputStyle: {
    fontSize: 16,
    left: 5,
    color: '#000'
  },

  // Modal Stytles
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontWeight: '700',
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 50,
    padding: 10,
    elevation: 2, 
    width: '70%',
    marginBottom: 10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  dateText: {
    margin: 16,
  },
})

export default SignupForm