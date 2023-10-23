import Painter from "./painters/paiter";
import Position from "./types/position";
import Size from "./types/size";

export default class GameObject {
  public readonly size: Size;
  public readonly position: Position;
  public readonly id: string;

  private _painter: Painter;

  constructor({ 
    id,
    size,
    position,
    painter
  }:{
    id: string,
    size: Size,
    position?: Position
    painter: Painter
  }) {
    this.id = id;
    this.size = size;
    this.position = position ?? { x: 0, y: 0 }
    this._painter = painter;
  }

  public setup(){

  }

  public loop(){

  }

  public draw(context: CanvasRenderingContext2D){
    this._painter.draw(this, context);
  }
}