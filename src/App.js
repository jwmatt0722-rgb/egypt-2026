import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Sun, 
  CloudSun, 
  Moon, 
  Ship, 
  Plane, 
  Car, 
  Camera, 
  Info, 
  AlertTriangle, 
  ShoppingBag, 
  Wifi, 
  Shirt, 
  BookOpen,
  ChevronDown,
  ChevronUp,
  Tent,
  DollarSign,
  Plus,
  Trash2,
  Users,
  CheckCircle2,
  Circle,
  Sparkles,
  UtensilsCrossed,
  Scroll,
  Map,
  ExternalLink,
  Pyramid,
  Crown,
  Gift,
  ShoppingCart,
  Calculator,
  CreditCard,
  Coins,
  Settings,
  RefreshCw,
  Loader2,
  CloudLightning,
  Train,
  ArrowRightLeft,
  Coffee,
  Armchair,
  PlaneTakeoff,
  FileText
} from 'lucide-react';

// --- Firebase Imports ---
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query 
} from 'firebase/firestore';

// --- Firebase Initialization (User Provided Config) ---
const firebaseConfig = {
  apiKey: "AIzaSyCbUoTxQQFhCAURUMJ8VyuvRs9V6qh9Phw",
  authDomain: "egypt-cedd1.firebaseapp.com",
  projectId: "egypt-cedd1",
  storageBucket: "egypt-cedd1.firebasestorage.app",
  messagingSenderId: "532256791808",
  appId: "1:532256791808:web:55f07775ae8ba9926f67e5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// 設定一個固定的專案 ID，確保所有人的資料都寫入同一個路徑
const appId = 'egypt-trip-2026-group-share'; 

// --- Constants ---
const MEMBERS = ['甜哥', '甜嫂', '小姨子', '堂姐', '甜媽', '外甥女', '甜寶'];

// --- Helper Component for Map Links ---
const MapLink = ({ query, label }) => (
  <a 
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline decoration-dotted ml-1 text-sm"
    onClick={(e) => e.stopPropagation()}
  >
    <MapPin size={12} /> {label || "地圖"}
  </a>
);

// --- Helper Component for Flight Status ---
const FlightStatusBtn = ({ flightCode }) => (
  <a
    href={`https://www.google.com/search?q=flight+${flightCode}`}
    target="_blank"
    rel="noopener noreferrer" 
    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-sm transition-colors border border-blue-500 ml-2"
    onClick={(e) => e.stopPropagation()}
  >
    <PlaneTakeoff size={12} />
    {flightCode} 動態
  </a>
);

// --- Data: Mythology & History (Unchanged) ---
const mythologyData = [
  {
    title: "諸神圖鑑：解讀壁畫的鑰匙",
    desc: "在神廟牆上看到他們，不用再問導遊「這是誰」！",
    items: [
      { name: "太陽神 拉 (Ra)", role: "眾神之王", feature: "鷹頭人身 + 紅色太陽圓盤", story: "創世之神，每天乘太陽船穿越天空與冥界。" },
      { name: "歐西里斯 (Osiris)", role: "冥界之王", feature: "綠色皮膚 + 木乃伊造型", story: "死後復活的神，審判靈魂的主宰。" },
      { name: "伊西斯 (Isis)", role: "魔法女神", feature: "頭頂王座或牛角太陽盤", story: "歐西里斯之妻，偉大的母親與守護者。" },
      { name: "荷魯斯 (Horus)", role: "法老守護神", feature: "鷹頭 + 雙王冠", story: "為父報仇戰勝賽特，法老在人間的化身。" },
      { name: "阿努比斯 (Anubis)", role: "死神/防腐神", feature: "黑色胡狼頭", story: "製作木乃伊，操作真理天秤秤量心臟。" }
    ]
  },
  {
    title: "吉薩高地：三大金字塔與人面獅身",
    desc: "認識古代世界七大奇蹟的真正主角。",
    items: [
      { name: "古夫金字塔", title: "第一大：最大的奇蹟", site: "吉薩", story: "原高146公尺，地球上最高人造建築紀錄保持者(3800年)。" },
      { name: "卡夫拉金字塔", title: "第二大：看起來最高的", site: "吉薩", story: "建在地勢較高處，塔頂保留白色石灰岩外殼。" },
      { name: "孟卡拉金字塔", title: "第三大：精緻的紅色", site: "吉薩", story: "體積最小，但底部使用昂貴的紅色花崗岩。" },
      { name: "人面獅身像", title: "永恆的守護者", site: "吉薩", story: "傳說是卡夫拉的面容。鼻子可能是被激進教徒破壞。" }
    ]
  }
];

// --- Data: Food & Souvenir Map (Unchanged) ---
const foodMapData = {
  "Cairo": [
    { name: "Carrefour Maadi", type: "🛒 超市補給", address: "City Centre Maadi", note: "開羅最大的家樂福之一。買大瓶水、洋芋片、水果。" },
    { name: "Abou Tarek", type: "國民美食 Koshary", address: "Downtown Cairo", note: "便宜大碗，體驗當地人生活首選。" },
    { name: "El Abd Patisserie", type: "老牌甜點店", address: "Downtown Cairo", note: "甜點與冰淇淋超有名。" },
    { name: "Jordi Papyrus", type: "🛍️ 伴手禮: 紙莎草", address: "Khan el-Khalili", note: "價格公道，品質有保證，老闆友善。" },
    { name: "Golden Eagle", type: "🛍️ 伴手禮: 香精", address: "Giza Area", note: "雖是觀光店但品質穩定。蓮花精油最熱門。" }
  ],
  "Luxor": [
    { name: "Ar-Radwan Supermarket", type: "🛒 超市補給", address: "East Bank", note: "路克索當地較具規模的超市。" },
    { name: "Sofra Restaurant", type: "埃及家常菜", address: "East Bank", note: "老宅改建，氣氛好，烤鴿子必點。" },
    { name: "Marsam Hotel", type: "庭園午餐", address: "West Bank", note: "環境清幽，考古學家喜愛，食物新鮮。" },
    { name: "Fair Trade Center", type: "🛍️ 伴手禮: 手工藝", address: "Luxor Temple附近", note: "公平貿易商店，不二價。" }
  ],
  "Aswan": [
    { name: "Hayat Supermarket", type: "🛒 超市補給", address: "Corniche el-Nile", note: "位於尼羅河濱海大道旁，方便補給。" },
    { name: "Al Makka", type: "烤肉料理", address: "Souq Area", note: "市集附近的平價美味。" },
    { name: "Aswan Spices Market", type: "🛍️ 伴手禮: 香料", address: "Aswan Souq", note: "洛神花(Hibiscus)品質最好，記得殺價。" }
  ],
  "Hurghada": [
    { name: "Spinneys (Senzo Mall)", type: "🛒 超市補給 (最大)", address: "Senzo Mall", note: "種類超多，適合一次買齊伴手禮，價格便宜。" },
    { name: "Star Fish", type: "海鮮大餐", address: "Sheraton Road", note: "當地最有名海鮮餐廳，現點現做。" }
  ],
  "Kuala Lumpur": [
    { name: "Wong Ah Wah", type: "炭烤雞翅", address: "Jalan Alor", note: "亞羅街夜市招牌，燒雞翅必點。" },
    { name: "Madam Kwan's", type: "椰漿飯", address: "Suria KLCC", note: "舒適冷氣房吃道地馬來菜。" },
    { name: "OldTown White Coffee", type: "白咖啡", address: "KL Sentral", note: "國民早餐，伴手禮買即溶包。" },
    { name: "Beryl's Chocolate", type: "🛍️ 伴手禮: 巧克力", address: "KLIA/市區", note: "提拉米蘇口味是經典。" },
    { name: "Vincci", type: "🛍️ 伴手禮: 鞋包", address: "Suria KLCC", note: "大馬國民品牌，CP值高。" }
  ]
};

// --- Data: Itinerary (Unchanged) ---
const itineraryData = [
  {
    date: "1/26 (一)",
    location: "台北 -> 杜拜",
    weather: { temp: "22°C", icon: "moon", desc: "機上恆溫" },
    transport: [
      { type: "plane", text: "MH367 台北 15:10 -> 吉隆坡 20:05", flightCode: "MH367" },
      { type: "plane", text: "EK343 吉隆坡 01:25(+1) -> 杜拜", flightCode: "EK343" }
    ],
    activities: [
      { 
        name: "吉隆坡 Plaza Premium Lounge", 
        note: "轉機休息 (1/27 凌晨)", 
        guide: "位於 KLIA 第一航廈，通常在 Satellite Building 2樓 (近 Gate C11-17)。提供熱食、淋浴與舒適座椅。",
        lounge: true,
        mapQuery: "Plaza Premium Lounge KLIA Satellite"
      },
      { name: "機上休息", note: "養精蓄銳，準備迎接古文明之旅" }
    ],
    extra: {
      type: "food",
      title: "轉機小確幸",
      content: "杜拜機場第3航廈有 Shake Shack 漢堡，如果飛機餐沒吃飽，這是最受歡迎的快速美食。長輩若需休息，可利用免費的躺椅區 (Snooze Cube 附近)。"
    },
    stay: "機上"
  },
  {
    date: "1/27 (二)",
    location: "杜拜 -> 開羅",
    weather: { temp: "18°C", icon: "sun", desc: "晴朗乾燥" },
    transport: [
      { type: "plane", text: "EK927 杜拜 08:10 -> 開羅 10:25", flightCode: "EK927" },
      { type: "car", text: "機場接送至飯店" }
    ],
    activities: [
      { 
        name: "杜拜 Marhaba Lounge", 
        note: "轉機休息 (01:25抵達 - 08:10起飛)", 
        guide: "位於 DXB 第三航廈 (Emirates 專用)。Concourse A, B, C 都有 Marhaba 貴賓室，請依據下一段登機門選擇最近的。",
        lounge: true,
        mapQuery: "Marhaba Lounge Dubai Airport Terminal 3"
      },
      { 
        name: "薩拉丁城堡 & 阿里清真寺", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">🏰 軍事堡壘與華麗清真寺</strong>
              薩拉丁城堡聳立在開羅東邊的穆卡塔姆山上，是中世紀伊斯蘭軍事建築的傑作。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              1. <span className="text-pink-400 font-bold">中庭噴水池前</span><MapLink query="Mosque of Muhammad Ali" />：拍出清真寺對稱的圓頂與尖塔。<br/>
              2. <span className="text-pink-400 font-bold">戶外觀景台角落</span><MapLink query="Citadel of Saladin Cairo" />：俯瞰整個開羅老城區。
            </p>
          </>
        )
      },
      { 
        name: "哈利利市集", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">🏺 走進《一千零一夜》</strong>
              中東最古老的露天市集之一。一定要體驗「殺價文化」。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              尋找掛滿<span className="text-pink-400 font-bold">彩色玻璃燈</span><MapLink query="Khan el-Khalili lamps" /> 的店家，站在燈海中間拍照。
            </p>
          </>
        )
      }
    ],
    stay: "開羅 (吉薩區 Giza)"
  },
  {
    date: "1/28 (三)",
    location: "開羅 (吉薩)",
    weather: { temp: "19°C", icon: "sun", desc: "陽光普照" },
    transport: [
      { type: "car", text: "Uber 或 包車" }
    ],
    activities: [
      { 
        name: "大埃及博物館 (GEM)", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">🏛️ 世紀工程</strong>
              全球最大考古博物館，必看圖坦卡門黃金面具。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              1. <span className="text-pink-400 font-bold">懸掛方尖碑</span><MapLink query="Grand Egyptian Museum Obelisk" />：入口廣場仰拍。<br/>
              2. <span className="text-pink-400 font-bold">大階梯</span><MapLink query="Grand Egyptian Museum Grand Staircase" />：站在底部往上拍。
            </p>
          </>
        )
      },
      { name: "科普特開羅 (懸空教堂)", guide: "建立在羅馬堡壘上的教堂，地板有玻璃可看見下方舊堡壘。" }
    ],
    stay: "開羅 (吉薩區 Giza)"
  },
  {
    date: "1/29 (四)",
    location: "吉薩 -> 亞斯文",
    weather: { temp: "23°C", icon: "sun", desc: "南部溫暖" },
    transport: [
      { type: "car", text: "包車前往金字塔區" },
      { type: "plane", text: "晚班機 開羅 -> 亞斯文", flightCode: "Flight" }
    ],
    activities: [
      { 
        name: "吉薩金字塔群", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">📐 世界奇蹟</strong>
              古代世界七大奇蹟中唯一碩果僅存的建築。主要由古夫、卡夫拉、孟卡拉三座金字塔組成。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              1. <span className="text-pink-400 font-bold">Pizza Hut 頂樓</span><MapLink query="Pizza Hut Giza Pyramids" />：經典人面獅身與金字塔對望視角。<br/>
              2. <span className="text-pink-400 font-bold">Panorama Point</span><MapLink query="Giza Pyramids Panorama View" />：三座金字塔並排全景。
            </p>
          </>
        )
      },
      { 
        name: "人面獅身像", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">🦁 守護千年的謎團</strong>
              世界上最大的單體石像。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              <span className="text-pink-400 font-bold">側面步道</span><MapLink query="Great Sphinx of Giza" />：利用錯位拍攝「親吻人面獅身」。
            </p>
          </>
        )
      }
    ],
    stay: "亞斯文 (Aswan 市區)"
  },
  {
    date: "1/30 (五)",
    location: "亞斯文",
    weather: { temp: "24°C", icon: "sun", desc: "舒適宜人" },
    transport: [
      { type: "ship", text: "渡船前往神廟" },
      { type: "ship", text: "Felucca 風帆船" }
    ],
    activities: [
      { 
        name: "菲萊神廟", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">🌺 尼羅河珍珠</strong>
              位於島上，供奉愛神伊西斯。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              <span className="text-pink-400 font-bold">圖拉真涼亭</span><MapLink query="Trajan's Kiosk Philae" />：透過方形石柱框景拍攝尼羅河。
            </p>
          </>
        )
      },
      { name: "尼羅河風帆船夕陽巡航", guide: "體驗完全靠風力行駛的古老帆船，非常安靜放鬆。" }
    ],
    stay: "亞斯文 (Aswan)"
  },
  {
    date: "1/31 (六)",
    location: "亞斯文 -> 郵輪",
    weather: { temp: "12°C-25°C", icon: "sun", desc: "清晨寒冷" },
    transport: [
      { type: "car", text: "清晨 04:00 參加 Tour" },
      { type: "ship", text: "下午登船 (郵輪 Check-in)" }
    ],
    activities: [
      { 
        name: "阿布辛貝神廟", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">👑 法老的終極野心</strong>
              由拉美西斯二世建造，四尊巨大的法老坐像高達20公尺。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              1. <span className="text-pink-400 font-bold">巨像腳下</span><MapLink query="Abu Simbel Temples" />：站在最右邊法老腳邊往上仰拍。<br/>
              2. <span className="text-pink-400 font-bold">廣場遠處</span>：全景模式拍兩座神廟。
            </p>
          </>
        )
      },
      { name: "康翁波神廟", guide: "雙神廟與鱷魚木乃伊博物館。" }
    ],
    stay: "尼羅河郵輪 (5星級)"
  },
  {
    date: "02/01 (日)",
    location: "郵輪航行",
    weather: { temp: "25°C", icon: "sun", desc: "河上微風" },
    transport: [
      { type: "car", text: "馬車往返神廟" },
      { type: "ship", text: "郵輪航行" }
    ],
    activities: [
      { 
        name: "艾德夫神廟", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">🦅 鷹神荷魯斯的家</strong>
              埃及保存最完整的神廟。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              <span className="text-pink-400 font-bold">荷魯斯雕像</span><MapLink query="Temple of Edfu Horus Statue" />：門口的老鷹雕像必拍。
            </p>
          </>
        )
      },
      { name: "享受郵輪設施", note: "下午茶、泳池、日光浴" }
    ],
    stay: "尼羅河郵輪"
  },
  {
    date: "02/02 (一)",
    location: "路克索 (東岸)",
    weather: { temp: "26°C", icon: "sun", desc: "熱情古都" },
    transport: [
      { type: "ship", text: "郵輪 Check-out" },
      { type: "car", text: "市區計程車/馬車" }
    ],
    activities: [
      { 
        name: "卡奈克神廟", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">🏛️ 諸神的迷宮</strong>
              最震撼的是134根參天巨柱組成的巨柱大廳。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              <span className="text-pink-400 font-bold">巨柱大廳光影</span><MapLink query="Karnak Hypostyle Hall" />：尋找光線射入柱間的角度。
            </p>
          </>
        )
      },
      { 
        name: "路克索神廟", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">🌙 夜晚的神殿</strong>
              建議傍晚參觀。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              <span className="text-pink-400 font-bold">入口方尖碑</span><MapLink query="Luxor Temple Entrance" />：夜晚打燈後更立體。
            </p>
          </>
        )
      }
    ],
    stay: "路克索「東岸」市區飯店"
  },
  {
    date: "02/03 (二)",
    location: "路克索 (西岸)",
    weather: { temp: "26°C", icon: "sun", desc: "乾燥炎熱" },
    transport: [
      { type: "car", text: "包車過河至西岸" }
    ],
    activities: [
      { 
        name: "帝王谷 & 女王神廟", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">⛰️ 法老的永恆居所</strong>
              陵墓深藏在山谷中。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              <span className="text-pink-400 font-bold">女王神廟露台</span><MapLink query="Mortuary Temple of Hatshepsut" />：背對神廟往外拍。
            </p>
          </>
        )
      },
      { name: "曼儂巨像", note: "路過拍照點" }
    ],
    stay: "路克索「西岸」特色民宿"
  },
  {
    date: "02/04 (三)",
    location: "路克索 -> 赫爾格達",
    weather: { temp: "10°C-25°C", icon: "sun", desc: "日出微涼" },
    transport: [
      { type: "plane", text: "熱氣球接送" },
      { type: "car", text: "包車/巴士前往紅海" }
    ],
    activities: [
      { 
        name: "熱氣球飛行 (日出)", 
        guide: "上帝視角俯瞰帝王谷與尼羅河。最佳拍照點：尼羅河倒影與其他熱氣球當背景。"
      }
    ],
    stay: "赫爾格達 (Hurghada) 全包式度假村"
  },
  {
    date: "02/05 (四)",
    location: "赫爾格達 (紅海)",
    weather: { temp: "24°C", icon: "sun", desc: "海風徐徐" },
    transport: [
      { type: "ship", text: "出海船潛" }
    ],
    activities: [
      { name: "紅海出海 (浮潛/深潛)", guide: "世界級潛點。拍照建議：船頭甲板穿亮色泳衣俯拍。" }
    ],
    stay: "赫爾格達 (Hurghada)"
  },
  {
    date: "02/06 (五)",
    location: "赫爾格達 -> 開羅",
    weather: { temp: "20°C", icon: "cloud", desc: "舒適" },
    transport: [
      { type: "plane", text: "下午/晚上 赫爾格達 -> 開羅", flightCode: "Flight" }
    ],
    activities: [
      { name: "飯店設施 / 沙灘放空", note: "把握最後海邊時光" }
    ],
    stay: "開羅 (近吉薩或沙漠公路)"
  },
  {
    date: "02/07 (六)",
    location: "黑白沙漠",
    weather: { temp: "8°C-20°C", icon: "sun", desc: "日夜溫差大" },
    transport: [
      { type: "car", text: "吉普車進沙漠" }
    ],
    activities: [
      { 
        name: "黑白沙漠探險", 
        guide: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500 text-lg block mb-1">🍄 踏上外星球</strong>
              黑沙漠遍佈火山玄武岩，白沙漠則有風化的白色蘑菇石與小雞石。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-lg block mb-2">📸 絕佳機位：</strong>
              <span className="text-pink-400 font-bold">夕陽剪影</span><MapLink query="White Desert National Park" />：利用逆光拍攝蘑菇石剪影。
            </p>
          </>
        )
      }
    ],
    stay: "B&W Sahara Sky Camp"
  },
  {
    date: "02/08 (日)",
    location: "沙漠 -> 開羅",
    weather: { temp: "20°C", icon: "sun", desc: "晴朗" },
    transport: [
      { type: "car", text: "返回開羅" }
    ],
    activities: [
      { name: "返回開羅", note: "市區晚餐" }
    ],
    stay: "開羅 (Cairo)"
  },
  {
    date: "02/09 (一)",
    location: "開羅 (薩卡拉)",
    weather: { temp: "19°C", icon: "sun", desc: "晴朗" },
    transport: [
      { type: "car", text: "全日包車" }
    ],
    activities: [
      { 
        name: "階梯金字塔 & 紅色金字塔", 
        guide: "金字塔演進史。最佳機位：階梯金字塔前的神殿廊柱廳。"
      }
    ],
    stay: "開羅 (Cairo)"
  },
  {
    date: "2/10 (二)",
    location: "開羅 -> 杜拜",
    weather: { temp: "20°C", icon: "plane", desc: "返程" },
    transport: [
      { type: "car", text: "前往機場" },
      { type: "plane", text: "EK928 開羅 12:30 -> 杜拜", flightCode: "EK928" }
    ],
    activities: [
      { 
        name: "開羅機場 First Class Lounge", 
        note: "登機前休息 (Terminal 2)", 
        guide: "位於開羅機場第二航廈 (Terminal 2) 出境大廳。通常提供簡單熱食與飲料。",
        lounge: true,
        mapQuery: "Cairo Airport Terminal 2"
      },
      { 
        name: "杜拜 Marhaba Lounge", 
        note: "轉機休息 (回程)", 
        guide: "位於 DXB 第三航廈。Concourse A, B, C 都有 Marhaba 貴賓室。",
        lounge: true,
        mapQuery: "Marhaba Lounge Dubai Airport"
      }
    ],
    stay: "機上"
  },
  {
    date: "2/11 (三)",
    location: "杜拜 -> 吉隆坡",
    weather: { temp: "32°C", icon: "cloud", desc: "濕熱雷雨" },
    transport: [
      { type: "plane", text: "EK342 杜拜 04:05 -> 吉隆坡 15:15", flightCode: "EK342" },
      { type: "train", text: "KLIA Ekspres 機場快線 -> KL Sentral" }
    ],
    activities: [
      { 
        name: "黑風洞", 
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">🌈 彩虹階梯與神像：</strong>
              吉隆坡地標，272階七彩階梯。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">📸 絕佳機位：</strong>
              <span className="text-pink-400 font-bold">廣場正中央</span><MapLink query="Batu Caves" />：用廣角鏡頭將神像與彩虹階梯一同拍下。
            </p>
          </>
        )
      },
      { 
        name: "雙子星塔", 
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">🏙️ 世界最高雙塔：</strong>
              吉隆坡的象徵。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">📸 絕佳機位：</strong>
              1. <span className="text-pink-400 font-bold">KLCC 公園</span><MapLink query="KLCC Park" />：對面的噴水池當前景。<br/>
              2. <span className="text-pink-400 font-bold">Saloma Link</span><MapLink query="Saloma Link Bridge" />：附近的行人天橋，晚上亮燈後很科幻。
            </p>
          </>
        )
      },
      { name: "亞羅街夜市 (Jalan Alor)", note: "晚餐：體驗馬來西亞熱炒與榴槤" }
    ],
    stay: "吉隆坡 (KL Sentral 附近)"
  },
  {
    date: "2/12 (四)",
    location: "吉隆坡 -> 台北",
    weather: { temp: "22°C", icon: "cloud", desc: "回家" },
    transport: [
      { type: "train", text: "KLIA Ekspres 機場快線" },
      { type: "plane", text: "MH366 吉隆坡 09:20 -> 台北 14:10", flightCode: "MH366" }
    ],
    activities: [
      { 
        name: "吉隆坡 JCB 貴賓室 (Sphere Lounge)", 
        note: "登機前休息 (09:20 起飛)", 
        guide: "位於 KLIA 第一航廈 Satellite Building, Mezzanine Floor (夾層)。憑 JCB 信用卡可免費進入 (需確認卡別優惠)。提供輕食與飲料。",
        lounge: true,
        mapQuery: "Sphere Lounge KLIA"
      },
      { name: "抵達溫暖的家", note: "整理照片與回憶" }
    ],
    extra: {
      type: "secret",
      title: "照片備份提醒",
      content: "埃及風沙大，相機或手機鏡頭容易髒，整理照片時記得先清潔。"
    },
    stay: "甜蜜的家"
  }
];

