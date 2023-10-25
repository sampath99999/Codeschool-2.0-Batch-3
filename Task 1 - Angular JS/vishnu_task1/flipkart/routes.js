app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push(function ($q, $cookies) {
    return {
      request: function (config) {
        if (config.headers["X-Requires-Token"]) {
          if ($cookies.get("token")) {
            if (!config.headers["Authorization"]) {
              config.headers["Authorization"] =
                "Bearer " + $cookies.get("token");
            }
            console.log("entered interceptor");
            return config;
          } else {
            return $q.reject("Token not available");
          }
        }
        return config;
      },
      requestError: function (rejection) {
        // Handle request errors
        return $q.reject(rejection);
      },
    };
  });
  $stateProvider.state({
    name: "home",
    url: "/",
    templateUrl: "./components/home/home.html",
    controller: "homeCtrl",
  });
  $stateProvider.state({
    name: "login",
    url: "/login",
    templateUrl: "./components/Login/login.html",
    controller: "loginCtrl",
  });
  $stateProvider.state({
    name: "register",
    url: "/register",
    templateUrl: "./components/Register/register.html",
    controller: "signUpCtrl",
  });
  $stateProvider.state({
    name: "category",
    url: "/category/:categoryId",
    templateUrl: "./components/Products/products.html",
    controller: "categoryCtrl",
  });
  $stateProvider.state({
    name: "product",
    url: "/product/:productId",
    templateUrl: "./components/Products/productDetails.html",
    controller: "productCtrl",
  });
  $stateProvider.state({
    name: "cart",
    url: "/cart",
    templateUrl: "./components/Cart/cart.html",
    controller: "cartCtrl",
  });
  $stateProvider.state({
    name: "search",
    url: "/search/:searchName",
    templateUrl: "./components/Products/searchProduct.html",
    controller: "searchCtrl",
  });

  $urlRouterProvider.otherwise("/login");
});
