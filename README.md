# 老爸的私房錢：記帳系統
本專案提供使用者紀錄日常支出，透過次專案練習並且加深對於node.js搭配express框架開發網頁、mongoDB的資料庫連線、在node.js中使用mongoose語法調動資料。
並且讓使用者可以透過heroku連結實際體驗本專案
heroku專案網址：https://arcane-basin-01596.herokuapp.com/

## 專案功能
- 使用者可以在首頁瀏覽所以支出
- 使用者可以在首頁點擊新增支出來紀錄新的開銷
- 使用者可以透過Detail按鈕檢視每筆開銷的內容
- 使用者可以透過Delete按鈕來刪除以記錄的支出
- 使用者可以透過Edit按鈕修改以記錄的支出
- 使用者可以依照類別在下拉式選單選擇查看不同類別的支出

## 編程環境
Node.js v10.24.1

## 使用框架及套件
- express 4.17.1
- express-handlebars 5.3.2
- express-handlebars-helpers 0.10.0
- bootstrap 5.0.2
- popper 2.9.2
- method-override 3.0.0
- mongoose 5.13.3
- mongoDB: 4.2.14

## 安裝流程
1. git clone本專案下載至本地
```
https://github.com/Chao69/expense-tracker.git
```
2. 進入專案資料夾
```
cd expense-tracker
```
3. npm安裝套件
```
npm install
```
4. 載入種子資料
```
npm run seed
```
5. 啟動網頁伺服器
```
npm run dev
```
6. 啟動成功後，點選所出現連結開啟網頁
Server is running on http://localhost:3000