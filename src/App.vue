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
            <base-button
              @btn-click="displayButtonInfo"
              bgcolor="bg-red-900"
              label="submit"
            ></base-button>
            <!-- <button class="btn">
              Submit
            </button> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "./components/BaseButton.vue";
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
    BaseButton,
  },
  data() {
    return {
      enteredName: "",
      rating: null,
      invalidNameInput: false,
      invalidRatingInput: false,
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
    },

    validateName() {
      this.invalidNameInput = this.enteredName === "" ? true : false;
      console.log(`name: ${this.invalidNameInput}`);
    },
    displayButtonInfo(passingBtnInfo){
      alert('at App.vue, textColor: '+passingBtnInfo.textColor+' ,label : '+passingBtnInfo.label);
    }
  },
};
</script>
