"use client";

import { useEffect, useRef, useState } from "react";
import { Game } from "../../../game/game"
import { Box, Button } from "@mui/material";
import { GameRenderContainer } from "./GamePanel.styles";

export default function GamePanel() {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const game = new Game({
    containerRef: gameContainerRef,
  });

  return (
    <Box>
      <Button variant="contained" onClick={() => { game.start() }}>Start</Button>
      <GameRenderContainer ref={gameContainerRef}></GameRenderContainer>
    </Box>)
}
