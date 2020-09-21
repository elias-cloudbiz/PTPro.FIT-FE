import { Component, AfterViewInit, OnInit, } from '@angular/core';

import {
    Router, NavigationStart, NavigationCancel, NavigationEnd
} from '@angular/router';
import { MatDialog } from "@angular/material/dialog";

import { NotificationService } from './providers/services/notification.service';
import { AuthService } from './providers/guards/auth.service';
import { SessionService } from './providers/services/session.service';
import { StartupComponent } from './theme/dialog/startup/startup.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
    notification: string;
    showNotification: boolean;
    private Lat;
    private Long;
    private p = true;

    constructor(
        private router: Router,
        private notificationService: NotificationService,
        public auth: AuthService,
        private session: SessionService,
        private modalService: MatDialog
    ) {

    }

    ngOnInit() {
        this.session.initiateApp();

        if(this.session.GeoDeviceSupport == false)
            this.modalService.open(StartupComponent);
        
    }

    ngAfterViewInit() {

    }

    reloadPage() {
        if (this.session.loaded) {
            window.location.reload();
        }
    }

}


