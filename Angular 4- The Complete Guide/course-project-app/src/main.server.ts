import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
export { AppServerModule } from './app/app.server.module';

if (environment.production) {
  enableProdMode();
}
