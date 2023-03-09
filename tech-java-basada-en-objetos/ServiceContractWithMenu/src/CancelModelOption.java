
public class CancelModelOption extends ServiceContractOption{
    public CancelModelOption(ServiceContractModel model){
        super(Message.OPTION_CANCEL.toString(), model);
    }

    public void interact(){
        model.cancel((int)model.readValue(Message.ASK_PER_DAY.toString()),
                     (int)model.readValue(Message.ASK_PER_MONTH.toString()));
    }

}
