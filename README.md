# Travel · 家族旅遊規劃工作區

以 Claude Code + Google Maps MCP 輔助規劃家族旅遊。每趟旅遊獨立資料夾於 `trips/`，共用 agents 與模板放在根目錄。

## 📁 資料夾結構

```
Travel/
├── CLAUDE.md            # 共用規則（繁體中文、MCP 用法）
├── templates/           # 新旅遊模板
└── trips/               # 所有旅遊規劃
    ├── 2026-04-tokyo-hakone/   # 2026/4 東京+箱根
    ├── 2026-05-kansai/         # 2026/5 京阪神
    └── 2026-10-kansai/         # 2026/10 京阪神（時代祭）
```

### 各趟旅遊檔案
- `CLAUDE.md` — 本趟專屬資訊（旅客、日期、需求、關鍵決策）
- `output/FINAL_GUIDE.md` — 整合版手冊
- `output/travel-guide.html` — 離線網頁版（手機可看、Ctrl+P 列印 PDF）
- `output/hotels_*.md`、`transport_*.md`、`attractions_backup.md`、`price_check.md` — agent 分項報告

## 🛠️ 工具

### MCP Server
- `@cablate/mcp-google-map` — Google Maps 查詢（地點/路線/天氣）

### 自定義 Agents（`.claude/agents/`，本地設定不入 repo）
| Agent | 專長 |
|-------|------|
| `maps-transport` | 交通路線、海拔、地圖 |
| `maps-dining` | 餐廳比較、素食搜尋 |
| `maps-explorer` | 景點探索、天氣、生活機能 |

## 🔒 注意事項

- `.mcp.json` 含 API Key，**已在 `.gitignore` 排除**，請勿提交。
- 所有對話、輸出內容使用**繁體中文**。
- 旅遊規劃含個人資訊（旅客組成/預算），建議 repo 保持 **Private**。

## ✈️ 既有旅遊

| 旅遊 | 日期 | 人數 | 主題 |
|------|------|------|------|
| [2026-04-tokyo-hakone](trips/2026-04-tokyo-hakone/) | 2026/4/10-15 | 8 人（6 大 2 小）| 東京+箱根 |
| [2026-05-kansai](trips/2026-05-kansai/) | 2026/5 | — | 京阪神 |
| [2026-10-kansai](trips/2026-10-kansai/) | 2026/10/20-25 | 9 人 | 京阪神·時代祭 |
