import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import utils.Console;

class Date {

	private int day;
  private int month;
  private int year;;
  public final int DAYS_PER_YEAR = 360;
	private final int DAYS_PER_MONTH = 30;
	private final int MONTHS_PER_YEAR = 12;

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
    return !this.equals(date) && !date.after(this);
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
    return (this.day - 1) + (this.month - 1) * this.DAYS_PER_MONTH;
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

enum MonthsData {

  JANUARY(31, new String[]{"January", "Enero"}),
  FEBRUARY(28, new String[]{"February", "Febrero"}),
  MARCH(31, new String[]{"March", "Marzo"}),
  APRIL(30, new String[]{"April", "Abril"}),
  MAY(31, new String[]{"May", "Mayo"}),
  JUNE(30, new String[]{"June", "Junio"}),
  JULY(31, new String[]{"July", "Julio"}),
  AUGUST(31, new String[]{"August", "Agosto"}),
  SEPTEMBER(30, new String[]{"September", "Septiembre"}),
  OCTOBER(31, new String[]{"October", "Octubre"}),
  NOVEMBER(30, new String[]{"November", "Noviembre"}),
  DECEMBER(31, new String[]{"December", "Diciembre"});

  private int days;
  private String[] names;

  private MonthsData(int days, String[] names){
    this.days = days;
    this.names = names;
  }

  public void show(){
    new Console().writeln(this.names[1] + " tiene " + this.days + " dias.");
  }

}

class App {

public static void main(String[] args) {
    Console console = new Console();
    int day = console.readInt("Dame el día:");
    int month = console.readInt("Dame el mes: ");
    int year = console.readInt("Dame el año: ");
    Date date = new Date(day, month, year);

    final Date[] firstSeasons = new Date[] {
        new Date(21, 3, year),
        new Date(21, 6, year),
        new Date(21, 9, year),
        new Date(21, 12, year) };
    int season = 3;
    for (int i = 0; i < firstSeasons.length; i++) {
      if (firstSeasons[i].before(date) || firstSeasons[i].equals(date)) {
        season = i;
      }
    }
    int position = 0;
    for (int i = 0; i < 12; i++) {
      if (new Date(21, i + 1, year).before(date)) {
        position++;
      }
    }
    console.writeln("El " + date + " cae a "
        + new String[] { "primeros", "mediados", "ultimos" }[position % 3] + " "
        + new String[] { "invierno", "verano" , "otoño", "primavera"}[season] + ".");
    
        for(MonthsData dato : MonthsData.values()){
          if(dato.ordinal()+1== month){
            new Console().writeln(dato.name());
            dato.show();
          }
        }

        for(MonthsData dato : MonthsData.values()){
          dato.show();
        }

        console.writeln(Date.getDateDMA());
  }
}