import './style.css'
import * as COL from './colorTheme.js'
import * as PIXI from 'pixi.js'
import * as TWEEN from '@tweenjs/tween.js'

let chapter = 1;
let click = 0;

// LOADING ASS-ETS
await PIXI.Assets.load("fonts/mplusREGULAR.ttf");


// setup
const app = new PIXI.Application();
await app.init({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: COL.Base
});

document.body.appendChild(app.canvas);

// <--- CHAPTER 1. RAY CASTING --->
let rayCastHeader = new PIXI.Text({
  text: 'Chapter 1. Ray Casting',
  style: {
    fontFamily: 'mplusREGULAR',
    fontSize: 48,
    fill: COL.Peach
  }
});

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
}
// <--- CHAPTER 2. BVH --->

// <--- CHAPTER 3. RAY TRACING --->

// <--- CHAPTER 4. PATH TRACING --->


document.addEventListener('mousedown', handleChapterClick);

function handleChapterClick() {
  if (chapter === 1) {
    if (click === 0) {
      rayCastHeader.destroy();
      chapter1Stage1();
    } else if (click === 1) {
      app.stage.children.forEach((child) => {
        child.destroy();
      });
      chapter1Stage2();
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

