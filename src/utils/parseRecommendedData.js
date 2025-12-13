
import axios from "axios";
import convertRawToString from "./convertRawToString";
import parseVideoDuration from "./parseVideoDuration";
import timeSince from "./timeSince";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

const parseRecommendedData = async (items) => {
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

export default parseRecommendedData;


