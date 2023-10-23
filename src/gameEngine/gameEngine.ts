import { RefObject, createRef } from "react";
import Size from "./types/size";
import Layer from "./layer";

export default class GameEngine {
  public onSetup?: () => void;

  private _containerRef: RefObject<HTMLDivElement>;
  private _layers: Layer[] = [];
  public readonly resolution: Size;

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

  public addLayer({ 
    id , 
    onDraw 
  }: { 
    id: string, 
    onDraw: (context: CanvasRenderingContext2D) => void; 
  }){
    this._layers.push(new Layer({
      id: id,
      resolution: this.resolution,
      onDraw,
      containerRef: this._containerRef
    }))
  }

  private _startMainLoop(){
    setTimeout(() => {
      this._loop();
      this._draw();
      this._startMainLoop();
    }, 1)
  }

  private _setup() {
    this.onSetup?.();
    this._startMainLoop();
  }

  private _loop(){

  }

  private _draw(){
    this._layers.forEach((l) => l.draw());
  }
}