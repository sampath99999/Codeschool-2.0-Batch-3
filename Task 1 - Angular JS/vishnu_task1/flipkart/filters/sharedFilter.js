app.filter("truncateProductTitle", function () {
  return function (title) {
    if (title && title.length > 50) {
      return title.substring(0, 50) + "...";
    }
    return title;
  };
});
