import React, { Component } from 'react'
import { observer } from 'mobx-react';
import {
    notification,
    Spin,
    Button
} from 'antd';
import { Map, TileLayer } from 'react-leaflet'
import Users from '../store/user'
import MarkerJSX from './MarkerJSX'
@observer class Home extends Component {
    constructor() {
        super()
        this.state = {
            lat: -6.1751,
            lng: 106.8650,
            zoom: 12,
            hidden: false
        }
    }
    componentDidMount() {
        Users.getUser()
        if (Users.err !== false) {
            notification['error']({
                message: 'ERROR',
                description: JSON.stringify(Users.err),
            });
        }
    }
    moveHidden(){
        this.setState({...this.state,hidden:(!this.state.hidden)})
    }
    render() {
        let { lat, lng, zoom, hidden } = this.state
        let position = [lat, lng]
        let { data, loading, err } = Users
        if (loading) {
            return (
                <center  style={{
                    marginTop: '15%',
                    marginBottom: '15%',
                }}>
                    <Spin size="large" />
                </center>
            )
        } else if (err) {
            return (
                <center>
                    {JSON.stringify(err)}
                </center>
            )
        } else {
            return (
                <center>
                    <Map center={position} zoom={zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />
                        {(!hidden)?<MarkerJSX data={data} />:''}
                    </Map>
                    <br/>
                    <Button type="primary" onClick={()=>this.moveHidden()}>{(hidden)?'Tampilkan':'Sembunyikan'}</Button>
                </center>
            )
        }
    }
}
export default Home