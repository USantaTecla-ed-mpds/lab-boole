const { Console } = require("./console");

class Dictio {

    key;
    txt;

    static msg = {
        QUIT: `Salir`,
        ERROR: `Error!!!`,
        LIST: `Listar`,
        INVERSE_LIST: `Listar inverso`,
        ADD: `Añadir`,
        REMOVE: `Eliminar`,
        BASE_MENU: `Model Menu`,
        QUIT_MENU: `Model Quit Menu`,
        ITERA_MENU: `Model Iterative Menu`,
        DYNA_MENU: `Model Dynamic Menu`,
        ITERA_DYNA_MENU: `Model Iterative Dynamic Menu`,
        GIVE_STRING: `Dame una cadena de caracteres: `,
        LINE: `***`,
        DASH: `-`,
        ASK_OPTION: `Opción? [1-%a0]:`, // replace %a0, %a1... with args
    };

    constructor(key) {
        this.key = key;
    }

    static getTxt(key, ...args) {
        this.txt = Dictio.msg[key.toUpperCase()];

        if (!args.length) {
            return this.txt;
        }

        Dictio.replaceArgs(...args);
        return this.txt;
    }

    static replaceArgs(...args) {
        for (let i = 0; i < args.length; i++) {
            this.txt = this.txt.replace(`%a${[i]}`, args[i]);
        }
        return this.txt;
    }
}


// Type of Abstract menu OPTIONS (menu items)

class AbstractOption {

    #optionName;

    constructor(optionName) {
        this.#optionName = optionName;
    }

    interact() {};

    printOption(index) {
        Console.writeln(`${index}. ${this.getOptionName()}`);
    }

    getOptionName() {
        return this.#optionName;
    }
}

class QuitOption extends AbstractOption {

    #selected;

    constructor() {
        super(Dictio.getTxt('quit'));
        this.#selected = false;
    }

    interact() {
        this.#selected = true;
    }

    isSelected() {
        return this.#selected;
    }
}

class ClosedInterval {
    
    #min;
    #max;

    constructor(min, max) {
        this.#min = min;
        this.#max = max;
    }

    getMin() {
        return this.#min;
    }

    getMax() {
        return this.#max;
    }

    includes(value) {
        return this.getMin() <= value && value <= this.getMax();
    }
}


// Type of Abstract MENUS

class AbstractMenu {

    #title;
    #options;
    #choosedOption;

    constructor(title) {
        this.#title = title;
        this.#options = [];
    }

    init() {
        this.addOptions();
        this.createMenu();
    }

    addOptions() {};

    createMenu() {
        this.printMenu();
        this.#chooseOption();
        this.#execOption(this.#choosedOption);
    }

    printMenu() {
        this.#printMenuTitle();
        for (let i = 0; i < this.#options.length; i++) {
            this.#options[i].printOption(i + 1);
        }
    }

    #printMenuTitle() {
        let title = `\n${this.#title}\n`;
        for (let i = 0; i < this.#title.length; i++) {
            title += Dictio.getTxt('dash');
        }
        Console.writeln(title);
    }

    #chooseOption() {
        let answer;
        let error;
        do {
            answer = this.#ask(Dictio.getTxt('ask_option', this.#options.length)) - 1;
            error = !new ClosedInterval(0, this.#options.length - 1).includes(answer);
            if (error) {
                Console.writeln(Dictio.getTxt('error'));
            }
        } while (error);
        this.#choosedOption = answer;
    }

    #execOption(option) {
        this.#options[option].interact();
    }

    #ask(question){
        return Number.parseInt(Console.readNumber(question));
    }

    add(option) {
        this.#options.push(option);
    }

    clearOptions() {
        this.#options = [];
    }

    has(option) {
        return this.#options.includes(option);
    }
}

class AbstractQuitMenu extends AbstractMenu {

    #quitOption;

    constructor(title) {
        super(title);
        this.#quitOption = new QuitOption();
    }

