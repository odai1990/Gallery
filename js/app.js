'use strict';



let arr = [];
Person.all = [];


function Person(name) {
  this.title = name.title;
  this.image_url = name.image_url;
  this.description = name.description;
  this.keyword = name.keyword;
  this.horns = name.horns;
  Person.all.push(this);
}

Person.prototype.renderName = function () {
  let template = $('#neighborhoodTemplate').html();
  let dataSet = Mustache.render(template, this);
  $('main').append(dataSet)
}




//load first page1
function page1() {
  arr = [];
  Person.all = [];
  $('.person-template').remove();
  $('.dropDown').children().remove();
  $.ajax('data/page-1.json').then(peopleData => {
    peopleData.forEach(val => {
      let newPerson = new Person(val);
      newPerson.renderName();
      arr.push(val.keyword);
    })
    
    arr = [...new Set(arr)];
    renderOption();
  })
};//end of page1 function





//load second page2
function page2() {
  arr = [];
  Person.all = [];
  $('.person-template').remove();
  $('.dropDown').children().remove();
  $.ajax('data/page-2.json').then(peopleData => {
    peopleData.forEach(val => {
      let newPerson = new Person(val);
      newPerson.renderName();
      arr.push(val.keyword);
    })
    
    arr = [...new Set(arr)];
    renderOption();
  })
};//end of page 2 function





//to redner content of dropdown list
const renderOption = function () {
  let Options = $('<option value="" class="" selected disabled>FilterByKeyWord</option>')
  $('#select').append(Options);
  arr.forEach((item) => {
    Options = $('<option class = "option"></option>').text(item);
    $('#select').append(Options);
  });
};// end of render function





//to toggle between keywords
$('#select').on('change', function () {
  $('.person-template').hide();
  let x = `${$(this).val()}`;
  $(`.${x}`).show();
});//end of event





//eventhandler to toggle between pages
$('.b1').click(function () {
  $('.person-template').remove();
  page1();
});

$('.b2').click(function () {
  page2();
});
//end of events handlers




//to sort on horns
function sort() {
  Person.all.sort((a, b) => {
    if (a.horns < b.horns) {
      return 1;
    } else if (a.horns > b.horns) {
      return -1;
    } else {
      return 0;
    }
  });   
};//end of sort



//to sort on keywords
function title() {
  Person.all.sort((a, b) => {
    if (a.keyword.toUpperCase() < b.keyword.toUpperCase()) {
      return 1;
    } else if (a.keyword.toUpperCase() > b.keyword.toUpperCase()) {
      return -1;
    } else {
      return 0;
    }
  });
};//end of title function




//to toggle between sorting 
$('.sort').on('change', function (e) {

  if (e.target.value == 'number')
    sort();
  else
    title();
  $('.person-template').remove();
  Person.all.forEach(val => {
    val.renderName();
  })
});
// end of event 




//to show gallary for first page for first time
page1();
