import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React from "react";
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./scr/screens/LoginScreen";
import SignupScreen from "./scr/screens/SignupScreen";
import NewsFeed from "./scr/screens/NewsFeed";
import NewPostScreen from "./scr/screens/NewPostScreen";
import { loginCheck } from "./scr/config/loginCheck";

import { EventRegister } from "react-native-event-listeners";
import { useEffect, useState } from "react";
import themeContext from "./scr/config/themeContext";
import { UserContext } from "./scr/config/userContext";
import { NewAuthContext } from "./scr/config/context";
import theme from "./scr/config/theme";
// import AuthNavigation from './scr/navigation/AuthNavigation';

const Stack = createNativeStackNavigator();
const SignedInStack = createNativeStackNavigator();
const SignedOutStack = createNativeStackNavigator();

function SignedOutStackScreen() {
    return (
        <SignedOutStack.Navigator screenOptions={{ headerShown: false }}>
            <SignedOutStack.Screen name="Login" component={LoginScreen} />
            <SignedOutStack.Screen name="Signup" component={SignupScreen} />
        </SignedOutStack.Navigator>
    );
}

function SignedInStackScreen() {
    return (
        <SignedInStack.Navigator screenOptions={{ headerShown: false }}>
            <SignedInStack.Screen name="NewsFeed" component={NewsFeed} />
            <SignedInStack.Screen name="NewPost" component={NewPostScreen} />
        </SignedInStack.Navigator>
    );
}

export default function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const authContext = React.useMemo(() => ({
        signIn: () => {
            setUserToken("sgdu");
            setIsLoading(false);
        },
        signOut: () => {
            setUserToken(null);
            setIsLoading(false);
        },
        signUp: () => {
            setUserToken("sgdu");
            setIsLoading(false);
        },
    }));

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }
    return (
        <NavigationContainer>
            <SignedOutStackScreen />
            {/* <SignedInStackScreen /> */}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

// --------------------------------------------------------------------------------------------------------------
// import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
// import React from "react";
// import {
//     NavigationContainer,
//     DarkTheme,
//     DefaultTheme,
// } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "./scr/screens/LoginScreen";
// import SignupScreen from "./scr/screens/SignupScreen";
// import Test from "./scr/components/Test";
// import NewsFeed from "./scr/screens/NewsFeed";
// import NewPostScreen from "./scr/screens/NewPostScreen";
// import AddPostModal from "./scr/modal/AddPostModal";
// import Demo from "./scr/components/Demo";
// import AddNewPostScreen from "./scr/screens/AddNewPostScreen";
// import LoginForm from "./scr/components/LoginForm";
// import Chat from "./scr/screens/Chat";
// import { loginCheck } from "./scr/config/loginCheck";

// // Async Storage
// import LoginAsync from "./scr/asyncStorage/LoginAsync";
// import Screen1 from "./scr/asyncStorage/Screen1";
// import Screen2 from "./scr/asyncStorage/Screen2";

// // import DOB from './scr/'
// import { EventRegister } from "react-native-event-listeners";
// import { useEffect, useState } from "react";
// import themeContext from "./scr/config/themeContext";
// import { UserContext } from "./scr/config/userContext";
// import theme from "./scr/config/theme";
// // import AuthNavigation from './scr/navigation/AuthNavigation';

// const Stack = createNativeStackNavigator();
// const SignedInStack = createNativeStackNavigator();
// const SignedOutStack = createNativeStackNavigator();

// function SignedOutStackScreen() {
//     return (
//         <NavigationContainer>
//             <SignedOutStack.Navigator screenOptions={{ headerShown: false }}>
//                 <SignedOutStack.Screen name="Login" component={LoginScreen} />
//                 <SignedOutStack.Screen name="Signup" component={SignupScreen} />
//             </SignedOutStack.Navigator>
//         </NavigationContainer>
//     );
// }

// function SignedInStackScreen() {
//     return (
//         <NavigationContainer>
//             <SignedInStack.Navigator screenOptions={{ headerShown: false }}>
//                 <SignedInStack.Screen name="NewsFeed" component={NewsFeed} />
//                 <SignedInStack.Screen
//                     name="NewPost"
//                     component={NewPostScreen}
//                 />
//             </SignedInStack.Navigator>
//         </NavigationContainer>
//     );
// }

// export default function App() {
//     const [mode, setMode] = useState(false);
//     const [userValue, setUservalue] = useState(loginCheck);
//     const [showLoader, setShowLoader] = useState(true);

//     console.log(userValue.isLogged);
//     setTimeout(() => {
//         setShowLoader(false);
//     }, 2000);

//     useEffect(() => {
//         userValue;
//         let eventListener = EventRegister.addEventListener(
//             "changeTheme",
//             (data) => {
//                 setMode(data); //data is state of swtich that we get from header
//                 console.log("App.js", data);
//             }
//         );
//         return () => {
//             EventRegister.removeEventListener(eventListener);
//         };
//     }, [userValue]);

//     if (showLoader) {
//         return (
//             <View
//                 style={{
//                     flex: 1,
//                     justifyContent: "center",
//                     alignItems: "center",
//                 }}
//             >
//                 {/* <Image source={require('./scr/assets/instagramLogo.png')} /> */}
//                 <ActivityIndicator />
//             </View>
//         );
//     }
//     return (
//         <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
//             <UserContext.Provider value={{ userValue, setUservalue }}>
//                 <>
//                     {!userValue.isLogged ? (
//                         <SignedOutStackScreen />
//                     ) : (
//                         <SignedInStackScreen />
//                     )}
//                 </>
//             </UserContext.Provider>
//         </themeContext.Provider>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });

// -------------------------------------------------------------------------------------------------------------------------

// export default function App() {
//   const [mode, setMode] = useState(false)
//   const [userValue, setUservalue] = useState('hello from UserContext')
//   useEffect(() => {
//     let eventListener = EventRegister.addEventListener('changeTheme', (data) => {
//       setMode(data) //data is state of swtich that we get from header
//       console.log('App.js', data)
//     })
//     return () => {
//       EventRegister.removeEventListener(eventListener)
//     }

//   })

//   return (
//     <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
//       <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
//         <UserContext.Provider value={{userValue, setUservalue}}>
//           <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>

//             <Stack.Screen name="LoginAsync" component={LoginAsync} />
//             <Stack.Screen  name="Screen1" component={Screen1} />
//             <Stack.Screen  name="Screen2" component={Screen2} />

//             <Stack.Screen name="Home" component={Test} />

//             <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Welcome to Instagram' }} />
//             <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign In' }} />

//             <Stack.Screen name="NewsFeed" component={NewsFeed} />
//             <Stack.Screen name="NewPost" component={NewPostScreen} />
//             <Stack.Screen name="AddNewPostScreen" component={AddNewPostScreen} />
//             <Stack.Screen name="AddPostModal" component={AddPostModal} />
//             <Stack.Screen name="Demo" component={Demo} />
//             <Stack.Screen name="LoginForm" component={LoginForm} />
//             <Stack.Screen name="Chat" component={Chat} />

//           </Stack.Navigator>
//         </UserContext.Provider>
//       </NavigationContainer>
//       {/* <AuthNavigation/> */}
//     </themeContext.Provider>
//   );
// }
