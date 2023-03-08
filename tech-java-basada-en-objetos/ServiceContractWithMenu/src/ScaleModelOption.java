import Utils.Console;

public class ScaleModelOption extends ServiceContractOption {
    
    public ScaleModelOption(ServiceContractModel model){
        super(Message.OPTION_SCALE.toString(), model);
    }

    public void interact(){
        model.enlarge(Console.getInstance().readInt(Message.ASK_PER_DAY.toString()),
                      Console.getInstance().readInt(Message.ASK_PER_MONTH.toString()),
                      Console.getInstance().readDouble(Message.ASK_SCALE.toString()));
    }
}
