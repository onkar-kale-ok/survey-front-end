<template>
  <h1>Register an Account</h1>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark>
                <v-toolbar-title>Fill the Form to Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="name"
                    label="First Name"
                    type="text"
                    v-model="name"
                  ></v-text-field>
                  <v-text-field
                    name="name"
                    label="Last Name"
                    type="text"
                    v-model="lname"
                  ></v-text-field>
                  <v-text-field
                    name="email"
                    label="Email"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="cpassword"
                    label="Confirm Password"
                    type="password"
                    v-model="confirmPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="register()">Register</v-btn>
                <v-btn to="/">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      input: {
        name: "",
        password: "",
      },
      name: "",
      password: "",
      email:"",
      dob:"",
      lname:''
    };
  },
  methods: {
    register() {
      console.log("in register  fun",this.name);
      if (this.name != "" && this.password != "" && this.email != "" ) {

      var data = JSON.stringify({
        "userEmail":this.email,
        "userPassword": this.password,
        "userFirstName": this.name,
        "userLastName": this.name
      });

      var config = {
        method: 'post',
        url: baseurl+'survey/createUser',
        headers: {
          'x-developer-token': 'c256f988-459a-43ca-8fef-9c14f7134900',
          'x-api-key': 'qwrtrthedwd2124@#$%2sSQw2',
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then((response)=> {
        if(response.data.resultCode == 200){
        alert(response.data.resultMessage);
        this.$router.push({ name: 'login' });
        }else{
        alert(response.data.resultMessage)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      } else {
        alert("A username and password must be present");
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
  color: #000;
  height: unset;
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
