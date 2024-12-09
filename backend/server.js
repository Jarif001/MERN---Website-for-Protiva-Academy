import bcrypt from "bcrypt";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import path from "path";
import feeRouter from './routes/fees.route.js';
import managementRouter from './routes/management.route.js';
import teacherRouter from './routes/teachers.route.js';
dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.json()); // allows json response
app.use(cors({ origin: 'http://127.0.0.1:3000' }));
app.use("/api/teachers", teacherRouter);
app.use("/api/managements", managementRouter);
app.use("/api/fees", feeRouter);

const hashedPassword = "$2b$10$u52W.3s/OJC/STH3dE4AHOwgH.FspHe6eeNZqwimP0w0A3THZXhv6";
const ADMIN_USERNAME = "protiva123";

  const JWT_SECRET = process.env.JWT_SECRET || "hello-protiva-world";
// Login route
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
  
    // Validate username
    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  
    // Compare provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  
    if (isPasswordValid) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  });

mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB connection established');
});

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
    console.log('Server started at port - 5000');
});