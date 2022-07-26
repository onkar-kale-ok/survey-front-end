<template>
    <v-app>
      <v-app-bar >
            <v-img
                class="mx-2"
                :src="logo"
                max-height="40"
                max-width="40"
                contain
            ></v-img>
            <v-app-bar-title  >My Surveys</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn v-if="$route.name == 'home' || $route.name == 'login' || $route.name == 'register' || $route.name == 'about'"
                    variant="text"
                    @click="goHome" >
                  Home
                </v-btn>
                <v-btn v-if="$route.name == 'home' || $route.name == 'login' || $route.name == 'register' || $route.name == 'about'"
                    variant="text"
                    @click="goAbout"
                    >
                  About Us
                </v-btn>
                <v-btn v-if="$route.name == 'add' || $route.name == 'tutorials'"
                    variant="text"
                    @click="goList"
                    >
                  List
                </v-btn>
                <v-btn v-if="$route.name == 'add' || $route.name == 'tutorials'"
                    variant="text"
                    @click="goAdd"
                    >
                  Add Survey
                </v-btn>
                <v-btn v-if="$route.name == 'home' || $route.name == 'login' || $route.name == 'register' || $route.name == 'about'"
                    variant="text"
                    @click="goLogin"
                    >
                  Login
                </v-btn>
                <v-btn v-if="$route.name == 'home' || $route.name == 'login' || $route.name == 'register' || $route.name == 'about'"
                    variant="text"
                    @click="goRegister"
                    >
                  Register
                </v-btn>
                <v-btn v-if="$route.name == 'add' || $route.name == 'tutorials'"
                    variant="text"
                    @click="logouttab"
                    >
                  LogOut
                </v-btn>
            </v-toolbar-items>
      </v-app-bar>
      <v-main >
        <v-container>
          <div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
          <router-view @authenticated="setAuthenticated" />
        </v-container>
      </v-main>

      <div class="footer">
           <div class="container">
             <p>© Copyright 2022 My Surveys. All rights reserved.<v-btn
                    variant="text"
                    @click="goPrivacy"
                    >
                  Privacy Policy
                </v-btn></p>
           </div>
      </div>

    </v-app>
</template>

<script>
import logo from './assets/oc-logo-white.png'
export default {
  name: 'App',

  data: () => ({
    logo,

    return: {
                authenticated: false,
                mockAccount: {
                    username: "bharath",
                    password: "test"
                },
                url:""
            }
  }),

  mounted() {
            /*if(!this.authenticated) {
                this.$router.replace({ name: "login" });
                this.url="login"
            }*/

        },

  methods: {
  logouttab(){
  this.$router.push({ name: 'login' });
  this.url="login"
    console.log(this.$router,"[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]")
  },
    goHome() {
      this.$router.push({ name: 'home' });
      this.url="home"
    },
    goAdd() {
      this.$router.push({ name: 'add' });
      this.url="add"
    },
    goAbout() {
      this.$router.push({ name: 'about' });
      this.url="about"
    },
    goPrivacy() {
      this.$router.push({ name: 'privacy' });
      this.url="privacy"
    },
    goList() {
      this.$router.push({ name: 'tutorials' });
      this.url="tutorials"
      this.addFlag=true
    },
    goLogin() {
      this.$router.push({ name: 'login' });
      this.url="login"
    },
    goRegister() {
      this.$router.push({ name: 'register' });
      this.url="register"
    },
    setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            },
            surveyForm(){
            this.$router.push({ name: 'surveyForm' });
            this.url="surveyForm"
            },
            response(){
            this.$router.push({ name: 'response' });
            this.url="response"
            }

  },

}
</script>


<style>

.footer{
      border-top: 1px solid #ccc;
}
.footer p{
  text-align: center;
    color: #000;
    font-size: 14px;
    padding: 7px;
}
.footer button{
  color: #000;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    letter-spacing: unset;
    padding: 7px;
    font-weight: unset;
    text-transform: none;
}
footer .v-btn:hover .v-btn__overlay {
    opacity: 0;
        transition: unset;
}
footer .v-btn__overlay {
    position: relative;
}

</style>
