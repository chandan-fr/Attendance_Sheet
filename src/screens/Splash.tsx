import { Image, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { DayDate, getMonthToDatesArray } from '../config/MonthToDateArray';
import { countEvents, getMonthArray, setTimeThresold } from '../services/slices/AttendanceSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Splash_Props = {
  navigation: any
};

const Splash = ({ navigation }: Splash_Props): JSX.Element => {
  const dispatch = useDispatch();

  const getAsyncData = async (): Promise<void> => {
    const mtda: DayDate[] = getMonthToDatesArray();
    const cunMonth = new Date().getMonth();
    const res: any = await AsyncStorage.getItem("@absentLate");
    const time: string | null = await AsyncStorage.getItem("@timeThresold");
    dispatch(setTimeThresold(time));
    
    const data = JSON.parse(res);
    const monthInMtda: number = data[0].month;
    
    if (data !== null && monthInMtda == cunMonth) {
      dispatch(getMonthArray(data));
    } else {
      dispatch(getMonthArray(mtda));
    }
  };

  useEffect(() => {
    getAsyncData();
    setTimeout(() => {
      dispatch(countEvents());
      navigation.replace("monthview");
    }, 1000);
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <Image
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/images/splash.jpg")}
      />
    </View>
  )
};

export default Splash;

const styles = StyleSheet.create({});