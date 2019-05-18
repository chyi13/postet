import JSON5 from "json5";

/**
 * 使用crossRequest发送请求
 * @param url
 * @param method
 * @param data
 * @returns {Promise}
 */
export async function fetchByCrossRequest(url, method = 'GET', headers = {}, data = {}) {
    console.log('data', data)
    let request = {
        url,
        method,
        headers,
    }
    if (method == 'POST') {
        request = {
            ...request,
            data,
        }
    } else if (method === 'GET'){
        request = {
            ...request,
            query: data,
        }
    }
    console.log('request', request);
    return new Promise(function(resolve, reject){
        crossRequest({
            ...request,
            success: function (body, header, data) {
                resolve({...data});
            },
            error: function(err, msg, data) {
                resolve({...data});
            }
        })
    })
}

/**
 * 普通网页ajax请求
 * @param {*} url 
 * @param {*} method 
 * @param {*} data 
 */
export async function fetchByAjax(url, method = 'GET', headers = {}, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            headers,
            type: method,
            data: data,
            dataType: 'json',
            success: function(obj) {
                return resolve(obj);
            },
            error: function(error) {
                return reject(error);
            }
        })
    })
}

/**
 * 判断是否为json
 * @param obj
 * @returns {boolean}
 */
export function isJSON(obj) {
    try {
        if (JSON.parse(obj) && !!obj) {
            return true;
        }
    } catch (e) {}
    return false;
}

/**
 * 判断是否为链接
 */
export function checkIfUrl(url) {
    return url && /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(url);
}

/**
 * 预处理通用请求头
 */
export function parseCommonData(data) {
    let result = [];
    if (data && data.param) {
        try {
            const param = JSON5.parse(data.param);
            for (let [key, value] of Object.entries(param)) {
                result.push({
                    key, value,
                });
            }
        } catch(e) {
            console.error(e);
        }
    }
    return result;
}

/**
 * 将header或者param数组转化为对象后stringify
 */
export function stringifyHeaderOrParam(data) {
    let result = {};
    if (Array.isArray(data)) {
        data.map(item => {
            result[item.key] = item.value;
        });
    }
    return JSON.stringify(result);
}

/**
 * 合并请求头参数
 */
export function mergeHeaders(newHeader, oldHeader) {
    let result = {};
    if (newHeader) {
        result = {
            ...result,
            ...newHeader,
        }
    }
    if (oldHeader) {
        result = {
            ...result,
            ...oldHeader,
        }
    }
    return result;
}

/**
 * 合并请求参数
 */
export function mergeParams(newParams, oldParams) {
    let result = {};
    if (newParams) {
        result = {
            ...result,
            ...newParams,
        }
    }
    if (oldParams) {
        result = {
            ...result,
            ...oldParams,
        }
    }
    return result;
}