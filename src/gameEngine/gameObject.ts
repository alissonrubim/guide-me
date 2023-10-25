import GameObjectRender from "./gameObjectRender";
import Position from "./types/position";
import Size from "./types/size";

export default class GameObject {
  public readonly size: Size;
  public readonly position: Position;
  public readonly id: string;
  private _render: GameObjectRender;

  constructor({ 
    id,
    size,
    position,
    render,
  }:{
    id: string,
    size: Size,
    position?: Position,
    render: GameObjectRender,
  }) {
    this.id = id;
    this.size = size;
    this.position = position ?? { x: 0, y: 0 }
    this._render = render;
  }

  public setup(){

  }

  public loop(){
    
  }

  public draw(context: CanvasRenderingContext2D){
    this._render.draw(this, context);
  }
}