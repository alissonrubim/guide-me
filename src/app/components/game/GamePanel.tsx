"use client";

import { useEffect, useRef, useState } from "react";
import { Game } from "../../../game/game"
import { Box, Button } from "@mui/material";
import { GameRenderContainer } from "./GamePanel.styles";
import { Input } from "@/game/input";

export default function GamePanel() {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const game = new Game({
    containerRef: gameContainerRef,
  });

  return (
    <Box>
      <Button variant="contained" onClick={() => { game.start() }}>Start</Button>
      <Button variant="contained" onClick={() => { game.input(Input.UP) }}>Up</Button>
      <Button variant="contained" onClick={() => { game.input(Input.DOWN) }}>Down</Button>
      <Button variant="contained" onClick={() => { game.input(Input.LEFT)}}>Left</Button>
      <Button variant="contained" onClick={() => { game.input(Input.RIGHT) }}>Right</Button>
      <GameRenderContainer ref={gameContainerRef}></GameRenderContainer>
    </Box>)
}
