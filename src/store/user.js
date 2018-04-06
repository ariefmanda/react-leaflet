import { observable } from 'mobx'
import axios from 'axios'
class Users {
  @observable data = []
  @observable loading = false
  @observable err = false
  getUser() {
    this.loading = true
    axios.get('https://ext.qlue.id/example/top_report',{
        headers:{
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicWx1ZWluIiwiaWF0IjoxNDk0Mzk5Njg1fQ.mG5wmoCwmchufTPloxI7AjZaeM_bwcpCEJpyUnCDrmk'
        }
    })
        .then(({data})=>{
            this.data = data
            this.loading = false
        })
        .catch(err=>{
            this.err = err
            this.loading = false
        })
  }
}

export default new Users()