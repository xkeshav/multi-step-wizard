import {
  Directive,
  ComponentRef,
  TemplateRef,
  ViewContainerRef,
  Input,
  ComponentFactory,
  ComponentFactoryResolver
} from '@angular/core';
import { WaitingComponent } from './waiting.component';

@Directive({
  selector: '[waiting]'
})
export class WaitingDirective {
  waitingFactory: ComponentFactory<WaitingComponent>;
  waitingComponent: ComponentRef<WaitingComponent>;

  @Input()
  set waiting(waitingBoard: WaitingBoard) {
    // make section ( mainly form ) untouchable to prevent user access to change the form data while waiting
    if (waitingBoard.section) {
      document
        .querySelector(`#${waitingBoard.section}`)
        .classList.toggle('untouchable', waitingBoard.hold);
    }
    this.vcRef.clear();
    if (waitingBoard.hold) {
      // create and embed an instance of the waiting component
      this.waitingComponent = this.vcRef.createComponent(this.waitingFactory);
    } else {
      // embed the contents of the host template
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    // Create resolver for waiting component
    this.waitingFactory = this.componentFactoryResolver.resolveComponentFactory(WaitingComponent);
  }
}

interface WaitingBoard {
  hold: boolean;
  section?: string;
}
