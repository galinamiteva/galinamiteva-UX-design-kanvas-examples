const TAU = 2 * Math.PI;

class Circle {
  constructor(canvas) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 8;
    this.growth = Math.random() * 4;
    this.decay = Math.max(Math.random() * 0.005, 0.0005);
    this.rgb = [
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
    ];
    this.alpha = Math.random() * 0.35;
  }
  
  get fillStyle() {
    return `rgba(${this.rgb.join(',')},${this.alpha})`;
  }
  
  render(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.fillStyle;
    ctx.arc(this.x, this.y, this.r, 0, TAU);
    ctx.fill();
    
    this.r += this.growth;
    this.alpha -= this.decay;
  }
}

function render(ctx, foreground, circles = []) {
  const { width, height } = foreground.getBoundingClientRect();
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  ctx.clearRect(0, 0, width, height);
  
  if (circles.length === 0) {
    circles.push(new Circle(ctx.canvas));
  }
  
  if (Math.random() > 0.98) {
    circles.push(new Circle(ctx.canvas));
  }
  
  for (const circle of circles) {
    circle.render(ctx);
  }
  
  window.requestAnimationFrame(() => {
    render(ctx, foreground, circles.filter(circle => circle.alpha > 0))
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const foreground = document.querySelector(".foreground");

  render(canvas.getContext("2d"), foreground);
});