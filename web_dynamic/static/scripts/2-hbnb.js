$(document).ready(function () {
  const hostname = window.location.hostname;
  const url = `https://${hostname}:5001/api/v1/status`;

  $.get(url, function (data) {
    if (data.status === "ok") {
      $("div#api_status").addClass("available");
    } else {
      $("div#api_status").removeClass("available");
    }
  });
});

$(document).ready(function () {
  let amenities = {};
  $("input[type='checkbox']").change(function () {
    if ($(this).is(":checked")) {
      amenities[$(this).data("id")] = $(this).data("name");
    } else {
      delete amenities[$(this).data("id")];
    }
    $(".amenities h4").text(Object.values(amenities).join(", "));
  });
});
