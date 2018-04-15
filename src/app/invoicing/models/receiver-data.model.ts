import {BoDataModel} from './bo-data.model';

export interface ReceiverDataModel extends BoDataModel {
  name?: string;
  nameAdd?: string;
  logoUrl?: string;
  status?: ReceiverStatus;
  isDeletable?: boolean;
  lastContractId?: string;
  lastInvoiceId?: string;
  recentContractIds?: string[];
  openInvoiceIds?: string[];
  address?: ReceiverAddressDataModel;
}

export interface ReceiverAddressDataModel {
  country?: string;
  postalCode?: string;
  city?: string;
  street?: string;
  email?: string;
  phone?: string;
  fax?: string;
  webSite?: string;
}

export enum ReceiverStatus {
  active,
  inactive
}

