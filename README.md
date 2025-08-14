# ShoppyGlobe Backend API

Backend API for **ShoppyGlobe E-Commerce Site** built with Node.js, Express.js, and MongoDB.  
User authentication (JWT), product listing, and shopping cart functionality implemented.

## Features
- **User Authentication** (Register and Login) using JWT
- **Product Management** (Fetch all products, fetch single product)
- **Shopping Cart** (Add, Update, Remove items)
- **MongoDB Integration** with Mongoose
- **Input Validation & Error Handling**
- **Protected Routes** for cart operations

## 🛠 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** + Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variables
- **cors** for cross-origin access


---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/hardikjha/shoppyglobe-api
cd shoppyglobe-api


### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
Create a `.env` file in the root folder and add:
```
MONGO_URI=mongodb://127.0.0.1:27017/shoppyglobe
JWT_SECRET=yourSecretKey
PORT=5000
```

> **Note:** Do not commit `.env` — it’s in `.gitignore`.

### 4. Start MongoDB
If running locally:
```bash
mongod
```
Or ensure MongoDB service is running.

### 5. Start the server
```bash
npm run dev
```
Server will run at:
```
http://localhost:5000
```

---

## API Endpoints

### **Auth**
| Method | Endpoint          | Description         | Auth Required |
|--------|-------------------|--------------------|---------------|
| POST   | `/auth/register`  | Register new user  | No            |
| POST   | `/auth/login`     | Login user & get JWT| No            |

### **Products**
| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| GET    | `/products`           | Get all products         | No            |
| GET    | `/products/:id`       | Get product by ID        | No            |

### **Cart**
| Method | Endpoint              | Description                | Auth Required |
|--------|-----------------------|----------------------------|---------------|
| GET    | `/cart`               | View cart items            | Yes           |
| POST   | `/cart`               | Add item to cart           | Yes           |
| PUT    | `/cart/:id`           | Update cart item quantity  | Yes           |
| DELETE | `/cart/:id`           | Remove item from cart      | Yes           |

---

## 🔑 Authentication
- Use **Bearer Token** in the `Authorization` header for protected routes:
```
Authorization: Bearer <your_jwt_token>
```
- Tokens are obtained via the `/auth/login` endpoint.

---

## 🧪 Testing
All routes were tested using **ThunderClient**:

---

## 📷 Screenshots
- Check out the Screenshots folder in the repo or the Test Results PDF

---

[Repository Link](https://github.com/hardikjha/shoppyglobe-api)

Made by Hardik Kumar
---

