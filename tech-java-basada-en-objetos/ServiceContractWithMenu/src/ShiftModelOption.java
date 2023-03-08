import Utils.Date;

public class ShiftModelOption extends ServiceContractOption{

    public ShiftModelOption(ServiceContractModel model){
        super("Mover", model);
    }

    public void interact(){
        model.shift(new Date(2,2,2), 3.2);;
    }
}
