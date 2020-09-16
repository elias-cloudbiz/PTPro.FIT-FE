import { Component, ViewChild, OnInit, AfterViewChecked, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../providers/services/modal.service';
import { RestfulAPI } from '../../../providers/services/RestfulAPI.service';
import { AuthService } from '../../../providers/guards/auth.service';
import { SessionService } from '../../../providers/services/session.service';
import { SharingService } from '../../../providers/guards/sharing.service';
import { I18nService } from '../../../providers/services/i18n.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable()
export class HeaderComponent implements OnInit, AfterViewChecked {

  animal: string;
  name: string;
  public Region: string;
  public miniNavigator = false;
  private SessionService: any;

  constructor(public dialog: MatDialog,
    private modalService: ModalService,
    public API: RestfulAPI,
    private router: Router,
    public session: SessionService,
    public authservice: AuthService,
    private sharingservice: SharingService) {

    this.SessionService = session;
    //i18nService.use('en').then((result) => {});

  }

  getFirstName(){
    return this.sharingservice.firstname;
  }

  getLastName(){
    return this.sharingservice.lastname;
  }

  redirect(input) {
    this.router.navigate(['/helsetjenester']);
    console.log('shall redirect');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  triggerMenu() {
    if (this.miniNavigator)
      this.miniNavigator = false;
    else
      this.miniNavigator = true;
  }

  triggerMiniNavigator() {

  }



  ngOnInit() {

    if (window.location.pathname === "/meld-inn" && this.miniNavigator == false)
      this.miniNavigator = true;
    else if (window.location.pathname === "/my" && this.miniNavigator == false)
      this.miniNavigator = true;


    if (this.authservice.isAuthenticated())
      this.miniNavigator = true;
    else
      this.miniNavigator = false;
 }

  ngAfterViewChecked() {

  }

  reloadPage() {
    if (this.SessionService.loaded) {
      window.location.reload();
    }

  }



}
