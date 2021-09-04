const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

let mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener("mousemove", function (evt) {
	mouse.x = evt.x;
	mouse.y = evt.y;
});

let circleArray = [];

let colors = ["#eeec82", "#d6a0b5", "#F3F3F3", '#fff'];   //#4500EE

class Circle {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.dx = randomInt(-3, 3);
		this.dy = randomInt(-3, 3);
		this.radius = radius;
		this.opacity = 1;
		this.color = color;
		this.maxRadius = 20;
		this.minRadius = radius;
	}

	draw() {
		this.grow();
		this.move();

		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
	}

	grow() {
		if (this.x + 20 >= mouse.x
			&& this.x - 20 <= mouse.x
			&& this.y - 20 <= mouse.y
			&& this.y + 20 >= mouse.y
			&& this.radius <= this.maxRadius) {
			this.radius++;
		} else if (this.radius >= this.minRadius) {
			this.radius--;
		}
	}

	move() {
		this.x += this.dx;
		this.y += this.dy;

		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		// circleArray.forEach((circle) => {
		// 	if (this != circle) {
		// 		if (this.x + this.radius > circle.x + circle.radius || this.x - this.radius < circle.x - circle.radius) {
		// 			this.dx = -this.dx;
		// 		}

		// 		if (this.y + this.radius > circle.y + circle.radius || this.y - this.radius < circle.y - circle.radius) {
		// 			this.dy = -this.dy;
		// 		}
		// 	}
		// });
	}
}

for (let i = 0; i < 100; i++) {
	let circle = new Circle(randomInt(0, canvas.width), randomInt(0, canvas.height), randomInt(5, 6), colors[randomInt(0, colors.length)]);
	circleArray.push(circle);
}

function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	circleArray.forEach(function (circle) {
		circle.draw();
	});

	requestAnimationFrame(update);
}

update();

function randomInt(min, max) {
	return Math.floor(Math.random() * max + min);
}