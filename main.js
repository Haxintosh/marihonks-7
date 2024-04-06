import './style.css'
import * as COL from './colorTheme.js'
import * as PIXI from 'pixi.js'
import * as TWEEN from '@tweenjs/tween.js'

let chapter = 1;
let click = 0;

// LOADING ASS-ETS
await PIXI.Assets.load("fonts/mplusREGULAR.ttf");

let rayForm = document.getElementById('rayForm');
let rayForm2 = document.getElementById('rayForm2');
let rayForm3 = document.getElementById('rayForm3');

// setup
const app = new PIXI.Application();
await app.init({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: COL.Base
});

document.body.appendChild(app.canvas);

// Chapter 1 Texts
const headerStyle = { fontFamily: 'mplusREGULAR', fontSize: 48, fill: COL.Peach };
const bodyStyle = { fontFamily: 'mplusREGULAR', fontSize: 36, wordWrap: true, wordWrapWidth: window.innerWidth * 2 / 4, fill: COL.Text }

const textChapter1 = {
  rayCastHeader: {
    text: 'Chapter 1. Ray Casting',
    style: { ...headerStyle }
  },
  rayCastExplainText: {
    text: 'Ray casting is a technique used in computer graphics to determine the intersection of rays with objects.',
    style: { ...bodyStyle }
  }
};

// Accessing properties using string keys and providing property name as string
let rayCastHeader = new PIXI.Text(textChapter1['rayCastHeader']);



// <--- CHAPTER 1. RAY CASTING --->
// let rayCastHeader = new PIXI.Text({
//   text: 'Chapter 1. Ray Casting',
//   style: {
//     fontFamily: 'mplusREGULAR',
//     fontSize: 48,
//     fill: COL.Peach
//   }
// });
// let arrowText;
// let projectionText;
let arrowText;
let projectionText;

rayCastHeader.anchor.set(0.5);
rayCastHeader.position.set(window.innerWidth / 2, window.innerHeight / 2 );

app.stage.addChild(rayCastHeader);

function chapter1Stage1(){
  let rayCastExplainText = new PIXI.Text({
    text: 'Ray casting is a technique used in computer graphics to determine the intersection of rays with objects.',
    style: {
      fontFamily: 'mplusREGULAR',
      fontSize: 36,
      wordWrap: true,
      wordWrapWidth: window.innerWidth*2 / 4,
      fill: COL.Text
    }
  });
  rayCastExplainText.anchor.set(0.5);
  rayCastExplainText.position.set(window.innerWidth+50, window.innerHeight / 2 );
  const rayCastExplainTextTween = new TWEEN.Tween({x:rayCastExplainText.x, y:rayCastExplainText.y})
  .to({x: window.innerWidth / 2, y: window.innerHeight / 2}, 1000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    rayCastExplainText.position.set(object.x, object.y);
  });
  // rayCastExplainText.position.set(window.innerWidth / 2 , window.innerHeight / 2 );
  app.stage.addChild(rayCastExplainText);
  rayCastExplainTextTween.start();
}

