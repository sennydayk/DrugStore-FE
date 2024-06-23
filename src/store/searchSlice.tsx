import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'

interface SearchState {
    keyword: string;
    results: any[];
    loading: boolean;
}

const initialState: SearchState = {
    keyword: "",
    results: [],
    loading: false,
};


export const fetchSearchResults = createAsyncThunk(
    "search/fetchSearchResults",
    async (keyword: string) => {
        const encodedKeyword = encodeURIComponent(keyword);
        const response = await axios.get(`https://drugstoreproject.shop/main/find?keyword=${encodedKeyword}`);
        return response.data.data.content;
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchKeyword: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.results = action.payload;
                state.loading = false;
            })
            .addCase(fetchSearchResults.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setSearchKeyword } = searchSlice.actions;
export default searchSlice.reducer;