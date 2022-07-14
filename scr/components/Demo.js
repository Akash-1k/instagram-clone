import { View, Text, ImageBackground, StyleSheet, Platform } from 'react-native'
import React, {useState} from 'react'
import { Button } from 'react-native-elements'


const Demo = () => {
  
  let images = [
    "https://picsum.photos/200",
    "https://picsum.photos/300"
  ]
  
  let imagesLocal = [
    require('../assets/instagramLogo.png'),
    require('../assets/instagramWordLogo.png'),
  ]
  
  let [currentImg, setCurrentImg] = useState(images[0])
  let [currentImgLocal, setCurrentImgLocal] = useState(images[0])
  
  setTimeout( () =>{
    setCurrentImg(images[1])
    console.log(currentImg);
  }, 2000 );
  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: currentImg}} resizeMode="cover" style={styles.image}>
        <View style={{backgroundColor: 'rgba(20,200,200,.3)', flex: 3, justifyContent: 'center'}}>
        
        
          <Text style={{textAlign: "center",}}>center: Center the image in the view along both dimensions. If the image is larger than the view, scale it down uniformly so that it is contained in</Text>
        </View>
        <View style={{backgroundColor: 'rgba(200,200,0,.3)', flex: 1, justifyContent: 'flex-end'}}>
          <Button title='Login'/>
          <Text style={{textAlign: "center",}}>image in the view along both dimensions. If t</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginHorizontal: Platform.OS === "web" ? '35%' : 0,
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#0c0"
      },
})

export default Demo