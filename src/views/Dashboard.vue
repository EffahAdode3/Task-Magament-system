<template>
    <div>
        <component :is="SideBarAndNavVue"></component>
       <component :is="ContentDashboard"></component>
    </div>
</template>
<script>
import ContentDashboard from '../components/ContentDashboard.vue'
import SideBarAndNavVue from '../components/SideBarAndNav.vue'
export default{
    components:{
    
        ContentDashboard,
        SideBarAndNavVue,
    },
    data(){
        return{
            ContentDashboard,
           SideBarAndNavVue
        }
    }
}
</script>

<style lang="css" scoped>
</style>