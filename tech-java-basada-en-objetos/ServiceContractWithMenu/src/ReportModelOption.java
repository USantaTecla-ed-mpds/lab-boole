

public class ReportModelOption extends ServiceContractOption{
    public ReportModelOption(ServiceContractModel model){
        super(Message.OPTION_REPORT.toString(), model);
    }

    public void interact(){
        model.writeln();
    }
}