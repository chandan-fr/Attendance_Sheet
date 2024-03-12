import { Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'

type SetTimeModal = {
  visible: boolean;
  onPress: Function;
  onClose: any;
};

const SetTimeModal = ({ visible, onPress, onClose }: SetTimeModal): JSX.Element => {
  const [time, setTime] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleTime = () => {
    const regEx = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (time && regEx.test(time)) {
      onPress(time + ":59");
      setTime("");
    } else if (!regEx.test(time)) {
      setError("Invalid Time Format");
    } else {
      setError("Please Enter Time");
    }
  };

  const close = () => {
    onClose(false);
    setError("");
    setTime("");
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <View style={styles.body}>
          <TouchableOpacity
            style={{ alignSelf: "flex-end", borderWidth: 1, padding: 4, borderRadius: 4 }}
            onPress={() => close()}
          >
            <Text style={{ fontSize: 15, fontWeight: "500", color: "#000" }}>
              Close
            </Text>
          </TouchableOpacity>

          <View style={styles.midWrap}>
            <View style={{ rowGap: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "500", color: "#3d4342" }}>
                Enter Idle Time Thresold (24-hour)
              </Text>
              <TextInput
                placeholder='HH:MM'
                autoFocus={true}
                style={styles.input}
                placeholderTextColor={"#2EBB92"}
                value={time}
                onChangeText={value => {
                  // setTime(value);
                  // if (value.length == 2 && !value.includes(":")) setTime(value + ":");
                  const cleanedValue = value.replace(/\D/g, '').substring(0, 4);
                  let formattedTime = cleanedValue;
                  if (cleanedValue.length > 2) {
                    formattedTime = cleanedValue.substring(0, 2) + ':' + cleanedValue.substring(2);
                  }
                  setTime(formattedTime);
                }}
                onFocus={() => setError("")}
                maxLength={5}
              />
              <Text style={{ color: "#e3242b", marginLeft: 5, marginTop: -5 }}>{error && error}</Text>
            </View>
          </View>

          <View style={{}}>
            <TouchableOpacity
              style={styles.save}
              onPress={() => handleTime()}
            >
              <Text style={{ fontSize: 18, fontWeight: "500", color: "#3CCBA1" }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
};

export default SetTimeModal;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    marginHorizontal: 25,
    marginVertical: 110,
    maxHeight: 250,
    minHeight: 250,
    elevation: 3,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  midWrap: {
    flex: 1,
    marginTop: 20,
    rowGap: 20,
  },
  save: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderColor: "#3CCBA1",
    backgroundColor: "#ffffff",
  },
  btnActive: {
    backgroundColor: "#2EBB92",
    paddingHorizontal: 40,
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  btn: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 40,
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2EBB92",
  },
  btnTxtActive: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#2EBB92",
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#D1E7E1",
    color: "#2EBB92",
    fontSize: 16,
    fontWeight: "500",
    height: 40,
  },
});