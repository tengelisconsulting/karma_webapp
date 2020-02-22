import { Component } from '@angular/core';
import { AppLoadService } from './core/service/app-load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'karma-webapp';

  constructor(
    private appLoad: AppLoadService,
  ) {
    this.init();
  }

  private async init(): Promise<void> {
    await this.appLoad.startupAttemptOnAppLoad();
  }

}
