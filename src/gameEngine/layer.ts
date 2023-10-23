import { RefObject } from "react";
import Size from "./types/size";
import GameObject from "./gameObject";

export default class Layer {
  /* Public */
  public id: string;
  public readonly resolution: Size;

  /* Delegates */
  public onDraw?: (context: CanvasRenderingContext2D) => void;
  public onLoop?: () => void;
  public onSetup?: (layer: Layer) => void;

  /* Private */
  private _canvasEl: HTMLCanvasElement;
  private _drawContext: CanvasRenderingContext2D;
  private _gameObjects: GameObject[] = [];

  constructor({ 
    id, 
    containerRef,
    resolution,
    onDraw,
    onLoop,
    onSetup,
  }:{ 
    id: string, 
    containerRef: RefObject<HTMLDivElement>,
    resolution: Size;
    onDraw?: (context: CanvasRenderingContext2D) => void;
    onSetup?: (layer: Layer) => void;
    onLoop?:  () => void;
  }) {
    this.id = id;
    this.resolution = resolution;
    this.onDraw = onDraw;
    this.onLoop = onLoop;
    this.onSetup = onSetup;

    this._canvasEl = document.createElement("canvas");
    this._canvasEl.setAttribute("width", this.resolution.width.toString());
    this._canvasEl.setAttribute("height", this.resolution.height.toString());
    this._canvasEl.setAttribute("id", this.id);
    this._canvasEl.style.position = "absolute";
    containerRef.current?.appendChild(this._canvasEl);
    this._drawContext = this._canvasEl.getContext("2d")!;
  }

  public setup(){
    this.onSetup?.(this);
  }

  public draw(){
    this._drawContext.clearRect(0, 0, this.resolution.width, this.resolution.height);
    this._gameObjects.forEach((go) => {
      go.draw(this._drawContext);
    })
    this.onDraw?.(this._drawContext)
  }

  public loop(){
    this.onLoop?.();
  }

  public addGameObject(gameObject: GameObject){
    this._gameObjects.push(gameObject);
  }
}