window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load

  var deck = [];
  var shuffledDeck = [];
  var dealerHand = [];
  var playerHand = [];
  var dealerPoints = 0;
  var playerPoints = 0;
  var wins = 0;
  var losses = 0;

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function buildDeck() {
    for(let i = 1; i < 14; i++) {
      deck.push({rank: i, suit: 'hearts'})
    }
    for(let i = 1; i < 14; i++) {
      deck.push({rank: i, suit: 'spades'})
    }
    for(let i = 1; i < 14; i++) {
      deck.push({rank: i, suit: 'diamonds'})
    }
    for(let i = 1; i < 14; i++) {
      deck.push({rank: i, suit: 'clubs'})
    }
    console.log(deck);
  }

  function getCardImage(card) {
    let rank = card.rank;
    let suit = card.suit;
    if(rank == 1) {
      rank = 'ace';
    }
    else if(rank == 11) {
      rank = 'jack';
    }
    else if(rank == 12) {
      rank = 'queen';
    }
    else if(rank == 13) {
      rank = 'king';
    }
    var image = "../images/" + rank + "_of_" + suit + ".png";
    return image;
  }

  function render(person) {
    // Render image
    img = document.createElement("img");
    img.src = getCardImage(shuffledDeck[0]);
    img.alt = shuffledDeck[0].rank + " of " + shuffledDeck[0].suit;
    document.getElementById(person + "-hand").appendChild(img);

    // Render points
    if(person == "dealer") {
      var points = calculatePoints(dealerHand);
    }
    else {
      var points = calculatePoints(playerHand);
    }
    document.getElementById(person + "-points").innerHTML = points;

    // Render busts
    if (points > 21 && person == "dealer") {
      document.getElementById("messages").innerHTML = person + " busts! player wins!";
      wins += 1;
      document.getElementById("wins").innerHTML = wins;
      restrictButtons();
    }
    else if (points > 21 && person == "player") {
      document.getElementById("messages").innerHTML = person + " busts! dealer wins!";
      losses += 1;
      document.getElementById("losses").innerHTML = losses;
      restrictButtons();
    }
  }

  function shuffleDeck() {
    while(deck.length > 0) {
      randomIndex = getRandomInt(deck.length);
      shuffledDeck.push(deck[randomIndex]);
      deck.splice(randomIndex, 1);
    }
    return shuffledDeck;
  }

  function calculatePoints(hand) {
    var points = 0;
    var ace = 0;
    hand.forEach(function (card) {
      if(card.rank == 1) {
        ace++;
        console.log(ace);
      }
      else if(card.rank < 10) {
        points += card.rank;
      }
      else {
        points += 10;
      }
    })

    if(ace == 1 && points < 11) {
        points += 11;
      }
      else if(ace == 2 && points < 10) {
        points += 12;
        console.log(points);
      }
      else if(ace == 3 && points < 9) {
        points += 13;
      }
      else if(ace == 4 && points < 8) {
        points += 14;
      }
      else if(ace > 0) {
        points += ace;
        console.log(points);
      }
    return points;
  }

  function restrictButtons() {
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
  }

  document.getElementById("deal-button").addEventListener("click", function() {
    playerHand.push(shuffledDeck[0]);
    console.log(shuffledDeck[0]);

    render("player");

    shuffledDeck.shift();

    dealerHand.push(shuffledDeck[0]);
    console.log(shuffledDeck[0]);

    render("dealer");

    shuffledDeck.shift();

    playerHand.push(shuffledDeck[0]);
    console.log(shuffledDeck[0]);

    render("player");

    shuffledDeck.shift();

    dealerHand.push(shuffledDeck[0]);
    console.log(shuffledDeck[0]);

    render("dealer");

    shuffledDeck.shift();

    document.getElementById("deal-button").disabled = true;
  })

  document.getElementById("hit-button").addEventListener("click", function() {
    playerHand.push(shuffledDeck[0]);
    console.log(shuffledDeck[0]);

    render("player");

    shuffledDeck.shift();

    dealerHand.push(shuffledDeck[0]);
    console.log(shuffledDeck[0]);

    render("dealer");

    shuffledDeck.shift();
  })

  document.getElementById("stand-button").addEventListener("click", function() {
    restrictButtons();

    while(true) {
      dealerHand.push(shuffledDeck[0]);
      console.log(shuffledDeck[0]);
      dealerPoints = calculatePoints(dealerHand);

      render("dealer");
      
      shuffledDeck.shift();
      if (dealerPoints > 17) {
        break;
      }
    }

    if(dealerPoints < 22 && playerPoints < 22) {
      if(dealerPoints < calculatePoints(playerHand)) {
        document.getElementById("messages").innerHTML = "player wins!";
        wins += 1;
        document.getElementById("wins").innerHTML = wins;
      }
      else {
        document.getElementById("messages").innerHTML = "dealer wins!";
        losses += 1;
        document.getElementById("losses").innerHTML = losses;
      }
    }
  })

  document.getElementById("reset-button").addEventListener("click", function() {
    console.log(deck);
    console.log(playerHand);
    buildDeck();
    shuffleDeck();

    document.getElementById("dealer-hand").innerHTML = '';
    document.getElementById("player-hand").innerHTML = '';
    document.getElementById("dealer-points").innerHTML = '';
    document.getElementById("player-points").innerHTML = '';
    document.getElementById("messages").innerHTML = '';
    document.getElementById("deal-button").disabled = false;
    document.getElementById
    ("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;


    dealerHand = [];
    playerHand = [];
    dealerPoints = 0;
    playerPoints = 0;
  })

  buildDeck();
  shuffleDeck();

})

