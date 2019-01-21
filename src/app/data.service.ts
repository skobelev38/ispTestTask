import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) {
        this.loading = true;
        this.http.get('https://api.github.com/emojis').subscribe((itemsData: IItemsData)=>{
            this.loading = false;
            this.getDataFromLocalStorage();
            this.itemsData = itemsData;
            this.changeVisibleItems();
        });
    }

    itemsData: IItemsData = {};
    favoritesItems: string[] = [];
    deletedItems: string[] = [];
    page: string = 'all';
    searchValue: string = '';
    loading: boolean = false;
    visibleItems = new BehaviorSubject <IVisibleItems[]>([]);
    eventVisibleItems = this.visibleItems.asObservable();

    changePage(page: string){
        this.page = page === '' ? 'all' : page;
        this.searchValue = '';
        this.changeVisibleItems();
    }

    getTitle(){
        const titles = {
            all: 'Все',
            favorites: 'Любимые',
            deleted: 'Удаленные',
        };
        return titles[this.page];
    }

    changeSearchValue(searchValue: string){
        if(this.searchValue !== searchValue){
            this.searchValue = searchValue;
            this.changeVisibleItems();
        }
    }

    changeVisibleItems(){
        let visibleItems = [];

        Object.keys(this.itemsData).forEach((id)=>{
            if(this.checkItem(id)){
                visibleItems.push({
                    id: id,
                    link: this.itemsData[id],
                    favoriteActive: this.favoritesItems.includes(id),
                })
            }
        });

        this.visibleItems.next(visibleItems);
    }

    checkItem(id: string){
        if(this.searchValue !== '' && !id.toLowerCase().includes(this.searchValue.toLowerCase())) return false;
        if(this.page === 'all' && !this.deletedItems.includes(id)) return true;
        if(this.page === 'favorites' && !this.deletedItems.includes(id) && this.favoritesItems.includes(id)) return true;
        if(this.page === 'deleted' && this.deletedItems.includes(id)) return true;
        return false;
    }

    setFavorite(id: string){
        const index = this.favoritesItems.indexOf(id);
        if(index === -1){
            this.favoritesItems.push(id);
        }else{
            this.favoritesItems.splice(index, 1);
        }
        this.changeVisibleItems();
        localStorage.setItem('favoritesItems', JSON.stringify(this.favoritesItems));
    }

    deleteItem(id: string){
        if(!this.deletedItems.includes(id)) this.deletedItems.push(id);
        this.changeVisibleItems();
        localStorage.setItem('deletedItems', JSON.stringify(this.deletedItems));
    }

    restoreItem(id: string){
        this.deletedItems = this.deletedItems.filter(item => item !== id);
        this.changeVisibleItems();
        localStorage.setItem('deletedItems', JSON.stringify(this.deletedItems));
    }

    getDataFromLocalStorage(){
        this.favoritesItems = JSON.parse(localStorage.getItem('favoritesItems')) || [];
        this.deletedItems = JSON.parse(localStorage.getItem('deletedItems')) || [];
    }

}


interface IItemsData {[key: string]: string;}
interface IVisibleItems { id: string; link: string;}