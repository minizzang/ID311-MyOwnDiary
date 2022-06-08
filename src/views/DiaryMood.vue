<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: 'Very Good',
      options: [
        { text: ' Best ', value: 'Very Good' },
        { text: ' Nice', value: 'second' },
        { text: ' OK', value: 'Just OK' },
        { text: ' Bad', value: 'Bad' }
      ]
    }
  }
}
</script>
