import Utils.Console;
import Utils.Date;
import Utils.Interval;

class ServiceContractModel {

	private String name;
	private final int year;
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
		this.intervals[new Date(day, month, year).daysElapsedYear()].scale(scale);
	}

	public void shift(int day, int month, double shiftment) {
		this.intervals[new Date(day, month, year).daysElapsedYear()].shift(shiftment);
	}

	public void cancel(int day, int month) {
		this.intervals[new Date(day, month, year).daysElapsedYear()] = null;
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



}
