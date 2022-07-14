import React from 'react';
import {
    View, StyleSheet, Text, TouchableOpacity, Image,
    TextInput, FlatList, ScrollView, Dimensions
} from 'react-native';
import Story from './Story';

const images = [
    {
        id: 1,
        src: require("./assets/k1.png"),
    },
    {
        id: 2,
        src: require("./assets/k2.png"),
    },
    {
        id: 3,
        src: require("./assets/k3.png"),
    },
    {
        id: 4,
        src: require("./assets/k4.png"),
    },
    {
        id: 5,
        src: require("./assets/k5.png"),
    },
    {
        id: 6,
        src: require("./assets/k6.png"),
    },
    {
        id: 7,
        src: require("./assets/k7.png"),
    },
    {
        id: 8,
        src: require("./assets/k8.png"),
    },
    {
        id: 9,
        src: require("./assets/k9.png"),
    },
    {
        id: 10,
        src: require("./assets/k10.png"),
    },
    {
        id: 11,
        src: require("./assets/k11.png"),
    },
    {
        id: 12,
        src: require("./assets/k12.png"),
    },
];

const PhotoData = [
    {
        id: 1,
        src: require("./assets/k1.png"),
    },
    {
        id: 2,
        src: require("./assets/k2.png"),
    },
    {
        id: 3,
        src: require("./assets/k3.png"),
    },
    {
        id: 4,
        src: require("./assets/k4.png"),
    },
    {
        id: 5,
        src: require("./assets/k5.png"),
    },
    {
        id: 6,
        src: require("./assets/k6.png"),
    },
    {
        id: 7,
        src: require("./assets/k7.png"),
    },
    {
        id: 8,
        src: require("./assets/k8.png"),
    },
    {
        id: 9,
        src: require("./assets/k9.png"),
    },
    {
        id: 10,
        src: require("./assets/k10.png"),
    },
    {
        id: 11,
        src: require("./assets/k11.png"),
    },
    {
        id: 12,
        src: require("./assets/k12.png"),
    },
];





