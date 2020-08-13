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
// document.getElementById("appleAdd").addEventListener("click", addFood);
// document.getElementById("orangeAdd").addEventListener("click", addFood);
// document.getElementById("grapesAdd").addEventListener("click", addFood);
