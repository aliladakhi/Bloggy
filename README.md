# Bloggy

**Bloggy** is a feature-rich blogging platform built with Node.js, Express, MongoDB, and Mongoose. It supports user authentication, blog management, and dynamic content rendering. This project utilizes server-side rendering with EJS for templating and Multer for file uploads.

## Features

- **User Authentication**: Register, log in, and manage user sessions.
- **Blog Management**: Create, edit, and delete blog posts.
- **Comments & Likes**: Users can comment on and like blog posts.
- **Profile Management**: Each user has a profile with a profile picture and information.
- **File Uploads**: Support for uploading and displaying images with Multer.
- **Dynamic Rendering**: Server-side rendering using EJS for dynamic content.

## Technologies

- **Node.js**: JavaScript runtime for building the backend server.
- **Express**: Web framework for Node.js for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and blog data.
- **Mongoose**: ODM library for MongoDB, providing schema-based solutions.
- **EJS**: Templating engine for server-side rendering.
- **Multer**: Middleware for handling file uploads.
- **Bootstrap**: Frontend framework for responsive design.

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/aliladakhi/Bloggy.git
    ```

2. **Navigate to the Project Directory**

    ```bash
    cd Bloggy
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Configure Environment Variables**

    Create a `.env` file in the root directory and add your environment variables:

    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    SESSION_SECRET=your_session_secret
    ```

5. **Run the Project**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

- **Homepage**: View and explore blog posts.
- **User Authentication**: Register or log in to manage your account.
- **Create Blog Post**: Add new blog posts with title, content, and image.
- **Edit Blog Post**: Modify existing posts.
- **Delete Blog Post**: Remove posts you no longer want.
- **Profile Page**: Update your profile and view your posts.

## File Structure

- `config/` - Configuration files.
- `controllers/` - Logic for handling requests.
- `models/` - Mongoose schemas and models.
- `routes/` - Express route handlers.
- `views/` - EJS templates for rendering HTML.
- `public/` - Static files like CSS, JavaScript, and images.
- `uploads/` - Directory for storing uploaded files.

## Contributing

1. **Fork the Repository**
2. **Create a New Branch**
3. **Commit Your Changes**
4. **Push to Your Fork**
5. **Create a Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [EJS](https://www.npmjs.com/package/ejs) - Templating engine used for server-side rendering.
- [Multer](https://www.npmjs.com/package/multer) - Middleware used for handling file uploads.
- [Bootstrap](https://getbootstrap.com/) - Frontend framework used for responsive design.
