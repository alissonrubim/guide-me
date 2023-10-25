export class Random {
  private _seed: number;

  constructor(seed: number){
    this._seed = seed;
  }

  public get() {
    this._seed = (this._seed * 9301 + 49297) % 233280;
    return this._seed / 233280;
  }
} 