function chapter1Stage2(){
  let cameraFocalPoint = new PIXI.Graphics();
  cameraFocalPoint.circle(0, 0, 10)
  .fill(COL.Peach);
  cameraFocalPoint.position.set(window.innerWidth / 5, window.innerHeight / 2);
  app.stage.addChild(cameraFocalPoint);

  let cameraLine = new PIXI.Graphics();
  cameraLine.rect(0, 0, 5, window.innerHeight/4)
  .fill(COL.Peach);
  cameraLine.position.set(window.innerWidth / 3, window.innerHeight / 2 - (window.innerHeight/4)/2);
  app.stage.addChild(cameraLine);

  const gridContainer = new PIXI.Container();
  app.stage.addChild(gridContainer);

  let gridPadding = 150;
  let gridPaddingY = 50;
  const gridL1 = new PIXI.Graphics();
  gridL1.rect(0, 0, 5, 300)
  .fill(COL.Peach);
  gridL1.position.set(gridPadding, gridPaddingY - 5);
  gridContainer.addChild(gridL1); 

  const gridL2 = new PIXI.Graphics();
  gridL2.rect(0, 0, 5, 300)
  .fill(COL.Peach);
  gridL2.position.set(gridPadding + 100 , gridPaddingY - 5);
  gridContainer.addChild(gridL2);

  const gridL4 = new PIXI.Graphics();
  gridL4.rect(0, 0, 300, 5)
  .fill(COL.Peach);
  gridL4.position.set(gridPadding  -100, gridPaddingY -5 + 200);
  gridContainer.addChild(gridL4);

  const gridL5 = new PIXI.Graphics();
  gridL5.rect(0, 0, 300, 5)
  .fill(COL.Peach);
  gridL5.position.set( gridPadding -100 , gridPaddingY -5 + 100);
  gridContainer.addChild(gridL5);
  
  gridContainer.position.set(0, 0);


  let projection = new PIXI.Graphics()
  .circle(gridPadding+50+2.5,gridPaddingY+150-2.5, 10)
  .fill(COL.Mauve);
  const interSectObject = new PIXI.Graphics();
  interSectObject.rect(0, 0, 100, 100)
  .fill(COL.Mauve);
  interSectObject.position.set((window.innerWidth/4)*2, window.innerHeight/2 - 50);
  app.stage.addChild(interSectObject);
  const intersectArrow = new PIXI.Graphics();
  intersectArrow.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
  intersectArrow.lineTo(cameraFocalPoint.x, cameraFocalPoint.y); // interSectObject.x, window.innerHeight/2
  intersectArrow.stroke({width: 5, color: COL.Green});
  // intersectArrow.position.set((window.innerWidth/4)*2, window.innerHeight/2 - 50);
  app.stage.addChild(intersectArrow);

  let arrowPointer = new PIXI.Graphics();
  arrowPointer.regularPoly(interSectObject.x, window.innerHeight/2, 20, 3, dToR(90))
  .fill(COL.Sky);
  console.log(arrowPointer.getBounds());
  // arrowPointer.position.set();
  app.stage.addChild(arrowPointer);
  // app.stage.addChild(camGrid);

  let arrowTween = new TWEEN.Tween({x:cameraFocalPoint.x, y:cameraFocalPoint.y})
  .to({x: interSectObject.x, y: window.innerHeight/2}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    intersectArrow.clear();
    arrowPointer.clear();
    intersectArrow.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
    intersectArrow.lineTo(object.x, object.y);
    intersectArrow.stroke({width: 5, color: COL.Green});
    arrowPointer.regularPoly(object.x, object.y, 20, 3, dToR(90))
    .fill(COL.Green);
  })
  .onComplete(() => {
  app.stage.addChild(projection);
  });
  arrowTween.start();

  let inersectArrow1 = new PIXI.Graphics();
  inersectArrow1.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
  inersectArrow1.lineTo(cameraFocalPoint.x, cameraFocalPoint.y); // interSectObject.x, window.innerHeight/2
  inersectArrow1.stroke({width: 5, color: COL.Red});
  app.stage.addChild(inersectArrow1);

  let arrowPointer1 = new PIXI.Graphics();
  arrowPointer1.regularPoly(interSectObject.x, window.innerHeight/2, 20, 3, dToR(90))
  .fill(COL.Red);
  app.stage.addChild(arrowPointer1);

  let arrowTween1 = new TWEEN.Tween({x:cameraFocalPoint.x, y:cameraFocalPoint.y})
  .to({x: (window.innerWidth/4)*3, y: window.innerHeight/5}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    inersectArrow1.clear();
    arrowPointer1.clear();
    inersectArrow1.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
    inersectArrow1.lineTo(object.x, object.y);
    inersectArrow1.stroke({width: 5, color: COL.Red});
    arrowPointer1.regularPoly(object.x, object.y, 20, 3, dToR(70))
    .fill(COL.Red);
  });
  arrowTween1.start();


  let intersectArrow2 = new PIXI.Graphics();
  intersectArrow2.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
  intersectArrow2.lineTo(cameraFocalPoint.x, cameraFocalPoint.y); // interSectObject.x, window.innerHeight/2
  intersectArrow2.stroke({width: 5, color: COL.Red});
  app.stage.addChild(intersectArrow2);

  let arrowPointer2 = new PIXI.Graphics();
  arrowPointer2.regularPoly(interSectObject.x, window.innerHeight/2, 20, 3, dToR(30))
  .fill(COL.Red);
  app.stage.addChild(arrowPointer2);

  let arrowTween2 = new TWEEN.Tween({x:cameraFocalPoint.x, y:cameraFocalPoint.y})
  .to({x: (window.innerWidth/4)*3, y: (window.innerHeight/5)*4}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    intersectArrow2.clear();
    arrowPointer2.clear();
    intersectArrow2.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
    intersectArrow2.lineTo(object.x, object.y);
    intersectArrow2.stroke({width: 5, color: COL.Red});
    arrowPointer2.regularPoly(object.x, object.y, 20, 3, dToR(-9))
    .fill(COL.Red);
  });

  arrowTween2.start();

  // CH1. explainer texts
  let cameraText = new PIXI.Text({
    text: 'Focal point of the camera',
    style: {
      fontFamily: 'mplusREGULAR',
      fontSize: 36,
      fill: COL.Text
    }
  });

  cameraText.anchor.set(0.5);
  cameraText.position.set(cameraFocalPoint.x, cameraFocalPoint.y  + 400);
  app.stage.addChild(cameraText);

  let screenText = new PIXI.Text({
    text: 'Display',
    style: {
      fontFamily: 'mplusREGULAR',
      fontSize: 36,
      fill: COL.Text
    }
  });
  screenText.anchor.set(0.5);
  screenText.position.set(window.innerWidth / 3, window.innerHeight / 2 - (window.innerHeight/4)/2 - 50);
  app.stage.addChild(screenText);

  let pixelText = new PIXI.Text({
    text: '← The final "image", each case is a pixel.',
    style: {
      fontFamily: 'mplusREGULAR',
      fontSize: 36,
      fill: COL.Text
    }
  });
  pixelText.anchor.set(0.5);
  pixelText.position.set(window.innerWidth / 3 +50, window.innerHeight / 4 - 45 );
  app.stage.addChild(pixelText);

  arrowText = new PIXI.Text({
    text: 'The arrows are rays casted from the camera.',
    style: {
      fontFamily: 'mplusREGULAR',
      fontSize: 36,
      fill: COL.Text
    }
  });
  arrowText.anchor.set(0.5);
  arrowText.position.set(window.innerWidth / 5 * 4 -50, window.innerHeight / 2);
  app.stage.addChild(arrowText);

  projectionText = new PIXI.Text({
    text: 'Only the green arrow actualy intercepts an object, so only that pixel is colored.',
    style: {
      fontFamily: 'mplusREGULAR',
      fontSize: 36,
      fill: COL.Text,
      wordWrap: true,
      wordWrapWidth: 800
  }});
  projectionText.anchor.set(0.5);
  projectionText.position.set(window.innerWidth / 5 * 4-50, window.innerHeight / 2 + 100);
  app.stage.addChild(projectionText);
}

