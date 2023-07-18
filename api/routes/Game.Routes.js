const express=require('express');
const app = express();
const { allGames, gamePoint,postGame, gameUpdation,  findGamesWithEventId, deleteGame, oneGame,gamePointWithGroupName, currentGamePointWithGroupName, allGamesWinners, gameSearch } = require("../controller/Game.Controller");
const router=express.Router();
module.exports=router;
const bdyp = require('body-parser');
const bodyParser = require('body-parser');
app.use(bdyp.json());
const dotenv = require('dotenv');
dotenv.config();
//////////////////////
app.use(bodyParser.urlencoded({extended: false}));
const { roleGuard } = require('../middleware/RoleGuard.MiddleWare');
const { verifyUser } = require('../middleware/Auth.MiddleWare');
const UploadGame = require('../middleware/Multer.MiddleWare');

const {gameValidator} = require('../validator/Game.Validator')





router.post("/postgame",verifyUser,roleGuard,UploadGame.UploadGame, postGame);
router.put("/updategame/:id",verifyUser,roleGuard, gameUpdation)
router.get("/allgame" ,verifyUser,roleGuard, allGames);
router.get("/game/:id" ,verifyUser,roleGuard, gamePoint);
router.get("/onegame/:id" ,verifyUser,roleGuard, oneGame);
router.post("/EventId",verifyUser,roleGuard,findGamesWithEventId);
router.delete("/deleteGame/:id",verifyUser,roleGuard,deleteGame);
router.post("/GamePointWithGroupName", verifyUser, roleGuard, gamePointWithGroupName)
router.post("/CurrentGamePointWithGroupName", verifyUser, roleGuard, currentGamePointWithGroupName)
router.get("/gameWinners", verifyUser, roleGuard,allGamesWinners)
router.get("/gameSearch",verifyUser,roleGuard, gameValidator('search'), gameSearch);




module.exports=router;