import { useState, useEffect, useRef } from "react";

const LANG = {
  zh: {
    appName: "奢寓",
    tagline: "頂級套房預訂平台",
    search: "搜尋",
    city: "城市",
    checkIn: "入住日期",
    checkOut: "退房日期",
    guests: "人數",
    filters: "篩選條件",
    priceRange: "價格範圍",
    starRating: "星級",
    amenities: "設施",
    distance: "距離市中心",
    perNight: "/ 晚",
    reviews: "評論",
    bookNow: "立即預訂",
    viewMap: "查看地圖",
    nearby: "附近景點",
    guestReviews: "旅客評論",
    roomTypes: "房型",
    description: "飯店介紹",
    notifications: "通知",
    confirmBooking: "預訂確認",
    priceAlert: "價格提醒",
    specialOffer: "優惠通知",
    nav: ["探索", "地圖", "收藏", "通知", "帳戶"],
    amenityList: ["游泳池", "健身房", "Spa", "餐廳", "停車場", "寵物友善", "商務中心", "接送服務"],
    sortBy: "排序",
    sortOptions: ["推薦", "價格低至高", "評分最高"],
    km: "公里",
    confirmMsg: "您的套房已成功預訂！",
    duplicateMsg: "您已預訂此套房，無法重複預訂",
    available: "有空房",
    unavailable: "已額滿",
    yourBookings: "我的預訂",
    noBookings: "尚無預訂記錄",
    apply: "套用",
    clear: "清除",
    nights: "晚",
    total: "總計",
    back: "返回",
    viewDetails: "查看詳情",
    map: "地圖視圖",
    list: "列表視圖",
    km0: "0 km",
    km5: "5 km",
    markFav: "收藏",
    removeFav: "取消收藏",
    allStars: "全部",
    readMore: "閱讀更多",
  },
  en: {
    appName: "LuxSuite",
    tagline: "Premium Suite Booking",
    search: "Search",
    city: "City",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    filters: "Filters",
    priceRange: "Price Range",
    starRating: "Star Rating",
    amenities: "Amenities",
    distance: "Distance to Center",
    perNight: "/ night",
    reviews: "reviews",
    bookNow: "Book Now",
    viewMap: "View Map",
    nearby: "Nearby Attractions",
    guestReviews: "Guest Reviews",
    roomTypes: "Room Types",
    description: "About",
    notifications: "Notifications",
    confirmBooking: "Booking Confirmed",
    priceAlert: "Price Alert",
    specialOffer: "Special Offer",
    nav: ["Explore", "Map", "Saved", "Alerts", "Account"],
    amenityList: ["Pool", "Gym", "Spa", "Restaurant", "Parking", "Pet Friendly", "Business Center", "Airport Shuttle"],
    sortBy: "Sort",
    sortOptions: ["Recommended", "Price: Low to High", "Highest Rated"],
    km: "km",
    confirmMsg: "Your suite has been successfully booked!",
    duplicateMsg: "You already have a booking for this suite.",
    available: "Available",
    unavailable: "Sold Out",
    yourBookings: "My Bookings",
    noBookings: "No bookings yet",
    apply: "Apply",
    clear: "Clear",
    nights: "nights",
    total: "Total",
    back: "Back",
    viewDetails: "View Details",
    map: "Map View",
    list: "List View",
    km0: "0 km",
    km5: "5 km",
    markFav: "Save",
    removeFav: "Unsave",
    allStars: "All",
    readMore: "Read more",
  }
};

