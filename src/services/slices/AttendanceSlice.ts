import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const AttendanceSlice = createSlice({
    name: "attendanceSlice",
    initialState: {
        month_array: [],
        late: 0,
        absent: 0
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
                data.push({ ...payload[i], isHoliday: false });
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
                        isDisabled: true
                    };
                }
                return item;
            });
            state.month_array = modifiedData;
            AsyncStorage.setItem("@absentLate", JSON.stringify(modifiedData));
        },
        countLateAndAbsent(state) {
            state.month_array.map((item: any) => {
                if (item.status === "false") state.late++
                if (item.isAbsent === "absent") state.absent++
            });
        },
    },
});

export const { getMonthArray, updateMonthArray, countLateAndAbsent } = AttendanceSlice.actions;
export default AttendanceSlice.reducer;