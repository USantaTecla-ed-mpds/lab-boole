class ServiceContractMenu extends IterativeMenu {

    private ServiceContractModel model;

    public ServiceContractMenu(ServiceContractModel model) {
        super(Message.TITLE.toString());
        this.model = model;
    }

    protected void addOptions() {
        this.add(new ScaleModelOption(this.model));
        this.add(new ShiftModelOption(this.model));
        this.add(new CancelModelOption(this.model));
        this.add(new CostModelOption(this.model));
        this.add(new ReportModelOption(this.model));
    }

}
