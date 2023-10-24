import { RefObject, createRef } from "react";
import Size from "./types/size";
import Layer from "./layer";

export default class GameEngine {
  public readonly resolution: Size;

  private _fps: number = 0;
  private _loopTimeStamp: Date | undefined = undefined;
  private _containerRef: RefObject<HTMLDivElement>;
  private _layers: Layer[] = [];
  
  constructor({ 
    containerRef,
    resolution
  }:{ 
    resolution: Size
    containerRef: RefObject<HTMLDivElement>
  }){
    this._containerRef = containerRef;
    this.resolution = resolution;
  }

  public start(){
    this._setup();
  }

  public pause(){

  }

  public stop(){

  }

  public getFps(){
    return this._fps;
  }

  public addLayer({ 
    id, 
    onDraw,
    onLoop,
    onSetup, 
  }: { 
    id: string, 
    onDraw?: (context: CanvasRenderingContext2D) => void; 
    onLoop?: () => void;
    onSetup?: (layer: Layer) => void;
  }){
    this._layers.push(new Layer({
      id: id,
      resolution: this.resolution,
      containerRef: this._containerRef,
      onDraw,
      onLoop,
      onSetup,
    }))
  }

  private _startMainLoop(){
    this._loop();
    this._draw();

    // Calculate the fps
    this._fps = ~~(1000/(new Date().getTime() - this._loopTimeStamp!.getTime()));
    this._loopTimeStamp = new Date();

    setTimeout(() => {
      this._startMainLoop();
    }, 1)
  }

  private _setup() {
    this._layers.forEach((l) => l.setup());
    this._loopTimeStamp = new Date();
    this._startMainLoop();
  }

  private _loop(){
    this._layers.forEach((l) => l.loop());
  }

  private _draw(){
    this._layers.forEach((l) => l.draw());
  }
}