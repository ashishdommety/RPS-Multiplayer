$(document).ready(function() {
  var player;
  var num;
  var turn;

  var p1wins;
  var p1losses;
  var p2wins;
  var p2losses;

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



  $(document).on('click', '.nameSubmit, .p1Choice, .p2Choice', function() {

    if ($(this).hasClass('nameSubmit')) {
      if (num === undefined) {
        database.ref('players/1').set({
          name: $('#name').val(),
          wins: 0,
          losses: 0
        });
        $('#name').val('');
        database.ref('playerCount').set({
          numberOfPlayers: 1
        });
      } else if (num === 1) {
        database.ref('players/2').set({
          name: $('#name').val(),
          wins: 0,
          losses: 0
        });
        $('#name').val('');
        database.ref('playerCount').set({
          numberOfPlayers: 2
        })
      } else if (num === 2) {
        alert('players full');
        $('#name').val('');
      }
    } else if ($(this).hasClass('p1Choice')) {
      database.ref('players').child('1').update({
        choice: $(this).data('ref')
      })
      console.log('p1 made their choice');
    }
    else if($(this).hasClass('p2Choice')){
      database.ref('players').child('2').update({
        choice: $(this).data('ref')
      })
      console.log('p2 made their choice');
    }
  });


  //read data
  database.ref().on('value', getData, error);

  function getData(snapshot) {
    //code for entering new players
    var data = snapshot.val();
    console.log('data: '+data);
    console.log('num: '+num);
    if(data === null){
      console.log('welcome! game has just begun');
    }
    else{
      num = data.playerCount.numberOfPlayers;
      if (num === 1) {
        console.log('1st player is in');
        console.log('num: '+ num);
      } else if (num === 2) {
        console.log('2nd player is in, no more players allowed');
        console.log('num: '+num);
      }
    }
  }

  function error(error) {
    console.log(error.code);
  }



  // TODO: add chance functionality
  // TODO: compare choices
  // TODO: win option and lose option
  // TODO: chat functionality
  // TODO:


});
