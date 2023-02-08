require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const models = require('./models/models');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db');
const errorHandler = require('./middleware/ErrorHanglingMiddleware');
const router = require('./routes');

const PORT = process.env.PORT || 5002;

const app = express();
app.use(cors()); //чтобы можно было отправлять запросы из браузеры
app.use(express.json()); //чтобы была возможность читать json файлы
// app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({})); //чтобы была возможность загружать файлы
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
    try {

        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log('Server started on ' + PORT);
        })
    } catch (error) {
        console.log(error);
    }
}

start();