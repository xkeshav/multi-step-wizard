import { Component } from '@angular/core';

@Component({
  selector: 'waitingComponent',
  template: `<div class="spinner--stretched">
					<div class="rect1"></div>
					<div class="rect2"></div>
					<div class="rect3"></div>
					<div class="rect4"></div>
					<div class="rect5"></div>
				</div>`,
  styleUrls: ['waiting.component.less']
})
export class WaitingComponent {}
