import { Typography } from '@mui/material'
import GamePanel from './components/game/GamePanel'

export default function Home() {
  return (
    <main>
      <Typography mb={4}>Guide Me</Typography>
      <GamePanel />
    </main>
  )
}
