const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');
const contactsPath = path.join(__dirname, 'db','contacts.json');

// Getting all contacts from data
const listContacts=async()=> {
    const result = await fs.readFile(contactsPath);
    const contacts = JSON.parse(result);
    return contacts;
}

//Getting some contact by ID from list
const getContactById=async(contactId)=> {
    const result =await listContacts();
    const contact = result.find((item) => item.id === contactId);
    return contact; 
}

//Remove some contact by ID
const removeContact=async(contactId)=>{
    const result = await listContacts();
    const idx = result.findIndex(item => item.id === contactId);
    const contacts = result.filter((item) => item !== result[idx]);
    await fs.writeFile(contactsPath,JSON.stringify(contacts) )
    return result[idx];
}

//Add new contact
const addContact=async(name,email,phone)=>{
    const result = await listContacts();
    const newContact = { id: shortid.generate(),name,email,phone };
    result.push(newContact);
    await fs.writeFile(contactsPath,JSON.stringify(result) )
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}