function addFood(food) {
  var user = firebase.auth().currentUser;
  let itemNum = 0;
  let foodNum = 1;
  var userid = user.uid;

  firebase.database().ref('users/' + userid + '/itemCount').once('value').then(function(snapshot) {
    itemNum = snapshot.val()+1;
    firebase.database().ref('users/' + userid).set({
      itemCount: itemNum
    });
  });
  
  
  firebase.database().ref('users/' + userid + "/shoppingList/" + food + "/foodCount").once('value').then(function(snapshot) {
    foodNum = snapshot.val()+1;
    var updates = {};
    updates['users/' + userid + "/shoppingList/" + food + "/foodCount"] = foodNum;
    firebase.database().ref().update(
      updates
    );
  });
 
 
}


// let foodCount = firebase.database().ref('users/' + userid + "/shoppingList/" + food + "/foodCount");
  // foodCount.on('value', function(snapshot) {
  //   if(snapshot.val()!=null){
  //     foodNum = snapshot.val()+1;
      
  //   }
   
    
  //   // firebase.database().ref('users/' + userid + "/shoppingList/" + food).set({
  //   // foodCount: foodNum
  //   // });
  // });

   // firebase.database().ref('users/' + userid + "/shoppingList/" + food).set({
  //   foodCount: foodNum
  // });