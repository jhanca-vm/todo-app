<template>
  <ul class="box">
    <li
      v-for="({ item, completed }, i) in list"
      :key="i + 1"
      :draggable="list.length > 1"
      @dragstart="e => e.dataTransfer.setData('id', `i${i + 1}`)"
      @dragleave.prevent="e => (offsetY = e.offsetY)"
      @dragover.prevent
      @drop="reorder"
    >
      <input :id="`i${i + 1}`" type="radio" :checked="completed" />
      <label :for="`i${i + 1}`" @click="$emit('checked', i)">
        {{ item }}
      </label>
      <span class="check" @click="$emit('checked', i)" />
      <span
        class="icon cross"
        :aria-label="`delete ${item}`"
        @click="$emit('delete', item)"
      />
    </li>
    <li>
      <p>{{ quantity }} items left</p>
      <button @click="$emit('clear')">Clear Completed</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Items',
  props: {
    list: Array,
  },
  data() {
    return {
      offsetY: 0,
    };
  },
  computed: {
    quantity() {
      return this.list.filter(({ completed }) => !completed).length;
    },
  },
  methods: {
    reorder(e) {
      if (e.target.nodeName === 'LI' && this.offsetY < 0) {
        e.target.parentNode.insertBefore(
          document.getElementById(e.dataTransfer.getData('id')).parentNode,
          e.target
        );
      }

      if (e.target.nodeName === 'LI' && this.offsetY > 0) {
        e.target.parentNode.insertBefore(
          document.getElementById(e.dataTransfer.getData('id')).parentNode,
          e.target.nextSibling
        );
      }
    },
  },
};
</script>

<style scoped>
ul {
  color: var(--txt-color-2);
  font-size: 1.2rem;
  letter-spacing: -0.017rem;
  line-height: 1;
  list-style: none;
  margin: 1.6rem 0;
}

label,
span {
  cursor: pointer;
}

label {
  width: fit-content;
}

input {
  display: none;
}

li {
  align-items: center;
  border-bottom: 1px solid var(--border-gray);
  column-gap: 12px;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  padding: 1.6rem 20px;
}

li:last-of-type {
  border: none;
  color: var(--txt-color-3);
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
}

button:hover {
  color: var(--txt-hover);
}

.cross {
  background-image: url('../assets/icons/cross.svg');
  height: 12px;
  width: 12px;
}

.check {
  grid-row-start: 1;
  grid-column-start: 1;
}

input:checked ~ .check,
label:hover ~ .check,
.check:hover {
  background: linear-gradient(135deg, #55ddff 0%, #c058f3 100%);
  border: none;
  position: relative;
}

input:checked ~ .check {
  cursor: default;
}

label:hover ~ .check::before,
.check:hover::before {
  border-radius: 50%;
  background: var(--main-color);
  content: '';
  height: calc(100% - 2px);
  left: 1px;
  position: absolute;
  top: 1px;
  width: calc(100% - 2px);
  z-index: 1;
}

input:checked ~ .check::before,
input:checked ~ .check:hover::before {
  background: none;
  background-image: url('../assets/icons/check.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 11px 9px;
  content: '';
  display: inline-block;
  height: 100%;
  position: static;
  width: 100%;
}

input:checked ~ label {
  color: var(--txt-color-4);
  text-decoration: line-through;
  cursor: default;
}

@media (min-width: 640px) {
  ul {
    font-size: 1.8rem;
    letter-spacing: -0.025rem;
    margin: 2.4rem 0;
  }

  li {
    column-gap: 24px;
    padding: 2rem 24px;
  }

  li:last-of-type {
    font-size: 1.4rem;
    letter-spacing: -0.019rem;
    padding: 1.6rem 24px 2rem;
  }

  .cross {
    display: none;
    height: 18px;
    width: 18px;
  }

  li:hover .cross {
    display: inline-block;
  }
}
</style>
