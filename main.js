let mobilenet;
let classifier;
let video;
let loss;

let upbutton;
let rightbutton;
let leftbutton;
let downbutton;
let pausebutton;
let trainbutton;

let upbuttonpressed;
let rightbuttonpressed;
let leftbuttonpressed;
let downbuttonpressed;
let pausebuttonpressed;

let endresults;

let upSelect;
let rightSelect;
let leftSelect;
let downSelect;

let trainstatus;
let trainingstat;

let speed = 5;

function setup() {

    /* 
    
    MAIN IDEA IS THAT WHEN PEOPLE TAKE PICTURE IT WILL ADD TO A CLASS AND THEN WE TRAIN THE PICTURE WHERE IT DIFFERENCIATE WHICH ONE IS WHICH AND THEN WE GET THE RESULTS
    
    */

    // CREATE CANVAS
    createCanvas(500, 500)

    // CREATE A CAPTURE
    video = createCapture(VIDEO);

    // Extract the already learned features from MobileNet
    mobilenet = ml5.featureExtractor('MobileNet', () => {
        console.log('Model Ready!!!')
    });

    // EXPLICITLY TELL HOW MANY CLASSES WE ARE USING
    mobilenet.numClasses = 5

    // Create a new classifier using those features and give the video we want to use
    classifier = mobilenet.classification(video, () => {
        console.log('Video Ready!!!')
    });

    // SET UP BUTTONS (CALL IT)
    setupButtons();

    // DEFAULT COUNTER
    rightbuttonpressed = 0;
    leftbuttonpressed = 0;
    upbuttonpressed = 0;
    downbuttonpressed = 0;
    pausebuttonpressed = 0;

    // STARTING POINT AND SCALE OF THE ELLIPSE
    ex = random(width);
    ey = random(width);
    es = 20;

    // VIDEO SIZE
    video.size(200, 200)

    upSelect = select(".upSelect")
    rightSelect = select(".rightSelect")
    leftSelect = select(".leftSelect")
    downSelect = select(".downSelect")

    trainstatus = select('.trainstatus')
    trainingstat = 'Not yet trained!'
}

function draw() {

    background(0)
    ellipse(ex, ey, es)

    upSelect.html('Number of pics taken (up): ' + upbuttonpressed)
    rightSelect.html('Number of pics taken (right): ' + rightbuttonpressed)
    leftSelect.html('Number of pics taken (left): ' + leftbuttonpressed)
    downSelect.html('Number of pics taken (down): ' + downbuttonpressed)
    trainstatus.html(trainingstat)


}

function setupButtons() {

    // CREATE BUTTON AND IF IT IS PRESSED, ADD THE IMAGE (WHICH IS THE VIDEO) TO THE CLASSIFIER
    upbutton = createButton('up')
    upbutton.mousePressed(() => {
        classifier.addImage('up')

        upbuttonpressed++
        console.log(upbuttonpressed)
    })

    // CREATE BUTTON AND IF IT IS PRESSED, ADD THE IMAGE (WHICH IS THE VIDEO) TO THE CLASSIFIER
    rightbutton = createButton('right')
    rightbutton.mousePressed(() => {
        classifier.addImage('right')

        rightbuttonpressed++
        console.log(rightbuttonpressed)
    })

    // CREATE BUTTON AND IF IT IS PRESSED, ADD THE IMAGE (WHICH IS THE VIDEO) TO THE CLASSIFIER
    leftbutton = createButton('left')
    leftbutton.mousePressed(() => {
        classifier.addImage('left')

        leftbuttonpressed++
        console.log(leftbuttonpressed)

    })

    // CREATE BUTTON AND IF IT IS PRESSED, ADD THE IMAGE (WHICH IS THE VIDEO) TO THE CLASSIFIER
    downbutton = createButton('down')
    downbutton.mousePressed(() => {
        classifier.addImage('down')

        downbuttonpressed++
        console.log(downbuttonpressed)

    })

    // CREATE BUTTON AND IF IT IS PRESSED, ADD THE IMAGE (WHICH IS THE VIDEO) TO THE CLASSIFIER
    pausebutton = createButton('pause')
    pausebutton.mousePressed(() => {
        classifier.addImage('pause')

        pausebuttonpressed++
        console.log(pausebuttonpressed)

    })

    // TRAIN FROM THE PICTURES COLLECTED
    trainbutton = createButton('Train')
    trainbutton.mousePressed(() => {

        trainingstat = 'Training...'

        // ASK THE CLASSIFIER TO TRAIN AND CALL WHILETRAINING WHILE ITS DOING IT
        classifier.train(whileTraining)
    })


}

function whileTraining(loss) {

    // HIDES THE VIDEO
    video.hide()

    // AFTER THE TRAINING, IT WILL CONSOLE LOG NULL, MEANING THAT NULL = DONE TRAINING
    if (loss == null) {
        console.log('Done training!')
        trainingstat = 'DONE TRAINING!'

        // CLASSIFY FROM THE TRAINING AND CALL THE GOT RESULTS
        classifier.classify(gotResults)
    } else {
        console.log(loss)
    }
}

function gotResults(error, results) {

    // RESULTS IS HERE
    endresults = results
    classifier.classify(gotResults)

    console.log(endresults)

    // CASE THE END RESULTS (FOR THE GAME)
    switch (endresults) {
        case 'up':
            speed = 5
            ey -= speed;
            break;

        case 'right':
            speed = 5
            ex += speed;
            break;

        case 'left':
            speed = 5
            ex -= speed;
            break;

        case 'down':
            speed = 5
            ey += speed;
            break;

        case 'pause':
            speed = 0
            break;
    }

}