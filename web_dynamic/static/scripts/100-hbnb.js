// make it so that the code below is run for places cities and amenities
// when the checkbox is checked
// and remove it when the checkbox is unchecked

$(document).ready(function () {
  const hostname = window.location.hostname;
  const api_url = `https://${hostname}:5001/`;
  const url = `${api_url}api/v1/status`;

  $.get(url, function (data) {
    if (data.status === "ok") {
      $("div#api_status").addClass("available");
    } else {
      $("div#api_status").removeClass("available");
    }
  });
  $.ajax({
    url: `${api_url}api/v1/places_search`,
    type: "POST",
    dataType: "json",
    data: {},
    contentType: "application/json",
    success: mapFn,
  });

  let amenities = {};
  $("input[type='checkbox']").change(function () {
    if ($(this).is(":checked")) {
      amenities[$(this).data("id")] = $(this).data("name");
    } else {
      delete amenities[$(this).data("id")];
    }
    $(".amenities h4").text(Object.values(amenities).join(", "));
  });

  let cities = {};
  $("input[type='checkbox']").change(function () {
    if ($(this).is(":checked")) {
      cities[$(this).data("id")] = $(this).data("name");
    } else {
      delete cities[$(this).data("id")];
    }
    $(".cities h4").text(Object.values(cities).join(", "));
  });

  let states = {};
  $("input[type='checkbox']").change(function () {
    if ($(this).is(":checked")) {
      states[$(this).data("id")] = $(this).data("name");
    } else {
      delete states[$(this).data("id")];
    }
    $(".states h4").text(Object.values(states).join(", "));
  });

  $("button").click(function () {
    const data = {
      amenities: Object.keys(amenities),
    };
    $.ajax({
      url: `${api_url}api/v1/places_search`,
      type: "POST",
      dataType: "json",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: mapFn,
    });
  });
});

function mapFn(data) {
  $("section.places").empty();
  $("section.places").append(
    data.map(function (place) {
      return `<article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">${place.price_by_night}</div>
      </div>
      <div class="information">
        <div class="max_guest">
          ${place.max_guest} Guest${place.max_guest != 1 ? "s" : ""}
        </div>
        <div class="number_rooms">
          ${place.number_rooms} Bedroom${place.number_rooms != 1 ? "s" : ""}
        </div>
        <div class="number_bathrooms">
          ${
            place.number_bathrooms
          } Bathroom${place.number_bathrooms != 1 ? "s" : ""}
        </div>
      </div>
      <div class="user">
        <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
      </div>
      <div class="description">${place.description}</div>
    </article>`;
    })
  );
}
