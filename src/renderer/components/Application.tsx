import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import {DotaDuosContainer} from "../../DotaDuosContainer"

class Application extends React.Component {

  render() {
    return (
      <DotaDuosContainer/>
    )
  }
}

export default hot(Application);
