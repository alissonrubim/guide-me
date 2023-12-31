import StaticSpriteRender from "@/gameEngine/renders/staticSpriteRender";
import GameObject from "@/gameEngine/gameObject";
import { TILE_SIZE } from "../const";
import FreeDrawRender from "@/gameEngine/renders/freeDrawRender";
import Position from "@/gameEngine/types/position";

export default class PlayerGameObject extends GameObject {
  constructor(id: string, position: Position){
    super({
      id,
      size: {
        height: TILE_SIZE,
        width: TILE_SIZE,
      },
      position: {
        x: position.x * TILE_SIZE,
        y: position.y * TILE_SIZE
      },
      // render: new StaticSpriteRender({
      //   sprite: {
      //     size: {
      //       width: 32,
      //       height: 32
      //     },
      //     sourceUrl: "../resources/sprite-grass.jpg"
      //   }
      // })
      render: new FreeDrawRender({
        onDraw: (gameObject, context) => {
          context.fillStyle = "red";
          context.fillRect(gameObject.position.x, gameObject.position.y, gameObject.size.width, gameObject.size.height);
        }
      })
    })
  }

  public moveUp(){
    this.position.y -= TILE_SIZE;
  }

  public moveDown(){
    this.position.y += TILE_SIZE
  }

  public moveLeft(){
    this.position.x -= TILE_SIZE
  }

  public moveRight(){
    this.position.x += TILE_SIZE
  }
}