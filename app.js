class Player {
    constructor(name = 'Player') {
        this._name = name;
        this._choice = '';
        this._score = 0;
    }

    get name() {return this._name}
    get choice() {return this._choice}
    get score() {return this._score}

    set choice(choice) {this._choice = choice}
    set score(score) {this._score = score}

    playerChoice(e) {
        /*playerChoiceListener(e => {
            const displayPlayerSelection = document.querySelector('#display-results .player');
            displayPlayerSelection.classList = 'player'; //Resets class list to just .player
            displayPlayerSelection.classList.add(e.target.value);
            this.choice = e.target.value;
        })*/
        const displayPlayerSelection = document.querySelector('#display-results .player');
        displayPlayerSelection.classList = 'player'; //Resets class list to just .player
        displayPlayerSelection.classList.add(e.target.value);
        this.choice = e.target.value;
    }

    incrementScore() {
        this.score++;
    }

    resetScore() {
        this.score = 0;
    }
}

class Computer extends Player {
    constructor(name = 'Computer') {
        super(name);
    }

    playerChoice() {
        /*playerChoiceListener(e => {
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
                    alert('Error!')
                    break;
            }
            const displayComputerSelection = document.querySelector('#display-results .computer');
            displayComputerSelection.classList = 'computer'; //Resets class list to just .computer
            displayComputerSelection.classList.add(this.choice);
        })*/
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
                alert('Error!')
                break;
        }
        const displayComputerSelection = document.querySelector('#display-results .computer');
        displayComputerSelection.classList = 'computer'; //Resets class list to just .computer
        displayComputerSelection.classList.add(this.choice);
    }
}

class Game {
    constructor(players, rounds) {
        this._rounds = rounds;
        this._results = [];
        this._players = [...players];
        //this._playerOne = players[0];
        //this._playerTwo = players[1];
    }

    get rounds() {return this._rounds}
    get results() {return this._results}
    get players() {return [this._players[0].name, this._players[1].name]}
    get playerOne() {return this._players[0]}
    get playerTwo() {return this._players[1]}
    get scores() {return [this._players[0].score, this._players[1].score]}

    resetResults() {this._results = []}

    playRound() {
        let roundWinner;
        let roundLoser;
        if((this.playerOne.choice === 'rock' && this.playerTwo.choice === 'scissors') || (this.playerOne.choice === 'paper' && this.playerTwo.choice === 'rock') || (this.playerOne.choice === 'scissors' && this.playerTwo.choice === 'paper')) {
            roundWinner = this.playerOne;
            roundLoser = this.playerTwo;
        } else if((this.playerTwo.choice === 'rock' && this.playerOne.choice === 'scissors') || (this.playerTwo.choice === 'paper' && this.playerOne.choice === 'rock') || (this.playerTwo.choice === 'scissors' && this.playerOne.choice === 'paper')) {
            roundWinner = this.playerTwo;
            roundLoser = this.playerOne;
        } else {
            this.results.push('Draw!');
            alert('Draw!');
            return; // Exits early as 'roundWinner' and 'roundLoser' aren't defined and would cause error in next step
        }
        roundWinner.incrementScore();
        this.results.push(`${roundWinner.choice} beats ${roundLoser.choice}. ${roundWinner.name} wins!`);
        alert(`${roundWinner.choice} beats ${roundLoser.choice}. ${roundWinner.name} wins!`);
    }
}

const playerChoiceListener = callback => {
    document.querySelector('#player-choice').addEventListener('click', e => {
        if(e.target.type === 'button') {
            callback(e);
        }
    })
}

const player = new Player('Player One');

const computer = new Computer();

const game1 = new Game([player, computer], 5);

// Doesn't work if it's not invoked, obviously
playerChoiceListener(e => {
    player.playerChoice(e);
    computer.playerChoice(e);
    game1.playRound();
})