const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1350
canvas.height = 630

let counter = 0
let trialList = []
let Xoffset = [10]
let Yoffset = [0]

// alert("Press space to add to the counter, press 'r' to reset it and save the value, press 'p' to clear all saved data")
// alert("I MADE CHANGES AND IT IS A LITTLE GLITCHY RIGHT NOW-Miles")

function animate() {
  window.requestAnimationFrame(animate)

  c.fillStyle = '#1e1e1e'
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.fillStyle = '#d3d3d3'
  c.font = '75px Arial'
  c.fillText('Counter: ' + counter, 0, 60)
  c.font = '25px Arial'
  c.fillText("Previous Trials:", 0, 100)
  for (let i = 0; i < trialList.length; i++) {
    c.fillText(JSON.stringify(trialList[i]), Xoffset[i], 125+(Yoffset[i]*25))

    if (125+(Yoffset[i]*25) >= canvas.height) {
      Yoffset.push(0)
      Xoffset.push(300)
    }
  }
}

document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      counter++
    }
})

document.addEventListener("keydown", (event) => {
    if (event.key === "r") {
      Yoffset++
      trialList.push(counter)
      counter = 0
    }
})

document.addEventListener("keydown", (event) => {
  if (event.key === "p") {
      trialList = []
      counter = 0
  }
})

animate()