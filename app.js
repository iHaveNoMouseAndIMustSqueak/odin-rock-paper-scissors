class Player {
    constructor(name = 'Player') {
        this._name = name;
        this._choice = '';
        this._score = 0;
        this._scoreCounter = document.querySelector('#player-score');
        this._displaySelection = document.querySelector('#display-results .player');
    }

    get name() {return this._name}
    get choice() {return this._choice}
    get score() {return this._score}
    get scoreCounter() {return this._scoreCounter}
    get displaySelection() {return this._displaySelection}

    set choice(choice) {this._choice = choice}
    set score(score) {this._score = score}

    playerChoice(button) {
        this.displaySelection.classList = 'player'; //Resets class list to just .player
        this.displaySelection.classList.add(button);
        this.choice = button;
    }

    incrementScore() {
        this.score++;
        this.scoreCounter.textContent = this.score;
    }

    resetScore() {
        this.score = 0;
        this.scoreCounter.textContent = this.score;
        this.displaySelection.classList.remove(this.choice);
    }
}

class Computer extends Player {
    constructor(name = 'Computer') {
        super(name);
        this._scoreCounter = document.querySelector('#computer-score');
        this._displaySelection = document.querySelector('#display-results .computer');
    }

    playerChoice() {
        const randomNumber = Math.floor(Math.random()*3);
        switch (randomNumber) {
            case 0:
                this.choice = 'rock';
                break;
            case 1:
                this.choice = 'paper';
                break;
            case 2:
                this.choice = 'scissors';
                break;
            default:
                this.choice = '';
                break;
        }
        this.displaySelection.classList = 'computer'; //Resets class list to just .computer
        this.displaySelection.classList.add(this.choice);
    }
}

class Game {
    constructor(players, rounds) {
        this._rounds = rounds;
        this._results = [];
        this._players = [...players];
    }

    get rounds() {return this._rounds}
    get results() {return this._results}
    get players() {return this._players}
    get playerOne() {return this._players[0]}
    get playerTwo() {return this._players[1]}
    get scores() {return [this.playerOne.score, this.playerTwo.score]}

    set rounds(numberOfRounds) {this._rounds = numberOfRounds}

    resetGame(rounds = 5) {
        this._results = [];
        this.playerOne.resetScore();
        this.playerTwo.resetScore();
        this.rounds = rounds;
    }

    playRound(button) {
        this.playerOne.playerChoice(button);
        this.playerTwo.playerChoice();

        const roundSummaryText = document.querySelector('#display-results p');

        let roundWinner;
        let roundLoser;
        let roundResults;

        if((this.playerOne.choice === 'rock' && this.playerTwo.choice === 'scissors') || (this.playerOne.choice === 'paper' && this.playerTwo.choice === 'rock') || (this.playerOne.choice === 'scissors' && this.playerTwo.choice === 'paper')) {
            roundWinner = this.playerOne;
            roundLoser = this.playerTwo;
        } else if((this.playerTwo.choice === 'rock' && this.playerOne.choice === 'scissors') || (this.playerTwo.choice === 'paper' && this.playerOne.choice === 'rock') || (this.playerTwo.choice === 'scissors' && this.playerOne.choice === 'paper')) {
            roundWinner = this.playerTwo;
            roundLoser = this.playerOne;
        } else {
            roundResults = 'Draw!';
            this.results.push(roundResults);
            roundSummaryText.textContent = roundResults;
            return; // Exits early as 'roundWinner' and 'roundLoser' aren't defined and would cause error in next step
        }
        roundWinner.incrementScore();
        roundResults = `${roundWinner.choice} beats ${roundLoser.choice}. ${roundWinner.name} wins!`
        roundResults = roundResults.charAt(0).toUpperCase() + roundResults.substring(1);
        this.results.push(roundResults);
        roundSummaryText.textContent = roundResults;
    }

    playerChoiceListener(callback) {
        document.querySelector('#player-choice').addEventListener('click', e => {
            if(e.target.type === 'button') {
                callback(e);
            }
        })
    }

    playGame() {
        this.playerChoiceListener(e => {
            if(this.rounds > 0) {
                console.log(this)
                this.playRound(e.target.value); // Requires e.target.value to know which button was pressed
                this.rounds--;
            } else {
                this.resetGame();
                document.querySelector('#display-results p').textContent = 'Pick rock, paper or scissors for new game.';
            }
        })
    }
}


const player = new Player('Player One');

const computer = new Computer();

const game1 = new Game([player, computer], 5);

game1.playGame();
