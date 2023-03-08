import Utils.Console;


public class CancelModelOption extends ServiceContractOption{
    public CancelModelOption(ServiceContractModel model){
        super(Message.OPTION_CANCEL.toString(), model);
    }

    @Override
    public void interact(){
        model.cancel(Console.getInstance().readInt(Message.ASK_PER_DAY.toString()),
                     Console.getInstance().readInt(Message.ASK_PER_MONTH.toString()));
    }

}
