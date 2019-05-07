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
            success: function (body, header) {
                resolve({
                    body,
                    header,
                });
            },
            error: function(err, msg, b) {
                console.log(err, msg, b);
                reject(err);
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