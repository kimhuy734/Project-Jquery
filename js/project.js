function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

$(document).ready(function () {
    requestApi();
    //catch value

    $('#recipe').on('change', () => {
        var recipes = $('#recipe').val();
        // console.log(recipes);
        //call function
        getRecipe(recipes);
    })
});

function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot get data"),
    });
}


var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(item => {
        //console.log(item)
        option += `<option value="${item.id}">${item.name}</option>`;
    });
    $('#recipe').append(option);
}
function getRecipe(id) {
    //     console.log(recipeId);

    allData.forEach(item => {
        //console.log(item);

        if (item.id == id) {
            // console.log(item);
            //showRecipe(),
            showRecipe(item.name, item.iconUrl);
            //showIngredient(),
            showIngredient(item.ingredients);
            //showStep()...
        }
    });
}

function showRecipe(name, img) {
    var result = "";
    result += `
        <tr>
            <td> ${name} </td>
            <td> <img src="${img}" class="img-fluid" width="180px"> </td>
        </tr>
     `;

    $('#recipe-result').html(result);
}

function showIngredient(ing){
     var ingredients = " ";
    ing.forEach(element => {
        //console.log(item);
         ingredients += `
        <tr>
            <td> <img src="${element.iconUrl}" width="80" class="img-fluid"></td>
            <td>${element.quantity}</td>
            <td>${element.unit[0]}</td>
            <td> ${element.name}</td>
        </tr>
      `;
    }); 
     $('#ingredien').html(ingredients);
}