function chapter1Stage3(){
  rayForm.style.opacity = 1;
  arrowText.destroy();
  projectionText.text = 'The rays are composed of a point of origin (X0, Y0, Z0) and a direction vector (Dx, Dy, Dz for 3d direction).\nBy combining those 2 components, we can describe any point along the ray using a single parameter "t" by solving for X, Y, and Z.\n';
  projectionText.anchor.set(0.5);
  projectionText.position.set(window.innerWidth / 5 *4-50, window.innerHeight / 2 );
}

function chapter1Stage4(){
  rayForm.style.opacity = 0;
  projectionText.text = 'For actual ray casting, we need to check for intersections with objects in the scene.\nFirst, we need to check for intersections with the actual object.';
  projectionText.anchor.set(0.5);
  projectionText.position.set(window.innerWidth / 5 * 4 -50, window.innerHeight / 2);
}

function chapter1Stage5(){
  rayForm2.style.visibility = 'visible';
  projectionText.text = "Let's start with an easier situation, a plane.\nTo determine the distance between the camera's focal point and the object, we can use the dot product of the plane's normal and the ray's direction.\nLet the plane be defined by a point P0 and a normal N, and the ray by a point X and a direction D.";
  projectionText.anchor.set(0.5);
  projectionText.position.set(window.innerWidth / 5 * 4 -50, window.innerHeight / 2);
}

