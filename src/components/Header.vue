<template>
  <header>
    <b>TODO</b>
    <span
      class="icon"
      @click="toggleMode"
      :style="{ backgroundImage: `url(${icon.img})` }"
      :aria-label="icon.label"
    />
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    mode: String,
  },
  computed: {
    style() {
      return !this.mode || this.mode === 'light' ? 'light' : 'dark';
    },
    icon() {
      return this.style === 'light'
        ? { label: 'dark mode', img: require('../assets/icons/moon.svg') }
        : { label: 'light mode', img: require('../assets/icons/sun.svg') };
    },
  },
  methods: {
    toggleMode() {
      if (this.style === 'light') {
        this.$emit('toggleMode');
        document.body.classList.add('dark');
        localStorage.setItem('mode', 'dark');
      } else {
        this.$emit('toggleMode');
        document.body.classList.remove('dark');
        localStorage.setItem('mode', 'light');
      }
    },
  },
};
</script>

<style scoped>
header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 540px;
  padding: 48px 24px 40px;
}

b {
  color: white;
  font-size: 23px;
  height: 20px;
  letter-spacing: 12.63px;
}

span {
  cursor: pointer;
  height: 20px;
  width: 20px;
}

@media (min-width: 640px) {
  header {
    align-items: flex-end;
    padding: 70px 0 50px;
  }

  b {
    font-size: 40px;
    height: auto;
    letter-spacing: 15px;
  }

  span {
    height: 26px;
    width: 26px;
  }
}
</style>
