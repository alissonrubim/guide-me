"use client";

import { useEffect, useRef, useState } from "react";
import { Game } from "../../../game/game"
import { Box, Button, TextareaAutosize } from "@mui/material";
import { GameRenderContainer } from "./GamePanel.styles";
import { Input } from "@/game/input";
import CodeEditor from "../code-editor/CodeEditor";
import { executeCode } from "../code-editor/codeExecutes";

const defaultCode = `
return actions.turnUp();
`

let GLOBAL_GAME: Game | undefined;
let GLOBAL_FORCE_STOP_CODE: boolean = false;

export default function GamePanel() {
  const [code, setCode] = useState(defaultCode);
  const [codeIsOn, setCodeIsOn] = useState(false);
  const [gameIsOn, setGameIsOn] = useState(false);
  const [seed, setSeed] = useState<number | undefined>();
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const onToggleGameOnOff = () => {
    if(!GLOBAL_GAME){
      const _seed = Math.floor(Math.random() * 1000000000);
      setSeed(_seed)
      GLOBAL_GAME = new Game({
        containerRef: gameContainerRef,
        seed: _seed
      });
      GLOBAL_GAME?.start();
      setGameIsOn(true);
    }else{
      GLOBAL_FORCE_STOP_CODE = true;
      GLOBAL_GAME?.stop();
      GLOBAL_GAME = undefined;
      setGameIsOn(false);
    }
  }
  
  
  const onExecuteCode = () => {
    if(codeIsOn){
      GLOBAL_FORCE_STOP_CODE = true;
    }else{
      let i = 0;
      const loopCommand = () => {
        if(!GLOBAL_FORCE_STOP_CODE && i < 5){
          i++;
          GLOBAL_GAME?.input(executeCode(code))
          setTimeout(() => { loopCommand() }, 1000)
        }else{
          setCodeIsOn(false);
          GLOBAL_FORCE_STOP_CODE = false;
        }
      };
      
      setCodeIsOn(true);
      loopCommand();
    }
    
  }
  return (
    <Box>
      
      <Button variant="contained" onClick={() => { GLOBAL_GAME?.input(Input.TURN_UP) }}>Up</Button>
      <Button variant="contained" onClick={() => { GLOBAL_GAME?.input(Input.TURN_DOWN) }}>Down</Button>
      <Button variant="contained" onClick={() => { GLOBAL_GAME?.input(Input.TURN_LEFT)}}>Left</Button>
      <Button variant="contained" onClick={() => { GLOBAL_GAME?.input(Input.TURN_RIGHT) }}>Right</Button>
      <div>Seed: {seed?.toString(16)}</div>

      <Box sx={{ 
        marginTop: '24px',
        padding: 2, 
        backgroundColor: "#8B8B83", 
        borderRadius: "8px", 
        boxShadow: `5px 5px 0px #625f5f`, 
        overflow: "auto",
      }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ marginRight: 2 }}>
            <GameRenderContainer ref={gameContainerRef}></GameRenderContainer>
          </Box>
          <Box sx={{ marginLeft: 2, width: "100%" }}>
            <CodeEditor disabled={codeIsOn} value={code} onChange={(v) => {setCode(v)}}/>
          </Box>
        </Box>

        <Box>
          <Button variant="contained" onClick={() => { onToggleGameOnOff() }} disabled={codeIsOn} >Turn { gameIsOn ? "off" : "on" }</Button>
          <Button variant="contained" onClick={() => { onExecuteCode() }} disabled={!gameIsOn}>{codeIsOn ? "Pause" : "Run" }</Button>
        </Box>
      </Box>
    </Box>)
}
