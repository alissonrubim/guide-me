import GameObject from "../gameObject";
import GameObjectRender from "../gameObjectRender";

export default class FreeDrawRender implements GameObjectRender {
  /* Public */
  public onDraw: (gameObject: GameObject, context: CanvasRenderingContext2D) => void;

  constructor({ 
    onDraw
  }:{
    onDraw: (gameObject: GameObject, context: CanvasRenderingContext2D) => void;
  }) {
    this.onDraw = onDraw;
  }

  public draw(gameObject: GameObject, context: CanvasRenderingContext2D): void {
    this.onDraw(gameObject, context);
  }
}