# 福岡 6天5夜 並行 Agent Teams 調度提示詞

## 旅遊基本資料
- 日期：2026/7/18(六) ~ 7/23(四)
- 旅客：6 大 3 小（1國小+1幼稚園+1幼幼需推車）
- 住宿：博多站附近單一飯店 5 晚不換房
- 不需考慮素食
- 都需要主選＋備案（餐廳、景點）

## 派遣的 8 個 Agent（已執行）

| # | Agent 類型 | 輸出檔案 | 任務 |
|---|-----------|---------|------|
| 1 | maps-explorer | hotels.md | 博多站家族飯店研究（主選＋備案） |
| 2 | maps-transport | day1_transport.md | 機場→博多 + 第一天晚餐 |
| 3 | maps-explorer | day2_full.md | 福岡市區親子日（含交通、餐廳） |
| 4 | maps-explorer | day3_full.md | 太宰府文化日（含交通、餐廳） |
| 5 | maps-explorer | day4_full.md | 柳川遊船日（含交通、餐廳） |
| 6 | maps-explorer | day5_full.md | 門司港・小倉復古日 |
| 7 | maps-transport | day6_all.md | 退房→採購→機場 |
| 8 | maps-explorer | summary.md | 天氣、醫療、費用估算、行前準備 |

## 整合步驟（agents 全部完成後）
1. 讀取 output/*.md
2. 彙整成 output/FINAL_GUIDE.md
3. 產生 output/travel-guide.html（mobile-first 離線單頁）
