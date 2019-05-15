import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './start-page.routes';

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
})
export class StartPageRoutingModule { }
