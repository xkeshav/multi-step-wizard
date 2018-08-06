export const AppConstants = Object.freeze({
  INIT: {
    ACCESS_VERIFY_TITLE: 'Access Verify',
    REGISTER_TENANT_TITLE: 'Tenant Registration',
    REGISTER_ADMIN_TITLE: 'Admin Registration',
    CONFIGURE_EMAIL_TITLE: 'Email Configuration'
  },
  REGEX: {
    URL: new RegExp('^(http[s]?://)(www.){0,1}[a-zA-Z0-9.-]+.[a-zA-Z]{2,5}[.]{0,1}$', 'i'),
    EMAIL: new RegExp('^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$', 'i'),
    DOMAIN: new RegExp('^(?!://)([a-zA-Z0-9-_]+.)*[a-zA-Z0-9][a-zA-Z0-9-_]+.[a-zA-Z]{2,11}?$', 'i'),
    PORT: new RegExp(
      '^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$'
    ),
    RETRY: new RegExp('^[0-5]$'),
    PASSWORD: new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}$'),
    NUMBERS: new RegExp('^\\+?d*$')
  }
});
