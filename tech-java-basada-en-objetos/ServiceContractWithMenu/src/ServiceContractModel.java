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

	public void enlarge(Date date, double scale) {
		this.intervals[date.daysElapsedYear()].scale(scale);
	}

	public void shift(Date date, double shiftment) {
		this.intervals[date.daysElapsedYear()].shift(shiftment);
	}

	public void writeln() {
		Console.getInstance().writeln("Contrato de limpieza: " + name + "-" + year);
		Date date = new Date(1, 1, year);
		for (int i = 0; i < intervals.length; i++) {
			Console.getInstance().write("(" + (i + 1) + "º) " + date + " - ");
			if (intervals[i] == null) {
				Console.getInstance().writeln("Cancelado");
			} else {
				Console.getInstance().writeln(intervals[i].toString());
			}
			date = date.next();
		}
	}



}
