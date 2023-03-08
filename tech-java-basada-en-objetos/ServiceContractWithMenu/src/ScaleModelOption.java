import Utils.Date;

public class ScaleModelOption extends ServiceContractOption {
    
    public ScaleModelOption(ServiceContractModel model){
        super("Escalar", model);
    }

    public void interact(){
        model.enlarge(new Date(3,3,3), 5.5);
    }
}
