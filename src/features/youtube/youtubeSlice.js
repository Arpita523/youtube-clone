import { createSlice } from '@reduxjs/toolkit';
import { getHomePageVideos } from '../../store/reducers/getHomePageVideos';
import { getSearchPageVideos } from '../../store/reducers/getSearchPageVideos';

const initialState = {
    video : [],
    currentPLaying : null,
    searchterm : "",
    searchResults : [],
    nextPageToken : null,
    recommendedVideo : []
}

const youtubeslice = createSlice({
    name :"youtubeApp",
    initialState,
    reducers: {
        clearVideos: (state) => {
            state.video = [];
            state.nextPageToken = null;
        },
        changeSearchTerm : (state, action) => {
            state.searchterm = action.payload
        },
        clearSearchTerm : (state) => {
            state.searchterm = "";
        }
    },
    extraReducers:(builder) =>{ 
        builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
            if(action.payload && action.payload.parsedData){
                state.video = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            }
        })
         builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
            if(action.payload && action.payload.parsedData){
                state.video = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            }
        })
    }
})

export const {clearVideos, changeSearchTerm, clearSearchTerm} = youtubeslice.actions;
export default youtubeslice.reducer