import express from 'express';
import controller from './controller';
import middleware from '../../middleware';

export default express.Router()
  .get('/', 
    middleware.authenticate, 
    middleware.intercept(controller, 'find'))

  .get('/today', 
    middleware.authenticate, 
    middleware.intercept(controller, 'getToday'))

  .put('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'updateById'))

  .post('/updateById/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'updateById'))

  .delete('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'deleteById'))

  .post('/deleteById/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'deleteById'))
