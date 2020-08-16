// function httpGetPromise(url, method = "GET") {
//   return new Promise(function (resolve, reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.onload = resolve;
//     xhr.onerror = reject;
//     xhr.send();
//   });
// }
firebase.auth().onAuthStateChanged(function (user) {
  if(user.uid != null) {
    // do things
  }
});

function updateFoodCards() {
  var user = firebase.auth().currentUser;
  try{
  var userId = user.uid;
  var html = "";
  firebase.database().ref("/users/" + userId + "/shoppingList").once('value').then(function(snapshot) 
    {
          snapshot.forEach(function(childNodes){
      
            //This loop iterates over children of user_id
            //childNodes.key is key of the children of userid such as (20170710)
            //childNodes.val().name;
            //childNodes.val().time;
            //childNodes.val().rest_time;
            //childNodes.val().interval_time;
            html += `
            <div style="padding-bottom: 20px;">
            <div class="card custom-card shadow">
            <div style="display: flex; flex: 1 1 auto;">
                <div class="img-square-wrapper">
                    <img class="" src="https://spoonacular.com/cdn/ingredients_500x500/${childNodes.key}.jpg" alt="Card image cap" style="width: 300px; height: 200px; object-fit: fill;">
                </div>
                <div class="card-body">
                    <a href="" style="color: inherit;text-decoration: none;"><h4 class="card-title">${childNodes.key}</h4></a>
                    <p class="card-text">Availability: <b></b></p>
                    <p class="card-text">Number of Item on Shopping List: <b>${childNodes.val().foodCount} items</b></p>
              </div>
            </div>
            <div class="card-footer">`;

            html += `<div class="text-right" style="float: right;">
                            <button type="button" class="btn btn-outline-primary btn-sm icon-sq-button"><i class="fa fa-bookmark"></i></button>
                            </div>
                            </div>
                            </div>
                            </div>`;
              console.log(html);
            document.getElementById("recipe-cards").innerHTML = html;
              
              
                });
 });
  } 
  catch(e){
    console.log("error")

  } 
}

updateFoodCards();
updateFoodCards();



























// function addFood(food) {
//   var user = firebase.auth().currentUser;
//   let itemNum = 0;
//   let foodNum = 1;
//   var userid = user.uid;

//   firebase.database().ref('users/' + userid + '/itemCount').once('value').then(function(snapshot) {
//     itemNum = snapshot.val()+1;
//     firebase.database().ref('users/' + userid).set({
//       itemCount: itemNum
//     });
//   });
  
  
//   firebase.database().ref('users/' + userid + "/shoppingList/" + food + "/foodCount").once('value').then(function(snapshot) {
//     foodNum = snapshot.val()+1;
//     var updates = {};
//     updates['users/' + userid + "/shoppingList/" + food + "/foodCount"] = foodNum;
//     firebase.database().ref().update(
//       updates
//     );
//   });
 
 
// }


// // let foodCount = firebase.database().ref('users/' + userid + "/shoppingList/" + food + "/foodCount");
//   // foodCount.on('value', function(snapshot) {
//   //   if(snapshot.val()!=null){
//   //     foodNum = snapshot.val()+1;
      
//   //   }
   
    
//   //   // firebase.database().ref('users/' + userid + "/shoppingList/" + food).set({
//   //   // foodCount: foodNum
//   //   // });
//   // });

//    // firebase.database().ref('users/' + userid + "/shoppingList/" + food).set({
//   //   foodCount: foodNum
//   // });