// const express=require("express")
// const dotenv=require("dotenv")
// const connection = require("./config/db")
// const userRouter = require("./routes/user.routes")
// dotenv.config()
// const app=express()
// app.use(express.json())
// app.use("/user",userRouter)



// app.listen(process.env.PORT || 3000 ,async()=>{
//   try {
//     await connection;
//     console.log("connected to database")
//     console.log(`server is running on port ${process.env.PORT || 3000}`)
//   } catch (error) {
//     console.log(error)
//   }
// })

const express = require("express");
const dotenv = require("dotenv");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const CookieParser = require("cookieparser");
const notesRouter = require("./routes/notes.toutes");

dotenv.config();
const cors=require("cors")

app.use (CookieParser())
app.use(cors({
  origin:["http://Localhost:5173","http://Localhost:3000"],
  credentials:true
}
))
const app = express();
app.use(express.json());

// Route configuration
app.use("/user", userRouter);
app.use("/notes",notesRouter)

// Start the server
app.listen(process.env.PORT || 3000, async () => {
  try {
    await connection;
    console.log("Connected to database");
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
});
