const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

let counter = 0
let oldCount = 0

function animate() {
    window.requestAnimationFrame(animate)

    c.fillStyle = '#FF0066'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.fillStyle = 'black'
    c.font = '100px Arial'
    c.fillText('Counter: ' + counter, (canvas.width/2)-200, canvas.height/2)
    c.font = '50px Arial'
    c.fillText("Press 'r' to reset counter", 300, 100)
    c.font = '50px Arial'
    c.fillText("Old number: " + oldCount, 300, 200)
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