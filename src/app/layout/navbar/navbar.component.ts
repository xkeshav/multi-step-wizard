import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../workflow/workflow.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  navbarList: {}[];
  isActive: boolean = false;
  constructor(private workflowService: WorkflowService) {}

  ngOnInit() {
    this.navbarList = this.workflowService.getNavbarList();
    this.getCurrentState();
  }

  getCurrentState() {
    this.workflowService.getCurrentState().subscribe((state: any) => {
      this.navbarList.map((list: any) => Object.assign(list, { active: list.link === state.name }));
    });
  }
}
