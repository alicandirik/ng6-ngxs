export interface UserModel {
  email: string;
  roles?: string[];
  organization?: string;
  displayName?: string;
  phoneNumber?: string;
  photoURL?: string;
  isLocked?: boolean;
  uid?: string;
}

export interface UserCredentialModel {
  email: string;
  password: string;
}

