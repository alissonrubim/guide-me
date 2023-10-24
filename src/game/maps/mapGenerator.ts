import GameObject from "@/gameEngine/gameObject"
import WallGameObject from "../gameObjects/wallGameObject";
import PlayerGameObject from "../gameObjects/playerGameObject";

export enum EMapTileType {
  NONE,
  WALL,
  PLAYER,
  KEY,
  HOLE,
  BATERY
}

export default class MapGenerator{

  constructor(){

  }

  public generate({
    width,
    height,
    wallDensity,
    numOfHoles
  }: {
    width: number, 
    height: number, 
    wallDensity: number, 
    numOfHoles: number
  }) {
    const map: EMapTileType[][] = [];
  
    // Preencher o mapa com espaços vazios (0)
    for (let i = 0; i < height; i++) {
      map[i] = [];
      for (let j = 0; j < width; j++) {
        map[i][j] = EMapTileType.NONE;
      }
    }
  
    // Definir a posição do jogador (2)
    const playerX: number = Math.floor(Math.random() * (width - 2)) + 1;
    const playerY: number = Math.floor(Math.random() * (height - 2)) + 1;
    map[playerY][playerX] = EMapTileType.PLAYER;
  
    // Encontrar uma posição para o objetivo (3) que esteja a pelo menos 15 blocos de distância do jogador
    let goalX: number, goalY: number;
  
    do {
      goalX = Math.floor(Math.random() * (width - 2)) + 1;
      goalY = Math.floor(Math.random() * (height - 2)) + 1;
    } while (
      playerX === goalX &&
      playerY === goalY &&
      Math.abs(playerX - goalX) + Math.abs(playerY - goalY) < 15
    );
  
    map[goalY][goalX] = EMapTileType.KEY;
  
    // Calcular o número de paredes com base na densidade
    const numWalls: number = Math.floor((width - 2) * (height - 2) * wallDensity / 100);
  
    for (let i = 0; i < numWalls; i++) {
      let wallX: number, wallY: number;
      do {
        wallX = Math.floor(Math.random() * (width - 2)) + 1;
        wallY = Math.floor(Math.random() * (height - 2)) + 1;
      } while (
        wallX === playerX && wallY === playerY ||
        wallX === goalX && wallY === goalY
      );
  
      map[wallY][wallX] = EMapTileType.WALL;
    }
  
    // Preencher os "buracos" nas paredes
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        if (map[y][x] === EMapTileType.NONE) {
          const isSurroundedByWalls =
            map[y - 1][x] === EMapTileType.WALL &&
            map[y + 1][x] === EMapTileType.WALL &&
            map[y][x - 1] === EMapTileType.WALL &&
            map[y][x + 1] === EMapTileType.WALL;
  
          if (isSurroundedByWalls) {
            map[y][x] = EMapTileType.WALL;
          }
        }
      }
    }
  
    // Preencher os "buracos" nas esquinas
    if (map[1][1] === 0 && map[1][2] === EMapTileType.WALL && map[2][1] === EMapTileType.WALL) {
      map[1][1] = EMapTileType.WALL;
    }
  
    if (map[1][width - 2] === EMapTileType.NONE && map[1][width - 3] === EMapTileType.WALL && map[2][width - 2] === EMapTileType.WALL) {
      map[1][width - 2] = EMapTileType.WALL;
    }
  
    if (map[height - 2][1] === EMapTileType.NONE && map[height - 2][2] === EMapTileType.WALL && map[height - 3][1] === EMapTileType.WALL) {
      map[height - 2][1] = EMapTileType.WALL;
    }
  
    if (map[height - 2][width - 2] === EMapTileType.NONE && map[height - 2][width - 3] === EMapTileType.WALL && map[height - 3][width - 2] === EMapTileType.WALL) {
      map[height - 2][width - 2] = EMapTileType.WALL;
    }
  
    // Adicionar armadilhas (4)
    // const numTraps: number = Math.floor((width - 2) * (height - 2) * (100 - wallDensity) / 100);
  
    // for (let i = 0; i < numTraps; i++) {
    //   let trapX: number, trapY: number;
    //   do {
    //     trapX = Math.floor(Math.random() * (width - 2)) + 1;
    //     trapY = Math.floor(Math.random() * (height - 2)) + 1;
    //   } while (
    //     (trapX === playerX && trapY === playerY) ||
    //     (trapX === goalX && trapY === goalY) ||
    //     map[trapY][trapX] === 1
    //   );
  
    //   map[trapY][trapX] = 4;
    // }
  
    // Preencher os buracos
    // for (let i = 0; i < numHoles; i++) {
    //   let holeX: number, holeY: number;
    //   do {
    //     holeX = Math.floor(Math.random() * (width - 2)) + 1;
    //     holeY = Math.floor(Math.random() * (height - 2)) + 1;
    //   } while (
    //     (holeX === playerX && holeY === playerY) ||
    //     (holeX === goalX && holeY === goalY) ||
    //     map[holeY][holeX] === 1 ||
    //     map[holeY][holeX] === 4
    //   );
  
    //   map[holeY][holeX] = 0;
    // }
  
    return map;
    
  }
} 