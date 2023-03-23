package connect4.views;

import connect4.Connect4;

public class PlayWithHumanOption extends Connect4Option{
    public PlayWithHumanOption(Connect4 connect4){
        super("Jugar de a dos", connect4);
    }

    public void interact(){
        connect4.playGame(2);
    }
}
