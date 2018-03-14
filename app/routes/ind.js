"use strict";
const path       = require("path");
const request    = require("request");
const calculator = require(path.join(process.cwd(), "app", "common", "ind.calculator.js"));

module.exports = function(app) {
    app.route("/ind")
        .get(function(req, res) {
            var ind_type = req.query.type;
            var options = req.query.options;
            var pair   = req.query.pair;
            var tframe = req.query.timeframe;

            if(!ind_type)
                return res.code(400).send("Bad request: Missing indicator type");

            if(options)
                options = options.split(",").map((x) => parseInt(x));

            calculator(ind_type, options, pair, tframe, function(err, result) {
               if (err) {
                   return res.status(500).send(err.message);
               } else {
                   return res.status(200).json(result);
               }
            });
        });
}
