<template>
  <div>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Please describe your day..."
      size="lg"
      rows="8"
      max-rows="6"
    ></b-form-textarea>
    <div style="float: right;">
        <button class="top">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style>
.saveButton {
  float: right;
}
</style>
