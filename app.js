//expand on this idea: rock paper scissors, but the more you play more things start happening and it becomes more complex
// gain coins for winning rock paper scissors, use coins to automate rock paper scissors and unlock other things 
//spend coins at the microtransaction shop use coins to buy 'dlcs'
//add other games, level ups, vampire survivors like mini game
// add animations for pressing the buttons + user and computer choice
// add animations for a winner loser and tie 
//rock melee paper spell casting scissors throwing/ranged
//count wins on the side using rock paper and scissor coins
// have random events happen that make you use your rock paper and scissors
// have it turn into a turn based rpg where you use rock paper or scissors in a pokemon style move selection
// choose your pokemon - rock paper or scissors


//TODO
// add computer-weapons either in its own box or in small circles below the skulls
// let the computer do something with it's weapons
//let the user do something with their weapons 
// bring the text boxes in the middle down below the divs on the right and left
// make it more stylized
// make ties do something - give a random rock paper or scissors to both the user and the computer if their weapons are under 10

//TODO2
// Add win conditions - when do you win? when does it reset? when do you lose? what happens when each of these occur? what happens if you tie?
// If you tie it opens the store?
// Add game over - lose all of your coins
// Add Store to buy things with rock paper or scissor
//          extra hearts, things that happen if you have a certain number of hearts, things that happen if you press the same button over and over


// TODO Cleaning 
// change comp-coins to class name and edit js and css for that
// have all the comp-coins show, but have them be transparent
// as you lose, the comp-coins become opaque and reset when they hit 5  

//gets the html elements for input values from js 
const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result-display')
const possibleChoices = document.querySelectorAll('button')
//coin counts from js
const rockCount = document.getElementById('rock-count')
const paperCount = document.getElementById('paper-count')
const scissorsCount = document.getElementById('scissors-count')




//images to modify
const computerImage = document.getElementById('computer-img')
const userImage = document.getElementById('user-img')
const resultImage = document.getElementById('result-img')
const compCoinImage = document.getElementById('comp-coin')
const userCoinImage = document.getElementById('user-coin')
const userWeapons = document.getElementById('user-weapons')
const userCoinBox = document.getElementsByClassName('coin-box')
const userHearts = document.querySelectorAll('#user-coin')
const compCoinHolder = document.getElementById('comp-coin-holder')


//sets variables for the computer and user choice in js  -- helps check for a winner
let userChoice
let computerChoice
let result
let compAmt

//Img srcs
let winImage = "https://images.unsplash.com/photo-1634454686481-dff1eaa44c21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=731&q=80"
let loseImage = "https://t3.ftcdn.net/jpg/05/29/76/16/360_F_529761687_w6ZgCR7oJ8iyoPofo8hPikOw6EM9cp4m.jpg"
let tieImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIQ6KnOnO0j1SNaGilik8hHbnV9kqHOpr3ZA&usqp=CAU"
let rockImage = "https://images.unsplash.com/photo-1580687104139-9d51ce55e346?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
let paperImage = "https://images.unsplash.com/photo-1603484477859-abe6a73f9366?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFwZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
let scissorsImage = "https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80"
let computerCoinIcon = "https://images.unsplash.com/photo-1637781930945-090e6672b750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=702&q=80"
let userCoinIcon = 'https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_1280.png'

//Win lose tie messages
let uWin = "You Win!"
let uLose = "You Lose! :("
let uTie = "You Tied!"

//Initialize score
let compScore = 0
let userScore = 2
//Init coins
let rockCoins = 0
let paperCoins = 0
let scissorsCoins = 0

//init computer win limit
let compLimit = 5

//fix this to make it add compCoins every time the player loses - next do the same for the player
//when there are 10 skulls - start the next game
//player will have the number of hearts that are filling the userCoin
function compCoin(){
    const newCompCoin = document.createElement('img')
    newCompCoin.src = computerCoinIcon
    newCompCoin.id = "comp-coin"
    newCompCoin.className = 'cc'
    compCoinHolder.appendChild(newCompCoin)
}
function userCoin(){
    const newUserCoin = document.createElement('img')
    newUserCoin.src = userCoinIcon
    newUserCoin.id = "user-coin"
    const oldUserCoin = userCoinImage
    oldUserCoin.insertAdjacentElement('afterend', newUserCoin)
}
function userWeapon(type){
    if (type == 'rock'){
        rockCoins += 1
        userCoinBox[0].style.display = 'flex'
        rockCount.innerHTML = rockCoins
        
    }
    if (type == 'paper'){
        paperCoins += 1
        userCoinBox[1].style.display = 'flex'
        paperCount.innerHTML = paperCoins
    }
    if (type == 'scissors'){
        scissorsCoins += 1
        userCoinBox[2].style.display = 'flex'
        scissorsCount.innerHTML = scissorsCoins
    }
}


//adds an event listener that watches for  a button "click" 
//generates user choice
// gets a winner
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    userChoiceDisplay.style.textTransform = 'capitalize'
    userImage.style.display = 'flex'
    computerImage.style.display = 'flex'
    resultImage.style.display = 'flex'
    //function that generates text for computer-choice html
    generateComputerChoice()
    generateResult()
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3)
    computerChoice = possibleChoices[randomNumber].id
    computerChoiceDisplay.innerHTML = computerChoice
    if (computerChoice == 'rock'){
        computerImage.src = rockImage
    }
    if (computerChoice == 'paper'){
        computerImage.src = paperImage
    }
    if (computerChoice == 'scissors'){
        computerImage.src = scissorsImage
    }
}

function rock() {
    userImage.src = rockImage
    if (userChoice == 'rock' && computerChoice == 'paper'){
        loser()
    }
    if (userChoice == 'rock' && computerChoice == 'scissors'){
        winner('rock')
    }
}
function paper() {
    userImage.src = paperImage
    if (userChoice == 'paper' && computerChoice == 'scissors'){
        loser()
    }
    if (userChoice == 'paper' && computerChoice == 'rock'){
        winner('paper')
    }
}
function scissors() {
    userImage.src = scissorsImage
    if (userChoice == 'scissors' && computerChoice == 'rock'){
        loser()
    }
    if (userChoice == 'scissors' && computerChoice == 'paper'){
        winner('scissors')
    }
}
function winner(type) {
    resultImage.src = winImage
    result= uWin
    userCoinImage.style.display = 'inline'
    userCoinImage.src = userCoinIcon
    if (userScore >= 1){
        // userCoin() <- Gives a heart 
        userWeapon(type)
    }
}
function loser() {
    resultImage.src = loseImage
    result = uLose
    if (compScore <= 10){
        compCoin()
        compScore += 1
    } 
    if (compScore == compLimit){
        userHearts[userScore-1].style.opacity = .33
        userScore -= 1
        compScore = 0
        compAmt = document.getElementsByClassName('cc')
        console.log(compAmt)
        compArray = Array.from(compAmt)
        console.log(compAmt)
        compArray.forEach(element =>{
            element.parentNode.removeChild(element)
        })
    }
    if (userScore <= 0){
        alert("Game Over!")
        location.reload()

    }

}
function tie() {
    resultImage.src = tieImage
    result = uTie
}

function generateResult() {

    if (userChoice == computerChoice){
        tie()
    }
    if (userChoice == 'rock'){
        rock()
    }
    if (userChoice == 'paper'){
        paper()
    }
    if (userChoice == 'scissors'){
        scissors()
    }
    resultDisplay.innerHTML = result
    computerChoiceDisplay.style.textTransform = 'capitalize'
}
