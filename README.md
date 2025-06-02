# 🛍️ Vue Shopping Web

A fullstack e-commerce project built with **Vue 3** for frontend and **Firebase** for backend services. This project was created as part of my journey to become a fullstack developer.



## 🚀 Tech Stack

- **Frontend:** Vue 3, TypeScript, Pinia, Vue Router, Tailwind CSS, DaisyUI  
- **Backend:** Firebase (Auth, Firestore, Realtime DB, Storage, Cloud Functions)  
- **Others:**  
  - **Omise** – Payment Gateway  
  - **Algolia** – Search Indexing  
  - **Zod** – Input Validation  
  - **ApexCharts** – Dashboard Charts
  

# 🛍️ Demo

https://vue-shopping-web.web.app/



## 🔐 Authentication

- Uses **Firebase Auth**  
- Supports **Google login** and **Email/Password login**  
- All input fields are validated with **Zod**  
- Navigation guards protect routes based on user roles  


## 👥 Roles

- **User (Client)**  
- **Admin (Seller)**  



## 🛒 User Features

- View all **open-status products**  
- Each product supports **variants** (e.g., color, size)  
- Add products to cart (**Realtime DB**)  
- Place an order → triggers **Omise** payment → updates order status  
- Cancel orders (if still allowed)  
- Search and sort products using **Algolia** by name, variant, and price range  
- Edit profile and upload profile picture (**Firebase Storage**)  



## 🛠️ Admin Features

- Full **CRUD** on products  
- Upload product images (Firebase Storage)  
- View and manage all orders (can cancel unfinished orders)  
- Dashboard with:
  - Total sales
  - Success & failed orders
  - Best-selling products
  - Daily sales chart (**ApexCharts**, from Realtime DB)



## ⚙️ Cloud Functions

- **Create Payment URL** using Omise and return it to client  
- **Webhook endpoint** to confirm payment and update stock/order status  
- **Trigger Functions:**
  - On order status change → update stock (decrease/restock)  
  - On product change → update **Algolia** index  



## 📱 Responsive Design

- Fully responsive UI across mobile, tablet, and desktop  



## 🧪 Validation

- All forms and inputs validated using **Zod** for safety and consistency  



## 📦 Deployment

- Hosted with **Firebase Hosting**  
- Backend logic managed via **Firebase Cloud Functions**  


## 🧠 Lessons Learned

- How to integrate a complete fullstack app with real services  
- Role-based routing with Vue Router  
- How to use Algolia and Omise in a real-world app  
- Managing state with Pinia and Firebase in sync  
