import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule }   from '@angular/common/http';
import { ItemComponent } from './item/item.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTooltipModule} from '@angular/material/tooltip';
import {OverlayModule} from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";


@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        HeaderComponent,
        TableComponent,
        MainComponent,
        ItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ScrollingModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        OverlayModule,
        PortalModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
