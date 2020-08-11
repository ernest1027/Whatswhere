function httpGetPromise(url, method="GET") {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}

function updateRecipeCards(){
    var html = "";
    httpGetPromise("https://api.spoonacular.com/recipes/random?apiKey=536874fc410f487580de9fc26dfb7698&fillIngredients=true&number=10")
        .then(function (e) {
            var recipes = JSON.parse(e.target.response).recipes;
            for(var i=0;i<recipes.length;i++){
                html += `
                <div style="padding-bottom: 20px;">
                <div class="card custom-card shadow">
                <div style="display: flex; flex: 1 1 auto;">
                    <div class="img-square-wrapper">
                        <img class="" src="${recipes[i].image}" alt="Card image cap" style="width: 300px; height: 200px; object-fit: fill;">
                    </div>
                    <div class="card-body">
                        <a href="${recipes[i].sourceUrl}" style="color: inherit;text-decoration: none;"><h4 class="card-title">${recipes[i].title}</h4></a>
                        <p class="card-text">Serving size: <b>${recipes[i].servings} people</b></p>
                        <p class="card-text">Time to make: <b>${recipes[i].readyInMinutes} minutes</b></p>
                  </div>
                </div>
                <div class="card-footer">`;
                
                if(recipes[i].diets.length > 0){
                    html += `<small class="text-muted" style="padding-right: 10px;">Tags:</small>`;
                    for(var w=0; w < recipes[i].diets.length; w++){
                        html += `<button type="button" class="btn btn-outline-success btn-sm mr-1">${recipes[i].diets[w]}</button>`;
                    }
                }
        
                    
                html += `<div class="text-right" style="float: right;">
                        <button type="button" class="btn btn-outline-primary btn-sm icon-sq-button"><i class="fa fa-bookmark"></i></button>
                        </div>
                        </div>
                        </div>
                        </div>`;
        
            document.getElementById("recipe-cards").innerHTML = html;
            }
        }, function (e) {
            console.log("Error updating recipe cards");
            console.log(e);
        });
}

updateRecipeCards();