// --- Data: Tips & Tools (Updated with Visa & Entry) ---
const tipsData = [
  {
    category: "簽證 & 入境 & 網路",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    icon: <FileText size={20} />,
    items: [
      "🇪🇬 埃及落地簽 (Visa on Arrival):",
      "   • 費用：25 美金 (限現金，不找零)。",
      "   • 流程：入境大廳 -> 銀行櫃檯買貼紙 -> 貼在護照上 -> 排隊過海關。",
      "   • 必備：護照(6個月+效期)、回程機票、住宿證明。",
      "🇲🇾 馬來西亞 (免簽+MDAC):",
      "   • 免簽證：停留30天內。",
      "   • MDAC 電子入境卡：**抵達前3天內**必填。",
      "   • 填寫網址：https://imigresen-online.imi.gov.my/mdac/main",
      "   • 必備資料：護照資訊、Email (收確認信)、住宿地址。",
      "   • 通關：走自動通關閘門 (Autogate) 或人工櫃檯，需出示 MDAC 註冊證明。",
      "網路: 建議購買跨國漫遊卡或 eSIM，一次搞定兩國網路。"
    ]
  },
  {
    category: "馬來西亞旅遊叮嚀",
    color: "bg-teal-100 text-teal-800 border-teal-300",
    icon: <CloudSun size={20} />,
    items: [
      "氣候：全年炎熱潮濕 (30°C+)，像台灣的夏天。午後常有雷陣雨，務必隨身攜帶雨傘。",
      "穿著：輕便透氣為主。進入清真寺需穿長褲/長裙，女性需包頭巾。",
      "文化：伊斯蘭教國家，請勿在公共場合飲酒過量。傳統馬來人習慣用右手進食。",
      "交通：吉隆坡塞車嚴重，建議多利用大眾運輸 (LRT/Monorail) 或機場快線。叫車請用 Grab App。"
    ]
  },
  {
    category: "必買伴手禮",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    icon: <ShoppingBag size={20} />,
    items: [
      "埃及：紙莎草畫、香精油、雪花石膏、椰棗。",
      "馬來西亞：Beryl's 巧克力、舊街場白咖啡、肉骨茶包、Kaya 咖椰醬、Vincci 鞋子。"
    ]
  },
  {
    category: "防騙秘笈 (埃及篇)",
    color: "bg-red-100 text-red-800 border-red-300",
    icon: <AlertTriangle size={20} />,
    items: [
      "No Free Gift: 手裡被塞東西要立刻拒絕，拿了就要錢。",
      "駱駝/馬車: 上去前講好價錢，下來時可能會變卦，建議備好零錢直接給剛好。",
      "主動幫忙拍照: 通常拍完會要小費。",
      "One Dollar: 聽到這個不要隨便回頭。",
      "廁所: 大部分景點廁所都要收費 (5-10 EGP)，自備零錢。"
    ]
  },
  {
    category: "小費文化 (Baksheesh)",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    icon: <Info size={20} />,
    items: [
      "埃及：行李搬運 20-30 EGP，公廁 5-10 EGP。",
      "馬來西亞：無強制小費文化，餐廳通常已含 10% 服務費。"
    ]
  }
];

