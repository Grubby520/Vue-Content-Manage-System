<template>

  <div id="todo-list-example">
    <input
      v-model="newTodoText"
      v-on:keyup.enter="addNewTodo"
      placeholder="Add a todo"
    >
    <ul>
      <li
        is="todo-item"
        v-for="(todo, index) in todos"
        ref="dom"
        v-bind:key="todo.id"
        v-bind:title="todo.title"
        v-on:remove="removeSec(index)"
        v-on:move="mouseSec(index)"
      ></li>
    </ul>
  </div>

</template>

<script>
  import todoItem from './todo-item.vue';
  export default {
    components: {
      todoItem
    },
    data() {
        return {
          newTodoText: '',
          todos: [
            {
              id: 1,
              title: 'Do the dishes',
            },
            {
              id: 2,
              title: 'Take out the trash',
            },
            {
              id: 3,
              title: 'Mow the lawn'
            }
          ],
          nextTodoId: 4
        }
    },
    methods: {
      addNewTodo: function () {
        this.todos.push({
          id: this.nextTodoId++,
          title: this.newTodoText
        });
        this.newTodoText = ''
      },
      removeSec(index ){
        this.todos.splice(index, 1);
      },
      mouseSec(index){
          this.styleObject.display = 'block'
      }
    }
  }
</script>