function chapter1Stage6(){
  projectionText.text = "The perpendicular distance is done by projecting the vector between the camera's focal point and the object onto the plane's normal.\nThis gives us the distance between the camera and the object.\n v is the vector between the camera and the object, and n is the plane's normal.";
  projectionText.anchor.set(0.5);
  projectionText.position.set(window.innerWidth / 5 * 4 -50, window.innerHeight / 2);
}

function chapter1Stage7(){
  rayForm2.style.visibility = 'hidden';
  rayForm3.style.visibility = 'visible';
  projectionText.text = "Now we can combine the ray equation and the distance equation to find the intersection point.";
  projectionText.anchor.set(0.5);
  projectionText.position.set(window.innerWidth / 5 * 4 -50, window.innerHeight / 2);
}

function chapter1Stage8(){ 
  rayForm3.style.visibility = 'hidden';
  projectionText.text = "We can now find the value t and we can find the intersection point by plugging it back into the ray equation.\nThis is the basic principle of ray casting.";
  projectionText.anchor.set(0.5);
  projectionText.position.set(window.innerWidth / 5 * 4 -50, window.innerHeight / 2);
};

// <--- CHAPTER 2. BVH --->
let bvhHeader = new PIXI.Text({
  text: 'Chapter 2. Bounding Volume Hierarchy',
  style: {
    fontFamily: 'mplusREGULAR',
    fontSize: 48,
    fill: COL.Sapphire
  }
});
const chapter2Stage1 = () => {
  bvhHeader.anchor.set(0.5);
  bvhHeader.position.set(window.innerWidth / 2, window.innerHeight / 2 );
  app.stage.addChild(bvhHeader);
}

// Stage 2 text
let bvhExplainText = new PIXI.Text({
  text: 'Bounding Volume Hierarchy is a tree data structure used in computer graphics to speed up ray tracing.',
  style: {
    fontFamily: 'mplusREGULAR',
    fontSize: 36,
    wordWrap: true,
    wordWrapWidth: window.innerWidth*2 / 4,
    fill: COL.Text
  }
});
function chapter2Stage2(){
  bvhExplainText.anchor.set(0.5);
  bvhExplainText.position.set(window.innerWidth+50, window.innerHeight / 2 );
  const bvhExplainTextTween = new TWEEN.Tween({x:bvhExplainText.x, y:bvhExplainText.y})
  .to({x: window.innerWidth / 2, y: window.innerHeight / 2}, 1000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    bvhExplainText.position.set(object.x, object.y);
  });
  app.stage.addChild(bvhExplainText);
  bvhExplainTextTween.start();
}
function chapter2Stage3(){
  bvhExplainText = new PIXI.Text({
    text: 'BVH is done by first creating a bounding box around the objects in the scene.\nThen, the bounding boxes are grouped into a tree structure.\nThen we raycast the tree structure instead of the objects themselves.\nThis reduces the number of intersections we need to check by removing rays that don\'t intersect with the bounding box.',
    style: {
      fontFamily: 'mplusREGULAR',
      fontSize: 36,
      wordWrap: true,
      wordWrapWidth: window.innerWidth*2 / 4,
      fill: COL.Text
    }
  });
  bvhExplainText.anchor.set(0.5);
  bvhExplainText.position.set(window.innerWidth+50, window.innerHeight / 2 );
  const bvhExplainTextTween = new TWEEN.Tween({x:bvhExplainText.x, y:bvhExplainText.y})
  .to({x: window.innerWidth / 2, y: window.innerHeight / 2}, 1000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    bvhExplainText.position.set(object.x, object.y);
  });
  app.stage.addChild(bvhExplainText);
  bvhExplainTextTween.start();
}

