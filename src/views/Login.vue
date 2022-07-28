<template>
  <h1>Login</h1>
  <v-app id="inspire">
    <v-content id="login">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark>
                <v-toolbar-title>Login into your Portal</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="username"
                    label="Username"
                    type="text"
                    v-model="input.username"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="input.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="login()">Login</v-btn>
                <v-btn to="/">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<!--
<script>
export default {
   name: 'Login',
   props: {
      source: String,
   },
};
</script>
-->

<script>
import axios from "axios";
import { baseurl } from "../http-common"
export default {
  name: "Login",

  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
  isRequired(value) {
      return value ? true : 'This field is required';
    },
    login() {
      console.log("in log in fun");
      if (this.input.username != "" && this.input.password != "") {
        axios({
          method: "GET",
          url: baseurl+"survey/login?userEmail="+ this.input.username + "&userPassword=" + this.input.password,
          headers: {
    'x-developer-token': 'c256f988-459a-43ca-8fef-9c14f7134900',
    'x-api-key': 'qwrtrthedwd2124@#$%2sSQw2',
    'Content-Type': 'application/json'
  },
        }).then(
          (result) => {
            console.log("result.data", result);
            if (result.data.resultCode == 200) {
            let id=result.data.responseData[0].id
              this.$router.push({ name: 'tutorials',query: { id } });
            } else {
            alert("Invalid user ");
            }
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.log("A username and password must be present");
      }
    },
  },
};
</script>

<style>
#inspire .v-layout {
  display: unset;
}
.elevation-12 {
  width: 540px;
  margin: 18px auto;
}
.v-card .v-card-text .v-form {
  padding: 18px 10px 0;
}
.v-card-actions {
  text-align: center;
  display: block !important;
}
.v-card-actions .v-btn {
  border: 2px solid;
  margin-bottom: 27px;
  font-size: 18px;
  border-radius: 0;
  padding: 7px 18px;
  height: unset;
  color: #000;
}
.v-toolbar-title__placeholder {
  color: #fff;
}
header.v-theme--light {
  background-color: #000;
}
.v-card-actions .v-btn ~ .v-btn {
  margin-inline-start: 6.3rem;
}
</style>
