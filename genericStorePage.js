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
document.getElementById("address").innerHTML = urlParams.vicinity;
document.getElementById("StoreImage").innerHTML = '<img  style="height:400px; width: 600px;"src="'+urlParams.url+'" class="" alt="Store Image">';

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
 
   
    
    var html = "";
    firebase.database().ref("/Stores/" + store + "/Foods").once('value').then(function(snapshot) 
      {
            snapshot.forEach(function(childNodes){
        

              html += `
<div class="container-fluid">
    <div class="row">
      <div class="col-12 mt-3">
        <div class="card custom-card shadow">
          <div style="display: flex; flex: 1 1 auto;">
            <div class="img-square-wrapper">
              <img class="" src="https://spoonacular.com/cdn/ingredients_500x500/${childNodes.key.toLowerCase()}.jpg"
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
              document.getElementById("Details").innerHTML = html;
                
                
        });
   });
} 
  

checkDB();
updatePage();