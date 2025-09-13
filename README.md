# 🏥 Hospital Management System (HMS) - MERN Stac

## 🚀 Project Overview

**Hospital Management System (HMS)** is a full-stack web application designed to streamline and digitize hospital operations. Built with the powerful MERN stack (MongoDB, Express.js, React.js, Node.js), HMS provides a seamless experience for patients, doctors, and administrators. The system enables appointment scheduling, doctor management, secure authentication, messaging, and more—all in a modern, responsive interface.

---

## 🌐 Deployment : https://hospital-mangement-system-app.onrender.com

---

## 📖 Definition

A **Hospital Management System** is a comprehensive software platform that manages all aspects of hospital operations, including patient records, doctor profiles, appointments, messaging, and administrative tasks. This project aims to automate and simplify these processes, improving efficiency, accuracy, and user satisfaction.

---

## 🌟 Features

- **User Authentication:** Secure signup, login, email verification, and password recovery.
- **Doctor Management:** Add, update, and view doctor profiles with images and professional details.
- **Appointment Booking:** Patients can schedule appointments with available doctors.
- **Admin Dashboard:** Manage doctors, appointments, and user messages from a centralized panel.
- **Messaging System:** Patients can send messages to the hospital, and admins can manage them.
- **Responsive UI:** Fully responsive design for desktop, tablet, and mobile devices.
- **Cloud Image Upload:** Doctor images are uploaded and stored securely using Cloudinary.
- **Email Notifications:** Automated emails for verification and notifications.

---

## 🛠️ Tech Stack

**Frontend:**

- [React.js](https://react.dev/) (with Vite for blazing-fast development)
- React Router DOM
- React Icons
- React Multi Carousel
- React Toastify

**Backend:**

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) (with Mongoose ODM)
- Cloudinary (for image uploads)
- Nodemailer (for email notifications)
- Zod (for schema validation)
- JWT (for authentication)

**Other Tools:**

- ESLint (code linting)
- dotenv (environment variables)
- CORS, Cookie-Parser, Express-FileUpload

---

## 📦 Main Dependencies

### Client

- **react**: Frontend library for building UI
- **react-dom**: DOM bindings for React
- **react-router-dom**: Routing for React apps
- **react-icons**: Icon library
- **react-multi-carousel**: Responsive carousels
- **react-toastify**: Toast notifications
- **axios**: HTTP client for API requests

### Server

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **cloudinary**: Cloud image storage
- **nodemailer**: Email sending
- **zod**: Data validation
- **dotenv**: Environment variable management
- **cors**: Cross-origin resource sharing
- **cookie-parser**: Cookie handling
- **express-fileupload**: File uploads

---

## 🏗️ How to Run

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd Hospital-Management-System-App
   ```

2. **Setup environment variables:**

   - Create a `.env` file in the root directory (see `.env.example` for reference).

3. **Install dependencies:**

   - For backend:
     ```sh
     npm install
     ```
   - For frontend:
     ```sh
     cd Client
     npm install
     ```

4. **Run the application:**

   - Start backend server:
     ```sh
     npm run dev
     ```
   - Start frontend (in `Client` folder):
     ```sh
     npm run dev
     ```

5. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:4000](http://localhost:4000)

---

## 💡 Response Example

**Successful Appointment Booking:**

```json
{
  "success": true,
  "message": "Appointment Send Successfully",
  "response": {
    "name": "John Doe",
    "email": "john@example.com",
    "appointDate": "2024-07-01",
    ...
  }
}
```

**Error Example:**

```json
{
  "success": false,
  "message": "Email is not registered"
}
```

---

## 📚 Folder Structure

```
.
├── Client/         # React frontend
│   ├── src/
│   ├── public/
│   └── ...
├── Server/         # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routers/
│   └── ...
├── .env
├── package.json
└── README.md
```

---

## ✨ Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Nodemailer](https://nodemailer.com/)
