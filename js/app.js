class Player {
	#token;
	constructor(token) {
		this.#token = token;
	}

	get gameToken() {
		return this.#token;
	}

	set gameToken(token) {
		this.#token = token;
	}
}

class App {
	#info = document.querySelector(".info");
	#board = document.querySelector(".grid-container");
	#grid = new Array(9).fill(null);
	#player = "circle";
	#boxes;
	#winningCombos;
	constructor() {
		this.#createBoard();
		this.#board.addEventListener("click", this.addTokenToBoard.bind(this));
		this.displayedInfo = "Circle goes first";
		this.#info.innerText = this.displayedInfo;
		this.#boxes = document.querySelector(".box");
		this.#winningCombos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
	}
	#createBoard() {
		this.#grid.forEach((cell, index) => {
			const gridElement = document.createElement("div");
			gridElement.classList.add("box");
			this.#board.append(gridElement);
			gridElement.dataset.indexNumber = index;
		});
	}

	addTokenToBoard(e) {
		console.log(e.target);
		if (
			e.target.classList.contains("circle") ||
			e.target.classList.contains("cross")
		) {
			return;
		} else {
			const token = document.createElement("div");
			token.classList.add(this.#player);
			e.target.append(token);
			this.playerTurn();
		}
	}

	playerTurn() {
		const player1 = new Player("circle");
		const player2 = new Player("cross");
		this.#player =
			this.#player === player1.gameToken
				? player2.gameToken
				: player1.gameToken;
	}
}

const app = new App();
