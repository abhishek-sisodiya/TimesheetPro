import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Home', icon: 'dashboard', class: '' },
    /* { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
    { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
    { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
    { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
    { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' }, */
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    showCalendar = false;

    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (location.pathname == '/daily-sheet') {
            this.showCalendar = true;
        }
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    dateClick() {
        // this.containers = [];
        // this.ControlIndex = 0;
        location.reload();
    }

    dailySheetClick() {
        this.showCalendar = true;
    }

}
