import { View, Text, SafeAreaView, StyleSheet, Platform, Image, StatusBar, FlatList, TouchableOpacity, Button, ScrollView } from 'react-native'
import React, { useState,  useContext, useEffect } from 'react'
import Header from '../components/Header'
import Post from '../data/Post'
import { POSTS } from '../data/Posts'
import { Divider } from 'react-native-elements'
import Styles from '../styles/Styles'
import themeContext from '../config/themeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../config/userContext'


const PostHeader = ({ username, avtar, theme }) => (
  <View style={styles.postHeader}>
    <View style={{ flexDirection: 'row', alignItem: 'center', justifyContent: 'center' }}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: avtar,
        }}
      />
      <Text style={[styles.title, {color: theme.color}]}>{username} </Text>
    </View>
    <View>
      <View style={[styles.viewDots, {backgroundColor: theme.color}]}></View>
      <View style={[styles.viewDots, {backgroundColor: theme.color}]}></View>
      <View style={[styles.viewDots, {backgroundColor: theme.color}]}></View>
    </View>
  </View>
);

const PostImage = ({ imageUrl }) => (
  <View style={{ paddingHorizontal: 4, }}>
    <Image
      style={styles.postImage}
      source={{
        uri: imageUrl,
      }}
    />
  </View>
);