const HOTELS = [
  {
    id: 1,
    name: { zh: "台北君悅大酒店", en: "Grand Hyatt Taipei" },
    city: { zh: "台北", en: "Taipei" },
    cityKey: "taipei",
    stars: 5,
    rating: 4.8,
    reviewCount: 2340,
    pricePerNight: 18500,
    distanceKm: 1.2,
    lat: 25.0408, lng: 121.5654,
    images: [
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    ],
    amenities: [0,1,2,3,4,7],
    description: {
      zh: "台北最具代表性的五星級豪華飯店，坐落於信義商圈核心地帶。每間套房均提供城市全景，配備精緻衛浴與頂級寢具，讓您享受無與倫比的住宿體驗。",
      en: "Taipei's most iconic five-star luxury hotel, located in the heart of Xinyi District. Every suite offers panoramic city views, premium bath amenities, and world-class bedding for an unparalleled experience."
    },
    rooms: [
      { name: { zh: "豪華套房", en: "Deluxe Suite" }, price: 18500, available: true },
      { name: { zh: "行政套房", en: "Executive Suite" }, price: 26000, available: true },
      { name: { zh: "總統套房", en: "Presidential Suite" }, price: 58000, available: false },
    ],
    reviews: [
      { name: "Sophia W.", rating: 5, date: "2025-11", text: { zh: "無可挑剔的服務，早餐豐盛，景觀絕美！", en: "Impeccable service, superb breakfast, stunning views!" }, avatar: "SW" },
      { name: "陳先生", rating: 4, date: "2025-10", text: { zh: "地點極佳，步行可達各大購物中心，很推薦！", en: "Great location, walking distance to malls. Highly recommend!" }, avatar: "陳" },
      { name: "Marco R.", rating: 5, date: "2025-09", text: { zh: "Spa 設施頂級，員工態度親切有禮。", en: "Top-tier spa facilities and wonderfully courteous staff." }, avatar: "MR" },
    ],
    nearby: [
      { zh: "台北 101 (0.5 km)", en: "Taipei 101 (0.5 km)" },
      { zh: "信義商圈 (0.3 km)", en: "Xinyi District (0.3 km)" },
      { zh: "象山步道 (1.8 km)", en: "Elephant Mountain (1.8 km)" },
    ]
  },
  {
    id: 2,
    name: { zh: "東京半島酒店", en: "The Peninsula Tokyo" },
    city: { zh: "東京", en: "Tokyo" },
    cityKey: "tokyo",
    stars: 5,
    rating: 4.9,
    reviewCount: 3102,
    pricePerNight: 32000,
    distanceKm: 0.8,
    lat: 35.6762, lng: 139.7503,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    ],
    amenities: [0,1,2,3,7],
    description: {
      zh: "坐落於日比谷公園旁，俯瞰東京灣的絕佳位置。融合日式精緻美學與西方豪華設施，是東京最受追捧的頂級住宿。",
      en: "Overlooking Hibiya Park and Tokyo Bay, blending Japanese refined aesthetics with Western luxury. The most sought-after premium address in Tokyo."
    },
    rooms: [
      { name: { zh: "都市景觀套房", en: "City View Suite" }, price: 32000, available: true },
      { name: { zh: "灣景套房", en: "Bay View Suite" }, price: 45000, available: true },
      { name: { zh: "皇家套房", en: "Royal Suite" }, price: 120000, available: false },
    ],
    reviews: [
      { name: "Julia K.", rating: 5, date: "2025-11", text: { zh: "堪稱東京最頂級的住宿體驗，每個細節都無可挑剔。", en: "The pinnacle of Tokyo accommodation — every detail is flawless." }, avatar: "JK" },
      { name: "田中さん", rating: 5, date: "2025-10", text: { zh: "日本式的款待精神，讓人倍感溫暖與尊榮。", en: "True Japanese omotenashi hospitality — warm and dignified." }, avatar: "田" },
    ],
    nearby: [
      { zh: "皇居 (1.0 km)", en: "Imperial Palace (1.0 km)" },
      { zh: "銀座 (0.6 km)", en: "Ginza (0.6 km)" },
      { zh: "日比谷公園 (0.1 km)", en: "Hibiya Park (0.1 km)" },
    ]
  },
  {
    id: 3,
    name: { zh: "香港四季酒店", en: "Four Seasons Hong Kong" },
    city: { zh: "香港", en: "Hong Kong" },
    cityKey: "hongkong",
    stars: 5,
    rating: 4.7,
    reviewCount: 1876,
    pricePerNight: 24000,
    distanceKm: 0.5,
    lat: 22.2830, lng: 114.1588,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1592229506151-845940174bb0?w=800&q=80",
    ],
    amenities: [0,1,2,3,4],
    description: {
      zh: "位於中環金融核心，坐擁維多利亞港無敵海景。絢爛的夜景與無微不至的服務，使每次入住都成為難忘的奢華體驗。",
      en: "In the heart of Central with unobstructed Victoria Harbour views. Dazzling nightscapes and meticulous service make every stay an unforgettable luxury experience."
    },
    rooms: [
      { name: { zh: "海港景觀套房", en: "Harbour View Suite" }, price: 24000, available: true },
      { name: { zh: "天際套房", en: "Sky Suite" }, price: 38000, available: true },
      { name: { zh: "頤和套房", en: "Penthouse Suite" }, price: 88000, available: false },
    ],
    reviews: [
      { name: "David L.", rating: 5, date: "2025-11", text: { zh: "從房間欣賞維港夜景是此生最難忘的體驗之一。", en: "Watching the harbour light show from the room is among life's great experiences." }, avatar: "DL" },
      { name: "李小姐", rating: 4, date: "2025-10", text: { zh: "交通便利，毗鄰地鐵站，購物美食一應俱全。", en: "Superb transit access and endless dining and shopping nearby." }, avatar: "李" },
    ],
    nearby: [
      { zh: "中環碼頭 (0.3 km)", en: "Central Pier (0.3 km)" },
      { zh: "蘭桂坊 (0.8 km)", en: "Lan Kwai Fong (0.8 km)" },
      { zh: "Victoria Peak (2.5 km)", en: "Victoria Peak (2.5 km)" },
    ]
  },
  {
    id: 4,
    name: { zh: "首爾新羅飯店", en: "The Shilla Seoul" },
    city: { zh: "首爾", en: "Seoul" },
    cityKey: "seoul",
    stars: 5,
    rating: 4.6,
    reviewCount: 1423,
    pricePerNight: 15000,
    distanceKm: 2.1,
    lat: 37.5516, lng: 126.9982,
    images: [
      "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80",
      "https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    ],
    amenities: [0,1,2,3,5],
    description: {
      zh: "融合韓國傳統美學與現代奢華設計，坐落於南山公園旁。寬敞的套房配備最新智能設施，俯瞰首爾城市全景。",
      en: "Merging Korean traditional aesthetics with modern luxury, nestled beside Namsan Park. Spacious suites with cutting-edge smart technology and panoramic Seoul views."
    },
    rooms: [
      { name: { zh: "首爾景觀套房", en: "Seoul View Suite" }, price: 15000, available: true },
      { name: { zh: "南山套房", en: "Namsan Suite" }, price: 22000, available: true },
      { name: { zh: "總統套房", en: "Presidential Suite" }, price: 65000, available: true },
    ],
    reviews: [
      { name: "Emily C.", rating: 5, date: "2025-11", text: { zh: "早餐選擇豐富，員工英語流利，整體體驗超出預期！", en: "Incredible breakfast spread and very English-friendly staff. Exceeded expectations!" }, avatar: "EC" },
      { name: "박先생", rating: 4, date: "2025-09", text: { zh: "Spa 療程舒適放鬆，設施一流，下次還會再來。", en: "Relaxing spa treatments, first-class facilities. Will return." }, avatar: "박" },
    ],
    nearby: [
      { zh: "南山公園 (0.3 km)", en: "Namsan Park (0.3 km)" },
      { zh: "明洞 (1.5 km)", en: "Myeongdong (1.5 km)" },
      { zh: "N首爾塔 (0.8 km)", en: "N Seoul Tower (0.8 km)" },
    ]
  },
  {
    id: 5,
    name: { zh: "新加坡濱海灣金沙", en: "Marina Bay Sands Singapore" },
    city: { zh: "新加坡", en: "Singapore" },
    cityKey: "singapore",
    stars: 5,
    rating: 4.5,
    reviewCount: 5674,
    pricePerNight: 20000,
    distanceKm: 0.9,
    lat: 1.2834, lng: 103.8607,
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
      "https://images.unsplash.com/photo-1519449556851-5720b33024e7?w=800&q=80",
    ],
    amenities: [0,1,2,3,4,6],
    description: {
      zh: "全球最具辨識度的地標酒店，頂層無邊際泳池俯瞰整個新加坡天際線。融合娛樂、美食與奢華住宿於一體的終極體驗。",
      en: "The world's most iconic hotel with the legendary infinity pool overlooking Singapore's skyline. The ultimate fusion of entertainment, gastronomy, and luxury accommodation."
    },
    rooms: [
      { name: { zh: "豪華套房", en: "Deluxe Suite" }, price: 20000, available: true },
      { name: { zh: "天際套房", en: "Sky Suite" }, price: 35000, available: false },
      { name: { zh: "主席套房", en: "Chairman Suite" }, price: 95000, available: false },
    ],
    reviews: [
      { name: "Aisha M.", rating: 5, date: "2025-11", text: { zh: "無邊際泳池的夜景令人窒息，是必來的人生體驗。", en: "The infinity pool at night is breathtaking — a must on any bucket list." }, avatar: "AM" },
      { name: "Wong J.", rating: 4, date: "2025-10", text: { zh: "賭場和購物中心就在樓下，非常方便。", en: "The casino and mall downstairs add incredible convenience." }, avatar: "WJ" },
    ],
    nearby: [
      { zh: "濱海灣花園 (0.2 km)", en: "Gardens by the Bay (0.2 km)" },
      { zh: "魚尾獅公園 (1.0 km)", en: "Merlion Park (1.0 km)" },
      { zh: "濱海藝術中心 (0.5 km)", en: "Esplanade (0.5 km)" },
    ]
  },
  {
    id: 6,
    name: { zh: "曼谷文華東方", en: "Mandarin Oriental Bangkok" },
    city: { zh: "曼谷", en: "Bangkok" },
    cityKey: "bangkok",
    stars: 5,
    rating: 4.9,
    reviewCount: 2891,
    pricePerNight: 12000,
    distanceKm: 1.5,
    lat: 13.7238, lng: 100.5123,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800&q=80",
    ],
    amenities: [0,1,2,3,7],
    description: {
      zh: "坐落昭披耶河畔逾百年的傳奇飯店，被譽為亞洲最優雅的奢華酒店之一。殖民時期建築與泰式服務藝術的完美融合。",
      en: "A legendary hotel on the Chao Phraya River for over a century, considered one of Asia's most gracious luxury hotels. Colonial architecture meets Thai service artistry."
    },
    rooms: [
      { name: { zh: "河景套房", en: "River View Suite" }, price: 12000, available: true },
      { name: { zh: "作家套房", en: "Author's Suite" }, price: 22000, available: true },
      { name: { zh: "大師套房", en: "Grand Suite" }, price: 48000, available: true },
    ],
    reviews: [
      { name: "Laurent B.", rating: 5, date: "2025-11", text: { zh: "曼谷最頂級的酒店，服務無可比擬，歷史氛圍濃厚。", en: "Bangkok's finest — unmatched service and rich historical atmosphere." }, avatar: "LB" },
      { name: "林小姐", rating: 5, date: "2025-10", text: { zh: "Spa 是我用過最棒的，物超所值的奢華體驗。", en: "Best spa I've ever experienced. Luxury that's genuinely worth every penny." }, avatar: "林" },
    ],
    nearby: [
      { zh: "臥佛寺 (2.0 km)", en: "Wat Pho (2.0 km)" },
      { zh: "大皇宮 (2.5 km)", en: "Grand Palace (2.5 km)" },
      { zh: "昭披耶河 (0.0 km)", en: "Chao Phraya River (0.0 km)" },
    ]
  }
];

