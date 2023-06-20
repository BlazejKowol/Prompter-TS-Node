const inquirer = require('inquirer');
const consola = require('consola');

enum Action {
    List = "list",
    Add = "add",
    Remove = "remove",
    Quit = "quit"
  }
  
  type InquirerAnswers = {
    action: Action
  }

  enum Variant {
    Success = "success",
    Err = "error",
    Info = "info"
  }

const startApp = () => {

  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers) => {
    console.log("Chosen action: " + answers.action);
    startApp();
    if (answers.action === "quit")
      return;
  });
}

class Message {
    private content: string;
    constructor(content: string ) {
        this.content = content;
    }

    show() {
        console.log('Latest status of content', this.content);
    }

    capitalize() {
        this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase();
    }

    toLowerCase() {
        this.content = this.content.toLowerCase();
    }

    toUpperCase() {
        this.content = this.content.toUpperCase();
    }

    static showColorized(variant: Variant, text: string) {
        consola[variant](text);
    }
}
startApp();