var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

function updatePage(){

document.getElementById("storeName").innerHTML = urlParams.name;
document.getElementById("address").innerHTML = `<a href='https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(urlParams.name)}&destination_place_id=${urlParams.place_id}>${urlParams.vicinity}'>${urlParams.vicinity}</a>`;
document.getElementById("StoreImage").innerHTML = '<img  style="height:400px; width: 600px; margin:5%"src="'+urlParams.url+'" class="" alt="Store Image">';

}

function checkDB(){
    var store = urlParams.name+" - "+ urlParams.vicinity;
    firebase.database().ref("Stores/"+store).once("value").then(function(snapshot){
        if (snapshot.val()==null){
            document.getElementById("Details").innerHTML = "Sorry, we do not have any data on this store in the past 48 hours. You can help by <a href='crowdsourcepage.html'> submitting a report </a> of the stock at this location.";
        }
        else{
            updateFoodCards(store);
        }
    });
}
function updateFoodCards(store) {
  var user = firebase.auth().currentUser;

  var userId = user.uid;
  var foods;
  var shop;
  firebase.database().ref("/users/"+userId+"/shoppingList").once('value').then(function(snapshot) 
    {
      shop = snapshot.val();
      //console.log(snapshot.val())
  firebase.database().ref("/Foods").once('value').then(function(snapshot) 
    {
      console.log(snapshot.val())
      foods = snapshot.val()
      updateFoodCardsInner(foods, store,shop);
    });
  });

} 
function updateFoodCardsInner(foods, store,shop)
{
  var html = ""; 
  var shopNames=Object.keys(shop);
  console.log(shopNames);
  var score = 0;
  var cnt = shopNames.length;
  firebase.database().ref("/Stores/" + store + "/Foods").once('value').then(function(snapshot) 
    {
          snapshot.forEach(function(childNodes){
            if(true){
            var img = foods[childNodes.key].photo;
            var availNum = childNodes.val().Submissions.AVG
            var avail = ""
            if(availNum<10)
            {
              avail = "Out of stock"
            }
            else if (availNum<20)
            {
              avail = "A few left"
            }
            else if (availNum<30){
              avail = "A good amount available"
            }
            else if(availNum<40)
            {
              avail = "Plenty available"
            }
            else
            {
              avail = "Fully in stock"
            }
            html += `
<div class="container-fluid">
  <div class="row">
    <div class="col-12 mt-3">
      <div class="card custom-card shadow">
        <div style="display: flex; flex: 1 1 auto;">
          <div class="img-square-wrapper" style="width: 300px;">
            <img class="" src="${img}"
              alt="Card image cap" style="max-height: 180px; max-width: 300px; height:auto; width:auto; display: block; margin-left: auto; margin-right: auto;">
          </div>
          <div class="card-body">
            <h4 class="card-title capitalize">${childNodes.key}</h4>
            <p class="card-text">Availability: <b>${avail}</b></p>
            
          </div>
        </div>
        <div class="card-footer">

          <div class="text-right popup" style="float: right;">
            <button type="button" class="btn btn-outline-primary"onclick="addFood('${childNodes.key}')">Add to shopping list</button>
            <span class="popuptext" id="${childNodes.key}1">Added to shopping list</span>
            <span class="popuptext" id="${childNodes.key}2">Please login to add to shopping list</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
              console.log(html);
            document.getElementById("Details").innerHTML = html;
              
            }   
            if(shopNames.includes(childNodes.key))
            {
              score += availNum*2;
             
            }
      });
      console.log(score);
 console.log(cnt);
 if(cnt == 0)
 {
    document.getElementById("score").innerHTML = "Here is the What's Where score: 0"
    
 }
 else
 {
   if(score/cnt > 100) {
    score = 100;
    cnt = 1;
   }
  document.getElementById("score").innerHTML = `Here is the What's Where score: ${score/cnt}`
 }
 });
}
function addFood(food) {
    
  try{
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
  var popup = document.getElementById(food+"1");
  popup.classList.add("show");
}
catch(e)
{
  var popup = document.getElementById(food+"2");
  popup.classList.add("show");
}
  // firebase.database().ref("/users/" + userId + '/shoppingList/' + food).set({
  //     foodCount: foodNum
  // });
  // if (userId!= null){
  // var popup = document.getElementById(food+"1");
  // popup.classList.add("show");
  // }
  // else{
  //   var popup = document.getElementById(food+"2");
  //   popup.classList.add("show");
  // }
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
setTimeout(checkDB, 250);
updatePage();