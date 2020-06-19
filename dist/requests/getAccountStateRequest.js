"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountStateRequest = void 0;
// Import modules
var node_fetch_1 = __importDefault(require("node-fetch"));
// Import debug console log
var utils_1 = require("../utils");
var DeGiroEnums_1 = require("../enums/DeGiroEnums");
var GET_ACCOUNT_STATE_PATH = DeGiroEnums_1.DEGIRO_API_PATHS.GET_ACCOUNT_STATE_PATH;
// tslint:disable-next-line: max-line-length
function getAccountStateRequest(accountData, accountConfig, config) {
    return new Promise(function (resolve, reject) {
        // Create params to get orders by types
        var from = config.from, to = config.to;
        var params = '';
        params += "fromDate=" + encodeURIComponent(from) + "&";
        params += "toDate=" + encodeURIComponent(to) + "&";
        params += "intAccount=" + accountData.data.intAccount + "&";
        params += "sessionId=" + accountConfig.data.sessionId;
        var requestOptions = {
            headers: {
                Cookie: "JSESSIONID=" + accountConfig.data.sessionId + ";",
            },
        };
        // Do the request to get a account config data
        var uri = "" + accountConfig.data.reportingUrl + GET_ACCOUNT_STATE_PATH + "?" + params;
        utils_1.debug("Making request to " + uri);
        node_fetch_1.default(uri)
            .then(function (res) { return res.json(); })
            .then(function (res) {
            if (!res.data || !res.data.cashMovements || !Array.isArray(res.data.cashMovements))
                return reject('DeGiro response does not match with know scheme');
            resolve(res.data.cashMovements);
        })
            .catch(reject);
    });
}
exports.getAccountStateRequest = getAccountStateRequest;
//# sourceMappingURL=getAccountStateRequest.js.map