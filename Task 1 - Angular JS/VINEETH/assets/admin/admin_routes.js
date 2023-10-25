myapp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'dashboard',
        url: "/dashboard",
        templateUrl: "../../Templates/admin/admin_Dashboard.html",
    })
    .state({
        name: 'manageProducts',
        url: "/manageProducts",
        templateUrl: "../../Templates/admin/manage_Products.html",
        controller: "manage_productCtrl"
    })
    .state({
        name: 'customers',
        url: "/customer",
        templateUrl: "../../Templates/admin/admin_CustomerList.html",
        controller: "customerListCtrl"
    })
    .state({
        name: 'orders',
        url: "/orders",
        templateUrl: "../../Templates/admin/manageOrders.html",
        controller: "manageOrdersCtrl"
    })
    $urlRouterProvider.otherwise("/");
});