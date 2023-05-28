song1= "";
song2="";
song1_status = "";
song2_status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload()
{
  song1 = loadSound("music.mp3");
  song2 = loadSound("music2.mp3");

}
function setup()
{
  canvas = createCanvas(650,550);
  canvas.center()
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
  console.log("PoseNet is initialized");
}

function gotPoses(results) 
{
if (results.length > 0)
{
  console.log(results);
  leftWristX = results[0].pose.leftWrist.x;
  leftWristY = results[0].pose.leftWrist.y;
  console.log("leftWristX = " +leftWrist +"leftWristY = " + leftWristY);

  rightWristX = results[0].pose.rightWrist.x;
  rightWristY = results[0].pose.rightWrist.y;
  console.log("rightWristX = " +rightWrist +"rightWristY = " + rightWristY);
  scoreLeftWrist = results[0].pose.keypoints[9].score;
  scoreRightWrist = results[0].pose.keypoints[10].score;
  console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

}
}


function draw()
{
  image(video, 0, 0, 650, 550);
  song1_status = song1.isPlaying();
  song2_status = song2.isPlaying();
  fill("#32a852");
  stroke("#5f32a8");
  if(scoreLeftWrist > 0.2)
  {
  circle(leftWristX, leftWristY, 20);
  song1.stop();
  
  if(song2_status == false)
  {
     song2.play();
     document.getElementById("song_name").innerHTML = "Playing Song 2"; 
  }
}
if(scoreRightWrist > 0.2)
  {
  circle(rightWristX, rightWristY, 20);
  song2.stop();
  
  if(song1_status == false)
  {
     song1.play();
     document.getElementById("song_name").innerHTML = "Playing Song 1"; 
  }
}
}




