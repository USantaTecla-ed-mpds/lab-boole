import connect4.utils.Message;
import connect4.utils.menu.IterativeMenu;

class Connect4Menu extends IterativeMenu {

    private Connect4 connect4;

    public Connect4Menu(Connect4 connect4) {
        super(Message.GAME_TITLE.toString());
        this.connect4 = connect4;
    }

    protected void addOptions() {
        // this.add(new ScaleModelOption(this.serviceContract));
        // this.add(new ShiftModelOption(this.serviceContract));
        // this.add(new CancelModelOption(this.serviceContract));
        // this.add(new CostModelOption(this.serviceContract));
        // this.add(new ReportModelOption(this.serviceContract));
    }

}