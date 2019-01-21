import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private data: DataService){
      let page = this.activateRoute.snapshot.routeConfig.path;
      this.data.changePage(page);
  }

  ngOnInit() {

  }

}
