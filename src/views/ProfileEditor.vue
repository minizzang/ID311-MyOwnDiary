<template>
  <div class="container">
    <b-container fluid>
        <img thumbnail fluid src="../assets/blankProfile.jpg" alt="Profile Image" height="150px" width="150px" class="profile"/>
        <div>
            <label for="addproImage" class="addBtn">
                <font-awesome-icon icon="fa-solid fa-image" class="image-icon center" />
            </label>
        </div>
        <input id="addproImage" ref="profileInput" type="file" accept="image/*" @input="selectproImgFile">
        <b-row class="row1">
            <h6>Nickname</h6>
        </b-row>
        <b-row class="row1 nameInput">
            <b-form-input v-model="name" :placeholder="name"></b-form-input>
        </b-row>
        <b-row class="row1">
            <h6>Introduction</h6>
        </b-row>
        <b-row class="row1">
            <b-form-input v-model="intro" :placeholder="intro"></b-form-input>
        </b-row>
        <b-row class="row2">
            <button class="saveButton shadow" @click="saveProfile">Save</button>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { ref as refD, set } from '@firebase/database'
import { getDownloadURL, ref as refS, uploadString } from '@firebase/storage'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon
  },
  props: ['props'],
  data () {
    return {
      name: '',
      imgRef: '',
      intro: ''
    }
  },
  mounted () {
    this.name = this.props[0]
    this.intro = this.props[1]
    this.imgRef = ''
  },
  methods: {
    saveProfile () {
      if (this.name.length === 0) {
        alert('You should enter the nickname!')
      } else {
        const uid = localStorage.getItem('user')
        set(refD(this.$db, 'users/' + uid + '/nickname'), this.name)
        set(refD(this.$db, 'users/' + uid + '/intro'), this.intro)
        if (this.imgRef !== '') {
          const imagedbRef = refS(this.$storage, 'users/' + uid + '/img')
          uploadString(imagedbRef, this.imgRef, 'data_url').then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
              set(refD(this.$db, 'users/' + uid + '/img'), url)
              this.$emit('uploadProfile')
            })
          })
          console.log('image uploaded to firebase storage!')
        } else {
          this.$emit('uploadProfile')
        }
      }
    },
    selectproImgFile () {
      let profileInput = this.$refs.profileInput
      let imgFile = profileInput.files

      if (imgFile && imgFile[0]) {
        let reader = new FileReader()

        reader.onload = e => {
          const imageUrl = e.target.result
          this.imgRef = imageUrl
        }
        reader.readAsDataURL(imgFile[0])
        this.$emit('profileInput', imgFile[0])
      }
    }
  }
}
</script>

<style scoped>
.moodRadio input[type="radio"]:checked + label .moodImg {
  width: 40px;
}
.moodImg:hover {
  width: 35px;
}
.hidden {
  position: absolute;
  left: -9999px;
}
.mood {
  margin-right: 1vh;
  width: 35px;
}
.moodRadio {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  height: 40px;
}
.container {
  display: flex;
  flex-direction: column;
  height: 90%;
  padding-top: 0;
  /* align-items: center;
  justify-content: center; */
}
.textarea {
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
  margin-left: 3em;
  margin-right: 20%;
}
h2 {
  text-align: left;
}
.top {
  margin-top: 1em;
}
.top3 {
  margin-top: 1em;
}
.left2 {
  margin-left: 1em;
}
.right {
    float: right;
}
.saveButton {
  width: 7vh;
  height: 3.5vh;
  border-radius: 7%;
  background-color: #C3B1E1;
  color: white;
  font-size: 1.7vh;
  margin-top: 10px;
}
.row1 {
    padding: 1px;
    margin-top: 5px;
    text-align: left;
}
.row2 {
    float: right;
}
.nameInput {
    margin-bottom: 1px;
}
#addproImage {
  width: 0px;
  visibility: hidden;
  margin-bottom: 6px;
}
.addBtn {
    font-size: 27px;
    cursor: pointer;
    float: right;
}
.profile {
  margin-top: 10px;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  overflow: hidden;
}
</style>
