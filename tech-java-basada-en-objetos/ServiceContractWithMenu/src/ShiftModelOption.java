
public class ShiftModelOption extends ServiceContractOption{

    public ShiftModelOption(ServiceContractModel model){
        super(Message.OPTION_SHIFT.toString(), model);
    }

    public void interact(){
        model.shift((int)model.readValue(Message.ASK_PER_DAY.toString()),
                    (int)model.readValue(Message.ASK_PER_MONTH.toString()),
                         model.readValue(Message.ASK_SHIFT.toString()));
    }
}
