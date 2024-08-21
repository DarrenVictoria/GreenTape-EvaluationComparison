import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//Data Service here

import { AppComponent } from './app.component';
import { EvaluationComparisonTabsComponent } from './evaluation-comparison-tabs/evaluation-comparison-tabs.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { BidComparisonTableComponent } from './bid-comparison-table/bid-comparison-table.component';
import { ShortlistCommitteeComponent } from './shortlist-committee/shortlist-committee.component';
import { AwarderComponent } from './awarder/awarder.component';
import { ScoreSheetComponent } from './score-sheet/score-sheet.component';
import { PreawardCommitteeComponent } from './preaward-committee/preaward-committee.component';
import { ShortlistCommittee2Component } from './shortlist-committee-2/shortlist-committee-2.component';


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
    PreawardCommitteeComponent,
    ShortlistCommittee2Component,



  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [],   //Add here InMemoryDataService
  bootstrap: [AppComponent]
})
export class AppModule { }
