# 📚 **Blog Master - Documentation**

## 🚀 **Project Overview**

**Blog Master** is a backend application for managing a blogging platform. It provides APIs for user authentication, blog management, and admin controls. Built with **TypeScript**, **Express.js**, **MongoDB**, **Mongoose**, and **Node.js**, it ensures scalability, security, and efficiency.

---

## 🛠️ **Technologies Used**

- **TypeScript**: Static typing and improved developer experience.
- **Express.js**: Backend framework for building APIs.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM for MongoDB.
- **Node.js**: JavaScript runtime for server-side execution.
- **JWT (JSON Web Token)**: Secure user authentication.

---

## 🔑 **Key Features**

### ✅ **User Authentication**

- User registration with secure password hashing.
- User login with JWT token verification.
- Token-based authentication for secure API access.

### ✅ **Blog Management**

- Create, update, and delete blog posts.
- Fetch all blog posts.
- Fetch a single blog post by ID.

### ✅ **Admin Controls**

- Delete or block a user.
- Delete a specific blog post.

### ✅ **Blog Access**

- All users can view all blogs.
- All users can view a single blog.

---

## 📂 **API Documentation**

### 🧑‍💻 **Authentication Routes**

#### 1. **User Registration**

- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "userId": "string"
  }
  ```

#### 2. **User Login**

- **Endpoint:** `POST /api/auth/login`
- **Description:** Login a user and return JWT.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "token": "string"
  }
  ```

### 📝 **Blog Routes**

#### 1. **Create Blog**

- **Endpoint:** `POST /api/blogs`
- **Description:** Create a new blog post.
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Blog created successfully",
    "blogId": "string"
  }
  ```

#### 2. **Get All Blogs**

- **Endpoint:** `GET /api/blogs`
- **Description:** Fetch all blog posts.
- **Response:**
  ```json
  [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "author": "string"
    }
  ]
  ```

#### 3. **Get Single Blog**

- **Endpoint:** `GET /api/blogs/:id`
- **Description:** Fetch a specific blog by ID.
- **Response:**
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "author": "string"
  }
  ```

### 🛡️ **Admin Routes**

#### 1. **Delete User**

- **Endpoint:** `DELETE /api/admin/users/:id`
- **Description:** Delete a user by ID.
- **Response:**
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

#### 2. **Delete Blog**

- **Endpoint:** `DELETE /api/admin/blogs/:id`
- **Description:** Delete a specific blog by ID.
- **Response:**
  ```json
  {
    "message": "Blog deleted successfully"
  }
  ```

---

## 🔒 **Authentication & Authorization**

- User actions are protected using JWT middleware.
- Admin routes require elevated privileges.

---

## 🛡️ **Security Measures**

- Password hashing using **bcrypt**.
- Token verification for secure endpoints.
- Data validation with **Zod**.

---

## 📊 **Database Structure**

### User Model

```typescript
{
  username: String,
  email: String,
  password: String,
  role: String (user/admin),
  isBlocked: Boolean
}
```

### Blog Model

```typescript
{
  title: String,
  content: String,
  author: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚙️ **Installation & Setup**

1. Clone the repository:

```bash
git clone https://github.com/your-repo/blog-master.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and configure environment variables.

4. Start the server:

```bash
npm run dev
```

---

## 🧪 **Testing**

- API endpoints can be tested using **Postman** or **Insomnia**.
- Run unit tests:

```bash
npm run test
```

---

## 📄 **License**

This project is licensed under the **MIT License**.

---

## 🤝 **Contributing**

- Fork the repository.
- Create a feature branch.
- Submit a pull request.

---

## 📬 **Contact**

- **Developer:** Md Suny Shaikh
- **Email:** suny@example.com
- **GitHub:** [github.com/suny-webdevs](https://github.com/suny-webdevs)

---

**Happy Blogging! 🚀**
