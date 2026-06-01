import { useState, useEffect } from "react";

const LANG = {
  zh: {
    appName: "奢寓", tagline: "頂級套房預訂平台", search: "搜尋", city: "城市",
    checkIn: "入住日期", checkOut: "退房日期", guests: "人數", filters: "篩選條件",
    priceRange: "價格範圍", starRating: "星級", amenities: "設施", distance: "距離市中心",
    perNight: "/ 晚", reviews: "評論", bookNow: "立即預訂", nearby: "附近景點",
    guestReviews: "旅客評論", roomTypes: "房型", description: "飯店介紹",
    notifications: "通知", nav: ["探索", "地圖", "收藏", "通知", "帳戶"],
    amenityList: ["游泳池", "健身房", "Spa", "餐廳", "停車場", "寵物友善", "商務中心", "接送服務", "私人海灘", "直升機停機坪"],
    sortOptions: ["推薦", "價格低至高", "評分最高"], km: "公里",
    confirmMsg: "套房已成功預訂！", duplicateMsg: "您已預訂此套房，無法重複預訂",
    available: "有空房", unavailable: "已額滿", yourBookings: "我的預訂",
    noBookings: "尚無預訂記錄", apply: "套用", clear: "清除", nights: "晚",
    total: "總計", back: "返回", viewDetails: "查看詳情", map: "地圖視圖",
    markFav: "收藏", allStars: "全部", worldMap: "世界地圖",
  },
  en: {
    appName: "LuxSuite", tagline: "Premium Suite Booking", search: "Search", city: "City",
    checkIn: "Check-in", checkOut: "Check-out", guests: "Guests", filters: "Filters",
    priceRange: "Price Range", starRating: "Star Rating", amenities: "Amenities", distance: "Distance",
    perNight: "/ night", reviews: "reviews", bookNow: "Book Now", nearby: "Nearby Attractions",
    guestReviews: "Guest Reviews", roomTypes: "Room Types", description: "About",
    notifications: "Notifications", nav: ["Explore", "Map", "Saved", "Alerts", "Account"],
    amenityList: ["Pool", "Gym", "Spa", "Restaurant", "Parking", "Pet Friendly", "Business Center", "Airport Shuttle", "Private Beach", "Helipad"],
    sortOptions: ["Recommended", "Price: Low to High", "Highest Rated"], km: "km",
    confirmMsg: "Suite successfully booked!", duplicateMsg: "You already booked this suite.",
    available: "Available", unavailable: "Sold Out", yourBookings: "My Bookings",
    noBookings: "No bookings yet", apply: "Apply", clear: "Clear", nights: "nights",
    total: "Total", back: "Back", viewDetails: "View Details", map: "Map View",
    markFav: "Save", allStars: "All", worldMap: "World Map",
  }
};

