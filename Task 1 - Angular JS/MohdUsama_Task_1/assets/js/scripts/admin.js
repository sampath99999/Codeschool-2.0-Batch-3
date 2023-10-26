"use strict";

$(document).ready(function () {
  const showAsideBtn = $(".show-side-btn");
  const wrapper = $("#wrapper");
  const categories = $(".sidebar .categories");
  const closeAsideBtn = $(".sidebar .close-aside");

  showAsideBtn.on("click", function () {
    $(`#${this.dataset.show}`).toggleClass("show-sidebar");
    wrapper.toggleClass("fullwidth");
  });

  categories.on("click", function (event) {
    event.preventDefault();
    const item = $(event.target).closest(".has-dropdown");

    if (!item) {
      return;
    }

    item.toggleClass("opened");
    item.siblings(".has-dropdown").removeClass("opened");

    if (item.hasClass("opened")) {
      const toOpen = item.find(".sidebar-dropdown");

      if (toOpen.length) {
        toOpen.addClass("active");
      }

      item.siblings(".has-dropdown").find(".sidebar-dropdown").removeClass("active");
    } else {
      item.find(".sidebar-dropdown").toggleClass("active");
    }
  });

  closeAsideBtn.on("click", function () {
    $(`#${this.dataset.close}`).addClass("show-sidebar");
    wrapper.removeClass("margin");
  });
});
