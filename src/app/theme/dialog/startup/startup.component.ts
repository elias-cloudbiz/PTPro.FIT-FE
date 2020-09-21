import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<StartupComponent>) { }

  ngOnInit(): void {
  }
  save() {
    this.close();
  }

  close() {
      this.dialogRef.close();
  }
}
