import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { getRecommendedVideo } from "../store/reducers/getRecommendedVideo";
import { getVideoDetails } from "../store/reducers/getVideoDetails";

const Watch = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentPlaying = useAppSelector((state) => state.youtubeApp.currentPlaying);
    // const recommendedVideo = useAppSelector((state) => state.youtubeApp.recommendedVideo);

    console.log(currentPlaying)
    useEffect(() => {
        if(id){
            dispatch(getVideoDetails(id));
        } else {
            navigate("/");
        }
    }, [id, navigate, dispatch])

    useEffect(() => {
        if(currentPlaying && id){
            dispatch(getRecommendedVideo(id));
        }
    }, [currentPlaying, dispatch, id])
    
    return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className='max-h-screen overflow-auto'>
            <div style={{height : "7.5vh"}}>
                <Navbar/> 
            </div> 
            <div>
                <div>
                    <div>
                        <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1`} frameBorder={0} width={800} height={502} allowFullScreen title="youtube player">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  )
}

export default Watch
