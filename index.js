
// var address = "127.0.0.1";
var address = "localhost";
var port = "3000";
var commentsLocal = []; // id and comment

var sendCommentButtonElementRef = document.getElementById("submit");
var inputElementRef = document.getElementById("comment-input");
var chatContainerRef = document.getElementById("chat-container");
sendCommentButtonElementRef.addEventListener("click", function(){
    // alert("fsd");
    validateAndAttemptSendMessage();
});

function validateAndAttemptSendMessage(){
    if(inputElementRef.value === "" || inputElementRef.value.substring(0,1) === " ") {
        alert("messages must contain text and can't start with a space");
        return;
    }

    sendCommentPostRequest(inputElementRef.value);
    inputElementRef.value = "";

}


messageInputElementInFocus = false;
inputElementRef.onfocus = function(){
    console.log("message input is in focus");
    messageInputElementInFocus = true;
};

inputElementRef.onblur = function(){
    console.log("message input is out of focus");
    messageInputElementInFocus = false;
};


function sendMessageViaEnterEvent(keyBoardEvent){
    console.log(keyBoardEvent.charCode);
    const enterKeyCharCode = 13;
    if(messageInputElementInFocus && keyBoardEvent.charCode == enterKeyCharCode){
        validateAndAttemptSendMessage();
    }
}




window.addEventListener("keypress", sendMessageViaEnterEvent);



function addCommentToDOM(comment){
    var commentBoxNode = document.createElement("div");
    commentBoxNode.id = "comment-box";

    var speechBox = document.createElement("div");
    speechBox.id = "speech-box";

    commentBoxNode.appendChild(speechBox);

    var textCommentNode = document.createTextNode(comment);
    commentBoxNode.appendChild(textCommentNode);
    chatContainerRef.appendChild(commentBoxNode);
}

function fetchAllCommentsGetRequest(){

    var fetchedComments = [];

    var xhttp = new XMLHttpRequest(); // should this be re-instantiated every time a request is made?

    var url = `data`;
    console.log(url);

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var parsedData = JSON.parse(this.responseText);
            parsedData.comments.forEach(function(commentObject){
                fetchedComments.push(commentObject);
            });

            cacheNewCommentsLocally(fetchedComments);
        }
    };
    console.log("sending");
    xhttp.send();

    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //     });
}

function sendCommentPostRequest(comment){
    var xhttp = new XMLHttpRequest(); // should this be re-instantiated every time a request is made?

    var params = {comment};
    var url = `data`;
    console.log(url);

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var parsedData = JSON.parse(this.responseText);
            console.log(parsedData);
            fetchAllCommentsGetRequest();

            // window.setTimeout(function(){
            //     scrollToBottomOfComments();
            // }, 200)
        }
    };
    console.log("sending");
    xhttp.send(JSON.stringify(params));
}

function scrollToBottomOfComments(){
    console.log(chatContainerRef.scrollHeight);
    chatContainerRef.scrollIntoView(false);
    chatContainerRef.scrollTop = 10000000;
}

// this avoids adding duplicate comments and losing old comments
function cacheNewCommentsLocally(comments){

    // first time populating local comments array, skip this step after is performed initially once
    if(commentsLocal.length == 0) {
        comments.forEach(function (commentObjectFromServer) {
            commentsLocal.push(commentObjectFromServer);
        });
        injectCommentsIntoDom();
        return;
    }

    comments.forEach(function(commentObjectFromServer){
        var commentExistsLocally = false;

        commentsLocal.forEach(function(localCommentObject){
            if(commentObjectFromServer.id === localCommentObject.id){
                commentExistsLocally = true;
            }
        });

        if(!commentExistsLocally){
            commentsLocal.push(commentObjectFromServer);
            injectCommentsIntoDom();
            scrollToBottomOfComments();
        }
    });
}


function injectCommentsIntoDom(){
    // console.log("comments local");
    // console.log(commentsLocal.length);
    chatContainerRef.innerText = "";
    commentsLocal.forEach(function(localCommentObject){
        // console.log(localCommentObject);
        addCommentToDOM(localCommentObject.comment);
    })
}

fetchAllCommentsGetRequest();

var tid = window.setInterval(() => {
    fetchAllCommentsGetRequest();
}, 5000);



