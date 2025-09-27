export interface User {
  id?: number,
  first_name?: string,
  last_name?: string,
  username?: string,
  email?: string,
  email_verified_at?:Date
  phone?: string,
  status?: any,
  status_id?: any,
  role_id?: any,
  created_at?: any,
  token?: any,
  password?: any,

  account_type_id?: any,
  name?: any,
  alias?: any,

  // profile
  bio?: any,
  institution_category_id?: any,
  institution_id?: any,

  county_id?: any,
  constituency_id?: any,
  ward_id?: any,

  referral_code?: any,
  autoplay?: any,
  receive_notifications?: any,

  full_name?: any,
  role?: any,


  reset_password?: any,
}
