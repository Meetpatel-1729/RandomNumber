/*
    Meet Patel
    October 11, 2019
    This is a javascript file which is the model of the game 
    In this game it prints the welcome message and age of the user in the color the user had selected 
    In this game it generates the value from 0 to 100 (multiple of 5)
    so 0,5,10,15,20,... and based on that it shows a winner
    This game has spin button to spin again (play again)
    Help button shows the instructions to the user and it automatically time out after 3000ms 
    Reset button reset the game and goes back to the main page(index.html)
*/

// Event Listner which is loaded on the start of the program
window.addEventListener("load", function () {

  // Creates an object named person which stores the value entered in the html form
  let person = {
    Name: '',
    Date: '',
    Color: '',
    Age: ''
  };

  // Creates an object named game which stores the score of computer and user and also the winner
  let game = {
    num1: 0,
    num2: 0,
    winner: '',
  };

  // function doit is called when user submit thier data into the form
  function doit(event) {
      let detailsForm = document.getElementById("details");
      detailsForm.style.display = "none"; // hide the detailsfrom

      let gameForm = document.getElementById("game");
      gameForm.style.visibility = "visible"; // visible the gameForm
      event.preventDefault();

      person.Name = document.getElementById("name").value; // Sets the name
      person.Date = document.getElementById("datepicker").value; // Sets the Date of birth
      person.Color = document.getElementById("favcolour").value; // Sets the favourite color

      calculateAge(person.Date); // Call the calculateAge function

      let name = document.getElementById("enteredName");
      name.innerText  =  "Welcome " + person.Name + " ( Age: " + person.Age + " )"; // Prints the user name and age
      name.style.color = person.Color; // Sets the font color to the favourite colour of the user

      let spin = document.getElementById("spinButton");
      if(spin.addEventListener) {
        // Event Listener which is called when the Spin button is clicked
        spin.addEventListener("click",spinWheel); 
      } 
      
      let help = document.getElementById("helpButton");

      // Event listner which is called when the mouse is hovered on the help button 
      help.addEventListener("mouseenter", generateHelp); 
  }

  // calculateAge function which calculates the age of the user
  function calculateAge(birthDate) {
    var year = Number(person.Date.substr(0, 4));
    var month = Number(person.Date.substr(4, 2)) - 1;
    var day = Number(person.Date.substr(6, 2));
    var today = new Date();
    var age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      age--;
    }
    person.Age = age;
  }

  // spinWheel function which sets the winner of the game
  function spinWheel() {
    game.num1 = generateRandomNumber();
    game.num2 = generateRandomNumber();

    document.getElementById("value1").value = game.num1;
    document.getElementById("value2").value = game.num2;
  
    if(game.num1 < game.num2) {
      game.winner = "Computer";
    }
    else if(game.num1 > game.num2) {
      game.winner = person.Name;
    }
    else {
      game.winner = "tie";
    }

    if(game.winner == "Computer" ||  game.winner == person.Name) {
      document.getElementById("winner").innerText = "Winner is: " + game.winner;
    }
    else {
      document.getElementById("winner").innerText = "It's a tie";
    } 
  }

  // Generate a random number from 0 to 100 which is multiple of 5
  function generateRandomNumber() {
    let a = Math.floor(Math.random() * 20);
    return a * 5;
  }

  // Shows the Instructions to the user when hovered and automatically time outs after 3000ms 
  function generateHelp() {

    // Instruction for the user
    document.getElementById("helpMessage").innerText = "In this game it generates the random" +
    " value which is multiple of 5 from 0 to 100 like 0,5,10,15,.. on cliking the spin button it" +
    " shows the winner. It also calculate the age of the user based on entered date of birth.";
  
    // reset the help message after a short delay
    setTimeout(function() {
      document.getElementById("helpMessage").innerText = ""; // Sets message to null 
   }, 3000);
  }

  let form = document.forms[0];
  form.addEventListener("submit", doit); // calls the doit method on submitting the form
})