import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { EvaluationComparisonTabsComponent } from './evaluation-comparison-tabs/evaluation-comparison-tabs.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { BidComparisonTableComponent } from './bid-comparison-table/bid-comparison-table.component';
import { ShortlistCommitteeComponent } from './shortlist-committee/shortlist-committee.component';
import { AwarderComponent } from './awarder/awarder.component';
import { ScoreSheetComponent } from './score-sheet/score-sheet.component';


const routes: Routes = [
  { path: '', component: EvaluationComparisonTabsComponent },


];



@NgModule({
  declarations: [
    AppComponent,
    EvaluationComparisonTabsComponent,
    PlaceholderComponent,
    BidComparisonTableComponent,
    ShortlistCommitteeComponent,
    AwarderComponent,
    ScoreSheetComponent,



  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
