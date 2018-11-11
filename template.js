let mobilenet;
let classifier;
let video;
let loss;

let upbutton;
let rightbutton;
let leftbutton;
let downbutton;
let trainbutton;

// TRACK HOW MANY PICTURES IS TAKEN (BY INCREMENTING EVERYTIME THE BUTTON IS PRESSED)
let upbuttonpressed;
let rightbuttonpressed;
let leftbuttonpressed;
let downbuttonpressed;

function setup() {

    /* 
    
    MAIN IDEA IS THAT WHEN PEOPLE TAKE PICTURE IT WILL ADD TO A CLASS AND THEN WE TRAIN THE PICTURE WHERE IT DIFFERENCIATE WHICH ONE IS WHICH AND THEN WE GET THE RESULTS. (GO THROUGH THE PROCESS OF THIS BY FINDING (ONE,TWO,THREE AND ETC))
    
    */
    
    // CREATE CANVAS
    createCanvas(500, 500)

    // CREATE A CAPTURE
    video = createCapture(VIDEO);

    // ONE
    // Extract the already learned features from MobileNet (MAKE SURE THAT THE MODEL IS READY!)
    mobilenet = ml5.featureExtractor('MobileNet', () => {
        console.log('Model Ready!!!')
    });

    // EXPLICITLY TELL HOW MANY CLASSES WE ARE USING
    mobilenet.numClasses = 4

    // TWO
    // Create a new classifier using those features and give the video we want to use (AND TELL WHEN THE VIDEO IS READY)
    classifier = mobilenet.classification(video, () => {
        console.log('Video Ready!!!')
    });

    // 3
    // SET UP BUTTONS (CALL IT) (and also configure the classes)
    setupButtons();

    // DEFAULT COUNTER
    rightbuttonpressed = 0;
    leftbuttonpressed = 0;
    upbuttonpressed = 0;
    downbuttonpressed = 0;

    // STARTING POINT AND SCALE OF THE ELLIPSE
    ex = 100;
    ey = 100;
    es = 20;

    // VIDEO SIZE
    video.size(200, 200)
    
}

function draw() {
    background(0)
}


function setupButtons() {
    // FOUR
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

    // FIVE
    // TRAIN FROM THE PICTURES COLLECTED
    trainbutton = createButton('Train')
    trainbutton.mousePressed(() => {

        // ASK THE CLASSIFIER TO TRAIN AND CALL WHILETRAINING WHILE ITS DOING IT
        classifier.train(whileTraining)
    })


}

// SIX
function whileTraining(loss) {

    // AFTER THE TRAINING, IT WILL CONSOLE LOG NULL, MEANING THAT NULL = DONE TRAINING
    if (loss == null) {
        console.log('Done training!')
        // CLASSIFY FROM THE TRAINING AND CALL THE GOT RESULTS
        classifier.classify(gotResults)
    } else {
        console.log(loss)
    }
}

// SEVEN
function gotResults(error, results) {

    classifier.classify(gotResults)
    
    // RESULTS IS HERE
    console.log(results)
}