<template>
  <v-main class="list">
    <v-carousel height="677px">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition">
      
      <img src="../assets/watermark.png" style="width: 30%; margin-left: 36%; margin-top: 18%;">
      
      
    </v-carousel-item>
  </v-carousel>
  </v-main>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://i.postimg.cc/T3nhLX9T/1.jpg',
          },
          {
            src: 'https://i.postimg.cc/J4fGzhjT/2.jpg',
          },
          {
            src: 'https://i.postimg.cc/vHg4ynxg/3.jpg',
          },
        ],
      }
    },
  }
</script>