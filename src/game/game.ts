import GameEngine from "@/gameEngine/gameEngine";
import { RefObject } from "react";

export class Game {
  private _engine: GameEngine;

  private _tileSize = 32

  constructor({ containerRef }:{ containerRef: RefObject<HTMLDivElement>}){
    this._engine = new GameEngine({
      containerRef,
      resolution: {
        height: this._tileSize * 20,
        width: this._tileSize * 20,
      }
    });
  }

  public start(){
    console.info("Starting game")
    this._setup();
    this._engine.start();
  }

  private _setup(){
    this._engine.addLayer({
      id: "background-0",
      onDraw: (ctx) => {
        // ctx.fillStyle = "blue";
        // ctx.fillRect(0, 0, this._engine.resolution.width, this._engine.resolution.height);
      }
    });

    this._engine.addLayer({
      id: "background-1",
      onDraw: (ctx) => {
        // ctx.fillStyle = "red";
        // ctx.fillRect(0, 0, this._engine.resolution.width/2, this._engine.resolution.height);
      }
    });

    this._engine.addLayer({
      id: "items-0",
      onDraw: (ctx) => {
        // ctx.fillStyle = "red";
        // ctx.fillRect(0, 0, this._engine.resolution.width/2, this._engine.resolution.height);
      }
    });

    this._engine.addLayer({
      id: "player-0",
      onDraw: (ctx) => {
        // ctx.fillStyle = "red";
        // ctx.fillRect(0, 0, this._engine.resolution.width/2, this._engine.resolution.height);
      }
    });
  }
}