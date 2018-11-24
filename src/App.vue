<template>
  <v-app light>
    <v-navigation-drawer fixed :clipped="clipped" v-model="drawer" width="250" app v-show="isLoggedIn">
      <v-list dense>
        <v-list-tile v-for="(item, i) in routes" value="true" router :to="item.path" v-if="item.show" active-class="active-primary" :key="i">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="signOut()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon> 
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Cerrar sesión</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" v-show="isLoggedIn">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>  
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <pm-notify />
        <router-view/>
      </v-container>
    </v-content> 
    <v-footer :fixed="fixed" app v-show="isLoggedIn">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  import PmNotify from './components/notification/Notify'

  export default {
    components:{
      PmNotify
    },
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        routes: [
          {
            icon: 'music_note',
            title: 'Artista',
            path: '/artist',
            show: true
          },
          {
            icon: 'album',
            title: 'Album',
            path: '/album',
            show: true
          },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'SnackMusic'
      }
    },
    computed: {
      ...mapGetters(['isLoggedIn'])
    },
    methods: {
      signOut() {
        this.$store.dispatch('logout');
      }
    }
  }
</script>
