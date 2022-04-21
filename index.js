const contactsoperations = require('./contacts');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeActions = async ({ action, id, name,email,phone }) => {
    switch (action) {
        case 'list':
            const contacts = await contactsoperations.listContacts();
            console.log(contacts);
            break;
        
        case 'get':
            const contact = await contactsoperations.getContactById(id);
            if (!contact) throw new Error(`There is no contact with id: ${id}`);
            console.log(contact);
            break;
        
        case 'remove':
            const delContact = await contactsoperations.removeContact(id);
            if (!delContact) throw new Error(`There is no contact with id: ${id}`);
            console.log(delContact);
            break;
        
        case 'add':
            const newContact = await contactsoperations.addContact(name,email,phone);
            console.log(newContact);
            break;
    
        default:
            console.log('Not found this action');
            break;
    }
}

const newData = {
    name: "Ivanov Lane",
    email: "ivanov.Cras@nonenimMauris.net",
    phone: "(46) 1255-8547"
}

invokeActions(argv)