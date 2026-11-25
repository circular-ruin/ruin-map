import { LabelLayer } from './scene/Labels'
import { Scene } from './scene/Scene'
import { ControlPanel } from './ui/ControlPanel'
import { DetailPanel } from './ui/DetailPanel'
import { Hud } from './ui/Hud'
import { Introduction } from './ui/Introduction'
import { Search } from './ui/Search'

export default function App() {
  return (
    <>
      <ControlPanel />
      <Scene />
      <LabelLayer />
      <Hud />
      <Introduction />
      <Search />
      <DetailPanel />
    </>
  )
}
