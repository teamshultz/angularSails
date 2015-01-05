import {Request} from './Request';
import {headers} from './Util';

class HttpRequest extends Request {

  constructor(url,options){
    super(url,options);
  }

  fetch(){

    var self = this;

    return new Promise(function(resolve,reject){

      var xhr = new XMLHttpRequest();

      xhr.onload = function(){
        var status = (xhr.status === 1223) ? 204 : xhr.status;

        if (status < 100 || status > 599) {
          reject(new TypeError('Network request failed'))
          return;
        }

        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr)
        }

        resolve(new Response(xhr.responseText, options));
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(self.method, self.url);

      self.headers.forEach(function(name, values) {
        values.forEach(function(value) {
          xhr.setRequestHeader(name, value)
        });
      });

      xhr.send((self._body === undefined) ? null : self._body);

    });

  }


}