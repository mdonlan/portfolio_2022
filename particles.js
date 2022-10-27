// import * as PIXI from 'pixi.js'

const app = new PIXI.Application({ 
    width: window.innerWidth, 
    height: window.innerHeight,                       
    antialias: false, // perf
    transparent: false, // perf
    resolution: 1
});

app.renderer.view.style.width = '100%';
app.renderer.view.style.height = '100%';
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.backgroundColor = 0x1e1e1e;

let el = document.querySelector(".particles_container");
el.appendChild(app.view);
// document.body.appendChild(app.view);

// if(app.renderer instanceof PIXI.CanvasRenderer) {
//     console.log('canvas mode');
// } else {
//     console.log('webgl mode');
// }

const particles = [];
const num_particles = 100;
const max_distance = 150;

let particle_texture = null;

// PIXI.loader
// .load(setup);

// const loader = PIXI.Loader.shared;
setup();

function create_particle(id) {
    const particle = {
        id: id,
        velocity: { x: Math.floor(Math.random() * 6) - 3, y: Math.floor(Math.random() * 6) - 3},
        position: { x: Math.floor(Math.random() * window.innerWidth), y: Math.floor(Math.random() * window.innerHeight) },
        sprite: new PIXI.Sprite(particle_texture),
        color: null,
    }

    particle.sprite.position = particle.position;
    
    particles.push(particle);
    
    app.stage.addChild(particle.sprite)
}

function create_particle_texture() {
    let color = "0xffffff";
    // create particle graphic and turn it into a texture
    const circle  = new PIXI.Graphics();
    circle.beginFill(color);
    circle.lineStyle(0);
    circle.drawCircle(0, 0, 3);
    circle.endFill();
    // particle_texture = circle.generateCanvasTexture();
    particle_texture = app.renderer.generateTexture(circle);
}

// function create_particles() {
//     let color = "0xffffff";
//     // create particle graphic and turn it into a texture
//     const circle  = new PIXI.Graphics();
//     circle.beginFill(color);
//     circle.lineStyle(0);
//     circle.drawCircle(0, 0, 3);
//     circle.endFill();
//     const texture = circle.generateCanvasTexture();

//     for (let i = 0; i < num_particles; i++) {
//         particles.push(create_particle(i, texture));
//         particles[i].sprite.position = particles[i].position;
//         app.stage.addChild(particles[i].sprite)
//     }
// }

const graphics = new PIXI.Graphics(); // true turns on native lines, is it better/faster???
app.stage.addChild(graphics);   
console.log(graphics);

function move_particles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].position.x += particles[i].velocity.x;
        particles[i].position.y += particles[i].velocity.y;

        const r = particles[i].position.x / window.innerWidth * 255;
        const g = particles[i].position.y / window.innerHeight * 255;
        const b = 255;
        particles[i].sprite.tint = rgb_to_hex(r, g, b);

        if (particles[i].position.x >= window.innerWidth - 3) particles[i].velocity.x *= -1;
        if (particles[i].position.x <= 0) particles[i].velocity.x *= -1;
        if (particles[i].position.y >= window.innerHeight - 3) particles[i].velocity.y *= -1;
        if (particles[i].position.y <= 0) particles[i].velocity.y *= -1;

        particles[i].sprite.position = particles[i].position;
    }
}

function get_distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function rgb_to_hex(r, g, b) {
    return "0x" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function draw_lines() {
    graphics.clear();
    graphics.lineStyle(1, 0xffffff, 1);

    for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < particles.length; j++) {
            if (particles[i].id != particles[j].id) {
                const dist = get_distance(particles[i].position, particles[j].position);
                if (dist < max_distance) {

                    const r = particles[i].position.x / window.innerWidth * 255;
                    const g = particles[i].position.y / window.innerHeight * 255;
                    const b = 255;
                    

                    const dist_percent_max = (max_distance - dist) / max_distance;
                    // graphics.alpha = dist_percent_max;
                    graphics.lineStyle(1, rgb_to_hex(r, g, b), dist_percent_max);
                    graphics.moveTo(particles[i].position.x + 3, particles[i].position.y + 3);
                    graphics.lineTo(particles[j].position.x + 3, particles[j].position.y + 3);
                    // graphics.graphicsData[graphics.graphicsData.length - 1].lineAlpha = dist_percent_max;
                }
            }
        }
    }

    // .closePath()
    graphics.endFill();
}

function update() {
    move_particles();
    draw_lines();
}

function setup() {
    create_particle_texture();

    const spawn_interval = setInterval(() => {
        if (particles.length <= num_particles) {
            create_particle(particles.length);
        } else {
            clearInterval(spawn_interval);
        }
    }, 100)

    app.ticker.add(update)
}