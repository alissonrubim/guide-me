import GameObject from "../gameObject";

export default abstract class Painter {
  public abstract draw(gameObject: GameObject, context: CanvasRenderingContext2D): void;
}