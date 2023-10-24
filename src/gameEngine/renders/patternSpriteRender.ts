import GameObject from "../gameObject";
import GameObjectRender from "../gameObjectRender";
import Sprite from "../types/sprite";

export default class PatternSpriteRender implements GameObjectRender {
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
    const repeatRowCount = ~~(gameObject.size.width / this.sprite.size.width) + 1
    const repeatColCount = ~~(gameObject.size.height / this.sprite.size.height) + 1

    for(let i=0; i<repeatRowCount; i++){
      for(let j=0; j<repeatColCount; j++){
        context.drawImage(this._imgEl, 
          gameObject.position.x + (this.sprite.size.width * i), 
          gameObject.position.y + (this.sprite.size.height * j), 
          this.sprite.size.width, 
          this.sprite.size.height
        )
      }
    }
  }

}