import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext } from 'react'
import Styles from '../styles/Styles'
import { Divider } from 'react-native-elements'
import { signupData } from '../data/signupData'
import themeContext from '../config/themeContext'
import { color } from 'react-native-elements/dist/helpers'

const ChatHeader = ({navigation, theme}) => (
  <View style={styles.headerView}>
    <View style={styles.halfHeaderView}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          source={theme.theme=== 'light' ? require('../assets/backBtn.png') : require('../assets/backBtnWhite.png') }
          style={{ width: 30, height: 30 }}
        />
      </Pressable>
      <Text style={[styles.usernameText, {color: theme.color}]}>akash_1k </Text>
      <Image
        source={theme.theme=== 'light' ? require('../assets/backBtn.png') : require('../assets/backBtnWhite.png')}
        style={{ width: 15, height: 15, transform: [{ rotate: '270deg' }] }}
      />
    </View>
    <View style={[styles.halfHeaderView, { justifyContent: 'flex-end' }]}>
      <Pressable onPress={() => console.log('ADD MSG')}>
        <Image
          source={theme.theme=== 'light' ? require('../assets/addChat.png') : require('../assets/addChatWhite.png')}
          style={{ width: 30, height: 30, }}
        />
      </Pressable>
    </View>
  </View>
)




const Chat = ({navigation}) => {
  const theme = useContext(themeContext)
  const RenderItem = ({item}) => {
    // console.log(item)
    return(
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity>
          <Image
            style={styles.avatarStyle}
            source={require('../assets/avatar.png')}
            // source={{uri: item.avtar}}
          />
        </TouchableOpacity>
        <View style={{ left: 20 }}>
          <Pressable onPress={() => console.log("text click")}>
            <Text style={{ fontWeight: '700', fontSize: 16 , color: theme.color}}>{item.username}</Text>
            <Text style={{ fontSize: 13, color: theme.theme==='light' ? '#444' : '#bbb'}}>Send 12m ago</Text>
          </Pressable>
        </View>
      </View>
      <TouchableOpacity>
        <Image
          style={styles.iconStyle}
          source={theme.theme==='light' ? require("../assets/camera.png") : require("../assets/cameraWhite.png")}
        />
      </TouchableOpacity>
    </View>
  )}  
  return (
    <View style={[Styles.androidSafeArea, { paddingHorizontal: '3.5%', backgroundColor: theme.background }]}>
      <ChatHeader navigation={navigation} theme={theme} />
      <Divider width={1} orientation='vertical' />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
        <Pressable>
          <Text style={[styles.textStyle,{ color: theme.color}]}>Messages</Text>
        </Pressable>
        <Pressable>
          <Text style={[styles.textStyle, { color: '#0096F6' }]}>Requests</Text>
        </Pressable>
      </View>
      <FlatList
        data={signupData}
        renderItem={RenderItem}
        keyExtractor={item => item.username}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  usernameText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 35,
  },
  headerView: {
    height: '6%',
    flexDirection: 'row',
  },
  halfHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%'
  },
  iconStyle: {
    width: 40,
    height: 40,
    // marginLeft: 10
  },
  avatarStyle: {
    width: 50,
    height: 50,
    // marginLeft: 10
  },
  textStyle: {
    fontWeight: '700'
  }
})

export default Chat