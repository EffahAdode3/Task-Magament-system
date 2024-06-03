<template>
    <div>
     <component :is="SideBarAndNavVue"></component>
       <component :is="Content"></component>
    </div>
</template>
<script>
import Content from '../components/Content.vue'
import SideBarAndNavVue from '../components/SideBarAndNav.vue'
export default{
    components:{
    
        Content,
        SideBarAndNavVue,
    },
    data(){
        return{
           Content,
           SideBarAndNavVue
        }
    }
}
</script>

<style lang="css" scoped>
</style>