function chapter2Stage4(){
  takeOut(bvhExplainText);
  bvhExplainText = new PIXI.Text({
    text: 'It is not so evident how this would increase performance in 2D, but in 3D, the number of intersections can be reduced by a significant amount.',
    style: {
      fontFamily: 'mplusREGULAR',
      fontSize: 36,
      wordWrap: true,
      wordWrapWidth: window.innerWidth*2 / 4,
      fill: COL.Text
    }
  });
  bvhExplainText.anchor.set(0.5);
  app.stage.addChild(bvhExplainText);
  let bvhExplainTextTween = new TWEEN.Tween({x:bvhExplainText.x, y:bvhExplainText.y})
  .to({x: window.innerWidth / 2, y: window.innerHeight / 2}, 1000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    bvhExplainText.position.set(object.x, object.y);
  });

  bvhExplainTextTween.start();
}
// <--- CHAPTER 3. PATH TRACING --->
function chapter3Stage1(){
  let pathHeader = new PIXI.Text({
    text: 'Chapter 3. Path Tracing',
    style: {
      fontFamily: 'mplusREGULAR',
      fontSize: 48,
      fill: COL.Green
    }  
  });

  pathHeader.anchor.set(0.5);
  // pathHeader.position.set(window.innerWidth / 2, window.innerHe );
  app.stage.addChild(pathHeader);

  let pathTween = new TWEEN.Tween({x: pathHeader.x, y: pathHeader.y})
  .to({x: window.innerWidth / 2, y: window.innerHeight / 2}, 1000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    pathHeader.position.set(object.x, object.y);
  });
  pathTween.start(); 
}

