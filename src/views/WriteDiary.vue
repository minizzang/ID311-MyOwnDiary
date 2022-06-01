<template>
  <div>
    <h1>📝 How was your day?</h1>
    <!-- <b-form-group label="Today's Mood" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-group-2"
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="radio-sub-component"
      >
        <b-form-radio value="Very Good">😆</b-form-radio>
        <b-form-radio value="Good">🙂</b-form-radio>
        <b-form-radio value="Just OK">😐</b-form-radio>
        <b-form-radio value="Bad">😣</b-form-radio>
      </b-form-radio-group>
    </b-form-group> -->

    <!-- <div class="mt-3"><strong>{{ selected }}</strong></div> -->

    <b-form-group v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="btn-radios-1"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        button-variant="outline-primary"
        name="plain-inline"
        buttons
      ></b-form-radio-group>
    </b-form-group>

    <!-- <div class="mt-3"><strong>{{ selected }}</strong></div> -->

    <br/>

    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Please describe your day!"
      rows="3"
      max-rows="6"
    ></b-form-textarea>

    <pre class="mt-3 mb-0">{{ text }}</pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: 'Very Good',
      options: [
        { text: '😆', value: 'Very Good' },
        { text: '🙂', value: 'second' },
        { text: '😐', value: 'Just OK' },
        { text: '😣', value: 'Bad' }
      ]
    }
  }
}
</script>
