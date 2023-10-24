import GameEngine from "@/gameEngine/gameEngine";
import GameObject from "@/gameEngine/gameObject";
import { RefObject } from "react";
import PlayerGameObject from "./gameObjects/playerGameObject";
import { TILE_COL_COUNT, TILE_ROW_COUNT, TILE_SIZE } from "./const";
import { Input } from "./input";
import GlassGroundGameObject from "./gameObjects/grassGameObject";
import BackGroundGameObject from "./gameObjects/blackgroundGameObject";
import WallGameObject from "./gameObjects/wallGameObject";
import MapGenerator, { EMapTileType } from "./maps/mapGenerator";
import KeyGameObject from "./gameObjects/keyGameObject";

export class Game {
  private _engine: GameEngine;
  private _gameObjectsLib: {
    player?: PlayerGameObject,
    key?: KeyGameObject,
    walls?: WallGameObject[],
  } = {
    player: undefined,
    walls: []
  }

  constructor({ containerRef }:{ containerRef: RefObject<HTMLDivElement>}){
    this._engine = new GameEngine({
      containerRef,
      resolution: {
        height: TILE_SIZE * TILE_ROW_COUNT,
        width: TILE_SIZE * TILE_COL_COUNT,
      }
    });
  }

  public start(){
    console.info("Starting game...")
    this._setup();
    console.info("Game started!")
  }

  public input(input: Input){
    if(input === Input.UP){
      this._gameObjectsLib.player?.moveUp();
    }
    if(input === Input.DOWN){
      this._gameObjectsLib.player?.moveDown();
    }
    if(input === Input.LEFT){
      this._gameObjectsLib.player?.moveLeft();
    }
    if(input === Input.RIGHT){
      this._gameObjectsLib.player?.moveRight();
    }
  }

  private _setup(){
    this._map = new MapGenerator().generate({
      width: TILE_ROW_COUNT,
      height: TILE_COL_COUNT,
      numOfHoles: 0,
      wallDensity: 10
    }).map((arr, i) => arr.map((x, j) => {
      if(x === EMapTileType.PLAYER){
        this._gameObjectsLib.player = new PlayerGameObject("player", { x: i, y: j });
        return this._gameObjectsLib.player
      }else if(x === EMapTileType.WALL){
        const wall = new WallGameObject(`wall-${i}-${j}`, { x: i, y: j });
        this._gameObjectsLib.walls?.push(wall)
        return wall;
      }else if(x === EMapTileType.KEY){
        this._gameObjectsLib.key= new KeyGameObject(`key`, { x: i, y: j });
        return this._gameObjectsLib.key;
      }else {
        return undefined
      }
    }));

    this._engine.addLayer({
      id: "background",
      onSetup: (layer) => {
        layer.addGameObject(new BackGroundGameObject("background"));
      },      
    });

    this._engine.addLayer({
      id: "grass-floor",
      onSetup: (layer) => {
        layer.addGameObject(new GlassGroundGameObject("glass-floor"));
      },      
    });

    this._engine.addLayer({
      id: "walls",
      onSetup: (layer) => {
        this._gameObjectsLib.walls?.forEach((wall) => layer.addGameObject(wall));
      },      
    });

    this._engine.addLayer({
      id: "items",
      onSetup: (layer) => {
        layer.addGameObject(this._gameObjectsLib.key!);
      },      
    });

    this._engine.addLayer({
      id: "player",
      onSetup: (layer) => {
        layer.addGameObject(this._gameObjectsLib.player!);
      },      
    });

    this._engine.start();
  }
}