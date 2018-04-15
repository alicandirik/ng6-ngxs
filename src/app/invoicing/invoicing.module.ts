import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicingComponent } from './invoicing/invoicing.component';
import { InvoicingRoutingModule } from './invoicing-routing.module';
import { OverviewComponent } from './overview/overview/overview.component';
import { ReceiverMasterComponent } from './receivers/receiver-master/receiver-master.component';
import { ReceiverDetailsComponent } from './receivers/receiver-details/receiver-details.component';
import { ContractMasterComponent } from './contracts/contract-master/contract-master.component';
import { ContractDetailsComponent } from './contracts/contract-details/contract-details.component';
import { InvoiceMasterComponent } from './invoices/invoice-master/invoice-master.component';
import { InvoiceDetailsComponent } from './invoices/invoice-details/invoice-details.component';
import { NumberRangesApiService } from './services/number-ranges-api.service';
import { NgxsModule } from '@ngxs/store';
import { InvoicingState } from './state/invoicing.state';
import { NumberRangesState } from './state/number-ranges.state';
import { ReceiversState } from './state/receivers.state';
import { ReceiversApiService } from './services/receivers-api.service';

@NgModule({
  imports: [
    CommonModule,
    InvoicingRoutingModule,
    NgxsModule.forFeature([
      InvoicingState,
      NumberRangesState,
      ReceiversState
    ])
  ],
  declarations: [
    InvoicingComponent,
    OverviewComponent,
    ReceiverMasterComponent,
    ReceiverDetailsComponent,
    ContractMasterComponent,
    ContractDetailsComponent,
    InvoiceMasterComponent,
    InvoiceDetailsComponent
  ],
  providers: [
    NumberRangesApiService,
    ReceiversApiService
  ]
})
export class InvoicingModule { }
