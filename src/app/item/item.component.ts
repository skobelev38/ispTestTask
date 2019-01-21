import {Component, OnInit, Input, QueryList, ViewChildren} from '@angular/core';
import {DataService} from "../data.service";
import {Overlay, OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {Portal, TemplatePortalDirective} from "@angular/cdk/portal";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

    @Input() id: string;
    @Input() link: string;
    @Input() favoriteActive: boolean = false;
    @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>;
    previewOverlayRef: OverlayRef;
    page: string;

    constructor(private data: DataService, public overlay: Overlay){
        this.page = data.page;
    }

    ngOnInit() {

    }

    handlerClickFavorite(){
        this.data.setFavorite(this.id);
    }

    handlerClickDelete(){
        this.data.deleteItem(this.id);
    }

    handlerClickRestore(){
        this.data.restoreItem(this.id);
    }

    openPreview(e){
        const targetRect = e.target.getBoundingClientRect();
        let top = targetRect.top + targetRect.height + 2;
        let left = targetRect.left + targetRect.width/2 - e.target.naturalWidth/2;
        if(top + e.target.naturalHeight >= document.documentElement.clientHeight) top = targetRect.top - e.target.naturalHeight - 3;

        let config = new OverlayConfig();

        config.positionStrategy = this.overlay.position()
            .global()
            .top(top + 'px')
            .left(left + 'px');

        this.previewOverlayRef = this.overlay.create(config);
        this.previewOverlayRef.attach(this.templatePortals.first);
    }

    closePreview(){
        this.previewOverlayRef.dispose();
    }

}
