<template>
  <div class="box">
    <button
      :class="{ 'txt-violet': filter === 'all' }"
      @click="$emit('show', 'all')"
    >
      All
    </button>
    <button
      :class="{ 'txt-violet': filter === 'active' }"
      @click="$emit('show', 'active')"
    >
      Active
    </button>
    <button
      :class="{ 'txt-violet': filter === 'completed' }"
      @click="$emit('show', 'completed')"
    >
      Completed
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterItems',
  props: {
    filter: String,
  },
};
</script>

<style scoped>
div {
  align-items: center;
  display: flex;
  height: 4.8rem;
  justify-content: center;
}

button {
  color: var(--txt-color-3);
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: -0.019rem;
  margin-right: 18px;
}

button:last-of-type {
  margin-right: 0;
}

button:hover {
  color: var(--txt-hover);
}

.txt-violet,
.txt-violet:hover {
  color: #3a7cfd;
  cursor: default;
}

@media (min-width: 640px) {
  div {
    background: none;
    bottom: 7.5rem;
    box-shadow: none;
    font-size: 1.4rem;
    margin: 0 auto;
    position: relative;
    right: 16px;
    width: fit-content;
  }
}
</style>
