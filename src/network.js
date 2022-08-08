import axios from 'axios';
const http = axios.create({baseURL: 'http://localhost:1212'});

class Network{

    getAuthHeader(api){
        console.log('API: '+api);
        if(api.toString()==='/authenticate') return null;
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user && user.token) return { Authorization: 'Bearer ' + user.token };
        window.location.pathname = '/' ;
    }

    get(api){
        return http.get(api,{headers:this.getAuthHeader(api)})
            .then(response=>{return this.onSuccess(response)})
            .catch(error=>{return this.onError(error)});
    }

    post(api,body){
        return http.post(api,body,{headers:this.getAuthHeader(api)})
            .then(response=>{return this.onSuccess(response)})
            .catch(error=>{return this.onError(error)});
    }

    onSuccess(response){
        console.log(response);
        return response.data;
    }

    onError(error){
        console.log(error);
        if(error.response.data['error'].toString()==='Unauthorized')
            window.location.pathname = '/' ;
        else alert(error.toString());
        return false
    }

}
export default new Network()