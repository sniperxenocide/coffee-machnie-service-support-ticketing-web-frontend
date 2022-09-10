import axios from 'axios';
const http = axios.create({baseURL: 'http://localhost:1212'});

class Network{

    showLoader(){
        document.getElementById('progress_loader_div').style.display='block';
    }

    hideLoader(){
        document.getElementById('progress_loader_div').style.display='none';
    }

    getAuthHeader(api){
        console.log('API: '+api);
        if(api.toString()==='/authenticate') return null;
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user && user.token) return { Authorization: 'Bearer ' + user.token };
        window.location.pathname = '/' ;
    }

    get(api){
        this.showLoader();
        return http.get(api,{headers:this.getAuthHeader(api)})
            .then(response=>{return this.onSuccess(response)})
            .catch(error=>{return this.onError(error)});
    }

    post(api,body){
        this.showLoader();
        return http.post(api,body,{headers:this.getAuthHeader(api)})
            .then(response=>{return this.onSuccess(response)})
            .catch(error=>{return this.onError(error)});
    }

    onSuccess(response){
        this.hideLoader();
        console.log(response);
        return response.data;
    }

    onError(error){
        this.hideLoader();
        console.log(error);
        if(error.response.data['error'].toString()==='Unauthorized')
            window.location.pathname = '/' ;
        else alert(error.toString());
        return false
    }

}
export default new Network()