# 第三天 4/12（日）：上野→箱根

```
你是一位專業的日本家庭旅遊規劃師，請使用繁體中文回答。
請使用 MCP Google Maps 工具完成以下任務。

## 旅客組成
- 60歲長輩 2位（其中1位全素食）
- 30多歲成人 4位
- 6歲小孩 1位、2歲半幼兒 1位（需推車）
- 共 8人
- 每段移動標註「推車友善度」：⭕友善 / ⚠️需注意 / ❌不友善

## 住宿
- 退房：嵐ホテル（東京都台東区根岸2-16-5）11:00退房
- 入住：箱根二之平民宿（〒250-0407 Ninotaira 1118-2, Hakone, Ashigarashimo District, Kanagawa）15:00 Check-in

## 今日行程
- 08:00 早餐
- 09:00 退房、前往JR上野站
- 09:00-09:30 JR山手線 上野→新宿
- 09:45 新宿站買箱根周遊券＋浪漫特快票
- 10:00-11:25 浪漫特快 新宿→箱根湯本
- 11:30 箱根湯本商店街散策
- 12:00 午餐
- 14:00 登山電車 箱根湯本→彫刻の森
- 15:00 雕刻之森美術館
- 17:00 民宿 Check-in、泡溫泉
- 18:30 晚餐

---

## 請執行以下任務：

### 1. 🗺️ 路線地圖
用 `maps_static_map` 標記今天的長距離移動路線：
A：嵐ホテル（上野）→ B：JR上野站 → C：新宿站 → D：箱根湯本 → E：彫刻の森 → F：民宿

### 2. 🌄 箱根海拔地形
用 `maps_elevation` 查詢以下各站海拔（讓大家有心理準備今天要爬多高）：
- 上野站（海平面基準）
- 箱根湯本
- 彫刻の森
- 強羅
- 早雲山（明天會去）
- 大涌谷（明天會去）

### 3. 🍽️ 早餐（08:00）
用 `maps_compare_places` 比較：
- 主選：喫茶Life（ライフ）⚠️ 下午開放吸煙，早上OK
- 備案1：五郎吐司甕 DEN（デン）⚠️ 開放室內吸煙
- 備案2：用 `maps_search_nearby` 在飯店(東京都台東区根岸2-16-5)附近搜尋 "禁煙 カフェ モーニング" 或 "non-smoking breakfast cafe"

⚠️ 重要：因有幼兒和長輩，每間餐廳必須標註吸煙政策！
如果主選和備案1在用餐時段有吸煙問題，必須提供完全禁煙的替代方案。

### 4. 🚃 交通（今天是大移動日，請非常詳細！）

用 `maps_plan_route` 規劃全程：
嵐ホテル(東京都台東区根岸2-16-5) → JR Ueno Station → Shinjuku Station → Hakone-Yumoto Station → Chokoku no Mori Station → 民宿(Ninotaira 1118-2, Hakone)

**第一段：飯店→JR上野站（步行，09:00）**
用 `maps_directions`（walking）查詢
- 帶行李箱+推車的最佳路線
- 用 `maps_elevation` 看有沒有上坡

**第二段：JR上野→新宿（JR山手線外圈）**
用 `maps_directions`（transit）查詢 "JR Ueno Station" → "Shinjuku Station"
詳細說明：
- 山手線外圈（往池袋・新宿方向）
- 上野站哪個月台？帶行李推車走哪個電梯到月台？
- 車程約24分鐘，¥210
- 新宿站下車後，帶行李→小田急線怎麼走？（新宿站超大超複雜！）

**第三段：新宿站購票（09:45）**
用 `maps_place_details` 查詢「小田急旅遊服務中心」或 "Odakyu Sightseeing Service Center Shinjuku"
- 位置：新宿西口1樓
- 購買箱根周遊券 3日：成人 ¥7,500 / 兒童(6-11歲) ¥1,850 / 6歲以下免費
- 同時加購浪漫特快特急券：成人 ¥1,110 / 兒童 ¥560
- 2歲幼兒不需票但無座位
- ⚠️ 提醒：周遊券不含浪漫特快，要另外買！

**第四段：新宿→箱根湯本（浪漫特快 Romancecar，10:00-11:25）**
用 `maps_directions`（transit）查詢 "Shinjuku Station" → "Hakone-Yumoto Station"
- 浪漫特快月台位置
- 全車指定席，推薦哪個車廂？（展望席？家庭友善？）
- 推車放置處（車廂前方？後方？）
- 車程約85分鐘

### 5. 🏮 箱根湯本商店街（11:30-12:00）
用 `maps_explore_area` 探索箱根湯本站周邊
- 推車在商店街通行性？
- 推薦：小孩零食店、長輩伴手禮店、溫泉饅頭
- 行李寄放（箱根湯本站有置物櫃嗎？）

### 6. 🍽️ 午餐（12:00）
用 `maps_compare_places` 比較：
- 主選：直吉（溫泉豆腐，有素食 ✅）
- 備案1：はつ花本店（蕎麥麵）
- 備案2：用 `maps_search_nearby` 在箱根湯本搜尋 "vegetarian restaurant"

每間標註：素食選項、兒童友善、等候時間（假日中午可能排隊！）

### 7. 🚃 箱根湯本→彫刻の森（登山電車，14:00）
用 `maps_directions`（transit）查詢 "Hakone-Yumoto Station" → "Chokoku no Mori Station"
- 登山電車車程約35分鐘
- 推車能帶上車嗎？車廂空間如何？
- 行李箱怎麼辦？（帶上車還是先寄放？）
- 哪個車廂/哪一側風景最好？

### 8. 🎨 雕刻之森美術館（15:00-17:00）
用 `maps_place_details` 查詢 "Hakone Open-Air Museum"
用 `maps_directions`（walking）查 "Chokoku no Mori Station" → 美術館入口
- 門票資訊（成人/兒童/長輩敬老票？）
- 推車可否入園？園內有嬰兒車借嗎？
- 6歲小孩的互動展品推薦
- 長輩輕鬆路線（避免太多上下坡）
- 停留時間建議

### 9. 🏠 Check-in（17:00）
用 `maps_directions`（walking）查美術館→民宿(Ninotaira 1118-2, Hakone)
- 步行距離/時間
- 帶行李的路況

### 10. 🍽️ 晚餐（18:30）
用 `maps_compare_places` 比較：
- 主選：EMBLEM FLOW DINING（葷素皆有 ✅）
- 備案1：Restaurant Omoto
- 備案2：Restaurant ROI
- 備案3：HAKONE PICNIC Taiwanese Cafe（台灣料理！）

全部搜尋地點在箱根二之平/彫刻の森附近
每間用 `maps_place_details` 查詢
用 `maps_directions`（walking）查民宿→各餐廳

### 11. 🏥 箱根醫療
用 `maps_search_nearby` 在民宿附近搜尋 "hospital" 或 "clinic"

---

## 輸出格式（同前天）
交通、餐廳用樹狀格式
最後提供：📋 時間軸 + 💰 預估花費（含周遊券等大額支出）
```
