
import Utils.Date;
import Utils.Console;


public class CancelModelOption extends ServiceContractOption{
    public CancelModelOption(ServiceContractModel model){
        super("Cancelar", model);
    }

    @Override
    public void interact(){
        Console.getInstance().writeln("Soy un cancel y pregunto la fecha?");
        this.cancel(new Date(2,2,2022));
    }

    public void cancel(Date date) {
		model.intervals[date.daysElapsedYear()] = null;
	}
}
