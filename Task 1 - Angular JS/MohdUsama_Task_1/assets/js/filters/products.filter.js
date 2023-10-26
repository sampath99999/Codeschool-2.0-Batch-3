app.filter("productsFilter", function () {
  return function (products, selectedCategory) {
    if (selectedCategory === 0) {
      return products;
    }
    return products.filter(function (product) {
      return product.category_id == selectedCategory;
    });
  };
});
