# Travel 家族旅遊規劃工作區

此工作區集中管理多趟家族旅遊規劃。每趟旅遊獨立一個資料夾於 `trips/`，共用的 MCP 設定、agents、skills 則放在根目錄。

## 語言
- 所有對話、檔案內容、輸出一律使用**繁體中文**
- 地名可保留日文/外文原文（括號內附中文翻譯）

## 資料夾結構

```
Travel/
├── .claude/agents/      # 共用自定義 agents（maps-transport/dining/explorer）
├── .claude/skills/      # 共用 skills（new-trip / build-travel-guide / verify-youtube-sources）
├── .mcp.json            # 共用 MCP server 設定
├── CLAUDE.md            # 本檔（共用規則）
└── trips/               # 所有旅遊規劃
    └── YYYY-MM-<目的地>/     # 例：2026-04-tokyo-hakone
        ├── CLAUDE.md          # 本趟專屬資訊（旅客、日期、需求）
        ├── itinerary.tsv      # 行程表
        ├── prompts/           # 本趟客製提示詞
        └── output/            # agent 輸出、整合檔、離線網頁
```

### 各趟旅遊常見檔案
- `prompts/orchestrator.md` — 並行調度（推薦，多 agent 同時跑）
- `prompts/dayN.md` — 分天提示詞（備用）
- `output/FINAL_GUIDE.md` — 整合版手冊
- `output/travel-guide.html` — 離線網頁版（手機可開、Ctrl+P 列印 PDF）

## MCP 工具
- 使用 `@cablate/mcp-google-map` MCP Server
- 執行 `claude mcp list` 確認 `google-maps` 顯示 `✓ Connected`
- 若未連線，重新啟動 Claude CLI

### ⚠️ 已知問題與正確用法

#### 1. `maps_place_details` 參數名稱
- ❌ 錯誤：`{"place_id": "ChIJ..."}`
- ✅ 正確：`{"placeId": "ChIJ..."}` （駝峰式）
- `placeId` 需先透過 `maps_search_places` 或 `maps_search_nearby` 取得

#### 2. 兩步驟查詢地點詳細資訊
```
步驟1: maps_search_places → 取得 place_id
步驟2: maps_place_details(placeId: "...") → 取得詳細資料
```

#### 3. 直接用 npx exec 測試時需加 API Key
- ❌ 錯誤：`npx @cablate/mcp-google-map exec maps_search_places '{...}'`
- ✅ 正確：`npx @cablate/mcp-google-map exec maps_search_places '{...}' --apikey YOUR_KEY`
- 在 Claude CLI 對話中使用 MCP 工具則不需要，API Key 已設定在 `.claude.json`

## 自定義 Agent 類型（`.claude/agents/`）

| Agent 類型 | 模型 | 專長 | 用途 |
|-----------|------|------|------|
| `maps-transport` | sonnet | 交通路線、海拔、地圖 | 查路線/票價/推車無障礙/電梯 |
| `maps-dining` | sonnet | 餐廳比較、依需求搜尋飲食 | 查餐廳/評分/預約/特殊飲食選項 |
| `maps-explorer` | sonnet | 景點探索、天氣、生活機能 | 查景點/天氣/醫院/便利商店 |

> 三隻皆**國家中立**：執行前先讀該趟 `CLAUDE.md` 取得旅客組成/需求/幣別，不寫死國家或旅客。皆含 `WebSearch`/`WebFetch` 可查官方票價/班次佐證；若該趟為 YouTube 取材模式，Maps 與 Web 僅作佐證、不當景點來源。

## 共用 Skills（`.claude/skills/`）

| Skill | 用途 |
|-------|------|
| `new-trip` | 新增一趟旅遊：收集基本資料 → 建立 `trips/YYYY-MM-<目的地>/` 標準骨架（CLAUDE.md／itinerary.tsv／orchestrator.md／output/）→ 登記。**取代舊的空 `templates/` 機制，模板集中在此 skill 內。** |
| `build-travel-guide` | 把某趟 `output/*.md` 整合成 `FINAL_GUIDE.md`，再依內建骨架 `template.html` 產出 mobile-first 離線 `travel-guide.html`。**HTML 的 CSS/JS 統一收錄在此 skill，新趟不再各自複製規格。** |

> 觸發方式：對話中說「新增一趟旅遊／整合手冊／做網頁版」，或直接 `/new-trip`、`/build-travel-guide`。

## 如何新增一趟旅遊

**直接用 `/new-trip` skill**，它會引導收集資料並自動建立標準骨架。等同以下流程：

1. `/new-trip` → 回答目的地/日期/旅客/需求/取材模式 → 自動建立 `trips/YYYY-MM-<目的地>/`（CLAUDE.md、itinerary.tsv、prompts/orchestrator.md、output/）並登記到本檔「既有旅遊」
2. 補完 `itinerary.tsv` 與 `prompts/orchestrator.md` 的各 agent 任務
3. 呼叫 orchestrator 並行執行 agents（YouTube 取材趟先 `/verify-youtube-sources` 驗證來源）
4. `/build-travel-guide` 整合 `output/` 為 `FINAL_GUIDE.md` 與 `travel-guide.html`

## 既有旅遊
- [`trips/2026-04-tokyo-hakone/`](trips/2026-04-tokyo-hakone/) — 2026/4/10-4/15 東京＋箱根，6大2小
- [`trips/2026-07-kaohsiung/`](trips/2026-07-kaohsiung/) — 2026/7/4-7/5 高雄兩天一夜，1大1幼（2歲），**行程只取材自 YouTube 影片**、全程大眾運輸
