class QuitOption extends Option {

    private boolean executed;

    public QuitOption() {
        super(Message.OPTION_QUIT.toString());
        this.executed = false;
    }

    @Override
    public void interact() {
        this.executed = true;
    }

    protected boolean isExecuted() {
        return this.executed;
    }

}
