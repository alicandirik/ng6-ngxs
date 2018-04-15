import { InvoicingModule } from './invoicing.module';

describe('InvoicingModule', () => {
  let invoicingModule: InvoicingModule;

  beforeEach(() => {
    invoicingModule = new InvoicingModule();
  });

  it('should create an instance', () => {
    expect(invoicingModule).toBeTruthy();
  });
});
