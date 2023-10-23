import GameEngine from "@/gameEngine/gameEngine";
import GameObject from "@/gameEngine/gameObject";
import { RefObject } from "react";
import PlayerGameObject from "./gameObjects/playerGameObject";
import { TILE_SIZE } from "./const";
import { Input } from "./input";

export class Game {
  private _engine: GameEngine;
  private _gameObjects: {
    player?: PlayerGameObject
  } = {
    player: undefined
  }

  constructor({ containerRef }:{ containerRef: RefObject<HTMLDivElement>}){
    this._engine = new GameEngine({
      containerRef,
      resolution: {
        height: TILE_SIZE * 20,
        width: TILE_SIZE * 20,
      }
    });
  }

  public start(){
    console.info("Starting game")
    this._setup();
    this._engine.start();
  }

  public input(input: Input){
    if(input === Input.UP){
      this._gameObjects.player?.moveUp();
    }
    if(input === Input.DOWN){
      this._gameObjects.player?.moveDown();
    }
    if(input === Input.LEFT){
      this._gameObjects.player?.moveLeft();
    }
    if(input === Input.RIGHT){
      this._gameObjects.player?.moveRight();
    }
  }

  private _setup(){
    this._gameObjects.player = new PlayerGameObject();

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
      onSetup: (layer) => {
        layer.addGameObject(this._gameObjects.player!);
      },      
    });
  }
}