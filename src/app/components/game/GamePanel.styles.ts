import { TILE_COL_COUNT, TILE_ROW_COUNT, TILE_SIZE } from "@/game/const";
import { styled } from "@mui/material";

export const GameRenderContainer = styled("div")(() => ({
  border: '4px solid #3b3b3b',
  backgroundColor: '#3b3b3b',
  borderRadius: '8px',
  height: `${TILE_SIZE * TILE_ROW_COUNT}px`,
  width: `${TILE_SIZE * TILE_COL_COUNT}px`,
}));
