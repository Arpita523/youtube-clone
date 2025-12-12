import axios from "axios";
import convertRawToString from "./convertRawToString";
import parseVideoDuration from "./parseVideoDuration";
import timeSince from "./timeSince";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

const parseData = async (items) => {
  try {
    const videoIds = [];
    const channelIds = [];

    items.forEach((item) => {
      videoIds.push(item.id.videoId);
      channelIds.push(item.snippet.channelId);
    });

    // Fetch channel details
    const {
      data: { items: channelsData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds.join(",")}&key=${API_KEY}`
    );

    const parsedChannelsData = channelsData.map((channel) => ({
      id: channel.id,
      image: channel.snippet.thumbnails.default.url,
    }));

    // Fetch video statistics + snippet
    const {
      data: { items: videoData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );

    const parsedVideos = [];

    videoData.forEach((item, index) => {
      const channel = parsedChannelsData.find(
        (data) => data.id === item.snippet.channelId
      );

      if (!channel) return;

      parsedVideos.push({
        videoId: item.id,
        videoTitle: item.snippet.title,
        videoDescription: item.snippet.description,
        videoThumbnail: item.snippet.thumbnails?.medium?.url,
        videoLink: `https://www.youtube.com/watch?v=${item.id}`,
        videoDuration: parseVideoDuration(item.contentDetails.duration),
        videoViews: convertRawToString(item.statistics.viewCount),
        videoAge: timeSince(new Date(item.snippet.publishedAt)),
        channelInfo: {
          id: item.snippet.channelId,
          image: channel.image,
          name: item.snippet.channelTitle,
        },
      });
    });

    return parsedVideos;
  } catch (error) {
    console.error("Error parsing data:", error);
  }
};

export default parseData;


// import axios from "axios";
// import convertRawToString from "./convertRawToString";
// import parseVideoDuration from "./parseVideoDuration";
// import timeSince from "./timeSince";

// const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY

// const parseData = async(items) => {
//     console.log(items)

//     try{
//       const videoIds = [];
//       const channelIds = [];

//       items.forEach((items) => {
//         videoIds.push(items.id.videoId);
//         channelIds.push(items.snippet.channelId);
//       });
//       const {
//         data: { items: channelsData },
//       } = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`);
//       const parsedChannelsData = [];
//       channelsData.forEach((channel) =>
//         parsedChannelsData.push({
//           id: channel.id,
//           image: channel.snippet.thumbnails.default.url,
//         })
//       );
      
//       const {
//         data: { items: videoData },} = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`);
        
//         const parseData = [];
//         videoData.forEach((item, index) => {
//           const { image: channelImage } = parsedChannelsData.find(
//             (data) => data.id === item.snippet.channelId
//           );
          
//           if (channelImage) {
//             parseData.push({
//               videoId: item.id.videoData,
//               videoTitle: item.snippet.title,
//               videoDescription: item.snippet.description,
//               videoThumbnail: item.snippet.thumbnails,
//               videoLink : `https://www.youtube.com/watch?v=${item.id.videoId}`,
//               videoDuration : parseVideoDuration(videoData[index].contentDetails.duration),
//               videoViews : convertRawToString(
//                 videoData[index].statistics.viewCount
//               ),
//               videoAge : timeSince(new Date(item.snippet.publishedAt)),
//               channelInfo:{
//                 id: item.snippet.channelId,
//                 image : channelImage,
//                 name: item.snippet.channelTitle,
//               }
//             });
//           }
//         });
//       return parseData;
//     } catch (error) {
//       console.log(error);
//     }
// }

// export default parseData
