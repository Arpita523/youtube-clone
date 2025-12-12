import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import youtubeReducer from '../features/youtube/youtubeSlice';


const store = configureStore({
  reducer: {
    youtubeApp: youtubeReducer,
  },
})

export default store

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
