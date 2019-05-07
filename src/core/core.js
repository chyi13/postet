import {TEST_API_URL, TEST_CASES_URL, COMMON_HEADERS_URL, COMMON_PARAMS_URL, COMMON_VALID_URL} from '../constants';
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

export async function createTestApi({valid, header, param, name, url, stag_url, online_url, setup_suite}) {
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
        console.log('create', result);
    }
}

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
export async function fetchTestApiIds() {
    let url = TEST_API_URL;
    let apis = [];
    let pageId = 1;
    while(true) {
        try {
            url = TEST_API_URL + '?page=' + pageId + '&page_size=500';
            const result = await fetchDelegate(url);
            if (result && Array.isArray(result.results)) {
                apis = apis.concat(result.results);
                if (!result.next) {
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
            const result = await fetchDelegate(url);
            if (result && Array.isArray(result.results)) {
                headers = headers.concat(result.results);
                if (!result.next) {
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
            const result = await fetchDelegate(url);
            if (result && Array.isArray(result.results)) {
                params = params.concat(result.results);
                if (!result.next) {
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
            const result = await fetchDelegate(url);
            if (result && Array.isArray(result.results)) {
                params = params.concat(result.results);
                if (!result.next) {
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
        const result = await fetchByCrossRequest(url, method, headers, data);
        if (result && result.body && JSON.parse(result.body)) {
            return JSON.parse(result.body);
        }
    } catch(e) {
        return null;
    }
}