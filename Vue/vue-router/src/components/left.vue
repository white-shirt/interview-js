<template>
    <div class='left'>
        <p>left box</p>
        <child @hook:mounted='dosomething'></child>
    </div>
</template>

<script>
import child from './child.vue'
export default {
    name: 'left',
    components: { child },
    methods: {
        dosomething() {
            console.log('child组件 mounted')
        }
    }
}
</script>

<style lang="">
  
</style>