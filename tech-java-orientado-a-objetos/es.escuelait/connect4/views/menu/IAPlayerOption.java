package connect4.views.menu;

import connect4.models.Color;
import connect4.models.MinMaxPlayer;
import connect4.utils.menu.Option;
import connect4.views.Message;

class IAPlayerOption extends Option{
    private PlayersManager playersBuilder;
    private Color color;

    public IAPlayerOption(Color color, PlayersManager playersBuilder) {
        super(Message.IA_PLAYER.toString());
        this.playersBuilder = playersBuilder;
        this.color = color;
    }

    @Override
    public void interact() {
        this.playersBuilder.addPlayer(new MinMaxPlayer(this.color, this.playersBuilder.getBoard()));
    }
}