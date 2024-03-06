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
            state.month_array = payload;
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