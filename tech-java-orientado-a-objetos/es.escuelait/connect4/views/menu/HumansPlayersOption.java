package connect4.views.menu;

import connect4.models.Color;
import connect4.models.HumanPlayer;
import connect4.utils.menu.Option;
import connect4.views.Message;

class HumansPlayersOption extends Option{
    
    private PlayersManager playersManager;

    public HumansPlayersOption(PlayersManager playersManager) {
        super(Message.OPTION_HUMAN_HUMAN.toString());
        this.playersManager = playersManager;
    }

    @Override
    public void interact() {
        for(int i=0; i < this.playersManager.getNumberPlayers(); i++){
            this.playersManager.addPlayer(new HumanPlayer(Color.get(i), this.playersManager.getBoard()));
        }
        this.playersManager.reset();
    }
}
