import express from 'express';
import passport from 'passport'
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import api from './api';
import Bootstrap from '../../infra/bootstrap';

new Bootstrap().start();

let server = express()
  .use(helmet())
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.json({
    limit: '5mb',
    verify: (req, res, buf, encoding) => {
      req.rawBody = buf;
    }
  }))
  .use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  .use(express.static(path.join(__dirname, 'public'), { maxAge: null }))
  .use('/api', api)

server.listen(process.env.WEB_PORT, () => {
  console.log('Server is listening to at port ' + process.env.WEB_PORT);
});
