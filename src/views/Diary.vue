<template>
  <!-- <div>
    <b-calendar class="border rounded p-2" locale="en"></b-calendar>
    <slot>
      <WriteDiary />
    </slot>
  </div> -->
  <div>
    <b-container>
      <b-row align-h="center">
        <b-col cols="1" md="md">
          <Calendar/>
        </b-col>
        <b-col cols="2" md="md">
          <WriteDiary/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Calendar from './Calendar.vue'
import WriteDiary from './WriteDiary.vue'

export default {
  name: 'diary',
  components: { WriteDiary, Calendar }
}
</script>
