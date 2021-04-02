img = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(580, 320);
    canvas.position(392, 220);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("statuso").innerHTML = "STATUS : DETECTING OBJECTS";
}

function preload() {
    img = loadImage("bottle.jpg");
}

function draw() {
    image(img, 0, 0, 580, 320);

    if(status != "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("statuso").innerHTML = "STATUS : DETECTED OBJECTS";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("OBJECT DETECTOR NAME : COCOSSD, STATUS : MODEL SUCCESSFULY LOADED");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;

}