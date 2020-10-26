<template>
  <div id="traffic_color" style="width:50px;height:50px;"></div>
</template>
<script>
export default {
  name: 'test',
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    sleep(duration) {
      return new Promise((resolve) => {
        setTimeout(resolve, duration)
      })
    },
    async changeColor(duration, color) {
      let ele = document.getElementById('traffic_color')
      ele.style.background = color
      await this.sleep(duration)
    },
    async init() {
      while (true) {
        await this.changeColor(3000, 'green')
        await this.changeColor(1000, 'yellow')
        await this.changeColor(2000, 'red')
      }
    }
  }
}
</script>
