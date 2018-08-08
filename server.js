const axios = require('axios');
const CryptoJS = require('crypto-js');
const express = require('express');

const app = express();
let paymentUrl = 'https://api-qa.payeezy.com/globalApi/v1/payments';

function b64encode (input) {
    var swaps = ["A","B","C","D","E","F","G","H","I","J","K","L","M",
            "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
            "a","b","c","d","e","f","g","h","i","j","k","l","m",
            "n","o","p","q","r","s","t","u","v","w","x","y","z",
            "0","1","2","3","4","5","6","7","8","9","+","/"],
        tb, ib = "",
        output = "",
        i, L;
    for (i=0, L = input.length; i < L; i++) {
        tb = input.charCodeAt(i).toString(2);
        while (tb.length < 8) {
            tb = "0"+tb;
        }
        ib = ib + tb;
        while (ib.length >= 6) {
            output = output + swaps[parseInt(ib.substring(0,6),2)];
            ib = ib.substring(6);
        }
    }
    if (ib.length == 4) {
        tb = ib + "00";
        output += swaps[parseInt(tb,2)] + "=";
    }
    if (ib.length == 2) {
        tb = ib + "0000";
        output += swaps[parseInt(tb,2)] + "==";
    }
    return output;
}

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/check', (req, res) => {
    let payload = {
        'transactionType': 'preAuth',
        'storeId': '120995000',
        'amount': {
            'total': 12.10,
            'currency': 'USD'
        },
        'paymentMethod': {
            'type': 'paymentCard',
            'paymentCard': {
                'number': '5426064000424979',
                'securityCode': '147',
                'brand': 'M',
                'expiryDate': {
                    'month': '12',
                    'year': '18'
                }
            }
        }
    };
    let apiKey = 'TfbQPlcPcn27WIlpwuvsBcvZmiqTikMl';
    let apiSecret = 'GOPuA7r8ELs9dGMZ';
    let clientRequestId = '879879797888988888891';
    let timestamp = new Date().getTime();
    // do message signature logic here
    let toBeHashed = apiKey
        + clientRequestId
        + timestamp
        + JSON.stringify(payload);
    let computedHash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, apiSecret);
    computedHash.update(toBeHashed);
    computedHash = computedHash.finalize();

    const messageSignature = b64encode(computedHash.toString());
    axios({
        data: payload,
        headers: {
            'Api-Key': apiKey,
            'Client-Request-Id': clientRequestId,
            'Content-Type': 'application/json',
            'Message-Signature': messageSignature,
            'Timestamp': timestamp
        },
        method: 'post',
        url: paymentUrl
    }).then((res_) => {
        res.send(res_.data);
        console.log('check successful', res_);
    }).catch((error) => {
        console.log('check did a error :(', error);
        res.send(error.response.data);
    });
});

app.listen(3001, () => console.log('Example app listening on port 3001!'));