import {TEST_API_URL, TEST_CASES_URL} from '../constants';
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

async function fetchDelegate(url) {
    try {
        const result = await fetchByCrossRequest(url);
        if (result && result.body && JSON.parse(result.body)) {
            return JSON.parse(result.body);
        }
    } catch(e) {
        return null;
    }
}