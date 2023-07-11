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
        deleteTickets: (state, action) => {
            state.tickets = state.tickets.filter(t => t.link !== action.payload)
        },
        deleteTicket: (state, action) => {
            state.tickets = state.tickets.filter(t => t.id !== action.payload);
        },
    },
});

export const { addTicket, deleteTickets, deleteTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
