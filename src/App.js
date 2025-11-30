import React, { useState, useEffect } from "react";
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
} from "lucide-react";

// --- Firebase Imports ---
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";

// --- Firebase Initialization (User Provided Config) ---
const firebaseConfig = {
  apiKey: "AIzaSyCbUoTxQQFhCAURUMJ8VyuvRs9V6qh9Phw",
  authDomain: "egypt-cedd1.firebaseapp.com",
  projectId: "egypt-cedd1",
  storageBucket: "egypt-cedd1.firebasestorage.app",
  messagingSenderId: "532256791808",
  appId: "1:532256791808:web:55f07775ae8ba9926f67e5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// 設定一個固定的專案 ID，確保所有人的資料都寫入同一個路徑
const appId = "egypt-trip-2026-group-share";

// --- Constants ---
const MEMBERS = ["智斌", "佳靜", "宜蓁", "美琴", "淑芬", "詠涵"];

// --- Data: Mythology & History (Text Only, Deep Dive) ---
const mythologyData = [
  {
    title: "諸神圖鑑：解讀壁畫的鑰匙",
    desc: "在神廟牆上看到他們，不用再問導遊「這是誰」！",
    items: [
      {
        name: "太陽神 拉 (Ra)",
        role: "眾神之王 / 創世之神",
        feature: "鷹頭人身 + 頭頂紅色太陽圓盤 + 盤上盤繞著眼鏡蛇",
        story: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500">【創世傳說】</strong>
              <br />
              古埃及人相信，世界原本是一片混沌的深淵之水。拉神從這片水中自我誕生，並創造了空氣、水和土地，隨後創造了眾神與人類。他是生命的源頭，也是法老權力的終極象徵。自第四王朝開始，法老就被稱為
              <span className="text-amber-400 font-bold">「拉之子」</span>。
            </p>
            <p className="mb-3">
              <strong className="text-amber-500">【日與夜的永恆戰役】</strong>
              <br />
              拉神每天乘坐著
              <span className="text-amber-400 font-bold">「太陽船」</span>
              在天空中航行，帶來光明。每當日落，他便進入黑暗的冥界（Duat）。在冥界的十二個小時中，他必須穿越十二道大門，並與試圖吞噬太陽的
              <span className="text-amber-400 font-bold">
                混沌巨蛇阿佩普 (Apep)
              </span>{" "}
              進行殊死搏鬥。每天清晨的日出，象徵著拉神再次戰勝了死亡與黑暗，世界秩序（Maat）得以重生。
            </p>
            <p>
              <strong className="text-amber-500">【神廟看點】</strong>
              <br />
              在新王國時期（如卡奈克神廟），拉神常與底比斯的主神阿蒙結合，成為
              <span className="text-amber-400 font-bold">
                「阿蒙-拉 (Amun-Ra)」
              </span>
              ，成為全埃及最強大的國家神。您可以注意看神像頭上的羽毛冠中間是否有太陽盤，那就是融合的象徵。
            </p>
          </>
        ),
      },
      {
        name: "歐西里斯 (Osiris)",
        role: "冥界之王 / 復活之神",
        feature: "綠色或黑色皮膚 + 全身白色木乃伊包紮 + 雙手交叉持彎鉤與連枷",
        story: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500">【埃及第一位木乃伊】</strong>
              <br />
              歐西里斯原本是人間的國王，仁慈且賢明，卻被嫉妒的弟弟
              <span className="text-amber-400 font-bold">賽特 (Seth)</span>{" "}
              謀殺並分屍成14塊，散落在埃及各地。他的妻子伊西斯歷經千辛萬苦找回屍塊（除了被魚吃掉的生殖器），用魔法將他拼湊並製作成
              <span className="text-amber-400 font-bold">第一具木乃伊</span>
              ，讓他復活。
            </p>
            <p className="mb-3">
              <strong className="text-amber-500">【死後審判的主宰】</strong>
              <br />
              復活後的歐西里斯無法回到人間，因此成為了
              <span className="text-amber-400 font-bold">冥界的主宰</span>
              。所有死者的靈魂都必須來到他面前接受審判。他的
              <span className="text-amber-400 font-bold">綠色皮膚</span>
              象徵著植物的發芽與尼羅河的氾濫，代表著死亡之後必有新生。
            </p>
            <p>
              <strong className="text-amber-500">【神廟看點】</strong>
              <br />
              在帝王谷的陵墓壁畫中，您常會看到法老被一位綠色皮膚的神擁抱，那就是歐西里斯在歡迎法老進入永恆的來世。
            </p>
          </>
        ),
      },
      {
        name: "伊西斯 (Isis)",
        role: "魔法女神 / 完美的母親",
        feature: "頭頂「王座」象形符號 或 頭戴牛角夾著太陽盤",
        story: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500">【偉大的守護者】</strong>
              <br />
              她是歐西里斯的妻子，也是荷魯斯的母親。在丈夫被殺後，她用強大的魔法讓他短暫復活並受孕生下了荷魯斯。為了躲避賽特的追殺，她帶著強褓中的荷魯斯躲在尼羅河三角洲的蘆葦叢中，展現了無比堅韌的
              <span className="text-amber-400 font-bold">母愛</span>。
            </p>
            <p className="mb-3">
              <strong className="text-amber-500">【王權的象徵】</strong>
              <br />
              她的名字在古埃及語中意為
              <span className="text-amber-400 font-bold">「王座」</span>
              。在藝術形象中，她常跪在丈夫腳邊哀悼，或展開巨大的雙翅保護著法老。她是全埃及最受歡迎的女神，甚至到了羅馬時期，對伊西斯的崇拜還傳到了歐洲。
            </p>
            <p>
              <strong className="text-amber-500">【必訪神廟】</strong>
              <br />
              亞斯文的
              <span className="text-amber-400 font-bold">
                菲萊神廟 (Philae Temple)
              </span>{" "}
              就是專門供奉她的，是埃及最後一座關閉的異教神廟。
            </p>
          </>
        ),
      },
      {
        name: "荷魯斯 (Horus)",
        role: "法老守護神 / 天空之神",
        feature: "鷹頭人身 + 頭戴紅白雙王冠 (象徵統一上下埃及)",
        story: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500">【王子復仇記】</strong>
              <br />
              他是歐西里斯與伊西斯之子。長大後向殺父仇人賽特發起挑戰，歷經80年的大戰，終於戰勝賽特，奪回王位，統一了埃及。這也確立了法老統治的神聖性：每一位在世的法老，都被視為
              <span className="text-amber-400 font-bold">
                荷魯斯在人間的化身
              </span>
              。
            </p>
            <p className="mb-3">
              <strong className="text-amber-500">
                【荷魯斯之眼 (Wedjat)】
              </strong>
              <br />
              在與賽特的戰鬥中，荷魯斯的左眼被挖出並撕碎。後來由月神托特用魔法修復。這顆失而復得的眼睛被稱為「荷魯斯之眼」，成為了
              <span className="text-amber-400 font-bold">痊癒、保護與完整</span>
              最強大的護身符。您在市集看到的那些眼睛紀念品，就是這個典故！
            </p>
            <p>
              <strong className="text-amber-500">【必訪神廟】</strong>
              <br />
              <span className="text-amber-400 font-bold">
                艾德夫神廟 (Edfu Temple)
              </span>{" "}
              是全埃及保存最完整的荷魯斯神廟，門口那尊戴著皇冠的黑色花崗岩老鷹雕像，神氣非凡。
            </p>
          </>
        ),
      },
      {
        name: "阿努比斯 (Anubis)",
        role: "死神 / 防腐之神 / 墓地守護者",
        feature: "黑色胡狼頭人身",
        story: (
          <>
            <p className="mb-3">
              <strong className="text-amber-500">【木乃伊的製作師】</strong>
              <br />
              在歐西里斯神話中，阿努比斯協助伊西斯將歐西里斯製成了第一具木乃伊。因此，他在葬禮儀式中扮演關鍵角色，負責守護屍體不被野獸啃食（胡狼原本是食腐動物，古人將其神格化以求保護）。
            </p>
            <p className="mb-3">
              <strong className="text-amber-500">【心臟的秤量者】</strong>
              <br />
              這是他最重要的工作！在《亡靈書》描繪的最終審判中，阿努比斯負責操作巨大的
              <span className="text-amber-400 font-bold">真理天秤</span>
              。他將死者的心臟放在天秤一端，另一端放著象徵真理的「瑪特羽毛」。如果心臟比羽毛重（代表生前作惡多端），靈魂就會被怪獸阿米特吃掉；如果平衡，則可進入永生樂園。
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "法老記事：金字塔與神廟的主人們",
    desc: "按照歷史時間軸，認識這些偉大的建築師。",
    items: [
      {
        name: "【第3王朝】佐塞爾 (Djoser)",
        title: "金字塔鼻祖",
        site: "薩卡拉 (Saqqara)",
        story: (
          <>
            <p className="mb-2">
              <strong className="text-amber-500">劃時代的創新：</strong>
              <br />
              在此之前，法老的陵墓只是用泥磚蓋的長方形平頂墓（Mastaba）。佐塞爾想要一座與眾不同的永恆居所，他的天才宰相
              <span className="text-amber-400 font-bold">
                印何闐 (Imhotep)
              </span>{" "}
              提出了一個大膽的想法：將石造的馬斯塔巴一層層疊起來，越往上越小。
            </p>
            <p>
              這就是世界第一座金字塔——
              <span className="text-amber-400 font-bold">階梯金字塔</span>
              的誕生。它不僅是建築形式的突破，也是人類歷史上第一次大規模使用石材建築，象徵著法老可以沿著階梯登上天空，與太陽神結合。
            </p>
          </>
        ),
      },
      {
        name: "【第4王朝】斯尼夫魯 (Sneferu)",
        title: "最勤奮的實驗家 (古夫的爸爸)",
        site: "達舒爾 (Dahshur)",
        story: (
          <>
            <p className="mb-2">
              <strong className="text-amber-500">從失敗中追求完美：</strong>
              <br />
              他是金字塔演進史最關鍵的人物，一人就蓋了三座！
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>
                <span className="text-amber-400">美杜姆金字塔：</span>
                嘗試將階梯填平，但外殼崩塌失敗。
              </li>
              <li>
                <span className="text-amber-400">彎曲金字塔：</span>
                蓋到一半發現角度太陡（54度）地基受不了，緊急改成43度，變成特殊的「饅頭」形狀。
              </li>
              <li>
                <span className="text-amber-400">紅色金字塔：</span>
                吸取教訓，從一開始就用43度角，終於成功蓋出了歷史上第一座
                <span className="text-amber-400 font-bold">
                  真正的三角錐金字塔
                </span>
                。
              </li>
            </ul>
          </>
        ),
      },
      {
        name: "【第4王朝】古夫 (Khufu)",
        title: "巔峰締造者",
        site: "吉薩 (Giza)",
        story: (
          <>
            <p className="mb-2">
              <strong className="text-amber-500">世界七大奇蹟：</strong>
              <br />
              古夫繼承了父親斯尼夫魯的成功經驗與國力，在吉薩高地上建造了
              <span className="text-amber-400 font-bold">大金字塔</span>。
            </p>
            <p>
              這座金字塔高146公尺，由230萬塊巨石堆砌而成，每塊平均重2.5噸。在艾菲爾鐵塔建成前的3800年間，它一直是
              <span className="text-amber-400 font-bold">
                地球上最高的人造建築
              </span>
              。其方位對準正北的精確度，至今仍讓現代科學家驚嘆不已。
            </p>
          </>
        ),
      },
      {
        name: "【第19王朝】拉美西斯二世 (Ramesses II)",
        title: "建築狂人 / 太陽王",
        site: "阿布辛貝、路克索、卡奈克",
        story: (
          <>
            <p className="mb-2">
              <strong className="text-amber-500">
                我在哪裡，埃及就在哪裡：
              </strong>
              <br />
              他是古埃及在位最久（67年）、活得最老（90多歲）、生最多孩子（100多個）的法老。他也是最愛蓋神廟的法老，好大喜功的他，恨不得把自己的名字和雕像刻滿全埃及。
            </p>
            <p>
              他在阿布辛貝留下了震撼世人的巨像，在卡奈克留下了壯觀的列柱大廳，在路克索神廟留下了方尖碑。他也締結了人類歷史上第一份和平條約（與西臺人）。這趟旅程，您將隨處可見這位
              <span className="text-amber-400 font-bold">自戀又偉大</span>
              君王的痕跡。
            </p>
          </>
        ),
      },
    ],
  },
];

