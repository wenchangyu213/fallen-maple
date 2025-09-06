async function fetchTencentTime() {
    const apiUrl = 'http://vv.video.qq.com/checktime';

    try {
        // 发送GET请求
        const response = await fetch(apiUrl, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        });

        // 检查响应状态
        if (!response.ok) {
            // throw new Error(`HTTP请求失败，状态码: ${response.status}`);
        }

        // 解析响应内容（腾讯的这个接口返回的是JSONP格式）
        const text = await response.text();
        // console.log('腾讯时间API返回原始数据:', text);

        const pRegex = /<t>(.*?)<\/t>/i;
        const matchResult = text.match(pRegex);

        // console.log('腾讯时间API返回原始数据1:', matchResult);
        if (matchResult && matchResult[1]) {
            // console.log('t标签内容:', matchResult[1]); // 输出: 需要提取的内容

            // console.log('腾讯时间API返回数据:', data);

            // 提取时间信息（t字段需要转换为标准时间戳）
            const tencentTime = matchResult[1];
            // 腾讯的t值是10位时间戳（秒），转换为13位（毫秒）
            const timestamp = tencentTime * 1000;
            // const date = new Date(timestamp);

            // console.log('转换的时间戳（秒）:', tencentTime);
            // console.log('转换后的时间戳（毫秒）:', timestamp);
            // console.log('对应的时间:', date.toLocaleString());

            return timestamp;
        } else {
            // console.log('未找到p标签或p标签内容为空');
        }
        return null;
    } catch (error) {
        // console.error('获取时间失败:', error.message);
        return null;
    }
}

// 获取当前时间戳
async function getCurrentTimestamp() {
    try {
        const timestamp = await TimestampFetcher.getTimestamp();
        // console.log("当前标准时间戳(毫秒):", timestamp);

        // 可以在这里添加你的业务逻辑，例如验证链接时效性
        // 例如: 检查t参数对应的时间是否在有效期内
        // if (currentTime - t > expiresIn) { ... }

        return timestamp;
    } catch (error) {
        // console.error("获取时间戳失败:", error);
        return null;
    }
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

// 主处理函数 - 处理接收的参数并跳转
async function handleReceivedParams() {
    // 获取加密的t参数（时间戳）和name参数
    const encodedT = getUrlParam('t');
    const encodedName = getUrlParam('name');
    const currentTimestamp = await getCurrentTimestamp();

    // console.log(getCurrentTimestamp())
    // console.log(generateEncryptedUrl("th_mip_rescuefarmers", 60 * 60 * 1000 * 3))
    // console.log(parseInt(base64Decode("MTc1NzEzMDk4ODg5NA"), 10))

    // 检查必要参数是否存在
    if (!encodedT || !encodedName || currentTimestamp == -1) {
        alert('没有访问权限400');
        return;
    }

    try {
        // 解密参数
        const t = parseInt(base64Decode(encodedT), 10);
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
        // console.error('参数处理错误:', error);
        alert('没有访问权限403');
    }
}

// 页面加载时执行参数处理
window.addEventListener('load', handleReceivedParams);
