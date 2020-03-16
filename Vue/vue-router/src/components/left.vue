<template>
    <div class='left'>
        <p>left box</p>
        <child ref="childref" @hook:mounted='dosomething' :key="indexkey">
            我是插槽内容
        </child>
    </div>
</template>

<script>
import child from './child.vue'
export default {
    name: 'left',
    data() {
        return {
            indexkey: 0
        }
    },
    components: { child },
    methods: {
        dosomething() {
            console.log('child组件 mounted')
        }
    },
    mounted() {
        console.log(this.$refs.childref)
    }
}
</script>

<style lang="">
  
</style>