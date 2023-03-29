const express = require('express')
const cors = require('cors')

const routers = require("./routers");
const { PORT = 8000 } = process.env;

const app = express();
app.use(cors());
app.use(express.json());


routers(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});





