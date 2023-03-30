package connect4.views.menu;

import connect4.models.Color;
import connect4.utils.menu.Option;

class PcPlayersOption extends Option{

    private PlayersManager playersManager;

    public PcPlayersOption(PlayersManager playersManager) {
        super("Demo PC");
        this.playersManager = playersManager;
    }

    @Override
    public void interact() {

        for(int i=0; i < this.playersManager.getNumberPlayers(); i++){
            new SubMenuModoPc(Color.get(i), this.playersManager).interact();
        }
        this.playersManager.reset();
}
}