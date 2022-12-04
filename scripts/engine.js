// How often will the update function from game.js be executed
let updateTime;

// Create global variables
let mouseX, mouseY, key_left, key_up, key_right, key_down, key_a, key_z, isKeyPressed;

// More global variables
let canvas, context;

// Fullscreen flag
let endlessCanvas = false;

// Access to functions, created in game.js
var update, draw, mouseup, mousemove, mousedown, keyup, keydown, init;

const reqAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    setTimeout(callback, 1000 / 30);
};


// Custom image class - sets imgObj.img.src after imgObj.draw() has been called
class MyImage {
    constructor(src_, backupColor_) {
        this.src = src_;
        this.backupColor = backupColor_;

        // Create image object with no source path
        this.img = new Image();
        this.canDraw = false;
        this.drawBackup = false;

        this.img.onload = () => {
            this.canDraw = true;
        }
        this.img.onerror = () => {
            this.canDraw = false;
            this.drawBackup = true;
            throw "Unable to load image " + this.src;
        }

    }
    draw(x, y, xs, ys) {
        if (xs == undefined) {
            xs = this.img.width | 100;
            ys = this.img.height | 100;
        }
        // If img.src is undefined - set it
        if (!this.img.src) {
            // Load image
            this.img.src = this.src;
        } else if (this.canDraw) {
            try {
                context.drawImage(this.img, x, y, xs, ys);
            } catch (e) {
                this.canDraw = false;
                this.drawBackup = true;
                throw e;
            }
        } else if (this.drawBackup) {
            context.fillStyle = this.backupColor;
            context.fillRect(x, y, xs, ys);
        }
    }
}


function areColliding(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
    if (Bx <= Ax + Awidth) {
        if (Ax <= Bx + Bwidth) {
            if (By <= Ay + Aheight) {
                if (Ay <= By + Bheight) {
                    return 1;
                }
            }
        }
    }
    return 0;
};

function randomInteger(upTo) {
    return Math.floor(Math.random() * upTo);
}

function drawLine(startX, startY, endX, endY) {
    // For better performance bunch calls to lineTo without beginPath() and stroke() inbetween.
    context.beginPath(); // resets the current path
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
}

function tryToLoad(imageNameWithoutDotPng, backupColor) {
    return new MyImage("./images/" + imageNameWithoutDotPng + ".png", backupColor);
}

function tryToLoadWithFullPath(pathAndImageName, backupColor) {
    return new MyImage(pathAndImageName, backupColor);
}

function drawImage(myImageObject, x, y, xs, ys) {
    myImageObject.draw(x, y, xs, ys);
}

function isFunction(f) {
    return typeof (f) == "function";
}

function updateMousePosition(e) {
    let boundingRect = canvas.getBoundingClientRect();
    mouseX = e.pageX - boundingRect.x;
    mouseY = e.pageY - boundingRect.y;
}

function updateMousePositionTouchEvent(e) {
    let boundingRect = canvas.getBoundingClientRect();
    let touchobj = e.changedTouches[0];
    mouseX = touchobj.pageX - boundingRect.x;
    mouseY = touchobj.pageY - boundingRect.y;
}

function getCanvas() {
    // Get canvas element
    canvas = document.getElementById("canvas-id");

    if (endlessCanvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Change canvas.width and .height on browser resize
        window.onresize = function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
    } else {
        // Default canvas size
        canvas.width = 800;
        canvas.height = 600;
    }

    // Get 2d context
    context = canvas.getContext("2d");
    context.fillStyle = "#0000ff";
}

function attachEvents() {
    // Events for touchscreen devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        isMobile = true;
        window.addEventListener("touchstart", function (e) {
            // Update global mouseX, mouseY variables
            updateMousePositionTouchEvent(e);
            if (isFunction(mousedown)) {
                // Call mousedown from game.js if it exists
                mousedown();
            }
        });
        window.addEventListener("touchend", function (e) {
            updateMousePositionTouchEvent(e);
            if (isFunction(mouseup)) {
                mouseup();
            }
        });
        window.addEventListener("touchmove", function (e) {
            updateMousePositionTouchEvent(e);
        });
    }

    // Update global mouseX, mouseY variables
    window.addEventListener("mousemove", function (e) {
        updateMousePosition(e);
    });

    // Call mousemove, mouseup, mousedown function from game.js if they exist
    if (isFunction(mousemove)) {
        window.addEventListener("mousemove", mousemove);
    }
    if (isFunction(mouseup)) {
        window.addEventListener("mouseup", mouseup);
    }
    if (isFunction(mousedown)) {
        window.addEventListener("mousedown", mousedown);
    }

    // Update global isKeyPressed array
    window.addEventListener("keydown", function (e) {
        isKeyPressed[e.keyCode] = 1;
        if (isFunction(keydown)) {
            keydown(e.keyCode);
        }
    });
    window.addEventListener("keyup", function (e) {
        isKeyPressed[e.keyCode] = 0;
        if (isFunction(keyup)) {
            keyup(e.keyCode);
        }
    });
}
// Redraw will be executed many times
function redraw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.globalAlpha = 1;
    context.font = "10px Arial";
    context.fillStyle = "blue";
    context.textBaseline = "top";

    // Call draw function from game.js
    draw();


    // Call redraw after some time (the browser decides this time)
    reqAnimationFrame(redraw);
};

function initGlobalVariables() {
    updateTime = 10;
    mouseX = 0;
    mouseX = 0;
    mouseY = 0;
    key_left = 37;
    key_up = 38;
    key_right = 39;
    key_down = 40;
    key_a = 65;
    key_z = 90;
    isKeyPressed = new Array(256).fill(0);
}
function drawError() {
    // Draw error text on canvas 
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
    context.fillStyle = "#FF0000";
    context.font = "20px Arial";
    context.fillText("Press <F12> for error info!", 40, 40);
}
// Starts game when body element is loaded
function onBodyLoad() {

    initGlobalVariables();

    getCanvas();

    attachEvents();

    if (!isFunction(draw)) {
        // Draw error on canvas when function draw is not in game.js
        drawError();
        throw new TypeError("draw is not a function (in game.js)");
    }

    // Call programmers init function if it exists in game.js
    if (isFunction(init)) {
        init();
    }

    if (!isFunction(update)) {
        // Draw error on canvas when function update is not in game.js
        drawError();
        throw new TypeError("update is not a function (in game.js)");
    }
    redraw();
    setInterval(update, updateTime);
}