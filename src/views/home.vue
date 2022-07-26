
<template class=" home-banner">
    
      <div class="mx-2 v-container-fluid">
            <v-img
                class="mx-2"
                :src="banner"
                contain 
            ></v-img>
       </div>
   
</template>

<script>

import banner from '../assets/home-banner.jpg'

export default {
data: () => ({
    banner,
  })
}
</script>

<style>

.mx-2 {
    margin-right: 0px !important;
    margin-left: 0px !important;
}
</style>