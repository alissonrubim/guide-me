import { RefObject, createRef } from "react";
import Size from "./types/size";
import Layer from "./layer";

enum GameEngineStatus {
  STARTING = 'STARTING',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  STOPPING = 'STOPPING',
  STOPPED = 'STOPPED',
}

export default class GameEngine {
  public readonly resolution: Size;

  private _status: GameEngineStatus;
  private _fps: number = 0;
  private _containerRef: RefObject<HTMLDivElement>;
  private _layers: Layer[] = [];
  private _loopTimer?: NodeJS.Timeout;
  private _loopTimeStamp?: Date;
  
  constructor({ 
    containerRef,
    resolution
  }:{ 
    resolution: Size
    containerRef: RefObject<HTMLDivElement>
  }){
    this._containerRef = containerRef;
    this.resolution = resolution;
    this._status = GameEngineStatus.STOPPED;
  }

  public destroy(){
    this.stop();
    this._layers.forEach((l) => { l.destroy() })
  }

  public start(){
    if(this._status === GameEngineStatus.STOPPED){
      this._setup();
    }
  }

  public pause(){
    if(this._status === GameEngineStatus.STARTED){
      this._status = GameEngineStatus.PAUSED;
    }
  }

  public resume(){
    if(this._status === GameEngineStatus.PAUSED){
      this._status = GameEngineStatus.STARTED;
    }
  }

  public stop(){
    if(this._status === GameEngineStatus.STARTED){
      this._stopMainLoop();
    }
  }

  public getFps(){
    return this._fps;
  }

  public addLayer({ 
    id, 
    onDraw,
    onLoop,
    onSetup, 
  }: { 
    id: string, 
    onDraw?: (context: CanvasRenderingContext2D) => void; 
    onLoop?: () => void;
    onSetup?: (layer: Layer) => void;
  }){
    this._layers.push(new Layer({
      id: id,
      resolution: this.resolution,
      containerRef: this._containerRef,
      onDraw,
      onLoop,
      onSetup,
    }))
  }

  private _stopMainLoop(){
    this._status === GameEngineStatus.STOPPING;
    clearTimeout(this._loopTimer);
  }

  private _startMainLoop(){
    if(this._status === GameEngineStatus.STOPPING){
      this._status = GameEngineStatus.STOPPED;
    }else{
      if(this._status === GameEngineStatus.STARTED){
        this._loop();
        this._draw();
      }

      // Calculate the fps
      this._fps = ~~(1000/(new Date().getTime() - this._loopTimeStamp!.getTime()));
      this._loopTimeStamp = new Date();

      this._loopTimer = setTimeout(() => {
        this._startMainLoop();
      }, 1)
    }
  }

  private _setup() {
    this._status = GameEngineStatus.STARTING;
    this._layers.forEach((l) => l.setup());
    this._loopTimeStamp = new Date();
    this._startMainLoop();
    this._status = GameEngineStatus.STARTED;
  }

  private _loop(){
    this._layers.forEach((l) => l.loop());
  }

  private _draw(){
    this._layers.forEach((l) => l.draw());
  }
}