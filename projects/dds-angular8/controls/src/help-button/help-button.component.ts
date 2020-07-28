import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoggerService} from 'dds-angular8/logger';
import {AbstractMenuProvider} from 'dds-angular8/core';

@Component({
  selector: 'help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss']
})
export class HelpButtonComponent implements OnInit {
  @Input('helpContext')
  context: string;

  constructor(
    private log: LoggerService,
    private router: Router,
    private menuService: AbstractMenuProvider
  ) { }

  ngOnInit() {
  }

  callHelp() {
    window.open('https://wiki.discoverydataservice.org/index.php?title=' + (this.menuService.getApplicationTitle().replace(' ', '_')) + '/' +  this.context, 'Help');
  }

}
