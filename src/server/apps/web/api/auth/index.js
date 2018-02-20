import express from 'express';
import controller from './controller';
import middleware from '../../middleware';

export default express.Router()
  .post('/login', 
    middleware.intercept(controller, 'login'))
