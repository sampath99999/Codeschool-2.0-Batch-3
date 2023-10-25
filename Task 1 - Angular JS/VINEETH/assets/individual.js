myApp.controller('individualCtrl', function ($scope, $window,$rootScope) {
    $scope.imagePath = $window.localStorage.getItem('image');
    $scope.productName = $window.localStorage.getItem('name');
    $scope.rating = $window.localStorage.getItem('rating');
    $scope.price = $window.localStorage.getItem('price');
    $scope.productId = $window.localStorage.getItem('product_id')
    $scope.AddToCart = function() {
        var product = {
            id: $window.localStorage.getItem('product_id'),
            imagePath: $window.localStorage.getItem('image'),
            name: $window.localStorage.getItem('name'),
            rating: $window.localStorage.getItem('rating'),
            price: $window.localStorage.getItem('price'),
            quantity: 1  
        };
        var cart = JSON.parse($window.localStorage.getItem('cart')) || []; 
        var index = -1;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].name === product.name) {
                index = i;
                break;
            }
        }
        if (index !== -1) {  
            cart[index].quantity++;
        } else {
            
            cart.push(product);
        }
        
        $window.localStorage.setItem('cart', JSON.stringify(cart));
        $rootScope.count = JSON.parse($window.localStorage.getItem('cart')).length;
        $window.alert(" PRODUCT IS ADDED");
    };
    
});