// --- Components ---

const WeatherBadge = ({ weather }) => {
  const getIcon = () => {
    switch (weather.icon) {
      case 'sun': return <Sun size={14} className="text-amber-500" />;
      case 'cloud': return <CloudSun size={14} className="text-gray-400" />;
      case 'moon': return <Moon size={14} className="text-indigo-400" />;
      case 'plane': return <Plane size={14} className="text-blue-400" />;
      default: return <Sun size={14} />;
    }
  };

  return (
    <div className="flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-full text-xs text-slate-300 backdrop-blur-sm border border-slate-700">
      {getIcon()}
      <span>{weather.temp}</span>
      <span className="hidden sm:inline">| {weather.desc}</span>
    </div>
  );
};

const TransportItem = ({ item }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'plane': return <Plane size={16} />;
      case 'car': return <Car size={16} />;
      case 'ship': return <Ship size={16} />;
      case 'train': return <div className="text-xs font-bold border border-current px-1 rounded">TR</div>;
      default: return <Car size={16} />;
    }
  };

  return (
    <div className="flex items-start gap-3 text-sm text-slate-400 mb-2">
      <div className="mt-0.5 text-blue-400">{getIcon()}</div>
      <div className="flex-1 flex items-center gap-2">
        {item.text}
        {item.flightCode && <FlightStatusBtn flightCode={item.flightCode} />}
      </div>
    </div>
  );
};

const ActivityItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-start gap-3">
        <div className={`mt-1 ${item.lounge ? 'text-purple-400' : 'text-amber-500'}`}>
          {item.lounge ? <Armchair size={18} /> : <Camera size={18} />}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-200 text-base flex items-center gap-2">
            {item.name}
            {item.lounge && <span className="text-[10px] bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded border border-purple-800">貴賓室</span>}
          </h4>
          {item.note && <p className="text-sm text-slate-400 mt-1">{item.note}</p>}
          
          {item.guide && (
            <div className="mt-2">
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className={`flex items-center gap-1 text-sm font-bold transition-colors px-3 py-1.5 rounded-full border ${item.lounge ? 'text-purple-400 hover:text-purple-300 bg-purple-900/40 border-purple-900/50' : 'text-amber-400 hover:text-amber-300 bg-amber-900/40 border-amber-900/50'}`}
                >
                  {isOpen ? <ChevronUp size={16} /> : (item.lounge ? <Coffee size={16} /> : <BookOpen size={16} />)}
                  {isOpen ? "收起" : (item.lounge ? "位置資訊" : "導遊解說")}
                </button>
                
                {item.lounge && item.mapQuery && (
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-900/50"
                  >
                    <MapPin size={16} /> 地圖
                  </a>
                )}
              </div>
              
              {isOpen && (
                <div className={`mt-3 p-4 bg-slate-800/95 rounded-xl border-l-4 ${item.lounge ? 'border-purple-500' : 'border-amber-500'} text-slate-200 animate-fadeIn shadow-2xl`}>
                  <div className="text-lg leading-loose tracking-wide">
                    {item.guide}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// New Component for Extra Info
const ExtraInfoBadge = ({ info }) => {
  if (!info) return null;

  const getIcon = () => {
    switch (info.type) {
      case 'food': return <UtensilsCrossed size={16} />;
      case 'secret': return <Sparkles size={16} />;
      default: return <Info size={16} />;
    }
  };

  const getColorClass = () => {
    switch (info.type) {
      case 'food': return "bg-orange-900/30 text-orange-200 border-orange-700/50";
      case 'secret': return "bg-pink-900/30 text-pink-200 border-pink-700/50";
      default: return "bg-slate-800 text-slate-200 border-slate-700";
    }
  };

  return (
    <div className={`mt-4 rounded-xl p-3 border ${getColorClass()} relative overflow-hidden`}>
      <div className="flex items-center gap-2 font-bold mb-1 text-sm">
        {getIcon()}
        {info.title}
      </div>
      <p className="text-sm opacity-90 leading-relaxed">
        {info.content}
      </p>
    </div>
  );
};

const DayCard = ({ day }) => {
  return (
    <div className="bg-slate-900 rounded-2xl p-5 mb-4 shadow-lg border border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-amber-500 to-blue-900 opacity-80"></div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-amber-500 font-bold text-lg">{day.date}</span>
            <WeatherBadge weather={day.weather} />
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <MapPin size={14} />
            {day.location}
          </div>
        </div>
      </div>
      {day.transport && day.transport.length > 0 && (
        <div className="bg-slate-950/50 rounded-xl p-3 mb-4 border border-slate-800/50">
          {day.transport.map((t, idx) => (
            <TransportItem key={idx} item={t} />
          ))}
        </div>
      )}
      <div className="space-y-3">
        {day.activities.map((act, idx) => (
          <ActivityItem key={idx} item={act} />
        ))}
      </div>
      {day.extra && (
        <ExtraInfoBadge info={day.extra} />
      )}
      <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-500">
        <Tent size={14} />
        <span>住宿：{day.stay}</span>
      </div>
    </div>
  );
};

const TipsCard = ({ tip }) => {
  return (
    <div className={`rounded-xl p-4 mb-4 border ${tip.color} shadow-sm`}>
      <div className="flex items-center gap-2 mb-3 font-bold text-lg">
        {tip.icon}
        {tip.category}
      </div>
      <ul className="list-disc list-inside space-y-2 text-base opacity-90 leading-relaxed">
        {tip.items.map((item, idx) => (
          <li key={idx} className="mb-1 whitespace-pre-line">{item}</li>
        ))}
      </ul>
    </div>
  );
};

// --- History Tab Component ---
const HistoryTab = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      {mythologyData.map((section, idx) => (
        <div key={idx} className="bg-slate-900 rounded-xl p-5 border border-slate-800">
          <h3 className="text-xl font-bold text-amber-500 mb-2 flex items-center gap-2">
            {idx === 0 ? <Scroll size={24}/> : <Crown size={24}/>}
            {section.title}
          </h3>
          <p className="text-sm text-slate-400 mb-5 border-b border-slate-800 pb-3">{section.desc}</p>
          
          <div className="space-y-6">
            {section.items.map((item, i) => (
              <div key={i} className="bg-slate-950/50 rounded-lg border border-slate-800 overflow-hidden p-5">
                <div className="mb-4">
                  <h4 className="font-bold text-white text-xl mb-2 flex flex-wrap items-center gap-2">
                    {item.name}
                    {item.role && (
                      <span className="text-xs bg-amber-900/30 text-amber-400 px-2 py-1 rounded border border-amber-900/50 font-normal">
                        {item.role}
                      </span>
                    )}
                  </h4>
                  {item.title && (
                    <div className="text-amber-500 text-sm font-bold mb-1">
                      {item.title}
                    </div>
                  )}
                  {item.site && (
                    <div className="flex items-center gap-1 text-xs text-blue-400 mb-2">
                      <MapPin size={12} /> 出沒地：{item.site}
                    </div>
                  )}
                  {item.feature && (
                    <div className="text-sm text-slate-300 bg-slate-900 p-3 rounded border-l-4 border-amber-500">
                      <span className="text-slate-500 block mb-1 text-xs font-bold uppercase tracking-wider">特徵辨識</span>
                      {item.feature}
                    </div>
                  )}
                </div>
                <div className="text-base text-slate-300 leading-loose tracking-wide space-y-4">
                  {item.story}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Food Tab Component ---
const FoodTab = () => {
  return (
    <div className="animate-fadeIn space-y-6">
       <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-4">
          <h3 className="text-amber-500 font-bold mb-2 flex items-center gap-2">
             <Map size={20} /> 美食 & 補給導航
          </h3>
          <p className="text-sm text-slate-400">
            包含餐廳、伴手禮店與<span className="text-amber-400 font-bold">大型超市</span>。點擊「📍 導航」按鈕，可直接開啟 Google 地圖。
          </p>
        </div>

      {Object.entries(foodMapData).map(([city, shops], idx) => (
        <div key={idx}>
          <h4 className="text-lg font-bold text-slate-200 mb-3 pl-2 border-l-4 border-amber-500">
            {city === "Cairo" ? "開羅 Cairo" : 
             city === "Luxor" ? "路克索 Luxor" :
             city === "Aswan" ? "亞斯文 Aswan" : 
             city === "Hurghada" ? "赫爾格達 Hurghada" : "吉隆坡 Kuala Lumpur"}
          </h4>
          <div className="grid gap-4">
            {shops.map((shop, i) => (
              <div key={i} className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden group">
                 <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-bold text-white text-lg flex items-center gap-2 flex-wrap">
                        {shop.name}
                        {shop.type.includes("伴手禮") && <Gift size={16} className="text-pink-400" />}
                        {shop.type.includes("超市") && <ShoppingCart size={16} className="text-green-400" />}
                      </h5>
                      <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block border ${
                        shop.type.includes("伴手禮") ? "text-pink-400 bg-pink-950/30 border-pink-900/30" : 
                        shop.type.includes("超市") ? "text-green-400 bg-green-950/30 border-green-900/30" :
                        "text-amber-400 bg-amber-950/30 border-amber-900/30"
                      }`}>
                        {shop.type}
                      </span>
                    </div>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + city + (city === 'Kuala Lumpur' ? ' Malaysia' : ' Egypt'))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors shadow-lg shadow-blue-900/20 whitespace-nowrap"
                    >
                      <MapPin size={12} /> 導航
                    </a>
                 </div>
                 <div className="mt-3 text-sm text-slate-300 leading-relaxed">
                   {shop.note}
                 </div>
                 <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                   <MapPin size={10} /> {shop.address}
                 </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Currency Tab Component ---
const CurrencyTab = () => {
  // Default Rates (Estimate)
  const DEFAULT_RATES = {
    USD_TWD: 32.5,
    USD_EGP: 50.0,
    USD_MYR: 4.5, // Estimated rate for MYR
  };

  const [rates, setRates] = useState(DEFAULT_RATES);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [amount, setAmount] = useState('100');
  const [baseCurrency, setBaseCurrency] = useState('EGP');
  const [isCardMode, setIsCardMode] = useState(false); // false = Cash, true = Card
  const [cardType, setCardType] = useState('VISA'); // VISA or MASTER
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Derived Rates
  const EGP_TWD = rates.USD_TWD / rates.USD_EGP;
  const MYR_TWD = rates.USD_TWD / rates.USD_MYR;

  // Fetch Exchange Rates
  const fetchRates = async () => {
    setIsLoading(true);
    setFetchError(false);
    try {
      // Using a free open API for demo purposes
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await response.json();
      
      if (data && data.rates) {
        setRates({
          USD_TWD: data.rates.TWD,
          USD_EGP: data.rates.EGP,
          USD_MYR: data.rates.MYR || 4.5 // Fallback if MYR missing
        });
        setLastUpdated(new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }));
      } else {
        setFetchError(true);
      }
    } catch (error) {
      console.error("Failed to fetch rates:", error);
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchRates();
  }, []);

  // Calculate Converted Values
  const calculate = () => {
    const val = parseFloat(amount) || 0;
    let res = { EGP: 0, USD: 0, TWD: 0, MYR: 0 };

    // 1. Convert Base to USD first
    let valInUSD = 0;
    if (baseCurrency === 'USD') valInUSD = val;
    else if (baseCurrency === 'TWD') valInUSD = val / rates.USD_TWD;
    else if (baseCurrency === 'EGP') valInUSD = val / rates.USD_EGP;
    else if (baseCurrency === 'MYR') valInUSD = val / rates.USD_MYR;

    // 2. Convert USD to others
    res.USD = valInUSD;
    res.TWD = valInUSD * rates.USD_TWD;
    res.EGP = valInUSD * rates.USD_EGP;
    res.MYR = valInUSD * rates.USD_MYR;

    // 3. Apply Card Fees if needed (approx 1.5% fee on foreign currency)
    if (isCardMode) {
      // If paying in EGP/USD/MYR with TW card, TWD cost increases by 1.5%
      if (baseCurrency !== 'TWD') {
        res.TWD = res.TWD * 1.015; 
      }
    }

    return res;
  };

  const results = calculate();

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Top Controller */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-20">
          <Coins size={80} className="text-amber-500" />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Calculator size={24} className="text-amber-500" /> 即時匯率換算
          </h3>
          <button 
            onClick={fetchRates}
            disabled={isLoading}
            className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors border border-slate-700 disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin text-amber-500" /> : <RefreshCw size={16} className="text-slate-400" />}
          </button>
        </div>

        {/* Update Status */}
        <div className="text-xs text-right mb-2 -mt-2">
          {isLoading ? (
            <span className="text-amber-500">更新匯率中...</span>
          ) : lastUpdated ? (
            <span className="text-emerald-400">最後更新: {lastUpdated}</span>
          ) : fetchError ? (
            <span className="text-red-400">更新失敗，使用預設值</span>
          ) : (
            <span className="text-slate-500">使用預設匯率</span>
          )}
        </div>

        {/* Input Section */}
        <div className="flex gap-2 mb-4">
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-3 text-2xl text-white font-mono outline-none focus:border-amber-500"
            placeholder="0"
          />
          <select 
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 text-white font-bold outline-none"
          >
            <option value="EGP">EGP 埃鎊</option>
            <option value="USD">USD 美金</option>
            <option value="TWD">TWD 台幣</option>
            <option value="MYR">MYR 令吉</option>
          </select>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2 mb-4 bg-slate-950/50 p-1 rounded-lg border border-slate-800">
          <button 
            onClick={() => setIsCardMode(false)}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${!isCardMode ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            現金 (Cash)
          </button>
          <button 
            onClick={() => setIsCardMode(true)}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex justify-center items-center gap-1 ${isCardMode ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <CreditCard size={14} /> 刷卡 (+1.5%)
          </button>
        </div>

        {isCardMode && (
           <div className="flex gap-2 mb-4 text-xs">
             <label className="flex items-center gap-1 cursor-pointer text-slate-300">
               <input type="radio" name="cardType" checked={cardType === 'VISA'} onChange={() => setCardType('VISA')} /> VISA
             </label>
             <label className="flex items-center gap-1 cursor-pointer text-slate-300">
               <input type="radio" name="cardType" checked={cardType === 'MASTER'} onChange={() => setCardType('MASTER')} /> MASTER
             </label>
             <span className="ml-auto text-slate-500 italic">估算值，視發卡行而定</span>
           </div>
        )}

        {/* Results Display */}
        <div className="space-y-2">
          {['EGP', 'USD', 'TWD', 'MYR'].filter(c => c !== baseCurrency).map(curr => (
            <div key={curr} className="flex justify-between items-center bg-slate-950/80 p-3 rounded-lg border border-slate-700">
              <span className="text-slate-400 font-bold">{curr}</span>
              <span className="text-emerald-400 font-mono text-xl font-bold">
                {results[curr].toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Rate Settings */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-500 transition-colors w-full"
        >
          <Settings size={16} /> 手動微調匯率 (點擊展開)
          <ChevronDown size={16} className={`ml-auto transform transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isSettingsOpen && (
          <div className="mt-4 space-y-3 animate-fadeIn border-t border-slate-800 pt-3">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">USD 對 TWD</label>
              <input 
                type="number" 
                value={rates.USD_TWD}
                onChange={(e) => setRates({...rates, USD_TWD: parseFloat(e.target.value)})}
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">USD 對 EGP</label>
              <input 
                type="number" 
                value={rates.USD_EGP}
                onChange={(e) => setRates({...rates, USD_EGP: parseFloat(e.target.value)})}
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">USD 對 MYR</label>
              <input 
                type="number" 
                value={rates.USD_MYR}
                onChange={(e) => setRates({...rates, USD_MYR: parseFloat(e.target.value)})}
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white outline-none focus:border-amber-500"
              />
            </div>
            <div className="text-xs text-slate-500 text-right mt-1 space-y-1">
              <div>當前推算: 1 EGP ≈ {EGP_TWD.toFixed(2)} TWD</div>
              <div>當前推算: 1 MYR ≈ {MYR_TWD.toFixed(2)} TWD</div>
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <button 
                onClick={fetchRates}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw size={10} /> 重抓網路匯率
              </button>
              <button 
                onClick={() => setRates(DEFAULT_RATES)}
                className="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                <Trash2 size={10} /> 重置為預設值
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Split Bill Components (Updated for Firebase with Currency) ---
const SplitBillTab = ({ expenses, onAddExpense, onDeleteExpense }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EGP'); // Default to EGP
  const [desc, setDesc] = useState('');
  const [payer, setPayer] = useState(MEMBERS[0]);
  const [sharers, setSharers] = useState(MEMBERS); // Default all
  const [isSharerOpen, setIsSharerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(itineraryData[0].date);

  // Hardcoded estimate rates for balance calculation only (simplify logic)
  const RATES = {
    EGP: 0.65, // 1 EGP = 0.65 TWD
    USD: 32.5, // 1 USD = 32.5 TWD
    TWD: 1,
    MYR: 7.3   // 1 MYR = 7.3 TWD
  };

  const handleAdd = () => {
    if (!amount || !desc || sharers.length === 0) return;
    onAddExpense({
      // No ID needed here, Firestore generates it
      amount: parseFloat(amount),
      currency,
      desc,
      payer,
      sharers,
      date: selectedDate,
      timestamp: Date.now() // For sorting
    });
    setAmount('');
    setDesc('');
    setSharers(MEMBERS); // Reset to all
    setIsSharerOpen(false);
  };

  const toggleSharer = (name) => {
    if (sharers.includes(name)) {
      setSharers(sharers.filter(s => s !== name));
    } else {
      setSharers([...sharers, name]);
    }
  };

  const calculateBalances = () => {
    const bal = {};
    MEMBERS.forEach(m => bal[m] = 0);
    expenses.forEach(e => {
      // Normalize amount to TWD for calculation
      const rate = RATES[e.currency] || 1;
      const amountInTWD = parseFloat(e.amount) * rate;
      
      const split = amountInTWD / e.sharers.length;
      bal[e.payer] += amountInTWD;
      e.sharers.forEach(s => {
        bal[s] -= split;
      });
    });
    return bal;
  };

  const balances = calculateBalances();

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Cloud Sync Status Indicator */}
      <div className="flex justify-end items-center gap-1 text-xs text-emerald-400 mb-[-10px]">
        <CloudLightning size={12} />
        <span>雲端同步中</span>
      </div>

      {/* Summary Section */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-amber-500 font-bold flex items-center gap-2">
            <DollarSign size={18} /> 結算預覽 (TWD)
          </h3>
          <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-1 rounded">
            *依參考匯率換算
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {MEMBERS.map(m => {
            const val = balances[m];
            const isPositive = val > 0;
            const isZero = Math.abs(val) < 1;
            return (
              <div key={m} className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-300 text-sm">{m}</span>
                <span className={`font-mono font-bold ${isZero ? 'text-slate-500' : isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {val > 0 ? '+' : ''}{Math.round(val)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="bg-slate-900 rounded-xl p-5 border border-amber-500/30 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full -mr-8 -mt-8"></div>
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Plus size={18} className="text-amber-500" /> 新增帳款
        </h3>
        
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">行程日期</label>
            <div className="relative">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none appearance-none"
              >
                {itineraryData.map((day, idx) => (
                  <option key={idx} value={day.date}>
                    {day.date} - {day.location.split(' ')[0]}...
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-slate-400 block mb-1">金額</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none"
              />
            </div>
            <div className="w-1/3">
              <label className="text-xs text-slate-400 block mb-1">幣值</label>
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none"
              >
                <option value="EGP">EGP</option>
                <option value="USD">USD</option>
                <option value="TWD">TWD</option>
                <option value="MYR">MYR</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">項目說明</label>
            <input 
              type="text" 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="例如: 晚餐, 計程車"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none"
            />
          </div>
          
          <div>
            <label className="text-xs text-slate-400 block mb-1">先墊錢的人</label>
            <div className="flex flex-wrap gap-2">
              {MEMBERS.map(m => (
                <button
                  key={m}
                  onClick={() => setPayer(m)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors border ${payer === m ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-950 text-slate-400 border-slate-700'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div 
              className="flex justify-between items-center cursor-pointer mb-2"
              onClick={() => setIsSharerOpen(!isSharerOpen)}
            >
              <label className="text-xs text-slate-400">分攤對象 ({sharers.length}人)</label>
              <div className="text-amber-500 text-xs flex items-center gap-1">
                {isSharerOpen ? '收起' : '選擇'} <ChevronDown size={14} className={`transform transition-transform ${isSharerOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
            
            {isSharerOpen && (
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800 animate-fadeIn">
                {MEMBERS.map(m => (
                  <div 
                    key={m} 
                    onClick={() => toggleSharer(m)}
                    className={`flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-slate-900 ${sharers.includes(m) ? 'text-blue-400' : 'text-slate-600'}`}
                  >
                    {sharers.includes(m) ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    <span className="text-sm">{m}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="text-xs text-slate-500 mt-1">
              {!isSharerOpen && `目前: ${sharers.join(', ')}`}
            </div>
          </div>

          <button 
            onClick={handleAdd}
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold py-3 rounded-lg mt-2 hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
          >
            <Plus size={18} /> 加入帳款
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        <h3 className="text-slate-400 text-sm font-bold pl-1">帳款紀錄</h3>
        {expenses.length === 0 ? (
          <div className="text-center py-8 text-slate-600 text-sm italic border-2 border-dashed border-slate-800 rounded-xl">
            還沒有任何帳款紀錄
          </div>
        ) : (
          expenses.map(item => (
            <div key={item.firebaseId || item.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center group">
              <div>
                <div className="text-white font-bold">{item.desc}</div>
                <div className="text-xs text-slate-400 mt-1">
                  <span className="text-amber-500">{item.payer}</span> 先付 • <span className="text-slate-300">{item.date}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  分攤: {item.sharers.length === MEMBERS.length ? '全員' : item.sharers.join(' ')}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-emerald-400 font-mono font-bold block">{item.currency} {item.amount}</span>
                  {item.currency !== 'TWD' && (
                    <span className="text-[10px] text-slate-600 block">≈ {Math.round(item.amount * RATES[item.currency])} TWD</span>
                  )}
                </div>
                <button 
                  onClick={() => onDeleteExpense(item.firebaseId)}
                  className="text-slate-600 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);

  // --- Auth Effect (Anonymous Auth for Private Project) ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.error("Auth error:", error);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // --- Firestore Sync Effect ---
  useEffect(() => {
    if (!user) return;
    
    // Use a shared public collection for this app instance
    const collectionRef = collection(db, 'artifacts', appId, 'public', 'data', 'expenses');
    // Simple query (Rule 2: No orderBy in initial query if possible, or simple sorting)
    const q = query(collectionRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ 
        firebaseId: doc.id, 
        ...doc.data() 
      }));
      
      // Sort in memory (Rule 2) by timestamp descending
      data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      
      setExpenses(data);
    }, (error) => {
      console.error("Firestore sync error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // --- Actions ---
  const addExpense = async (newEx) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'expenses'), newEx);
    } catch (e) {
      console.error("Error adding doc:", e);
    }
  };

  const deleteExpense = async (id) => {
    if (!user || !id) return;
    try {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'expenses', id));
    } catch (e) {
      console.error("Error deleting doc:", e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-24 max-w-md mx-auto relative shadow-2xl overflow-hidden">
      {/* Background Texture (Abstract) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      {/* Header */}
      <div className="bg-slate-900 px-6 py-6 sticky top-0 z-20 border-b border-slate-800/80 backdrop-blur-md bg-opacity-90">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-600">
              EGYPT 2026
            </h1>
            <p className="text-xs text-slate-400 tracking-widest mt-1">THE PHARAOH'S JOURNEY</p>
          </div>
          <div className="bg-amber-500/10 p-2 rounded-full border border-amber-500/30">
            <span className="text-xl">🐪</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === 'itinerary' && (
          <div className="space-y-2 animate-fadeIn">
            {itineraryData.map((day, idx) => (
              <DayCard key={idx} day={day} />
            ))}
          </div>
        )}

        {activeTab === 'split' && (
           <SplitBillTab 
             expenses={expenses} 
             onAddExpense={addExpense} 
             onDeleteExpense={deleteExpense}
           />
        )}
        
        {activeTab === 'currency' && <CurrencyTab />}
        
        {activeTab === 'history' && <HistoryTab />}
        
        {activeTab === 'food' && <FoodTab />}

        {activeTab === 'tips' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-6">
              <h3 className="text-amber-500 font-bold mb-2">旅遊叮嚀</h3>
              <p className="text-sm text-slate-400">
                埃及是一個充滿驚喜與挑戰的國家，做好準備能讓旅程更完美。這裡整理了最重要的生存法則。
              </p>
            </div>
            {tipsData.map((tip, idx) => (
              <TipsCard key={idx} tip={tip} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900 border-t border-slate-800 z-30 px-2 py-2 pb-6">
        <div className="flex justify-between items-center px-1">
          <button 
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${activeTab === 'itinerary' ? 'text-amber-400' : 'text-slate-600'}`}
          >
            <Calendar size={18} />
            <span className="text-[9px] font-bold">行程</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('split')}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${activeTab === 'split' ? 'text-amber-400' : 'text-slate-600'}`}
          >
            <DollarSign size={18} />
            <span className="text-[9px] font-bold">分帳</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('currency')}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${activeTab === 'currency' ? 'text-amber-400' : 'text-slate-600'}`}
          >
            <Calculator size={18} />
            <span className="text-[9px] font-bold">匯率</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${activeTab === 'history' ? 'text-amber-400' : 'text-slate-600'}`}
          >
            <Scroll size={18} />
            <span className="text-[9px] font-bold">歷史</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('food')}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${activeTab === 'food' ? 'text-amber-400' : 'text-slate-600'}`}
          >
            <UtensilsCrossed size={18} />
            <span className="text-[9px] font-bold">美食</span>
          </button>

          <button 
            onClick={() => setActiveTab('tips')}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${activeTab === 'tips' ? 'text-amber-400' : 'text-slate-600'}`}
          >
            <BookOpen size={18} />
            <span className="text-[9px] font-bold">叮嚀</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
