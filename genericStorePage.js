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
document.getElementById("StoreImage").innerHTML = '<img style="padding-left: 2em;padding-top: 3em;" src="'+urlParams.url+'" class="rounded float-left" alt="Store Image">';

}

updatePage();