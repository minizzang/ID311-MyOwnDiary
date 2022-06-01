<template>
  <div class="container">
    <canvas id="canvas" width="500" height="300"></canvas>
    <div class="row-box">
      <input
        type="range"
        id="strokeRange"
        min="0.5"
        max="10"
        step="0.1"
        v-model="strokeSize"/>
      <button id="brush" v-on:click="setDrawType($event)">brush</button>
      <button id="fill" v-on:click="setDrawType($event)">fill</button>
      <div id="black" class="color" style="background-color: #000"></div>
      <div id="white" class="color" style="background-color: #fff"></div>
      <div id="red" class="color" style="background-color: rgb(255, 45, 45)"></div>
    </div>
    <input
      class="form-control"
      ref="fileInput"
      type="file"
      id="formFileLg"
      @input="selectImgFile">
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDrawing: false,
      isFill: false, // brush: true, fill: false
      strokeSize: 3,
      strokeColor: 'rgb(0,0,0)'
    }
  },
  methods: {
    startDrawing () {
      this.isDrawing = true
    },
    stopDrawing () {
      this.isDrawing = false
    },
    mouseMove (event) {
      const x = event.offsetX
      const y = event.offsetY

      if (!this.isDrawing) {
        this.ctx.beginPath() // start new line
        this.ctx.moveTo(x, y) // start point
      } else {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
      }
    },
    changeStrokeSize () {
      const size = this.strokeSize
      this.ctx.lineWidth = size
    },
    setColor (event) {
      this.strokeColor = event.currentTarget.style.backgroundColor
      this.ctx.strokeStyle = this.strokeColor
    },
    setDrawType (event) {
      const type = event.currentTarget.id
      if (type === 'fill') {
        this.isFill = true
      } else {
        this.isFill = false
      }
    },
    canvasFill () {
      if (this.isFill) {
        this.ctx.fillStyle = this.strokeColor
        this.ctx.fillRect(0, 0, 500, 300)
      }
    },
    selectImgFile () {
      let fileInput = this.$refs.fileInput
      let imgFile = fileInput.files

      if (imgFile && imgFile[0]) {
        let reader = new FileReader()

        reader.onload = e => {
          const image = new Image()
          image.src = e.target.result
          image.onload = () => {
            this.ctx.drawImage(image, 0, 0)
          }
        }
        reader.readAsDataURL(imgFile[0])
        this.$emit('fileInput', imgFile[0])
      }
    }
  },
  mounted () {
    var canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')
    this.ctx.lineWidth = this.strokeSize

    canvas.addEventListener('mousemove', this.mouseMove)
    canvas.addEventListener('mousedown', this.startDrawing)
    canvas.addEventListener('mouseup', this.stopDrawing)
    canvas.addEventListener('mouseleave', this.stopDrawing)
    canvas.addEventListener('click', this.canvasFill)

    var strokeRange = document.getElementById('strokeRange')
    strokeRange.addEventListener('input', this.changeStrokeSize)

    const colors = document.getElementsByClassName('color')
    Array.from(colors).forEach((color) =>
      color.addEventListener('click', this.setColor))
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
#canvas {
  border: 1px solid #000;
}
.row-box {
  display: flex;
  flex-direction: row;
}
.color {
  width: 40px;
  height: 40px;
  border: 4px solid rgb(216, 216, 216);
  border-radius: 50%;
}
</style>
