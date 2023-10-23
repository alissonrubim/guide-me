import GameObject from "../gameObject";
import Painter from "./paiter";

export default class StaticSpritePainter implements Painter {
  /* Public */
  public readonly spriteSourcePath: string;

  /* Private */
  private _imgEl: HTMLImageElement;

  constructor({ 
    spriteSourcePath
  }:{
    spriteSourcePath: string
  }) {
    this.spriteSourcePath = spriteSourcePath;
    this._imgEl = document.createElement("img");
    this._imgEl.src = this.spriteSourcePath;
  }

  public draw(gameObject: GameObject, context: CanvasRenderingContext2D): void {
    context.drawImage(this._imgEl, 
      gameObject.position.x, 
      gameObject.position.y, 
      gameObject.size.width, 
      gameObject.size.height
    )
  }

}