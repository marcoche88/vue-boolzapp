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
        selectContact(i) {
            this.activeContact = i;
        },
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
        generateMessage(message, status) {
            const currentChat = this.contacts[this.activeContact].messages;
            const newMessage = {
                date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                message: message,
                status: status,
            };
            currentChat.push(newMessage);
        },
        lastSeen() {
            const currentContactMessages = this.contacts[this.activeContact].messages;
            const messageReceived = currentContactMessages.filter((item) => {
                return item.status === "received";
            });
            if (messageReceived.length > 0) {
                return messageReceived[messageReceived.length - 1].date;
            }
        },
        findContacts() {
            this.contacts = this.contacts.map((contact) => {
                contact.visible = contact.name.toLowerCase().includes(this.inputSearch.toLowerCase());
                return contact;
            });
        },
        toggleDropdown(i) {
            this.showDropdown = !this.showDropdown;
        },
        toggleInput() {
            this.showInput = !this.showInput;
        },
        deleteMessage(i) {
            this.contacts = this.contacts.map((contact, index) => {
                if (index === this.activeContact && contact.messages.length > 1) {
                    contact.messages.splice(i, 1);
                }
                return contact;
            });
        },
        // findMessage() {

        // },
    },
});