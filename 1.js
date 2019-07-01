let json =  {
    "data": {
        "yesterday": {
            "date": "26日星期三",
            "high": "高温 31℃",
            "fx": "无持续风向",
            "low": "低温 26℃",
            "fl": "<![CDATA[<3级]]>",
            "type": "阵雨"
        },
        "city": "深圳",
        "forecast": [
            {
                "date": "27日星期四",
                "high": "高温 31℃",
                "fengli": "<![CDATA[<3级]]>",
                "low": "低温 27℃",
                "fengxiang": "无持续风向",
                "type": "雷阵雨"
            },
            {
                "date": "28日星期五",
                "high": "高温 31℃",
                "fengli": "<![CDATA[<3级]]>",
                "low": "低温 27℃",
                "fengxiang": "无持续风向",
                "type": "雷阵雨"
            },
            {
                "date": "29日星期六",
                "high": "高温 32℃",
                "fengli": "<![CDATA[<3级]]>",
                "low": "低温 27℃",
                "fengxiang": "无持续风向",
                "type": "雷阵雨"
            },
            {
                "date": "30日星期天",
                "high": "高温 31℃",
                "fengli": "<![CDATA[<3级]]>",
                "low": "低温 28℃",
                "fengxiang": "无持续风向",
                "type": "多云"
            },
            {
                "date": "1日星期一",
                "high": "高温 31℃",
                "fengli": "<![CDATA[<3级]]>",
                "low": "低温 27℃",
                "fengxiang": "无持续风向",
                "type": "雷阵雨"
            }
        ],
        "ganmao": "各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间中，以防感冒。",
        "wendu": "31"
    },
    "status": 1000,
    "desc": "OK"
}

// let json2 = JSON.parse(json)
console.log(json.data.forecast[2])