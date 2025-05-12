import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { peopleOutline, clipboardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class AccountPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
