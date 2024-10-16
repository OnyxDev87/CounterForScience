const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1350
canvas.height = 630

let counter = 0
let oldCount = 0

alert("Press space to add to the counter, press 'r' to reset it and save the value")

function animate() {
    window.requestAnimationFrame(animate)

    c.fillStyle = '#1e1e1e'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.fillStyle = '#d3d3d3'
    c.font = '100px Arial'
    c.fillText('Counter: ' + counter, (canvas.width/2)-c.measureText('Counter: ').width, canvas.height/2)
    c.font = '50px Arial'
    c.fillText("Old number: " + oldCount, (canvas.width/2)-c.measureText('Counter: ').width, (canvas.height/2)-100)
}

document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      counter++
    }
  })

document.addEventListener("keydown", (event) => {
    if (event.key === "r") {
        oldCount = counter
        counter = 0
    }
})

animate()