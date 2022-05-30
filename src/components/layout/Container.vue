<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Diary Tab" @click="path = './diary', routeTab" active></b-tab>
        <b-tab title="Todo Tab" @click="path = './todo', routeTab"></b-tab>
        <b-tab title="Memo Tab" @click="path = './memo', routeTab"></b-tab>
      </b-tabs>
      <ProfileVue/>
      <router-view/>
    </b-card>
  </div>
</template>

<script>
import router from '../../router'
import ProfileVue from '../../views/Profile.vue'

export default {
  name: 'container',
  components: { ProfileVue },
  mounted () {
    return router.replace('/diary')
  },
  data () {
    return {
      path: './diary'
    }
  },
  computed: {
    routeTab () {
      return router.replace(this.path)
    }
  },
  methods: {
    goTo () {
      alert(this.path)
    }
  }
}
</script>

<style scoped>
b-tabs {
  flex-direction: column;
}
</style>
