song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function gotPoses(results){
        console.log(results);
        leftWrist_score=results[0].pose.keypoints[9].score;
        console.log(leftWrist_score);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("LeftWristX="+leftWristX+"LeftWristY="+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+leftWristX+"rightWristY="+rightWristY);
        rightWrist_score=results[0].pose.keypoints[10].score;
        console.log(rightWrist_score);
    }
function modelLoaded(){
    console.log("Posenet is initialized!");
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(rightWrist_score>0.2){
    circle(rightWristX,rightWristY,20);
    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML="speed=0.5";
        song.rate(0.5);
    }else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML="speed=1";
        song.rate(1);
    }else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="speed=1.5";
        song.rate(1.5);
    }else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML="speed=2";
        song.rate(2);
    }else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML="speed=2.5";
        song.rate(2.5);
    }
    }

    if(leftWrist_score>0.2){
    circle(leftWristX,leftWristY,20);
    InNumber=Number(leftWristY);
    decimal_number=floor(InNumber);
    volume=decimal_number/500;
    document.getElementById("volume").innerHTML="Volume="+volume;
    song.setVolume(volume);
    }
}
function preload(){
    song=loadSound("music2.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}