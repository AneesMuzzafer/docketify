import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    links: [],
}

export const linkSlice = createSlice({
    name: "links",
    initialState,
    reducers: {
        addLink: (state, action) => {
            state.links = [...state.links, action.payload];
        },
        deleteLink: (state, action) => {
            state.links = state.links.filter(l => l.id !== action.id);
        },
    },
});

export const { addLink, deleteLink } = linkSlice.actions;

export default linkSlice.reducer;