// --- Data: Food & Souvenir Map ---
const foodMapData = {
  Cairo: [
    {
      name: "Carrefour Maadi",
      type: "🛒 超市補給",
      address: "City Centre Maadi",
      note: "開羅最大的家樂福之一。買大瓶水(Nestle/Dasani)、洋芋片(Chipsy)、當地水果(草莓/石榴)最便宜。也有賣熟食烤雞。",
    },
    {
      name: "Abou Tarek",
      type: "國民美食 Koshary",
      address: "Downtown Cairo",
      note: "開羅最有名的一家！便宜大碗，體驗當地人生活首選。",
    },
    {
      name: "El Abd Patisserie",
      type: "老牌甜點店",
      address: "Downtown Cairo",
      note: "甜點與冰淇淋超有名，人手一支。",
    },
    {
      name: "Jordi Papyrus",
      type: "🛍️ 伴手禮: 紙莎草",
      address: "Khan el-Khalili",
      note: "台灣背包客推薦名店。價格公道，品質有保證，老闆對台灣人很友善。",
    },
    {
      name: "Golden Eagle",
      type: "🛍️ 伴手禮: 香精",
      address: "Giza Area",
      note: "許多團體會去的店，雖是觀光店但品質穩定。蓮花精油(助眠)、紙莎草精油(淡香)最熱門。",
    },
  ],
  Luxor: [
    {
      name: "Ar-Radwan Supermarket",
      type: "🛒 超市補給",
      address: "East Bank (近車站)",
      note: "路克索當地較具規模的超市，價格公道標價清楚。買優格、果汁、餅乾的好地方。",
    },
    {
      name: "Sofra Restaurant & Cafe",
      type: "埃及家常菜",
      address: "East Bank",
      note: "老宅改建，頂樓露台氣氛好，烤鴿子與塔吉鍋必點。",
    },
    {
      name: "Marsam Hotel",
      type: "庭園午餐",
      address: "West Bank",
      note: "位於西岸，環境清幽，深受考古學家喜愛，食物新鮮。",
    },
    {
      name: "Fair Trade Center",
      type: "🛍️ 伴手禮: 手工藝",
      address: "Luxor Temple附近",
      note: "公平貿易商店。販售木雕、編織品等，價格固定不二價，質感比市集好很多。",
    },
  ],
  Aswan: [
    {
      name: "Hayat Supermarket",
      type: "🛒 超市補給",
      address: "Corniche el-Nile",
      note: "位於尼羅河濱海大道旁，雖然不大但應有盡有，方便購買遊輪上需要的零食與水。",
    },
    {
      name: "Al Makka",
      type: "烤肉料理",
      address: "Souq Area",
      note: "市集附近的平價美味，烤雞和卡巴布很受歡迎。",
    },
    {
      name: "Aswan Spices Market",
      type: "🛍️ 伴手禮: 香料/洛神花",
      address: "Aswan Souq",
      note: "亞斯文的洛神花(Hibiscus)品質全埃及最好！還有花生、番紅花等香料，記得要殺價。",
    },
  ],
  Hurghada: [
    {
      name: "Spinneys (Senzo Mall)",
      type: "🛒 超市補給 (最大)",
      address: "Senzo Mall",
      note: "赫爾格達最大的大賣場！像台灣的愛買/大潤發。種類超多，適合在這裡一次買齊伴手禮(椰棗/紅茶/香料)，價格絕對比機場和觀光區便宜。",
    },
    {
      name: "Gomla Market",
      type: "🛒 超市補給",
      address: "Sheraton Road",
      note: "市區內的大型超市，不想跑太遠去Senzo Mall的另一選擇。",
    },
    {
      name: "Star Fish Restaurant",
      type: "海鮮大餐",
      address: "Sheraton Road",
      note: "當地最有名海鮮餐廳，水族箱現點現做，海鮮湯必喝。",
    },
  ],
};

