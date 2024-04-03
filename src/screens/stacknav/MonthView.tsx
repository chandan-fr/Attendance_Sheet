import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import DateBox from '../../utility/DateBox'
import WeekView from '../../utility/WeekView';
import UpdateModal from '../../utility/UpdateModal';
import { useDispatch, useSelector } from 'react-redux';
import { countEvents, setTimeThresold, showMonthData, updateMonthArray } from '../../services/slices/AttendanceSlice';
import { compareTimeWithCurrent } from '../../config/CompareTime';
import SetTimeModal from '../../utility/SetTimeModal';

type Splash_Props = {
  navigation: any
};

type Date_Obj_Type = {
  currentYear: number;
  currentMonth: string;
  currentMonthIndex: number;
};

var curIndex: number;

const MonthView = ({ navigation }: Splash_Props): JSX.Element => {
  const { month_array, late, absent, leaves, work_days, idle_time } = useSelector((state: any) => state.attendanceSlice);
  const currentDay: number = new Date().getDate();
  const [currentDate, setCurrentDate] = useState<Date_Obj_Type>(
    {
      currentMonth: new Date().toLocaleString('en-US', { month: 'long' }),
      currentYear: new Date().getFullYear(),
      currentMonthIndex: new Date().getMonth()
    }
  );
  const [show, setShow] = useState<boolean>(false);
  const [prevNext, setPrevNext] = useState<boolean>(true);
  const [timeModal, setTimeModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const setMonthData = (current: Date, curMIdx: number) => {
    setCurrentDate({
      currentMonth: current.toLocaleString('en-US', { month: 'long' }),
      currentYear: current.getFullYear(),
      currentMonthIndex: curMIdx,
    });
  };

  const getCurrentMonth = (): Date => {
    const { currentYear, currentMonthIndex } = currentDate;
    return new Date(currentYear, currentMonthIndex);
  };

  const previousMonth = () => {
    const current = getCurrentMonth();
    current.setMonth(current.getMonth() - 1);
    setMonthData(current, current.getMonth());
    dispatch(showMonthData(0))
    setPrevNext(false);
    dispatch(countEvents());
  };

  const nextMonth = () => {
    const current = getCurrentMonth();
    current.setMonth(current.getMonth() + 1);
    setMonthData(current, current.getMonth());
    dispatch(showMonthData(1))
    setPrevNext(true);
    dispatch(countEvents());
  };

  const openModal = (index: number) => {
    curIndex = index;
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const manageDate = (params: string, time: string, leaveHoliday: string) => {
    const entryTime: string = new Date().toTimeString().split(" ")[0];
    const finalEntryTime: string = time ? time + ":00" : entryTime;
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
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#3d4342" }}>
              Idle Time : {`${idle_time.split(":")[0]}:${idle_time.split(":")[1]}`}
            </Text>
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
            <View style={{ flexDirection: "row", columnGap: 20 }}>
              <TouchableOpacity
                style={[styles.arrowBtn, styles.rotate180, { backgroundColor: prevNext ? "" : "#E6E6E6" }]}
                onPress={previousMonth}
                disabled={prevNext ? false : true}
              >
                <Image style={styles.arrow} source={require("../../assets/icons/right-arrow.png")} />
              </TouchableOpacity>

              <Text style={styles.sub_heading}>
                {`${currentDate?.currentMonth}, ${currentDate?.currentYear}`}
              </Text>

              <TouchableOpacity
                style={[styles.arrowBtn, { backgroundColor: prevNext ? "#E6E6E6" : "" }]}
                onPress={nextMonth}
                disabled={prevNext ? true : false}
              >
                <Image style={styles.arrow} source={require("../../assets/icons/right-arrow.png")} />
              </TouchableOpacity>
            </View>

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
                  <DateBox item={item} index={index} currentDay={currentDay} onPress={openModal} navigation={navigation} />
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
  arrow: {
    width: 15,
    height: 15,
    tintColor: "#F19733"
  },
  rotate180: {
    transform: [{ rotate: "180deg" }]
  },
  arrowBtn: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderColor: "#F19733"
  }
});