
import { User, Product, Room, WeatherData, FieldNote, Order } from './types';

export const MOCK_USER: User = {
  name: "林先生",
  level: "黑金年卡",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  phone: "13800138000",
  validUntil: "2026.05.20",
  freeStaysRemaining: 2,
  totalFreeStays: 2,
  nextDelivery: "06.15",
  deliveryStatus: "备货中",
  address: "上海市静安区南京西路1266号恒隆广场写字楼二期 28层",
  points: 1280,
  balance: 0.00
};

export const MOCK_GUEST: User = {
  name: "游客",
  level: "未开通权益",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200",
  phone: "13988889999",
  validUntil: "--",
  freeStaysRemaining: 0,
  totalFreeStays: 0,
  nextDelivery: "--",
  deliveryStatus: "待开通",
  address: "未设置收货地址",
  points: 0,
  balance: 0.00
};

export const MOCK_ORDERS: Order[] = [
  { id: "ORD-20240501-01", date: "2024.05.01", status: "completed", items: ["高山云雾绿茶 x 2", "手作干笋尖 x 1"], total: 446 },
  { id: "ORD-20240415-02", date: "2024.04.15", status: "completed", items: ["梯田有机胚芽米(月度权益)"], total: 0 },
  { id: "ORD-20240402-03", date: "2024.04.02", status: "shipped", items: ["放养土鸡蛋 x 2"], total: 110 },
];

