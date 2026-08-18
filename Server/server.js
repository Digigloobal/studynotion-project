const cookieParser = require("cookie-parser");
const express = require("express");

require("dotenv").config();
const {connect} = require("./config/database");

const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");

const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const cors = require("cors");


const PORT = process.env.PORT || 4000 ;




const app = express();


app.use(cookieParser());
app.use(express.json());

app.use(
	cors({
		origin:["http://localhost:3000", 
				"https://studynotion-project-puce.vercel.app"],
		credentials:true,
	}));

 app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
);   

connect();

cloudinaryConnect();


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.get("/",(req,res)=>{
   return res.send(`<h1> Hlo jee kya haal </h1>`);
})


app.listen(PORT , () => {
    console.log(`Server starting at ${PORT}`);
})