const PostFooterIcon = ({theme}) => {
  return (
    <View style={{}}>
      <View style={[styles.iconContainer, { justifyContent: 'space-between',}]}>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Image
              style={styles.iconStyle}
              source={theme.theme === 'light' ? require("../assets/like.png"): require("../assets/likeWhite.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.iconStyle}
              source={theme.theme === 'light' ? require("../assets/comment.png"): require("../assets/commentWhite.png")} 
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.iconStyle}
              source={theme.theme === 'light' ? require("../assets/share.png"): require("../assets/shareWhite.png")} 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Image
            style={styles.iconStyle}
            source={theme.theme === 'light' ? require("../assets/save.png"): require("../assets/saveWhite.png")} 
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Likes = ({ likes, theme }) => (
  <View>
  {likes > 0 &&(
  <Text style={{ fontWeight: 'bold', marginLeft: 5 , color: theme.color}}>
    {likes === 1 ? likes + ' like': likes + ' likes' }
  </Text>)
  }  
  </View>
)

const Caption = ({ item, theme }) => (
  <View style={{ flexDirection: 'row' }}>
    <Text style={{color: theme.color}}>
      <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
      <Text>{' '}{item.caption}</Text>
    </Text>
  </View>
)

const CommentSection = ({ item, theme }) => (
  <View style={{ marginTop: 2, marginBottom: 20 ,}}>
    {!!item.comments.length && (
      <Text style={{ color: 'gray' }}>
        View{item.comments.length > 1 ? ' all' : ''} {item.comments.length}{' '}
        {item.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
)

const Comments = ({ item }) => {
  // console.log(item)
  return (
    <>
      {item.comments.map((comment, index) => (
        <View key={index}>
          <Text style={{ color: 'white', marginVertical: 2 }}>
            <Text style={{ fontWeight: 'bold' }}>{comment.user} </Text>
            {comment.comment}
          </Text>
        </View>
      ))}
    </>
  )
}

const NewsFeed = ({ navigation, route }) => {
  const [newData, setNewData] = useState(POSTS)
  const theme = useContext(themeContext)

  console.log(route)
  
  // useEffect(() => {
  //   getData();
  // }, []);



  const getData = () => {
    try {
      AsyncStorage.getItem('loginDetails').then((value) => {
        if (value != null) {
          const userInfo = JSON.parse(value);

          setUser(userInfo.User);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  
  
  
  // const userDetails = {
  //     "email": "admin@gmail.com",
  //     "fullname": "Admin",
  //     "password": "Pass1234@",
  //     "username": "admin",
  //     "avtar": 'https://randomuser.me/api/portraits/men/32.jpg',
  // }
  // console.log(userDetails)
  // console.log(route)
  // console.log("1")

  // console.log(route)
  // useEffect(()=>{
  //   setNewData(() => [userDetails, ...newData])
  // },[])

  const renderItem = ({ item }) => (
    <View style={{ borderColor: theme.background, }}>
      {/* <Text>{userDetails.username}</Text> */}
      
      <PostHeader username={item.username} avtar={item.avtar} theme={theme} />
      <PostImage imageUrl={item.imageUrl} />
      <View style={{marginHorizontal: 5, marginTop: 10}}>
        <PostFooterIcon theme={theme}/>
        <Likes likes={item.likes} theme={theme}/>
        <Caption item={item} theme={theme}/>
        <CommentSection item={item} theme={theme}/>
      </View>
      <Divider/>
    </View>
  );
  // console.log(navigation)
  // console.log(POSTS);
  return (

    <SafeAreaView style={[Styles.androidSafeArea, {backgroundColor: theme.background}]}>
      <View>
        <Header navigation={navigation}/>
      </View>
      <Divider width={1} orientation='vertical' />
      {/* <Text>{userDetails.username}</Text> */}
      <Button
        title='Post'
        onPress={() => {
          const userDetails = route.params
          // console.log(userDetails.email)
          // console.log(newData)
          setNewData(() => [ userDetails, ...newData ])
        }}
      />
      {/* <Text>{userValue}</Text> */}
      <FlatList
        data={newData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  postHeader: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginTop: 8,
    marginLeft: 8,
  },
  tinyLogo: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  viewDots: {
    borderRadius: 50,
    width: 4,
    height: 4,
    marginBottom: 3,
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  newPost: {
    width: 28,
    height: 28,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginLeft: 10
  },
})

export default NewsFeed




// ***************************************************************************************


  // import { View, Text, SafeAreaView, StyleSheet, Platform, Image, StatusBar, FlatList, TouchableOpacity, Button, ScrollView } from 'react-native'
  // import React, { useState,  useContext, useEffect } from 'react'
  // import Header from '../components/Header'
  // import Post from '../data/Post'
  // import { POSTS } from '../data/Posts'
  // import { Divider } from 'react-native-elements'
  // import Styles from '../styles/Styles'
  // import themeContext from '../config/themeContext'
  // import AsyncStorage from '@react-native-async-storage/async-storage'


  // const PostHeader = ({ username, avtar, theme }) => (
  //   <View style={styles.postHeader}>
  //     <View style={{ flexDirection: 'row', alignItem: 'center', justifyContent: 'center' }}>
  //       <Image
  //         style={styles.tinyLogo}
  //         source={{
  //           uri: avtar,
  //         }}
  //       />
  //       <Text style={[styles.title, {color: theme.color}]}>{username} </Text>
  //     </View>
  //     <View>
  //       <View style={[styles.viewDots, {backgroundColor: theme.color}]}></View>
  //       <View style={[styles.viewDots, {backgroundColor: theme.color}]}></View>
  //       <View style={[styles.viewDots, {backgroundColor: theme.color}]}></View>
  //     </View>
  //   </View>
  // );

  // const PostImage = ({ imageUrl }) => (
  //   <View style={{ paddingHorizontal: 4, }}>
  //     <Image
  //       style={styles.postImage}
  //       source={{
  //         uri: imageUrl,
  //       }}
  //     />
  //   </View>
  // );

  // const PostFooterIcon = ({theme}) => {
  //   return (
  //     <View style={{}}>
  //       <View style={[styles.iconContainer, { justifyContent: 'space-between',}]}>
  //         <View style={styles.iconContainer}>
  //           <TouchableOpacity>
  //             <Image
  //               style={styles.iconStyle}
  //               source={theme.theme === 'light' ? require("../assets/like.png"): require("../assets/likeWhite.png")} />
  //           </TouchableOpacity>
  //           <TouchableOpacity>
  //             <Image
  //               style={styles.iconStyle}
  //               source={theme.theme === 'light' ? require("../assets/comment.png"): require("../assets/commentWhite.png")} 
  //             />
  //           </TouchableOpacity>
  //           <TouchableOpacity>
  //             <Image
  //               style={styles.iconStyle}
  //               source={theme.theme === 'light' ? require("../assets/share.png"): require("../assets/shareWhite.png")} 
  //             />
  //           </TouchableOpacity>
  //         </View>

  //         <TouchableOpacity>
  //           <Image
  //             style={styles.iconStyle}
  //             source={theme.theme === 'light' ? require("../assets/save.png"): require("../assets/saveWhite.png")} 
  //           />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   )
  // }

  // const Likes = ({ likes, theme }) => (
  //   <View>
  //   {likes > 0 &&(
  //   <Text style={{ fontWeight: 'bold', marginLeft: 5 , color: theme.color}}>
  //     {likes === 1 ? likes + ' like': likes + ' likes' }
  //   </Text>)
  //   }  
  //   </View>
  // )

  // const Caption = ({ item, theme }) => (
  //   <View style={{ flexDirection: 'row' }}>
  //     <Text style={{color: theme.color}}>
  //       <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
  //       <Text>{' '}{item.caption}</Text>
  //     </Text>
  //   </View>
  // )

  // const CommentSection = ({ item, theme }) => (
  //   <View style={{ marginTop: 2, marginBottom: 20 ,}}>
  //     {!!item.comments.length && (
  //       <Text style={{ color: 'gray' }}>
  //         View{item.comments.length > 1 ? ' all' : ''} {item.comments.length}{' '}
  //         {item.comments.length > 1 ? 'comments' : 'comment'}
  //       </Text>
  //     )}
  //   </View>
  // )

  // const Comments = ({ item }) => {
  //   // console.log(item)
  //   return (
  //     <>
  //       {item.comments.map((comment, index) => (
  //         <View key={index}>
  //           <Text style={{ color: 'white', marginVertical: 2 }}>
  //             <Text style={{ fontWeight: 'bold' }}>{comment.user} </Text>
  //             {comment.comment}
  //           </Text>
  //         </View>
  //       ))}
  //     </>
  //   )
  // }

  // const NewsFeed = ({ navigation, route }) => {
  //   const [newData, setNewData] = useState(POSTS)
  //   const theme = useContext(themeContext)
    
  //   const userDetails = route.params
  //   // const userDetails = {
  //   //     "email": "admin@gmail.com",
  //   //     "fullname": "Admin",
  //   //     "password": "Pass1234@",
  //   //     "username": "admin",
  //   //     "avtar": 'https://randomuser.me/api/portraits/men/32.jpg',
  //   // }
  //   // console.log(userDetails)
  //   // console.log(route)
  //   // console.log("1")

  //   // console.log(route)
  //   // useEffect(()=>{
  //   //   setNewData(() => [userDetails, ...newData])
  //   // },[])

  //   const renderItem = ({ item }) => (
  //     <View style={{ borderColor: theme.background, }}>
  //       {/* <Text>{userDetails.username}</Text> */}
        
  //       <PostHeader username={item.username} avtar={item.avtar} theme={theme} />
  //       <PostImage imageUrl={item.imageUrl} />
  //       <View style={{marginHorizontal: 5, marginTop: 10}}>
  //         <PostFooterIcon theme={theme}/>
  //         <Likes likes={item.likes} theme={theme}/>
  //         <Caption item={item} theme={theme}/>
  //         <CommentSection item={item} theme={theme}/>
  //       </View>
  //       <Divider/>
  //     </View>
  //   );
  //   // console.log(navigation)
  //   // console.log(POSTS);
  //   return (

  //     <SafeAreaView style={[Styles.androidSafeArea, {backgroundColor: theme.background}]}>
  //       <View>
  //         <Header navigation={navigation} userDetails={userDetails} />
  //       </View>
  //       <Divider width={1} orientation='vertical' />
  //       {/* <Text>{userDetails.username}</Text> */}
  //       <Button
  //         title='Post'
  //         onPress={() => {
  //           console.log(userDetails.email)
  //           console.log(newData)
  //           setNewData(() => [ userDetails, ...newData ])
  //         }}
  //       />
  //       <FlatList
  //         data={newData}
  //         renderItem={renderItem}
  //         keyExtractor={item => item.id}
  //       />
  //     </SafeAreaView>
  //   )
  // }

  // const styles = StyleSheet.create({
  //   postHeader: {
  //     marginVertical: 8,
  //     marginHorizontal: 16,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //   },
  //   title: {
  //     fontSize: 16,
  //     marginTop: 8,
  //     marginLeft: 8,
  //   },
  //   tinyLogo: {
  //     width: 35,
  //     height: 35,
  //     borderRadius: 50,
  //   },
  //   viewDots: {
  //     borderRadius: 50,
  //     width: 4,
  //     height: 4,
  //     marginBottom: 3,
  //   },
  //   postImage: {
  //     width: '100%',
  //     height: 400,
  //   },
  //   footerIcon: {
  //     width: 33,
  //     height: 33,
  //   },
  //   iconContainer: {
  //     flexDirection: 'row',
  //   },
  //   newPost: {
  //     width: 28,
  //     height: 28,
  //     marginLeft: 10,
  //     resizeMode: 'contain',
  //   },
  //   iconStyle: {
  //     width: 30,
  //     height: 30,
  //     marginLeft: 10
  //   },
  // })

  // export default NewsFeed