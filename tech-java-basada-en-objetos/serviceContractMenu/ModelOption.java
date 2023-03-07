package es.usantatecla.aX_menu.a4_extends.a1_modelMenu;

abstract class ModelOption extends Option {

    protected Model model;

    public ModelOption(String string, Model model) {
        super(string);
        this.model = model;
    }

}
