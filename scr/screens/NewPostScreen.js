import { View, Text, StyleSheet, Platform, Alert, Modal, Image, TouchableOpacity, TextInput, Pressable, Button, TextInputBase } from 'react-native'
import React, { useState, useContext } from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import * as ImagePicker from 'expo-image-picker'
import { Divider } from 'react-native-elements'
import { POSTS } from '../data/Posts'
import Styles from '../styles/Styles'
import themeContext from '../config/themeContext'


const gallery = 'https://i.pinimg.com/474x/52/8d/c9/528dc91d4837ee4c7f4ef111c2289b1f.jpg'

const AddToNewsFeed = () => { 
  const [addNewPost, setAddNewPost] = useState(POSTS)
  console.log(addNewPost[0])
}

const NewPostHeader = ({ navigation, theme }) => (
  <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log("back Btn")
          navigation.goBack();
        }}
      >
        <Image 
          style={{ width: 30, height: 30}} 
          source={theme.theme === 'light' ? require('../assets/backBtn.png') : require('../assets/backBtnWhite.png') }
        />
      </TouchableOpacity>
      <Text style={[styles.headerText, {color: theme.color}]}> NEW POSTS </Text>
      <Text></Text>
    </View>
)

const uploadPostSchema = Yup.object().shape({
  title: Yup.string().max(30,'Title limit is 30 Character.'),
  caption: Yup.string().max(2200,'Caption has reached the character limit.')
})

  
const PostUploader = ({navigation, theme, userDetails}) => {
  // console.log('user deat: ',userDetails)
  const [thumbnailUrl, setThumbnailUrl] = useState(gallery)
  const [modalVisible, setModalVisible] = useState(false);
  const [show_Hide, setShowHide] = useState('flex');

  const letToggle = () => {
     setShowHide('flex');
  }
  
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('');

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
      setPickedImagePath(result.uri);
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
      setPickedImagePath(result.uri);
      setThumbnailUrl(result.uri);
      // console.log(result.uri);
    }
  }
  
    
    return(
      <Formik
        initialValues={{caption: '', imageUrl: thumbnailUrl, title: '', username: '', avtar: '', id: '', likes: '', comments: [] }}
        onSubmit={(values) => console.log('asda', values)} 
        validationSchema={uploadPostSchema}
        validateOnMount={true}
      >
        {({ handleBlur, handleChange, handleSubmit, values, errors, isValid}) => 
          <>
            <View>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={[styles.centeredView, Styles.androidSafeArea]}>
                    <View style={styles.modalView}>
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
                
                <View style={{margin: 20, flexDirection: 'row', justifyContent: 'space-between',}}>
                <Pressable onPress={() => {
                  setModalVisible(true)
                  console.log('image')
                  }}
                >
                { thumbnailUrl &&
                <Image 
                  source={{uri: thumbnailUrl}}
                  // source={theme.theme === 'light' ? require('../assets/gallery.jpg') : require('../assets/galleryWhite.jpg')}
                  style={{width: 100, height: 100, backgroundColor: 'red'}}
                />
                }
                </Pressable>
                <View style={{ 
                  marginRight: '30%',}}>
                  <TextInput 
                    style={{fontSize: 18, color: theme.color}}
                    placeholder='Title'
                    placeholderTextColor={theme.color}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                  />
                  <TextInput 
                    style={{fontSize: 16, color: theme.color}}
                    placeholder='Write a caption...'
                    placeholderTextColor={theme.color}
                    multiline={true}
                    numberOfLines={4} 
                    onChangeText={handleChange('caption')}
                    onBlur={handleBlur('caption')}
                    value={values.caption}
                  />
                </View>
                </View>
                <Divider width={0.8} /> 
                <TouchableOpacity 
                  onPress={() => {
                    console.log('saved pressed')
                    values.imageUrl = thumbnailUrl
                    values.avtar = userDetails.avtar
                    values.username = userDetails.username
                    values.id = (Math.floor(Math.random() * 1000) + 1).toString()
                    handleSubmit()
                    letToggle()
                    navigation.navigate('NewsFeed', values)
                    // AddToNewsFeed()
                  }}
                  style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}
                >  
                  <View style={[styles.saveButton,{ backgroundColor: theme.color}]}>  
                      <Text style={[styles.buttonText, {color: theme.background}]}>Save</Text>  
                  </View>  
                </TouchableOpacity>
                {/* { values.imgUrl &&
                <Image source={{ uri: values.imgUrl }}
                  style={{ width: 300, height: 250, resizeMode: 'contain', display: show_Hide }} />} */}
            </View>
          </>
        }
      </Formik>
    )
  }


const AddNewPost = ({navigation,  theme, userDetails}) => {
  return(
    <View style={styles.container}>
      <NewPostHeader navigation={navigation} theme={theme}/>
      <PostUploader navigation={navigation} theme={theme} userDetails={userDetails}/>
    </View>
  )
}

const NewPostScreen = ({navigation, route}) => {
  console.log(route)
  // console.log(Math.floor(Math.random() * 100) + 1)
  const theme = useContext(themeContext)
  
  return (
    <View style={Styles.androidSafeArea}>
        <AddNewPost navigation={navigation} theme={theme} userDetails={route.params.paramKey}/>
    </View>
  )
}
const styles= StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 20,
    marginRight: 20,
  },
  saveButton: {  
    borderRadius: 10,
    marginBottom: 30,  
    width: 60,  
    alignItems: 'center',  
    backgroundColor: 'black'  
  },  
  buttonText: {  
      padding: 5,  
      color: 'white',  
      fontSize: 18  
  },

  // MODAL STYLES
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalView: {
    // margin: 20,
    width: '100%',
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 35,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
    width: 300,
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
  modalText: {
    fontWeight: '700',
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center"
  },
})

export default NewPostScreen