export interface RegisterFormData {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }

  export interface LoginFormData {
    email: string;
    password: string;
  } 

  export interface AddressInfo {
    name: string;
    tel: string;
    address: string;
    district: string;
    province: string;
    postcode: string;
  }
  
  export interface UserInfo {
    name: string;
    email: string;
    profileImg: string;
    role: string;
    addressInfo: AddressInfo;
  }