public enum Message {

        TITLE("Contrato de limpieza: "),
        ANNUAL_COST("Coste anual del contrato: "),
        ANNUAL_REPORT("Informe anual"),
        CANCEL("Cancelado"),
        NULL("Anulado"),
        ASK_SCALE("Escala: "),
        ASK_SHIFT("Cambio: "),
        ASK_PER_DAY("Ingrese el dia: "),
        ASK_PER_MONTH("Ingrese el mes: "),
        ASK_PER_YEAR("Ingrese el año: "),
        WRONG_DATA("Debe ingresar un valor correcto."),
        OPTION_SCALE("Escalar"),
        OPTION_SHIFT("Mover"),
        OPTION_CANCEL("Cancelar"),
        OPTION_COST("Mostrar Costo"),
        OPTION_REPORT("Informe"),
        OPTION_QUIT("Salir"),
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

