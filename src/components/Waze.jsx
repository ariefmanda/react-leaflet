import React, { Component } from 'react'
import { observer } from 'mobx-react';
import {
    notification,
    Spin,
    Button
} from 'antd';
import { Map, TileLayer } from 'react-leaflet'
import Waze from '../store/waze'
import MarkerJSX from './MarkerAlert'
@observer class WazeCom extends Component {
    constructor() {
        super()
        this.state = {
            lat: -6.1751,
            lng: 106.8650,
            zoom: 12,
            dataFilter: Waze.data,
            hidden:{
                JAM: false,
                ROAD_CLOSED: false,
                WEATHERHAZARD: false,
                ACCIDENT:false
            }
        }
    }
    componentDidMount() {
        Waze.getWaze()
        if (Waze.err !== false) {
            notification['error']({
                message: 'ERROR',
                description: JSON.stringify(Waze.err),
            });
        }
    }
    moveHidden(hiddenItem){
        let stateWaze = {...this.state}
        stateWaze.hidden[hiddenItem[0]] = !this.state.hidden[hiddenItem[0]]
        this.setState({...stateWaze})
    }
    render() {
        let { lat, lng, zoom, hidden, dataFilter } = this.state
        let position = [lat, lng]
        let { data, loading, err } = Waze
        if (loading) {
            return (
                <center>
                    <Spin size="large"/>
                </center>
            )
        } else if (err) {
            return (
                <center>
                    {JSON.stringify(err)}
                </center>
            )
        } else {
            dataFilter = data.filter(e=>{
                if(e.type === 'JAM' && hidden.JAM) return false
                else if(e.type === 'ROAD_CLOSED' && hidden.ROAD_CLOSED) return false
                else if(e.type === 'WEATHERHAZARD' && hidden.WEATHERHAZARD) return false
                else if(e.type === 'ACCIDENT' && hidden.ACCIDENT) return false
                else return true
            })
            return (
                <center>
                    <Map center={position} zoom={zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />
                        {
                            dataFilter.map((e,i)=><MarkerJSX key={i} data={e}/>)
                        }
                    </Map>
                    <br/>
                    {
                        Object.entries(hidden).map((e,i)=><Button style={{
                        margin: '5px',
                        }} key ={i} type="primary" onClick={()=>this.moveHidden(e)}>{(e[1])?`Tampilkan ${e[0]}`:`Sembunyikan ${e[0]}`}</Button>)
                    }
                </center>
            )
        }
    }
}
export default WazeCom