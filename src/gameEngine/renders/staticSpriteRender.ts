import GameObject from "../gameObject";
import Sprite from "../types/sprite";
import GameObjectRender from "../gameObjectRender";

export default class StaticSpriteRender implements GameObjectRender {
  /* Public */
  public readonly sprite: Sprite;

  /* Private */
  private _imgEl: HTMLImageElement;

  constructor({ 
    sprite
  }:{
    sprite: Sprite
  }) {
    this.sprite = sprite;
    this._imgEl = document.createElement("img");
    this._imgEl.src = this.sprite.sourceUrl;
  }

  public draw(gameObject: GameObject, context: CanvasRenderingContext2D): void {
    context.drawImage(this._imgEl, 
      gameObject.position.x, 
      gameObject.position.y, 
      this.sprite.size.width, 
      this.sprite.size.height
    )
  }

}