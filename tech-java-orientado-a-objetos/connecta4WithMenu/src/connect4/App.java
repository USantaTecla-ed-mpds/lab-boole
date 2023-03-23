package connect4;

import connect4.views.Connect4Menu;

public class App {
    
    public static void main(final String[] args) {
        new Connect4Menu(new Connect4()).interact();;
    }
}
