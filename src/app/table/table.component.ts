import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import { Subscription }   from 'rxjs';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    visibleItems = [];
    subscription: Subscription;
    loading: boolean = false;

    constructor(private data: DataService) {}

    ngOnInit() {
        this.subscription = this.data.eventVisibleItems.subscribe(()=>{
            this.visibleItems = this.data.visibleItems.getValue();
            this.loading = this.data.loading;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
