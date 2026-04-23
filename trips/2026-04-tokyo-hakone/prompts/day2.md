# 第二天 4/11（六）：上野動物園＋購物

```
你是一位專業的日本家庭旅遊規劃師，請使用繁體中文回答。
請使用 MCP Google Maps 工具完成以下任務。

## 旅客組成
- 60歲長輩 2位（其中1位全素食）
- 30多歲成人 4位
- 6歲小孩 1位、2歲半幼兒 1位（需推車）
- 共 8人
- 每段移動標註「推車友善度」：⭕友善 / ⚠️需注意 / ❌不友善

## 今日住宿
嵐ホテル（東京都台東区根岸2-16-5）

## 今日行程
- 08:00 早餐
- 09:30 上野動物園（看熊貓🐼）
- 12:30 午餐（園內）
- 14:00 松坂屋/PARCO_ya/丸井/Yamashiroya 購物
- 16:00 阿美橫町
- 18:00 晚餐

---

## 請執行以下任務：

### 1. 🗺️ 路線地圖
用 `maps_static_map` 標記今天所有地點：
飯店→Kayaba咖啡→上野動物園→購物區→阿美橫町→伊豆榮→飯店

### 2. 🚃 全天路線
用 `maps_plan_route` 規劃多站路線：
嵐ホテル(東京都台東区根岸2-16-5) → Kayaba Coffee(カヤバ珈琲) → Ueno Zoo → Matsuzakaya Ueno → PARCO_ya → Yamashiroya(上野6-14-6) → Ameyoko → Izuei(伊豆榮) → 嵐ホテル

### 3. 🍽️ 早餐（08:00）
用 `maps_compare_places` 比較：
- 主選：Kayaba咖啡（カヤバ珈琲）- 古民家改建，氛圍佳
- 備案1：羅多倫咖啡 鶯谷北口店（Doutor）- 連鎖快速
- 備案2：THINK - 買麵包外帶

每間用 `maps_place_details` 查詢
用 `maps_directions`（walking）查飯店→各咖啡廳

### 4. 🐼 上野動物園（09:30-12:30）
用 `maps_directions`（walking）查飯店→上野動物園
用 `maps_place_details` 查詢上野動物園
用 `maps_explore_area` 探索上野動物園及周邊

請說明：
- 門票：成人 ¥600、小學以下免費、65歲以上有優惠嗎？
- 嬰兒車租借 ¥500/天，租借處位置？
- 2-3小時輕鬆版遊園路線（考慮長輩腳力＋幼兒興趣）
- 園內無障礙廁所、哺乳室位置
- 熊貓館位置與排隊預估

### 5. 🍽️ 午餐（12:30）
- 主選：Saruyama Kitchen（園內猿山廚房）
- 用 `maps_search_nearby` 在上野動物園/上野公園附近搜尋：
  - keyword: "vegetarian restaurant" → 找素食備案
  - keyword: "family restaurant" → 找家庭友善備案
- 用 `maps_place_details` 查每間餐廳

### 6. 🛍️ 購物路線（14:00-16:00）
用 `maps_distance_matrix` 查詢以下地點的步行距離矩陣：
- 上野動物園出口
- 松坂屋百貨（Matsuzakaya Ueno）
- PARCO_ya
- 丸井百貨（Marui Ueno）
- Yamashiroya（東京都台東区上野6-14-6，吉伊卡娃專賣）

→ 規劃最省腳力的逛街順序

用 `maps_search_along_route` 沿購物路線搜尋：
- 可讓長輩休息的咖啡廳
- 有兒童用品的店

### 7. 🏮 阿美橫町（16:00）
用 `maps_place_details` 查詢阿美橫町
- 推車在窄通道的注意事項
- 推薦攤位/商店（零食、藥妝、乾貨）
- 長輩和小孩逛的注意事項

### 8. 🍽️ 晚餐（18:00）
用 `maps_compare_places` 比較：
- 主選：伊豆榮（鰻魚飯，老字號，上野有名）
- 備案1：上野藪そば（蕎麥麵）
- 備案2：用 `maps_search_nearby` 在上野站附近搜尋 "vegetarian family restaurant" 找一間

每間用 `maps_place_details` 查詢
用 `maps_directions`（walking）查飯店→各餐廳

每間餐廳標註：素食✅/❌、兒童友善、預約、人均消費

### 9. 🏪 沿途便利設施
用 `maps_search_along_route` 沿今天路線搜尋：
- 尿布購買點
- 自動販賣機/休息區

---

## 輸出格式（同 Day1）
交通、餐廳用樹狀格式
最後提供：📋 時間軸 + 💰 預估花費
```
