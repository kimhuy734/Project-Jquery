// getURL function for control url
function getURL() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

// jQuery
$(document).ready(function () {
    // call function for request API
    requestdata();
    // Select recipes with id
    $("#chooseRecipe").on('change', function () {
        var chooseRecipse = $("#chooseRecipe").val();
        recipesId(chooseRecipse);
    });

    $('#minus').on('click', function () {
        decrease();
        var guest = $('#member').val();//old member 4 it will decrease when click -
        var recipe = $('#chooseRecipe').val();//id from select
        newIngredient(recipe, guest);
    });
    $('#add').on('click', function () {
        increase();
        var guest = $('#member').val();//old member 4 it will increase when click +
        var recipe = $('#chooseRecipe').val();
       
        newIngredient(recipe, guest);
    });
});

// function for query API
function requestdata() {
    $.ajax({
        dataType: 'json',
        url: getURL(),
        success: (data) => getRecipse(data.recipes),
        error: () => console.log("Cannot get data")
    })
}

//variable for store data in arrays that get from API
var allData = [];
// function for display the name of food on the selection option
function getRecipse(data) {
    var option = "";
    allData = data;
    data.forEach(element => {
        option += `<option value="${element.id}">${element.name}</option>`;
    });
    $("#chooseRecipe").append(option);
    $('#ruler').hide();
    $('#show-number').hide();
}
// variable for get old Guest
var getQuanlity = [];
// function for loop data from array variable


// display name and image of recipes
function chooseRecipses(item) {
    const { name, iconUrl } = item;
    var result = "";
    result += `
       <tr>
          <td> <h4>${name}</h4></td>
          <td><img src="${iconUrl}" style="width:250px; height:170px"></td> 
       </tr> 
    `;
    $("#result").html(result);
}

function recipesId(chooseRecipse) {
    allData.forEach(item => {
        if (item.id == chooseRecipse) {
            // choose recipses 
            chooseRecipses(item);
            // get ingredients in recipse name
            getIngrediants(item);
            // get instruction
            getInstruction(item);
            //updateIngredien
          $('#member').val(item.nbGuests);
          oldGuest = $('#member').val();
            //get OldGuest
        }
        
    });
}
function getIngrediants(item) {
    var result = "";
    item.ingredients.forEach(element => {
        const { name, quantity, unit, iconUrl } = element;
        result += `
            <tr>
            <td><img src="${iconUrl}" style="width:50px"></td>
            <td id='quantity'>${quantity}</td>
            <td>${unit[0]}</td>
            <td>${name}</td>
            </tr>
        `;
    });
    $("#ingredients").html(result);
    $('#ruler').show();
    $('#show-number').show();

}
function newIngredient(chooseRecipse,guest) {

    allData.forEach(item => {
        if (item.id == chooseRecipse) {
            // choose recipses 
            chooseRecipses(item);
            // get ingredients in recipse name
            updateIngredient(item.ingredients,guest);
              
            // get instruction
            getInstruction(item);
            //updateIngredien
            $('#member').val(guest);
            //get OldGuest
        }
    });
}
// get ingredients in recipse name

// function for new quanlity

var updateIngredient = (ing,guest) => {
 
    var ingredient = "";
    ing.forEach(element => {
  
       var add = element.quantity *parseInt(guest) /oldGuest;
       ingredient += `
       <tr>
           <td><img src = "${element.iconUrl}" width = "50"></td>
      
           <td >${add}</td>
           <td >${element.unit[0]}</td>
           <td >${element.name}</td>
         
       </tr>
     `
    })
    $('#ingredients').html(ingredient);
} 


// get instruction
function getInstruction(item) {
    const { instructions } = item;
    var instruction = "";
    var step = instructions.split("<step>");
    for (let k = 1; k < step.length; k++) {
        instruction += `
      <h5 class="text-primary">step ${k}:</h5>
             ${step[k]}
        `;
    }
    // diplay instruction
    $('#step').html(instruction);
}

//increase and decrement
function increase() {
    var member = $('#member').val();
    var guest = parseInt(member) + 1;
    if (guest <= 15) {
        $('#member').val(guest);
    }
}

function decrease() {
    var member = $('#member').val();
    var guest = parseInt(member) - 1;
    if (guest >= 1) {
        $('#member').val(guest);
    }
}




