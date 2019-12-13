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
            getInstruction(item);
        }
    });
}

function showRecipe(name, img) {
    var result = "";
    result += `
        <tr>
            <td><h2>${name}</h2></td>
            <td> <img src="${img}" class="img-fluid" width="500px"> </td>
        </tr>
     `;

    $('#recipe-data').html(result);
}

function showIngredient(ing){
     var ingredients = " ";
    ing.forEach(element => {
        //console.log(item);
         ingredients += `
        <tr>
            <td> <img src="${element.iconUrl}" width="100" class="img-fluid"></td>
            <td>${element.quantity}</td>
            <td>${element.unit[0]}</td>
            <td> ${element.name}</td>
        </tr>
      `;
    }); 
     $('#ingredien').html(ingredients);
}


      //Step
      function getInstruction(element) {
       const{instructions} = element;
        var instruction = "";
        var step = instructions.split("<step>");
        for(let k =1; k<step.length; k++){
            instruction += `
                <h4 class="text-info">step ${k}:</h4>
                ${step[k]}
            `;
        }

        $('#step').html(instruction);
    }      










