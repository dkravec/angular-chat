import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../gateway.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  public currentUser: any;
  public selectedUser: any;
  public messageContent: string = '';
  // public messageArray

  /*
  id (un-needed but needed)
  content (of message)
  userId
  userEmail
  sendTo
  */
  public messageArray: any[] = []

  public userList: any[] = [
    {
      'id': 1,
      'userId' : 6337,
      'userEmail' : 'tester1@gmail.com',
    },
    {
      'id': 2,
      'userId' : 2637,
      'userEmail' : 'tester2@gmail.com',
    },
    {
      'id': 3,
      'userId' : 597,
      'userEmail' : 'tester3@gmail.com',
    }
  ]

  constructor (
    private chatService: GatewayService
  ) {
    this.chatService.getMessage()
      .subscribe((data: any) => {
        this.messageArray.push(data);
        this.messageArray = [...this.messageArray];
        console.log(this.messageArray)
      })
  }

  ngOnInit(): void {
    this.currentUser = this.userList[0];
  }

  writingContent(content: string): void {
    this.messageContent = content;
    console.log(this.messageContent)

  }
  currentUserSelect(email: string): void {
    this.currentUser = this.userList.find(user => user.userEmail === email);
    console.log(this.currentUser)
    this.chatService.userLogin({
      userId: this.currentUser.userId,
      userEmail: this.currentUser.userEmail,
    })
  }

  selectSendTo(email: string): void {
    console.log(email)
    this.selectedUser = this.userList.find(user => user.userEmail === email);
    console.log(this.selectedUser)
  }
  sendMessage(): void {
    const messageData = {
      'id': this.currentUser.id,
      'content' : this.messageContent,
      'userId': this.currentUser.userId,
      'userEmail': this.currentUser.userEmail,
      'sendTo' : this.selectedUser.userEmail
    }
    console.log(messageData)
    this.chatService.sendMessage(messageData)
    this.messageContent = '';
    this.messageArray.push(messageData)
  }

}