const CITIES = [
  { zh: "全部城市", en: "All Cities", key: "all" },
  { zh: "台北", en: "Taipei", key: "taipei" },
  { zh: "東京", en: "Tokyo", key: "tokyo" },
  { zh: "香港", en: "Hong Kong", key: "hongkong" },
  { zh: "首爾", en: "Seoul", key: "seoul" },
  { zh: "新加坡", en: "Singapore", key: "singapore" },
  { zh: "曼谷", en: "Bangkok", key: "bangkok" },
];

const NOTIFS_DATA = [
  { type: "confirm", icon: "✓", color: "#0a7c5c", bg: "#e1f5ee", titleZh: "預訂確認", titleEn: "Booking Confirmed", msgZh: "您的台北君悅套房已確認預訂，入住日期：12/20", msgEn: "Grand Hyatt Taipei suite confirmed. Check-in: Dec 20", time: "2分鐘前 / 2m ago" },
  { type: "price", icon: "↓", color: "#854F0B", bg: "#FAEEDA", titleZh: "價格提醒", titleEn: "Price Alert", msgZh: "四季香港今日降價 15%，限時優惠！", msgEn: "Four Seasons HK dropped 15% today — limited time!", time: "1小時前 / 1h ago" },
  { type: "offer", icon: "★", color: "#533AB7", bg: "#EEEDFE", titleZh: "限時優惠", titleEn: "Special Offer", msgZh: "提前 30 天預訂，享 20% 早鳥折扣", msgEn: "Book 30 days ahead, enjoy 20% early-bird discount", time: "3小時前 / 3h ago" },
  { type: "price", icon: "↓", color: "#854F0B", bg: "#FAEEDA", titleZh: "價格提醒", titleEn: "Price Alert", msgZh: "曼谷文華東方周末特惠，每晚降至 NT$9,800", msgEn: "Mandarin Oriental Bangkok weekend deal: NT$9,800/night", time: "昨天 / Yesterday" },
  { type: "offer", icon: "★", color: "#533AB7", bg: "#EEEDFE", titleZh: "會員專屬優惠", titleEn: "Member Exclusive", msgZh: "黃金會員可享免費升等至行政套房", msgEn: "Gold members get a free upgrade to Executive Suite", time: "2天前 / 2d ago" },
];

