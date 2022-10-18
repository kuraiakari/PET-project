import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config'

import routes from './src/routes';
import db from './src/config/dbconfig';


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes)
app.use('/images', express.static('./images'))


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

db.sync().then( () => {
    console.log(`Connected to db`);
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
})
