import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private statusBar: StatusBar) { }

  ngOnInit() {
    // Status bar style
    this.statusBar.backgroundColorByHexString('#000000');
    this.statusBar.styleLightContent();
  }

}
