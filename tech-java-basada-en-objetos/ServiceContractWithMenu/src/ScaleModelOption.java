
public class ScaleModelOption extends ServiceContractOption {
    
    public ScaleModelOption(ServiceContractModel model){
        super(Message.OPTION_SCALE.toString(), model);
    }

    public void interact(){
        model.shift((int)model.readValue(Message.ASK_PER_DAY.toString()),
                    (int)model.readValue(Message.ASK_PER_MONTH.toString()),
                         model.readValue(Message.ASK_SCALE.toString()));
    }
}
