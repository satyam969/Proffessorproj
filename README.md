# Professor's Portfolio Website

## Overview
This is a dynamic and user-friendly portfolio website for a professor, built using the MERN (MongoDB, Express.js, React, Node.js) stack. The platform allows the professor to showcase their projects, research papers, conferences, achievements, and blog posts. Additional sections such as about, teaching experience, awards, and collaborations are included.To Reduce Students Burden Anonymous Comments,replies is added, the professors can also upload the pdf of the research papaers they have ..,Admin Panel Implementation, The website is fully responsive and features a modern UI.

## Features
- **Project Listings**: Display professor's projects with details, including images and videos.
- **Research Papers & Conferences**: Showcase research work and conference participation.
- **Blog Section**: Allows posting of blogs with full content, including images and videos.
- **Admin Panel**: Enables adding, editing, and deleting content across sections.
- **Media Uploads**: Support for image and video uploads.
- **Comments & Replies**: Users can comment on projects and reply to comments.
- **Search & Filtering**: Helps visitors find specific research papers, projects, or blog posts easily.
- **Dynamic UI**: Built with React for an interactive and seamless user experience.
- **Responsive Design**: Optimized for all devices.

## Technologies Used
- **Frontend**: React.js,react-bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Storage**: Cloudinary for media uploads

- Projects Page:-
- ![image](https://github.com/user-attachments/assets/9ce15522-4345-495b-90a1-29e57560ca75)

-Comments,Replies Feature
- ![image](https://github.com/user-attachments/assets/a260f591-df3e-4fea-9b8a-e124573622fd)

-Interface
![image](https://github.com/user-attachments/assets/e1f37e0e-516d-41f2-bc23-de6eb9463dc9)

- 

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB (or MongoDB Atlas for cloud storage)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/your-repository/professor-portfolio.git
cd professor-portfolio
```

### Install Dependencies
#### Backend
```bash
cd server
npm install
```
#### Frontend
```bash
cd teacher-prtfolio
npm install
```

### Environment Variables
Create a `.env` file in the root of the backend directory and add:
```
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=your_cloudinary_secret
```
Create a `.env` file in the root of the frontend directory and add:
```
VITE_URL=http://localhost:5000
```

### Run the Application
#### Start the Backend Server
```bash
cd backend
npm start
```
#### Start the Frontend
```bash
cd frontend
npm run dev
```
The frontend should now be running at `http://localhost:5173` (Vite default).

## API Routes
### Projects
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Add a new project (Admin only)
- `PUT /api/projects/:id` - Update a project (Admin only)
- `DELETE /api/projects/:id` - Delete a project (Admin only)

### Comments & Replies
- `POST /api/comments` - Add a comment
- `POST /api/comments/reply` - Add a reply to a comment
- `DELETE /api/comments/:id` - Delete a comment and its replies

### Other Sections
Similar CRUD endpoints exist for research papers, conferences, blog posts, and achievements.

## Deployment
The project is deployed at:
🔗 **[Live Site](https://proffessorproj-2.onrender.com/)**

## Future Enhancements
- Add user authentication for restricted content access
- Implement likes on comments and projects
- Enhance filtering and search functionality
- Improve SEO optimization

## Contributing
Feel free to fork this repository and submit pull requests for improvements.

## License
This project is open-source under the MIT License.

