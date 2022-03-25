const app = require("./app")

const dotenv = require("dotenv")
const cloudinary = require("cloudinary")
const database = require("./config/database")
dotenv.config({ path: "backend/config/.env" })

database()



app.use("/req", (req, res) => {
    res.send("hello world")
})



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});


const server = app.listen(`${process.env.PORT}`, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});