import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DayDate } from '../config/MonthToDateArray';


type DateBox_Props = {
    currentDay: number;
    item: DayDate;
    onPress: Function;
    index: number;
};

const width = 50;
const height = 90;

const DateBox = ({ item, index, currentDay, onPress }: DateBox_Props): JSX.Element => {

    return (
        <TouchableOpacity
            style={item.date == currentDay ? styles.boxActive : styles.box}
            disabled={item.isDisabled || item.empty ? true : false}
            onPress={() => onPress(index)}
        >
            <Text
                style={[{ fontSize: 17, fontWeight: "600" },
                item.date == currentDay ? { color: "#fff" } : { color: "#3d4342" }
                ]}
            >
                {item.date}
            </Text>

            {!item.empty ?
                <View style={{ rowGap: 4, width: "100%", alignItems: 'flex-start', justifyContent: "center" }}>
                    <Text style={[styles.time, { color: item.date == currentDay ? "#fff" : "#808886" }]}>
                        {item.time}
                    </Text>

                    {item.isAbsent == "absent" ?
                        <Text style={[styles.atndnc, { backgroundColor: "#f00" }]}>
                            A
                        </Text>
                        :
                        item.isAbsent == "present" ?
                            <Text style={[styles.atndnc, { backgroundColor: "#ff0" }]}>
                                P
                            </Text>
                            :
                            null
                    }


                    {item.status == "true" ?
                        <View style={[styles.status, { backgroundColor: "#00f" }]} />
                        :
                        item.status == "false" ?
                            <View style={[styles.status, { backgroundColor: "#f00" }]} />
                            :
                            null
                    }
                </View>
                :
                null
            }
        </TouchableOpacity>
    )
};

export default DateBox;

const styles = StyleSheet.create({
    box: {
        width: width,
        height: height,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#fff",
        marginHorizontal: 3,
        marginVertical: 3,
        alignItems: "center",
        padding: 3,
        rowGap: 4,
    },
    boxActive: {
        width: width,
        height: height,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#2EBB92",
        marginHorizontal: 3,
        marginVertical: 3,
        alignItems: "center",
        padding: 3,
        rowGap: 4,
    },
    status: {
        width: "90%",
        backgroundColor: "#00f",
        height: 8,
        borderRadius: 3
    },
    time: {
        fontSize: 11,
        fontWeight: "400",
    },
    atndnc: {
        borderRadius: 50,
        width: 20,
        height: 20,
        color: "#000",
        textAlign: "center",
        fontSize: 14,
        fontWeight: "400",
    },
});