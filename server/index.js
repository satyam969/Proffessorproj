const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const researchRoutes = require("./routes/researchRoutes");
const blogRoutes = require("./routes/blogRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const teachingRoutes = require("./routes/teachingRoutes");
const awardRoutes = require("./routes/awardRoutes");
const collaborationRoutes = require("./routes/collaborationRoutes");
const userRoutes = require("./routes/userRoutes");
const conferenceRoutes = require("./routes/conferenceRoutes")

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const fileUpload = require("express-fileupload");

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));


app.use("/api/projects", projectRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/teaching", teachingRoutes);
app.use("/api/awards", awardRoutes);
app.use("/api/collaborations", collaborationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conferences",conferenceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));