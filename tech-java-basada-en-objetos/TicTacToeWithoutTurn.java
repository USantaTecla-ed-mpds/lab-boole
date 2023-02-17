package es.usantatecla.tictactoe;

class TicTacToeWithoutTurn {

	private Board board;
	private Player[] players;
	private int activePlayer;
	private String answer;
	private static final int NUMBER_PLAYERS = 2;

	private TicTacToeWithoutTurn() {
		this.board = new Board();
		this.players = new Player[NUMBER_PLAYERS];
		this.reset();
	}

	private void reset() {
		for (int i = 0; i < NUMBER_PLAYERS; i++) {
			this.players[i] = new Player(Color.get(i), this.board);
		}
		this.activePlayer = 0;
	}

	private void play() {
		do {
			this.playGame();
		} while (this.isResumedGame());
	}

	private void playGame() {
		Message.TITLE.writeln();
		this.board.write();
		do {
			this.iteract();
			this.board.write();
		} while (!this.board.isTicTacToe(this.getActiveColor()));
		this.players[this.activePlayer].writeWinner();
	}

	private void iteract(){
		this.players[this.activePlayer].play();
		if (!this.board.isTicTacToe(this.getActiveColor())) {
			this.activePlayer = (this.activePlayer + 1) % NUMBER_PLAYERS;
		}
	}

	public Color getActiveColor() {
		return this.players[this.activePlayer].getColor();
	}

	private boolean isResumedGame() {

		this.yesNoDialogRead(Message.RESUME.toString());
		if (yesNoDialogIsAffirmative()) {
			this.board.reset();
			this.reset();
		}
		return yesNoDialogIsAffirmative();
	}

	private void yesNoDialogRead(String message){

	
		Console console = Console.getInstance();
		boolean ok;

		do {
			console.write(message);
			this.answer = console.readString(Message.YES_NO_SUFFIX.toString());
			ok = Character.toLowerCase(this.answer.charAt(0)) 
			== Message.AFFIRMATIVE 
			|| Character.toLowerCase(this.answer.charAt(0)) 
			== Message.NEGATIVE;
			if (!ok) {
				console.writeln(Message.YES_NO_ERROR.toString());
			}
		} while (!ok);
	}

	private boolean yesNoDialogIsAffirmative(){
		return Character.toLowerCase(this.answer.charAt(0)) == Message.AFFIRMATIVE;
	}

	public static void main(String[] args) {
		new TicTacToeWithoutTurn().play();
	}

}
