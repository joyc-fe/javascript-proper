


Vue.component('vue-switch', {
    template: '<div class="vue-switch-view"> <input type="checkbox" class="vue-switch" :true-value="checked" :false-value="unchecked" v-model="value" disabled="{{disabled}}"> </div> ',
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
