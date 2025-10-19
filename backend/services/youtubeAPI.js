import axios from "axios";

export async function fetchYoutubeTrends(apiKey,regionCode ='US',maxResults = 5, categoryId) {
    if(!apiKey){
        return[
            {
                platform:'Youtube',
                topicId: 'mock1',
                title: 'Mock viral videos',
                url: 'https://youtu.be/mock1',
                metrics:{views: 123, likes: 233, comments: 90},
                category: 'science',
                regionCode,
                timestamp: new Date(),
            },
        ];
    }

    let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}&key=${apiKey}`
    if(categoryId){
        url+= `&videoCategoryId=${categoryId}`
    }
    const response = await axios.get(url);

    return response.data.items.map((item)=>({
        platform:'Youtube',
        topicId : item.id,
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        metrics: {
            views: Number(item.statistics?.viewCount || 0),
            likes: Number(item.statistics?.likeCount || 0),
            comments: Number(item.statistics?.commentCount || 0),
        },
        category: item.snippet.categoryId,
        regionCode,
        timestamp: new Date(),
    }));
}

export async function searchYoutubeKeyword(apiKey, keyword, regionCode = "US", maxResults = 5) {
  // Step 1: search videos by keyword
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
    keyword
  )}&regionCode=${regionCode}&maxResults=${maxResults}&key=${apiKey}`;
  const searchRes = await axios.get(searchUrl);

  const videoIds = searchRes.data.items.map((item) => item.id.videoId).join(",");

  if (!videoIds) return [];

  // Step 2: fetch statistics for those IDs
  const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${apiKey}`;
  const statsRes = await axios.get(statsUrl);

  // Step 3: normalize response
  return statsRes.data.items.map((item) => ({
    platform: "Youtube",
    topicId: item.id,
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.id}`,
    metrics: {
      views: Number(item.statistics?.viewCount || 0),
      likes: Number(item.statistics?.likeCount || 0),
      comments: Number(item.statistics?.commentCount || 0),
    },
    regionCode,
    keyword,
    timestamp: new Date(),
  }));
}

export async function fetchYoutubeCategories(apiKey,regionCode='US') {
    const url = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=${regionCode}&key=${apiKey}`;
    const response = await axios.get(url);

    return response.data.items.map((item)=> ({
        id: item.id,
        title: item.snippet.title,
        regionCode,
    }));
}
