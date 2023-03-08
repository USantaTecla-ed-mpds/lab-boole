import Utils.Console;
import Utils.Interval;

public class CostModelOption extends ServiceContractOption{

    public CostModelOption(ServiceContractModel model){
        super(Message.OPTION_COST.toString(), model);
    }

    @Override
    public void interact(){
        Console.getInstance().writeln(Message.ANNUAL_COST.toString() + this.getCost());
    }

    public double getCost() {
		double cost = 0.0;
		for (Interval interval : model.intervals) {
			if (interval != null) {
				double presetHours = 0.0;
				Interval intersection = interval.intersection(model.PRESET_INTERVAL);
				if (intersection != null) {
					presetHours = intersection.length();
					cost += presetHours * model.PRESET_COST_PER_HOUR;
				}
				cost += (interval.length() - presetHours)
						* model.EXTRAORDINARY_COST_PER_HOUR;
			}
		}
		return cost;
	}
}
