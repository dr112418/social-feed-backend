// 用户数据
const users = [
  {
    id: 1,
    name: "萌萌宠物控",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "旅行博主",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 3,
    name: "美食达人",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 4,
    name: "创意生活家",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 5,
    name: "游戏玩家",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 6,
    name: "科技分享",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 7,
    name: "阅读爱好者",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 8,
    name: "摄影师小王",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

// 生成随机数
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 生成随机日期
const getRandomDate = (days = 7) => {
  const date = new Date();
  date.setDate(date.getDate() - getRandomInt(0, days));
  date.setHours(getRandomInt(0, 23));
  date.setMinutes(getRandomInt(0, 59));
  return date.getTime();
};

// 生成随机标题
const generateTitle = (type) => {
  const generalTitles = [
    "今天发现了一个很有趣的地方",
    "分享一下我的日常",
    "周末去了这个地方，非常推荐！",
    "新入手的宝贝，好用到爆",
    "这个创意太棒了，分享给大家",
    "终于吃到了这家网红店",
    "学习到的一个小技巧，很实用",
    "今天的天气真好，拍了几张照片",
    "最近看的一本好书，推荐给大家",
    "发现了一个有趣的小游戏",
  ];

  const travelTitles = [
    "探索秘境|这个小众景点太美了",
    "旅行日记|第三天，遇见了最美的日落",
    "一个人的旅行，却收获了满满的感动",
    "这个古镇藏着很多故事，值得一去",
    "深山里的这个村落，仿佛世外桃源",
    "城市漫步|发现不一样的街角风景",
    "海边小镇的周末时光",
    "穿越雨林的冒险之旅",
    "雪山徒步，一生必去的体验",
    "这个博物馆太震撼了，花了整整一天",
  ];

  const foodTitles = [
    "自制美食|超简单的家常菜做法",
    "尝试了网红食谱，效果惊人",
    "这家隐藏的小店，值得专程去吃",
    "学会这道菜，再也不用点外卖",
    "早餐的新选择，健康又美味",
    "家常甜点|新手也能轻松上手",
    "这款零食太上瘾了，分享给大家",
    "探店|这家店的招牌菜太好吃了",
    "周末烘焙|松软可口的面包做法",
    "夏日饮品|在家就能做的冰爽果茶",
  ];

  const titles = {
    general: generalTitles,
    travel: travelTitles,
    food: foodTitles,
  };

  const titleList = titles[type] || generalTitles;
  return titleList[getRandomInt(0, titleList.length - 1)];
};

// 生成图片 URL
const generateImageUrl = (type, id) => {
  // 固定宽度
  const width = 400;

  // 随机高度 - 在这里可以设置不同的高度范围
  const heights = [200, 250, 300, 350, 400, 450, 500];
  const randomHeightIndex = Math.floor(Math.random() * heights.length);
  const height = heights[randomHeightIndex];

  if (type === "travel") {
    return `https://picsum.photos/seed/travel${id}/${width}/${height}`;
  } else if (type === "food") {
    return `https://picsum.photos/seed/food${id}/${width}/${height}`;
  } else {
    return `https://picsum.photos/seed/general${id}/${width}/${height}`;
  }
};

// 生成视频 URL (使用示例视频)
const generateVideoUrl = (id) => {
  const videos = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  ];

  return videos[id % videos.length];
};

// 生成帖子数据
const generateFeedItem = (id, type) => {
  const isVideo = getRandomInt(1, 10) <= 3; // 30%的几率生成视频
  const user = users[getRandomInt(0, users.length - 1)];

  return {
    id: id + Date.now(), // 确保ID唯一
    title: generateTitle(type),
    type: isVideo ? "video" : "image",
    media: isVideo ? generateVideoUrl(id) : generateImageUrl(type, id),
    poster: isVideo ? generateImageUrl(type, id) : null,
    user,
    timestamp: getRandomDate(),
    likes: getRandomInt(5, 9999),
    comments: getRandomInt(0, 500),
    shares: getRandomInt(0, 200),
  };
};

// 生成内容流数据
export const generateFeedData = (type, page, limit) => {
  const startIndex = (page - 1) * limit;
  const result = [];

  for (let i = 0; i < limit; i++) {
    result.push(generateFeedItem(startIndex + i + 1, type));
  }

  return result;
};
