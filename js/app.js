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
	#button = document.querySelector(".btn");
	#board = document.querySelector(".grid-container");
	#grid = new Array(9).fill("");
	#player = "circle";
	#boxes;
	#winningCombos;
	constructor() {
		this.displayedInfo = "Circle goes first";
		this.#createBoard();
		this.#board.addEventListener("click", this.#addTokenToBoard.bind(this));
		this.#boxes = document.querySelectorAll(".box");
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
		this.#button.addEventListener("click", this.restart.bind(this));
	}
	#createBoard() {
		this.#grid.forEach((cell, index) => {
			const gridElement = document.createElement("div");
			gridElement.classList.add("box");
			this.#board.append(gridElement);
			gridElement.dataset.indexNumber = index;
		});
		this.#info.innerText = this.displayedInfo;
	}

	#addTokenToBoard(e) {
		if (
			e.target.classList.contains("circle") ||
			e.target.classList.contains("cross")
		) {
			return;
		} else {
			const token = document.createElement("div");
			token.classList.add(this.#player);
			e.target.append(token);
			console.log(e.target.dataset.indexNumber);
			this.#playerTurn(e);
		}
	}

	#playerTurn(e) {
		const player1 = new Player("circle");
		const player2 = new Player("cross");
		this.#player =
			this.#player === player1.gameToken
				? player2.gameToken
				: player1.gameToken;

		this.#grid[e.target.dataset.indexNumber] = this.#player;
		this.#info.innerText = `${this.#player}'s turn now`;
		this.#checkForWin(player1, player2);
	}

	#checkForWin(player1, player2) {
		this.#winningCombos.forEach(array => {
			let circleWin = array.every(index => {
				return this.#boxes[index].firstChild?.classList.contains("circle");
			});

			let crossWin = array.every(index => {
				return this.#boxes[index].firstChild?.classList.contains("cross");
			});

			if (circleWin) this.#info.innerText = `${player1.gameToken} wins!`;
			else if (crossWin) this.#info.innerText = `${player2.gameToken} wins!`;

			if (circleWin || crossWin) {
				this.#button.removeAttribute("hidden", false);
			}
		});
	}

	restart() {
		console.log(this.#boxes.length);
		this.#boxes.forEach(box => {
			box.firstElementChild?.remove();
		});
		this.#player = "circle";
		this.#info.innerText = this.displayedInfo;
		this.#button.setAttribute("hidden", true);
	}
}

const app = new App();
