/**
 * 时间戳获取工具
 * 整合多个公开HTTP API服务，自动切换备份
 */
class TimestampFetcher {
    // 配置API列表，包含不同服务的请求信息和解析方法
    static apiList = [
        {
            name: "苏宁易购",
            url: "http://quan.suning.com/getSysTime.do",
            method: "GET",
            // 解析响应数据为时间戳(毫秒)
            parser: (data) => {
                // 苏宁返回格式: {"sysTime2": "2023-10-01 12:34:56","sysTime1": "20231001123456"}
                return new Date(data.sysTime2).getTime();
            }
        },
        {
            name: "淘宝",
            url: "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp",
            method: "GET",
            // 解析响应数据为时间戳(毫秒)
            parser: (data) => {
                // 淘宝返回格式: {"data": {"t": "1696123456789"}}
                return parseInt(data.data.t, 10);
            }
        },
        {
            name: "Bitget",
            url: "https://api.bitget.com/api/v2/public/time",
            method: "GET",
            // 解析响应数据为时间戳(毫秒)
            parser: (data) => {
                // Bitget返回格式: {"data": {"serverTime": "1696123456789"}}
                return parseInt(data.data.serverTime, 10);
            }
        },
        {
            name: "WorldTimeAPI",
            url: "https://worldtimeapi.org/api/ip",
            method: "GET",
            // 解析响应数据为时间戳(毫秒)
            parser: (data) => {
                // WorldTimeAPI返回格式: {"unixtime": 1696123456}
                return data.unixtime * 1000;
            }
        }
    ];

    /**
     * 获取当前标准时间戳
     * @param {number} timeout 超时时间(毫秒)，默认5000
     * @returns {Promise<number>} 时间戳(毫秒)
     */
    static async getTimestamp(timeout = 5000) {
        // 依次尝试每个API，直到成功获取
        for (const api of this.apiList) {
            try {
                console.log(`尝试从${api.name}获取时间...`);
                const timestamp = await this.fetchFromApi(api, timeout);
                console.log(`成功从${api.name}获取时间戳:`, timestamp);
                return timestamp;
            } catch (error) {
                // console.log(`${api.name}请求失败:`, error.message);
                // 继续尝试下一个API
                continue;
            }
        }

        // 所有API都失败时，返回本地时间戳作为备选
        // console.warn("所有API请求失败，使用本地时间");
        return -1;
    }

    /**
     * 从单个API获取时间戳
     * @param {Object} api API配置
     * @param {number} timeout 超时时间
     * @returns {Promise<number>} 时间戳
     */
    static async fetchFromApi(api, timeout) {
        return new Promise((resolve, reject) => {
            // 设置超时
            const timer = setTimeout(() => {
                reject(new Error(`请求超时(${timeout}ms)`));
            }, timeout);

            fetch(api.url, {
                method: api.method,
                mode: "cors",
                cache: "no-cache"
            })
                .then(response => {
                    clearTimeout(timer);
                    if (!response.ok) {
                        throw new Error(`HTTP错误，状态码: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    try {
                        const timestamp = api.parser(data);
                        if (isNaN(timestamp) || timestamp <= 0) {
                            throw new Error("解析时间戳失败");
                        }
                        resolve(timestamp);
                    } catch (parseError) {
                        reject(new Error(`数据解析错误: ${parseError.message}`));
                    }
                })
                .catch(error => {
                    clearTimeout(timer);
                    reject(error);
                });
        });
    }
}

// 使用示例
async function getCurrentTimestamp() {
    try {
        const timestamp = await TimestampFetcher.getTimestamp();
        console.log("当前标准时间戳(毫秒):", timestamp);

        // 可以在这里添加你的业务逻辑，例如验证链接时效性
        // 例如: 检查t参数对应的时间是否在有效期内
        // if (currentTime - t > expiresIn) { ... }

        return timestamp;
    } catch (error) {
        console.error("获取时间戳失败:", error);
        return null;
    }
}

// Base64加密函数（URL安全版本）
function base64Encode(str) {
    // 先进行URI编码，再转换为Base64
    const encoded = btoa(unescape(encodeURIComponent(str)));
    // 替换为URL安全字符，移除填充
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Base64解密函数（处理URL安全的Base64）
function base64Decode(encoded) {
    // 替换URL安全Base64中的特殊字符
    encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // 处理填充字符
    while (encoded.length % 4 !== 0) {
        encoded += '=';
    }
    // 解码并转换为字符串
    const decodedBytes = atob(encoded);
    return decodeURIComponent(escape(decodedBytes));
}

// 获取URL参数
function getUrlParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

// 生成带加密参数的URL示例
function generateEncryptedUrl(name, expiresIn = 60 * 60 * 1000) {
    // 获取当前时间戳作为t参数
    const timestamp = (Date.now() + expiresIn).toString();
    // 加密参数
    const encodedT = base64Encode(timestamp);
    const encodedName = base64Encode(name);
    // 生成完整URL
    // return `${window.location.origin}${window.location.pathname}?t=${encodedT}&name=${encodedName}`;
    return `?t=${encodedT}&name=${encodedName}`;
    // ?t=MTc1NzE0NDAzOTU3NA&name=dGhfbWlwX3Jlc2N1ZWZhcm1lcg 3h
    // ?t=MTc1NzEzMjM4MTA1OQ&name=dGhfbWlwX3Jlc2N1ZWZhcm1lcnM 1min
}

// 主处理函数 - 处理接收的参数并跳转
async function handleReceivedParams() {
    // 获取加密的t参数（时间戳）和name参数
    const encodedT = getUrlParam('t');
    const encodedName = getUrlParam('name');
    const currentTimestamp = await getCurrentTimestamp();

    console.log(generateEncryptedUrl("th_mip_rescuefarmer", 60 * 60 * 1000 * 3))
    console.log(encodedT, encodedName, currentTimestamp)

    // 检查必要参数是否存在
    if (!encodedT || !encodedName || currentTimestamp == -1) {
        alert('没有访问权限400');
        return;
    }

    try {
        // 解密参数
        const t = parseInt(base64Decode(encodedT), 10);
        console.log(currentTimestamp, t, currentTimestamp > t)
        const name = base64Decode(encodedName);

        if (currentTimestamp > t) {
            alert('链接已过期，无法访问');
            return;
        }

        // 验证name参数有效性并跳转
        if (name && name.trim() !== '') {
            window.location.href = `./${name}/index.html`;
        } else {
            alert('没有访问权限404');
        }
    } catch (error) {
        console.error('参数处理错误:', error);
        alert('没有访问权限403');
    }
}

// 页面加载时执行参数处理
window.addEventListener('load', handleReceivedParams);
