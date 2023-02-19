# expense-tracker

expense-tracker是一個可以協助使用者進行記帳的工具。
使用者可藉由此專案:
- 紀錄各個支出的支出項目、支出日期、支出類別和支出金額。
- 刪除和修改各支出紀錄。
- 篩選出特定支出類別的所有支出。

## prerequisites
- Node.js
- Express
- MongoDB Atlas

## intallation
1.下載專案
```
git clone https://github.com/MayHuangg/expense-tracker.git
cd expense-tracker
npm install
```
2.建立檔案.env，並將.env.example中的變數複製過去進行設定

3.啟動專案
```
npm run start //啟動專案
npm run seed //建立種子資料
```
4.進入 http://localhost:3000 即可使用此專案。
