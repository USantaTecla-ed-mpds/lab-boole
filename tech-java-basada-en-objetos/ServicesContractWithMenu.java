import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import utils.Console;

class Date {

	private int day;
	private int month;
	private int year;;
	public final int DAYS_PER_YEAR = 360;
	public final int DAYS_PER_MONTH = 30;
	public final int MONTHS_PER_YEAR = 12;

	public Date(int day, int month, int year) {
		this.day = day;
		this.month = month;
		this.year = year;
	}

	public Date(Date date) {
		this(date.day, date.month, date.year);
	}

	public Date() {
		this(1, 1, 1900);
	}

	public static String getDateDMA(){
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDateTime now = LocalDateTime.now();
		return dtf.format(now);
	  }

	public Date clone() {
		return new Date(this);
	}

	public boolean equals(Date date) {
		return this.day == date.day
				&& this.month == date.month
				&& this.year == date.year;
	}

	public boolean after(Date date) {
		if (this.year == date.year) {
			if (this.month == date.month) {
				return this.day > date.day;
			}
			return this.month > date.month;
		}
		return this.year > date.year;
	}

	public boolean before(Date date) {
		return !this.equals(date) && date.after(this);
	}

	public Date next() {
		if (day < this.DAYS_PER_MONTH) {
			return new Date(day + 1, month, year);
		}
		if (month != this.MONTHS_PER_YEAR) {
			return new Date(1, month + 1, year);
		}
		return new Date(1, 1, year + 1);
	}

	public Date next(int days) {
		Date date = this.clone();
		for (int i = 0; i < days; i++) {
			date = date.next();
		}
		return date;
	}

	public int daysElapsedYear() {
		return (this.day-1) + (this.month - 1) * this.DAYS_PER_MONTH;
	}

	public int getDay() {
		return this.day;
	}

	public int getMonth() {
		return this.month;
	}

	public int getYear() {
		return this.year;
	}

	public String toString() {
		return this.day + "/" + this.month + "/" + this.year;
	}

}

class Interval {

	private double min;
	private double max;

	public Interval(double min, double max) {
		this.min = min;
		this.max = max;
	}

	public Interval(double max) {
		this(0, max);
	}

	public Interval() {
		this(0);
	}

	public Interval clone() {
		return new Interval(this);
	}

	private Interval(Interval interval) {
		this(interval.min, interval.max);
	}

	public double length() {
		return this.max - this.min;
	}

	public double middlePoint() {
		return (this.min + this.max) / 2;
	}

	public void scale(double scale) {
		double newMiddelPoint = this.middlePoint();
		double newLength = this.length() * scale;
		this.min = newMiddelPoint - newLength / 2;
		this.max = newMiddelPoint + newLength / 2;
	}

	public Interval scaled(double scale) {
		Interval scaled = this.clone();
		scaled.scale(scale);
		return scaled;
	}

	public Interval opposite() {
		return new Interval(-this.max, -this.min);
	}

	public boolean includes(double point) {
		return this.min <= point && point <= this.max;
	}

	public boolean includes(Interval interval) {
		return this.includes(interval.min)
				&& this.includes(interval.max);
	}

	public boolean isIntersected(Interval interval) {
		return this.includes(interval.min)
				|| this.includes(interval.max)
				|| interval.includes(this);
	}

	public Interval intersection(Interval interval) {
		Interval intersection = this.clone();
		if (interval.min > this.min) {
			intersection.min = interval.min;
		}
		if (interval.max < this.max) {
			intersection.max = interval.max;
		}
		return intersection;
	}

	public Interval union(Interval interval) {
		Interval union = this.clone();
		if (interval.min < this.min) {
			union.min = interval.min;
		}
		if (interval.max > this.max) {
			union.max = interval.max;
		}
		return union;
	}

	public Interval shifted(float shiftment) {
		return new Interval(this.min + shiftment, this.max + shiftment);
	}

	public void shift(double cantidad) {
		this.min += cantidad;
		this.max += cantidad;
	}

	public Interval[] split(int times) {
		Interval[] intervals = new Interval[times];
		final double length = this.length() / times;
		double origin = this.min;
		for (int i = 0; i < intervals.length; i++) {
			intervals[i] = new Interval(origin, origin + length);
			origin += length;
		}
		return intervals;
	}

	public String toString() {
		return "[" + this.min + ", " + this.max + "]";
	}

}

class ServicesContract {

	private String name;
	private final int year;
	private Interval[] intervals;
	private final Interval PRESET_INTERVAL = new Interval(8.0, 12.0);
	private final double PRESET_COST_PER_HOUR = 70.0;
	private final double EXTRAORDINARY_COST_PER_HOUR = 90.0;

	public ServicesContract(String name, int year) {
		this.name = name;
		this.year = year;
		intervals = new Interval[new Date(1, 1, year).DAYS_PER_YEAR];
		for (int i = 0; i < intervals.length; i++) {
			intervals[i] = PRESET_INTERVAL.clone();
		}
	}

