app.service("cart", function () {
  const userToken = localStorage.getItem("token");
  const cartKey =`cart_${userToken}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  this.addToCart = function (product) {
    const existingItem = findItemInCart(product);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem(cartKey, JSON.stringify(cart));
  };

  this.increaseQuantity = function (index) {
    cart[index].quantity += 1;
    localStorage.setItem(cartKey, JSON.stringify(cart));
  };
  this.decreaseQuantity = function (index) {
    cart[index].quantity -= 1;
    localStorage.setItem(cartKey, JSON.stringify(cart));
    if (cart[index].quantity == 0) {
      this.removeCartItem(index);
    }
  };
  this.getCartItems = function () {
    return cart;
  };

  this.removeCartItem = function (index) {
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  };

  this.clearCart = function () {
    cart.length = 0;
    localStorage.setItem(cartKey, JSON.stringify(cart));
  };

  this.totalCartItems = function () {
    return cart.length;
  };

  this.getTotalCartPrice = function () {
    return cart.reduce(function (total, item) {
      return (
        parseInt(total, 10) + (parseInt(item.price, 10) * item.quantity || 0)
      );
    }, 0);
  };

  function findItemInCart(product) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id == product.id) {
        return cart[i];
      }
    }
    return null;
  }
});
