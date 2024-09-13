$(document).ready(function () {
  $("#vertical-menu-btn").click(function () {
    $("body").toggleClass("sidebar-enable");
    // $("body").toggleClass("menu-sidebar-enable");
    var currentSize = $("body").attr("data-sidebar-size");
    var newSize = (currentSize === "sm") ? "lg" : "sm";
    $("body").attr("data-sidebar-size", newSize);

    // from body active div fade background
    $('.over-active').toggleClass('mob-over-active');
  });
});

// left side Dropdown menu
$(document).ready(function () {
  // Handle click events on menu items
  $('.menu-item').click(function () {
    // Toggle the submenu for the clicked item
    $(this).find('.submenu').slideToggle();

    // Hide other open submenus
    $('.menu-item').not(this).find('.submenu').slideUp();
  });
});

