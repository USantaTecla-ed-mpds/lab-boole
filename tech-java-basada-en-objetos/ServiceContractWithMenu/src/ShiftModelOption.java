import Utils.Console;

public class ShiftModelOption extends ServiceContractOption{

    public ShiftModelOption(ServiceContractModel model){
        super(Message.OPTION_SHIFT.toString(), model);
    }

    public void interact(){
        model.shift(Console.getInstance().readInt(Message.ASK_PER_DAY.toString()),
                    Console.getInstance().readInt(Message.ASK_PER_MONTH.toString()),
                    Console.getInstance().readDouble(Message.ASK_SCALE.toString()));
    }
}
