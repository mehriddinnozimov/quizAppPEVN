<template>
  <div class="container is-fullheight">
    <NavbarVue></NavbarVue>
    <router-view></router-view>
    <FooterVue></FooterVue>
  </div>
</template>

<script>

import useAuth from './composition/useAuth'
import NavbarVue from './components/Navbar'
import FooterVue from './components/Footer'
export default {
  name: 'App',
  components: {
    NavbarVue,
    FooterVue
  },
  setup(){ return { ...useAuth } }
}
</script>

<style>
@import '~bulma/css/bulma.css';
@import 'assets/styles/style.css';


.clickable {
  cursor: pointer;
}

.fixed {
  position: fixed;
  top:  0;
  z-index: 99;
  width: 100%;
  overflow: hidden;
}

.relative {
  position: relative;
}
</style>
