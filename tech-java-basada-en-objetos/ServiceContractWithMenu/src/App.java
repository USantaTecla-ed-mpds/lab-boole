import Utils.Console;

public class App {
    public static void main(String[] args) throws Exception {
        new ServiceContractMenu(new ServiceContractModel("EscuaelaIT", 
            Console.getInstance().readInt("Ingrese el año: "))).interact();
    }
}