const Flatlist = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <Image style={{ width: 133, height: 100 }} source={item.src} />

    );


    const Photo = ({ icons }) => {
        const [modalVisible, setModalVisible] = useState(false)
        const [selectedId, setSelectedId] = useState(null)
        const [imageUri, setImageUri] = useState(null)
        const [likeIcon, setLikeIcon] = useState(false)

        const Icon = ({ item, onLongPress }) => {
            return (
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity
                        onLongPress={onLongPress}
                        style={styles.item}
                    >
                        <Image source={{ uri: item.imageurl }} style={{ width: 135, height: 135 }} />
                    </TouchableOpacity>
                </View>
            )
        }

        const renderItem = ({ item }) => {

            if (item.id === selectedId) {
                setImageUri(item.imageurl)
            }

            return (
                <Icon
                    item={item}
                    onLongPress={() => {
                        setSelectedId(item.id)
                        setModalVisible(true)
                    }}
                />
            )
        }

        return (


            <SafeAreaView>
                <View style={styles.centeredView}>
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed");
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={[styles.centeredView, { backgroundColor: 'rgba(0, 0, 0, .5)' }]}>
                            <View>
                                <View style={styles.modalHeader}>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Image
                                            source={require("./assets/k3.png")}
                                            style={{ height: 25, width: 25 }} />
                                    </TouchableOpacity>
                                    <Image
                                        source={require("./assets/k3.png")}
                                        style={{
                                            height: 40,
                                            width: 40,
                                            borderRadius: 60
                                        }}
                                    />
                                    <Text>Kanikasehgal723</Text>
                                </View>

                                <Image source={{ uri: imageUri }} style={{ width: 400, height: 400 }} />
                            </View>
                            <View style={styles.modalFooter}>
                                <TouchableOpacity
                                    onPress={() => setLikeIcon(!likeIcon)}>
                                    <Image
                                        source={likeIcon === false ? require("./assets/heart.png") : require("./assets/heart.png")}
                                        style={{ height: 35, width: 35 }} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image
                                        source={require("./assets/comment.png")}
                                        style={{ height: 35, width: 35 }} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image
                                        source={require("./assets/send.png")}
                                        style={{ height: 35, width: 35 }} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image
                                        source={require("./assets/vertical dot.png")}
                                        style={{ height: 25, width: 25 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </View>
                <FlatList
                    data={icons}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedId}
                    numColumns={3}
                />

            </SafeAreaView>
        );

    }

    return
        <View style={styles.container}>

            <View style={styles.Header}>
                <View>
                    <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 28, fontWeight: 'bold', }}>Aarav Thakur_</Text>

                </View>


                <View>
                    <TouchableOpacity>
                        <Image
                            style={{ height: 25, width: 45, marginTop: 20, marginLeft: 85, resizeMode: 'contain', }}
                            source={require("./assets/uuu.png")}
                        />
                    </TouchableOpacity>
                </View>

                <View>

                    <TouchableOpacity>
                        <Image
                            style={{ height: 25, width: 45, marginTop: 20, marginLeft: 12, resizeMode: 'contain' }}
                            source={require("./assets/addf.png")}
                        />
                    </TouchableOpacity >

                </View>



                <View>
                    <TouchableOpacity>
                        <Image
                            style={{ height: 25, width: 45, marginTop: 20, resizeMode: 'contain', }}
                            source={require("./assets/v1.png")}
                        />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.Header1}>
                <TouchableOpacity>
                    <Image
                        style={{ height: 50, width: 50, marginTop: 10, marginLeft: 30, resizeMode: 'cover', borderRadius: 50 }}
                        source={require("./assets/rrr.jpg")}
                    />
                </TouchableOpacity>

                <Text style={{ fontSize: 10, fontWeight: 'bold', marginLeft: 28, marginTop: 4, }}>sumit_thakur</Text>

                <View style={{ marginTop: -60, marginLeft: 150, }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>39</Text>
                    <Text style={{ fontSize: 15, marginLeft: -10, }}>Posts</Text>
                </View>

                <View style={{ marginTop: -48, marginLeft: 220, }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>246</Text>
                    <Text style={{ fontSize: 15, marginLeft: -10, }}>Followers</Text>
                </View>

                <View style={{ marginTop: -48, marginLeft: 310, }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>320</Text>
                    <Text style={{ fontSize: 15, marginLeft: -8, }}>Following</Text>
                </View>
            </View>

            <View style={styles.Header2}>

                <TouchableOpacity style={styles.Profile}>

                    <Text style={{ justifyContent: "center", alignSelf: 'center', marginTop: 4, }}> Edit Profile </Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.Profile1}>

                    <Image
                        style={{ height: 18, width: 35, resizeMode: 'contain', marginTop: 4, }}
                        source={require("./assets/NNN.png")}
                    />

                </TouchableOpacity>

            </View>


            <View style={{ height: 110, width: 360, backgroundColor: '#e8e8e8', }}>
                <Story navigation={navigation} />
            </View>

            <View style={styles.Icon}>

                <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: 8 }}>

                    <TouchableOpacity>
                        <Image
                            style={{ height: 25, width: 25, resizeMode: 'contain' }}
                            source={require("./assets/KKK.png")}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image
                            style={{ height: 25, width: 25, resizeMode: 'contain' }}
                            source={require("./assets/JJJ.png")}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image
                            style={{ height: 25, width: 25, resizeMode: 'contain' }}
                            source={require("./assets/VVV.png")}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image
                            style={{ height: 25, width: 25, resizeMode: 'contain' }}
                            source={require("./assets/YYY.png")}
                        />
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.Mainbar}>

                <FlatList

                    data={images}
                    KeyExtractor={item => item.id}
                    renderItem={renderItem}
                    numColumns={3}
                />


            </View>

            <View style={styles.Footer}>

                <View style={{ justifyContent: "space-between", marginTop: 10 }}>
                    <TouchableOpacity >
                        <Image
                            style={{ height: 30, width: 30, marginLeft: 40 }}
                            source={require("./assets/home.png")}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: -30, marginLeft: 130, }}>
                    <TouchableOpacity>
                        <Image
                            style={{ height: 30, width: 30, }}
                            source={require("./assets/search.png")}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: -30, marginLeft: 220, }}>
                    <TouchableOpacity>
                        <Image
                            style={{ height: 30, width: 30, }}
                            source={require("./assets/user.png")}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: -30, marginLeft: 295, }}>
                    <TouchableOpacity>
                        <Image
                            style={{ height: 30, width: 30, marginLeft: 30, }}
                            source={require("./assets/ccc.png")}
                        />
                    </TouchableOpacity>
                </View>

            </View>
            
        </View>


};

            const styles = StyleSheet.create({

                container: {
                justifyContent: "center",
            alignItems: "center",
            backgroundColor:"#BD8E21",
},
            Header: {
                height:70,
            width:400,
            backgroundColor:"#e8e8e8",
            flexDirection:"row",
},

            Header1:
            {
                height:80,
            width:400,
            backgroundColor:"#e8e8e8",
},

            Header2:
            {
                height:50,
            width:400,
            backgroundColor:"#e8e8e8",
            flexDirection:'row',
},

            Profile:
            {

                borderWidth:2,
            width:'70%',
            height:30,
            borderRadius: 5,

            marginTop:10,
            marginLeft:30,
            borderColor:"gray",

},


            Profile1:
            {

                borderWidth:2,
            width:'10%',
            height:30,
            marginTop:10,
            marginLeft:5,
            borderRadius:5,
            borderColor:"gray",

},

            Icon:
            {

                height:40,
            width:400,
            backgroundColor:'#e8e8e8',


},

            Mainbar:
            {

                height:300,
            width:400,
            backgroundColor:'yellow',
            flexDirection:'row',

},

            Footer:

            {
                height:60,
            width:400,
            backgroundColor:"#e8e8e8",

},

            icon: {
                width: 132,
            height: 132
},
            centeredView: {
                flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
            backgroundColor:'black',
},
            modalView: {
                margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 2,},
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
},
            item: {

                margin: 1,
},

            modalHeader:{
                flexDirection:'row',
            backgroundColor:'#222',
            alignItems:'center',

},
            modalFooter:
            {
                flexDirection:'row',
            width: '100%',
            justifyContent: 'space-between',
            backgroundColor:'#222',
},


});
            export default Flatlist;