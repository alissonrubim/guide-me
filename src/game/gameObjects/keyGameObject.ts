import StaticSpriteRender from "@/gameEngine/renders/staticSpriteRender";
import GameObject from "@/gameEngine/gameObject";
import { TILE_SIZE } from "../const";
import FreeDrawRender from "@/gameEngine/renders/freeDrawRender";
import Position from "@/gameEngine/types/position";

export default class KeyGameObject extends GameObject {
  constructor(id: string, position: Position){
    super({
      id,
      size: {
        height: TILE_SIZE,
        width: TILE_SIZE,
      },
      position: {
        x: position.x * TILE_SIZE,
        y: position.y * TILE_SIZE,
      },
      render: new FreeDrawRender({
        onDraw: (gameObject, context) => {
          context.fillStyle = "yellow";
          context.fillRect(gameObject.position.x, gameObject.position.y, gameObject.size.width, gameObject.size.height);
        }
      })
    })
  }
}