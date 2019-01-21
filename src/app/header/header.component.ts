import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    title: string;
    count: number = 0;
    subscription: Subscription;
    searchValue: string = '';

    constructor(private data: DataService){
        this.title = this.data.getTitle();
    }

    ngOnInit() {
        this.subscription = this.data.eventVisibleItems.subscribe(()=>{
            this.searchValue = this.data.searchValue;
            this.count = this.data.visibleItems.getValue().length;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onKey(e){
        this.data.changeSearchValue(e.target.value);
    }
}
