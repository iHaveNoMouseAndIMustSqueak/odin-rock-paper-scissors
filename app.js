class Player {
    constructor(name) {
        this._name = name;
        this._play = '';
        this._score = 0;
    }

    get name() {return this._name}
    get play() {return this._play}
    get score() {return this._score}

    playHand(hand = Math.floor(Math.random()*3)) {
        switch (hand) {
            case 'Rock':
            case 'rock':
            case 0:
                this._play = 'Rock';
                break;
            case 'Paper':
            case 'paper':
            case 1:
                this._play = 'Paper';
                break;
            case 'Scissors':
            case 'scissors':
            case 2:
                this._play = 'Scissors';
                break;
            default:
                alert('Error! Please enter "rock", "paper", or "scissors"')
                break;
        }
    }

    incrementScore() {this._score++}
    resetScore() {this._score = 0}
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

    playRound(handOne, handTwo) {
        this.playerOne.playHand(handOne);
        this.playerTwo.playHand(handTwo);

        let roundWinner;
        let roundLoser;
        console.log(this.playerOne.play, this.playerTwo.play)

        if((this.playerOne.play === 'Rock' && this.playerTwo.play === 'Scissors') || (this.playerOne.play === 'Paper' && this.playerTwo.play === 'Rock') || (this.playerOne.play === 'Scissors' && this.playerTwo.play === 'Paper')) {
            roundWinner = this.playerOne;
            roundLoser = this.playerTwo;
        } else if((this.playerTwo.play === 'Rock' && this.playerOne.play === 'Scissors') || (this.playerTwo.play === 'Paper' && this.playerOne.play === 'Rock') || (this.playerTwo.play === 'Scissors' && this.playerOne.play === 'Paper')) {
            roundWinner = this.playerTwo;
            roundLoser = this.playerOne;
        } else {
            this.results.push('Draw!');
            alert('Draw!');
            return; // Exits early as 'roundWinner' and 'roundLoser' aren't defined and would cause error in next step
        }
        roundWinner.incrementScore();
        this.results.push(`${roundWinner.play} beats ${roundLoser.play}. ${roundWinner.name} wins!`);
        alert(`${roundWinner.play} beats ${roundLoser.play}. ${roundWinner.name} wins!`);
    }

    playGame(rounds = this.rounds) {
        let roundsLeft = rounds;
        this.playerOne.resetScore();
        this.playerTwo.resetScore();
        this.resetResults();
        while(roundsLeft-- > 0) {
            this.playRound(prompt('Rock, paper or scissors?', 'rock'));
        }
        alert(`Score:\n${this.playerOne.name} - ${this.playerOne.score}     ${this.playerTwo.name} - ${this.playerTwo.score}`)
    }
}

const computer = new Player('Computer');

const player = new Player('Player');

const game1 = new Game([player, computer], 5);

game1.playGame();