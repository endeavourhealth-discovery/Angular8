import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoggerService} from '../../logger/logger.service';
import {AbstractMenuProvider} from '../../layout/menuProvider.service';

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
    window.open('https://help.discoverydataservice.net/Content/Apps/' + this.menuService.getClientId() + '/' + this.context, 'Help');
  }

}
