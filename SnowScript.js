
/* ========================================
   PSMBR - SNOW SCRIPT
   Optimised Continuous Snowfall
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.createElement("canvas");
    canvas.id = "snow-canvas";

    Object.assign(canvas.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "9999"
    });

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d", {
        alpha: true
    });

    let width, height;
    let snowflakes = [];

    // Snowflake quantity
    const SNOW_COUNT = window.innerWidth < 768 ? 150 : 450;

    // Snowflake colour
    const SNOW_COLOUR = "#f7f4ed";

    // Resize canvas
    function resizeCanvas() {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Snowflake class
    class Snowflake {

        constructor(initial = false) {
            this.reset(initial);
        }

        reset(initial = false) {

            this.x = Math.random() * width;
            this.y = initial ? Math.random() * height : -10;

            // Small snowflake sizes
            this.radius = Math.random() * 0.9 + 0.3;

            // Falling speed
            this.speed = Math.random() * 2.5 + 1;

            // Sideways movement
            this.wind = Math.random() * 0.6 - 0.3;

            // Visibility
            this.opacity = Math.random() * 0.45 + 0.4;

            this.sway = Math.random() * 0.02 + 0.005;
            this.phase = Math.random() * Math.PI * 2;
        }

        update() {

            this.phase += this.sway;

            this.y += this.speed;
            this.x += this.wind + Math.sin(this.phase) * 0.4;

            if (this.y > height + 10) {
                this.reset();
            }

            if (this.x > width + 10) this.x = -10;
            if (this.x < -10) this.x = width + 10;
        }

        draw() {

            ctx.globalAlpha = this.opacity;

            ctx.beginPath();
            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = SNOW_COLOUR;
            ctx.fill();
        }
    }

    // Create snowflakes
    for (let i = 0; i < SNOW_COUNT; i++) {
        snowflakes.push(new Snowflake(true));
    }

    // Animation
    function animate() {

        ctx.clearRect(0, 0, width, height);

        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
        });

        ctx.globalAlpha = 1;

        requestAnimationFrame(animate);
    }

    animate();

});
