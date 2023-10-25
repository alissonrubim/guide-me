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

let game: Game | undefined;

export default function GamePanel() {
  const [code, setCode] = useState(defaultCode);
  const [gameIsOn, setGameIsOn] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const onToggleOnOff = () => {
    if(!game){
      game = new Game({
        containerRef: gameContainerRef,
      });
      game?.start();
      setGameIsOn(true);
    }else{
      game?.stop();
      game = undefined;
      setGameIsOn(false);
    }
  }
  
  
  const onExecuteCode = () => {
    game?.input(executeCode(code))
  }
  return (
    <Box>
      
      <Button variant="contained" onClick={() => { game?.input(Input.TURN_UP) }}>Up</Button>
      <Button variant="contained" onClick={() => { game?.input(Input.TURN_DOWN) }}>Down</Button>
      <Button variant="contained" onClick={() => { game?.input(Input.TURN_LEFT)}}>Left</Button>
      <Button variant="contained" onClick={() => { game?.input(Input.TURN_RIGHT) }}>Right</Button>
      <Button variant="contained" onClick={() => { onExecuteCode() }}>Execute</Button>

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
            <CodeEditor value={code} onChange={(v) => {setCode(v)}}/>
          </Box>
        </Box>

        <Box>
            <Button variant="contained" onClick={() => { onToggleOnOff() }}>Turn { gameIsOn ? "off" : "on" }</Button>
          </Box>
      </Box>
    </Box>)
}