function chapter1Stage2(){
  let cameraFocalPoint = new PIXI.Graphics();
  cameraFocalPoint.circle(0, 0, 10)
  .fill(COL.Peach);
  cameraFocalPoint.position.set(window.innerWidth / 5, window.innerHeight / 2);
  app.stage.addChild(cameraFocalPoint);

  let cameraLine = new PIXI.Graphics();
  cameraLine.rect(0, 0, 5, window.innerHeight/4)
  .fill(COL.Peach);
  cameraLine.position.set(window.innerWidth / 3, window.innerHeight / 2 - (window.innerHeight/4)/2);
  app.stage.addChild(cameraLine);

  const gridContainer = new PIXI.Container();
  app.stage.addChild(gridContainer);

  let gridPadding = 150;
  let gridPaddingY = 50;
  const gridL1 = new PIXI.Graphics();
  gridL1.rect(0, 0, 5, 300)
  .fill(COL.Peach);
  gridL1.position.set(gridPadding, gridPaddingY - 5);
  gridContainer.addChild(gridL1); 

  const gridL2 = new PIXI.Graphics();
  gridL2.rect(0, 0, 5, 300)
  .fill(COL.Peach);
  gridL2.position.set(gridPadding + 100 , gridPaddingY - 5);
  gridContainer.addChild(gridL2);

  const gridL4 = new PIXI.Graphics();
  gridL4.rect(0, 0, 300, 5)
  .fill(COL.Peach);
  gridL4.position.set(gridPadding  -100, gridPaddingY -5 + 200);
  gridContainer.addChild(gridL4);

  const gridL5 = new PIXI.Graphics();
  gridL5.rect(0, 0, 300, 5)
  .fill(COL.Peach);
  gridL5.position.set( gridPadding -100 , gridPaddingY -5 + 100);
  gridContainer.addChild(gridL5);
  
  gridContainer.position.set(0, 0);

  let projection = new PIXI.Graphics()
  .circle(gridPadding+50+2.5,gridPaddingY+150-2.5, 10)
  .fill(COL.Mauve);
  const interSectObject = new PIXI.Graphics();
  interSectObject.rect(0, 0, 100, 100)
  .fill(COL.Mauve);
  interSectObject.position.set((window.innerWidth/4)*2, window.innerHeight/2 - 50);
  app.stage.addChild(interSectObject);
  const intersectArrow = new PIXI.Graphics();
  intersectArrow.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
  intersectArrow.lineTo(cameraFocalPoint.x, cameraFocalPoint.y); // interSectObject.x, window.innerHeight/2
  intersectArrow.stroke({width: 5, color: COL.Green});
  // intersectArrow.position.set((window.innerWidth/4)*2, window.innerHeight/2 - 50);
  app.stage.addChild(intersectArrow);

  let arrowPointer = new PIXI.Graphics();
  arrowPointer.regularPoly(interSectObject.x, window.innerHeight/2, 20, 3, dToR(90))
  .fill(COL.Sky);
  console.log(arrowPointer.getBounds());
  // arrowPointer.position.set();
  app.stage.addChild(arrowPointer);
  // app.stage.addChild(camGrid);

  let arrowTween = new TWEEN.Tween({x:cameraFocalPoint.x, y:cameraFocalPoint.y})
  .to({x: interSectObject.x, y: window.innerHeight/2}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    intersectArrow.clear();
    arrowPointer.clear();
    intersectArrow.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
    intersectArrow.lineTo(object.x, object.y);
    intersectArrow.stroke({width: 5, color: COL.Green});
    arrowPointer.regularPoly(object.x, object.y, 20, 3, dToR(90))
    .fill(COL.Green);
  })
  .onComplete(() => {
  app.stage.addChild(projection);
  });
  arrowTween.start();

  let inersectArrow1 = new PIXI.Graphics();
  inersectArrow1.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
  inersectArrow1.lineTo(cameraFocalPoint.x, cameraFocalPoint.y); // interSectObject.x, window.innerHeight/2
  inersectArrow1.stroke({width: 5, color: COL.Red});
  app.stage.addChild(inersectArrow1);

  let arrowPointer1 = new PIXI.Graphics();
  arrowPointer1.regularPoly(interSectObject.x, window.innerHeight/2, 20, 3, dToR(90))
  .fill(COL.Red);
  app.stage.addChild(arrowPointer1);

  let arrowTween1 = new TWEEN.Tween({x:cameraFocalPoint.x, y:cameraFocalPoint.y})
  .to({x: (window.innerWidth/4)*3, y: window.innerHeight/5}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    inersectArrow1.clear();
    arrowPointer1.clear();
    inersectArrow1.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
    inersectArrow1.lineTo(object.x, object.y);
    inersectArrow1.stroke({width: 5, color: COL.Red});
    arrowPointer1.regularPoly(object.x, object.y, 20, 3, dToR(70))
    .fill(COL.Red);
  });
  arrowTween1.start();


  let intersectArrow2 = new PIXI.Graphics();
  intersectArrow2.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
  intersectArrow2.lineTo(cameraFocalPoint.x, cameraFocalPoint.y); // interSectObject.x, window.innerHeight/2
  intersectArrow2.stroke({width: 5, color: COL.Red});
  app.stage.addChild(intersectArrow2);

  let arrowPointer2 = new PIXI.Graphics();
  arrowPointer2.regularPoly(interSectObject.x, window.innerHeight/2, 20, 3, dToR(30))
  .fill(COL.Red);
  app.stage.addChild(arrowPointer2);

  let arrowTween2 = new TWEEN.Tween({x:cameraFocalPoint.x, y:cameraFocalPoint.y})
  .to({x: (window.innerWidth/4)*3, y: (window.innerHeight/5)*4}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    intersectArrow2.clear();
    arrowPointer2.clear();
    intersectArrow2.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
    intersectArrow2.lineTo(object.x, object.y);
    intersectArrow2.stroke({width: 5, color: COL.Red});
    arrowPointer2.regularPoly(object.x, object.y, 20, 3, dToR(-9))
    .fill(COL.Red);
  });

  arrowTween2.start();

  let arrowLineBounce = new PIXI.Graphics();
  arrowLineBounce.moveTo(interSectObject.x, window.innerHeight/2);
  arrowLineBounce.lineTo(interSectObject.x, window.innerHeight/2);
  arrowLineBounce.stroke({width: 5, color: COL.Green});
  app.stage.addChild(arrowLineBounce);

  let arrowLineBounceTween = new TWEEN.Tween({x:interSectObject.x, y:window.innerHeight/2})
  .to({x: (window.innerWidth/4)*3, y: window.innerHeight/2}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    arrowLineBounce.clear();
    arrowLineBounce.moveTo(interSectObject.x, window.innerHeight/2);
    arrowLineBounce.lineTo(object.x, object.y);
    arrowLineBounce.stroke({width: 5, color: COL.Green});
  });

  arrowLineBounceTween.start();

  let arrowTriangleBounce = new PIXI.Graphics();
  arrowTriangleBounce.regularPoly(interSectObject.x, window.innerHeight/2, 20, 3, dToR(90))
  .fill(COL.Green);
  app.stage.addChild(arrowTriangleBounce);

  let arrowTriangleBounceTween = new TWEEN.Tween({x:interSectObject.x, y:window.innerHeight/2})
  .to({x: (window.innerWidth/4)*3, y: window.innerHeight/2}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    arrowTriangleBounce.clear();
    arrowTriangleBounce.regularPoly(object.x, object.y, 20, 3, dToR(90))
    .fill(COL.Green);
  });

  arrowTriangleBounceTween.start();

  let arrowLine1 = new PIXI.Graphics();
  arrowLine1.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
  arrowLine1.lineTo(cameraFocalPoint.x, cameraFocalPoint.y); // interSectObject.x, window.innerHeight/2
  arrowLine1.stroke({width: 5, color: COL.Teal});
  app.stage.addChild(arrowLine1);

  let arrowLine1Tween = new TWEEN.Tween({x:cameraFocalPoint.x, y:cameraFocalPoint.y})
  .to({x: (window.innerWidth/4)*3, y: window.innerHeight/5}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    arrowLine1.clear();
    arrowLine1.moveTo(cameraFocalPoint.x, cameraFocalPoint.y);
    arrowLine1.lineTo(object.x, object.y);
    arrowLine1.stroke({width: 5, color: COL.Teal});
  });

  let arrowTriangle1 = new PIXI.Graphics();
  arrowTriangle1.regularPoly(interSectObject.x, window.innerHeight/2, 20, 3, dToR(90))
  .fill(COL.Teal);
  app.stage.addChild(arrowTriangle1);

  let  arrowTriangle1Tween = new TWEEN.Tween({x:interSectObject.x, y:window.innerHeight/2})
  .to({x: (window.innerWidth/4)*3, y: window.innerHeight/5}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    arrowTriangle1.clear();
    arrowTriangle1.regularPoly(object.x, object.y, 20, 3, dToR(70))
    .fill(COL.Teal);
  });
  arrowLine1Tween.start();
  arrowTriangle1Tween.start();

  let arrowLine1BounceTween = new TWEEN.Tween({x:interSectObject.x, y:window.innerHeight/2})
  .to({x: (window.innerWidth/4)*3, y: window.innerHeight/2}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    arrowLine1.clear();
    arrowLine1.moveTo(interSectObject.x, window.innerHeight/2);
    arrowLine1.lineTo(object.x, object.y);
    arrowLine1.stroke({width: 5, color: COL.Teal});
  });

  let arrowTriangle1BounceTween = new TWEEN.Tween({x:interSectObject.x, y:window.innerHeight/2})  
  .to({x: (window.innerWidth/4)*3, y: window.innerHeight/2}, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    arrowTriangle1.clear();
    arrowTriangle1.regularPoly(object.x, object.y, 20, 3, dToR(70))
    .fill(COL.Teal);
  });

  arrowLine1BounceTween.start();
  arrowTriangle1BounceTween.start();
}
let pathText;

