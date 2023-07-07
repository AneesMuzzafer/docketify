import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tickets: [],
}

export const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        addTicket: (state, action) => {
            state.tickets = [...state.tickets, action.payload];
        },
        deleteTicket: (state, action) => {
            state.tickets = state.tickets.filter(t => t.id !== action);
        },
    },
});

export const { addTicket, deleteTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
