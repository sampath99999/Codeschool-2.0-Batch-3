app.service("WindowControlService", function () {
  let clicked = false;
  this.resize = function () {
    clicked = clicked == false ? true : false;
    return clicked;
  };
  this.getValue = function () {
    return clicked;
  };
});
