import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import DateBox from '../../utility/DateBox'
import WeekView from '../../utility/WeekView';
import UpdateModal from '../../utility/UpdateModal';
import { useDispatch, useSelector } from 'react-redux';
import { countLateAndAbsent, updateMonthArray } from '../../services/slices/AttendanceSlice';
import { compareTimeWithCurrent } from '../../config/CompareTime';

type Splash_Props = {
  navigation: any
};

var curIndex: number;

const MonthView = ({ navigation }: Splash_Props): JSX.Element => {
  const { month_array, late, absent } = useSelector((state: any) => state.attendanceSlice);
  const currentDay: number = new Date().getDate();
  const currentYear: number = new Date().getFullYear();
  const currentMonth: string = new Date().toLocaleString('en-US', { month: 'long' });
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();

  const openModal = (index: number) => {
    curIndex = index;
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const manageDate = (params: string, time: string) => {
    const entryTime = new Date().toTimeString().split(" ")[0];
    const finalEntryTime = time ? time : entryTime
    const res = compareTimeWithCurrent(finalEntryTime);
    dispatch(updateMonthArray({index: curIndex, isAbsent: params, time: finalEntryTime, status: res }));
    closeModal();
    dispatch(countLateAndAbsent());
  };

  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={styles.heading}>
            Entry Time & Attendance Sheet
          </Text>
        </View>

        <View style={styles.calendarWrap}>
          <Text style={styles.sub_heading}>
            {`${currentMonth}, ${currentYear}`}
          </Text>

          <View style={styles.calendar}>
            <FlatList
              data={month_array}
              numColumns={7}
              style={{ flex: 1 }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              ListHeaderComponent={<WeekView />}
              renderItem={({ item, index }) => (
                <DateBox item={item} index={index} currentDay={currentDay} onPress={openModal} />
              )}
            />
          </View>

          <View style={styles.total}>
            <Text style={styles.totalTxt}>Total Late: {late}</Text>
            <Text style={styles.totalTxt}>Total Absent: {absent}</Text>
          </View>
        </View>
      </View>
      <UpdateModal visible={show} onClose={closeModal} onPress={manageDate} />
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
    rowGap: 30,
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
    padding: 18,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  totalTxt: {
    fontSize: 20,
    color: "#808886",
  },
});