// --- Data: Itinerary ---
const itineraryData = [
  {
    date: "1/26 (一)",
    location: "台北 -> 杜拜",
    weather: { temp: "22°C", icon: "moon", desc: "機上恆溫" },
    transport: [
      { type: "plane", text: "MH367 台北 15:10 -> 吉隆坡 20:05" },
      { type: "plane", text: "EK343 吉隆坡 01:25(+1) -> 杜拜" },
    ],
    activities: [{ name: "機上休息", note: "養精蓄銳，準備迎接古文明之旅" }],
    extra: {
      type: "food",
      title: "轉機小確幸",
      content:
        "杜拜機場第3航廈有 Shake Shack 漢堡，如果飛機餐沒吃飽，這是最受歡迎的快速美食。長輩若需休息，可利用免費的躺椅區 (Snooze Cube 附近)。",
    },
    stay: "機上",
  },
  {
    date: "1/27 (二)",
    location: "杜拜 -> 開羅",
    weather: { temp: "18°C", icon: "sun", desc: "晴朗乾燥" },
    transport: [
      { type: "plane", text: "EK927 杜拜 08:10 -> 開羅 10:25" },
      { type: "car", text: "機場接送至飯店" },
    ],
    activities: [
      {
        name: "薩拉丁城堡 & 阿里清真寺",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🏰 關於這裡：
              </strong>
              這座宏偉的城堡由抗擊十字軍的英雄薩拉丁於12世紀建造。城堡內最著名的
              <span className="text-amber-400 font-bold">阿里清真寺</span>
              ，因使用大量雪花石膏裝飾，在陽光下會發出柔和乳白色光芒。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              1. 站在
              <span className="text-pink-400 font-bold">中庭噴水池前</span>
              ，可以用廣角鏡頭拍出清真寺對稱的圓頂與尖塔，非常有氣勢。
              <br />
              2. 走到戶外觀景台的
              <span className="text-pink-400 font-bold">最角落</span>
              ，這裡可以將開羅老城區的密密麻麻建築與遠方的金字塔同框拍下。
            </p>
          </>
        ),
      },
      {
        name: "哈利利市集 (Khan el-Khalili)",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🏺 關於這裡：
              </strong>
              中東最古老的露天市集之一，充滿《一千零一夜》的異國情調。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              尋找掛滿
              <span className="text-pink-400 font-bold">彩色玻璃燈</span>
              的店家，請求老闆同意後，站在燈海中間拍照，臉部補點光，會拍出非常夢幻的照片。
            </p>
          </>
        ),
      },
      { name: "晚餐", note: "體驗當地埃及烤肉" },
    ],
    extra: {
      type: "secret",
      title: "老饕帶路 & 私房景點",
      content:
        "市集內有一家百年老店「Naguib Mahfouz Cafe」，是諾貝爾文學獎得主最愛的咖啡館。推薦進去喝杯「薄荷檸檬汁」或「芒果汁」，環境比外面的費沙維咖啡館更舒適、衛生，且冷氣夠強，非常適合長輩歇腳。",
    },
    stay: "開羅 (吉薩區 Giza)",
  },
  {
    date: "1/28 (三)",
    location: "開羅 (吉薩)",
    weather: { temp: "19°C", icon: "sun", desc: "陽光普照" },
    transport: [{ type: "car", text: "Uber 或 包車" }],
    activities: [
      {
        name: "大埃及博物館 (GEM)",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🏛️ 世紀工程：
              </strong>
              全球最大考古博物館，必看
              <span className="text-amber-400 font-bold">圖坦卡門黃金面具</span>
              與拉美西斯二世巨像。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              1. 入口處的
              <span className="text-pink-400 font-bold">懸掛方尖碑</span>
              ，站在下方仰拍，視覺張力極強。
              <br />
              2.{" "}
              <span className="text-pink-400 font-bold">
                大階梯 (Grand Staircase)
              </span>
              ：站在階梯底部往上拍，可以拍到歷代法老石像列隊歡迎您的壯觀畫面。
            </p>
          </>
        ),
      },
      {
        name: "科普特開羅 (懸空教堂)",
        guide: "建立在羅馬堡壘上的教堂，地板有玻璃可看見下方舊堡壘。",
      },
      { name: "飯店休息", note: "欣賞金字塔夜景" },
    ],
    extra: {
      type: "food",
      title: "道地美食體驗",
      content:
        "如果想嘗試埃及國民美食「Koshary (庫莎麗)」，推薦名店「Abou Tarek」。它是麵、飯、通心粉混在一起淋上番茄醬與炸洋蔥，口感非常特別且便宜，是體驗當地生活的首選。",
    },
    stay: "開羅 (吉薩區 Giza)",
  },
  {
    date: "1/29 (四)",
    location: "吉薩 -> 亞斯文",
    weather: { temp: "23°C", icon: "sun", desc: "南部溫暖" },
    transport: [
      { type: "car", text: "包車前往金字塔區" },
      { type: "plane", text: "晚班機 開羅 -> 亞斯文" },
    ],
    activities: [
      {
        name: "吉薩金字塔群",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                📐 世界奇蹟：
              </strong>
              古代世界七大奇蹟中唯一碩果僅存的建築。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              1. <span className="text-pink-400 font-bold">Pizza Hut 頂樓</span>
              ：這是公開的秘密，點杯可樂就能在頂樓拍到人面獅身與金字塔對望的經典畫面，且不用曬太陽。
              <br />
              2. <span className="text-pink-400 font-bold">Panorama Point</span>
              ：只有這裡能拍到「三座金字塔並排」的全景，適合拍手抓金字塔的借位照。
            </p>
          </>
        ),
      },
      {
        name: "人面獅身像 (Sphinx)",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🦁 守護者：
              </strong>
              長73公尺的巨大石像，臉部據說是依照卡夫拉法老雕刻。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              利用錯位技巧，拍攝
              <span className="text-pink-400 font-bold">「親吻人面獅身」</span>
              或「給獅身戴墨鏡」的趣味照片，這是來埃及必拍的打卡照！
            </p>
          </>
        ),
      },
    ],
    extra: {
      type: "secret",
      title: "景觀餐廳推薦",
      content:
        "午餐極力推薦「9 Pyramids Lounge」。這是在金字塔景區內唯一的景觀餐廳，坐在貝都因式的軟墊上，金字塔就在眼前觸手可及，雖然價格稍高但絕對值回票價 (需預約)。",
    },
    stay: "亞斯文 (Aswan 市區)",
  },
  {
    date: "1/30 (五)",
    location: "亞斯文",
    weather: { temp: "24°C", icon: "sun", desc: "舒適宜人" },
    transport: [
      { type: "ship", text: "渡船前往神廟" },
      { type: "ship", text: "Felucca 風帆船" },
    ],
    activities: [
      {
        name: "菲萊神廟 (Philae Temple)",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🌺 尼羅河珍珠：
              </strong>
              供奉愛神伊西斯，神廟位於島上，需搭船前往。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              在搭乘接駁小船
              <span className="text-pink-400 font-bold">靠近神廟時</span>
              ，從水面上拍攝神廟全景是最美的角度。島上有一座羅馬式的
              <span className="text-pink-400 font-bold">
                圖拉真涼亭 (Trajan's Kiosk)
              </span>
              ，是完美的方形構圖框。
            </p>
          </>
        ),
      },
      {
        name: "尼羅河風帆船夕陽巡航",
        guide: "體驗完全靠風力行駛的古老帆船，非常安靜放鬆。",
      },
    ],
    extra: {
      type: "secret",
      title: "貴族下午茶",
      content:
        "如果有時間，推薦去「Old Cataract Hotel (老瀑布飯店)」喝下午茶。這裡是《尼羅河慘案》作者阿嘉莎·克莉絲蒂寫作的地方。坐在露台看著尼羅河上的風帆點點，是亞斯文最優雅的享受。",
    },
    stay: "亞斯文 (Aswan)",
  },
  {
    date: "1/31 (六)",
    location: "亞斯文 -> 郵輪",
    weather: { temp: "12°C-25°C", icon: "sun", desc: "清晨寒冷" },
    transport: [
      { type: "car", text: "清晨 04:00 參加 Tour" },
      { type: "ship", text: "下午登船 (郵輪 Check-in)" },
    ],
    activities: [
      {
        name: "阿布辛貝神廟 (Abu Simbel)",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                👑 法老的野心：
              </strong>
              門口四尊巨大的拉美西斯二世坐像震懾人心。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              1. 站在
              <span className="text-pink-400 font-bold">最右邊法老腳邊</span>
              往上仰拍，可以凸顯雕像的巨大與人類的渺小。
              <br />
              2.
              別忘了拍隔壁愛妻奈菲爾塔莉神廟，兩座神廟同時入鏡需要退到廣場遠處用全景模式。
            </p>
          </>
        ),
      },
      { name: "康翁波神廟 (Kom Ombo)", guide: "雙神廟與鱷魚木乃伊博物館。" },
    ],
    extra: {
      type: "secret",
      title: "隱藏版博物館",
      content:
        "在康翁波神廟出口處，有一個小型的「鱷魚博物館 (Crocodile Museum)」，裡面展示了真實的古代鱷魚木乃伊，冷氣很強，參觀完神廟後很適合進去降溫兼長知識。",
    },
    stay: "尼羅河郵輪 (5星級)",
  },
  {
    date: "02/01 (日)",
    location: "郵輪航行",
    weather: { temp: "25°C", icon: "sun", desc: "河上微風" },
    transport: [
      { type: "car", text: "馬車往返神廟" },
      { type: "ship", text: "郵輪航行" },
    ],
    activities: [
      {
        name: "艾德夫神廟 (Temple of Edfu)",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🦅 老鷹神之家：
              </strong>
              埃及保存最完整的神廟。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              門口那尊戴著雙冠的
              <span className="text-pink-400 font-bold">荷魯斯老鷹石像</span>
              是明星，務必合照（模仿老鷹姿勢更有趣）。進門後的第一塔門非常高大，建議使用手機的
              <span className="text-pink-400 font-bold">全景模式直拍</span>
              才能將整座塔門收入鏡頭。
            </p>
          </>
        ),
      },
      { name: "享受郵輪設施", note: "下午茶、泳池、日光浴" },
    ],
    extra: {
      type: "food",
      title: "郵輪上的驚喜",
      content:
        "郵輪通常會在通過伊斯納水閘後舉辦「埃及之夜 (Galabeya Party)」，建議在岸上市集先買好一件埃及長袍 (約 100-200 EGP)，晚上穿著參加派對會更有趣！",
    },
    stay: "尼羅河郵輪",
  },
  {
    date: "02/02 (一)",
    location: "路克索 (東岸)",
    weather: { temp: "26°C", icon: "sun", desc: "熱情古都" },
    transport: [
      { type: "ship", text: "郵輪 Check-out" },
      { type: "car", text: "市區計程車/馬車" },
    ],
    activities: [
      {
        name: "卡奈克神廟 (Karnak Temple)",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🏛️ 巨柱大廳：
              </strong>
              134根參天巨柱，電影《尼羅河慘案》場景。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              在巨柱大廳中，尋找
              <span className="text-pink-400 font-bold">光線射入柱間</span>
              的角度，可以拍出極具神祕感的剪影照。記得用廣角鏡頭由下往上拍，展現柱子的氣勢。
            </p>
          </>
        ),
      },
      {
        name: "路克索神廟 (Luxor Temple)",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🌙 夜訪神廟：
              </strong>
              建議傍晚參觀，體驗燈光下的神廟。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              入口處的
              <span className="text-pink-400 font-bold">
                方尖碑與拉美西斯坐像
              </span>
              。夜晚打燈後，石像的輪廓會更深邃，比白天更有立體感。
            </p>
          </>
        ),
      },
    ],
    extra: {
      type: "food",
      title: "路克索必吃",
      content:
        "極力推薦「Sofra Restaurant & Cafe」。這是一間老宅改建的餐廳，頂樓露台氣氛極佳，提供最道地的埃及菜（推薦烤鴿子、塔吉鍋）。生意非常好，建議請導遊幫忙提前預訂。",
    },
    stay: "路克索「東岸」市區飯店",
  },
  {
    date: "02/03 (二)",
    location: "路克索 (西岸)",
    weather: { temp: "26°C", icon: "sun", desc: "乾燥炎熱" },
    transport: [{ type: "car", text: "包車過河至西岸" }],
    activities: [
      {
        name: "帝王谷 & 女王神廟",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                ⛰️ 帝王谷：
              </strong>
              法老的長眠之地，壁畫色彩鮮豔如新。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              女王神廟（Hatshepsut）：站在
              <span className="text-pink-400 font-bold">第二層露台的中間</span>
              ，背對神廟，可以拍出長長的引道與遠方的綠洲，視野非常開闊。
            </p>
          </>
        ),
      },
      { name: "曼儂巨像", note: "路過拍照點" },
    ],
    extra: {
      type: "secret",
      title: "藝術家村落午餐",
      content:
        "西岸有一家「Marsam Hotel」，深受考古學家和藝術家喜愛。它的庭院午餐非常幽靜，食物新鮮乾淨。如果您看膩了神廟，這裡是一個可以安靜喘口氣的綠洲。",
    },
    stay: "路克索「西岸」特色民宿",
  },
  {
    date: "02/04 (三)",
    location: "路克索 -> 赫爾格達",
    weather: { temp: "10°C-25°C", icon: "sun", desc: "日出微涼" },
    transport: [
      { type: "plane", text: "熱氣球接送" },
      { type: "car", text: "包車/巴士前往紅海" },
    ],
    activities: [
      {
        name: "熱氣球飛行 (日出)",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🎈 上帝視角：
              </strong>
              俯瞰帝王谷與尼羅河的日出。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              當熱氣球飛過
              <span className="text-pink-400 font-bold">尼羅河上方</span>
              時，注意看水面的倒影。另外，當其他熱氣球作為背景時，是拍攝人像的最佳時機。
            </p>
          </>
        ),
      },
    ],
    extra: {
      type: "food",
      title: "紅海海鮮大餐",
      content:
        "抵達赫爾格達後，晚餐推薦去「Star Fish Restaurant」。這是當地最有名的海鮮餐廳，門口的水族箱很壯觀，海鮮湯和烤魚非常新鮮美味。",
    },
    stay: "赫爾格達 (Hurghada) 全包式度假村",
  },
  {
    date: "02/05 (四)",
    location: "赫爾格達 (紅海)",
    weather: { temp: "24°C", icon: "sun", desc: "海風徐徐" },
    transport: [{ type: "ship", text: "出海船潛" }],
    activities: [
      {
        name: "紅海出海 (浮潛/深潛)",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🐠 海底世界：
              </strong>
              世界級潛點，海水清澈湛藍。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              如果不能下水，穿著
              <span className="text-pink-400 font-bold">亮色泳衣</span>
              趴在船頭甲板上，以湛藍大海為背景俯拍，非常有度假雜誌封面的感覺。
            </p>
          </>
        ),
      },
    ],
    extra: {
      type: "secret",
      title: "夜間散步路線",
      content:
        "晚上可以去「Hurghada Marina (碼頭區)」散步。這裡有漂亮的步道、遊艇和各式餐廳，氣氛非常Chill，很適合長輩飯後散步，也不會有市區那種擁擠吵雜的拉客推銷。",
    },
    stay: "赫爾格達 (Hurghada)",
  },
  {
    date: "02/06 (五)",
    location: "赫爾格達 -> 開羅",
    weather: { temp: "20°C", icon: "cloud", desc: "舒適" },
    transport: [{ type: "plane", text: "下午/晚上 赫爾格達 -> 開羅" }],
    activities: [{ name: "飯店設施 / 沙灘放空", note: "把握最後海邊時光" }],
    extra: {
      type: "secret",
      title: "開羅富人區體驗",
      content:
        "回到開羅若有時間，晚餐可前往 Zamalek 島上的「Abou El Sid」。這家餐廳裝潢非常有埃及復古風情，提供精緻的埃及傳統菜，是許多外國使節和當地名流的最愛。",
    },
    stay: "開羅 (近吉薩或沙漠公路)",
  },
  {
    date: "02/07 (六)",
    location: "黑白沙漠",
    weather: { temp: "8°C-20°C", icon: "sun", desc: "日夜溫差大" },
    transport: [{ type: "car", text: "吉普車進沙漠" }],
    activities: [
      {
        name: "黑白沙漠探險",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🍄 蘑菇石與小雞石：
              </strong>
              風化形成的奇特白堊岩地貌。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              1. <span className="text-pink-400 font-bold">夕陽剪影</span>
              ：趁著太陽下山前，站在蘑菇石上（如果不高）或旁邊，拍攝剪影照。
              <br />
              2. <span className="text-pink-400 font-bold">星空合影</span>
              ：沙漠光害極低，如果手機有夜景模式或帶了腳架，一定要拍一張以銀河為背景的照片。
            </p>
          </>
        ),
      },
    ],
    extra: {
      type: "secret",
      title: "貝都因營火晚會",
      content:
        "晚上的重頭戲是貝都因司機準備的營火晚餐。雖然簡單（通常是烤雞和飯），但在星空下圍著營火吃特別香。記得請司機煮一壺「沙漠紅茶」，超級甜但超級好喝！",
    },
    stay: "B&W Sahara Sky Camp",
  },
  {
    date: "02/08 (日)",
    location: "沙漠 -> 開羅",
    weather: { temp: "20°C", icon: "sun", desc: "晴朗" },
    transport: [{ type: "car", text: "返回開羅" }],
    activities: [{ name: "返回開羅", note: "市區晚餐" }],
    extra: {
      type: "food",
      title: "甜點控注意",
      content:
        "回到開羅市區，一定要去買「El Abd Patisserie」的冰淇淋或甜點。這是開羅最老牌的甜點店，就在熱鬧的市中心，人手一支冰淇淋是標準配備。",
    },
    stay: "開羅 (Cairo)",
  },
  {
    date: "02/09 (一)",
    location: "開羅 (薩卡拉)",
    weather: { temp: "19°C", icon: "sun", desc: "晴朗" },
    transport: [{ type: "car", text: "全日包車" }],
    activities: [
      {
        name: "階梯金字塔 & 紅色金字塔",
        guide: (
          <>
            <p className="mb-4">
              <strong className="text-amber-400 text-xl block mb-2">
                🏗️ 金字塔演進史：
              </strong>
              從階梯狀到真正的三角錐體。
            </p>
            <p className="mb-4">
              <strong className="text-pink-400 text-xl block mb-2">
                📸 絕佳機位：
              </strong>
              階梯金字塔前有一個
              <span className="text-pink-400 font-bold">神殿廊柱廳</span>
              ，站在廊柱中間往外拍，可以利用光影線條拍出非常有深度的照片，是網美最愛的打卡點。
            </p>
          </>
        ),
      },
    ],
    extra: {
      type: "secret",
      title: "神秘的地下公牛墓",
      content:
        "在薩卡拉景區內，有一個容易被錯過的景點「Serapeum (塞拉比尤姆)」。這裡是古代埋葬聖牛的地下墓穴，巨大的花崗岩石棺重達數十噸，至今仍是不解之謎。通道寬敞涼爽，非常值得一看。",
    },
    stay: "開羅 (Cairo)",
  },
  {
    date: "2/10 (二)",
    location: "開羅 -> 杜拜",
    weather: { temp: "20°C", icon: "plane", desc: "返程" },
    transport: [
      { type: "car", text: "前往機場" },
      { type: "plane", text: "EK928 開羅 12:30 -> 杜拜" },
    ],
    activities: [{ name: "告別埃及", note: "最後採買與打包" }],
    extra: {
      type: "food",
      title: "最後的埃及味",
      content:
        "開羅機場出關後，餐廳選擇不多且貴。建議在進機場前先吃飽，或是買一些麵包帶著。",
    },
    stay: "機上",
  },
  {
    date: "2/11 (三)",
    location: "杜拜 -> 吉隆坡",
    weather: { temp: "30°C", icon: "cloud", desc: "濕熱" },
    transport: [
      { type: "plane", text: "EK342 杜拜 04:05 -> 吉隆坡 15:15" },
      { type: "train", text: "KLIA Ekspres 機場快線" },
    ],
    activities: [{ name: "吉隆坡市區觀光", note: "雙子星塔、黑風洞" }],
    extra: {
      type: "food",
      title: "大馬美食慰勞",
      content:
        "吃了十幾天的埃及菜，現在最需要的是華人美食！去亞羅街吃「黃亞華小食店」的烤雞翅和福建麵，絕對能撫慰您的亞洲胃。",
    },
    stay: "吉隆坡 (KL Sentral 附近)",
  },
  {
    date: "2/12 (四)",
    location: "吉隆坡 -> 台北",
    weather: { temp: "22°C", icon: "cloud", desc: "回家" },
    transport: [
      { type: "train", text: "KLIA Ekspres 機場快線" },
      { type: "plane", text: "MH366 吉隆坡 09:20 -> 台北 14:10" },
    ],
    activities: [{ name: "抵達溫暖的家", note: "整理照片與回憶" }],
    extra: {
      type: "secret",
      title: "照片備份提醒",
      content:
        "埃及風沙大，相機或手機鏡頭容易髒，整理照片時記得先清潔。建議將這次旅程的照片製作成一本相片書，是給長輩最好的回憶禮物。",
    },
    stay: "甜蜜的家",
  },
];

