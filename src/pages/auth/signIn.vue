<template>
  <v-layout fill-height align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Inicia sesión en SnackMusic</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-form>
              <v-text-field 
                type="text"
                label="Usuario" 
                name="username" 
                v-model="user.username"
                :counter="150"
                v-validate="'required|max:150'"
                :error-messages="errors.collect('username')"
                prepend-icon="person" 
                required
              />
              <v-text-field 
                type="password"
                label="Contraseña" 
                v-model="user.password"
                prepend-icon="lock" 
                name="password" 
                id="password" 
                :counter="8"
                v-validate="'required|min:8'"
                :error-messages="errors.collect('password')"
                required
                autocomplete="current-password"
              />
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="errors.any()" color="primary" @click="signIn(user)">Iniciar</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>  
  </v-layout>
</template>

<script>
  import authSrvc from './authSrvc'

  export default {
    data(){
      return {
        user:{
          username: '',
          password: ''
        }
      }
    },
    created() {
      this.init();
    },
    methods:{ 
      init(){
        let isLoggedIn = this.$store.getters.isLoggedIn;
        if(isLoggedIn){
          this.$router.push({ path: '/artist' });
        }
        this.user = {
          username: '',
          password: '',
        }
      },
      signIn(user){ 
        this.$validator.validateAll().then((result) => {
          if (result) {
            authSrvc.signIn(user).then((data) => {
              this.$store.dispatch('signIn', data['token']);
              this.$router.push({ path: '/artist' });
            })
            .catch(err => console.log(err.response.statusText));
          }else{
            
          }
        });
      }
    }
  }
</script>