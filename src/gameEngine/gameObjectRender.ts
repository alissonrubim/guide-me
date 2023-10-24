import GameObject from "./gameObject";

export default abstract class GameObjectRender {
  public abstract draw(gameObject: GameObject, context: CanvasRenderingContext2D): void;
}