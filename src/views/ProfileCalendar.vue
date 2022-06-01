<template>
  <b-calendar block v-model="value" value-as-date locale="en">
    <div class="d-flex justify-content-between" dir="ltr">
      <b-button
        size="sm"
        variant="outline-danger"
        v-if="value"
        @click="clearDate"
      >
        Clear date
      </b-button>
      <b-button
        size="sm"
        variant="outline-primary"
        class="ml-auto"
        @click="setToday"
      >
        Set Today
      </b-button>
    </div>
  </b-calendar>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    setToday () {
      const now = new Date()
      this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    },
    clearDate () {
      this.value = ''
    }
  }
}
</script>