export const MOCK_FIELD_NOTES: FieldNote[] = [
  { 
    id: 1, 
    title: "秧苗生长记录：第七周", 
    subtitle: "这周雨水充足，长势喜人", 
    image: "/article-1.jpg", 
    category: "农事",
    date: "04.20",
    author: "农场主 · 阿土",
    content: [
      "谷雨前后，是茶山最忙碌的时节。清晨五点，云雾还未散去，采茶阿姨们便已背着竹篓上山了。我们要抢在太阳完全升起之前，采下这一季最嫩的一芽一叶。",
      "这里的茶树生长在海拔800米以上的梯田边缘，终年云雾缭绕，漫射光多，因此茶叶中的氨基酸含量极高，苦涩味少。这一批新茶，我们采用了传统的杀青工艺，保留了茶叶最原始的兰花香气。",
      "冲泡时，建议使用85度的山泉水。当热水注入杯中，你会看到茶叶在水中慢慢舒展，仿佛回到了它生长的那个云雾缭绕的清晨。入口鲜爽，回甘悠长，这是春天的味道。"
    ]
  },
  { 
    id: 2, 
    title: "谷雨 · 新茶上市", 
    subtitle: "高山云雾初采，滋味鲜爽", 
    image: "/article-2.jpg", 
    category: "新品",
    date: "04.18",
    author: "茶师 · 老陈",
    content: [
      "城市的生活总是匆忙，我们希望给您留一亩心田。牛耕部落位于梯田核心保护区的A区，这里的每一寸土地都坚持古法耕作，不使用化肥和农药。",
      "今年的认养计划正式开启。您可以认养一平米或一分地，我们将为您立牌，并在整个生长周期内，通过专属摄像头向您直播它的变化。从插秧、除草、抽穗到收割，您将见证一粒米的一生。"
    ]
  },
  { 
    id: 3, 
    title: "春日手剥鲜笋食谱", 
    subtitle: "不时不食，鲜嫩爽口", 
    image: "/article-3.jpg", 
    category: "食谱",
    date: "04.15",
    author: "膳房 · 李阿姨",
    content: [
      "一场春雨过后，后山的竹笋便争先恐后地冒了出来。这时候的雷笋，肉质最为细嫩，没有一丝渣滓。我们只选用清晨刚挖出来的鲜笋，带着泥土的芬芳。",
      "这道油焖笋，做法看似简单，却最考究火候。剥壳后的笋切成滚刀块，先在热油中煸炒至边缘金黄，再加入土冰糖和酿造酱油焖煮。不加一滴水，全靠笋自身的水分和调料融合。"
    ]
  },
  { 
    id: 4, 
    title: "梯田四季风光", 
    subtitle: "春夏秋冬，四季如画", 
    image: "/article-4.jpg", 
    category: "风光",
    date: "04.10",
    author: "摄影师 · 小张",
    content: [
      "梯田四季变换，每个季节都有独特的风景。春天，秧苗初插，一片新绿；夏天，稻浪翻滚，满目金黄；秋天，收获时节，硕果累累；冬天，休养生息，蓄势待发。",
      "我们用镜头记录下每一个美好的瞬间，让更多人看到梯田的美丽，感受农耕文化的魅力。"
    ]
  }
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "梯田有机胚芽米", 
    price: 128, 
    memberPrice: 0, 
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800", 
    tag: "月度权益", 
    desc: "本月权益待发货", 
    category: "produce",
    story: "产自海拔1200米的高山梯田，引用山泉水灌溉，坚持鸭稻共生古法种植。保留了胚芽部分，营养价值是普通白米的3倍。",
    specs: [
      { label: "产地", value: "云和梯田核心保护区" },
      { label: "净含量", value: "2.5kg / 袋" },
      { label: "保质期", value: "6个月 (真空包装)" },
      { label: "生长周期", value: "158天" }
    ],
    tastingNotes: ["软糯", "回甘", "米香浓郁"]
  },
  { 
    id: 2, 
    name: "高山云雾绿茶", 
    price: 260, 
    memberPrice: 188, 
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&q=80&w=800", 
    tag: "新品", 
    desc: "会员专享8折", 
    category: "tea",
    story: "明前头采，纯手工采摘炒制。茶园常年云雾缭绕，漫射光充足，造就了其独特的兰花香气。",
    specs: [
      { label: "等级", value: "特级" },
      { label: "采摘时间", value: "2024年4月5日" },
      { label: "规格", value: "125g / 罐" }
    ],
    tastingNotes: ["清爽", "豆香", "兰花韵"]
  },
  { 
    id: 3, 
    name: "放养土鸡蛋", 
    price: 68, 
    memberPrice: 55, 
    image: "https://images.unsplash.com/photo-1516467508483-a721206076f9?auto=format&fit=crop&q=80&w=800", 
    tag: "限时", 
    desc: "今日刚产", 
    category: "produce",
    story: "林下散养土鸡，主要以五谷杂粮和林间虫草为食。蛋黄呈现天然的金黄色，蛋清粘稠，富含卵磷脂。",
    specs: [
      { label: "数量", value: "20枚 / 盒" },
      { label: "产地", value: "牛耕部落生态农场" },
      { label: "发货", value: "每日现捡现发" }
    ],
    tastingNotes: ["无腥味", "口感细腻", "蛋香浓"]
  },
  { 
    id: 4, 
    name: "手作干笋尖", 
    price: 88, 
    memberPrice: 70, 
    image: "https://images.unsplash.com/photo-1627258385207-6b087034d618?auto=format&fit=crop&q=80&w=800", 
    tag: "农家", 
    desc: "虽然丑但是鲜", 
    category: "produce",
    story: "选用清明前后的野生雷笋，经炭火烘焙而成。每一斤笋干需要十斤鲜笋浓缩而成，是煲汤的最佳伴侣。",
    specs: [
      { label: "重量", value: "250g / 袋" },
      { label: "工艺", value: "传统炭烤" },
      { label: "储存", value: "阴凉干燥处" }
    ],
    tastingNotes: ["脆嫩", "鲜美", "烟火气"]
  },
];

export const MOCK_ROOMS: Room[] = [
  { 
    id: 1, 
    name: "云上 · 观景木屋", 
    price: 600, 
    memberPrice: 480,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200", 
    tags: ["梯田全景", "独立卫浴"], 
    isAvailable: true,
    description: "位于民宿顶层，拥有270度全景落地窗。清晨躺在床上即可看日出云海，夜晚可观璀璨星空。房间配备高品质乳胶床垫和全套有机洗护用品。",
    size: "45㎡",
    amenities: ["King Size 大床", "全景浴缸", "Marshall 音响", "胶囊咖啡机", "欢迎水果"]
  },
  { 
    id: 2, 
    name: "听溪 · 亲子树屋", 
    price: 800,
    memberPrice: 680, 
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1200", 
    tags: ["庭院", "近溪", "童趣"], 
    isAvailable: true,
    description: "依树而建的独栋木屋，一条清澈的小溪从房前流过。拥有独立的小庭院和儿童游乐区，是亲子度假的绝佳选择。",
    size: "60㎡ (含庭院)",
    amenities: ["上下铺", "儿童帐篷", "乐高玩具墙", "独立庭院", "烧烤架"]
  },
  { 
    id: 3, 
    name: "归隐 · 山居别墅", 
    price: 1600, 
    memberPrice: 1280,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200", 
    tags: ["私汤", "管家", "全餐"], 
    isAvailable: false,
    description: "隐于竹林深处的独栋别墅，私密性极佳。配备私人露天汤池和专属管家服务，提供一日三餐的定制化有机料理。",
    size: "120㎡",
    amenities: ["两室一厅", "私家汤池", "厨房", "私人管家", "定制晚餐"]
  },
];

