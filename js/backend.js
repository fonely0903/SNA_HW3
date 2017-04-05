// Initialize Firebase
var config = {
    apiKey: "AIzaSyDmjbxq1ucCi6qW2-vPEgAlSaoLP6d-olU",
    authDomain: "sna-hw3-a2e4c.firebaseapp.com",
    databaseURL: "https://sna-hw3-a2e4c.firebaseio.com",
    projectId: "sna-hw3-a2e4c",
    storageBucket: "sna-hw3-a2e4c.appspot.com",
    messagingSenderId: "131070530356"
};
firebase.initializeApp(config);

var storage = firebase.storage();
var storageRef = firebase.storage().ref();
var img1 = "image1.png";
var img2 = "image2.png";
var img3 = "image3.jpg";

var currentUser ;
var fbProvider = new firebase.auth.FacebookAuthProvider();
var ggProvider = new firebase.auth.GoogleAuthProvider();

$('#ggLogIn').click(function(){
    firebase.auth().signInWithPopup(ggProvider).then(function(result) {
        var token = result.credential.accessToken;
        var gguser = result.user;
        console.log(gguser);
        $('.messagemeForm').css('display','none');
        $('#yesuser').css('display','block');
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        alert(errorMessage);
    });
})
$('#fbLogIn').click(function(){
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
        var token = result.credential.accessToken;
        var fbuser = result.user;
        $('.messagemeForm').css('display','none');
        $('#yesuser').css('display','block');

    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        alert(errorMessage);
    });
})
$('#nameLogIn').click(function(){
    $('.messagemeForm').css('display','none');
    $('#nouser').css('display','block');
})

initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var photoURL = user.photoURL;
        var uid = user.uid;
        currentUser=user;
        console.log(displayName+"已登入");
        $('#userIMG').attr("src",photoURL);
        $('.userName').text(displayName);
        $('.userEmail').text(email);
      } 
      else {
        console.log("您尚未登入")
      }
    }, function(error) {
      console.log("error:"+error);
    });
};

$('.nousrSub').submit(function(){
    var messageRef = storageRef.child('texts/secret-message-'+$('.nousrS').val()+'.txt')
    messageRef.putString($('.nousrms').val()).then(function(e){
        console.log(e);
        $("input[type='checkbox']").attr("checked", false);
        $("input[type='text']").attr('val','');
        $('textarea').attr("value", "");
        mess++;
    });
})
$('.yesusrSub').submit(function(){
    var messageRef = storageRef.child('texts/secret-message-'+$('.yesusrS').val()+'.txt')
    messageRef.putString($('.yesusrms').val()).then(function(e){
        $("input[type='text']").attr('val','');
        $('textarea').attr("value", "");
        mess++;
    });
})



window.addEventListener('load', function() {
    initApp()
});

$(".logout-btn").click(function () {
  firebase.auth().signOut().then(function() {
    console.log("signed-out");
    $('#userIMG').attr('src','...');
  },function (error) {
  console.log(error.code);
  });
  $('.messagemeForm').css('display','none');
});
  




//顯示資料庫圖片
$(document).ready(function(){
	if(isAPIAvailable()) {
        $('#file').bind('change',handleFileSelect);
    }
    randerIMG();
})

function randerIMG(){
    var publicRef1 = storageRef.child('public/'+img1);
    var publicRef2 = storageRef.child('public/'+img2);
    var publicRef3 = storageRef.child('public/'+img3);

    console.log(publicRef1);
    console.log(publicRef2);
    console.log(publicRef3);

    publicRef1.getDownloadURL().then(function(url1){
        $('#appleAD').attr('src',url1);
    });
    publicRef2.getDownloadURL().then(function(url2){
        $('#NTUAAD').attr('src',url2);
    });
    publicRef3.getDownloadURL().then(function(url3){
        $('#cat').attr('src',url3);
    });   
}


//上傳檔案
function handleFileSelect(evt){
	var file = evt.target.files[0];
	var fileName = evt.target.fileName;
	var metadata = { contentType: file.type };

	storageRef.child('public/'+ file.name).put(file, metadata).then(function(snapshot){
		console.log("上傳完成",snapshot);
	}).catch(function(error){
		console.error("Upload failed:",error);
	});
}

function isAPIAvailable() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
       return true;
    } 
    else {
        // source: File API availability - http://caniuse.com/#feat=fileapi
        // source: <output> availability - http://html5doctor.com/the-output-element/
        console.error('The HTML5 APIs used in this form are only available in the following browsers:<br />');
        // 6.0 File API & 13.0 <output>
        console.error(' - Google Chrome: 13.0 or later<br />');
        // 3.6 File API & 6.0 <output>
        console.error(' - Mozilla Firefox: 6.0 or later<br />');
        // 10.0 File API & 10.0 <output>
        console.error(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
        // ? File API & 5.1 <output>
        console.error(' - Safari: Not supported<br />');
        // ? File API & 9.2 <output>
        console.error(' - Opera: Not supported');
        return false;
    }
}