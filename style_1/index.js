const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let atoms = [];

canvas.addEventListener('mousemove', function (e) {
    for (let i = 0; i < 1; i++) {
        atoms.push(new Atom(e.x, e.y));
    }
});

const animate = () => {
    atoms.forEach((atom, index) => {
        atom.draw();
        atom.updateSpeed();
        atom.updateSize();
        atom.updateColor();

        if (atom.radius < 0.3) {
            atoms.splice(index, 1);
        }
    });

    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    requestAnimationFrame(animate);
};

animate();

class Atom {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 8 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color = getRandomColor();
    }

    updateSpeed() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    updateSize() {
        this.radius -= 0.01;
    }

    updateColor() {
        this.color = getRandomColor();
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}