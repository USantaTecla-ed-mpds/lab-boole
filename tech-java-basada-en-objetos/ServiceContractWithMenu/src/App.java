import utils.Console;

public class App {
    public static void main(String[] args) throws Exception {
        new ServiceContractMenu(new ServiceContractModel(
            Console.getInstance().readString(Message.ASK_PER_NAME.toString()), 
            Console.getInstance().readInt(Message.ASK_PER_YEAR.toString()))).interact();
    }
}