<template>
<v-layout class="justify-end">
        <v-card
          color="teal-darken-4"
        >
      
          <router-link to="/admin/users" class="icon">
          <v-btn  >
            Users
          </v-btn>
        </router-link>
        
        <router-link to="/admin/gameSettings">
          <v-btn >
            Game Settings
          </v-btn>
        </router-link>
        
        <router-link to="/admin/stats">
          <v-btn >
            Statistics
          </v-btn>
        </router-link>

        </v-card>       
      </v-layout>

  <v-layout class="align-center justify-center">
    <v-container fill-height class="text-center">
      <img src="http://alumnes.inspedralbes.cat/~a22yanzhayan/userScore.png" class="mx-auto" />
    </v-container>
  </v-layout>
</template>

  
