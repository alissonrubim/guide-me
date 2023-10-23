import { RefObject } from "react";
import Size from "./types/size";

export default class Layer {
  /* Public */
  public id: string;

  /* Handlers */
  public onDraw?: (context: CanvasRenderingContext2D) => void;

  /* Private */
  private _canvasEl: HTMLCanvasElement;
  private _drawContext: CanvasRenderingContext2D;

  constructor({ 
    id, 
    containerRef,
    resolution,
    onDraw
  }:{ 
    id: string, 
    containerRef: RefObject<HTMLDivElement>,
    resolution: Size;
    onDraw?: (context: CanvasRenderingContext2D) => void;
  }) {
    this.id = id;
    this.onDraw = onDraw;
    this._canvasEl = document.createElement("canvas");
    this._canvasEl.setAttribute("width", resolution.width.toString());
    this._canvasEl.setAttribute("height", resolution.height.toString());
    this._canvasEl.setAttribute("id", this.id);
    this._canvasEl.style.position = "absolute";
    containerRef.current?.appendChild(this._canvasEl);
    this._drawContext = this._canvasEl.getContext("2d")!;
  }

  public draw(){
    this.onDraw?.(this._drawContext)
  }
}