<template>
    <div class='world'>
        world page
        <router-link to='cn'>CN</router-link>
        <router-link to='usa'>USA</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'world'
}
</script>

<style>

</style>