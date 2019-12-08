// var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
$(document).ready( function() {
    $('#recipices').on('change',function () {
        var recipes = $('#recipices').val();
        chooseRecipe(recipes);
    } );
});

// choose recipe from select [arrow function]
var chooseRecipe = (myRecipe) => {
    var onlyNumber = parseInt(myRecipe);
    switch(onlyNumber) {
        case 1:
            getData()
            break;
        case 0:
            getValue();
            break;

    }
} 

function getData(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
   $.ajax({
       dataType : 'json',
       url : url,
       success : function (data){
           var result = "";
           data.recipes.forEach(element =>{
                if(element.id ==1){
                    result +=`
                        ${element.name}
                        <img src="${element.iconUrl}" width="80">
                    `;
                }
                $('#result').html(result);

                // get ingreditent

                var ingreditent = "";
                data.recipes.forEach(element =>{
                   element.ingredients.forEach(item =>{
                       if(element.id ==1){
                        ingreditent+=`
                            <tr>
                                 ${element.name}
                                <td> <img src="${item.iconUrl}" width="70" class="img-fluid"></td>
                                <td>${item.quantity}</td>
                                <td>${item.unit[0]}</td>
                                <td> ${item.name}</td>
                            </tr>
                            
                        `;
                       }
                       $('#ingredien').html(ingreditent);
                   });
                });
               
           });
       }
   });

}





function getValue(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
   $.ajax({
       dataType : 'json',
       url : url,
       success : function (data){
           var result = "";
           data.recipes.forEach(element =>{
                if(element.id ==0){
                    result +=`
                        ${element.name}
                        <img src="${element.iconUrl}" width="80">
                    `;
                }
                $('#result').html(result);

                // get ingreditent

                var ingreditent = "";
                data.recipes.forEach(element =>{
                   element.ingredients.forEach(item =>{
                       if(element.id ==0){
                        ingreditent+=`
                            <tr>
                                 ${element.name}
                                <td> <img src="${item.iconUrl}" width="70" class="img-fluid"></td>
                                <td>${item.quantity}</td>
                                <td>${item.unit[0]}</td>
                                <td> ${item.name}</td>
                            </tr>
                            
                        `;
                       }
                       $('#ingredien').html(ingreditent);
                   });
                });
               
           });
       }
   });

}