const HOTELS = [
  {
    id:1, name:{zh:"台北君悅大酒店",en:"Grand Hyatt Taipei"}, city:{zh:"台北",en:"Taipei"}, cityKey:"taipei",
    stars:5, rating:4.8, reviewCount:2340, pricePerNight:18500, distanceKm:1.2, lat:25.0408, lng:121.5654,
    images:["https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80","https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80"],
    amenities:[0,1,2,3,4,7],
    description:{zh:"台北最具代表性的五星級豪華飯店，坐落於信義商圈核心地帶。每間套房均提供城市全景，配備精緻衛浴與頂級寢具。",en:"Taipei's most iconic five-star luxury hotel in the heart of Xinyi District. Every suite offers panoramic city views and world-class bedding."},
    rooms:[{name:{zh:"豪華套房",en:"Deluxe Suite"},price:18500,available:true},{name:{zh:"行政套房",en:"Executive Suite"},price:26000,available:true},{name:{zh:"總統套房",en:"Presidential Suite"},price:58000,available:false}],
    reviews:[{name:"Sophia W.",rating:5,date:"2025-11",text:{zh:"無可挑剔的服務，景觀絕美！",en:"Impeccable service and stunning views!"},avatar:"SW"},{name:"陳先生",rating:4,date:"2025-10",text:{zh:"地點極佳，很推薦！",en:"Great location, highly recommend!"},avatar:"陳"}],
    nearby:[{zh:"台北 101 (0.5 km)",en:"Taipei 101 (0.5 km)"},{zh:"信義商圈 (0.3 km)",en:"Xinyi District (0.3 km)"}]
  },
  {
    id:2, name:{zh:"東京半島酒店",en:"The Peninsula Tokyo"}, city:{zh:"東京",en:"Tokyo"}, cityKey:"tokyo",
    stars:5, rating:4.9, reviewCount:3102, pricePerNight:32000, distanceKm:0.8, lat:35.6762, lng:139.7503,
    images:["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80","https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80","https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80"],
    amenities:[0,1,2,3,7],
    description:{zh:"坐落於日比谷公園旁，融合日式精緻美學與西方豪華設施，是東京最受追捧的頂級住宿。",en:"Overlooking Hibiya Park, blending Japanese refined aesthetics with Western luxury — Tokyo's most sought-after address."},
    rooms:[{name:{zh:"都市景觀套房",en:"City View Suite"},price:32000,available:true},{name:{zh:"灣景套房",en:"Bay View Suite"},price:45000,available:true},{name:{zh:"皇家套房",en:"Royal Suite"},price:120000,available:false}],
    reviews:[{name:"Julia K.",rating:5,date:"2025-11",text:{zh:"東京最頂級的住宿體驗！",en:"The pinnacle of Tokyo accommodation!"},avatar:"JK"},{name:"田中さん",rating:5,date:"2025-10",text:{zh:"日式款待精神令人難忘。",en:"True omotenashi hospitality."},avatar:"田"}],
    nearby:[{zh:"皇居 (1.0 km)",en:"Imperial Palace (1.0 km)"},{zh:"銀座 (0.6 km)",en:"Ginza (0.6 km)"}]
  },
  {
    id:3, name:{zh:"香港四季酒店",en:"Four Seasons Hong Kong"}, city:{zh:"香港",en:"Hong Kong"}, cityKey:"hongkong",
    stars:5, rating:4.7, reviewCount:1876, pricePerNight:24000, distanceKm:0.5, lat:22.2830, lng:114.1588,
    images:["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80","https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80","https://images.unsplash.com/photo-1592229506151-845940174bb0?w=800&q=80"],
    amenities:[0,1,2,3,4],
    description:{zh:"位於中環金融核心，坐擁維多利亞港無敵海景。絢爛的夜景與無微不至的服務，是香港最頂級的住宿體驗。",en:"In the heart of Central with unobstructed Victoria Harbour views. Dazzling nightscapes and meticulous service."},
    rooms:[{name:{zh:"海港景觀套房",en:"Harbour View Suite"},price:24000,available:true},{name:{zh:"天際套房",en:"Sky Suite"},price:38000,available:true},{name:{zh:"頂層套房",en:"Penthouse Suite"},price:88000,available:false}],
    reviews:[{name:"David L.",rating:5,date:"2025-11",text:{zh:"維港夜景是此生最難忘的體驗之一。",en:"The harbour view is among life's greatest experiences."},avatar:"DL"}],
    nearby:[{zh:"中環碼頭 (0.3 km)",en:"Central Pier (0.3 km)"},{zh:"蘭桂坊 (0.8 km)",en:"Lan Kwai Fong (0.8 km)"}]
  },
  {
    id:4, name:{zh:"首爾新羅飯店",en:"The Shilla Seoul"}, city:{zh:"首爾",en:"Seoul"}, cityKey:"seoul",
    stars:5, rating:4.6, reviewCount:1423, pricePerNight:15000, distanceKm:2.1, lat:37.5516, lng:126.9982,
    images:["https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80","https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=800&q=80","https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80"],
    amenities:[0,1,2,3,5],
    description:{zh:"融合韓國傳統美學與現代奢華設計，坐落於南山公園旁，俯瞰首爾城市全景。",en:"Merging Korean aesthetics with modern luxury beside Namsan Park, with panoramic Seoul views."},
    rooms:[{name:{zh:"首爾景觀套房",en:"Seoul View Suite"},price:15000,available:true},{name:{zh:"南山套房",en:"Namsan Suite"},price:22000,available:true},{name:{zh:"總統套房",en:"Presidential Suite"},price:65000,available:true}],
    reviews:[{name:"Emily C.",rating:5,date:"2025-11",text:{zh:"早餐選擇豐富，整體體驗超出預期！",en:"Incredible breakfast and exceeded expectations!"},avatar:"EC"}],
    nearby:[{zh:"南山公園 (0.3 km)",en:"Namsan Park (0.3 km)"},{zh:"明洞 (1.5 km)",en:"Myeongdong (1.5 km)"}]
  },
  {
    id:5, name:{zh:"新加坡濱海灣金沙",en:"Marina Bay Sands"}, city:{zh:"新加坡",en:"Singapore"}, cityKey:"singapore",
    stars:5, rating:4.5, reviewCount:5674, pricePerNight:20000, distanceKm:0.9, lat:1.2834, lng:103.8607,
    images:["https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80","https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80","https://images.unsplash.com/photo-1519449556851-5720b33024e7?w=800&q=80"],
    amenities:[0,1,2,3,4,6],
    description:{zh:"全球最具辨識度的地標酒店，頂層無邊際泳池俯瞰整個新加坡天際線。",en:"The world's most iconic hotel with the legendary infinity pool overlooking Singapore's skyline."},
    rooms:[{name:{zh:"豪華套房",en:"Deluxe Suite"},price:20000,available:true},{name:{zh:"天際套房",en:"Sky Suite"},price:35000,available:false},{name:{zh:"主席套房",en:"Chairman Suite"},price:95000,available:false}],
    reviews:[{name:"Aisha M.",rating:5,date:"2025-11",text:{zh:"無邊際泳池夜景令人窒息！",en:"The infinity pool at night is breathtaking!"},avatar:"AM"}],
    nearby:[{zh:"濱海灣花園 (0.2 km)",en:"Gardens by the Bay (0.2 km)"},{zh:"魚尾獅公園 (1.0 km)",en:"Merlion Park (1.0 km)"}]
  },
  {
    id:6, name:{zh:"曼谷文華東方",en:"Mandarin Oriental Bangkok"}, city:{zh:"曼谷",en:"Bangkok"}, cityKey:"bangkok",
    stars:5, rating:4.9, reviewCount:2891, pricePerNight:12000, distanceKm:1.5, lat:13.7238, lng:100.5123,
    images:["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80","https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80","https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800&q=80"],
    amenities:[0,1,2,3,7],
    description:{zh:"坐落昭披耶河畔逾百年的傳奇飯店，殖民時期建築與泰式服務藝術的完美融合。",en:"A legendary hotel on the Chao Phraya River for over a century. Colonial architecture meets Thai service artistry."},
    rooms:[{name:{zh:"河景套房",en:"River View Suite"},price:12000,available:true},{name:{zh:"作家套房",en:"Author's Suite"},price:22000,available:true},{name:{zh:"大師套房",en:"Grand Suite"},price:48000,available:true}],
    reviews:[{name:"Laurent B.",rating:5,date:"2025-11",text:{zh:"曼谷最頂級的酒店，服務無可比擬。",en:"Bangkok's finest — unmatched service."},avatar:"LB"}],
    nearby:[{zh:"臥佛寺 (2.0 km)",en:"Wat Pho (2.0 km)"},{zh:"大皇宮 (2.5 km)",en:"Grand Palace (2.5 km)"}]
  },
  {
    id:7, name:{zh:"杜拜帆船酒店",en:"Burj Al Arab Dubai"}, city:{zh:"杜拜",en:"Dubai"}, cityKey:"dubai",
    stars:5, rating:4.9, reviewCount:4210, pricePerNight:98000, distanceKm:0.3, lat:25.1412, lng:55.1853,
    images:["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80","https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80","https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80"],
    amenities:[0,1,2,3,7,8,9],
    description:{zh:"全球最豪華的帆船形地標酒店，私人島嶼上的頂級雙層套房，每間均配備黃金裝飾與私人管家服務，起跳價每晚 NT$98,000。",en:"The world's most luxurious sail-shaped hotel on a private island. Every duplex suite features gold accents and a personal butler. From NT$98,000/night."},
    rooms:[{name:{zh:"豪華套房",en:"Deluxe Suite"},price:98000,available:true},{name:{zh:"頂層雙層套房",en:"Panoramic Suite"},price:165000,available:true},{name:{zh:"皇家套房",en:"Royal Suite"},price:980000,available:false}],
    reviews:[{name:"Mohammed A.",rating:5,date:"2025-11",text:{zh:"人生中最奢華的住宿體驗，無可超越。",en:"The most luxurious experience of my life, unmatched."},avatar:"MA"},{name:"Sarah K.",rating:5,date:"2025-10",text:{zh:"私人管家服務令人感動，細節無可挑剔。",en:"The personal butler service was beyond expectations."},avatar:"SK"}],
    nearby:[{zh:"朱美拉海灘 (0.1 km)",en:"Jumeirah Beach (0.1 km)"},{zh:"棕櫚島 (5.0 km)",en:"Palm Jumeirah (5.0 km)"}]
  },
  {
    id:8, name:{zh:"巴黎麗茲酒店",en:"The Ritz Paris"}, city:{zh:"巴黎",en:"Paris"}, cityKey:"paris",
    stars:5, rating:4.9, reviewCount:3560, pricePerNight:85000, distanceKm:0.2, lat:48.8683, lng:2.3308,
    images:["https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80","https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80","https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=800&q=80"],
    amenities:[0,1,2,3,6],
    description:{zh:"坐落於旺多姆廣場的傳奇酒店，自1898年起接待全球皇室與名流。每間套房均為手工藝術品，融合法式奢華與現代舒適。",en:"The legendary Place Vendôme hotel since 1898, hosting royalty and celebrities. Every suite is a work of art blending French luxury and modern comfort."},
    rooms:[{name:{zh:"豪華套房",en:"Deluxe Suite"},price:85000,available:true},{name:{zh:"皇家套房",en:"Imperial Suite"},price:180000,available:true},{name:{zh:"可可香奈兒套房",en:"Coco Chanel Suite"},price:320000,available:false}],
    reviews:[{name:"Isabelle M.",rating:5,date:"2025-11",text:{zh:"巴黎最頂級的住宿，每個細節都是藝術。",en:"Paris at its finest — every detail is art."},avatar:"IM"},{name:"James W.",rating:5,date:"2025-10",text:{zh:"百年老店魅力依舊，服務無可比擬。",en:"Century-old charm still unmatched in service."},avatar:"JW"}],
    nearby:[{zh:"旺多姆廣場 (0.1 km)",en:"Place Vendôme (0.1 km)"},{zh:"羅浮宮 (0.8 km)",en:"The Louvre (0.8 km)"}]
  },
  {
    id:9, name:{zh:"紐約廣場飯店",en:"The Plaza New York"}, city:{zh:"紐約",en:"New York"}, cityKey:"newyork",
    stars:5, rating:4.7, reviewCount:4890, pricePerNight:72000, distanceKm:0.5, lat:40.7645, lng:-73.9741,
    images:["https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80","https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80","https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&q=80"],
    amenities:[0,1,2,3,6],
    description:{zh:"俯瞰中央公園的傳奇地標，自1907年起象徵紐約的奢華精髓。金碧輝煌的大廳與精緻套房，是好萊塢電影中的永恆場景。",en:"Overlooking Central Park since 1907, the epitome of New York luxury. Grand gilded halls and refined suites immortalized in Hollywood films."},
    rooms:[{name:{zh:"中央公園套房",en:"Central Park Suite"},price:72000,available:true},{name:{zh:"皇家套房",en:"Royal Suite"},price:145000,available:true},{name:{zh:"頂層套房",en:"Penthouse Suite"},price:580000,available:false}],
    reviews:[{name:"Michael B.",rating:5,date:"2025-11",text:{zh:"中央公園景觀讓人心曠神怡，服務一流。",en:"Central Park views are breathtaking, service is first-class."},avatar:"MB"},{name:"Emma R.",rating:4,date:"2025-10",text:{zh:"傳奇酒店，歷史氛圍濃厚，值得一住。",en:"Legendary hotel with incredible history, worth every penny."},avatar:"ER"}],
    nearby:[{zh:"中央公園 (0.1 km)",en:"Central Park (0.1 km)"},{zh:"第五大道 (0.2 km)",en:"Fifth Avenue (0.2 km)"}]
  },
  {
    id:10, name:{zh:"倫敦薩伏依酒店",en:"The Savoy London"}, city:{zh:"倫敦",en:"London"}, cityKey:"london",
    stars:5, rating:4.8, reviewCount:3120, pricePerNight:65000, distanceKm:0.7, lat:51.5104, lng:-0.1204,
    images:["https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80","https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80","https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=800&q=80"],
    amenities:[0,1,2,3,6,7],
    description:{zh:"坐落泰晤士河畔，自1889年起接待英國皇室與全球名流。裝飾藝術風格與英式典雅服務的完美結合。",en:"On the Thames since 1889, hosting British royalty and global celebrities. Perfect blend of Art Deco style and British elegance."},
    rooms:[{name:{zh:"泰晤士景觀套房",en:"Thames View Suite"},price:65000,available:true},{name:{zh:"皇家套房",en:"Royal Suite"},price:130000,available:true},{name:{zh:"頂層套房",en:"Penthouse"},price:450000,available:false}],
    reviews:[{name:"Charlotte H.",rating:5,date:"2025-11",text:{zh:"英式優雅的極致體現，服務令人動容。",en:"The ultimate in British elegance, service is deeply moving."},avatar:"CH"},{name:"Oliver T.",rating:5,date:"2025-09",text:{zh:"泰晤士河景觀搭配下午茶，完美體驗。",en:"Thames views with afternoon tea — a perfect experience."},avatar:"OT"}],
    nearby:[{zh:"泰晤士河 (0.1 km)",en:"River Thames (0.1 km)"},{zh:"特拉法加廣場 (0.5 km)",en:"Trafalgar Square (0.5 km)"}]
  },
  {
    id:11, name:{zh:"馬爾地夫索尼娃芙西島",en:"Soneva Fushi Maldives"}, city:{zh:"馬爾地夫",en:"Maldives"}, cityKey:"maldives",
    stars:5, rating:4.9, reviewCount:1876, pricePerNight:120000, distanceKm:0.0, lat:5.1130, lng:73.0331,
    images:["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80","https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800&q=80"],
    amenities:[0,1,2,3,8,9],
    description:{zh:"坐落印度洋私人珊瑚礁島嶼，水上別墅直接架設於碧藍海水之上。無電視無鞋政策，讓您徹底沉浸於自然奢華之中。",en:"A private coral reef island in the Indian Ocean with water villas directly over turquoise waters. A no-TV, no-shoes policy for pure immersion in natural luxury."},
    rooms:[{name:{zh:"叢林別墅",en:"Jungle Villa"},price:120000,available:true},{name:{zh:"水上別墅",en:"Water Villa"},price:185000,available:true},{name:{zh:"私人島嶼",en:"Private Island"},price:650000,available:false}],
    reviews:[{name:"Priya S.",rating:5,date:"2025-11",text:{zh:"人生中最美好的假期，天堂般的體驗。",en:"The most beautiful holiday of my life — paradise."},avatar:"PS"},{name:"Lucas M.",rating:5,date:"2025-10",text:{zh:"水上別墅的日出讓人永生難忘。",en:"Sunrise from the water villa — unforgettable forever."},avatar:"LM"}],
    nearby:[{zh:"珊瑚礁潛水 (0.1 km)",en:"Coral Reef Diving (0.1 km)"},{zh:"私人沙灘 (0.0 km)",en:"Private Beach (0.0 km)"}]
  },
  {
    id:12, name:{zh:"羅馬文藝復興酒店",en:"Hotel Eden Rome"}, city:{zh:"羅馬",en:"Rome"}, cityKey:"rome",
    stars:5, rating:4.8, reviewCount:2103, pricePerNight:42000, distanceKm:0.8, lat:41.9028, lng:12.4964,
    images:["https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80","https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80","https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80"],
    amenities:[0,1,2,3,6],
    description:{zh:"俯瞰羅馬全景的頂級酒店，自1889年起接待教宗與各國元首。屋頂餐廳提供永恆之城無與倫比的全景景觀。",en:"Overlooking all of Rome since 1889, hosting popes and heads of state. The rooftop restaurant offers incomparable views of the Eternal City."},
    rooms:[{name:{zh:"羅馬景觀套房",en:"Rome View Suite"},price:42000,available:true},{name:{zh:"頂層套房",en:"Penthouse Suite"},price:95000,available:true},{name:{zh:"皇家套房",en:"Royal Suite"},price:220000,available:false}],
    reviews:[{name:"Giulia R.",rating:5,date:"2025-11",text:{zh:"屋頂日落景觀讓人屏息，值得每一分錢。",en:"Rooftop sunset views are breathtaking — worth every cent."},avatar:"GR"},{name:"Marco F.",rating:5,date:"2025-10",text:{zh:"羅馬最優雅的住宿，歷史與奢華並存。",en:"Rome's most elegant stay — history and luxury coexist."},avatar:"MF"}],
    nearby:[{zh:"西班牙廣場 (0.3 km)",en:"Spanish Steps (0.3 km)"},{zh:"特雷維噴泉 (0.8 km)",en:"Trevi Fountain (0.8 km)"}]
  },
  {
    id:13, name:{zh:"上海半島酒店",en:"The Peninsula Shanghai"}, city:{zh:"上海",en:"Shanghai"}, cityKey:"shanghai",
    stars:5, rating:4.8, reviewCount:2756, pricePerNight:28000, distanceKm:0.3, lat:31.2340, lng:121.4880,
    images:["https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800&q=80","https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80","https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=800&q=80"],
    amenities:[0,1,2,3,6,7],
    description:{zh:"坐落外灘黃金地段，俯瞰黃浦江與浦東天際線。裝飾藝術風格建築融合現代奢華，是上海最具代表性的頂級酒店。",en:"On the Bund's golden strip overlooking the Huangpu River and Pudong skyline. Art Deco architecture meets modern luxury — Shanghai's most iconic hotel."},
    rooms:[{name:{zh:"外灘景觀套房",en:"Bund View Suite"},price:28000,available:true},{name:{zh:"行政套房",en:"Executive Suite"},price:48000,available:true},{name:{zh:"總統套房",en:"Presidential Suite"},price:128000,available:false}],
    reviews:[{name:"Chen Wei",rating:5,date:"2025-11",text:{zh:"外灘夜景配上頂級服務，完美無缺。",en:"Bund night views with top service — absolutely perfect."},avatar:"CW"},{name:"Amy L.",rating:4,date:"2025-10",text:{zh:"建築本身就是藝術，住宿體驗一流。",en:"The building itself is art, and the stay is first-class."},avatar:"AL"}],
    nearby:[{zh:"外灘 (0.1 km)",en:"The Bund (0.1 km)"},{zh:"南京路 (0.5 km)",en:"Nanjing Road (0.5 km)"}]
  },
  {
    id:14, name:{zh:"雪梨港灣四季酒店",en:"Four Seasons Sydney"}, city:{zh:"雪梨",en:"Sydney"}, cityKey:"sydney",
    stars:5, rating:4.7, reviewCount:2340, pricePerNight:35000, distanceKm:0.4, lat:-33.8688, lng:151.2093,
    images:["https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=800&q=80","https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"],
    amenities:[0,1,2,3,4,7],
    description:{zh:"俯瞰雪梨歌劇院與港灣大橋的絕佳位置。每間套房均提供澳洲最著名地標的壯麗景觀，搭配世界級的服務體驗。",en:"Overlooking the Sydney Opera House and Harbour Bridge. Every suite offers views of Australia's most famous landmarks with world-class service."},
    rooms:[{name:{zh:"港灣景觀套房",en:"Harbour View Suite"},price:35000,available:true},{name:{zh:"歌劇院套房",en:"Opera Suite"},price:68000,available:true},{name:{zh:"頂層套房",en:"Penthouse"},price:180000,available:false}],
    reviews:[{name:"Sophie A.",rating:5,date:"2025-11",text:{zh:"歌劇院景觀配上早餐，此生難忘！",en:"Opera House views at breakfast — unforgettable!"},avatar:"SA"},{name:"Liam B.",rating:5,date:"2025-10",text:{zh:"雪梨最美的住宿體驗，強烈推薦。",en:"Sydney's most beautiful stay, strongly recommended."},avatar:"LB"}],
    nearby:[{zh:"雪梨歌劇院 (0.3 km)",en:"Sydney Opera House (0.3 km)"},{zh:"岩石區 (0.5 km)",en:"The Rocks (0.5 km)"}]
  },
  {
    id:15, name:{zh:"阿曼首都美憬閣",en:"Aman Tokyo"}, city:{zh:"東京",en:"Tokyo"}, cityKey:"tokyo",
    stars:5, rating:5.0, reviewCount:987, pricePerNight:55000, distanceKm:0.5, lat:35.6895, lng:139.6917,
    images:["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80","https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80"],
    amenities:[0,1,2,3,6],
    description:{zh:"坐落大手町森大廈33樓，俯瞰皇居與富士山的絕景。融合日本禪意美學與現代奢華，套房面積均超過100平方公尺，起跳價每晚NT$55,000。",en:"On the 33rd floor of Otemachi Tower with views of the Imperial Palace and Mt. Fuji. Japanese Zen aesthetics meet modern luxury. All suites exceed 100 sqm from NT$55,000/night."},
    rooms:[{name:{zh:"禪意套房",en:"Zen Suite"},price:55000,available:true},{name:{zh:"皇居景觀套房",en:"Palace View Suite"},price:90000,available:true},{name:{zh:"富士山頂層套房",en:"Fuji Penthouse"},price:250000,available:false}],
    reviews:[{name:"Yuki T.",rating:5,date:"2025-11",text:{zh:"東京最極致的住宿，禪意與奢華的完美平衡。",en:"Tokyo's ultimate stay — perfect balance of Zen and luxury."},avatar:"YT"},{name:"Anna K.",rating:5,date:"2025-10",text:{zh:"富士山景觀配上日式Spa，人生最美體驗。",en:"Mt. Fuji views with Japanese Spa — life's most beautiful experience."},avatar:"AK"}],
    nearby:[{zh:"皇居 (0.3 km)",en:"Imperial Palace (0.3 km)"},{zh:"大手町商業區 (0.1 km)",en:"Otemachi Business District (0.1 km)"}]
  },
];

