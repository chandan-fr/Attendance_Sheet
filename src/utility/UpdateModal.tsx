import { Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'

type UpdateModal_Props = {
    visible: boolean;
    onPress: Function;
    onClose: Function;
};

const UpdateModal = ({ visible, onPress, onClose }: UpdateModal_Props): JSX.Element => {
    const [atData, setAtData] = useState<string>("present");
    const [leaveHoliday, setLeaveHoliday] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleTime = () => {
        const regEx = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
        if (time && regEx.test(time)) {
            onPress(atData, time, leaveHoliday);
            setTime("");
        } else if (!time) {
            onPress(atData, time, leaveHoliday);
            setTime("");
        } else if (!regEx.test(time)) {
            setError("Invalid Time Format");
            
        }
    };

    const close = () => {
        onClose();
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
                onPressOut={Keyboard.dismiss}
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
                        {/* Present & Absent */}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <TouchableOpacity
                                style={atData == "present" ? styles.btnActive : styles.btn}
                                onPress={() => { setAtData("present"); setLeaveHoliday("") }}
                            >
                                <Text style={atData == "present" ? styles.btnTxtActive : styles.btnTxt}>
                                    Present
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={atData == "absent" ? styles.btnActive : styles.btn}
                                onPress={() => { setAtData("absent"); setLeaveHoliday("") }}
                            >
                                <Text style={atData == "absent" ? styles.btnTxtActive : styles.btnTxt}>
                                    Absent
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Holiday & Leave */}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <TouchableOpacity
                                style={leaveHoliday == "holiday" ? styles.btnActive : styles.btn}
                                onPress={() => { setLeaveHoliday("holiday"); setAtData("") }}
                            >
                                <Text style={leaveHoliday == "holiday" ? styles.btnTxtActive : styles.btnTxt}>
                                    Holiday
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={leaveHoliday == "leave" ? styles.btnActive : styles.btn}
                                onPress={() => { setLeaveHoliday("leave"); setAtData("") }}
                            >
                                <Text style={leaveHoliday == "leave" ? styles.btnTxtActive : styles.btnTxt}>
                                    Leave
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ rowGap: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "500", color: "#3d4342" }}>
                                Enter Time Manually (24-hour) ?
                            </Text>
                            <TextInput
                                placeholder='HH:MM:SS'
                                style={styles.input}
                                placeholderTextColor={"#2EBB92"}
                                value={time}
                                onFocus={() => setError("")}
                                onChangeText={value => setTime(value)}
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

export default UpdateModal;

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#fff",
        marginHorizontal: 25,
        marginVertical: 110,
        maxHeight: 350,
        minHeight: 350,
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