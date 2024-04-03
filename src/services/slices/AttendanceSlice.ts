import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const AttendanceSlice = createSlice({
    name: "attendanceSlice",
    initialState: {
        month_array: [],
        month_data: [],
        temp_data: [],
        late: 0,
        absent: 0,
        leaves: 0,
        work_days: 0,
        idle_time: ""
    },
    reducers: {
        getMonthArray(state, { payload }) {
            let data: any[] = [];
            for (let i: number = 0, j: number = 0; i < payload.length; i++) {
                if (i == 0) {
                    data.push({ ...payload[j], isHoliday: true, isDisabled: true });
                    j += 6;
                    continue;
                }
                if (i == j) {
                    data.push({ ...payload[j], isHoliday: true, isDisabled: true });
                    data.push({ ...payload[j + 1], isHoliday: true, isDisabled: true });
                    j += 6 + 1;
                    i += 1;
                    continue;
                }
                data.push(payload[i]);
            };
            const modifiedData: any = data
            state.month_array = modifiedData;
        },
        updateMonthArray(state, { payload }) {
            const data = state.month_array;
            const modifiedData: any = data.map((item: any, idx) => {
                if (idx === payload.index) {
                    return {
                        ...item,
                        isAbsent: payload.isAbsent,
                        time: payload.time,
                        status: payload.status,
                        isDisabled: true,
                        isHoliday: payload.holiday,
                        isLeave: payload.leave
                    };
                }
                return item;
            });
            state.month_array = modifiedData;
            AsyncStorage.setItem("@absentLate", JSON.stringify(modifiedData));
        },
        countEvents(state) {
            let countLate: number = 0;
            let countAbsent: number = 0;
            let countLeave: number = 0;
            let countWorkday: number = 0;
            state.month_array.map((item: any) => {
                if (item.status === "false" && item.isAbsent === "present") countLate++
                if (item.isAbsent === "absent") countAbsent++
                if (item.isLeave) countLeave++
                if (!item.isHoliday && item.date !== null) countWorkday++
            });
            state.late = countLate;
            state.absent = countAbsent;
            state.leaves = countLeave;
            state.work_days = countWorkday;
        },
        setTimeThresold(state, { payload }) {
            const defaultTime: string = payload ? payload : "11:10:59";
            AsyncStorage.setItem("@timeThresold", defaultTime);
            state.idle_time = defaultTime;
        },
        showMonthData(state, { payload }) {
            if (payload) {
                state.month_array = state.temp_data;
            } else {
                state.temp_data = state.month_array;
                state.month_array = state.month_data;
            }
        },
        setMonthData(state, { payload }) {
            console.log("setMonthData",payload);
            
            state.month_data = payload;
        },
    },
});

export const { getMonthArray, updateMonthArray, countEvents, setTimeThresold, showMonthData, setMonthData } = AttendanceSlice.actions;
export default AttendanceSlice.reducer;