$(document).ready(function(){
  var player;
  var num = 1;

  // Initialize Firebase
   var config = {
     apiKey: "AIzaSyAKF_gYZ0W8d7c0P-mC7Iy6STg8DptxdQk",
     authDomain: "multi-rps-2de78.firebaseapp.com",
     databaseURL: "https://multi-rps-2de78.firebaseio.com",
     projectId: "multi-rps-2de78",
     storageBucket: "multi-rps-2de78.appspot.com",
     messagingSenderId: "269890625687"
   };
   firebase.initializeApp(config);

   var database = firebase.database();

   var ref = database.ref('players');

   function getPlayer(){
      player = {
       name:$('#name').val(),
       wins:0,
       losses:0,
       choice:''
     };
   }

   console.log(num);
   $(document).on('click', '#nameSubmit',function(event){
     event.preventDefault();
     if(num > 2){
       alert('players full');
       //empty input field
       $('#name').val('');
     }
     else{
       //push to database
       ref = database.ref('players/'+num);
       getPlayer();
       ref.push(player);
       //empty input field
       $('#name').val('');
     }
   });

   //read data
   ref.on('value',getData,error);

   function getData(snapshot){

     //find way to make this code more DRY
     var fatherObj = snapshot.val()[1];
     var motherObj = snapshot.val()[2];
     var fatherSize = Object.keys(fatherObj).length;
     var motherSize = Object.keys(motherObj).length;
     if(fatherSize === 1){
       num = 2;
     }
     if(motherSize === 1){
       num = 3;
     }
     console.log(motherSize);
     //get values to screen
     for (var i = 1; i < 3; i++){
       //for names
       var obj = snapshot.val()[i];
       var key = Object.keys(obj);
       var name = obj[key[0]].name;
       var wins = obj[key[0]].wins;
       var losses = obj[key[0]].losses;
      //change player details
       $('#name'+i).text(name);
       $('#p'+i+'Wins').text(wins);
       $('#p'+i+'Losses').text(losses);
     }

   }
   function error(){
     console.log('error');
   }

// TODO: Display choices
// TODO: push clicked choice to the database
// TODO: add chance functionality
// TODO: compare choices
// TODO: win option and lose option
// TODO: chat functionality
// TODO:


});
