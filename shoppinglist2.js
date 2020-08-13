function addFood(food) {
    var user = firebase.auth().currentUser;
    let itemNum = 0;
    let foodNum = 0;
    var userId = user.uid;
    
    firebase.database().ref("/users/" + userId + "/itemCount").once('value').then(function(snapshot) 
    {
        itemNum = snapshot.val();
    });
    firebase.database().ref("/users/" + userId + '/shoppingList/' + food).once('value').then(function(snapshot) {
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
    firebase.database().ref("/users/" + userId + '/shoppingList/' + food).set({
        foodCount: foodNum
    });
    firebase.database().ref("/users/" + userId).set({
        itemCount: itemNum
    });
}

