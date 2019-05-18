import { TEST_API_URL, TEST_CASES_URL, COMMON_HEADERS_URL, COMMON_PARAMS_URL, COMMON_VALID_URL, SETUP_URL, TEARDOWN_URL, REQUEST_SUCCESS, REQUEST_FAILED } from '../constants';
import { fetchByAjax, fetchByCrossRequest } from '../utils';

/**
 * fetch test cases by api id
 * @param {*} apiId 
 */
export async function fetchAPICases(apiId) {
    let apiCases = [];
    let pageId = 0;
    let url = TEST_CASES_URL;
    while(true) {
        try {
            url = TEST_CASES_URL + '?api=' + apiId + '&page_size=500&pageId=' + pageId;
            const result = await fetchDelegate(url);
            if (result && Array.isArray(result.results)) {
                apiCases = apiCases.concat(result.results);
                if (!result.next) {
                    break;
                } else {
                    pageId++;
                }
            } else {
               break;
            }
        } catch(e) {
        }
    }
    return apiCases;
}

/**
 * create new api
 */
export async function createApi({valid, header, param, name, url, stag_url, online_url, setup_suite}) {
    if (valid && header && param && name && url && stag_url && online_url) {
        let postURL = TEST_API_URL;
        const result = await fetchDelegate(postURL, 'POST', 
            {  
                'Content-Type': 'application/json'
            },
            {
                valid, header, param, name, url, stag_url, online_url
            }
        );
        console.log('resultttt', result);
        return result;
    }
}

/**
 * create new api case
 */
export async function createApiCase({valid, header, param, name, api}) {
    console.log('valid, header, param, name, api', valid, header, param, name, api)
    if (name && api) {
        let postURL = TEST_CASES_URL;
        const result = await fetchDelegate(postURL, 'POST', 
            {  
                'Content-Type': 'application/json'
            },
            {
                valid, header, param, name, api
            }
        );
        console.log('create', result);
    }
} 

export async function fetchSetup() {
    let setup = [];
    let pageId = 0;
    let url = SETUP_URL;
    while(true) {
        try {
            url = SETUP_URL + '?&page_size=500&pageId=' + pageId;
            const {status, body} = await fetchDelegate(url);
            if (status === REQUEST_SUCCESS && Array.isArray(body.results)) {
                setup = setup.concat(result.results);
                if (!result.next) {
                    break;
                } else {
                    pageId++;
                }
            } else {
               break;
            }
        } catch(e) {
        }
    }
    return setup;
}

export async function fetchTeardown() {
    let teardown = [];
    let pageId = 0;
    let url = TEARDOWN_URL;
    while(true) {
        try {
            url = TEARDOWN_URL + '?&page_size=500&pageId=' + pageId;
            const {status, body} = await fetchDelegate(url);
            if (status === REQUEST_SUCCESS && Array.isArray(body.results)) {
                teardown = teardown.concat(body.results);
                if (!body.next) {
                    break;
                } else {
                    pageId++;
                }
            } else {
               break;
            }
        } catch(e) {
        }
    }
    return teardown;
}

/**
 * delete test api
 */
export async function deleteTestApi(id) {
    if (id) {
        let deleteURL = TEST_API_URL;
        const result = await fetchDelegate(deleteURL + id, 'DELETE')
        console.log('result', result);
    }
}

/**
 * fetch test api ids
 */
export async function fetchApis() {
    let url = TEST_API_URL;
    let apis = [];
    let pageId = 1;
    while(true) {
        try {
            url = TEST_API_URL + '?page=' + pageId + '&page_size=500';
            const {status, body} = await fetchDelegate(url);
            if (status === REQUEST_SUCCESS && Array.isArray(body.results)) {
                apis = apis.concat(body.results);
                if (!body.next) {
                    break;
                } else {
                    pageId++;
                }
            } else {
               break;
            }
        } catch(e) {}
    }
    return apis;
}

/**
 * fetch common headers
 */
export async function fetchCommonHeaders() {
    let url = COMMON_HEADERS_URL;
    let headers = [];
    let pageId = 1;
    while(true) {
        try {
            url = COMMON_HEADERS_URL + '?page=' + pageId + '&page_size=500';
            const {status, body} = await fetchDelegate(url);
            if (status === REQUEST_SUCCESS && Array.isArray(body.results)) {
                headers = headers.concat(body.results);
                if (!body.next) {
                    break;
                } else {
                    pageId++;
                }
            } else {
               break;
            }
        } catch(e) {}
    }
    return headers;
}

/**
 * fetch common params
 */
export async function fetchCommonParams() {
    let url = COMMON_PARAMS_URL;
    let params = [];
    let pageId = 1;
    while(true) {
        try {
            url = COMMON_PARAMS_URL + '?page=' + pageId + '&page_size=500';
            const {status, body} = await fetchDelegate(url);
            if (status === REQUEST_SUCCESS && Array.isArray(body.results)) {
                params = params.concat(body.results);
                if (!body.next) {
                    break;
                } else {
                    pageId++;
                }
            } else {
               break;
            }
        } catch(e) {}
    }
    return params;
}

/**
 * fetch common params
 */
export async function fetchCommonValid() {
    let url = COMMON_VALID_URL;
    let params = [];
    let pageId = 1;
    while(true) {
        try {
            url = COMMON_VALID_URL + '?page=' + pageId + '&page_size=500';
            const {status, body} = await fetchDelegate(url);
            if (status === REQUEST_SUCCESS && Array.isArray(body.results)) {
                params = params.concat(body.results);
                if (!body.next) {
                    break;
                } else {
                    pageId++;
                }
            } else {
               break;
            }
        } catch(e) {}
    }
    return params;
}

async function fetchDelegate(url, method = 'GET', headers = {}, data = {}) {
    try {
        const {res: {header, body, status} = {}} = await fetchByCrossRequest(url, method, headers, data);
        if (status === 200 || status === 201) {
          return {
            status: REQUEST_SUCCESS,
            header,
            body: JSON.parse(body),
          }
        } else {
          return {
            status: REQUEST_FAILED,
            header,
            body: JSON.parse(body),
          }
        }
    } catch(e) {
      console.log(e)
        return {
          status: REQUEST_FAILED,
        }
    }
}