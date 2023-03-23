package connect4.views;

import connect4.Connect4;
import connect4.utils.menu.Option;

abstract class Connect4Option extends Option{
    protected Connect4 connect4;
    
    public Connect4Option(String string, Connect4 connect4){
        super(string);
        this.connect4 = connect4;
    }
}
