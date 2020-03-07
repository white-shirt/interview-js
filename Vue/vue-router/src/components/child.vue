<template>
    <div class='child'>
        <div v-for='(item, index) in items' :key='index'>
            <p>child component {{item.name}}</p>
            
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
    }
}
</script>

<style lang="">
    
</style>