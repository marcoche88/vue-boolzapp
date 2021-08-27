Vue.config.devtools = true;

const app = new Vue({
    el: "#root",
    data: {
        user: data.user,
        contacts: data.contacts,
        activeNumber: 0,
    },
    methods: {
        selectUser(i) {
            this.activeNumber = i;
        },
        isActive(i) {
            this.contacts = this.contacts.map((item, index) => {
                item.visible = (i === index);
                return item;
            });
        },
    },
});