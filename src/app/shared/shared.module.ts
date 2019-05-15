import { DataService } from './services/slider-data.service';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Injector } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SliderComponent } from './components/slider/slider.component';
import { createCustomElement } from '@angular/elements';

const DIRECTIVES = [
];

const ENTRY_COMPONENTS = [
  SliderComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ...DIRECTIVES,
    ...ENTRY_COMPONENTS,
  ],
  exports: [
    MaterialModule,
    ...ENTRY_COMPONENTS,
    ...DIRECTIVES,
  ],
  entryComponents: [
    ENTRY_COMPONENTS
  ]
})
export class SharedModule {

  constructor(private injector: Injector) {
    const slider = createCustomElement(SliderComponent, { injector });
    customElements.define('motley-slider', slider);
  }

  public static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule,
          providers: [
            DataService,
          ],
      };
  }

}
