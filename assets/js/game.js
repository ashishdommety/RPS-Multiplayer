$(document).ready(function() {
  var player;
  var num;
  var turn;
  var p1wins;
  var p1losses;
  var p2wins;
  var p2losses;
  var p1Choice;
  var p2Choice;

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

  $(document).on('click', '.nameSubmit, .p1Choice, .p2Choice, .p1Leave, .p2Leave', function() {
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
      database.ref('turnToggle').set({
        turn: 'player2'
      });
      database.ref('players').child('1').update({
        choice: $(this).data('ref')
      });
      console.log('p1 made their choice');
    } else if ($(this).hasClass('p2Choice')) {
      database.ref('turnToggle').set({
        turn: 'player1'
      });
      database.ref('players').child('2').update({
        choice: $(this).data('ref')
      })
      console.log('p2 made their choice');
    }
    // else if($(this).hasClass('p1Leave')){
    //   database.ref('players').child('1').remove();
    //   database.ref('playerCount').set({
    //     numberOfPlayers: 1
    //   })
    // }
    // else if($(this).hasClass('p2Leave')){
    //   database.ref('players').child('2').remove();
    //   database.ref('playerCount').set({
    //     numberOfPlayers: 1
    //   })
    // }
  });

  //read data
  database.ref().on('value', getData, error);

  function getData(snapshot) {
    //code for entering new players
    var data = snapshot.val();
    // console.log('data: ' + data);
    // console.log('num: ' + num);
    if (data === null) {
      console.log('welcome! game has just begun');
    } else {
      num = data.playerCount.numberOfPlayers;
      if (num === 1) {
        $('#name1').text(data.players['1'].name);
      } else if (num === 2) {
        $('#name1').text(data.players['1'].name);
        $('#name2').text(data.players['2'].name);
      }
      p1Choice = data.players['1'].choice;
      p2Choice = data.players['2'].choice;
      console.log('p1s Choice is :' + p1Choice);
      console.log('p2s Choice is :' + p2Choice);
    }

    //wins and losses
    p1wins = data.players['1'].wins;
    p2wins = data.players['2'].wins;
    p1losses = data.players['1'].losses;
    p2losses = data.players['2'].losses;

    $('#p1Wins').text(p1wins);
    $('#p1Losses').text(p1losses);
    $('#p2Wins').text(p2wins);
    $('#p2Losses').text(p2losses);

    //code to compare choices made
    if (p1Choice === undefined || p2Choice === undefined || p1Choice === '' || p2Choice === '') {
      console.log('if all players have been entered, pick an option');
    } else {
      if (p1Choice === 'rock') {
        if (p2Choice === 'scissors') {
          console.log('p1 wins');
          removeChoice();
          database.ref('players/1').update({
            wins: p1wins + 1
          });
          database.ref('players/2').update({
            losses: p2losses + 1
          });
          $('#result').text(data.players['1'].name + ' wins!');
        } else if (p2Choice === 'paper') {
          console.log('p2 wins');
          removeChoice();
          database.ref('players/2').update({
            wins: p2wins + 1
          });
          database.ref('players/1').update({
            losses: p1losses + 1
          });
          $('#result').text(data.players['2'].name + ' wins!');
        } else if (p2Choice === 'rock') {
          console.log('draw');
          $('#result').text("It's a draw!");
          removeChoice();
        }

      } else if (p1Choice === 'paper') {
        if (p2Choice === 'scissors') {
          console.log('p2 wins');
          removeChoice();
          database.ref('players/2').update({
            wins: p2wins + 1
          });
          database.ref('players/1').update({
            losses: p1losses + 1
          });
          $('#result').text(data.players['2'].name + ' wins!');
        } else if (p2Choice === 'paper') {
          console.log('draw');
          removeChoice();
          $('#result').text("It's a draw!");
        } else if (p2Choice === 'rock') {
          console.log('p1 wins');
          removeChoice();
          database.ref('players/1').update({
            wins: p1wins + 1
          });
          database.ref('players/2').update({
            losses: p2losses + 1
          });
          $('#result').text(data.players['1'].name + ' wins!');
        }
      } else if (p1Choice === 'scissors') {
        if (p2Choice === 'scissors') {
          console.log('draw');
          removeChoice();
          $('#result').text("It's a draw!");
        } else if (p2Choice === 'paper') {
          console.log('p1 wins');
          removeChoice();
          database.ref('players/1').update({
            wins: p1wins + 1
          });
          database.ref('players/2').update({
            losses: p2losses + 1
          });
          $('#result').text(data.players['1'].name + ' wins!');
        } else if (p2Choice === 'rock') {
          console.log('p2 wins');
          removeChoice();
          database.ref('players/2').update({
            wins: p2wins + 1
          });
          database.ref('players/1').update({
            losses: p1losses + 1
          });
          $('#result').text(data.players['2'].name + ' wins!');
        }
      }
    }

    //toggle choices
    if(data.turnToggle.turn === 'player1' || data.turnToggle.turn === undefined){
      $('.player1').addClass('highlight');
      $('.player2').removeClass('highlight');
    }
    else if(data.turnToggle.turn === 'player2'){
      $('.player2').addClass('highlight');
      $('.player1').removeClass('highlight');
    }

    function removeChoice() {
      database.ref('players').child('1/choice').remove();
      database.ref('players').child('2/choice').remove();
    }
  }

  function error(error) {
    console.log(error.code);
  }

// TODO: option to let players leave
  // TODO: chat functionality
  // TODO: user authentication????


});
