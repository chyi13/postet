import { TEST_API_URL, TEST_CASES_URL, COMMON_HEADERS_URL, COMMON_PARAMS_URL, COMMON_VALID_URL, SETUP_URL, TEARDOWN_URL, REQUEST_SUCCESS, REQUEST_FAILED } from '../constants';
import { fetchByAjax, fetchByCrossRequest, formatQuery } from '../utils';

/**
 * fetch test cases by api id
 * @param {*} apiId 
 */
export async function fetchAPICases(apiId) {
    let apiCases = [];
    let pageId = 1;
    let url = TEST_CASES_URL;
    while(true) {
        try {
            url = TEST_CASES_URL + '?api=' + apiId + '&page_size=500&page=' + pageId;
            const {status, body} = await fetchDelegate(url);
            if (status === REQUEST_SUCCESS && Array.isArray(body.results)) {
                apiCases = apiCases.concat(body.results);
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
    return apiCases;
}

/**
 * create new api
 */
export async function createApi({valid, header, param, name, url, stag_url, online_url, setup_suite}) {
  let result = {
    status: REQUEST_FAILED,
  }
  if (valid && header && param && name && url && stag_url && online_url) {
    let postURL = TEST_API_URL;
    result = await fetchDelegate(postURL, 'POST', 
        {  
            'Content-Type': 'application/json'
        },
        {
            valid, header, param, name, url, stag_url, online_url, setup_suite: Number(setup_suite)
        }
    );
  }
  return result;
}

/**
 * update old api
 */
export async function updateApi({id, valid, header, param, name, url ,stag_url, online_url, setup_suite}) {
  let result = {
    status: REQUEST_FAILED,
  }
  if (id && name && url && stag_url && online_url) {
    let postURL = TEST_API_URL + id + '/';
    result = await fetchDelegate(postURL, 'PUT', {
      'Content-Type': 'application/x-www-form-urlencoded',
    }, {
      name, url, stag_url, online_url, valid, header, param, setup_suite,
    });
  }
  return result;
}

/**
 * create new api case
 */
export async function createApiCase({valid, header, param, name, api, setup_suite, teardown, method}) {
  let result = {
    status: REQUEST_FAILED,
  }
  if (name && api && setup_suite && teardown && method) {
    let postURL = TEST_CASES_URL;
    result = await fetchDelegate(postURL, 'POST', 
      {  
          'Content-Type': 'application/json'
      },
      {
          valid, header, param, name, api, setup_suite: Number(setup_suite), teardown: Number(teardown), method
      }
    );
  }
  return result;
} 

/**
 * update api case
 */
export async function updateApiCase({api, name, headers, param, setup_suite, teardown, valid, id, method}) {
  let result = {
    status: REQUEST_FAILED,
  }
  if (id && name && api) {
    let postURL = TEST_CASES_URL + id + '/';
    result = await fetchDelegate(postURL, 'PUT', {
      'Content-Type': 'application/x-www-form-urlencoded',
    }, {
      api, name, headers, param, setup_suite, teardown, valid, id, method
    });
  }
  return result;
}

export async function fetchSetup() {
    let setup = [];
    let pageId = 1;
    let url = SETUP_URL;
    while(true) {
        try {
            url = SETUP_URL + '?&page_size=500&pageId=' + pageId;
            const {status, body} = await fetchDelegate(url);
            if (status === REQUEST_SUCCESS && Array.isArray(body.results)) {
                setup = setup.concat(body.results);
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
    return setup;
}

export async function fetchTeardown() {
    let teardown = [];
    let pageId = 1;
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
        return {
          status: REQUEST_FAILED,
        }
    }
}