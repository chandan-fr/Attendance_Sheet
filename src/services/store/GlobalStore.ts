import { configureStore } from "@reduxjs/toolkit";
import AttendanceSlice from "../slices/AttendanceSlice";

const store: any = configureStore({
    reducer: {
        attendanceSlice: AttendanceSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;