package connect4.views.menu;

import connect4.models.Color;
import connect4.utils.menu.Menu;
import connect4.views.Message;

public class SubMenuModoPc extends Menu{

    private PlayersManager playersManager;
    private Color color;
    
    public SubMenuModoPc(Color color, PlayersManager playersManager){
        super(Message.SELECT_PLAYER_TO_COLOR.toString() + color.getString());
        this.playersManager = playersManager;
        this.color = color;
    }

    protected void addOptions(){
        this.add(new RandomPlayerOption(color, this.playersManager));
        this.add(new IAPlayerOption(color, this.playersManager));
    }
}
