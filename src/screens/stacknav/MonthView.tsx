import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateBox from '../../utility/DateBox'
import WeekView from '../../utility/WeekView';
import UpdateModal from '../../utility/UpdateModal';
import { useDispatch, useSelector } from 'react-redux';
import { countEvents, setTimeThresold, updateMonthArray } from '../../services/slices/AttendanceSlice';
import { compareTimeWithCurrent } from '../../config/CompareTime';
import SetTimeModal from '../../utility/SetTimeModal';

type Splash_Props = {
  navigation: any
};

var curIndex: number;

const MonthView = ({ navigation }: Splash_Props): JSX.Element => {
  const { month_array, late, absent, leaves, work_days, idle_time } = useSelector((state: any) => state.attendanceSlice);
  const currentDay: number = new Date().getDate();
  const currentYear: number = new Date().getFullYear();
  const currentMonth: string = new Date().toLocaleString('en-US', { month: 'long' });
  const [show, setShow] = useState<boolean>(false);
  const [timeModal, setTimeModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const openModal = (index: number) => {
    curIndex = index;
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const manageDate = (params: string, time: string, leaveHoliday: string) => {
    const entryTime: string = new Date().toTimeString().split(" ")[0];
    const finalEntryTime: string = time ? time : entryTime;
    const holiday: boolean = leaveHoliday == "holiday" ? true : false;
    const leave: boolean = leaveHoliday == "leave" ? true : false;
    const res = compareTimeWithCurrent(finalEntryTime, idle_time);
    dispatch(updateMonthArray({ index: curIndex, isAbsent: params, time: finalEntryTime, status: res, holiday: holiday, leave: leave }));
    closeModal();
    dispatch(countEvents());
  };

  const setIdleTime = (time: string) => {
    dispatch(setTimeThresold(time))
    setTimeModal(false);
  };

  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={styles.heading}>
            Entry Time & Attendance Sheet
          </Text>

          <View style={{ alignSelf: "flex-end", marginTop: 10, flexDirection: "row", columnGap: 20, alignItems: "center" }}>
            <Text style={{fontSize: 13, fontWeight: "600", color: "#3d4342"}}>Idle Time : {idle_time}</Text>
            <TouchableOpacity
              style={{ borderWidth: 1, borderRadius: 5, paddingVertical: 2, paddingHorizontal: 5, borderColor: "#3d4342" }}
              onPress={() => setTimeModal(true)}
            >
              <Text style={{ color: "#3d4342", fontSize: 14 }}>Set Idle Time</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.calendarWrap}>
            <Text style={styles.sub_heading}>
              {`${currentMonth}, ${currentYear}`}
            </Text>

            <View style={styles.calendar}>
              <FlatList
                data={month_array}
                numColumns={7}
                showsVerticalScrollIndicator={false}
                style={{ paddingTop: 3, paddingBottom: 4 }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                ListHeaderComponent={<WeekView />}
                renderItem={({ item, index }) => (
                  <DateBox item={item} index={index} currentDay={currentDay} onPress={openModal} />
                )}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", paddingHorizontal: 8 }}>
              <View style={styles.total}>
                <Text style={styles.totalTxt}>Total Late: {late}</Text>
                <Text style={styles.totalTxt}>Total Absent: {absent}</Text>
              </View>

              <View style={styles.total}>
                <Text style={styles.totalTxt}>Total Leave: {leaves}</Text>
                <Text style={styles.totalTxt}>Total Working Day: {work_days}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <UpdateModal visible={show} onClose={closeModal} onPress={manageDate} />
      <SetTimeModal visible={timeModal} onPress={setIdleTime} onClose={setTimeModal} />
    </SafeAreaView>
  )
};

export default MonthView;

const styles = StyleSheet.create({
  parent: {
    flex: 1
  },
  body: {
    flex: 1,
    rowGap: 10,
    marginTop: 10,
  },
  top: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: "#3d4342",
    fontWeight: "700",
  },
  sub_heading: {
    fontSize: 16,
    color: "#3CCBA1",
    fontWeight: "600",
  },
  calendarWrap: {
    rowGap: 10,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#EDE6DF",
    borderRadius: 6,
    paddingTop: 10,
    flex: 1,

  },
  calendar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  total: {
    paddingVertical: 18,
    marginBottom: 10,
  },
  totalTxt: {
    fontSize: 18,
    color: "#808886",
  },
});