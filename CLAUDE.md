# Travel 家族旅遊規劃工作區

此工作區集中管理多趟家族旅遊規劃。每趟旅遊獨立一個資料夾於 `trips/`，共用的 MCP 設定、agents、模板則放在根目錄。

## 語言
- 所有對話、檔案內容、輸出一律使用**繁體中文**
- 地名可保留日文/外文原文（括號內附中文翻譯）

## 資料夾結構

```
Travel/
├── .claude/agents/      # 共用自定義 agents（maps-transport/dining/explorer）
├── .mcp.json            # 共用 MCP server 設定
├── CLAUDE.md            # 本檔（共用規則）
├── templates/           # 共用模板（新旅遊複製後改寫）
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
| `maps-dining` | sonnet | 餐廳比較、素食搜尋 | 查餐廳/評分/預約/素食選項 |
| `maps-explorer` | sonnet | 景點探索、天氣、生活機能 | 查景點/天氣/醫院/便利商店 |

## 如何新增一趟旅遊

1. 在 `trips/` 下建立新資料夾，命名 `YYYY-MM-<目的地>`（例：`2026-07-okinawa`）
2. 從 `templates/` 複製需要的模板到新資料夾（首次規劃時此資料夾可能仍為空，可直接參考 `trips/2026-04-tokyo-hakone/` 的結構）
3. 建立該趟的 `CLAUDE.md`（旅客組成、日期、特殊需求）
4. 放入 `itinerary.tsv` 行程表
5. 改寫 prompts 後，呼叫 orchestrator 並行執行 agents
6. 整合 `output/` 為 `FINAL_GUIDE.md` 與 `travel-guide.html`

## 既有旅遊
- [`trips/2026-04-tokyo-hakone/`](trips/2026-04-tokyo-hakone/) — 2026/4/10-4/15 東京＋箱根，6大2小
