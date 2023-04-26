class App {
	info = document.querySelector(".info");
	#board = document.querySelector(".grid-container");
	#grid = new Array(9).fill(null);
	constructor() {
		this.displayedInfo = "Circle goes first";
		this.info.innerText = this.displayedInfo;
		this.#createBoard();
		this.#board.addEventListener("click", this.addTokenToBoard.bind(this));
		this.player = "circle";
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
		const token = document.createElement("div");
		token.classList.add(this.player);
		e.target.append(token);
	}
}

class Player {
	constructor(token) {
		this._token = token;
	}

	get gameToken() {
		return this._token;
	}

	set gameToken(token) {
		this._token = token;
	}
}

const app = new App();
console.log(app.displayedInfo);
console.log(app.player);
