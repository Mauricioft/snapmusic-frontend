<template>
  <v-snackbar :color="color" :bottom="y" :right="x" :multi-line="mode" v-model="is_visible">
    <div v-if="this.isString">
      <span v-for="(item0, index0) in currentMessage" :key="index0">
        <span v-for="(item1, index1) in item0" :key="index1">
          {{ item1 }}<br>
        </span>
      </span>
    </div>
    <div v-else>
      {{ currentMessage }}
    </div>
    <v-btn icon @click="is_visible = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    name: "notify",
    data: () => ({
      currentMessage: null,
      is_visible: false,
      color: '',
      y: 'bottom',
      x: 'right',
      mode: 'multi-line',
      isString: '',
    }),
    computed: {
      messageLine() {
        return this.$store.state.messageLine;
      }
    },
    methods: {
      shiftMessage() {
        const newMessage = this.messageLine[0];
        this.color = newMessage['color'];
        this.isString = this.IsJsonString(newMessage['msg']);
        if (this.isString) {
          this.currentMessage = JSON.parse(newMessage['msg']);
        } else {
          this.currentMessage = newMessage['msg'];
        }
        this.is_visible = true;
        this.$store.commit("shift");
      },
      IsJsonString(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      }
    },
    watch: {
      messageLine() {
        if (!this.is_visible) {
          this.shiftMessage();
        }
      }
    }
  }
</script>