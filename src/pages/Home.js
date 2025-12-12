import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { useAppDispatch, useAppSelector } from '../store/ConfigureStore';
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';


const Home = () => {
  const diapatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.video);
  useEffect(() => {
    diapatch(getHomePageVideos(false))
  }, [diapatch])

  

  // useEffect(() => {
  //   console.log(videos);  // Now shows updated values
  // }, [videos]);

  return (
    <div className='max-h-screen overflow-auto'>
      <div style={{height : "7.5vh"}}>
        <Navbar/> 
      </div> 
      <div className="flex" style={{height : "92.5vh"}}>
        <Sidebar/>
          {
          videos.length ? (
            <InfiniteScroll 
             dataLength={videos.length} 
             next={() => dispatchEvent(getHomePageVideos(true))}
             hasMore={videos.length < 500}
             loader={<Spinner/>}
             height={650}
             >
              <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
                {videos.map((item) => {
                  return <Card data={item} key={item.videoId}/>
                })}
              </div>
            </InfiniteScroll>
          ):(
          <Spinner/>
          )
        }
       
      </div>
    </div>
  )
}

export default Home

