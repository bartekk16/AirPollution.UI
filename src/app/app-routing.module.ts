import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './forecast/forecast.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { SimulatePollutionComponent } from './simulate-pollution/simulate-pollution.component';

const routes: Routes = [
  { path: '', component: ForecastComponent },
  { path: 'forecast', component: ForecastComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'simulate', component: SimulatePollutionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
