import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessMapComponent } from './process-map/process-map.component';
import { BaseGraphComponent } from './base-graph/base-graph.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [ProcessMapComponent, BaseGraphComponent],
  exports: [ProcessMapComponent]
})
export class CytoscapeModule { }