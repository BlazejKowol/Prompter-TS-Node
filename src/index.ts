const inquirer = require('inquirer');
const consola = require('consola');
const shortid = require('shortid');

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
      switch (answers.action) {
        case Action.List:
          users.showAll();
          break;
        case Action.Add:
          const user = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter name',
          }, {
            name: 'age',
            type: 'number',
            message: 'Enter age',
          }]);
          users.add(user);
          break;
        case Action.Remove:
          const name = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter name',
          }]);
          users.remove(name.name);
          break;
        case Action.Quit:
          Message.showColorized(Variant.Info, "Bye bye!");
          return;
      }
  
      startApp();
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

type User = {
    name: string;
    age: number;
}

class usersData {
    data: User[] = [];
    
    showAll() {
        if(this.data && this.data.length > 0) { 
        Message.showColorized(Variant.Info, 'Users Data'); 
        console.table(this.data)
        } else {
            console.log('No Data');
        }
    }

    add(user: User): void {
        if(user.age > 0 && user.name.length > 0) {
            this.data.push(user);
        Message.showColorized(Variant.Success, 'User has been successfully added!');
        } else {
        Message.showColorized(Variant.Err, 'Wrong data!');
        }
    }

    remove(name: string): void {
        const user: number = this.data.findIndex(user => user.name === name);
        if(user) {
            const filteredUsers = this.data.splice(user, user);
            Message.showColorized(Variant.Success, 'User has been deleted');
        } else {
            Message.showColorized(Variant.Err, 'User not found!');
        }
    }
}

const users = new usersData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(Variant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");


startApp();