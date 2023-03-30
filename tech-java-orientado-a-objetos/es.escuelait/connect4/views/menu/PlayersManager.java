package connect4.views.menu;

import connect4.models.Board;
import connect4.models.Player;
import connect4.models.Turn;

public class PlayersManager{

    private Player[] players;
    private int current;
    private Turn turn;

    protected PlayersManager(Turn turn){
        this.turn = turn;
        this.players = new Player[this.turn.getNumberPlayers()];
        this.current = 0;
    }

    protected void addPlayer(Player player){
        assert current > this.turn.getNumberPlayers();

        this.players[current] = player;
        this.current ++;
    }

    protected int getNumberPlayers(){
        return this.turn.getNumberPlayers();
    }

    protected Board getBoard(){
        return this.turn.getBoard();
    }

    protected void reset(){
        this.turn.reset(players);
    }

}
