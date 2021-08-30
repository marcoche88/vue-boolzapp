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
        activeNumber: 0,
        inputMessage: "",
        inputSearch: "",
    },
    methods: {
        selectContact(i) {
            this.activeNumber = i;
        },
        addMessage() {
            if (!this.inputMessage) return;
            this.generateMessage(this.inputMessage, "sent");

            this.inputMessage = "";
            setTimeout(() => {
                this.generateMessage("Ok", "received");
            }, 3000);
        },
        generateMessage(message, status) {
            const currentChat = this.contacts[this.activeNumber].messages;
            const newMessage = {
                date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                message: message,
                status: status,
            };
            currentChat.push(newMessage);
        },
        lastSeen() {
            const currentContactMessages = this.contacts[this.activeNumber].messages;
            const messageReceived = currentContactMessages.filter((item) => {
                return item.status === "received";
            });
            return messageReceived[messageReceived.length - 1].date;
        },
        findContacts() {
            this.contacts = this.contacts.map((contact) => {
                contact.visible = contact.name.toLowerCase().includes(this.inputSearch.toLowerCase());
                return contact;
            });
        },
    },
});