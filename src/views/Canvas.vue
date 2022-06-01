<template>
  <div>
    <canvas id="canvas" width="500" height="300"></canvas>
    <input
      type="range"
      id="strokeRange"
      min="0.5"
      max="5"
      step="0.1"
      v-model="strokeSize"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDrawing: false,
      strokeSize: 2.5
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

    var strokeRange = document.getElementById('strokeRange')
    strokeRange.addEventListener('input', this.changeStrokeSize)
  }
}
</script>

<style scoped>
#canvas {
  border: 1px solid #000;
}
</style>
