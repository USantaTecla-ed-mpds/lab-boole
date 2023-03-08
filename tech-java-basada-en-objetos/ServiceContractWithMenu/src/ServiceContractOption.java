abstract class ServiceContractOption extends Option {

    protected ServiceContractModel model;

    public ServiceContractOption(String string, ServiceContractModel model) {
        super(string);
        this.model = model;
    }

}
