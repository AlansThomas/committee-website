
const cookieSession = require("cookie-session"); //npm i  express pasport cors  cookie-session
const cors = require("cors");
const handleErrors=require('./middleware/handle-errors.middleware')
const logger = require('./utils/logger.utils')


const TotalPoint = require('./routes/TotalPoint.Routes.js')
const dotenv = require('dotenv');
const Dbname=process.env.Dbname
dotenv.config();
//////////////////////
const Host = process.env.DB_Host
const Port = process.env.DB_PORT
const Username = process.env.Username
const Password = process.env.Password

const mongoose = require('mongoose')
const bdyp = require('body-parser')
const { urlencoded } = require('body-parser')
const exp = require('express')
const app = exp()
app.use("/csv", exp.static('csv'))
const authroute = require('./routes/Auth.Routes.js')
const reportRoute = require('./routes/Report.Routes.js')
const userroute = require('./routes/User.Routes.js')
const eventRoute = require('./routes/Event.Routes.js')
const GroupWisePub = require('./routes/GroupWiseSum.Routes')
const groupRoute = require('./routes/Group.Routes.js')
const gameRoute = require('./routes/Game.Routes.js');
const notificationRoute = require('./routes/Notification.Routes');
app.use(urlencoded({ extended: true }))
app.use(bdyp.json())
const postRoute = require('./routes/Post.Routes.js')
const likeRoute = require('./routes/Like.Routes.js')
const commentRoute = require('./routes/Comment.Routes.js')
const desigRoute = require('./routes/Designation.Routes.js')
const pollRoute =  require('./routes/Poll.Routes.js')
app.use(
    cookieSession({ name: "cookie", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);


const connect = async () => {
    //     //`mongodb://${Username}:${Password}@${Host}:${Port}/${Dbname}`
       
    // mongodb+srv://ajaykumar:ajay.qwertyui@clustercommittee.c53gsx4.mongodb.net/recreation_committee

    try {
        await mongoose.connect(`mongodb+srv://ajaykumar:ajay.qwertyui@clustercommittee.c53gsx4.mongodb.net/recreation_committee`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log("Connected to MongoDB");
    logger.info("connected Connected to MongoDB ");

    }
    catch (error) {
        logger.info("connection failed ", error)
        console.log("Failed to connect to MongoDB: ", error);
    }

}
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST, PATCH, DELETE, OPTIONS");
    next();
});
app.use(cors());
app.use("/images", exp.static('images'))



mongoose.connection.on("disconnected", () => {
  connect();
})
mongoose.connection.on("connected", () => {
    console.log("connected")
})

app.use("/Auth", authroute);
app.use("/Users", userroute);
app.use("/Event", eventRoute);
app.use("/Report", reportRoute);
app.use("/Group", groupRoute);
app.use("/game", gameRoute);
app.use("/TotalPoint", TotalPoint)
app.use("/post", postRoute)
app.use("/like", likeRoute);
app.use("/comment", commentRoute);
app.use("/PublishToInno",GroupWisePub);
app.use("/Designation", desigRoute);
app.use("/Poll", pollRoute);
app.use("/Notification", notificationRoute);


app.use(handleErrors);






app.listen(4005, () => {
    connect();
    logger.info("inside connect () connected")

  
})