function chapter3Stage2(){
  pathText = new PIXI.Text({
    text: 'Path tracing is a type of ray tracing.\nRay tracing makes the ray bounces in the scene a number of times, while ray casting is a single bounce.',
    style: {
      fontFamily: 'mplusREGULAR', 
      fontSize: 36,
      wordWrap: true,
      wordWrapWidth: 800,
      fill: COL.Text
    }
  });

  pathText.anchor.set(0.5);
  pathText.position.set(window.innerWidth / 5 * 4 -50, window.innerHeight / 2);
  app.stage.addChild(pathText);
}

function chapter3Stage3(){
  pathText.text = 'For path tracing, the angle which the ray reflects is random, while for ray tracing, it is determined by the properties of materials in the scene.';
  pathText.anchor.set(0.5);
  pathText.position.set(window.innerWidth / 5 * 4 -50, window.innerHeight / 2);
}

function chapter3Stage4(){
  pathText.text = 'We also take multiple samples (rays) per pixel and sum the results to get a more accurate result.\nThis also acts as a natural anti-aliasing method.';
  pathText.anchor.set(0.5);
  pathText.position.set(window.innerWidth / 5 * 4 -50, window.innerHeight / 2);
} 
document.addEventListener('mousedown', handleChapterClick);

function takeOut(text) {
  const textTween = new TWEEN.Tween({ x: text.x, y: text.y })
    .to({ x: 0 - window.innerWidth, y: window.innerHeight / 2 }, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((object) => {
      // Update the x and y properties of the text object directly
      text.x = object.x;
      text.y = object.y;
    })
    .start();

  // Optionally, you can also handle the completion of the tween to remove the text from the stage
  textTween.onComplete(() => {
    app.stage.removeChild(text);
  });
}

function takeIn(text) {
  const textTween = new TWEEN.Tween({ x: text.x, y: text.y })
  .to({ x: 0 - window.innerWidth, y: window.innerHeight / 2 }, 1000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    // Update the x and y properties of the text object directly
    text.x = object.x;
    text.y = object.y;
  })
  .start();
}

