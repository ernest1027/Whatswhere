function addFood(food) {
    var user = firebase.auth().currentUser;
    let itemNum = 0;
    let foodNum = 0;
    var userId = user.uid;
    
    firebase.database().ref("/users/" + userId + "/itemCount").once('value').then(function(snapshot) {itemNum = snapshot.val()});
    firebase.database().ref("/users/" + userId + '/shoppingList/' + food).once('value').then(function(snapshot) {
    if(snapshot.val()!=null){
        foodNum = snapshot.val();
        console.log(foodNum);
        foodNum = foodNum + 1;
        
    }
    updateFood(foodNum, userId, food);
    });
    // firebase.database().ref("/users/" + userId + '/shoppingList/' + food).set({
    //     foodCount: foodNum
    // });
 
}
function updateFood(foodNum, userId, food)
{
    firebase.database().ref("/users/" + userId + '/shoppingList/' + food).set({
        foodCount: foodNum
    });
}
  