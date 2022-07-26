<template>
<h1>About Us</h1>
<p class="inner-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    <p class="inner-p">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
        architecto beatae vitae dicta sunt explicabo.</p>
        <p class="inner-p">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
<div class="mx-2 v-container-fluid">
            <v-img
                class="mx-2"
                :src="banner"
                contain 
            ></v-img>
       </div>


</template>

<script>

import banner from '../assets/about-banner.jpg'

export default {
data: () => ({
    banner,
  })
}
</script>

<style>

p.inner-p{
    margin: 25px 25px;
    line-height: 1.8;
}

</style>