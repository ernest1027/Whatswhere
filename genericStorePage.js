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
document.getElementById("address").innerHTML = `<a href='https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(urlParams.name)}&destination_place_id=${urlParams.place_id}>"${urlParams.vicinity}'>${urlParams.vicinity}</a>`;
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
 
  var foods;
  firebase.database().ref("/Foods").once('value').then(function(snapshot) 
    {
      console.log(snapshot.val())
      foods = snapshot.val()
      updateFoodCardsInner(foods, store);
    });
    

} 
function updateFoodCardsInner(foods, store)
{
  var html = "";
  firebase.database().ref("/Stores/" + store + "/Foods").once('value').then(function(snapshot) 
    {
          snapshot.forEach(function(childNodes){
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
          <div class="img-square-wrapper">
            <img class="" src="${img}"
              alt="Card image cap" style="height: 180px; width: 300px; ">
          </div>
          <div class="card-body">
            <h4 class="card-title">${childNodes.key}</h4>
            <p class="card-text">Availability: <b>${avail}</b></p>
            
          </div>
        </div>
        <div class="card-footer">
          <small class="text-muted" style="padding-right: 10px;">Tags:</small>
          <button type="button" class="btn btn-outline-success btn-sm">Vegan</button>
          <button type="button" class="btn btn-outline-success btn-sm">Healthy</button>
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
              
              
      });
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
checkDB();
updatePage();