const CITIES = [
  {zh:"全部城市",en:"All Cities",key:"all"},
  {zh:"台北",en:"Taipei",key:"taipei"},
  {zh:"東京",en:"Tokyo",key:"tokyo"},
  {zh:"香港",en:"Hong Kong",key:"hongkong"},
  {zh:"首爾",en:"Seoul",key:"seoul"},
  {zh:"新加坡",en:"Singapore",key:"singapore"},
  {zh:"曼谷",en:"Bangkok",key:"bangkok"},
  {zh:"杜拜",en:"Dubai",key:"dubai"},
  {zh:"巴黎",en:"Paris",key:"paris"},
  {zh:"紐約",en:"New York",key:"newyork"},
  {zh:"倫敦",en:"London",key:"london"},
  {zh:"馬爾地夫",en:"Maldives",key:"maldives"},
  {zh:"羅馬",en:"Rome",key:"rome"},
  {zh:"上海",en:"Shanghai",key:"shanghai"},
  {zh:"雪梨",en:"Sydney",key:"sydney"},
];

const NOTIFS_DATA = [
  {type:"confirm",icon:"✓",color:"#0a7c5c",bg:"#e1f5ee",titleZh:"預訂確認",titleEn:"Booking Confirmed",msgZh:"您的台北君悅套房已確認預訂，入住日期：12/20",msgEn:"Grand Hyatt Taipei suite confirmed. Check-in: Dec 20",time:"2分鐘前"},
  {type:"price",icon:"↓",color:"#854F0B",bg:"#FAEEDA",titleZh:"價格提醒",titleEn:"Price Alert",msgZh:"帆船酒店今日降價 10%，限時優惠！",msgEn:"Burj Al Arab dropped 10% today — limited time!",time:"1小時前"},
  {type:"offer",icon:"★",color:"#533AB7",bg:"#EEEDFE",titleZh:"限時優惠",titleEn:"Special Offer",msgZh:"提前 30 天預訂，享 20% 早鳥折扣",msgEn:"Book 30 days ahead for 20% early-bird discount",time:"3小時前"},
  {type:"price",icon:"↓",color:"#854F0B",bg:"#FAEEDA",titleZh:"價格提醒",titleEn:"Price Alert",msgZh:"馬爾地夫索尼娃水上別墅周末特惠",msgEn:"Soneva Fushi Maldives weekend special offer",time:"昨天"},
  {type:"offer",icon:"★",color:"#533AB7",bg:"#EEEDFE",titleZh:"會員專屬優惠",titleEn:"Member Exclusive",msgZh:"黃金會員可享免費升等至行政套房",msgEn:"Gold members get a free upgrade to Executive Suite",time:"2天前"},
];

