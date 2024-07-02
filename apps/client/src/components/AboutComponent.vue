<template>
  <div class="about-me">
    <p>Welcome to AnimeConnoiseurs Forums, the ultimate destination for all anime enthusiasts! Whether you're a seasoned otaku or new to the world of anime, our community is the perfect place to explore, discuss, and share everything anime.</p>
    <p>At AnimeConnoiseurs Forums, we offer a diverse range of discussion topics that cater to all tastes and interests within the anime spectrum. From detailed threads about the latest releases to nostalgic discussions about classic hits, there’s something here for everyone. Dive deep into discussions about your favorite series, characters, soundtracks, and theories, or share your own fan art and stories.</p>
    <p>Our community is built on a foundation of respect, inclusivity, and passion for anime. We encourage members to voice their opinions, share their insights, and engage in healthy debates that foster a richer understanding of the anime we love.</p>
    <p>Join us today to connect with fellow anime fans from around the globe, participate in exciting events and contests, and keep up-to-date with the latest anime news and reviews. Together, let's create the most vibrant and welcoming anime forum on the web!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutMe'
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.about-me {
  padding: 20px;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
  margin-top: 7%;
  font-family: 'Poppins', sans-serif;
}

.about-me h1 {
  color: #333;
  font-family: 'Poppins', sans-serif;
}

.about-me p {
  color: #666;
  line-height: 1.6;
  font-family: 'Poppins', sans-serif;
}
</style>
