package connect4.views.menu;

import connect4.models.Color;
import connect4.models.HumanPlayer;
import connect4.utils.menu.Option;
import connect4.views.Message;

class HumanPcPlayersOption extends Option{
    private PlayersManager playersManager;

    public HumanPcPlayersOption(PlayersManager playersManager) {
        super(Message.OPTION_HUMAN_PC.toString());
        this.playersManager = playersManager;
    }

    @Override
    public void interact() {

        for(int i=0; i < this.playersManager.getNumberPlayers(); i++){
            if(i==0){
                this.playersManager.addPlayer(new HumanPlayer(Color.get(i), this.playersManager.getBoard()));
            }else{
                new SubMenuModoPc(Color.get(i), this.playersManager).interact();
            }
        }
        this.playersManager.reset();
    }
}