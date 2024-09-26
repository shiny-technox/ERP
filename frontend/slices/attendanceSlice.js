import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    attendance : [],
};

export const attendanceSlice = createSlice({
    name : 'attendance',
    initialState,
    reducers:{
        setAttendance:(state, action) => {
            state.attendance = [...state.attendance,action.payload];
        }
    }
})

export const { setAttendance } = attendanceSlice.actions;

export default attendanceSlice.reducer;