export default function App() {
  const [lang, setLang] = useState("zh");
  const [tab, setTab] = useState("explore");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [filters, setFilters] = useState({ city: "all", stars: "all", maxPrice: 120000, maxDist: 5, amenities: [] });
  const [sortIdx, setSortIdx] = useState(0);
  const [searchCity, setSearchCity] = useState("all");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [mapHotel, setMapHotel] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const t = LANG[lang];

  const showToast = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleBook = (hotel, room) => {
    const key = `${hotel.id}-${room.name.en}`;
    if (bookings.find(b => b.key === key)) {
      showToast(t.duplicateMsg, true);
      return;
    }
    if (!room.available) return;
    setBookings(prev => [...prev, { key, hotel, room, checkIn, checkOut, guests }]);
    showToast(t.confirmMsg);
    NOTIFS_DATA.unshift({
      type: "confirm", icon: "✓", color: "#0a7c5c", bg: "#e1f5ee",
      titleZh: "預訂確認", titleEn: "Booking Confirmed",
      msgZh: `您的${hotel.name.zh}已確認預訂`, msgEn: `${hotel.name.en} booking confirmed`,
      time: "剛剛 / Just now"
    });
  };

  const toggleFav = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

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

  const favHotels = HOTELS.filter(h => favorites.includes(h.id));

  const nightCount = () => {
    if (!checkIn || !checkOut) return 1;
    const d = (new Date(checkOut) - new Date(checkIn)) / 86400000;
    return d > 0 ? d : 1;
  };

  useEffect(() => { if (selectedHotel) setImgIdx(0); }, [selectedHotel]);

  const gold = "#B8913A";
  const deepNavy = "#0D1B2A";
  const cream = "#FAF7F2";

  const styles = {
    app: { fontFamily: "'Playfair Display', 'Noto Serif TC', Georgia, serif", background: cream, minHeight: "100vh", color: deepNavy, maxWidth: 430, margin: "0 auto", position: "relative", paddingBottom: 80 },
    header: { background: deepNavy, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 0, zIndex: 100 },
    appName: { color: gold, fontSize: 22, fontWeight: 700, letterSpacing: 2 },
    langBtn: { background: "transparent", border: `1px solid ${gold}`, color: gold, borderRadius: 20, padding: "3px 12px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 },
    searchBar: { background: deepNavy, padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 10 },
    searchRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 },
    searchInput: { background: "rgba(255,255,255,0.1)", border: `1px solid rgba(${184},${145},${58},0.4)`, borderRadius: 10, padding: "10px 12px", color: "#fff", fontSize: 13, fontFamily: "inherit", width: "100%", boxSizing: "border-box" },
    searchBtn: { background: gold, border: "none", borderRadius: 10, padding: "12px 0", color: deepNavy, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1, width: "100%" },
    filterBar: { display: "flex", gap: 8, padding: "14px 20px", overflowX: "auto", borderBottom: `1px solid rgba(13,27,42,0.08)` },
    chip: (active) => ({ background: active ? deepNavy : "#fff", color: active ? gold : deepNavy, border: `1px solid ${active ? deepNavy : "rgba(13,27,42,0.15)"}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", transition: "all 0.2s" }),
    hotelCard: { background: "#fff", borderRadius: 16, margin: "0 16px 16px", overflow: "hidden", boxShadow: "0 2px 20px rgba(13,27,42,0.08)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" },
    hotelImg: { width: "100%", height: 200, objectFit: "cover", display: "block" },
    cardBody: { padding: "14px 16px 16px" },
    hotelName: { fontSize: 17, fontWeight: 700, color: deepNavy, marginBottom: 4 },
    stars: { color: gold, fontSize: 13, marginBottom: 6 },
    infoRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    price: { fontSize: 22, fontWeight: 700, color: gold },
    priceLabel: { fontSize: 12, color: "#888", fontFamily: "sans-serif" },
    rating: { background: deepNavy, color: gold, borderRadius: 8, padding: "4px 10px", fontSize: 13, fontWeight: 700, fontFamily: "sans-serif" },
    favBtn: (active) => ({ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: active ? gold : "#ccc", position: "absolute", top: 12, right: 12, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }),
    detailImg: { width: "100%", height: 260, objectFit: "cover", display: "block" },
    detailBody: { padding: "0 20px 20px" },
    sectionTitle: { fontSize: 16, fontWeight: 700, color: deepNavy, margin: "18px 0 10px", borderBottom: `2px solid ${gold}`, paddingBottom: 6, display: "inline-block" },
    roomCard: (avail) => ({ background: avail ? "#fff" : "#f5f5f5", border: `1px solid ${avail ? gold : "#ddd"}`, borderRadius: 12, padding: "12px 14px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }),
    bookBtn: (avail) => ({ background: avail ? gold : "#ccc", color: avail ? deepNavy : "#999", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: avail ? "pointer" : "default", fontFamily: "inherit" }),
    reviewCard: { background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 1px 8px rgba(13,27,42,0.06)" },
    avatar: { width: 36, height: 36, borderRadius: 18, background: deepNavy, color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 },
    mapView: { background: "#e8e0d5", borderRadius: 16, margin: "0 16px", padding: 20, minHeight: 300, position: "relative", overflow: "hidden" },
    hotelDot: (active) => ({ position: "absolute", background: active ? gold : deepNavy, color: active ? deepNavy : "#fff", borderRadius: 12, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", transform: "translate(-50%,-50%)", whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", zIndex: active ? 2 : 1 }),
    navbar: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: deepNavy, display: "flex", borderTop: `1px solid rgba(${184},${145},${58},0.2)`, zIndex: 200 },
    navItem: (active) => ({ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0 8px", cursor: "pointer", color: active ? gold : "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "sans-serif", gap: 3 }),
    navIcon: { fontSize: 20 },
    toast: (err) => ({ position: "fixed", bottom: 100, left: "50%", transform: "translateX(-50%)", background: err ? "#C0392B" : "#0a7c5c", color: "#fff", padding: "12px 24px", borderRadius: 12, fontSize: 14, fontFamily: "sans-serif", zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.3)", maxWidth: 360, textAlign: "center" }),
    filterPanel: { background: "#fff", borderRadius: 16, margin: "0 16px 16px", padding: "16px 20px", boxShadow: "0 2px 20px rgba(13,27,42,0.1)" },
    notifCard: (bg) => ({ background: bg, borderRadius: 12, padding: "14px 16px", marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start" }),
    notifIcon: (color) => ({ width: 36, height: 36, borderRadius: 18, background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, flexShrink: 0 }),
    backBtn: { background: "none", border: "none", color: gold, fontSize: 14, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, padding: "14px 20px 0" },
    amenityPill: { background: "#f0ece4", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontFamily: "sans-serif", color: deepNavy, display: "inline-block" },
  };

  const renderStars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  const MapDots = () => {
    const mapW = 390 - 32, mapH = 300;
    const lats = filtered.map(h => h.lat), lngs = filtered.map(h => h.lng);
    const minLat = Math.min(...lats), maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
    const pad = 40;
    return filtered.map(h => {
      const x = lats.length === 1 ? mapW / 2 : pad + ((h.lng - minLng) / (maxLng - minLng + 0.001)) * (mapW - pad * 2);
      const y = lats.length === 1 ? mapH / 2 : pad + (1 - (h.lat - minLat) / (maxLat - minLat + 0.001)) * (mapH - pad * 2);
      const active = mapHotel?.id === h.id;
      return (
        <div key={h.id} style={{ ...styles.hotelDot(active), left: x, top: y }} onClick={() => setMapHotel(h === mapHotel ? null : h)}>
          {active ? `${h.name[lang]} · NT$${h.pricePerNight.toLocaleString()}` : `NT$${(h.pricePerNight / 1000).toFixed(0)}k`}
        </div>
      );
    });
  };

  if (selectedHotel) {
    const h = selectedHotel;
    const nights = nightCount();
    return (
      <div style={styles.app}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap'); * { margin: 0; padding: 0; box-sizing: border-box; }`}</style>
        <div style={{ position: "relative" }}>
          <img src={h.images[imgIdx]} alt="" style={styles.detailImg} />
          <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
            {h.images.map((_, i) => <div key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 20 : 8, height: 8, borderRadius: 4, background: i === imgIdx ? gold : "rgba(255,255,255,0.6)", cursor: "pointer", transition: "width 0.3s" }} />)}
          </div>
          <button style={{ ...styles.backBtn, position: "absolute", top: 12, left: 0, background: "rgba(13,27,42,0.6)", borderRadius: "0 8px 8px 0", color: gold }} onClick={() => setSelectedHotel(null)}>← {t.back}</button>
          <button style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", fontSize: 24, color: favorites.includes(h.id) ? gold : "rgba(255,255,255,0.7)" }} onClick={() => toggleFav(h.id)}>♥</button>
        </div>
        <div style={styles.detailBody}>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginTop: 16, color: deepNavy }}>{h.name[lang]}</h1>
          <div style={{ color: gold, fontSize: 14, margin: "4px 0 8px" }}>{renderStars(h.stars)}</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", fontFamily: "sans-serif", fontSize: 13, color: "#666" }}>
            <span style={{ background: deepNavy, color: gold, padding: "3px 10px", borderRadius: 8, fontWeight: 700 }}>{h.rating}</span>
            <span>{h.reviewCount.toLocaleString()} {t.reviews}</span>
            <span>· {h.city[lang]} · {h.distanceKm} {t.km}</span>
          </div>
          <div style={{ marginTop: 18 }}>
            <div style={styles.sectionTitle}>{t.description}</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#555", fontFamily: "sans-serif", marginTop: 8 }}>{h.description[lang]}</p>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={styles.sectionTitle}>{t.amenities}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
              {h.amenities.map(a => <span key={a} style={styles.amenityPill}>{t.amenityList[a]}</span>)}
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={styles.sectionTitle}>{t.roomTypes}</div>
            {h.rooms.map((room, i) => {
              const booked = bookings.find(b => b.key === `${h.id}-${room.name.en}`);
              return (
                <div key={i} style={styles.roomCard(room.available)}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: deepNavy }}>{room.name[lang]}</div>
                    <div style={{ fontSize: 13, color: room.available ? "#0a7c5c" : "#999", fontFamily: "sans-serif" }}>
                      {room.available ? t.available : t.unavailable}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: gold, marginTop: 4 }}>
                      NT${room.price.toLocaleString()} <span style={{ fontSize: 12, color: "#888", fontWeight: 400 }}>{t.perNight}</span>
                    </div>
                    {checkIn && checkOut && <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif" }}>{t.total}: NT${(room.price * nights).toLocaleString()} ({nights} {t.nights})</div>}
                  </div>
                  <button style={styles.bookBtn(room.available && !booked)} onClick={() => handleBook(h, room)}>
                    {booked ? "✓" : t.bookNow}
                  </button>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={styles.sectionTitle}>{t.nearby}</div>
            <div style={{ background: "#e8e0d5", borderRadius: 12, padding: 16, marginTop: 10, position: "relative", minHeight: 120, fontFamily: "sans-serif" }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>📍 {h.city[lang]}</div>
              {h.nearby.map((n, i) => (
                <div key={i} style={{ fontSize: 13, color: deepNavy, padding: "4px 0", borderBottom: i < h.nearby.length - 1 ? "1px dashed #ccc" : "none" }}>
                  📌 {n[lang]}
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={styles.sectionTitle}>{t.guestReviews}</div>
            {h.reviews.map((r, i) => (
              <div key={i} style={styles.reviewCard}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                  <div style={styles.avatar}>{r.avatar}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                    <div style={{ color: gold, fontSize: 12 }}>{"★".repeat(r.rating)}</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: 12, color: "#999", fontFamily: "sans-serif" }}>{r.date}</div>
                </div>
                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, fontFamily: "sans-serif" }}>{r.text[lang]}</p>
              </div>
            ))}
          </div>
        </div>
        {toast && <div style={styles.toast(toast.isError)}>{toast.msg}</div>}
        <div style={styles.navbar}>
          {["explore","map","saved","notifications","account"].map((tb, i) => (
            <div key={tb} style={styles.navItem(tab === tb)} onClick={() => { setSelectedHotel(null); setTab(tb); }}>
              <span style={styles.navIcon}>{["🏨","🗺","♥","🔔","👤"][i]}</span>
              <span>{t.nav[i]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap'); * { margin: 0; padding: 0; box-sizing: border-box; } input[type=range] { width: 100%; accent-color: ${gold}; } select { appearance: none; }`}</style>
      <div style={styles.header}>
        <div style={styles.appName}>{t.appName}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "sans-serif" }}>{t.tagline}</div>
          <button style={styles.langBtn} onClick={() => setLang(l => l === "zh" ? "en" : "zh")}>{lang === "zh" ? "EN" : "中文"}</button>
        </div>
      </div>
      {(tab === "explore" || tab === "map") && (
        <div style={styles.searchBar}>
          <select value={searchCity} onChange={e => setSearchCity(e.target.value)} style={{ ...styles.searchInput, fontSize: 14 }}>
            {CITIES.map(c => <option key={c.key} value={c.key}>{c[lang]}</option>)}
          </select>
          <div style={styles.searchRow}>
            <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} style={styles.searchInput} placeholder={t.checkIn} />
            <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} style={styles.searchInput} placeholder={t.checkOut} />
            <select value={guests} onChange={e => setGuests(e.target.value)} style={styles.searchInput}>
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {t.guests.slice(-1) === "數" ? "人" : ""}</option>)}
            </select>
          </div>
          <button style={styles.searchBtn} onClick={() => {}}>{t.search}</button>
        </div>
      )}
      {tab === "explore" && (
        <>
          <div style={styles.filterBar}>
            <button style={styles.chip(showFilters)} onClick={() => setShowFilters(s => !s)}>⚙ {t.filters}</button>
            {t.sortOptions.map((s, i) => <button key={i} style={styles.chip(sortIdx === i)} onClick={() => setSortIdx(i)}>{s}</button>)}
            <button style={styles.chip(false)} onClick={() => setTab("map")}>🗺 {t.map}</button>
          </div>
          {showFilters && (
            <div style={styles.filterPanel}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{t.filters}</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif", marginBottom: 6 }}>{t.priceRange}: NT${filters.maxPrice.toLocaleString()}</div>
                <input type="range" min={5000} max={120000} step={1000} value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif", marginBottom: 6 }}>{t.distance}: {filters.maxDist} {t.km}</div>
                <input type="range" min={0.5} max={5} step={0.5} value={filters.maxDist} onChange={e => setFilters(f => ({ ...f, maxDist: +e.target.value }))} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif", marginBottom: 6 }}>{t.starRating}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[t.allStars, "5", "4"].map(s => <button key={s} style={styles.chip(filters.stars === s || (s === t.allStars && filters.stars === "all"))} onClick={() => setFilters(f => ({ ...f, stars: s === t.allStars ? "all" : s }))}>{s === t.allStars ? s : "★".repeat(+s)}</button>)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif", marginBottom: 6 }}>{t.amenities}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {t.amenityList.map((a, i) => (
                    <button key={i} style={styles.chip(filters.amenities.includes(i))} onClick={() => setFilters(f => ({ ...f, amenities: f.amenities.includes(i) ? f.amenities.filter(x => x !== i) : [...f.amenities, i] }))}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <button style={{ ...styles.searchBtn, flex: 1, borderRadius: 8, padding: "10px 0" }} onClick={() => setShowFilters(false)}>{t.apply}</button>
                <button style={{ flex: 1, background: "none", border: `1px solid ${deepNavy}`, borderRadius: 8, padding: "10px 0", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }} onClick={() => { setFilters({ city: "all", stars: "all", maxPrice: 120000, maxDist: 5, amenities: [] }); setShowFilters(false); }}>{t.clear}</button>
              </div>
            </div>
          )}
          <div style={{ padding: "14px 0 0" }}>
            {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#999", fontFamily: "sans-serif", fontSize: 14 }}>No results found</div>}
            {filtered.map(h => (
              <div key={h.id} style={styles.hotelCard} onClick={() => setSelectedHotel(h)}>
                <div style={{ position: "relative" }}>
                  <img src={h.images[0]} alt={h.name[lang]} style={styles.hotelImg} />
                  <button style={styles.favBtn(favorites.includes(h.id))} onClick={e => { e.stopPropagation(); toggleFav(h.id); }}>♥</button>
                  <div style={{ position: "absolute", bottom: 10, left: 14, background: "rgba(13,27,42,0.75)", color: "#fff", borderRadius: 8, padding: "3px 10px", fontSize: 12, fontFamily: "sans-serif" }}>
                    {h.city[lang]} · {h.distanceKm} km
                  </div>
                </div>
                <div style={styles.cardBody}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={styles.hotelName}>{h.name[lang]}</div>
                    <div style={styles.rating}>{h.rating}</div>
                  </div>
                  <div style={styles.stars}>{renderStars(h.stars)}</div>
                  <div style={{ fontSize: 12, color: "#999", fontFamily: "sans-serif", marginBottom: 10 }}>{h.reviewCount.toLocaleString()} {t.reviews}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                    {h.amenities.slice(0, 3).map(a => <span key={a} style={styles.amenityPill}>{t.amenityList[a]}</span>)}
                  </div>
                  <div style={styles.infoRow}>
                    <div>
                      <div style={styles.price}>NT${h.pricePerNight.toLocaleString()}</div>
                      <div style={styles.priceLabel}>{t.perNight}</div>
                    </div>
                    <button style={styles.bookBtn(true)} onClick={e => { e.stopPropagation(); setSelectedHotel(h); }}>{t.viewDetails}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {tab === "map" && (
        <div style={{ padding: "14px 0 0" }}>
          <div style={{ ...styles.mapView, minHeight: 300 }}>
            <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif", marginBottom: 8 }}>📍 {CITIES.find(c => c.key === searchCity)?.[lang] || CITIES[0][lang]}</div>
            <div style={{ position: "relative", height: 260, background: "linear-gradient(135deg, #d4c9b6 0%, #c8baa8 50%, #d4c9b6 100%)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "repeating-linear-gradient(0deg, #888 0, #888 1px, transparent 0, transparent 40px), repeating-linear-gradient(90deg, #888 0, #888 1px, transparent 0, transparent 40px)" }} />
              <MapDots />
            </div>
            {mapHotel && (
              <div style={{ background: "#fff", borderRadius: 12, padding: "12px 14px", marginTop: 12, display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => setSelectedHotel(mapHotel)}>
                <img src={mapHotel.images[0]} style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover" }} alt="" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{mapHotel.name[lang]}</div>
                  <div style={{ color: gold, fontSize: 12 }}>{renderStars(mapHotel.stars)}</div>
                  <div style={{ fontSize: 13, color: gold, fontWeight: 700 }}>NT${mapHotel.pricePerNight.toLocaleString()} {t.perNight}</div>
                </div>
                <div style={{ color: gold, fontSize: 20 }}>›</div>
              </div>
            )}
          </div>
          <div style={{ padding: "0 16px", marginTop: 16 }}>
            {filtered.map(h => (
              <div key={h.id} style={{ ...styles.hotelCard, margin: "0 0 12px", cursor: "pointer" }} onClick={() => setSelectedHotel(h)}>
                <div style={{ display: "flex", gap: 12, padding: 14, alignItems: "center" }}>
                  <img src={h.images[0]} style={{ width: 70, height: 70, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} alt="" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{h.name[lang]}</div>
                    <div style={{ color: gold, fontSize: 12 }}>{renderStars(h.stars)}</div>
                    <div style={{ fontSize: 12, color: "#999", fontFamily: "sans-serif" }}>{h.distanceKm} km · {h.rating} ★</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: gold }}>NT${h.pricePerNight.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: "#999", fontFamily: "sans-serif" }}>{t.perNight}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "saved" && (
        <div style={{ padding: "20px 16px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: deepNavy }}>{t.yourBookings}</h2>
          {bookings.length === 0 && <div style={{ color: "#999", fontFamily: "sans-serif", fontSize: 14, textAlign: "center", padding: 30 }}>{t.noBookings}</div>}
          {bookings.map((b, i) => (
            <div key={i} style={{ ...styles.hotelCard, margin: "0 0 14px", cursor: "pointer" }} onClick={() => setSelectedHotel(b.hotel)}>
              <div style={{ display: "flex", gap: 12, padding: 14 }}>
                <img src={b.hotel.images[0]} style={{ width: 70, height: 70, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} alt="" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{b.hotel.name[lang]}</div>
                  <div style={{ fontSize: 13, color: "#666", fontFamily: "sans-serif" }}>{b.room.name[lang]}</div>
                  {b.checkIn && <div style={{ fontSize: 12, color: "#999", fontFamily: "sans-serif" }}>{b.checkIn} → {b.checkOut}</div>}
                  <div style={{ fontSize: 12, background: "#e1f5ee", color: "#0a7c5c", display: "inline-block", borderRadius: 6, padding: "2px 8px", marginTop: 4, fontFamily: "sans-serif" }}>✓ Confirmed</div>
                </div>
              </div>
            </div>
          ))}
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "24px 0 16px", color: deepNavy }}>❤ {t.markFav}</h2>
          {favHotels.length === 0 && <div style={{ color: "#999", fontFamily: "sans-serif", fontSize: 14 }}>—</div>}
          {favHotels.map(h => (
            <div key={h.id} style={{ ...styles.hotelCard, margin: "0 0 12px", cursor: "pointer" }} onClick={() => setSelectedHotel(h)}>
              <div style={{ display: "flex", gap: 12, padding: 14, alignItems: "center" }}>
                <img src={h.images[0]} style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover" }} alt="" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{h.name[lang]}</div>
                  <div style={{ color: gold, fontSize: 12 }}>{renderStars(h.stars)}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: gold }}>NT${h.pricePerNight.toLocaleString()} {t.perNight}</div>
                </div>
                <button style={{ background: "none", border: "none", color: gold, fontSize: 22, cursor: "pointer" }} onClick={e => { e.stopPropagation(); toggleFav(h.id); }}>♥</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "notifications" && (
        <div style={{ padding: "20px 16px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: deepNavy }}>🔔 {t.notifications}</h2>
          {NOTIFS_DATA.map((n, i) => (
            <div key={i} style={styles.notifCard(n.bg)}>
              <div style={styles.notifIcon(n.color)}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: deepNavy }}>{lang === "zh" ? n.titleZh : n.titleEn}</div>
                <div style={{ fontSize: 13, color: "#555", fontFamily: "sans-serif", lineHeight: 1.5, marginTop: 3 }}>{lang === "zh" ? n.msgZh : n.msgEn}</div>
                <div style={{ fontSize: 11, color: "#999", fontFamily: "sans-serif", marginTop: 6 }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "account" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ background: deepNavy, borderRadius: 20, padding: "28px 24px", marginBottom: 20, textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: 36, background: gold, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: deepNavy }}>VIP</div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>{lang === "zh" ? "尊貴會員" : "Premium Member"}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "sans-serif", marginTop: 4 }}>Gold Status · 2,580 pts</div>
          </div>
          {[
            [lang === "zh" ? "我的預訂" : "My Bookings", bookings.length],
            [lang === "zh" ? "已收藏" : "Saved Hotels", favorites.length],
            [lang === "zh" ? "積分" : "Points", "2,580"],
          ].map(([label, val]) => (
            <div key={label} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 15 }}>{label}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: gold, fontFamily: "sans-serif" }}>{val}</span>
            </div>
          ))}
        </div>
      )}
      {toast && <div style={styles.toast(toast.isError)}>{toast.msg}</div>}
      <div style={styles.navbar}>
        {["explore","map","saved","notifications","account"].map((tb, i) => (
          <div key={tb} style={styles.navItem(tab === tb)} onClick={() => setTab(tb)}>
            <span style={styles.navIcon}>{["🏨","🗺","♥","🔔","👤"][i]}</span>
            <span>{t.nav[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
