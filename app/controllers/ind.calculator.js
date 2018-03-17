"use strict";
const tulind = require("tulind");
const path = require("path");
const CryptoCompare = require(path.join("..", "common", "crypto-compare.js"));

/*
* Calling the correct function to calculate result for the requested indicator
* @param ind_type {string}   codename of a indicator
* @param options {int array} options if needed for calculation
* @param pair {string array} for example: BTC/USD is ["BTC", "USD"]
* @param tframe {int} the timeframe of each trading period
* @param callback {function} will be called with: err, result
*
*/
module.exports = function(ind_type, options, pair, tframe, callback) {
    if (!Object.keys(Indicators).includes(ind_type)) {
        var e1 = new Error("Indicator not supported: " + ind_type);
        return callback(e1, null);
    }

    // Code for indicators, that don't require any options
    if (!Indicators[ind_type]) {
        //TODO
        var e2 = new Error(ind_type + " coming soon");
        return callback(e1, null);
    }

    // Code for indicators that require options
    if (Indicators[ind_type]) {
        if (!options) {
            var e3 = new Error("Bad request: no options found");
            return callback(e3, null);
        }

        if (options.length != Indicators[ind_type]) {
            var e4 = new Error(Indicators[ind_type] + " options required for");
            return callback(e4, null);
        }

        if (!options.every((x) => Number.isInteger(x))) {
            var e5 = new Error("Invalid options: must be integer");
            return callback(e5, null);
        }

        // Calling the correct function
        switch (ind_type) {
            case "sma":
                sma(options, pair, tframe, callback);
                break;
            default: // for unimplemented indicator
                return callback(null, "Received " + ind_type);
        }
    }
}
/*
* Calculate Simple Moving Average
* @param options {array of 1 int} number of periods to be averaged together
* @param pair {string array} for example: BTC/USD is ["BTC", "USD"]
* @param tframe {int} the timeframe of each trading period
* @param callback {function} will be called with: err, result
* @return sma {array of real}
*/
function sma(options, pair, tframe, callback) {
    //TODO
    // histohour(fsym, tsym, aggregate, callback)
    CryptoCompare.histohour(pair[0], pair[1], 1, function(err, data) {
        if (err)
            return callback(err, null);
        return callback(null, data);
    });
}


/* supported indicators and required number of options*/
const Indicators = {
    "rsi" : 1,
    "stoch": 3,
    "stochrsi": 4,
    "adx": 1,
    "macd": 2,
    "cci": 1,
    "ao": 0,
    "mom": 1,
    "williamsr": 1,
    "bullbear": 0,
    "uo": 3,
    "sma": 1,
    "ema" : 1
}