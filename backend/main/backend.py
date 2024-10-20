from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf
from classes import SecurityInfo, Response, SecurityPricing
from datetime import datetime
import pprint

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})


@app.route("/api/security/<identifier>", methods=["GET"])
def get_security(identifier):
    try:
        security = yf.Ticker(identifier)
        if not security.info or "currentPrice" not in security.info:
            return jsonify(Response(400, f"Security: {identifier} could not be found", {}))

        wantedAttrs = [
            "currentPrice",
            "currency",
            "marketCap",
            "quoteType",
            "sectorDisp",
            "symbol",
            "shortName",
        ]
        mySecurity = SecurityInfo(
            *[security.info.get(attr, f"{attr} Not Found") for attr in wantedAttrs]
        )

        return jsonify(Response(200, f"Security: {identifier} successfully found", mySecurity))

    except Exception as e:
        return jsonify(Response(500, "Uncaught Error", e))


@app.route("/api/security/<identifier>/<period>/<interval>", methods=["GET"])
def get_pricing(identifier, period, interval):
    try:
        security = yf.Ticker(identifier)
        data = security.history(period, interval)
        if data.empty:
            return jsonify(Response(400, f"Security: {identifier} could not priced", {}))

        filteredData = data[["Open"]].reset_index()
        filteredData.columns.values[0] = "Datetime"
        myPricing = SecurityPricing(filteredData.to_dict(orient="records"))

        return jsonify(Response(200, f"Security: {identifier} successfully priced", myPricing))

    except Exception as e:
        return jsonify(Response(500, "Uncaught Error", e))


if __name__ == "__main__":
    app.run(debug=True)
