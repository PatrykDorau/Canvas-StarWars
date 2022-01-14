import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})
let mousedown = false
addEventListener('mousedown', () => {
 mousedown = true
})
addEventListener('mouseup', () => {
 mousedown = false
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.shadowColor = this.color
    c.shadowBlur = 15
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 600; i++) {
    const canvasWidth = canvas.width+ 1000
    const canvasHeight = canvas.height+ 1000
    const x = (Math.random() * canvasWidth) - canvasWidth / 2
    const y = (Math.random() * canvasHeight) - canvasHeight / 2
    const radius = Math.random() * 2
    const color = colors[Math.floor(Math.random() * colors.length)]
     particles.push(new Particle(x, y, radius, color))
  }
  alert("Hold left mouse button")
}

// Animation Loop
let radians = 0
let alpha = 1
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(10, 10, 10, ${alpha})`
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()
  c.translate(canvas.width / 2, canvas.height / 2)
  c.rotate(radians)
  particles.forEach(particle => {
    particle.update()
   })
  c.restore()

  radians+= 0.002
  if(mousedown){
    radians += 0.004
  }
  if(mousedown && alpha >= 0.001){
    alpha -= 0.005
  }else if(!mousedown && alpha < 1){
    alpha += 0.001
  }
}

init()
animate()
