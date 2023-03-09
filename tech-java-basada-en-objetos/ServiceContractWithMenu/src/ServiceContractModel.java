import utils.Console;
import utils.Date;
import utils.Interval;

class ServiceContractModel {

	private final String name;
	private final int year;
	private Date date = new Date();
	protected Interval[] intervals;
	protected final Interval PRESET_INTERVAL = new Interval(8.0, 12.0);
	protected final double PRESET_COST_PER_HOUR = 70.0;
	protected final double EXTRAORDINARY_COST_PER_HOUR = 90.0;

	public ServiceContractModel(String name, int year) {
		this.name = name;
		this.year = year;
		this.intervals = new Interval[new Date(1, 1, year).DAYS_PER_YEAR];
		for (int i = 0; i < intervals.length; i++) {
			this.intervals[i] = this.PRESET_INTERVAL.clone();
		}
	}

	public void enlarge(int day, int month, double scale) {
		assert date.isValidDay(day) && date.isValidMonth(month) && scale > 0;

		this.intervals[new Date(day, month, year).daysElapsedYear()].scale(scale);
	}

	public void shift(int day, int month, double shiftment) {
		assert date.isValidDay(day) && date.isValidMonth(month) && shiftment > 0;

		this.intervals[new Date(day, month, year).daysElapsedYear()].shift(shiftment);
	}

	public void cancel(int day, int month) {
		assert date.isValidDay(day) && date.isValidMonth(month);

		this.intervals[new Date(day, month, year).daysElapsedYear()] = null;
	}

	public double getCost() {
		double cost = 0.0;
		for (Interval interval : this.intervals) {
			if (interval != null) {
				double presetHours = 0.0;
				Interval intersection = interval.intersection(this.PRESET_INTERVAL);
				if (intersection != null) {
					presetHours = intersection.length();
					cost += presetHours * this.PRESET_COST_PER_HOUR;
				}
				cost += (interval.length() - presetHours)
						* this.EXTRAORDINARY_COST_PER_HOUR;
			}
		}
		return cost;
	}

	public void writeln() {
		Console.getInstance().writeln(Message.TITLE.toString() + name + " - " + year);
		Date date = new Date(1, 1, year);
		for (int i = 0; i < intervals.length; i++) {
			Console.getInstance().write("(" + (i + 1) + "º) " + date + " - ");
			if (intervals[i] == null) {
				Console.getInstance().writeln(Message.CANCEL.toString());
			} else {
				Console.getInstance().writeln(intervals[i].toString());
			}
			date = date.next();
		}
	}

	public double readValue(String message) {
		double value;
		boolean error;
		do{
			value = Console.getInstance().readDouble(message);
			
			if(message == Message.ASK_PER_DAY.toString()){
				error = !date.isValidDay(value);
			}else if (message == Message.ASK_PER_MONTH.toString()){
				error = !date.isValidMonth(value);
			}else{
				error = value < 0;
			}
			if(error){
				Console.getInstance().writeln(Message.WRONG_DATA.toString());
			}
		}while(error);
		return value;
	}

}
