import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { cellWidth, weeks } from "../config/StaticVariables";

const WeekView = ():JSX.Element => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
            <FlatList
                data={weeks}
                numColumns={7}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <View style={styles.box}>
                        <Text style={styles.day}>
                            {item.toUpperCase()}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
};

export default WeekView;

const styles = StyleSheet.create({
    box: {
        width: cellWidth,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F19733",
        marginHorizontal: 3,
        borderRadius: 3
    },
    day: {
        fontSize: 15,
        fontWeight: "600",
        color: "#EDE6DF",
    },
});