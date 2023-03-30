package connect4.views.menu;

import connect4.models.Turn;
import connect4.utils.menu.Menu;
import connect4.views.Message;

public class SelectPlayersMenu extends Menu{

    private PlayersManager playersManager;
    
    public SelectPlayersMenu(Turn turn){
        super(Message.SELECT_GAME_MODE.toString());
        this.playersManager = new PlayersManager(turn);
    }

    protected void addOptions(){
        this.add(new HumansPlayersOption(this.playersManager));
        this.add(new HumanPcPlayersOption(this.playersManager));
        this.add(new PcPlayersOption(this.playersManager));
    }
}
