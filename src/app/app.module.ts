import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';



import { AppComponent } from './app.component';
import { EvaluationComparisonTabsComponent } from './evaluation-comparison-tabs/evaluation-comparison-tabs.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { BidComparisonTableComponent } from './bid-comparison-table/bid-comparison-table.component';
import { ShortlistCommitteeComponent } from './shortlist-committee/shortlist-committee.component';
import { AwarderComponent } from './awarder/awarder.component';
import { ScoreSheetComponent } from './score-sheet/score-sheet.component';
import { PreawardCommitteeComponent } from './preaward-committee/preaward-committee.component';
import { ShortlistCommittee2Component } from './shortlist-committee-2/shortlist-committee-2.component';

import { InMemoryDataService } from './services/in-memory-data.service';
import { BidComparisonDataService } from './services/bid-comparison-data.service';
import { BidComparisonConvertorService } from './convertors/bid-comparison-convertor.service';

import { ShortlistCommitteeConvertorService } from './convertors/shortlist-committee-convertor.service';
import { ShortlistCommitteeService } from './services/shortlist-committee.service';
import { AwarderConvertorService } from './convertors/awarder-convetor.service';
import { AwarderService } from './services/awarder.service';
import { ShortlistCommittee2ConvertorService } from './convertors/shortlist-committee-2-convertor.service';
import { ShortlistCommittee2Service } from './services/shortlist-committee2.service';
import { PreAwardCommitteeService } from './services/preaward-committee.service';
import { PreAwardCommitteeConvertorService } from './convertors/preaward-committee-convertor.service';
import { ScoreSheetService } from './services/score-sheet.service';
import { ScoreSheetConverterService } from './convertors/score-sheet-convertor.service';
import { TenderDetailsService } from './services/tender-details.service';
import { TenderDetailsConverterService } from './convertors/tender-details-convertor.service';


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
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })

  ],
  providers: [
    InMemoryDataService,
    BidComparisonDataService,
    BidComparisonConvertorService,
    ShortlistCommitteeConvertorService,
    ShortlistCommitteeService,
    AwarderConvertorService,
    AwarderService,
    ShortlistCommittee2ConvertorService,
    ShortlistCommittee2Service,
    PreAwardCommitteeService,
    PreAwardCommitteeConvertorService,
    ScoreSheetService,
    ScoreSheetConverterService,
    TenderDetailsService,
    TenderDetailsConverterService
  ],   //Add here InMemoryDataService
  bootstrap: [AppComponent]
})
export class AppModule { }
