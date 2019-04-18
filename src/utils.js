/**
 * 使用crossRequest发送请求
 * @param url
 * @param method
 * @param data
 * @returns {Promise}
 */
export async function fetchByCrossRequest(url, method = 'GET', data) {
    return new Promise(function(resolve, reject){
        crossRequest({
            url,
            method: method,
            success: function (body, header) {
                resolve({
                    body,
                    header,
                });
            },
            error: function(err) {
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
export async function fetchByAjax(url, method = 'GET', data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
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