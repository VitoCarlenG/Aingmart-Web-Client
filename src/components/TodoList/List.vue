<template>
  <v-main class="list">
    <h3 class="text-h3 font-weight-medium mb-5">To Do List</h3>
    <v-card>
      <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" dark @click="dialog = true">Tambah</v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="todos" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v class="mr-2" style="color: #FF0000;" @click="editItem(item)"><font-awesome-icon icon="pencil-alt"/></v>
          <v style="color: #00FF00;" @click="deleteItem(item)"><font-awesome-icon icon="trash"/></v>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Form Todo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
                v-model="formTodo.task"
                label="Task"
                required
            ></v-text-field>

            <v-select
                v-model="formTodo.priority"
                :items="['Penting', 'Biasa', 'Tidak penting']"
                label="Priority"
                required
            ></v-select>

            <v-textarea
                v-model="formTodo.note"
                label="Note"
                required
            ></v-textarea>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      search: null,
      dialog: false,
      headers: [
        {
          text: "Task",
          align: "start",
          sortable: true,
          value: "task",
        },
        { text: "Priority", value: "priority" },
        { text: "Note", value: "note" },
        { text: "Actions", value: "actions" },
      ],
      todos: [
        {
          task: "Coding",
          priority: "Penting",
          note: "Code for your life",
        },
        {
          task: "Gaming",
          priority: "Tidak Penting",
          note: "Wasting time",
        },
        {
          task: "Masak",
          priority: "Biasa",
          note: "Indomie saat coding terbaik gan",
        },
      ],
      formTodo: { task: null, priority: null, note: null },
    };
  },
  methods: {
    save() {
      this.todos.push(this.formTodo);
      this.resetForm();
      this.dialog = false;
    },
    cancel() {
      this.resetForm();
      this.dialog = false;
    },
    deleteItem(item){
      this.items = this.items.filter((i)=> { 
        return i.task !== item.task;
      });
    },
    resetForm() {
      this.formTodo = { task: null, priority: null, note: null };
    },
  },
};
</script>