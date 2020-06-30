
// var address = "127.0.0.1";
var address = "localhost";
var port = "8080";
var commentsLocal = []; // id and comment

var sendCommentButtonElementRef = document.getElementById("submit");
var inputElementRef = document.getElementById("comment-input");
var chatContainerRef = document.getElementById("chat-container");
sendCommentButtonElementRef.addEventListener("click", function(){
    // alert("fsd");

   addCommentToDOM(inputElementRef.value);
    inputElementRef.value = ""

});


function addCommentToDOM(comment){
    var commentBoxNode = document.createElement("div");
    commentBoxNode.id = "comment-box";
    var textCommentNode = document.createTextNode(comment);
    commentBoxNode.appendChild(textCommentNode);
    chatContainerRef.appendChild(commentBoxNode);

}

function fetchAllCommentsGetRequest(){

    var fetchedComments = [];

    // var xhttp = new XMLHttpRequest(); // should this be re-instantiated every time a request is made?



    var url = `"http://${address}:${port}/data`;
    console.log(url);

    // xhttp.open("GET", url, true);
    // xhttp.setRequestHeader("Content-Type", "application/json");
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState === 4 && this.status === 200) {
    //
    //         var parsedData = JSON.parse(this.responseText);
    //         parsedData.comments.forEach(function(commentObject){
    //             fetchedComments.push(commentObject);
    //         });
    //
    //         // cacheNewCommentsLocally(fetchedComments);
    //         // injectCommentsIntoDom();
    //
    //
    //     }
    // };
    // xhttp.send();

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        });
}

// this avoids adding duplicate comments and losing old comments
function cacheNewCommentsLocally(comments){
    comments.forEach(function(commentObjectFromServer){
        var commentExistsLocally = false;

        if(commentsLocal.length !== 0)
            commentsLocal.forEach(function(localCommentObject){
                if(commentObjectFromServer.id === localCommentObject.id){
                       commentExistsLocally = true;
                }
            });

        if(!commentExistsLocally)
            commentsLocal.push(commentObjectFromServer)
    })
}


function injectCommentsIntoDom(){
    commentsLocal.forEach(function(localCommentObject){
        addCommentToDOM(localCommentObject.comment);
    })
}

fetchAllCommentsGetRequest();



