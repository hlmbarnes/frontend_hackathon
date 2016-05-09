const c1 = document.querySelector("#left")
const c2 = document.querySelector("#right")

const width = c1.width
const height = c1.height

c2.width = width
c2.height = height

const ctx1 = c1.getContext("2d")
const ctx2 = c2.getContext("2d")

// ctx1.style.transition = "fill 5s ease"
// ctx2.style.transition = "fill 5s ease"
ctx1.fillStyle = "black"
ctx2.fillStyle = "black"

// ctx1.set



const minRadius = 15
const maxRadius = 80
const minLength = 45
const maxLength = 90
const minV = .4
const maxV = .5
const spotNumber = 15

const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

const spots = Array.from({ length: spotNumber }).map(() => {
  const length = clamp(Math.random() * maxLength, minLength, maxLength)
  return new Spot(Math.round(length))
})
console.log(spots);

function Spot(length) {
  const a = 2 * Math.PI / length
  
  this.length = length
  this.radius = clamp(Math.random() * maxRadius, minRadius, maxRadius)
  this.start = {
    x: clamp(Math.random() * width, this.radius, width - this.radius),
    y: clamp(Math.random() * height, this.radius, height - this.radius),
  }
  this.points = Array.from({ length }).map((_, index) => ({
    x: this.start.x + this.radius * Math.cos(index * a) + Math.random() * 15,
    y: this.start.y + this.radius * Math.sin(index * a) + Math.random() * 15,
  }))
  
  this.setPoint = (index, point) => {
    this.points[index] = point
  }
}

function draw() {
  ctx1.clearRect(0, 0, width, height)
  ctx2.clearRect(0, 0, width, height)
  
  spots.forEach((spot) => {

    ctx1.beginPath()
    ctx2.beginPath()
    
    spot.points.forEach(({ x, y }, i) => {
      let vx = clamp(Math.random() * maxV, minV, maxV)
      let vy = clamp(Math.random() * maxV, minV, maxV)
      
      if (Math.random() > .5) {
        vx = -vx
        vy = -vy
      }
      
      x = clamp(x + vx, 0, width)
      y = clamp(y + vy, 0, height)
      
      spot.setPoint(i, { x, y })
      
      if (i === 0) {
        ctx1.moveTo(x, y)
        ctx2.moveTo(x, y)
      } else {
        ctx1.lineTo(x, y)
        ctx2.lineTo(x, y)
      }
    })
    
   
    ctx1.fill()
    ctx2.fill()
    ctx1.closePath()
    ctx2.closePath()
  })
}

function getRandomInt() {
      return Math.floor(Math.random() * 7);
    }

    const colors = ['#2d2d86', '#262673', '#202060', '#19194d', '#131339', '#0d0d26', '#060613', '#000000'];

    setInterval(function(){
      var color = colors[getRandomInt()];
      ctx1.fillStyle = color;
      ctx2.fillStyle = color;
    }, 5000)

function update() {
  draw()
  requestAnimationFrame(update)
}

update()