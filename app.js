const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
let routers = require("./routes");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
})
routers(app);

const port = process.env.PORT || 2369;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})