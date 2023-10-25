import { Input } from "@/game/input";

const FN_NAME = "game_code_main"

// Declare the function that will be used to compilet the user code
declare global {
  interface Window {
    [FN_NAME]: (actions: {
      turnUp: () => Input,
      turnDown: () => Input, 
      turnLeft: () => Input,
      turnRight: () => Input,
      walk: () => Input,
      useSensor: () => Input,
      useSuperSensor: () => Input,
    }) => Input;
  }
}

export function executeCode(code: string): Input {
  eval(`window["${FN_NAME}"] = (actions) => { ${code} }`);
  if(!window[FN_NAME]){
    throw new Error("INVALID")
  }

  if(typeof window[FN_NAME] !== "function"){
    throw new Error("INVALID")
  }

  const actions = {
    turnUp: () => Input.TURN_UP,
    turnDown: () => Input.TURN_DOWN,
    turnLeft: () => Input.TURN_LEFT,
    turnRight: () => Input.TURN_RIGHT,
    walk: () => Input.WALK,
    useSensor: () => Input.USE_SENSOR,
    useSuperSensor: () => Input.USE_SUPER_SENSOR
  }

  const result = window[FN_NAME](actions);

  console.info(result)
  return result;
}