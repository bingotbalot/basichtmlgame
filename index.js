
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth //taking the full width of the screen
canvas.height = innerHeight

const gravity = 0.5 // the speed of the dropping of the player/ character
class Player{
    constructor(){  //player creation
        this.position = {
            x: 100,
            y: 100
        }
        //adding velocity to the player, this is the one that pushes the player to move
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }
    draw(){ //drawing the player of what it looks like
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    //changes the property of the player at a time
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //condition to drop the player and after drop stay in place by the end of the canvas
        if(this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity      
        else this.velocity.y = 0
    }
}

class Platform{
    constructor({x, y}){
        this.position = {
            x,
            y
        }
        this.width = 200
        this.height = 20
    }
    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//implement player class
const player = new Player()
const platforms = [new Platform({x:200, y:400}), new Platform({x: 400, y: 500})]

const keys = {
    right:{
        pressed: false
    },
    left:{
        pressed: false
    }
}

let scrollOffset = 0
//animation to keep the player moving
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height) //clear the canvas but allows to call the player and maintain shape
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })

    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    } else  if (keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
        
        if(keys.right.pressed){
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
            
        } else if (keys.left.pressed){
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
            
        }
    }

    console.log(scrollOffset)

    //platform collision detection
    platforms.forEach(platform => {
    if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0
    }})

    if(scrollOffset > 2000){
        console.log ('You win')
    }
    
}

animate()

//keyboard events
addEventListener('keydown', ({keyCode}) => {
    switch (keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = true
            break
        case 68:
            console.log('right')
            keys.right.pressed = true
            break
        case 87:
            console.log('up')
            player.velocity.y -= 10
            break
        case 83:
            console.log('down')
            break
    }

})

addEventListener('keyup', ({keyCode}) => {
    switch (keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            break
        case 87:
            console.log('up')
            player.velocity.y -= 10
            break
        case 83:
            console.log('down')
            break
    }

})