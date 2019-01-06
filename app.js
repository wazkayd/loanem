
import express from 'express';
import DbConnect from './server/models/DbConnect';
import allRoutes from './server/routes/allRoutes';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
const PORT = process.env.PORT || 8000;

const dbConnect = new DbConnect();
dbConnect.connectApp();

app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH',
    );
    res.header(
      'Access-Control-Max-Age',
      2592000,
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    next();
  });

app.use(allRoutes);
app.listen(PORT);
export default app;