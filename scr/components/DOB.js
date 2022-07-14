import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button,  Alert, Modal, Pressable, } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default function DOB() {
  const [modalVisible, setModalVisible] = useState(true);
  const minDate = new Date(1950, 1, 1); // Today
  const maxDate = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <View>
              <CalendarPicker 
                minDate={minDate}
                maxDate={maxDate}
                startFromMonday={true}
                width={380}
                // horizontal={true}
                scrollable
                // enableSwipe
                // showDayStragglers
                // previousTitleStyle={{fontSize: 15}}
                // nextTitleStyle={{fontSize: 15}}
                // previousTitle='ABC'
                // todayBackgroundColor="#555"
                
                selectedDayColor="#222"
                selectedDayTextColor="#FFFFFF"
                onDateChange={(d)=>{setSelectedStartDate(d)
                   setModalVisible(false)
                }} 
              />
              <Text style={styles.dateText}>Birthday: {startDate}</Text>
            </View>
          </View>
        </View>
      </Modal>
      
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal {startDate}</Text>
      </Pressable>
      
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   modalView: {
    margin: 20,
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
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
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