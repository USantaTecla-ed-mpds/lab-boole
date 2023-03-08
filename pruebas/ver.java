package pruebas;
import utils.Console;

enum Mesagge{
	TITLE("Service Contracts"),
	COLOR_TEXT_WHITE("\033[37m"),
	COLOR_TEXT_GREEN("\033[32m");

	private String message;

	private Mesagge(String message){
		this.message = message;
	}

	public String toString(){
		return this.message;
	}
}

enum Enun {
    OBJECT_1(1),
    OBJECT_2(2),
    OBJECT_3(3);

    private int atributte;

    private Enun(int value){
        this.atributte = value;
    }

    public void method() {
        new Console().writeln(this.atributte);
    }
    
}

class EnunClient {

    public static void main(String[] args){
        Console console = new Console();
	
        Enun.OBJECT_1.method();
        for(Enun object : Enun.values()){
            console.writeln("name: " + object.name());
            console.writeln("ordinal: " + object.ordinal());
            object.method();
        }

        // Enun object = new Enun(0); ERROR
    }
}

public class ver {

    public static void main(String[] args) {
        new Console().writeln(Mesagge.COLOR_TEXT_GREEN + "Sistema " + Mesagge.COLOR_TEXT_WHITE + Mesagge.TITLE);
		System.out.println(Mesagge.TITLE);
		System.out.println(Mesagge.values().length);
    }
    
}