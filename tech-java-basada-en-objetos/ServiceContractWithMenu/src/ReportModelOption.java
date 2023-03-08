

public class ReportModelOption extends ServiceContractOption{
    public ReportModelOption(ServiceContractModel model){
        super("Reporte", model);
    }

    public void interact(){
        model.writeln();
    }
}