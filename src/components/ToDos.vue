<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">ToDos</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>IsComplete</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in records" :key="record.id">
              <td>{{ record.id }}</td>
              <td>{{ record.description }}</td>
              <td>{{ record.isComplete ? "Yes" : "No" }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="updateToDo(record)">Edit</a> -
                <a href="#" @click.prevent="deleteToDo(record.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="model.id ? 'Edit ToDo ID#' + model.id : 'New ToDo'">
          <form @submit.prevent="createToDo">
            <b-form-group label="Description">
              <b-form-input
                type="text"
                v-model="model.description"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="IsComplete">
              <b-form-radio
                v-model="model.isComplete"
                v-bind:value="true"
                name="some-radios"
                >Yes</b-form-radio
              >
              <b-form-radio
                v-model="model.isComplete"
                v-bind:value="false"
                name="some-radios"
                >No</b-form-radio
              >
            </b-form-group>
            <div>
              <b-alert
                :show="dismissCountDown"
                dismissible
                variant="success"
                @dismissed="dismissCountDown = 0"
                @dismiss-count-down="countDownChanged"
              >
                <p>Completed successfully!</p>
                
              </b-alert>
              <b-btn
                @click="showAlert"
                type="submit"
                variant="success"
                >Save Record</b-btn
              >
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from "@/ToDoApiService";

export default {
  data() {
    return {
      dismissSecs: 1,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      loading: false,
      records: [],
      model: {},
    };
  },
  async created() {
    this.getAll();
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    async getAll() {
      this.loading = true;

      try {
        this.records = await api.getAll();
      } finally {
        this.loading = false;
      }
    },
    async updateToDo(toDo) {
      // We use Object.assign() to create a new (separate) instance
      this.model = Object.assign({}, toDo);
    },
    async createToDo() {
      const isUpdate = !!this.model.id;

      if (isUpdate) {
        await api.update(this.model.id, this.model);
      } else {
        await api.create(this.model);
      }

      // Clear the data inside of the form
      this.model = {};

      // Fetch all records again to have latest data
      await this.getAll();
    },
    async deleteToDo(id) {
      if (confirm("Are you sure you want to delete this record?")) {
        // if we are editing a ToDo record we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }

        await api.delete(id);
        await this.getAll();
      }
    },
  },
};
</script>