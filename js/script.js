Vue.config.devtools = true;

// plugin dayjs
dayjs.extend(dayjs_plugin_customParseFormat);

// locale dayjs
dayjs.locale("it");

const app = new Vue({
    el: "#root",
    data: {
        user: data.user,
        contacts: data.contacts,
        activeContact: -1,
        inputMessage: "",
        inputSearch: "",
        showDropdown: false,
        isWriting: false,
        showInput: false,
        inputFilterMessage: "",
    },
    methods: {
        // seleziona contatto attivo
        selectContact(i) {
            this.activeContact = i;
        },
        // aggiunge meassagio inviato e risposta automatica dopo 3 sec
        addMessage() {
            if (!this.inputMessage) return;
            this.generateMessage(this.inputMessage, "sent");

            this.inputMessage = "";
            this.isWriting = true;

            setTimeout(() => {
                this.generateMessage("Ok", "received");
                this.isWriting = false;
            }, 3000);
        },
        // genera la struttura dati dei messaggi
        generateMessage(message, status) {
            const currentChat = this.contacts[this.activeContact].messages;
            const newMessage = {
                date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                message: message,
                status: status,
            };
            currentChat.push(newMessage);
        },
        // visualizza ultimo accesso del contatto
        lastSeen() {
            const currentContactMessages = this.contacts[this.activeContact].messages;
            const messageReceived = currentContactMessages.filter((item) => {
                return item.status === "received";
            });
            if (messageReceived.length > 0) {
                return messageReceived[messageReceived.length - 1].date;
            }
        },
        // ricerca tra i contatti della lista
        findContacts() {
            this.contacts = this.contacts.map((contact) => {
                contact.visible = contact.name.toLowerCase().includes(this.inputSearch.toLowerCase());
                return contact;
            });
        },
        // mostra/nasconde il menu a tendina
        toggleDropdown(i) {
            this.showDropdown = !this.showDropdown;
        },
        // mostra/nasconde l'input di ricerca dei messaggi
        toggleInput() {
            this.showInput = !this.showInput;
        },
        // cancella il messaggio selezionato dalla chat
        deleteMessage(i) {
            this.contacts = this.contacts.map((contact, index) => {
                if (index === this.activeContact) {
                    contact.messages.splice(i, 1);
                }
                return contact;
            });
        },
        // 
        filterMessage(item) {
            if (!this.inputFilterMessage || this.inputFilterMessage.trim() === "") {
                return true;
            }
            const currentItem = item.toLowerCase();
            return currentItem.includes(this.inputFilterMessage.toLowerCase()) ? true : false;
        },
    },
});