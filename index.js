const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const myEnv = require('dotenv').config();

global.__basedir = __dirname;

const db = require('./models');
db.sequelize.sync().then(() => {
    console.log('Database is synced');
}).catch((err) => {
    console.log(err);
});

var corsOptions = {
    origin: "*",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));


require('./routes/admin.route')(app);
app.use('/uploadimage', express.static('./resources/save-single-image'));
app.use('/uploadsmulti', express.static('./resources/save-multi-image'));
// app.use(express.static(__dirname + "/public"));


app.get('/', (req, res) => {
    res.send('Hello World!');
});


PORT = myEnv.parsed.DEV_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});