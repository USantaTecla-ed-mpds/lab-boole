import utils.Console;

public class CostModelOption extends ServiceContractOption{

    public CostModelOption(ServiceContractModel model){
        super(Message.OPTION_COST.toString(), model);
    }

    public void interact(){
        Console.getInstance().writeln(Message.ANNUAL_COST.toString() + model.getCost());
    }

}
