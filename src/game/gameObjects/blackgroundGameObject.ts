import GameObject from "@/gameEngine/gameObject";
import { TILE_COL_COUNT, TILE_ROW_COUNT, TILE_SIZE } from "../const";
import PatternSpriteRender from "@/gameEngine/renders/patternSpriteRender";
import FreeDrawRender from "@/gameEngine/renders/freeDrawRender";

export default class BackGroundGameObject extends GameObject {
  constructor(id: string){
    super({
      id,
      size: {
        height: TILE_SIZE * TILE_COL_COUNT,
        width: TILE_SIZE * TILE_ROW_COUNT,
      },
      position: {
        x: 0,
        y: 0
      },
      render: new FreeDrawRender({
        onDraw: (gameObject, context) => {
          context.fillStyle = "black";
          context.fillRect(gameObject.position.x, gameObject.position.y, gameObject.size.width, gameObject.size.height);
        }
      })
    })
  }
}