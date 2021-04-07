<template>
  <div class="w-screen h-screen">
    <div class="w-full h-full md:w-1/2">
      <div class="container">
        <img class="logo" alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to VueCLI project" />
      </div>

      <div class="container">
        <div class="survey-container">
          <form @submit.prevent="submitForm">
            <base-card>
              <h2 class="heading">How was your Vue.js learning experience?</h2>

              <label class="label" for="name">Your Name</label>

              <input
                class="input"
                :class="{ 'bg-red-50': invalidNameInput }"
                id="name"
                type="text"
                v-model.trim="enteredName"
                @blur="validateName"
              />

              <p v-if="invalidNameInput" class="text-red-500">
                Please enter your name!
              </p>
            </base-card>

            <base-card>
              <h2 class="heading">My learning experience was ...</h2>

              <div>
                <input
                  type="radio"
                  name="rating"
                  id="rating-poor"
                  value="poor"
                  v-model="rating"
                />
                <label class="label" for="rating-poor">Poor</label>
              </div>

              <div>
                <input
                  type="radio"
                  name="rating"
                  id="rating-avg"
                  value="average"
                  v-model="rating"
                />
                <label class="label" for="rating-avg">Average</label>
              </div>

              <div>
                <input
                  type="radio"
                  name="rating"
                  id="rating-great"
                  value="great"
                  v-model="rating"
                />
                <label class="label" for="rating-great">Great</label>
              </div>
              <p v-if="invalidRatingInput" class="text-red-500">
                Please choose your learning experience!
              </p>
            </base-card>

            <button class="btn">Submit</button>
          </form>
          <base-card v-show="surveyResults">
            <ul v-for="surveyResult in surveyResults" :key="surveyResult.id">
              <li>
                <span
                  >{{ surveyResult.name }} , rating the learning
                  experience </span
                >
                <span>{{ surveyResult.rating }}</span>
                <button
                  @click="showData(surveyResult)"
                  class="bg-green-500 m-1"
                >
                  <img src="./assets/edit.svg" alt="" />
                </button>
                <button
                  @click="deleteSurvey(surveyResult.id)"
                  class="bg-red-500 m-1"
                >
                  <img src="./assets/delete.svg" alt="" />
                </button>
              </li>
            </ul>
          </base-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCard from "./components/BaseCard.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    BaseCard,
  },
  data() {
    return {
      enteredName: "",
      rating: null,
      invalidNameInput: false,
      invalidRatingInput: false,
      surveyResults: [],
      isEdit: false,
      editId: "",
    };
  },
  methods: {
    submitForm() {
      this.invalidNameInput = this.enteredName === "" ? true : false;
      this.invalidRatingInput = this.rating === null ? true : false;

      console.log(`name value: ${this.enteredName}`);
      console.log(`rating value: ${this.rating}`);
      console.log(`invalid name: ${this.invalidNameInput}`);
      console.log(`invalid rating: ${this.invalidRatingInput}`);

      if (this.enteredName !== "" && this.rating !== null) {
        if (this.isEdit === true) {
          this.editSurvey({
            id: this.editId,
            name: this.enteredName,
            rating : this.rating 
          });
        } else {
          this.addNewSurvey({
            name: this.enteredName,
            rating: this.rating,
          });
        }
      }
      console.log(this.surveyResults);
    },

    validateName() {
      this.invalidNameInput = this.enteredName === "" ? true : false;
      console.log(`name: ${this.invalidNameInput}`);
    },
    async addNewSurvey(newSurvey) {
      try {
        const res = await fetch("http://localhost:5000/surveyResults", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: newSurvey.name,
            rating: newSurvey.rating,
          }),
        });
        console.log(res);
        const data = await res.json();
        //same as .push()
        this.surveyResults = [...this.surveyResults, data];
      } catch (error) {
        console.log("Could not save! : " + error);
      }
    },
    async getSurveyResult() {
      try {
        const response = await fetch("http://localhost:5000/surveyResults");
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("Could not get! : " + error);
      }
    },
    async deleteSurvey(deleteId) {
      try {
        await fetch("http://localhost:5000/surveyResults/" + deleteId, {
          method: "DELETE",
        });
        this.surveyResults = this.surveyResults.filter(
          (surveyResult) => surveyResult.id !== deleteId
        );
      } catch (error) {
        console.log("Could not delete! : " + error);
      }
    },
    showData(oldSurvey) {
      this.isEdit = true;
      this.editId = oldSurvey.id;
      this.enteredName = oldSurvey.name;
      this.rating = oldSurvey.rating;
    },
    async editSurvey(editingSurvey){
      try{
      const res = await fetch("http://localhost:5000/surveyResults/" + editingSurvey.id, {
          method: "PUT",
          headers:{
            'content-type' : 'application/json'
          },
          body : JSON.stringify({
            name:editingSurvey.name,
            rating : editingSurvey.rating
          })
        });
        const data = await res.json();
        this.surveyResults = this.surveyResults.map((survey)=> survey.id ===editingSurvey.id? 
        {...survey,name:data.name,rating:data.rating}:survey
        );
        this.isEdit = false;
        this.editId = '';
        this.enteredName = '';
        this.rating = null;

    }catch(error){
      console.log("Could not edit! : " + error);
    }
    }
  },
  async created() {
    this.surveyResults = await this.getSurveyResult();
  },
};
</script>
