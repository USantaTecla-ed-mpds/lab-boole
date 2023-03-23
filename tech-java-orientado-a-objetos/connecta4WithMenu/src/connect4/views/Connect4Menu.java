package connect4.views;

import connect4.Connect4;
import connect4.utils.Message;
import connect4.utils.menu.IterativeMenu;

public class Connect4Menu extends IterativeMenu {

    private Connect4 connect4;

    public Connect4Menu(Connect4 connect4) {
        super(Message.GAME_TITLE.toString());
        this.connect4 = connect4;
    }

    protected void addOptions() {
        this.add(new PlayWithHumanOption(this.connect4));
        // this.add(new ShiftModelOption(this.serviceContract));
        // this.add(new CancelModelOption(this.serviceContract));
        // this.add(new CostModelOption(this.serviceContract));
        // this.add(new ReportModelOption(this.serviceContract));
    }

}