package connect4.views;

import connect4.utils.menu.Option;

abstract class Connect4Option extends Option{
    protected TurnView turnView;
    public Connect4Option(String string, TurnView turnView){
        super(string);
        this.turnView = turnView;
    }
}
