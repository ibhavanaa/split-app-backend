# split-app-backend
# 📊 Split App – Expense Sharing Backend

A Node.js + Express backend that helps friends or groups **track shared expenses**, **split costs**, and **settle up fairly** — similar to Splitwise.

---

## 🔗 Live Railway API

https://split-app-backend-production-3614.up.railway.app


You can test this API using Postman or browser.

---

## 📂 GitHub Repository

https://github.com/ibhavanaa/split-app-backend


---

## 📬 Postman Collection

https://gist.github.com/ibhavanaa/ac5361273ff81fc4a7c7ea0f2ea75809


✅ Includes:

- Add, update, delete, and view expenses
- Calculate balances per person
- Show simplified settlements
- All edge case tests (invalid inputs, missing fields, etc.)

---

## 🚀 Technologies Used

- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **MongoDB Atlas** – NoSQL cloud database
- **Mongoose** – ODM for MongoDB
- **Railway** – Cloud deployment platform
- **Postman** – API testing

---

## 🛠️ Setup Instructions (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/ibhavanaa/split-app-backend.git

cd split-app-backend

## Install Dependencies
npm install

## Create a .env file in the root folder:
MONGO_URI=your_mongodb_connection_string
PORT=5000

## Start the Server
npm run dev

## Your server will run at:
http://localhost:5000


| Method | Endpoint        | Description                        |
| ------ | --------------- | ---------------------------------- |
| POST   | `/expenses`     | Add a new expense                  |
| GET    | `/expenses`     | Get all expenses                   |
| PUT    | `/expenses/:id` | Update an existing expense         |
| DELETE | `/expenses/:id` | Delete an expense                  |
| GET    | `/people`       | Get all unique people in expenses  |
| GET    | `/balances`     | Calculate net balances             |
| GET    | `/settlements`  | Simplified "who pays whom" results |


Sample Expense Entry
POST /expenses Body

{
  "amount": 600,
  "description": "Dinner",
  "paid_by": "Shantanu",
  "participants": ["Shantanu", "Sanket", "Om"],
  "split_type": "equal"
}


### Logic Behind Balances & Settlements
## For each expense:
Total is split equally among participants.
The paid_by user receives the full amount as credit.
Each participant owes their share, creating a running balance.

## Final balances:
Positive = person is owed money
Negative = person owes money

## Settlements:
Uses a greedy algorithm to minimize total number of transactions:
Highest debtor pays off highest creditor until balances zero out.

### Edge Case Handling
| Case                          | Outcome                                |
| ----------------------------- | -------------------------------------- |
| Negative or zero amount       | Rejected with status `400 Bad Request` |
| Missing required fields       | Rejected with status `400`             |
| Invalid expense ID            | Returns `404 Not Found`                |
| GET balances with no expenses | Returns empty object `{}`              |


Author
Bhavana Choudhary

