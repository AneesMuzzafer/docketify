import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tickets: [],
}

export const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        addTicket: (state, action) => {
            state.links = [...state.links, action.payload];
        },
        deleteTicket: (state, action) => {
            state.links = state.links.filter(l => l.id !== action.id);
        },
    },
});

export const { addTicket, deleteTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
