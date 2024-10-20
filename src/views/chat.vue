<template>
  <div>
   <component :is="SideBarAndNavVue"></component>
     <component :is="chat"></component>
  </div>
</template>
<script>

import SideBarAndNavVue from '../components/SideBarAndNav.vue'
import chat from '../components/chat.vue'
export default{
  components:{
  
    chat,
      SideBarAndNavVue,
  },
  data(){
      return{
        chat,
         SideBarAndNavVue
      }
  }
}
</script>

<style lang="css" scoped>
</style>