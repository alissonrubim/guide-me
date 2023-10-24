import GameObject from "@/gameEngine/gameObject";
import { TILE_COL_COUNT, TILE_ROW_COUNT, TILE_SIZE } from "../const";
import PatternSpriteRender from "@/gameEngine/renders/patternSpriteRender";

export default class GrassGameObject extends GameObject {
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
      render: new PatternSpriteRender({
        sprite: {
          size: {
            width: 32,
            height: 32
          },
          sourceUrl: "../resources/sprite-grass.jpg"
        }
      })
    })
  }
}