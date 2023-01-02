import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  private socket: Socket;
  private url = 'http://localhost:3000/chat';

  constructor() {
    this.socket = io(this.url);
  }

  userLogin(data: any): void {
    console.log('userlogin')
    this.socket.emit('userLogin', data);
  }
  sendMessage(data: any): void {
    this.socket.emit('clientMessage', data)
  }
  getMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('clientMessage', (data) => {
        console.log(data)
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
  }
}
