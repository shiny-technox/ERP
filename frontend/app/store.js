import { configureStore } from "@reduxjs/toolkit"; 
import userReducer from "../slices/userSlice";
import attendanceSlice from "../slices/attendanceSlice";

const store = configureStore({
    reducer:{
        usersInfo: userReducer,
        attendanceInfo: attendanceSlice,
    },
});

export default store;