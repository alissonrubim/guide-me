import StaticSpritePainter from "@/gameEngine/painters/staticSpritePainter";
import GameObject from "@/gameEngine/gameObject";
import { TILE_SIZE } from "../const";

export default class PlayerGameObject extends GameObject {
  constructor(){
    super({
      id: "player",
      size: {
        height: TILE_SIZE,
        width: TILE_SIZE,
      },
      position: {
        x: 0,
        y: 0
      },
      painter: new StaticSpritePainter({
        spriteSourcePath: "../resources/sprite-grass.jpg"
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