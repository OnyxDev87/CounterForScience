const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1350
canvas.height = 630

let counter = 0
let trialList = []

// alert("Press space to add to the counter, press 'r' to reset it and save the value, press 'p' to clear all saved data")

function getAverage(list) {
  let sum = 0
  for (let i = 0; i < list.length; i++) {
    sum+= list[i]
  }
  return sum/list.length
}

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
    c.fillText(JSON.stringify(trialList[i]), 10, 125+(i*25))
  }

  if (trialList.length >= 20) {
    alert("The limit is 20 tests per list, I know its annoying, but deal with it. Just hit 'p' and keep going.")
    trialList.pop()
  }
  if (trialList.length > 0) {
    c.font = '35px Arial'
    c.fillText("Average: " + getAverage(trialList), (canvas.width/2), 100)
  }
}

document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      counter++
    }
})

document.addEventListener("keydown", (event) => {
    if (event.key === "r") {
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