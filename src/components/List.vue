<template>
  <section>
    <form @submit.prevent="createItem" role="form">
      <label class="box">
        <span class="check" />
        <input v-model="newItem" type="text" placeholder="Create a new todo…" />
      </label>
    </form>
    <Items
      :list="filteredList"
      @checked="markAsComplete"
      @delete="deleteItem"
      @clear="clearCompleted"
    />
    <FilterItems :filter="filter" @show="show" />
    <p v-if="filteredList.length > 1">Drag and drop to reorder list</p>
  </section>
</template>

<script>
import Items from './Items.vue';
import FilterItems from './FilterItems.vue';

export default {
  name: 'List',
  components: { Items, FilterItems },
  mounted() {
    const items = localStorage.getItem('list');

    if (items) {
      this.list = JSON.parse(items);
      this.filteredList = this.list;
    }
  },
  data() {
    return {
      list: [],
      filteredList: [],
      newItem: '',
      filter: 'all',
    };
  },
  methods: {
    createItem() {
      this.list.push({ item: this.newItem, completed: false });
      this.updateList();
      this.newItem = '';
    },
    markAsComplete(index) {
      this.list[index].completed = true;
      this.updateList();
    },
    deleteItem(selectedItem) {
      this.list = this.list.filter(({ item }) => item !== selectedItem);
      this.updateList();
    },
    clearCompleted() {
      this.list = this.list.filter(({ completed }) => !completed);
      this.updateList();
    },
    show(dataType) {
      this.filter = dataType;

      switch (dataType) {
        case 'active':
          this.filteredList = this.list.filter(({ completed }) => !completed);
          break;
        case 'completed':
          this.filteredList = this.list.filter(({ completed }) => completed);
          break;
        default:
          this.filteredList = this.list;
          break;
      }
    },
    updateList() {
      localStorage.setItem('list', JSON.stringify(this.list));
      this.show(this.filter);
    },
  },
};
</script>

<style scoped>
form label {
  column-gap: 12px;
  display: grid;
  grid-template-columns: 24px 1fr;
  padding: 1.4rem 20px;
}

form input {
  background: none;
  border: none;
  caret-color: #3a7cfd;
  color: var(--txt-color-1);
  font-size: 1.2rem;
  letter-spacing: -0.017rem;
  line-height: 1;
  outline: none;
  width: 100%;
}

form input::placeholder {
  color: var(--txt-color-3);
}

p {
  color: var(--txt-color-3);
  font-size: 1.4rem;
  letter-spacing: 0.019rem;
  line-height: 1;
  margin-top: 4rem;
  text-align: center;
}

@media (min-width: 640px) {
  form label {
    column-gap: 24px;
    padding: 2rem 24px;
  }

  form input {
    font-size: 1.8rem;
    letter-spacing: -0.025rem;
  }

  p {
    margin-top: -2rem;
  }
}
</style>
