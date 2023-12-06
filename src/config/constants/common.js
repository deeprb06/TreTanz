
const RANDOM_PASSWORD_CHAR =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz1234567890';

const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const CUSTOM_PAGINATE_LABELS = {
    totalDocs: 'itemCount',
    docs: 'data',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
};

const JWT_STRING = 'jwt ';

const RESPONSE_CODE = {
    SUCCESS: 200,
    CREATE: 201,
    UNAUTHORIZED: 401,
    DEFAULT: 'SUCCESS',
    LOGIN: 'LOGIN',
    OTP: 'OTP_VERIFIED',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    ERROR: 'ERROR',
    ALERTS: 'ALERTS',
    UNAUTHENTICATED: 'UNAUTHORIZED',
};

const USER_ROLES = {
    ADMIN: 'ADMIN',
    CANDIDATE: 'CANDIDATE'
};

const ROLE_NAME = {
    ADMIN: 'Admin'
}

module.exports = {
    RANDOM_PASSWORD_CHAR,
    PASSWORD_REGEX,
    CUSTOM_PAGINATE_LABELS,
    JWT_STRING,
    RESPONSE_CODE,
    USER_ROLES,
    ROLE_NAME
};
