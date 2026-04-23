# 並行 Agent Teams 調度提示詞

## 前置設定（已完成 ✅）
- [x] `.claude/settings.local.json` 已啟用 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS: "1"`
- [x] `.claude/agents/maps-transport.md` — 交通路線專家（sonnet）
- [x] `.claude/agents/maps-dining.md` — 餐廳美食專家（sonnet）
- [x] `.claude/agents/maps-explorer.md` — 景點探索專家（sonnet）

## 使用方式
1. 在 `d:\Github\Travel` 目錄下開啟 Claude CLI
2. 複製下方 ``` 區塊內的全部文字
3. 貼入 Claude CLI 送出
4. 12 個 agent 會並行處理，結果寫入 `output/` 資料夾

---

```
你是旅遊規劃總調度。請使用繁體中文。

先讀取以下檔案了解背景：
1. CLAUDE.md（MCP 工具正確用法）
2. 20260410-0415東京家庭旅遊 - 行程表0410-0415.tsv（完整行程表）

## 共通背景（每個 agent 的 prompt 都要包含）
旅客：60歲長輩2位(1位全素食) + 30多歲成人4位 + 6歲兒童1位 + 2歲半幼兒1位(需推車) = 8人
日期：2026/4/10-4/15
住宿：
- Day1-2：嵐ホテル（東京都台東区根岸2-16-5）
- Day3-4：箱根二之平民宿（Ninotaira 1118-2, Hakone, Kanagawa 250-0407）
- Day5：東京都墨田区押上1-18-7（晴空塔附近）

MCP 注意事項：
- maps_place_details 用 placeId（駝峰式），不是 place_id
- 查地點詳情要兩步驟：先 maps_search_places 取 place_id，再 maps_place_details(placeId: "...")

## 請立即並行派出以下 12 個 Agent（同一個回覆中全部發出）

使用專案內定義的自定義 agent 類型（在 .claude/agents/ 下）：
- maps-transport → 交通路線相關任務
- maps-dining → 餐廳美食相關任務
- maps-explorer → 景點探索、天氣、生活機能相關任務

每個 agent 都設定 run_in_background: true 以並行執行。

---

### Agent 1 ─ 🚃 Day1 交通
類型：maps-transport
輸出：d:\Github\Travel\output\day1_transport.md

任務：查詢 4/10 台灣→上野的交通路線。

1. maps_plan_route：成田機場第一航廈 → 京成上野站 → 嵐ホテル(東京都台東区根岸2-16-5)
2. maps_directions(transit)：Narita Airport Terminal 1 → Keisei Ueno Station（Skyliner）
3. maps_directions(walking)：Keisei Ueno Station → 東京都台東区根岸2-16-5
4. maps_elevation：步行路線高度變化
5. maps_static_map：標記 A成田機場 B京成上野 C飯店

補充資訊：
- Skyliner 來回票成人¥4,500，查兒童票價、2歲免費規定
- 成田機場第一航廈購票地點（樓層/窗口）
- 推車過閘口→月台的電梯位置
- 京成上野站出站→飯店的無障礙路線
- 每段標註推車友善度 ⭕⚠️❌

---

### Agent 2 ─ 🍽️ Day1 餐廳
類型：maps-dining
輸出：d:\Github\Travel\output\day1_meals.md

任務：查詢 4/10 晚餐選項。住宿：東京都台東区根岸2-16-5

晚餐 18:30（4間比較）：
- 主選：韻松亭（上野公園，和食）
- 備案1：guruatsu（全素）
- 備案2：VEGAN GYOZA（全素）
- 備案3：T's TanTan Ecute Ueno（素食拉麵，車站內）

每間：maps_search_places → maps_place_details → maps_directions(walking)從飯店
用 maps_compare_places 並排比較 4 間
標註：素食✅❌、兒童座椅/餐、推車可入、預約方式、人均¥、Google評分、營業時間

---

### Agent 3 ─ 🚃 Day2 交通+購物路線
類型：maps-transport
輸出：d:\Github\Travel\output\day2_transport.md

任務：查詢 4/11 上野動物園+購物的全天路線。住宿：東京都台東区根岸2-16-5

1. maps_plan_route：飯店→Kayaba Coffee→上野動物園→松坂屋→PARCO_ya→Yamashiroya(上野6-14-6)→阿美橫町→伊豆榮→飯店
2. maps_static_map：標記全天路線
3. maps_distance_matrix：松坂屋/PARCO_ya/丸井/Yamashiroya 步行距離矩陣→最省力順序
4. maps_search_along_route：沿購物路線找長輩休息咖啡廳

---

### Agent 4 ─ 🍽️ Day2 餐廳
類型：maps-dining
輸出：d:\Github\Travel\output\day2_meals.md

任務：查詢 4/11 三餐。住宿：東京都台東区根岸2-16-5

早餐 08:00（maps_compare_places 比較）：
- 主選：Kayaba咖啡（カヤバ珈琲）
- 備案1：羅多倫咖啡 鶯谷北口店（Doutor）
- 備案2：THINK（麵包外帶）

午餐 12:30：
- 主選：Saruyama Kitchen（上野動物園內）
- maps_search_nearby 上野公園附近搜尋 "vegetarian family restaurant" 找2間備案

晚餐 18:00（maps_compare_places 比較）：
- 主選：伊豆榮（鰻魚飯）
- 備案1：上野藪そば（蕎麥麵）
- 備案2：maps_search_nearby 上野站附近 "vegetarian family restaurant"

每間：maps_search_places → maps_place_details → maps_directions(walking)

---

### Agent 5 ─ 🚃 Day3 交通（大移動日！）
類型：maps-transport
輸出：d:\Github\Travel\output\day3_transport.md

任務：查詢 4/12 上野→箱根的大移動交通。帶全部行李！

1. maps_plan_route：嵐ホテル(根岸2-16-5)→JR上野站→新宿站→箱根湯本→彫刻の森→民宿(Ninotaira 1118-2, Hakone)
2. maps_static_map：標記全程路線
3. maps_directions(walking)：飯店→JR上野站（帶行李推車路線）
4. maps_directions(transit)：JR Ueno→Shinjuku（山手線外圈24分¥210）
5. maps_search_places + maps_place_details：小田急旅遊服務中心（Odakyu Sightseeing Service Center Shinjuku）
6. maps_directions(transit)：Shinjuku→Hakone-Yumoto（浪漫特快85分）
7. maps_directions(transit)：Hakone-Yumoto→Chokoku no Mori（登山電車35分）
8. maps_directions(walking)：彫刻の森美術館→民宿
9. maps_elevation：箱根各站海拔（箱根湯本/彫刻の森/強羅/早雲山/大涌谷）

票價明細：周遊券3日成人¥7,500兒童¥1,850 + 特急券成人¥1,110兒童¥560
每段：購票地點、推車友善度、電梯、行李處理

---

### Agent 6 ─ 🍽️ Day3 餐廳
類型：maps-dining
輸出：d:\Github\Travel\output\day3_meals.md

任務：查詢 4/12 三餐。早上在上野(根岸2-16-5)，中午箱根湯本，晚上箱根二之平(Ninotaira 1118-2)

早餐 08:00（maps_compare_places）：
- 主選：喫茶Life（ライフ）⚠️下午吸煙
- 備案1：五郎吐司甕 DEN（デン）⚠️室內吸煙
- 備案2：maps_search_nearby 飯店附近 "non-smoking breakfast cafe"
- ⚠️ 有幼兒和長輩，必須標註每間吸煙政策！

午餐 12:00（maps_compare_places）：
- 主選：直吉（箱根湯本，溫泉豆腐，素食✅）
- 備案1：はつ花本店（蕎麥麵）
- 備案2：maps_search_nearby 箱根湯本 "vegetarian"

晚餐 18:30（maps_compare_places）：
- 主選：EMBLEM FLOW DINING（葷素皆有）
- 備案1：Restaurant Omoto
- 備案2：Restaurant ROI
- 備案3：HAKONE PICNIC Taiwanese Cafe

---

### Agent 7 ─ 🚃 Day4 交通（箱根黃金路線）
類型：maps-transport
輸出：d:\Github\Travel\output\day4_transport.md

任務：查詢 4/13 箱根黃金路線環形交通。住：Ninotaira 1118-2, Hakone。全程用箱根周遊券免費。

1. maps_plan_route 環形路線：民宿→彫刻の森駅→強羅→早雲山→大涌谷→桃源台→(海賊船)元箱根港→箱根神社→(巴士)彫刻の森→民宿
2. maps_static_map：黃金路線地圖
3. maps_elevation：每站海拔（彫刻の森/強羅/早雲山/大涌谷/桃源台/元箱根/箱根神社）
4. maps_directions(transit)：箱根神社→彫刻の森巴士站
5. maps_search_places + maps_place_details：蘆之湖海賊船（班次/推車/觀景位）

每段交通：推車處理（纜車收折？海賊船放哪？巴士？）、長輩注意事項
⚠️ 大涌谷纜車天氣停駛的替代方案

---

### Agent 8 ─ 🍽️ Day4 餐廳
類型：maps-dining
輸出：d:\Github\Travel\output\day4_meals.md

任務：查詢 4/13 三餐。住：Ninotaira 1118-2, Hakone。中午在元箱根港。

早餐 08:00：
- 主選：Cafe Douce（maps_search_places + maps_place_details）
- 備案：maps_search_nearby 民宿附近 "breakfast cafe"

午餐 12:00（maps_compare_places）：
- 主選：Bakery&Table（元箱根港，湖景麵包店）
- 備案1：權現茶屋
- 素食備案：maps_search_nearby 元箱根(Moto-Hakone) "vegetarian"

晚餐 19:00：
- 主選：WOODY（maps_search_places + maps_place_details）
- 備案：maps_search_nearby 民宿附近 "dinner restaurant vegetarian"

---

### Agent 9 ─ 🚃 Day5 交通（最複雜！箱根→川越→晴空塔）
類型：maps-transport
輸出：d:\Github\Travel\output\day5_transport.md

任務：查詢 4/14 的多段移動。帶全部行李。住宿換到東京都墨田区押上1-18-7。

1. maps_directions(transit)：民宿→彫刻の森→箱根湯本（登山電車35分）
2. maps_directions(transit)：箱根湯本→新宿（浪漫特快85分，特急券¥1,110）
3. maps_search_nearby：新宿站 "coin locker" "luggage storage"（8人行李寄放方案！）
4. maps_directions(transit)：新宿→川越（JR埼京線50分¥760）
5. maps_plan_route 川越內：川越駅→冰川神社→藏造老街→時之鐘→菓子屋橫丁→川越駅
6. maps_distance_matrix：川越景點步行矩陣
7. maps_directions(transit)：川越→新宿→東京都墨田区押上1-18-7（取行李+到晴空塔）
8. maps_static_map：全天路線圖
9. maps_directions(walking)：押上駅→住宿

川越巴士：小江戶巡迴巴士一日券¥500（東口搭車→氷川神社前下車）
⚠️ 新宿行李寄放：標註具體位置、費用、8人需幾個大櫃

---

### Agent 10 ─ 🍽️ Day5 餐廳+川越景點
類型：maps-dining
輸出：d:\Github\Travel\output\day5_meals.md

任務：查詢 4/14 三餐。早上箱根(Ninotaira)，中午川越，晚上晴空塔(押上1-18-7)。

早餐 07:30：
- maps_search_nearby 箱根民宿附近 07:00開門的 breakfast（山區早上開得晚！）

午餐 13:00（maps_compare_places）：
- 主選：小川菊（川越，鰻魚飯，可能排隊！）
- 備案1：春夏秋冬（金笛醬油，素食✅）
- 備案2：maps_search_nearby 川越藏造老街 "family restaurant"

晚餐 19:00（maps_compare_places）：
- 主選：敘敘苑 晴空塔30F（燒肉，⚠️8人需預約！查預約方式）
- 備案1：Soratoraya 宙寅屋（1F美食街）
- 備案2：maps_search_nearby 晴空塔 "vegetarian family restaurant"

額外查詢：
- maps_search_places + maps_place_details：川越冰川神社（釣鯛魚籤/推車通行）
- maps_explore_area：川越藏造老街
- maps_search_places + maps_place_details：菓子屋橫丁

---

### Agent 11 ─ 🚃🍽️ Day6 全部（退房→機場）
類型：maps-transport
輸出：d:\Github\Travel\output\day6_all.md

任務：查詢 4/15 退房到機場的一切。住：東京都墨田区押上1-18-7，10:00退房，14:10班機。

交通：
1. maps_plan_route：住宿(押上1-18-7)→京成上野站→成田機場T1
2. maps_directions(transit)：押上→京成上野站（8人全部行李+推車）
3. maps_directions(transit)：京成上野→成田機場T1（Skyliner 41分）
4. maps_static_map：路線圖

早餐 08:00（maps_compare_places）：
- 主選：ENRICH
- 備案：Mr.Bakeman Bake&coffee
- maps_search_places + maps_place_details + maps_directions(walking) 從住宿

機場：
- maps_explore_area：成田機場第一航廈（伴手禮/免稅店/兒童設施）
- maps_search_nearby：機場內 "restaurant vegetarian"（最後午餐）

---

### Agent 12 ─ 📊 全程總結
類型：maps-explorer
輸出：d:\Github\Travel\output\summary.md

任務：跨日彙整資訊。

1. maps_weather：東京天氣 + 箱根天氣 → 4月中旬穿著建議

2. maps_search_nearby 三個住宿附近 hospital/clinic：
   - 東京都台東区根岸2-16-5
   - Ninotaira 1118-2, Hakone
   - 東京都墨田区押上1-18-7

3. maps_air_quality：大涌谷空氣品質（硫磺對幼兒/長輩安全嗎？）

4. 六天總費用估算表：
| 項目 | 成人×4 | 長輩×2 | 6歲×1 | 2歲×1 | 小計 |
交通：Skyliner來回¥4,500/人、周遊券¥7,500/¥1,850、JR¥210+¥760、川越巴士¥500、特急券¥1,110×2次
門票：動物園¥600、雕刻之森
餐費：6天3餐估算

5. 實用APP（交通查詢/導航/翻譯/支付）
6. 行前準備清單（預約餐廳/票券/必帶物品）
7. 緊急聯絡：台北駐日代表處、119急救、110警察

---

## 調度指令

請使用 Agent 工具，在同一個回覆中並行發出以上 12 個 agent。
- Agent 1,3,5,7,9,11 使用 maps-transport agent 類型
- Agent 2,4,6,8,10 使用 maps-dining agent 類型
- Agent 12 使用 maps-explorer agent 類型
- 全部設定 run_in_background: true

每個 agent 完成後會把結果寫入 d:\Github\Travel\output/ 對應的 .md 檔。

## 最終彙整（全部 agent 完成後執行）

全部 12 個 agent 完成後，請依序：

### 步驟 1：整合 Markdown
讀取所有 output/*.md，按天合併成一份完整旅遊手冊，寫入 d:\Github\Travel\output\FINAL_GUIDE.md

### 步驟 2：產生離線 HTML 旅遊手冊
讀取 FINAL_GUIDE.md，產生一個精美的單頁 HTML 檔案，寫入 d:\Github\Travel\output\travel-guide.html

HTML 需求：

【核心】
- 完全離線可用（所有 CSS/JS 內嵌，零外部依賴，飛機模式也能看）
- 中文字型：系統內建（"Microsoft JhengHei", "PingFang TC", "Noto Sans TC", sans-serif）

【📱 手機優先設計（旅途中主要用手機看！）】
- Mobile-first RWD，斷點：手機 <768px / 平板 768-1024px / 桌面 >1024px
- 手機上字體至少 16px（避免 iOS 自動縮放）
- 按鈕/可點擊區域至少 44x44px（手指友善）
- 頂部固定導覽列：Day1~Day6 橫向滑動按鈕（手機上可左右滑）+ 當天自動高亮
- 底部固定浮動按鈕「🆘 緊急」→ 點擊展開緊急聯絡（代表處電話/119/110）
- 每日區塊內用 Tab 切換：📋總覽 | 🚃交通 | 🍽️餐廳（減少單頁滾動量）
- 餐廳卡片可左右滑動瀏覽（主選→備案1→備案2）
- 地址可點擊→直接開啟 Google Maps APP 導航
- 電話號碼可點擊→直接撥打（用 tel: 連結）
- 支援「加入主畫面」（PWA manifest，手機桌面捷徑圖示）

【視覺設計】
- 每天用不同顏色的卡片區分（Day1藍/Day2綠/Day3橙/Day4紫/Day5紅/Day6灰）
- 可折疊 <details>/<summary>（交通/餐廳詳情預設收合，節省畫面）
- 醒目標註：⚠️警告紅底、✅素食綠底、🚼推車藍底、💰費用黃底
- 時間軸用垂直 timeline 樣式（左側時間點，右側內容卡片）
- 深色模式支援（@media prefers-color-scheme: dark）

【列印 PDF】
- 支援 Ctrl+P / 列印
- @media print：自動展開所有折疊、移除導覽列/浮動按鈕、適合 A4
- 每天從新頁開始（page-break-before）

HTML 結構大綱：
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="theme-color" content="#1a73e8">
  <link rel="manifest" href="data:application/json,..."><!-- inline PWA manifest -->
  <title>2026 東京箱根家族旅遊手冊</title>
  <style>
    /* === Mobile-first base === */
    /* 16px 基礎字體、44px 最小觸控區 */

    /* === 固定頂部導覽 === */
    /* Day1-6 橫向滑動（overflow-x: auto）、當天高亮 */

    /* === 每日區塊 === */
    /* 不同顏色卡片、Tab 切換（總覽/交通/餐廳）*/

    /* === 時間軸 timeline === */
    /* 左側時間點 + 右側內容卡片 */

    /* === 餐廳卡片滑動 === */
    /* 橫向 scroll-snap 滑動（主選→備案）*/

    /* === 可折疊 details/summary === */

    /* === 地址/電話可點擊 === */
    /* a[href^="https://maps.google.com"] 樣式 */
    /* a[href^="tel:"] 樣式 */

    /* === 底部浮動緊急按鈕 === */
    /* position: fixed; bottom: 20px; right: 20px */

    /* === 深色模式 === */
    /* @media (prefers-color-scheme: dark) */

    /* === RWD 斷點 === */
    /* @media (min-width: 768px) 平板 */
    /* @media (min-width: 1024px) 桌面 */

    /* === 列印 === */
    /* @media print：展開所有折疊、移除nav/浮動、A4、page-break-before */
  </style>
</head>
<body>
  <!-- 頂部導覽（手機橫向滑動） -->
  <nav class="sticky-nav">
    <div class="nav-scroll">
      <a href="#day1" class="nav-btn day1-color">Day1 上野</a>
      <a href="#day2" class="nav-btn day2-color">Day2 動物園</a>
      <a href="#day3" class="nav-btn day3-color">Day3 箱根</a>
      <a href="#day4" class="nav-btn day4-color">Day4 黃金路線</a>
      <a href="#day5" class="nav-btn day5-color">Day5 川越</a>
      <a href="#day6" class="nav-btn day6-color">Day6 回程</a>
    </div>
  </nav>

  <header>
    <h1>🗼 2026 東京箱根家族旅遊手冊</h1>
    <p>4/10-4/15 ｜ 8人（長輩2+成人4+兒童2）</p>
  </header>

  <main>
    <!-- 每日區塊 -->
    <section id="day1" class="day-section day1-color">
      <h2>Day 1 — 4/10（五）台灣→上野</h2>

      <!-- Tab 切換 -->
      <div class="day-tabs">
        <button class="tab active" data-tab="overview">📋 總覽</button>
        <button class="tab" data-tab="transport">🚃 交通</button>
        <button class="tab" data-tab="meals">🍽️ 餐廳</button>
      </div>

      <div class="tab-content" id="overview">
        <!-- 垂直時間軸 -->
        <div class="timeline">
          <div class="timeline-item">
            <span class="time">10:40</span>
            <div class="content">桃園機場起飛 ✈️</div>
          </div>
          <!-- ... -->
        </div>
      </div>

      <div class="tab-content hidden" id="transport">
        <details><summary>🚃 成田機場 → 京成上野（Skyliner）</summary>
          <!-- 樹狀交通資訊 -->
        </details>
      </div>

      <div class="tab-content hidden" id="meals">
        <!-- 餐廳卡片橫向滑動 -->
        <h3>晚餐 18:30</h3>
        <div class="restaurant-carousel">
          <div class="restaurant-card primary"><!-- 主選：韻松亭 --></div>
          <div class="restaurant-card backup"><!-- 備案1 --></div>
          <div class="restaurant-card backup"><!-- 備案2 --></div>
        </div>
      </div>
    </section>

    <!-- Day2 ~ Day6 同結構 -->
    <section id="summary"><!-- 總費用、APP、行前清單 --></section>
  </main>

  <!-- 底部浮動緊急按鈕 -->
  <button class="emergency-fab" onclick="toggleEmergency()">🆘</button>
  <div class="emergency-panel hidden">
    <h3>緊急聯絡</h3>
    <a href="tel:+81-3-3280-7811">📞 台北駐日代表處</a>
    <a href="tel:119">🚑 急救 119</a>
    <a href="tel:110">🚔 警察 110</a>
  </div>

  <script>
    // Tab 切換
    // 平滑滾動
    // 當天自動高亮
    // 緊急面板開關
    // 深色模式偵測
  </script>
</body>
</html>
```

### 步驟 3：確認
完成後告訴我：
1. output/FINAL_GUIDE.md 已產生
2. output/travel-guide.html 已產生
3. 提醒我可以用瀏覽器開啟 travel-guide.html 查看，或 Ctrl+P 列印成 PDF
```
