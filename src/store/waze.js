import { observable } from 'mobx'
import axios from 'axios'
class Waze {
  @observable data = []
  @observable loading = false
  @observable err = false
  getWaze() {
    this.loading = true
    axios.get('http://35.187.248.19/feeder/update/vFDlJkLMJ4RKjjqFs5yLO33T3tHvsqF7.json')
        .then(({data})=>{
            this.data = data.alerts
            this.loading = false
        })
        .catch(err=>{
            this.err = err
            this.loading = false
        })
  }
}

export default new Waze()