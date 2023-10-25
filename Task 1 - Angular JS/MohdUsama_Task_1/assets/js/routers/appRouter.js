app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("register", {
        url: "/register",
        templateUrl: "./templates/register.html",
        controller: "registerController",
      })
      .state("login", {
        url: "/login",
        templateUrl: "./templates/login.html",
        controller: "loginController",
      })
      .state("categories", {
        url: "/categories",
        templateUrl: "./templates/categories.html",
        controller: "categoriesController",
      })
      .state("products", {
        url: "/products",
        templateUrl: "./templates/products.html",
        controller: "productsController",
      })
      .state("product", {
        url: "/product/:id",
        templateUrl: "./templates/productDetails.html",
        controller: "productDetailsController",
      })
      .state("cart", {
        url: "/cart",
        templateUrl: "./templates/cart.html",
        controller: "cartController",
      })
      .state("productsAva", {
        url: "/products/:category",
        templateUrl: "./templates/products.html",
        controller: "productsController",
      })
      .state("checkout", {
        url: "/checkout",
        templateUrl: "./templates/checkout.html",
        controller: "checkoutController",
      })
      .state("orders", {
        url: "/orders",
        templateUrl: "./templates/orders.html",
        controller: "ordersController",
      })
      .state("admin", {
        url: "/admin",
        templateUrl: "./templates/admin.html",
        controller: "adminController",
      })
      .state("adminOrders", {
        url: "/admin/orders",
        templateUrl: "./templates/adminOrders.html",
        controller: "adminOrdersController",
      })
      .state("adminProducts", {
        url: "/admin/products",
        templateUrl: "./templates/adminProducts.html",
        controller: "adminProductsController",
      })
      .state("adminAddProduct", {
        url: "/admin/products/add",
        templateUrl: "./templates/adminAddProduct.html",
        controller: "adminAddProductController",
      })
      .state("adminRoles", {
        url: "/admin/roles",
        templateUrl: "./templates/adminRoles.html",
        controller: "adminRolesController",
      })
      .state("adminChangeUserRoles", {
        url: "/admin/roles/change",
        templateUrl: "./templates/adminChangeUserRole.html",
        controller: "adminChangeUserRoleController",
      })
      .state("adminCategories", {
        url: "/admin/categories",
        templateUrl: "./templates/adminCategories.html",
        controller: "adminCategoriesController",
      })
      .state("adminAddCategories", {
        url: "/admin/categories/add",
        templateUrl: "./templates/adminAddCategories.html",
        controller: "adminAddCategoriesController",
      })
      .state("adminUsers", {
        url: "/admin/users",
        templateUrl: "./templates/adminUsers.html",
        controller: "adminUsersController",
      })
      .state("adminChangeRoles", {
        url: "/admin/roles/change",
        templateUrl: "./templates/adminAddUser.html",
        controller: "adminAddUsersController",
      })
      .state("index", {
        url: "/",
        templateUrl: "./templates/root.html",
        controller: "rootController",
      });
    $urlRouterProvider.otherwise("/categories");
  },
]);
