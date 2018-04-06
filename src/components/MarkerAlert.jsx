import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet'
import { markerBiasa, markerCuaca, markerJalanPerbaikan, markerMacet, markerKecelakaan } from '../icon'
export default class MarkerJSX extends Component {
  render() {
    var { data } = this.props
    let icon = markerBiasa
    if(data.type==='JAM'){
        icon = markerMacet
    }else if(data.type==='ROAD_CLOSED'){
        icon = markerJalanPerbaikan
    }else if(data.type==='WEATHERHAZARD'){
        icon = markerCuaca
    }else if(data.type==='ACCIDENT'){
        icon = markerKecelakaan
    }
    return (
        <Marker position={[data.location.y, data.location.x]} icon={icon}>
        <Popup>
            <div>
            <span>
                { data.subtype }
            </span>
            </div>
        </Popup>
        </Marker>
    )
  }
};