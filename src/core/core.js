import {TEST_API_URL, TEST_CASES_URL} from '../constants';
import { fetchByAjax } from '../utils';

/**
 * fetch test cases by api id
 * @param {*} apiId 
 */
export async function fetchTestCases(apiId) {
    const result = [];
    let pageId = 0;
    while(true) {
        const tempResult = await fetchTestCasesByPage(0);
    }
}

/**
 * fetch test api ids
 */
export async function fetchTestApiIds() {
    let url = TEST_API_URL;
    let apis = [];
    let pageId = 0;
    while(true) {
        try {
            url = TEST_API_URL + '?page=' + pageId + '&page_size=500';
            const result = await fetchByPage(url);
            if (result && Array.isArray(result.results)) {
                apis.push(result.results);
                if (!result.next) {
                    break;
                }
            } else {
                break;
            }
        } catch(e) {}
    }
    return apis;
}

async function fetchByPage(url) {
    try {
        const result = await fetchByAjax(url);
        if (result && Array.isArray(result.results)) {
            return result;
        }
    } catch(e) {
        return null;
    }
}