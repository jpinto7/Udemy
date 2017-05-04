import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  serverId = 100;
  serverStatus = 'Available';
  serverName = '';

  constructor() {}

  allowNewServers() {
    return true;
  }

  addServer() {
    console.log('jaju');
  }

  ngOnInit() {
  }
}
