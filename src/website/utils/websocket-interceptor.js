export default ['$injector', ($injector) => {
  return {
    request: config => {
      config.headers['x-socket-id'] = $injector.get('WebsocketService').socketId;
      return config;
    }
  }
}]