function handleChapterClick() {
  if (chapter === 1) {
    if (click === 0) {
      // rayCastHeader.destroy();
      takeOut(rayCastHeader);
      chapter1Stage1();
    } else if (click === 1) {
      app.stage.children.forEach((child) => {
        child.destroy();
      });
      chapter1Stage2();
    } else if (click === 2) {
      chapter1Stage3();
    } else if (click === 3) {
      chapter1Stage4();
    } else if (click === 4) {
      chapter1Stage5();
    } else if (click === 5) {
      chapter1Stage6();
    } else if (click === 6) {
      chapter1Stage7();
    } else if (click === 7) {
      chapter1Stage8();
      chapter = 2;
      click = 0;
    }
  } else if (chapter === 2) {
    if (click === 1) {
      app.stage.children.forEach((child) => {
        takeOut(child);
      });
      chapter2Stage1();
    } else if (click === 2) {
      takeOut(bvhHeader);
      chapter2Stage2();
    } else if (click === 3) {
      takeOut(bvhExplainText);
      chapter2Stage3();
    } else if (click === 4) {
      takeOut(bvhExplainText);
      chapter2Stage4();
      chapter = 3;
      click = 0;
    }
  } else if (chapter === 3){
    if (click === 1) {
      app.stage.children.forEach((child) => {
        takeOut(child);
      });
      chapter3Stage1();
    }
  }
  click++;
}

function dToR(deg){
  return deg * (Math.PI / 180);
}

// LOOOOOOOOP
app.ticker.add((ticker) => {
  TWEEN.update();
  // console.log("delta", ticker.deltaTime);
});

