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
    },
    methods: {
        selectContact(i) {
            this.activeNumber = i;
        },
        addMessage() {
            const currentChat = this.contacts[this.activeNumber].messages;
            currentChat.push({
                date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                message: this.inputMessage,
                status: 'sent',
            });
            this.inputMessage = "";
            setTimeout(this.addAnswer, 1000);
        },
        addAnswer() {
            const currentChat = this.contacts[this.activeNumber].messages;
            currentChat.push({
                date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                message: "Ok",
                status: 'received',
            });
        },
    },
});