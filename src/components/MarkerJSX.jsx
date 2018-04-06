import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet'
import { markerBiasa } from '../icon'
export default class MarkerJSX extends Component {
  render() {
    var { data } = this.props
    return (
        <div>
        {
          data.map((e) => {
            return (
              <Marker key={e.id} position={[e.lat, e.lng]} icon={markerBiasa}>
                <Popup>
                  <div>
                    <center>
                    <img alt={`Foto ${e.description}`} src={e.image_url} width='150px' height='200px'/>
                    </center>
                    <br/>
                    <span>
                      { e.description }
                    </span>
                  </div>
                </Popup>
              </Marker>
            )
          })
        }
      </div>
    )
  }
};