// 世界地圖 SVG 投影
function WorldMap({ hotels, onSelect, selected, lang }) {
  const gold = "#B8913A";
  const deepNavy = "#0D1B2A";

  // 簡易 Mercator 投影 (lng -> x, lat -> y)
  const project = (lat, lng) => {
    const x = ((lng + 180) / 360) * 100;
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = (0.5 - mercN / (2 * Math.PI)) * 100;
    return { x, y };
  };

  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#1a3a5c" }}>
      {/* 世界地圖背景 SVG */}
      <svg viewBox="0 0 100 55" style={{ width: "100%", display: "block" }}>
        <rect width="100" height="55" fill="#1a3a5c" />
        {/* 海洋網格 */}
        {[10,20,30,40,50,60,70,80,90].map(x => <line key={x} x1={x} y1="0" x2={x} y2="55" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2"/>)}
        {[10,20,30,40,50].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.2"/>)}
        {/* 大陸輪廓（簡化多邊形） */}
        {/* 北美洲 */}
        <polygon points="8,8 22,8 24,15 20,18 18,25 14,28 10,26 7,20 8,8" fill="#2d5a3d" opacity="0.8"/>
        {/* 南美洲 */}
        <polygon points="18,28 24,28 26,35 24,45 20,48 17,44 16,36 18,28" fill="#2d5a3d" opacity="0.8"/>
        {/* 歐洲 */}
        <polygon points="42,8 52,8 54,14 50,16 48,14 44,15 42,12 42,8" fill="#2d5a3d" opacity="0.8"/>
        {/* 非洲 */}
        <polygon points="44,16 54,16 56,22 55,32 52,40 48,42 44,38 42,30 42,22 44,16" fill="#2d5a3d" opacity="0.8"/>
        {/* 亞洲 */}
        <polygon points="54,8 85,8 88,14 86,20 80,22 75,20 70,22 65,20 60,22 55,18 54,12 54,8" fill="#2d5a3d" opacity="0.8"/>
        {/* 中東 */}
        <polygon points="54,16 62,16 64,22 60,24 55,22 54,18 54,16" fill="#2d5a3d" opacity="0.8"/>
        {/* 東南亞 */}
        <polygon points="72,22 80,22 82,28 78,30 74,28 72,26 72,22" fill="#2d5a3d" opacity="0.8"/>
        {/* 澳洲 */}
        <polygon points="75,33 88,33 90,40 86,44 78,44 74,40 74,36 75,33" fill="#2d5a3d" opacity="0.8"/>
        {/* 日本 */}
        <ellipse cx="84" cy="17" rx="1.5" ry="3" fill="#2d5a3d" opacity="0.8"/>
        {/* 馬達加斯加 */}
        <ellipse cx="57" cy="36" rx="1" ry="2.5" fill="#2d5a3d" opacity="0.8"/>
        {/* 英國 */}
        <ellipse cx="44" cy="10" rx="1" ry="1.5" fill="#2d5a3d" opacity="0.8"/>
        {/* 斯里蘭卡/馬爾地夫 */}
        <circle cx="70" cy="28" r="0.5" fill="#2d5a3d" opacity="0.8"/>

        {/* 飯店標記 */}
        {hotels.map(h => {
          const {x, y} = project(h.lat, h.lng);
          const isSelected = selected?.id === h.id;
          return (
            <g key={h.id} style={{cursor:"pointer"}} onClick={() => onSelect(h)}>
              <circle cx={x} cy={y} r={isSelected ? 1.8 : 1.2} fill={isSelected ? gold : "#FF6B6B"} opacity="0.9"/>
              <circle cx={x} cy={y} r={isSelected ? 2.8 : 2} fill="none" stroke={isSelected ? gold : "#FF6B6B"} strokeWidth="0.3" opacity="0.5"/>
              {isSelected && (
                <text x={x} y={y - 2.5} textAnchor="middle" fontSize="2" fill={gold} fontWeight="bold">
                  {h.name[lang].slice(0, 8)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("zh");
  const [tab, setTab] = useState("explore");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [filters, setFilters] = useState({city:"all",stars:"all",maxPrice:1000000,maxDist:5,amenities:[]});
  const [sortIdx, setSortIdx] = useState(0);
  const [searchCity, setSearchCity] = useState("all");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [mapHotel, setMapHotel] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const t = LANG[lang];

  const gold = "#B8913A";
  const deepNavy = "#0D1B2A";
  const cream = "#FAF7F2";

  const showToast = (msg, isError = false) => {
    setToast({msg, isError});
    setTimeout(() => setToast(null), 3000);
  };

  const handleBook = (hotel, room) => {
    const key = `${hotel.id}-${room.name.en}`;
    if (bookings.find(b => b.key === key)) { showToast(t.duplicateMsg, true); return; }
    if (!room.available) return;
    setBookings(prev => [...prev, {key, hotel, room, checkIn, checkOut, guests}]);
    showToast(t.confirmMsg);
  };

  const toggleFav = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const filtered = HOTELS.filter(h => {
    if (filters.city !== "all" && h.cityKey !== filters.city) return false;
    if (searchCity !== "all" && h.cityKey !== searchCity) return false;
    if (filters.stars !== "all" && h.stars !== parseInt(filters.stars)) return false;
    if (h.pricePerNight > filters.maxPrice) return false;
    if (h.distanceKm > filters.maxDist) return false;
    if (filters.amenities.length > 0 && !filters.amenities.every(a => h.amenities.includes(a))) return false;
    return true;
  }).sort((a, b) => {
    if (sortIdx === 1) return a.pricePerNight - b.pricePerNight;
    if (sortIdx === 2) return b.rating - a.rating;
    return b.reviewCount - a.reviewCount;
  });

  const nightCount = () => {
    if (!checkIn || !checkOut) return 1;
    const d = (new Date(checkOut) - new Date(checkIn)) / 86400000;
    return d > 0 ? d : 1;
  };

  useEffect(() => { if (selectedHotel) setImgIdx(0); }, [selectedHotel]);

  const styles = {
    app: {fontFamily:"'Playfair Display','Noto Serif TC',Georgia,serif",background:cream,minHeight:"100vh",color:deepNavy,maxWidth:430,margin:"0 auto",position:"relative",paddingBottom:80},
    header: {background:deepNavy,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:56,position:"sticky",top:0,zIndex:100},
    appName: {color:gold,fontSize:22,fontWeight:700,letterSpacing:2},
    langBtn: {background:"transparent",border:`1px solid ${gold}`,color:gold,borderRadius:20,padding:"3px 12px",fontSize:12,cursor:"pointer",fontFamily:"inherit"},
    searchBar: {background:deepNavy,padding:"0 20px 20px",display:"flex",flexDirection:"column",gap:10},
    searchInput: {background:"rgba(255,255,255,0.1)",border:`1px solid rgba(184,145,58,0.4)`,borderRadius:10,padding:"10px 12px",color:"#fff",fontSize:13,fontFamily:"inherit",width:"100%",boxSizing:"border-box"},
    searchBtn: {background:gold,border:"none",borderRadius:10,padding:"12px 0",color:deepNavy,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",width:"100%"},
    filterBar: {display:"flex",gap:8,padding:"14px 20px",overflowX:"auto",borderBottom:`1px solid rgba(13,27,42,0.08)`},
    chip: (active) => ({background:active?deepNavy:"#fff",color:active?gold:deepNavy,border:`1px solid ${active?deepNavy:"rgba(13,27,42,0.15)"}`,borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"}),
    hotelCard: {background:"#fff",borderRadius:16,margin:"0 16px 16px",overflow:"hidden",boxShadow:"0 2px 20px rgba(13,27,42,0.08)",cursor:"pointer"},
    hotelImg: {width:"100%",height:200,objectFit:"cover",display:"block"},
    cardBody: {padding:"14px 16px 16px"},
    hotelName: {fontSize:16,fontWeight:700,color:deepNavy,marginBottom:4},
    stars: {color:gold,fontSize:13,marginBottom:6},
    price: {fontSize:20,fontWeight:700,color:gold},
    priceLabel: {fontSize:12,color:"#888",fontFamily:"sans-serif"},
    rating: {background:deepNavy,color:gold,borderRadius:8,padding:"4px 10px",fontSize:13,fontWeight:700,fontFamily:"sans-serif"},
    favBtn: (active) => ({background:"none",border:"none",cursor:"pointer",fontSize:20,color:active?gold:"#ccc",position:"absolute",top:12,right:12,textShadow:"0 1px 4px rgba(0,0,0,0.3)"}),
    detailImg: {width:"100%",height:260,objectFit:"cover",display:"block"},
    detailBody: {padding:"0 20px 20px"},
    sectionTitle: {fontSize:16,fontWeight:700,color:deepNavy,margin:"18px 0 10px",borderBottom:`2px solid ${gold}`,paddingBottom:6,display:"inline-block"},
    roomCard: (avail) => ({background:avail?"#fff":"#f5f5f5",border:`1px solid ${avail?gold:"#ddd"}`,borderRadius:12,padding:"12px 14px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}),
    bookBtn: (avail) => ({background:avail?gold:"#ccc",color:avail?deepNavy:"#999",border:"none",borderRadius:8,padding:"8px 18px",fontSize:13,fontWeight:700,cursor:avail?"pointer":"default",fontFamily:"inherit"}),
    reviewCard: {background:"#fff",borderRadius:12,padding:"14px 16px",marginBottom:10,boxShadow:"0 1px 8px rgba(13,27,42,0.06)"},
    avatar: {width:36,height:36,borderRadius:18,background:deepNavy,color:gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,flexShrink:0},
    navbar: {position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:deepNavy,display:"flex",borderTop:`1px solid rgba(184,145,58,0.2)`,zIndex:200},
    navItem: (active) => ({flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 0 8px",cursor:"pointer",color:active?gold:"rgba(255,255,255,0.4)",fontSize:10,fontFamily:"sans-serif",gap:3}),
    toast: (err) => ({position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:err?"#C0392B":"#0a7c5c",color:"#fff",padding:"12px 24px",borderRadius:12,fontSize:14,fontFamily:"sans-serif",zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,0.3)",maxWidth:360,textAlign:"center"}),
    filterPanel: {background:"#fff",borderRadius:16,margin:"0 16px 16px",padding:"16px 20px",boxShadow:"0 2px 20px rgba(13,27,42,0.1)"},
    notifCard: (bg) => ({background:bg,borderRadius:12,padding:"14px 16px",marginBottom:10,display:"flex",gap:12,alignItems:"flex-start"}),
    notifIcon: (color) => ({width:36,height:36,borderRadius:18,background:color,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,flexShrink:0}),
    amenityPill: {background:"#f0ece4",borderRadius:20,padding:"4px 12px",fontSize:12,fontFamily:"sans-serif",color:deepNavy,display:"inline-block"},
    backBtn: {background:"none",border:"none",color:gold,fontSize:14,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,padding:"14px 20px 0"},
  };

  const renderStars = (n) => "★".repeat(n) + "☆".repeat(5-n);

  // 飯店詳情頁
  if (selectedHotel) {
    const h = selectedHotel;
    const nights = nightCount();
    return (
      <div style={styles.app}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');*{margin:0;padding:0;box-sizing:border-box;}`}</style>
        <div style={{position:"relative"}}>
          <img src={h.images[imgIdx]} alt="" style={styles.detailImg}/>
          <div style={{position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",display:"flex",gap:6}}>
            {h.images.map((_,i) => <div key={i} onClick={() => setImgIdx(i)} style={{width:i===imgIdx?20:8,height:8,borderRadius:4,background:i===imgIdx?gold:"rgba(255,255,255,0.6)",cursor:"pointer",transition:"width 0.3s"}}/>)}
          </div>
          <button style={{...styles.backBtn,position:"absolute",top:12,left:0,background:"rgba(13,27,42,0.6)",borderRadius:"0 8px 8px 0",color:gold}} onClick={() => setSelectedHotel(null)}>← {t.back}</button>
          <button style={{position:"absolute",top:12,right:12,background:"none",border:"none",cursor:"pointer",fontSize:24,color:favorites.includes(h.id)?gold:"rgba(255,255,255,0.7)"}} onClick={() => toggleFav(h.id)}>♥</button>
        </div>
        <div style={styles.detailBody}>
          <h1 style={{fontSize:22,fontWeight:700,marginTop:16,color:deepNavy}}>{h.name[lang]}</h1>
          <div style={{color:gold,fontSize:14,margin:"4px 0 8px"}}>{renderStars(h.stars)}</div>
          <div style={{display:"flex",gap:10,alignItems:"center",fontFamily:"sans-serif",fontSize:13,color:"#666"}}>
            <span style={{background:deepNavy,color:gold,padding:"3px 10px",borderRadius:8,fontWeight:700}}>{h.rating}</span>
            <span>{h.reviewCount.toLocaleString()} {t.reviews}</span>
            <span>· {h.city[lang]} · {h.distanceKm} {t.km}</span>
          </div>
          <div style={{marginTop:18}}>
            <div style={styles.sectionTitle}>{t.description}</div>
            <p style={{fontSize:14,lineHeight:1.7,color:"#555",fontFamily:"sans-serif",marginTop:8}}>{h.description[lang]}</p>
          </div>
          <div style={{marginTop:16}}>
            <div style={styles.sectionTitle}>{t.amenities}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:10}}>
              {h.amenities.map(a => <span key={a} style={styles.amenityPill}>{t.amenityList[a]}</span>)}
            </div>
          </div>
          <div style={{marginTop:16}}>
            <div style={styles.sectionTitle}>{t.roomTypes}</div>
            {h.rooms.map((room,i) => {
              const booked = bookings.find(b => b.key === `${h.id}-${room.name.en}`);
              return (
                <div key={i} style={styles.roomCard(room.available)}>
                  <div>
                    <div style={{fontSize:15,fontWeight:700,color:deepNavy}}>{room.name[lang]}</div>
                    <div style={{fontSize:13,color:room.available?"#0a7c5c":"#999",fontFamily:"sans-serif"}}>{room.available?t.available:t.unavailable}</div>
                    <div style={{fontSize:16,fontWeight:700,color:gold,marginTop:4}}>NT${room.price.toLocaleString()} <span style={{fontSize:12,color:"#888",fontWeight:400}}>{t.perNight}</span></div>
                    {checkIn&&checkOut&&<div style={{fontSize:12,color:"#888",fontFamily:"sans-serif"}}>{t.total}: NT${(room.price*nights).toLocaleString()} ({nights} {t.nights})</div>}
                  </div>
                  <button style={styles.bookBtn(room.available&&!booked)} onClick={() => handleBook(h,room)}>{booked?"✓":t.bookNow}</button>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:16}}>
            <div style={styles.sectionTitle}>{t.nearby}</div>
            <div style={{background:"#e8e0d5",borderRadius:12,padding:16,marginTop:10,fontFamily:"sans-serif"}}>
              <div style={{fontSize:12,color:"#888",marginBottom:8}}>📍 {h.city[lang]}</div>
              {h.nearby.map((n,i) => <div key={i} style={{fontSize:13,color:deepNavy,padding:"4px 0",borderBottom:i<h.nearby.length-1?"1px dashed #ccc":"none"}}>📌 {n[lang]}</div>)}
            </div>
          </div>
          <div style={{marginTop:16}}>
            <div style={styles.sectionTitle}>{t.guestReviews}</div>
            {h.reviews.map((r,i) => (
              <div key={i} style={styles.reviewCard}>
                <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
                  <div style={styles.avatar}>{r.avatar}</div>
                  <div><div style={{fontSize:14,fontWeight:700}}>{r.name}</div><div style={{color:gold,fontSize:12}}>{"★".repeat(r.rating)}</div></div>
                  <div style={{marginLeft:"auto",fontSize:12,color:"#999",fontFamily:"sans-serif"}}>{r.date}</div>
                </div>
                <p style={{fontSize:13,color:"#555",lineHeight:1.6,fontFamily:"sans-serif"}}>{r.text[lang]}</p>
              </div>
            ))}
          </div>
        </div>
        {toast && <div style={styles.toast(toast.isError)}>{toast.msg}</div>}
        <div style={styles.navbar}>
          {["explore","map","saved","notifications","account"].map((tb,i) => (
            <div key={tb} style={styles.navItem(tab===tb)} onClick={() => {setSelectedHotel(null);setTab(tb);}}>
              <span style={{fontSize:20}}>{["🏨","🗺","♥","🔔","👤"][i]}</span>
              <span>{t.nav[i]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');*{margin:0;padding:0;box-sizing:border-box;}input[type=range]{width:100%;accent-color:${gold};}select{appearance:none;}`}</style>
      <div style={styles.header}>
        <div style={styles.appName}>{t.appName}</div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:11,fontFamily:"sans-serif"}}>{t.tagline}</div>
          <button style={styles.langBtn} onClick={() => setLang(l => l==="zh"?"en":"zh")}>{lang==="zh"?"EN":"中文"}</button>
        </div>
      </div>

      {(tab==="explore"||tab==="map") && (
        <div style={styles.searchBar}>
          <select value={searchCity} onChange={e => setSearchCity(e.target.value)} style={{...styles.searchInput,fontSize:14}}>
            {CITIES.map(c => <option key={c.key} value={c.key}>{c[lang]}</option>)}
          </select>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} style={styles.searchInput}/>
            <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} style={styles.searchInput}/>
            <select value={guests} onChange={e => setGuests(e.target.value)} style={styles.searchInput}>
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}人</option>)}
            </select>
          </div>
          <button style={styles.searchBtn}>{t.search}</button>
        </div>
      )}

      {tab==="explore" && (
        <>
          <div style={styles.filterBar}>
            <button style={styles.chip(showFilters)} onClick={() => setShowFilters(s=>!s)}>⚙ {t.filters}</button>
            {t.sortOptions.map((s,i) => <button key={i} style={styles.chip(sortIdx===i)} onClick={() => setSortIdx(i)}>{s}</button>)}
            <button style={styles.chip(false)} onClick={() => setTab("map")}>🗺 {t.worldMap}</button>
          </div>
          {showFilters && (
            <div style={styles.filterPanel}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{t.filters}</div>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:12,color:"#888",fontFamily:"sans-serif",marginBottom:6}}>{t.priceRange}: NT${filters.maxPrice.toLocaleString()}</div>
                <input type="range" min={10000} max={1000000} step={10000} value={filters.maxPrice} onChange={e => setFilters(f=>({...f,maxPrice:+e.target.value}))}/>
              </div>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:12,color:"#888",fontFamily:"sans-serif",marginBottom:6}}>{t.distance}: {filters.maxDist} {t.km}</div>
                <input type="range" min={0.5} max={5} step={0.5} value={filters.maxDist} onChange={e => setFilters(f=>({...f,maxDist:+e.target.value}))}/>
              </div>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:12,color:"#888",fontFamily:"sans-serif",marginBottom:6}}>{t.starRating}</div>
                <div style={{display:"flex",gap:8}}>
                  {[t.allStars,"5","4"].map(s => <button key={s} style={styles.chip(filters.stars===s||(s===t.allStars&&filters.stars==="all"))} onClick={() => setFilters(f=>({...f,stars:s===t.allStars?"all":s}))}>{s===t.allStars?s:"★".repeat(+s)}</button>)}
                </div>
              </div>
              <div>
                <div style={{fontSize:12,color:"#888",fontFamily:"sans-serif",marginBottom:6}}>{t.amenities}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {t.amenityList.map((a,i) => <button key={i} style={styles.chip(filters.amenities.includes(i))} onClick={() => setFilters(f=>({...f,amenities:f.amenities.includes(i)?f.amenities.filter(x=>x!==i):[...f.amenities,i]}))}>{a}</button>)}
                </div>
              </div>
              <div style={{display:"flex",gap:8,marginTop:14}}>
                <button style={{...styles.searchBtn,flex:1,borderRadius:8,padding:"10px 0"}} onClick={() => setShowFilters(false)}>{t.apply}</button>
                <button style={{flex:1,background:"none",border:`1px solid ${deepNavy}`,borderRadius:8,padding:"10px 0",cursor:"pointer",fontFamily:"inherit",fontSize:14}} onClick={() => {setFilters({city:"all",stars:"all",maxPrice:1000000,maxDist:5,amenities:[]});setShowFilters(false);}}>{t.clear}</button>
              </div>
            </div>
          )}
          <div style={{padding:"14px 0 0"}}>
            <div style={{padding:"0 16px",marginBottom:12,fontSize:13,color:"#888",fontFamily:"sans-serif"}}>{filtered.length} {lang==="zh"?"間飯店":"hotels found"}</div>
            {filtered.length===0 && <div style={{textAlign:"center",padding:40,color:"#999",fontFamily:"sans-serif",fontSize:14}}>No results found</div>}
            {filtered.map(h => (
              <div key={h.id} style={styles.hotelCard} onClick={() => setSelectedHotel(h)}>
                <div style={{position:"relative"}}>
                  <img src={h.images[0]} alt={h.name[lang]} style={styles.hotelImg}/>
                  <button style={styles.favBtn(favorites.includes(h.id))} onClick={e => {e.stopPropagation();toggleFav(h.id);}}>♥</button>
                  <div style={{position:"absolute",bottom:10,left:14,background:"rgba(13,27,42,0.75)",color:"#fff",borderRadius:8,padding:"3px 10px",fontSize:12,fontFamily:"sans-serif"}}>
                    {h.city[lang]} · {h.distanceKm} km
                  </div>
                </div>
                <div style={styles.cardBody}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={styles.hotelName}>{h.name[lang]}</div>
                    <div style={styles.rating}>{h.rating}</div>
                  </div>
                  <div style={styles.stars}>{renderStars(h.stars)}</div>
                  <div style={{fontSize:12,color:"#999",fontFamily:"sans-serif",marginBottom:10}}>{h.reviewCount.toLocaleString()} {t.reviews}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                    {h.amenities.slice(0,3).map(a => <span key={a} style={styles.amenityPill}>{t.amenityList[a]}</span>)}
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={styles.price}>NT${h.pricePerNight.toLocaleString()}</div>
                      <div style={styles.priceLabel}>{t.perNight}</div>
                    </div>
                    <button style={styles.bookBtn(true)} onClick={e => {e.stopPropagation();setSelectedHotel(h);}}>{t.viewDetails}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab==="map" && (
        <div style={{padding:"14px 16px 0"}}>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:deepNavy,marginBottom:8}}>🌍 {t.worldMap} · {filtered.length} {lang==="zh"?"間飯店":"hotels"}</div>
            <WorldMap hotels={filtered} onSelect={h => setMapHotel(mapHotel?.id===h.id?null:h)} selected={mapHotel} lang={lang}/>
          </div>
          {mapHotel && (
            <div style={{background:"#fff",borderRadius:12,padding:"12px 14px",marginBottom:12,display:"flex",gap:12,alignItems:"center",cursor:"pointer",boxShadow:"0 2px 12px rgba(13,27,42,0.1)"}} onClick={() => setSelectedHotel(mapHotel)}>
              <img src={mapHotel.images[0]} style={{width:64,height:64,borderRadius:10,objectFit:"cover"}} alt=""/>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700}}>{mapHotel.name[lang]}</div>
                <div style={{color:gold,fontSize:12}}>{renderStars(mapHotel.stars)}</div>
                <div style={{fontSize:13,color:gold,fontWeight:700}}>NT${mapHotel.pricePerNight.toLocaleString()} {t.perNight}</div>
              </div>
              <div style={{color:gold,fontSize:20}}>›</div>
            </div>
          )}
          <div style={{marginTop:8}}>
            {filtered.map(h => (
              <div key={h.id} style={{...styles.hotelCard,margin:"0 0 12px",cursor:"pointer"}} onClick={() => setSelectedHotel(h)}>
                <div style={{display:"flex",gap:12,padding:14,alignItems:"center"}}>
                  <img src={h.images[0]} style={{width:70,height:70,borderRadius:10,objectFit:"cover",flexShrink:0}} alt=""/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:700}}>{h.name[lang]}</div>
                    <div style={{color:gold,fontSize:12}}>{renderStars(h.stars)}</div>
                    <div style={{fontSize:12,color:"#999",fontFamily:"sans-serif"}}>{h.city[lang]} · {h.distanceKm} km</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:15,fontWeight:700,color:gold}}>NT${h.pricePerNight.toLocaleString()}</div>
                    <div style={{fontSize:11,color:"#999",fontFamily:"sans-serif"}}>{t.perNight}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="saved" && (
        <div style={{padding:"20px 16px"}}>
          <h2 style={{fontSize:20,fontWeight:700,marginBottom:16,color:deepNavy}}>{t.yourBookings}</h2>
          {bookings.length===0 && <div style={{color:"#999",fontFamily:"sans-serif",fontSize:14,textAlign:"center",padding:30}}>{t.noBookings}</div>}
          {bookings.map((b,i) => (
            <div key={i} style={{...styles.hotelCard,margin:"0 0 14px"}} onClick={() => setSelectedHotel(b.hotel)}>
              <div style={{display:"flex",gap:12,padding:14}}>
                <img src={b.hotel.images[0]} style={{width:70,height:70,borderRadius:10,objectFit:"cover",flexShrink:0}} alt=""/>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700}}>{b.hotel.name[lang]}</div>
                  <div style={{fontSize:13,color:"#666",fontFamily:"sans-serif"}}>{b.room.name[lang]}</div>
                  {b.checkIn&&<div style={{fontSize:12,color:"#999",fontFamily:"sans-serif"}}>{b.checkIn} → {b.checkOut}</div>}
                  <div style={{fontSize:12,background:"#e1f5ee",color:"#0a7c5c",display:"inline-block",borderRadius:6,padding:"2px 8px",marginTop:4,fontFamily:"sans-serif"}}>✓ Confirmed</div>
                </div>
              </div>
            </div>
          ))}
          <h2 style={{fontSize:20,fontWeight:700,margin:"24px 0 16px",color:deepNavy}}>❤ {t.markFav}</h2>
          {HOTELS.filter(h=>favorites.includes(h.id)).map(h => (
            <div key={h.id} style={{...styles.hotelCard,margin:"0 0 12px"}} onClick={() => setSelectedHotel(h)}>
              <div style={{display:"flex",gap:12,padding:14,alignItems:"center"}}>
                <img src={h.images[0]} style={{width:60,height:60,borderRadius:8,objectFit:"cover"}} alt=""/>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700}}>{h.name[lang]}</div>
                  <div style={{color:gold,fontSize:12}}>{renderStars(h.stars)}</div>
                  <div style={{fontSize:13,fontWeight:700,color:gold}}>NT${h.pricePerNight.toLocaleString()} {t.perNight}</div>
                </div>
                <button style={{background:"none",border:"none",color:gold,fontSize:22,cursor:"pointer"}} onClick={e => {e.stopPropagation();toggleFav(h.id);}}>♥</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="notifications" && (
        <div style={{padding:"20px 16px"}}>
          <h2 style={{fontSize:20,fontWeight:700,marginBottom:16,color:deepNavy}}>🔔 {t.notifications}</h2>
          {NOTIFS_DATA.map((n,i) => (
            <div key={i} style={styles.notifCard(n.bg)}>
              <div style={styles.notifIcon(n.color)}>{n.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:deepNavy}}>{lang==="zh"?n.titleZh:n.titleEn}</div>
                <div style={{fontSize:13,color:"#555",fontFamily:"sans-serif",lineHeight:1.5,marginTop:3}}>{lang==="zh"?n.msgZh:n.msgEn}</div>
                <div style={{fontSize:11,color:"#999",fontFamily:"sans-serif",marginTop:6}}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="account" && (
        <div style={{padding:"20px 16px"}}>
          <div style={{background:deepNavy,borderRadius:20,padding:"28px 24px",marginBottom:20,textAlign:"center"}}>
            <div style={{width:72,height:72,borderRadius:36,background:gold,margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:700,color:deepNavy}}>VIP</div>
            <div style={{color:"#fff",fontSize:18,fontWeight:700}}>{lang==="zh"?"尊貴會員":"Premium Member"}</div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:13,fontFamily:"sans-serif",marginTop:4}}>Gold Status · 2,580 pts</div>
          </div>
          {[[lang==="zh"?"我的預訂":"My Bookings",bookings.length],[lang==="zh"?"已收藏":"Saved Hotels",favorites.length],[lang==="zh"?"積分":"Points","2,580"]].map(([label,val]) => (
            <div key={label} style={{background:"#fff",borderRadius:12,padding:"16px 20px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:15}}>{label}</span>
              <span style={{fontSize:15,fontWeight:700,color:gold,fontFamily:"sans-serif"}}>{val}</span>
            </div>
          ))}
        </div>
      )}

      {toast && <div style={styles.toast(toast.isError)}>{toast.msg}</div>}
      <div style={styles.navbar}>
        {["explore","map","saved","notifications","account"].map((tb,i) => (
          <div key={tb} style={styles.navItem(tab===tb)} onClick={() => setTab(tb)}>
            <span style={{fontSize:20}}>{["🏨","🗺","♥","🔔","👤"][i]}</span>
            <span>{t.nav[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
