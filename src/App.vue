<template>
  <div id="app">
    <Header :mode="mode" @toggleMode="toggle" />
    <main>
      <List />
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import List from '@/components/List.vue';

export default {
  name: 'App',
  components: { Header, List },
  mounted() {
    this.mode = localStorage.getItem('mode');

    if (localStorage.getItem('mode') === 'dark') {
      document.body.classList.add('dark');
    }
  },
  data() {
    return {
      mode: null,
    };
  },
  methods: {
    toggle() {
      !this.mode || this.mode === 'light'
        ? (this.mode = 'dark')
        : (this.mode = 'light');
    },
  },
};
</script>

<style>
@font-face {
  font-family: 'Josefin Sans';
  font-weight: 400;
  src: url('./assets/fonts/JosefinSans-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Josefin Sans';
  font-weight: 700;
  src: url('./assets/fonts/JosefinSans-Bold.ttf') format('truetype');
}

:root {
  --bg-color: #fafafa;
  --bg-desktop: url('./assets/images/bg-desktop-light.jpg');
  --bg-mobile: url('./assets/images/bg-mobile-light.jpg');
  --main-color: #ffffff;
  --shadow: 0px 35px 50px -15px rgba(194, 195, 214, 0.5);
  --txt-color-1: #393a4b;
  --txt-color-2: #494c6b;
  --txt-color-3: #9495a5;
  --txt-color-4: #d1d2da;
  --txt-hover: #494c6b;
  --border-gray: #e3e4f1;
}

*,
::before,
::after {
  box-sizing: border-box;
  font-family: 'Josefin Sans', sans-serif;
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
  min-width: 360px;
  width: 100%;
}

html {
  font-size: 62.5%;
}

body {
  background-color: var(--bg-color);
  background-image: var(--bg-mobile);
  background-repeat: no-repeat;
  background-size: 100% 200px;
  font-size: 1.6rem;
}

main {
  margin: 0 auto;
  max-width: 540px;
  padding: 0 24px 48px;
  position: relative;
}

button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  letter-spacing: inherit;
  outline: none;
}

.dark {
  --bg-color: #171823;
  --bg-desktop: url('./assets/images/bg-desktop-dark.jpg');
  --bg-mobile: url('./assets/images/bg-mobile-dark.jpg');
  --main-color: #25273d;
  --shadow: 0px 35px 50px -15px rgba(0, 0, 0, 0.5);
  --txt-color-1: #c8cbe7;
  --txt-color-2: #c8cbe7;
  --txt-color-3: #767992;
  --txt-color-4: #4d5067;
  --txt-hover: #e3e4f1;
  --border-gray: #393a4b;
}

.box {
  background-color: var(--main-color);
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
}

.icon {
  background-repeat: no-repeat;
  background-size: cover;
}

.check {
  border: 1px solid var(--border-gray);
  border-radius: 50%;
  display: inline-block;
  height: 20px;
  width: 20px;
}

@media (min-width: 640px) {
  body {
    background-image: var(--bg-desktop);
    background-size: 100% 300px;
  }

  main {
    padding: 0 0 5.2rem;
  }

  .check {
    height: 24px;
    width: 24px;
  }
}
</style>
