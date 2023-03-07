package es.usantatecla.aX_menu.a4_extends.a1_modelMenu;

class Model {

    private String[] strings;
    private static final int MAX = 100;
    private int size;

    public Model() {
        this.strings = new String[Model.MAX];
        this.size = 0;
        this.add("Ana");
        this.add("Beatriz");
        this.add("Carmen");
    }

    public void add(String string) {
        assert this.size < Model.MAX;

        this.strings[this.size] = string;
        this.size++;
    }

    public void remove(int index) {
        assert 0 <= index && index < this.size;

        for(int i = index; i < this.size; i++){
            this.strings[i] = this.strings[i+1];
        }
        this.size--;
    }

    public String get(int index) {
        assert 0 <= index && index < this.size;

        return this.strings[index];
    }

    public int size() {
        return this.size;
    }

}