    printMenu() {
        if (!this.has(this.#quitOption)) {
            this.add(this.#quitOption);
        }
        super.printMenu();
    }

    isSelectedQuitOption() {
        return this.#quitOption.isSelected();
    }
}

class AbstractIterativeMenu extends AbstractQuitMenu {

    constructor(title) {
        super(title);
    }

    init() {
        this.addOptions();
        do {
            this.createMenu();
        } while (!this.isSelectedQuitOption());
    }
}

class AbstractDynamicMenu extends AbstractIterativeMenu {

    constructor(title) {
        super(title);
    }

    init() {
        do {
            this.clearOptions();
            this.addOptions();
            this.createMenu();
        } while (!this.isSelectedQuitOption());
    }
}


// Data model for a given menu

class DataModel {

    #strings;

    constructor(array) {
        this.#strings = array;
    }

    addEntry(string) {
        this.#strings.push(string);
    }

    removeEntry(index) {
        this.#strings.splice(index, 1);
    }

    getEntry(index) {
        return this.#strings[index];
    }

    size() {
        return this.#strings.length;
    }
}


// Type of menu OPTIONS

class MenuOption extends AbstractOption {

    constructor(optionName) {
        super(optionName);
    }

    interact() { 
        Console.writeln();
    };
}

class ListOption extends MenuOption {

    #model;

    constructor (model) {
        super(Dictio.getTxt('list'), model);
        this.#model = model;
    }

    interact() {
        super.interact();
        for (let i = 0; i < this.#model.size(); i++) {
            Console.writeln(`${i+1}. ${this.#model.getEntry(i)}`);
        }
        Console.writeln();
    }
}

class InverseListOption extends MenuOption {

    #model;

    constructor(model) {
        super(Dictio.getTxt('inverse_list'), model);
        this.#model = model;
    }

    interact() {
        super.interact();
        for (let i = this.#model.size() - 1; i >= 0; i--) {
            Console.writeln(`${i+1}. ${this.#model.getEntry(i)}`);
        }
        Console.writeln();
    }
}

class AddOption extends MenuOption {

    #model;

    constructor(model) {
        super(Dictio.getTxt('add'), model);
        this.#model = model;
    }

    interact() {
        super.interact();
        let string;
        do {
            string = Console.readString(Dictio.getTxt('give_string'));
        } while (string.trim() === ''); 
        this.#model.addEntry(string.trim());
    }
}

class RemoveOptions extends MenuOption {

    #model;

    constructor(model) {
        super(Dictio.getTxt('remove'), model);
        this.#model = model;
    }

    interact() {
        super.interact();
        new DynamicMenu(this.#model).init();
    }
}

class RemoveOption extends MenuOption {

    #model;
    #index;

    constructor(model, index) {
        super(Dictio.getTxt('remove'), model);
        this.#model = model;
        this.#index = index;
    }

    getOptionName() {
        return `${super.getOptionName()}: ${this.#model.getEntry(this.#index)}`;
    }

    interact() {
        super.interact();
        this.#model.removeEntry(this.#index);
    }
}


// Type of MENUS

class Menu extends AbstractMenu {

    #model;

    constructor(model) {
        super(Dictio.getTxt('base_menu'));
        this.#model = model;
    }

    addOptions() {
        this.add(new ListOption(this.#model));
        this.add(new InverseListOption(this.#model));
    }
}

class QuitMenu extends AbstractQuitMenu {

    #model;

    constructor(model) {
        super(Dictio.getTxt('quit_menu'));
        this.#model = model;
    }

    addOptions() {
        this.add(new ListOption(this.#model));
        this.add(new InverseListOption(this.#model));
    }
}

class IterativeMenu extends AbstractIterativeMenu {

    #model;

    constructor(model) {
        super(Dictio.getTxt('itera_menu'));
        this.#model = model;
    }

    addOptions() {
        this.add(new ListOption(this.#model));
        this.add(new InverseListOption(this.#model));
    }
}

class DynamicMenu extends AbstractDynamicMenu {

    #model;

    constructor(model) {
        super(Dictio.getTxt('dyna_menu'));
        this.#model = model;
    }

    addOptions() {
        for (let i = 0; i < this.#model.size(); i++) {
            this.add(new RemoveOption(this.#model, i));
        }
    }
}

class IterativeDynamicMenu extends AbstractIterativeMenu {

    #model;

    constructor(model) {
        super(Dictio.getTxt('itera_dyna_menu'));
        this.#model = model;
    }

    addOptions() {
        this.add(new ListOption(this.#model));
        this.add(new InverseListOption(this.#model));
        this.add(new AddOption(this.#model));
        this.add(new RemoveOptions(this.#model));
    }
}



// Run App

class App {

    #model;

    constructor(array) {
        this.#model = new DataModel(array);
        this.run();
    }

    run() {
        Console.writeln(Dictio.getTxt('line'));
        new Menu(this.#model).init();

        Console.writeln(Dictio.getTxt('line'));
        new QuitMenu(this.#model).init();

        Console.writeln(Dictio.getTxt('line'));
        new IterativeMenu(this.#model).init();

        Console.writeln(Dictio.getTxt('line'));
        new IterativeDynamicMenu(this.#model).init();
    }
}


new App(['Ana', 'Bea', 'Cio']);