// --- Data: Tips & Tools (Unchanged) ---
const tipsData = [
  {
    category: "必買伴手禮",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    icon: <ShoppingBag size={20} />,
    items: [
      "紙莎草畫 (Papyrus): 請認明專賣店，路邊很多假香蕉葉做的。",
      "香精油 (Perfume Oil): 埃及是香水原料大國，蓮花精油最經典。",
      "雪花石膏 (Alabaster): 亞斯文特產，透光性佳。",
      "椰棗 (Dates): 便宜好吃，適合送禮。",
      "涅菲爾塔莉天然香皂/保養品。",
    ],
  },
  {
    category: "防騙秘笈",
    color: "bg-red-100 text-red-800 border-red-300",
    icon: <AlertTriangle size={20} />,
    items: [
      "No Free Gift: 手裡被塞東西要立刻拒絕，拿了就要錢。",
      "駱駝/馬車: 上去前講好價錢，下來時可能會變卦，建議備好零錢直接給剛好。",
      "主動幫忙拍照: 通常拍完會要小費。",
      "One Dollar: 聽到這個不要隨便回頭。",
      "廁所: 大部分景點廁所都要收費 (5-10 EGP)，自備零錢。",
    ],
  },
  {
    category: "簽證 & 網路",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    icon: <Wifi size={20} />,
    items: [
      "簽證: 落地簽 25 USD (只收現金，建議自備剛好)。",
      "網卡: 推薦 Orange 或 Vodafone，訊號覆蓋率較好。機場出關即可辦理。",
      "電壓: 220V，雙圓孔插座 (歐規)。",
    ],
  },
  {
    category: "衣著建議",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    icon: <Shirt size={20} />,
    items: [
      "洋蔥式穿搭: 早晚溫差極大 (沙漠區更明顯)。",
      "保守為主: 參觀清真寺需長褲/長裙，女性需包頭巾。",
      "鞋子: 好走的運動鞋 (神廟路不平、沙漠沙子多)。",
      "防曬: 帽子、墨鏡、防曬乳是必需品。",
    ],
  },
  {
    category: "小費文化 (Baksheesh)",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    icon: <Info size={20} />,
    items: [
      "是埃及文化一部分，不是額外獎賞。",
      "行李搬運: 20-30 EGP / 件。",
      "公廁: 5-10 EGP。",
      "司機/導遊: 視服務天數與品質而定，通常全天導遊約 10-15 USD/人。",
    ],
  },
];

