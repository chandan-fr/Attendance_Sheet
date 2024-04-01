import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { DayDate } from '../../config/MonthToDateArray';

type ModifyDate_Prorps = {
  navigation: any;
  route: any;
};

const ModifyDate = ({ navigation, route }: ModifyDate_Prorps): JSX.Element => {
  const { month_array } = useSelector((state: any) => state.attendanceSlice);
  const { date, i } = route?.params;
  const currentYear: number = new Date().getFullYear();
  const currentMonth: string = new Date().toLocaleString('en-US', { month: 'long' });
  const dateDetails: DayDate = month_array.filter((_: DayDate, idx: number) => idx === i)[0];

  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.body}>
        {/* head top */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ borderWidth: 1, alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 3, borderRadius: 4 }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ color: "#333333", fontSize: 16, fontWeight: "500" }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 2 }}>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "600", color: "#232020" }}>
              Modify Date
            </Text>
          </View>

          <View style={{ flex: 1 }} />
        </View>

        {/* main */}
        <View style={{ marginTop: 10, flex: 1 }}>
          {/* date */}
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 50, fontWeight: "700", color: "#232020", borderWidth: 1, borderRadius: 4, width: 90, textAlign: "center", borderColor: "#707070", marginBottom: 5, elevation: 2, backgroundColor: "#E6E6E6" }}>
              {date}
            </Text>

            <Text style={{ fontSize: 16, fontWeight: "500", color: "#333333" }}>
              {`${currentMonth}, ${currentYear}`}
            </Text>
          </View>

          <View style={{ marginTop: 20, flex: 1, rowGap: 10 }}>
            {/* leave */}
            <View style={styles.itemWrap}>
              <Text style={{ fontSize: 18, fontWeight: "500", color: "#E6E6E6" }}>
                Leave
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}>
                <TouchableOpacity style={dateDetails.isLeave === true ? styles.checkWrapActive : styles.checkWrap}>
                  <View style={dateDetails.isLeave === true ? styles.checkActive : styles.check} />
                </TouchableOpacity>

                <TouchableOpacity style={dateDetails.isLeave === false ? styles.crossWrapActive : styles.crossWrap}>
                  <View style={dateDetails.isLeave === false ? styles.crossActive : styles.cross} />
                </TouchableOpacity>
              </View>
            </View>

            {/* holiday */}
            <View style={styles.itemWrap}>
              <Text style={{ fontSize: 18, fontWeight: "500", color: "#E6E6E6" }}>
                Holiday
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}>
                <TouchableOpacity style={dateDetails?.isHoliday === true ? styles.checkWrapActive : styles.checkWrap}>
                  <View style={dateDetails?.isHoliday === true ? styles.checkActive : styles.check} />
                </TouchableOpacity>

                <TouchableOpacity style={dateDetails?.isHoliday === false ? styles.crossWrapActive : styles.crossWrap}>
                  <View style={dateDetails?.isHoliday === false ? styles.crossActive : styles.cross} />
                </TouchableOpacity>
              </View>
            </View>

            {/* P/A */}
            <View style={styles.itemWrap}>
              <Text style={{ fontSize: 18, fontWeight: "500", color: "#E6E6E6" }}>
                Present/Absent
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}>
                <TouchableOpacity style={dateDetails.isAbsent === "present" ? styles.checkWrapActive : styles.checkWrap}>
                  <View style={dateDetails.isAbsent === "present" ? styles.checkActive : styles.check} />
                </TouchableOpacity>

                <TouchableOpacity style={dateDetails.isAbsent === "absent" ? styles.crossWrapActive : styles.crossWrap}>
                  <View style={dateDetails.isAbsent === "absent" ? styles.crossActive : styles.cross} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
};

export default ModifyDate;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  body: {
    flex: 1,
    margin: 10,
  },
  checkWrap: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: 'center',
    borderColor: "#435970",
  },
  check: {
    width: 25,
    height: 25,
    backgroundColor: "#435970",
    borderRadius: 25,
  },
  checkWrapActive: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: 'center',
    borderColor: "#008A04",
  },
  checkActive: {
    width: 25,
    height: 25,
    backgroundColor: "#008A04",
    borderRadius: 25,
  },
  crossWrap: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: 'center',
    borderColor: "#435970",
  },
  cross: {
    width: 25,
    height: 25,
    backgroundColor: "#435970",
    borderRadius: 25,
  },
  crossWrapActive: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: 'center',
    borderColor: "#DE5151",
  },
  crossActive: {
    width: 25,
    height: 25,
    backgroundColor: "#DE5151",
    borderRadius: 25,
  },
  itemWrap: {
    flexDirection: "row",
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#21B4E2",
    paddingVertical: 5,
    borderRadius: 5,
  },
});