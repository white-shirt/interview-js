<template>
    <div class='child'>
        <div v-for='(item, index) in items' :key='index'>
            <p>child component {{item.name}}</p>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'child',
    props: {
        items: {
            type: Array,
            default: () => {
                return [
                    {
                        name: '---1'
                    },
                    {
                        name: '---2'
                    }
                ]
            }
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        test() {

        }
    },
    mounted() {
        var _this = this;
        setInterval(function () {
            _this.$forceUpdate()
        }, 1000)
    }
}
</script>

<style lang="">
    
</style>