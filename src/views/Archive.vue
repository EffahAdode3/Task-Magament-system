<template>
    <div>
     <component :is="SideBarAndNavVue"></component>
       <component :is="ContentOFArchive"></component>
    </div>
</template>
<script>
import ContentOFArchive from '../components/ContentOFArchive.vue'
import SideBarAndNavVue from '../components/SideBarAndNav.vue'
export default{
    components:{
    
        ContentOFArchive,
        SideBarAndNavVue,
    },
    data(){
        return{
            ContentOFArchive,
           SideBarAndNavVue
        }
    }
}
</script>

<style lang="css" scoped>
</style>