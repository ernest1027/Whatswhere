firebase.auth().onAuthStateChanged(function (user) {
    //here
});

function addFood(food) {
    var user = firebase.auth().currentUser;
    let itemNum = 0;
    let foodNum = 0;
    var userId = user.uid;
    
    firebase.database().ref("/users/" + userId + "/itemCount/itemCount").once('value').then(function(snapshot) 
    {
        itemNum = snapshot.val();
    });
    firebase.database().ref("/users/" + userId + '/shoppingList/' + food + "/foodCount").once('value').then(function(snapshot) {
        if(snapshot.val()!=null){
            foodNum = snapshot.val();
            console.log(foodNum);
        }
        else{
            itemNum = itemNum + 1;
        }
        foodNum = foodNum + 1;
        updateFood(foodNum, itemNum, userId, food);
    });
    // firebase.database().ref("/users/" + userId + '/shoppingList/' + food).set({
    //     foodCount: foodNum
    // });
 
}
function updateFood(foodNum, itemNum, userId, food)
{   
    console.log(foodNum)
    firebase.database().ref("/users/" + userId + "/shoppingList/" + food).set({
        foodCount: foodNum
    });
    firebase.database().ref("/users/" + userId + "/itemCount").set({
        itemCount: itemNum
    });
}
function updateFoodCards() {
 
   
    
    var html = "";
    firebase.database().ref("/Foods").once('value').then(function(snapshot) 
      {
            snapshot.forEach(function(childNodes){
        
              //This loop iterates over children of user_id
              //childNodes.key is key of the children of userid such as (20170710)
              //childNodes.val().name;
              //childNodes.val().time;
              //childNodes.val().rest_time;
              //childNodes.val().interval_time;
              html += `
<div class="container-fluid">
    <div class="row">
      <div class="col-12 mt-3">
        <div class="card custom-card shadow">
          <div style="display: flex; flex: 1 1 auto;">
            <div class="img-square-wrapper">
              <img class="" src="${childNodes.val().photo}"
                alt="Card image cap" style="height: 180px; width: 300px;">
            </div>
            <div class="card-body">
              <h4 class="card-title">${childNodes.key}</h4>
              <p class="card-text">Price: <b>$NA</b></p>
              <p class="card-text">Availability: <b>High</b></p>
              
            </div>
          </div>
          <div class="card-footer">
            <small class="text-muted" style="padding-right: 10px;">Tags:</small>
            <button type="button" class="btn btn-outline-success btn-sm">Vegan</button>
            <button type="button" class="btn btn-outline-success btn-sm">Healthy</button>
            <div class="text-right" style="float: right;">
              <button type="button" class="btn btn-outline-primary"onclick="addFood('${childNodes.key}')">Add to shopping List</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
                console.log(html);
              document.getElementById("cards").innerHTML = html;
                
                
        });
   });
} 
    updateFoodCards();

// document.getElementById("appleAdd").addEventListener("click", addFood);
// document.getElementById("orangeAdd").addEventListener("click", addFood);
// document.getElementById("grapesAdd").addEventListener("click", addFood);
