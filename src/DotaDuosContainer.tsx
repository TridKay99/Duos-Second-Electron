import React from 'react'
import {HeroImages} from "./hero-image-modal/HeroImages"
import {DotaDuosHome} from "./dota-duos-home/DotaDuosHome"
import {Heroes} from "./dota-data/heroes"
import './styling/dota-duos-container.css'
import { Tab } from 'semantic-ui-react'

export enum TabPanes {
  HOME = 'Home',
  HEROES = 'heroes'
}

type State = {
  heroImg: string
}

export class DotaDuosContainer extends React.Component<{}, State>{

  homeTab = () => {
   return (
     <Tab.Pane>
       <DotaDuosHome/>
     </Tab.Pane>
   )
  }

  heroesTab = () => {
    return (
      <Tab.Pane>
        {Heroes.map((hero) => {
          return <HeroImages hero={hero}/>
        })}
      </Tab.Pane>
    )
  }

  render() {
    return(
      <div className={'dota_duos_container'}>
        <Tab menu={{pointing: true, secondary: true}}
             enderactiveonly="false"
             panes={[
               {menuItem: TabPanes.HOME, render: () => this.homeTab()},
               {menuItem: TabPanes.HEROES, render: () => this.heroesTab()}
             ]}
        />
      </div>
    )
  }
}