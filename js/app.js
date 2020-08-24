"use strict";

let allItems = [];
let keyArr = [];

// Constructor
function Items(image_url, title, desc, horns, keyword) {
  this.image_url = image_url;
  this.title = title;
  this.desc = desc;
  this.horns = horns;
  this.keyword = keyword;
  allItems.push(this);
}

// Get data from data folder

$.ajax("./data/page-1.json").then((data) => {
  data.forEach((item) => {
    let newItem = new Items(
      item.image_url,
      item.title,
      item.description,
      item.horns,
      item.keyword
    );
    newItem.render();
    newItem.filterData();
  });
  $("#photo-template").hide();
});

// Render function

Items.prototype.render = function () {
  let imageSection = $("#photo-template").clone();
  imageSection.removeAttr("id");
  imageSection.addClass(this.keyword);
  imageSection.find("img").attr("src", this.image_url);
  imageSection.find("h2").text(this.title);
  imageSection.find("p").text(this.desc);
  $("main").append(imageSection);
};

Items.prototype.filterData = function () {
  if (!keyArr.includes(this.keyword)) {
    $("#filter").append(
      `<option value="${this.keyword}">${this.keyword.toUpperCase()}</option>`
    );
    keyArr.push(this.keyword);
  }
};

// Enent listiner

// Filter the images

$("#filter").change(function () {
  $("section").hide();
  let selectValue = $(this).val();
  $(`.${selectValue}`).show();
  if (selectValue === "default") {
    allItems.forEach((item) => {
      $("section").show();
      $("#photo-template").hide();
    });
  }
});

// Sorting the Data by number of by name
$("#sorting").change(function () {
  $("section").remove();
  $("main").append(`<section id="photo-template">
    <h2></h2>
    <img />
    <p></p>
  </section>`);
  let sortedArray = [];
  let value = $(this).val();
  //   Sort By Numbers of horns
  if (value === "horns") {
    sortedArray = [...allItems.sort((a, b) => a.horns - b.horns)];
    sortedArray.forEach((item) => {
      item.render();
    });
    // sort by title
  } else if (value === "title") {
    sortedArray = [
      ...allItems.sort((a, b) => {
        var nameA = a.title.toUpperCase();
        var nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    ];
    sortedArray.forEach((item) => {
      item.render();
    });
    // Default
  }
  $("#photo-template").hide();
});
