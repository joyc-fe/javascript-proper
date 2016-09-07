



Vue.component('vue-switch', {
    template: __inline('./vue-switch.html'),
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            twoWay: true
        },
        checked: {
            twoWay: false
        },
        unchecked: {
            twoWay: false
        }
    },
    ready: function() {}
});
