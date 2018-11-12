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

let resultstatus;

let takenPicsUp;
let takenPicsRight;
let takenPicsLeft;
let takenPicsDown;
let pausebuttonpressed;

let endresults;

let trainstatus;
let trainingstat;

let speed = 5;

let picsup;
let picsdown;
let picsleft;
let picsright;

let posx;
let posy;
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
    takenPicsRight = 0;
    takenPicsLeft = 0;
    takenPicsUp = 0;
    takenPicsDown = 0;
    pausebuttonpressed = 0;

    // STARTING POINT AND SCALE OF THE ELLIPSE
    ex = random(width);
    ey = random(width);
    es = 20;

    // VIDEO SIZE
    video.size(200, 200)

    picsup = select(".pics-up")
    picsdown = select(".pics-down")
    picsleft = select(".pics-left")
    picsright = select(".pics-right")
    trainstatus = select(".train-status")

    resultstatus = select(".result-status")

    posx = select('.posx')
    posy = select('.posy')
    
    trainingstat = 'Not yet trained!'
}

function draw() {

    background(0)
    ellipse(ex, ey, es)

    if(ex >= width || ex <= 0){
        ex = random(width)
        ey = random(height)
    }

    if(ey >= height || ey <= 0){
        ex = random(width)
        ey = random(height)
    }
    
    picsup.html(takenPicsUp)
    picsdown.html(takenPicsDown)
    picsleft.html(takenPicsLeft)
    picsright.html(takenPicsRight)
    trainstatus.html(trainingstat)

    posx.html(ex)
    posy.html(ex)


}

function setupButtons() {

    // CREATE BUTTON AND IF IT IS PRESSED, ADD THE IMAGE (WHICH IS THE VIDEO) TO THE CLASSIFIER
    upbutton = createButton('up')
    upbutton.mousePressed(() => {
        classifier.addImage('up')

        takenPicsUp++
        console.log(takenPicsUp)
    })

    // CREATE BUTTON AND IF IT IS PRESSED, ADD THE IMAGE (WHICH IS THE VIDEO) TO THE CLASSIFIER
    downbutton = createButton('down')
    downbutton.mousePressed(() => {
        classifier.addImage('down')

        takenPicsDown++
        console.log(takenPicsDown)

    })
    // CREATE BUTTON AND IF IT IS PRESSED, ADD THE IMAGE (WHICH IS THE VIDEO) TO THE CLASSIFIER
    leftbutton = createButton('left')
    leftbutton.mousePressed(() => {
        classifier.addImage('left')

        takenPicsLeft++
        console.log(takenPicsLeft)

    })
    // CREATE BUTTON AND IF IT IS PRESSED, ADD THE IMAGE (WHICH IS THE VIDEO) TO THE CLASSIFIER
    rightbutton = createButton('right')
    rightbutton.mousePressed(() => {
        classifier.addImage('right')

        takenPicsRight++
        console.log(takenPicsRight)
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

    // AFTER THE TRAINING, IT WILL CONSOLE LOG NULL, MEANING THAT NULL = DONE TRAINING
    if (loss == null) {

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

    resultstatus.html(endresults)

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