// --- Components ---

const WeatherBadge = ({ weather }) => {
  const getIcon = () => {
    switch (weather.icon) {
      case "sun":
        return <Sun size={14} className="text-amber-500" />;
      case "cloud":
        return <CloudSun size={14} className="text-gray-400" />;
      case "moon":
        return <Moon size={14} className="text-indigo-400" />;
      case "plane":
        return <Plane size={14} className="text-blue-400" />;
      default:
        return <Sun size={14} />;
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
      case "plane":
        return <Plane size={16} />;
      case "car":
        return <Car size={16} />;
      case "ship":
        return <Ship size={16} />;
      case "train":
        return (
          <div className="text-xs font-bold border border-current px-1 rounded">
            TR
          </div>
        );
      default:
        return <Car size={16} />;
    }
  };

  return (
    <div className="flex items-start gap-3 text-sm text-slate-400 mb-2">
      <div className="mt-0.5 text-blue-400">{getIcon()}</div>
      <div className="flex-1">{item.text}</div>
    </div>
  );
};

const ActivityItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-amber-500">
          <Camera size={18} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-200 text-base">{item.name}</h4>
          {item.note && (
            <p className="text-sm text-slate-400 mt-1">{item.note}</p>
          )}

          {item.guide && (
            <div className="mt-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors bg-amber-900/40 px-3 py-1.5 rounded-full border border-amber-900/50"
              >
                {isOpen ? <ChevronUp size={16} /> : <BookOpen size={16} />}
                {isOpen ? "收起介紹" : "📖 導遊解說 (點我展開)"}
              </button>

              {isOpen && (
                <div className="mt-3 p-4 bg-slate-800/95 rounded-xl border-l-4 border-amber-500 text-slate-200 animate-fadeIn shadow-2xl">
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
      case "food":
        return <UtensilsCrossed size={16} />;
      case "secret":
        return <Sparkles size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  const getColorClass = () => {
    switch (info.type) {
      case "food":
        return "bg-orange-900/30 text-orange-200 border-orange-700/50";
      case "secret":
        return "bg-pink-900/30 text-pink-200 border-pink-700/50";
      default:
        return "bg-slate-800 text-slate-200 border-slate-700";
    }
  };

  return (
    <div
      className={`mt-4 rounded-xl p-3 border ${getColorClass()} relative overflow-hidden`}
    >
      <div className="flex items-center gap-2 font-bold mb-1 text-sm">
        {getIcon()}
        {info.title}
      </div>
      <p className="text-sm opacity-90 leading-relaxed">{info.content}</p>
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
      {day.extra && <ExtraInfoBadge info={day.extra} />}
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
          <li key={idx} className="mb-1">
            {item}
          </li>
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
        <div
          key={idx}
          className="bg-slate-900 rounded-xl p-5 border border-slate-800"
        >
          <h3 className="text-xl font-bold text-amber-500 mb-2 flex items-center gap-2">
            {idx === 0 ? <Scroll size={24} /> : <Crown size={24} />}
            {section.title}
          </h3>
          <p className="text-sm text-slate-400 mb-5 border-b border-slate-800 pb-3">
            {section.desc}
          </p>

          <div className="space-y-6">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="bg-slate-950/50 rounded-lg border border-slate-800 overflow-hidden p-5"
              >
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
                      <span className="text-slate-500 block mb-1 text-xs font-bold uppercase tracking-wider">
                        特徵辨識
                      </span>
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
          包含餐廳、伴手禮店與
          <span className="text-amber-400 font-bold">大型超市</span>。點擊「📍
          導航」按鈕，可直接開啟 Google 地圖。
        </p>
      </div>

      {Object.entries(foodMapData).map(([city, shops], idx) => (
        <div key={idx}>
          <h4 className="text-lg font-bold text-slate-200 mb-3 pl-2 border-l-4 border-amber-500">
            {city === "Cairo"
              ? "開羅 Cairo"
              : city === "Luxor"
              ? "路克索 Luxor"
              : city === "Aswan"
              ? "亞斯文 Aswan"
              : "赫爾格達 Hurghada"}
          </h4>
          <div className="grid gap-4">
            {shops.map((shop, i) => (
              <div
                key={i}
                className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-white text-lg flex items-center gap-2 flex-wrap">
                      {shop.name}
                      {shop.type.includes("伴手禮") && (
                        <Gift size={16} className="text-pink-400" />
                      )}
                      {shop.type.includes("超市") && (
                        <ShoppingCart size={16} className="text-green-400" />
                      )}
                    </h5>
                    <span
                      className={`text-xs px-2 py-0.5 rounded mt-1 inline-block border ${
                        shop.type.includes("伴手禮")
                          ? "text-pink-400 bg-pink-950/30 border-pink-900/30"
                          : shop.type.includes("超市")
                          ? "text-green-400 bg-green-950/30 border-green-900/30"
                          : "text-amber-400 bg-amber-950/30 border-amber-900/30"
                      }`}
                    >
                      {shop.type}
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      shop.name + " " + city + " Egypt"
                    )}`}
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
  };

  const [rates, setRates] = useState(DEFAULT_RATES);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [amount, setAmount] = useState("100");
  const [baseCurrency, setBaseCurrency] = useState("EGP");
  const [isCardMode, setIsCardMode] = useState(false); // false = Cash, true = Card
  const [cardType, setCardType] = useState("VISA"); // VISA or MASTER
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Derived Rates
  const EGP_TWD = rates.USD_TWD / rates.USD_EGP;

  // Fetch Exchange Rates
  const fetchRates = async () => {
    setIsLoading(true);
    setFetchError(false);
    try {
      // Using a free open API for demo purposes
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await response.json();

      if (data && data.rates) {
        setRates({
          USD_TWD: data.rates.TWD,
          USD_EGP: data.rates.EGP,
        });
        setLastUpdated(
          new Date().toLocaleTimeString("zh-TW", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
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
    let res = { EGP: 0, USD: 0, TWD: 0 };

    // 1. Convert Base to USD first (if not USD)
    let valInUSD = 0;
    if (baseCurrency === "USD") valInUSD = val;
    else if (baseCurrency === "TWD") valInUSD = val / rates.USD_TWD;
    else if (baseCurrency === "EGP") valInUSD = val / rates.USD_EGP;

    // 2. Convert USD to others
    res.USD = valInUSD;
    res.TWD = valInUSD * rates.USD_TWD;
    res.EGP = valInUSD * rates.USD_EGP;

    // 3. Apply Card Fees if needed (approx 1.5% fee on foreign currency)
    if (isCardMode) {
      // If paying in EGP/USD with TW card, TWD cost increases by 1.5%
      if (baseCurrency !== "TWD") {
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
            {isLoading ? (
              <Loader2 size={16} className="animate-spin text-amber-500" />
            ) : (
              <RefreshCw size={16} className="text-slate-400" />
            )}
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
          </select>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2 mb-4 bg-slate-950/50 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setIsCardMode(false)}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
              !isCardMode
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            現金 (Cash)
          </button>
          <button
            onClick={() => setIsCardMode(true)}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex justify-center items-center gap-1 ${
              isCardMode
                ? "bg-blue-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <CreditCard size={14} /> 刷卡 (+1.5%)
          </button>
        </div>

        {isCardMode && (
          <div className="flex gap-2 mb-4 text-xs">
            <label className="flex items-center gap-1 cursor-pointer text-slate-300">
              <input
                type="radio"
                name="cardType"
                checked={cardType === "VISA"}
                onChange={() => setCardType("VISA")}
              />{" "}
              VISA
            </label>
            <label className="flex items-center gap-1 cursor-pointer text-slate-300">
              <input
                type="radio"
                name="cardType"
                checked={cardType === "MASTER"}
                onChange={() => setCardType("MASTER")}
              />{" "}
              MASTER
            </label>
            <span className="ml-auto text-slate-500 italic">
              估算值，視發卡行而定
            </span>
          </div>
        )}

        {/* Results Display */}
        <div className="space-y-2">
          {["EGP", "USD", "TWD"]
            .filter((c) => c !== baseCurrency)
            .map((curr) => (
              <div
                key={curr}
                className="flex justify-between items-center bg-slate-950/80 p-3 rounded-lg border border-slate-700"
              >
                <span className="text-slate-400 font-bold">{curr}</span>
                <span className="text-emerald-400 font-mono text-xl font-bold">
                  {results[curr].toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
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
          <ChevronDown
            size={16}
            className={`ml-auto transform transition-transform ${
              isSettingsOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isSettingsOpen && (
          <div className="mt-4 space-y-3 animate-fadeIn border-t border-slate-800 pt-3">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">USD 對 TWD</label>
              <input
                type="number"
                value={rates.USD_TWD}
                onChange={(e) =>
                  setRates({ ...rates, USD_TWD: parseFloat(e.target.value) })
                }
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">USD 對 EGP</label>
              <input
                type="number"
                value={rates.USD_EGP}
                onChange={(e) =>
                  setRates({ ...rates, USD_EGP: parseFloat(e.target.value) })
                }
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white outline-none focus:border-amber-500"
              />
            </div>
            <div className="text-xs text-slate-500 text-right mt-1">
              當前推算: 1 EGP ≈ {EGP_TWD.toFixed(3)} TWD
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

// --- Split Bill Components (Updated for Firebase) ---
const SplitBillTab = ({ expenses, onAddExpense, onDeleteExpense }) => {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [payer, setPayer] = useState(MEMBERS[0]);
  const [sharers, setSharers] = useState(MEMBERS); // Default all
  const [isSharerOpen, setIsSharerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(itineraryData[0].date);

  const handleAdd = () => {
    if (!amount || !desc || sharers.length === 0) return;
    onAddExpense({
      // No ID needed here, Firestore generates it
      amount: parseFloat(amount),
      desc,
      payer,
      sharers,
      date: selectedDate,
      timestamp: Date.now(), // For sorting
    });
    setAmount("");
    setDesc("");
    setSharers(MEMBERS); // Reset to all
    setIsSharerOpen(false);
  };

  const toggleSharer = (name) => {
    if (sharers.includes(name)) {
      setSharers(sharers.filter((s) => s !== name));
    } else {
      setSharers([...sharers, name]);
    }
  };

  const calculateBalances = () => {
    const bal = {};
    MEMBERS.forEach((m) => (bal[m] = 0));
    expenses.forEach((e) => {
      const paid = parseFloat(e.amount);
      const split = paid / e.sharers.length;
      bal[e.payer] += paid;
      e.sharers.forEach((s) => {
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
        <h3 className="text-amber-500 font-bold mb-3 flex items-center gap-2">
          <DollarSign size={18} /> 結算預覽 (正=收錢 / 負=付錢)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {MEMBERS.map((m) => {
            const val = balances[m];
            const isPositive = val > 0;
            const isZero = Math.abs(val) < 1;
            return (
              <div
                key={m}
                className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800"
              >
                <span className="text-slate-300 text-sm">{m}</span>
                <span
                  className={`font-mono font-bold ${
                    isZero
                      ? "text-slate-500"
                      : isPositive
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {val > 0 ? "+" : ""}
                  {Math.round(val)}
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
            <label className="text-xs text-slate-400 block mb-1">
              行程日期
            </label>
            <div className="relative">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none appearance-none"
              >
                {itineraryData.map((day, idx) => (
                  <option key={idx} value={day.date}>
                    {day.date} - {day.location.split(" ")[0]}...
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">金額</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">
              項目說明
            </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="例如: 晚餐, 計程車"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">
              先墊錢的人
            </label>
            <div className="flex flex-wrap gap-2">
              {MEMBERS.map((m) => (
                <button
                  key={m}
                  onClick={() => setPayer(m)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors border ${
                    payer === m
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-slate-950 text-slate-400 border-slate-700"
                  }`}
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
              <label className="text-xs text-slate-400">
                分攤對象 ({sharers.length}人)
              </label>
              <div className="text-amber-500 text-xs flex items-center gap-1">
                {isSharerOpen ? "收起" : "選擇"}{" "}
                <ChevronDown
                  size={14}
                  className={`transform transition-transform ${
                    isSharerOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {isSharerOpen && (
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800 animate-fadeIn">
                {MEMBERS.map((m) => (
                  <div
                    key={m}
                    onClick={() => toggleSharer(m)}
                    className={`flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-slate-900 ${
                      sharers.includes(m) ? "text-blue-400" : "text-slate-600"
                    }`}
                  >
                    {sharers.includes(m) ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Circle size={16} />
                    )}
                    <span className="text-sm">{m}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="text-xs text-slate-500 mt-1">
              {!isSharerOpen && `目前: ${sharers.join(", ")}`}
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
          expenses.map((item) => (
            <div
              key={item.firebaseId || item.id}
              className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center group"
            >
              <div>
                <div className="text-white font-bold">{item.desc}</div>
                <div className="text-xs text-slate-400 mt-1">
                  <span className="text-amber-500">{item.payer}</span> 先付 •{" "}
                  <span className="text-slate-300">{item.date}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  分攤:{" "}
                  {item.sharers.length === MEMBERS.length
                    ? "全員"
                    : item.sharers.join(" ")}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-mono font-bold">
                  ${item.amount}
                </span>
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
  const [activeTab, setActiveTab] = useState("itinerary");
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
    const collectionRef = collection(
      db,
      "artifacts",
      appId,
      "public",
      "data",
      "expenses"
    );
    // Simple query (Rule 2: No orderBy in initial query if possible, or simple sorting)
    const q = query(collectionRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          firebaseId: doc.id,
          ...doc.data(),
        }));

        // Sort in memory (Rule 2) by timestamp descending
        data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        setExpenses(data);
      },
      (error) => {
        console.error("Firestore sync error:", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // --- Actions ---
  const addExpense = async (newEx) => {
    if (!user) return;
    try {
      await addDoc(
        collection(db, "artifacts", appId, "public", "data", "expenses"),
        newEx
      );
    } catch (e) {
      console.error("Error adding doc:", e);
    }
  };

  const deleteExpense = async (id) => {
    if (!user || !id) return;
    try {
      await deleteDoc(
        doc(db, "artifacts", appId, "public", "data", "expenses", id)
      );
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
            <p className="text-xs text-slate-400 tracking-widest mt-1">
              THE PHARAOH'S JOURNEY
            </p>
          </div>
          <div className="bg-amber-500/10 p-2 rounded-full border border-amber-500/30">
            <span className="text-xl">🐪</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === "itinerary" && (
          <div className="space-y-2 animate-fadeIn">
            {itineraryData.map((day, idx) => (
              <DayCard key={idx} day={day} />
            ))}
          </div>
        )}

        {activeTab === "split" && (
          <SplitBillTab
            expenses={expenses}
            onAddExpense={addExpense}
            onDeleteExpense={deleteExpense}
          />
        )}

        {activeTab === "currency" && <CurrencyTab />}

        {activeTab === "history" && <HistoryTab />}

        {activeTab === "food" && <FoodTab />}

        {activeTab === "tips" && (
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
            onClick={() => setActiveTab("itinerary")}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${
              activeTab === "itinerary" ? "text-amber-400" : "text-slate-600"
            }`}
          >
            <Calendar size={18} />
            <span className="text-[9px] font-bold">行程</span>
          </button>

          <button
            onClick={() => setActiveTab("split")}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${
              activeTab === "split" ? "text-amber-400" : "text-slate-600"
            }`}
          >
            <DollarSign size={18} />
            <span className="text-[9px] font-bold">分帳</span>
          </button>

          <button
            onClick={() => setActiveTab("currency")}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${
              activeTab === "currency" ? "text-amber-400" : "text-slate-600"
            }`}
          >
            <Calculator size={18} />
            <span className="text-[9px] font-bold">匯率</span>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${
              activeTab === "history" ? "text-amber-400" : "text-slate-600"
            }`}
          >
            <Scroll size={18} />
            <span className="text-[9px] font-bold">歷史</span>
          </button>

          <button
            onClick={() => setActiveTab("food")}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${
              activeTab === "food" ? "text-amber-400" : "text-slate-600"
            }`}
          >
            <UtensilsCrossed size={18} />
            <span className="text-[9px] font-bold">美食</span>
          </button>

          <button
            onClick={() => setActiveTab("tips")}
            className={`flex flex-col items-center gap-1 transition-colors px-1 ${
              activeTab === "tips" ? "text-amber-400" : "text-slate-600"
            }`}
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
