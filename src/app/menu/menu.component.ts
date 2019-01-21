import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  page: string;

  constructor(private data: DataService) {
    this.page = this.data.page;
  }

  ngOnInit() {
  }

}
