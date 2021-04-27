let routes = [];
const routerContext = require.context("./model", true, /\.js$/)
routerContext.keys().forEach(route => {
  if (route.startsWith("./index")) {
      return;
  }
  const routerModule = routerContext(route);
  routes = [...routes, ...(routerModule.default || routerModule)];
})

export default routes
