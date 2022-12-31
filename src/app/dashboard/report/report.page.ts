import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoTables() {
    this.router.navigateByUrl('/dashboard/tables');
  }

}