	public void cancel(Date date) {
		intervals[date.daysElapsedYear()] = null;
	}

	public void enlarge(Date date, double scale) {
		intervals[date.daysElapsedYear()].scale(scale);
	}

	public void shift(Date date, double shiftment) {
		intervals[date.daysElapsedYear()].shift(shiftment);
	}

	public Interval[] getIntervals() {
		return intervals;
	}

	public int getYear(){
		return this.year;
	}

	public String getName(){
		return this.name;
	}

	public double getCost() {
		double cost = 0.0;
		for (Interval interval : this.intervals) {
			if (interval != null) {
				double presetHours = 0.0;
				Interval intersection = interval.intersection(PRESET_INTERVAL);
				if (intersection != null) {
					presetHours = intersection.length();
					cost += presetHours * PRESET_COST_PER_HOUR;
				}
				cost += (interval.length() - presetHours)
						* EXTRAORDINARY_COST_PER_HOUR;
			}
		}
		return cost;
	}
}

enum Message{
	TITLE("Contrato de limpieza: "),
	ANNUAL_COST("Coste anual del contrato: "),
	ANNUAL_REPORT("Informe anual"),
	CANCEL("Se cancelo el "),
	NULL("Anulado"),
	ASK_SCALE("Escala: "),
	ASK_SHIFT("Cambio: "),
	ASK_PER_DAY("Ingrese el dia: "),
	ASK_PER_MONTH("Ingrese el mes: "),
	WRONG_DATA("Debe ingresar un valor correcto."),
	CHOOSE_OPTION("Seleccione una opcion: ");

	private String message;

	Message(String message){
		this.message = message;
	}

	@Override
	public String toString(){
		return this.message;
	}
}

enum Option{
	OPTION_1("Escalar"),
	OPTION_2("Mover"),
	OPTION_3("Cancelar"),
	OPTION_4("Costo Total"),
	OPTION_5("Informe"),
	OPTION_6("Salir");	

	private String option;

	Option(String option){
		this.option = option;
	}

	@Override
	public String toString(){
		return this.option;
	}
}

class Menu{
		private Console console = new Console();
		private ServicesContract servicesContract;

		Menu(){
			this.servicesContract = createNewContract();
		}

		public void interact(){

			int selectOption;
			do{
				showOptions();
				selectOption = console.readInt(Message.CHOOSE_OPTION.toString());
				
				switch(selectOption){
					case 1:{
						servicesContract.enlarge(
							readDate(Message.ASK_PER_DAY, Message.ASK_PER_MONTH), 	
							readValue(Message.ASK_SCALE));
						break;
					}
					case 2:{
						servicesContract.shift(
							readDate(Message.ASK_PER_DAY, Message.ASK_PER_MONTH), 	
							readValue(Message.ASK_SHIFT));
						break;
					}
					case 3:{
						servicesContract.cancel(readDate(Message.ASK_PER_DAY, Message.ASK_PER_MONTH));
						break;
					}
					case 4:{
						console.writeln(Message.ANNUAL_COST.toString() + servicesContract.getCost());
						console.writeln();
						break;
					}
					case 5:{
						Interval[] intervals = servicesContract.getIntervals();
						console.writeln(Message.TITLE + 
										servicesContract.getName() + 
										"-" + 
										servicesContract.getYear());

						Date date = new Date(1, 1, servicesContract.getYear());

						for (int i = 0; i < intervals.length; i++) {
							console.write("(" + (i + 1) + ") " + date + " - ");
							if (intervals[i] == null) {
								console.writeln(Message.NULL.toString());
							} else {
								console.writeln(intervals[i].toString());
							}
							date = date.next();
						}
						break;
					}
				}
			}while(selectOption!=Option.values().length);

	}

	private double readValue(Message message){
		return console.readDouble(message.toString());
	}

	private Date readDate(Message perDay, Message perMonth){
		int day;
		int month;
		boolean error;
		Date date = new Date();
		Interval daysInterval = new Interval(date.DAYS_PER_MONTH);
		Interval monthsInterval = new Interval(date.MONTHS_PER_YEAR);

		do{
			error = false;
			day = console.readInt(perDay.toString());
			month = console.readInt(perMonth.toString());
			if(!daysInterval.includes(day) || !monthsInterval.includes(month)){
				error = true;
				console.writeln(Message.WRONG_DATA.toString());
			}
		}while(error);

		return new Date(day, month, servicesContract.getYear());
	}

	private void showOptions(){
		for(Option options : Option.values()){
			new Console().writeln(options.ordinal()+1 + ") " + options.toString());
		}
	}

	private ServicesContract createNewContract(){

		String name = console.readString("Nombre de la empresa: ");
		int year = console.readInt("Ano: ");
		console.writeln();
		return new ServicesContract(name, year);
	}

	public static void main(String[] args) {
		new Menu().interact();
	}
}

