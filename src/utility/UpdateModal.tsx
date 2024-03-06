import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const { height } = Dimensions.get("window");

type UpdateModal_Props = {
    visible: boolean;
    onPress: Function;
    onClose: Function;
}

const UpdateModal = ({ visible, onPress, onClose }: UpdateModal_Props): JSX.Element => {
    const [atData, setAtData] = useState<string>("present");

    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.body}>
                <TouchableOpacity
                    style={{ alignSelf: "flex-end", borderWidth: 1, padding: 4, borderRadius: 4 }}
                    onPress={() => onClose()}
                >
                    <Text style={{ fontSize: 15, fontWeight: "500", color: "#000" }}>
                        Close
                    </Text>
                </TouchableOpacity>

                <View style={styles.midWrap}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <TouchableOpacity
                            style={atData == "present" ? styles.btnActive : styles.btn}
                            onPress={() => setAtData("present")}
                        >
                            <Text style={atData == "present" ? styles.btnTxtActive : styles.btnTxt}>
                                Present
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={atData == "absent" ? styles.btnActive : styles.btn}
                            onPress={() => setAtData("absent")}
                        >
                            <Text style={atData == "absent" ? styles.btnTxtActive : styles.btnTxt}>
                                Absent
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* <View>
                        <TouchableOpacity
                            style={[styles.save, { marginHorizontal: 0, paddingVertical: 10, elevation: 3 }]}
                            onPress={() => getCurrentTime()}
                        >
                            <Text style={styles.btnTxt}>
                                Entry Time
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                </View>

                <View style={{}}>
                    <TouchableOpacity
                        style={styles.save}
                        onPress={() => onPress(atData)}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "500", color: "#3CCBA1" }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

export default UpdateModal;

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#fff",
        marginHorizontal: 40,
        marginVertical: height / 3,
        elevation: 3,
        flex: 1,
        padding: 20,
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
        elevation: 2
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
        color: "#2EBB92"
    },
    btnTxtActive: {
        fontSize: 16,
        fontWeight: "500",
        color: "#ffffff"
    },
});