export const MOCK_WEATHER_DATA: WeatherData[] = [
  { day: 'M', temp: 22 },
  { day: 'T', temp: 24 },
  { day: 'W', temp: 21 },
  { day: 'T', temp: 23 },
  { day: 'F', temp: 25 },
  { day: 'S', temp: 26 },
  { day: 'S', temp: 24 },
];

export const MONTHLY_RICE_DATA = [
  // Spring
  {
    season: 'spring',
    seasonLabel: '春生 · 养肝',
    month: '正月 (寅月)',
    name: '启岁 · 春台米',
    recipeTitle: '五辛盘配春饼',
    method: '煮好的米饭配上葱、蒜、韭菜、蓼蒿、芥菜这五种辛辣蔬菜（或做成春卷/春饼）。',
    principle: '正月阳气初生，身体经过一冬的闭藏，需要辛味食物来发散体内的陈寒，帮助气血生发。',
    meaningTitle: '咬春',
    meaning: '寓意咬住春天的生机，新的一年五谷丰登，身体通透。'
  },
  {
    season: 'spring',
    seasonLabel: '春生 · 养肝',
    month: '二月 (卯月)',
    name: '花朝 · 醒土米',
    recipeTitle: '菠菜猪肝粥',
    method: '用这袋米熬出绵密的白粥，出锅前加入菠菜碎和猪肝片。',
    principle: '二月（惊蛰、春分）肝气最旺。中医讲“青色入肝”，此时吃绿叶菜最养肝血，防春燥。',
    meaningTitle: '醒神',
    meaning: '寓意在万物复苏的时节，让身体和大脑都清醒过来，精神百倍。'
  },
  {
    season: 'spring',
    seasonLabel: '春生 · 养肝',
    month: '三月 (辰月)',
    name: '雨润 · 秧苗米',
    recipeTitle: '香椿拌饭',
    method: '趁着谷雨前香椿最嫩，切碎炒蛋或直接拌入刚蒸好的热米饭中，加一点猪油。',
    principle: '辰月湿气渐重（清明、谷雨），香椿被称为“树上蔬菜”，能健脾开胃，化湿解毒。',
    meaningTitle: '吃春',
    meaning: '抓住春天的尾巴，寓意留住美好，日子过得鲜活热烈。'
  },
  // Summer
  {
    season: 'summer',
    seasonLabel: '夏长 · 养心',
    month: '四月 (巳月)',
    name: '初夏 · 小满米',
    recipeTitle: '红豆薏米饭',
    method: '煮饭时抓一把红豆和炒熟的薏米进去同煮。',
    principle: '立夏之后，心火渐旺。红色入心，红豆养心补血；薏米祛除初夏的湿气，为盛夏打底。',
    meaningTitle: '相思',
    meaning: '红豆寄相思，寓意家庭和睦，心心相印；也寓意生活红红火火。'
  },
  {
    season: 'summer',
    seasonLabel: '夏长 · 养心',
    month: '五月 (午月)',
    name: '汗滴 · 力耕米',
    recipeTitle: '苦瓜排骨煲仔饭',
    method: '砂锅焖饭，上面铺上豆豉蒸排骨和苦瓜片。',
    principle: '午月（芒种、夏至）是阳气最盛也是最易上火的时候。吃“苦”能清心降火，除烦止渴。',
    meaningTitle: '吃苦',
    meaning: '寓意先苦后甜，在这个最忙碌的月份，只有肯吃苦，下半年才有收获。'
  },
  {
    season: 'summer',
    seasonLabel: '夏长 · 养心',
    month: '六月 (未月)',
    name: '长夏 · 清凉米',
    recipeTitle: '荷叶绿豆粥',
    method: '煮粥时放一张鲜荷叶盖在面上，煮好后捞出，米粥会呈淡淡的绿色，带有清香。',
    principle: '未月（小暑、大暑）湿热交蒸。荷叶清暑利湿，绿豆解毒，是“长夏”防暑的神器。',
    meaningTitle: '清净',
    meaning: '寓意心静自然凉，在这个浮躁闷热的季节，保持内心的清净与高洁。'
  },
  // Autumn
  {
    season: 'autumn',
    seasonLabel: '秋收 · 润肺',
    month: '七月 (申月)',
    name: '新凉 · 报秋米',
    recipeTitle: '百合莲子饭',
    method: '鲜百合瓣和去芯莲子铺在米饭上同蒸。',
    principle: '秋气主燥，易伤肺。百合润肺止咳，莲子养心安神，缓解入秋后的“秋乏”。',
    meaningTitle: '好合',
    meaning: '寓意百年好合，连生贵子。也代表着在这个收获的季节，家人团聚的喜悦。'
  },
  {
    season: 'autumn',
    seasonLabel: '秋收 · 润肺',
    month: '八月 (酉月)',
    name: '金波 · 尝新米',
    recipeTitle: '空口白饭 / 猪油拌饭',
    method: '这是对新米最高的礼遇。 刚脱壳的米，什么都不用加，或者只加一勺猪油、几滴酱油。',
    principle: '《本草纲目》说米“补中益气”。新米的“米油”最厚，这就是最好的补品，能滋阴长力气。',
    meaningTitle: '本真',
    meaning: '寓意返璞归真，不忘初心。最简单的往往也是最珍贵的。'
  },
  {
    season: 'autumn',
    seasonLabel: '秋收 · 润肺',
    month: '九月 (戌月)',
    name: '霜染 · 凝香米',
    recipeTitle: '山药红枣糕/饭',
    method: '铁棍山药切丁，红枣去核，和米饭一起焖熟。',
    principle: '深秋（寒露、霜降）要注意脾胃保暖。山药色白入肺，健脾益胃；红枣补气，为过冬做准备。',
    meaningTitle: '蒸蒸日上',
    meaning: '山药又名“淮山”，寓意怀抱江山，事业稳固；红枣寓意早早丰收。'
  },
  // Winter
  {
    season: 'winter',
    seasonLabel: '冬藏 · 补肾',
    month: '十月 (亥月)',
    name: '初雪 · 满仓米',
    recipeTitle: '黑芝麻核桃炊饭',
    method: '炒香的黑芝麻和核桃仁撒在煮好的饭里拌匀。',
    principle: '亥月入冬，中医讲“黑五类入肾”。黑芝麻和核桃能滋补肝肾，乌发润肤，抵御初冬寒气。',
    meaningTitle: '积淀',
    meaning: '寓意积累智慧，像老种子一样把能量藏在体内，厚积薄发。'
  },
  {
    season: 'winter',
    seasonLabel: '冬藏 · 补肾',
    month: '十一月 (子月)',
    name: '冬至 · 团圆米',
    recipeTitle: '羊肉萝卜焖饭',
    method: '羊肉切丁爆炒，加入白萝卜丁，再加入泡好的大米一起焖煮。',
    principle: '子月（冬至）阴极阳生，最宜温补。羊肉大补元气，萝卜消食化痰，防止进补过度导致积食。',
    meaningTitle: '喜洋洋',
    meaning: '寓意暖洋洋、喜洋洋，驱散严寒，家庭温暖和睦。'
  },
  {
    season: 'winter',
    seasonLabel: '冬藏 · 补肾',
    month: '十二月 (丑月)',
    name: '岁末 · 福满米',
    recipeTitle: '腊八粥 / 八宝饭',
    method: '将大米与糯米混合，加入红豆、绿豆、花生、红枣、桂圆、莲子等八种食材熬煮。',
    principle: '腊月是一年最冷的时候（大寒），也是消化系统最需要呵护的时候。五谷杂粮熬成粥，最易吸收，调和五脏。',
    meaningTitle: '圆满',
    meaning: '八宝汇聚，寓意八方来财、万事圆满。喝了这碗粥，把一年的福气都装进肚子里。'
  },
];
