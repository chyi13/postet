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