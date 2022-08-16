import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import employeeController  from './controller/employeeController.js';
import { configuration } from './config/config.js';

let app = express();
const config = configuration();
const PORT = config.PORT;
mongoose.connect(config.DB_URL);

mongoose.connection.on('connected', () => {
    console.log('connected to mongodb');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/employee', employeeController);

app.use('/health', (req, res) => {
    res.status(config.status.SUCCESS).send("OK");
});

app.use((req, res) => {
    res.status(config.status.NOT_FOUND).send(config.errorMessage.URL_NOTFOUND);
});

app.listen(PORT, (error) =>{
    if(!error) {
        console.log('Parker - API is Successfully Running. listening on port', PORT)
    } else {
        console.log('Server cannot start. Error occurred while starting, error', error);
    }
});