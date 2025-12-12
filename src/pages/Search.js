import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchCard from '../components/SearchCard';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { clearVideos } from '../features/youtube/youtubeSlice';
import { useAppDispatch, useAppSelector } from '../store/ConfigureStore';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';


const Search = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.video);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchterm);

  useEffect(() => {
    dispatch(clearVideos())
    if(searchTerm === "") navigate("/");
    else dispatch(getSearchPageVideos(false))
  }, [dispatch, navigate, searchTerm])

  
  return (
    <div className='max-h-screen overflow-auto'>
      <div style={{height : "7.5vh"}}>
        <Navbar/> 
      </div> 
      <div className="flex" style={{height : "92.5vh"}}>
        <Sidebar/>
          {
          videos.length ? (
            <div className='py-8 pl-8 flex flex-col gap-5 w-full'>
            <InfiniteScroll 
             dataLength={videos.length} 
             next={() => dispatch(getSearchPageVideos(true))}
             hasMore={videos.length < 500}
             loader={<Spinner/>}
             height={650}
             >
             
                {videos.map((item) => {
                  return (
                     <div className="my-5 mt-5">
                  <SearchCard data={item} key={item.videoId}/>
                    </div>
                )

                })}

            </InfiniteScroll>
            </div>
          ):(
          <Spinner/>
          )
        }
       
      </div>
    </div>
  )
}

export default Search

