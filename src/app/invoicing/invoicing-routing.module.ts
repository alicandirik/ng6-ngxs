import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {InvoicingComponent} from './invoicing/invoicing.component';
import {OverviewComponent} from './overview/overview/overview.component';
import {ReceiverMasterComponent} from './receivers/receiver-master/receiver-master.component';
import {ReceiverDetailsComponent} from './receivers/receiver-details/receiver-details.component';
import {ContractDetailsComponent} from './contracts/contract-details/contract-details.component';
import {InvoiceMasterComponent} from './invoices/invoice-master/invoice-master.component';
import {ContractMasterComponent} from './contracts/contract-master/contract-master.component';
import {InvoiceDetailsComponent} from './invoices/invoice-details/invoice-details.component';

const INVOICING_ROUTES: Routes = [
  {
    path: '',
    component: InvoicingComponent,
    canActivate: [
    ],
    children: [
      {
        path: '',
        component: OverviewComponent,
      },
      {
        path: 'receivers',
        component: ReceiverMasterComponent,
      },
      {
        path: 'receivers/:id',
        component: ReceiverDetailsComponent,
      },
      {
        path: 'contracts',
        component: ContractMasterComponent,
      },
      {
        path: 'contracts/:id',
        component: ContractDetailsComponent,
      },
      {
        path: 'invoices',
        component: InvoiceMasterComponent,
      },
      {
        path: 'invoices/:id',
        component: InvoiceDetailsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(INVOICING_ROUTES)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class InvoicingRoutingModule {
}
