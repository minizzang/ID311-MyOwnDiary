<template>
  <div class="container">
    <div class="canvas-box">
      <canvas id="sketch" width="500px" height="300px"></canvas>
    </div>
    <div class="col-box">
      <div class="row-box">
        <font-awesome-icon icon="fa-solid fa-paintbrush" class="icon selected"
          v-on:click="setIconClicked($event); setDrawType(true)" style="margin-right: 2px;" />
        <font-awesome-icon icon="fa-solid fa-arrow-pointer" class="icon"
          v-on:click="setIconClicked($event); setDrawType(false)" />
      </div>
      <div class="stroke-box">
        <div class="icon-box selected" v-on:click="setStrokeWidthClicked($event); setStrokeSize(2)">
          <div class="stroke" style="height: 2px; border-radius: 1px"></div>
        </div>
        <div class="icon-box" v-on:click="setStrokeWidthClicked($event); setStrokeSize(5)">
          <div class="stroke" style="height: 5px; border-radius: 2.5px"></div>
        </div>
        <div class="icon-box" v-on:click="setStrokeWidthClicked($event); setStrokeSize(8)">
          <div class="stroke" style="height: 9px; border-radius: 4.5px"></div>
        </div>
      </div>
      <div class="color-box" ref="colorPicker">
        <Chrome id="chromePicker" v-model="colorPick" v-if="displayPicker"></Chrome>
        <div class="color-circle" @click="clickPicker" style="background-color: #000"></div>
      </div>
      <div>
        <label for="addImage">
          <font-awesome-icon icon="fa-solid fa-image" class="image-icon center" />
        </label>
      </div>
      <input id="addImage" ref="fileInput" type="file" accept="image/*" @input="selectImgFile">
      <button id="clear" v-on:click="clearCanvas">clear all</button>
      <button v-on:click="downloadImage">download</button>
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { Chrome } from 'vue-color'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaintBrush, faArrowPointer, faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { getDownloadURL, ref, uploadString } from '@firebase/storage'

// declare icons to use
library.add(faPaintBrush, faArrowPointer, faImage)

export default {
  components: {
    Chrome,
    FontAwesomeIcon
  },
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  data () {
    return {
      isDrawing: true,
      isFill: false, // brush: true, fill: false
      strokeSize: 2,
      colorPick: {
        hex8: '#000000ff'
      },
      displayPicker: false
    }
  },
  mounted () {
    this.canvas = new fabric.Canvas('sketch', {
      isDrawingMode: true
    })
    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas)

    // default setting
    const brush = this.canvas.freeDrawingBrush
    brush.color = this.colorPick.hex8
    brush.width = this.strokeSize

    // console.log(this.props.width)

    this.canvas.setDimensions({width: '100%', height: '100%'}, {cssOnly: true})
  },
  watch: {
    'colorPick': 'setColor'
  },
  methods: {
    setColor () {
      this.canvas.freeDrawingBrush.color = this.colorPick.hex8
      const color = document.getElementsByClassName('color-circle')
      color[0].style.backgroundColor = this.colorPick.hex8
    },
    clickPicker () {
      this.displayPicker ? this.hidePicker() : this.showPicker()
    },
    showPicker () {
      document.addEventListener('click', this.documentClick)
      this.displayPicker = true
    },
    hidePicker () {
      document.removeEventListener('click', this.documentClick)
      this.displayPicker = false
    },
    setStrokeSize (width) {
      this.strokeSize = width
      this.canvas.freeDrawingBrush.width = parseInt(this.strokeSize, 10)
    },
    setDrawType (bool) {
      this.canvas.isDrawingMode = bool
    },
    clearCanvas () {
      this.canvas.clear()
    },
    documentClick (e) {
      const picker = this.$refs.colorPicker
      const target = e.target

      if (picker !== target && !picker.contains(target)) {
        this.hidePicker()
      }
    },
    setStrokeWidthClicked (e) {
      const strokes = Array.from(document.getElementsByClassName('icon-box'))
      strokes.forEach((t) => {
        if (t.classList.contains('selected')) {
          t.classList.remove('selected')
        }
      })
      let target = e.target
      if (target.classList[0] === 'stroke') {
        target = target.parentNode
      }
      target.classList.add('selected')
    },
    setIconClicked (e) {
      const icons = Array.from(document.getElementsByClassName('icon'))
      icons.forEach((i) => {
        if (i.classList.contains('selected')) {
          i.classList.remove('selected')
        }
      })
      let target = e.target
      if (target.classList.length === 0) {
        target = target.parentNode
      }
      target.classList.add('selected')
    },
    selectImgFile () {
      let fileInput = this.$refs.fileInput
      let imgFile = fileInput.files

      if (imgFile && imgFile[0]) {
        this.canvas.isDrawingMode = false
        let reader = new FileReader()

        reader.onload = e => {
          const imageUrl = e.target.result
          fabric.Image.fromURL(imageUrl, (img) => {
            const imgFit = img.set(
              {
                left: 0,
                top: 0,
                width: img.width,
                height: img.height
              })
            this.canvas.add(imgFit)
          })
        }
        reader.readAsDataURL(imgFile[0])
        this.$emit('fileInput', imgFile[0])
      }
    },
    downloadImage (date) {
      const ext = 'png' // todo: background 투명->shadow
      const base64 = this.canvas.toDataURL({
        format: ext,
        enableRetinaScaling: true
      })

      // save the image to storage
      const uid = localStorage.getItem('user')
      const path = 'diary/' + uid + '/' + date
      const imageRef = ref(this.$storage, path)
      uploadString(imageRef, base64, 'data_url').then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          // emit image link to parent (Diary.vue)
          this.$emit('imageRef', url)
        })
        console.log('image uploaded to firebase storage!')
      })
    }
  }

}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.canvas-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 100%;
}

#sketch {
  border-radius: 10px;
  box-shadow: 2px 2px 7px 0px rgba(201, 201, 201, 1);
  ;
  /* background-color: aqua; */
}

.col-box {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  width: 15%;
}

.row-box {
  display: flex;
  flex-direction: row;
}

.color-circle {
  width: 35px;
  height: 35px;
  border: 4px solid rgb(225, 225, 225);
  border-radius: 50%;
  cursor: pointer;
}

#addImage {
  width: 0px;
  visibility: hidden;
}

.stroke-box {
  margin-top: 10px;
  margin-bottom: 5px;
}

.stroke {
  background-color: black;
  width: 20px;
}

.icon {
  font-size: 1.2em;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 1px solid grey;
  padding: 0.4em;
  cursor: pointer;
}

.image-icon {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  font-size: 1.3em;
  width: 1.3em;
  height: 1.3em;
  cursor: pointer;
  margin-top: 5px;
}

.icon-box {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  cursor: pointer;
}

.selected {
  background-color: rgb(225, 225, 225);
}

.color-box {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
}

#chromePicker {
  position: absolute;
}

#clear {
  border-radius: 5px;
  background-color: white;
  border: 2px solid grey;
}
</style>
