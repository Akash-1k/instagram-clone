import { View, Platform, Text, StyleSheet, Pressable, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import Styles from '../styles/Styles'
import CalendarPicker from 'react-native-calendar-picker';

const Test = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const minDate = new Date(1950, 1, 1);
  const maxDate = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';

  return (
    <View style={[Styles.androidSafeArea, styles.container]}>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Date of birth is required");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { marginHorizontal: Platform.OS === "web" ? '33%' : 0, }]}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>  X  </Text>
            </Pressable>
            <View>
              <CalendarPicker
                minDate={minDate}
                maxDate={maxDate}
                startFromMonday={true}
                width={390}
                horizontal={true}
                scrollable
                headingLevel={200}
                showDayStragglers
                // todayBackgroundColor='#fff'
                // todayTextStyle={{color: '#000'}}
                // scaleFactor={500}
                // dayShape='circle'
                // previousTitleStyle={{fontSize: 15}}
                // nextTitleStyle={{fontSize: 15}}
                // previousTitle='ABC'
                // todayBackgroundColor="#555"

                selectedDayColor="#222"
                selectedDayTextColor="#FFFFFF"
                onDateChange={currentDate => {
                  // console.log(currentDate)
                  setSelectedStartDate(currentDate)
                  // setModalVisible(!modalVisible)
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* <Text style={styles.dateText}>Birthday: {startDate}</Text> */}


      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  )
}

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
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
    elevation: 2
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
});