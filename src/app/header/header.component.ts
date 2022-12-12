import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent {
    @Output() 
    changeTabEvent = new EventEmitter<String>();

    onSelect(tabName: string) {
        this.changeTabEvent.emit(tabName);
    }
}