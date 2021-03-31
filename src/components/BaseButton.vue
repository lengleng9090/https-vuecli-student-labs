<template>
  <div>
    <button
      @click="buttonClick"
      class="focus:outline-none px-3 py-1 mt-1"
      :class="[textColor, bgcolor]"
    >
      {{ label }}
    </button>
  </div>
</template>
<script>
export default {
  // props:['textColor','bgcolor','label'],
  emits: ["btn-click"],
  props: {
    textColor: {
      type: String,
      required: false,
      default: "text-white",
    },
    bgcolor: {
      type: String,
      required: false,
      default: "bg-purple-900",
    },
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    buttonClick() {
      alert(this.label + " button clicked at BaseButton.vue");
      const btnInfo = { label: this.label, textColor: this.textColor };
      this.$emit("btn-click", btnInfo);
    },
  },
};
</script>
<style scoped>
</style>