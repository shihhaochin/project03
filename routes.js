const router = require("express").Router();
const { response } = require("express");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.use((req, res, next) => {
  console.log("A request is comming in to route.js");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test Api is working.",
  };
  return res.json(msgObj);
});

router.get("/nbaApi", async (req, res) => {
  const fetchData = await fetch(
    "https://nba-prod-us-east-1-mediaops-stats.s3.amazonaws.com/NBA/liveData/scoreboard/todaysScoreboard_00.json"
  );
  const data = await fetchData.json();
  return res.json(data);
});
const today = new Date();
let d = today.getDate() - 1;
let m = today.getMonth() + 1;

router.get("/mlbApi", async (req, res) => {
  const fetchData = await fetch(
    `https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-scoreboard?stitch_env=prod&sortTemplate=4&sportId=1&&sportId=51&startDate=2023-${m}-${d}&endDate=2023-${m}-${d}&gameType=E&&gameType=S&&gameType=R&&gameType=F&&gameType=D&&gameType=L&&gameType=W&&gameType=A&&gameType=C&language=en&leagueId=104&&leagueId=103&&leagueId=160`
  );
  const data = await fetchData.json();
  return res.json(data);
});

module.exports = router;

//http://localhost:8000/api/user/nbaApi
//http://localhost:8000/api/user/mlbApi
