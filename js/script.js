Vue.config.devtools = true;

const app = new Vue({
    el: "#root",
    data: {
        user: data.user,
        contacts: data.contacts,
        activeNumber: 0,
    },
    methods: {
        selectContact(i) {
            this.activeNumber = i;
        },
    },
});