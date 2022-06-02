<template>
  <div class="container">
    <canvas id="sketch" width="500" height="300"></canvas>
    <div class="row-box">
      <input
        type="range"
        id="strokeRange"
        min="2"
        max="8"
        step="3"
        v-model="strokeSize"/>
      <div class="stroke " style="width: 5px; height: 5px"></div>
      <div class="stroke" style="width: 10px; height: 10px"></div>
      <div class="stroke" style="width: 15px; height: 15px"></div>
      <font-awesome-icon icon="fa-solid fa-paintbrush" class="icon"/>
      <font-awesome-icon icon="fa-solid fa-arrow-pointer" class="icon"/>
      <button id="brush" v-on:click="setDrawType(true)">brush</button>
      <button id="select" v-on:click="setDrawType(false)">select</button>
      <button id="clear" v-on:click="clearCanvas">clear</button>
      <div ref="colorPicker">
        <div class="color-circle" @click="clickPicker" style="background-color: #000"></div>
        <Chrome id="chromePicker" v-model="colorPick" v-if="displayPicker"></Chrome>
      </div>
    </div>
    <div class="button">
      <label for="addImage">
        👉 Add Image 👈
      </label>
    </div>
    <input
      id="addImage"
      ref="fileInput"
      type="file"
      accept="image/*"
      @input="selectImgFile">
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { Chrome } from 'vue-color'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaintBrush, faArrowPointer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// declare icons to use
library.add(faPaintBrush, faArrowPointer)

export default {
  components: {
    Chrome,
    FontAwesomeIcon
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
    //
    canvasFill () {
      if (this.isFill) {
        this.ctx.fillStyle = this.strokeColor
        this.ctx.fillRect(0, 0, 500, 300)
      }
    },
    //
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
              {left: 0,
                top: 0,
                width: img.width,
                height: img.height})
            this.canvas.add(imgFit)
          })
        }
        reader.readAsDataURL(imgFile[0])
        this.$emit('fileInput', imgFile[0])
      }
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

    var strokeRange = document.getElementById('strokeRange')
    strokeRange.addEventListener('input', () => {
      this.canvas.freeDrawingBrush.width = parseInt(this.strokeSize, 10)
    })
  },
  watch: {
    'colorPick': 'setColor'
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
#sketch {
  border-radius: 10px;
  box-shadow: 2px 2px 7px 0px rgba(201,201,201,1);;
}
.row-box {
  display: flex;
  flex-direction: row;
}
.color-circle {
  width: 40px;
  height: 40px;
  border: 4px solid rgb(216, 216, 216);
  border-radius: 50%;
}
#addImage {
  visibility: hidden;
}
.stroke {
  background-color: black;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.icon {
  font-size: 1.2em;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 1px solid grey;
  padding: 0.4em
}
</style>
