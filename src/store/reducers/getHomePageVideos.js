import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import parseData from "../../utils/parseData";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY
export const getHomePageVideos = createAsyncThunk(
    "youtubeApp/getHomePageVideos", async(isNext, {getState}) =>{
        const {youtubeApp : {nextPageToken : nextPageTokenFromState, video},} = getState();
        // const {
        //     data : {items, nextPageToken},
        // } 
        
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="drop x out"&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""}`);
        // console.log(response.data.items);
        const items = response.data.items;
        // console.log(items);

        const parsedData = await parseData(items)
        // console.log(parsedData);
        return {parsedData: [...video, ...parsedData], nextPageToken: nextPageTokenFromState}
    }
)