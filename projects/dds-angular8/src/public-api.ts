/*
 * Public API Surface of dds-angular8
 */
export {AbstractMenuProvider} from './lib/layout/menuProvider.service';
export {LayoutModule} from './lib/layout/layout.module';
export {LayoutComponent} from './lib/layout/layout.component';
export {MenuOption} from './lib/layout/models/MenuOption';

export {SecurityModule} from './lib/security/security.module';
export {CanActivateRouteGuard} from './lib/security/can-activate-route.guard';

export {LoggerModule} from './lib/logger/logger.module';
export {LoggerService} from './lib/logger/logger.service';

export {UserManagerModule} from './lib/user-manager/user-manager.module';
export {UserManagerService} from './lib/user-manager/user-manager.service';

export {CoreModule} from './lib/core/core.module';
export {StateService} from './lib/core/state.service';

export {GenericTableModule} from './lib/generic-table/generic-table.module';
export {GenericTableComponent} from './lib/generic-table/generic-table/generic-table.component';
export {GenericTableSspComponent} from './lib/generic-table/generic-table-ssp/generic-table-ssp.component';

export {DialogsModule} from './lib/dialogs/dialogs.module';
export {MessageBoxDialogComponent} from './lib/dialogs/message-box-dialog/message-box-dialog.component';
