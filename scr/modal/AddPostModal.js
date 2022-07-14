import { View, Text, StyleSheet, SafeAreaView ,Platform, Alert, Modal, Image, TouchableOpacity, TextInput, Pressable, Button } from 'react-native'
import React, {useState} from 'react'
import Styles from '../styles/Styles'

const gallery = 'https://i.pinimg.com/474x/52/8d/c9/528dc91d4837ee4c7f4ef111c2289b1f.jpg'

const AddPostModal = () => {
    // const [thumbnailUrl, setThumbnailUrl] = useState(gallery)
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={Styles.androidSafeArea}>
        <View style={styles.container}>
        <View>
              <View style={{margin: 20, flexDirection: 'row', justifyContent: 'space-between',}}>
              
                <Pressable 
                  onPress={() => console.log('Image')}
                >
                  <Image 
                    source={{uri: gallery}}
                    style={{width: 100, height: 100,}}
                  />
                </Pressable>
                
                <View style={{right: 120}}>
                  <TextInput 
                    style={{fontSize: 18}}
                    placeholder='Title'
                    // onChangeText={handleChange('title')}
                    // onBlur={handleBlur('title')}
                    // value={values.title}
                    />
                  <TextInput 
                    style={{fontSize: 16}}
                    placeholder='Write a caption...'
                    multiline={true} 
                    // onChangeText={handleChange('caption')}
                    // onBlur={handleBlur('caption')}
                    // value={values.caption}
                  />
                </View>
                </View> 
                <TouchableOpacity 
                  onPress={() => console.log('saved pressed')}
                  style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}
                >  
                  <View style={styles.saveButton}>  
                      <Text style={styles.buttonText}>Save</Text>  
                  </View>  
                </TouchableOpacity>  
                
                <Button title='Modal' onPress={() =>{
                    console.log('Modal')
                    setModalVisible(true)
                  }}
                />
            </View>
        </View>
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    text: {
        fontSize: 28,
    },
    
  // MODAL STYLES
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
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
    marginBottom: 15,
    textAlign: "center"
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

})

export default AddPostModal