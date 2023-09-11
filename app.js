const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
// const { MongoClient } = require("mongodb");

// const connectionString = process.env.ATLAS_URI || "";

// const client = new MongoClient('mongodb://atlas-sql-64f9bb43c6bad62ba0d96f0d-vjrm0.a.query.mongodb.net/mock-db?ssl=true&authSource=admin');

// let conn;
// let db;

// const connectDB = async () => {
//     try {
//         conn = await client.connect();
//         db = conn.db("mock-db");
//     } catch (e) {
//         console.error(e);
//     }
// }

const alerts = [{
    "kpi": "Gross Revenue",
    "thresholdPosition": "above",
    "thresholdValue": "3000",
    "function": "count",
    "filters": [{
        "id": "0001",
        "name": "beef",
        "type": "category",
        "operator": 'is/is not',
    }],
    "id": "1",
    "name": "alert 1",
    "type": "threshold",
    "rollingWindow": {
        "time": 1,
        "unit": hour
    },
    "activeHour": {
        "startHour": "11",
        "endHour": "23"
    }
}, {
    "kpi": "Gross Revenue",
    "thresholdPosition": "below",
    "thresholdValue": "8000",
    "function": "count",
    "filters": [{
        "name": "beef",
        "type": "category",
        "operator": 'is',
    }],
    "id": "3",
    "name": "alert 3",
    "type": "threshold",
    "rollingWindow": {
        "time": 1,
        "unit": hour
    },
    "activeHour": {
        "startHour": "11",
        "endHour": "23"
    },
    "dataRange": ["2023-09-01", "2023-10-01"]
}, {
    "kpi": "Gross Revenue",
    "thresholdPosition": "above",
    "thresholdValue": "2000",
    "function": "count",
    "filters": [{
        "name": "beef",
        "type": "category",
        "operator": 'is not',
    }],
    "id": "3",
    "name": "alert 4",
    "type": "threshold",
    "rollingWindow": {
        "time": 1,
        "unit": hour
    },
    "startHour": "11",
    "endHour": "23",
    "dataRange": ["2023-09-02", "2023-10-31"]
}, {
    "kpi": "Gross Revenue",
    "rollingWindow": {
        "time": 1,
        "unit": hour
    },
    "filters": [{
        "name": "beef",
        "type": "category",
        "operator": 'is',
    }],
    "id": "02",
    "name": "alert 102",
    "type": "absense",
    "activeHour": {
        "startHour": "11",
        "endHour": "23"
    },
    "dataRange": ["2023-09-02", "2023-10-31"]
}]

const notifications = [{
    alertId: "alert id",
    alertName: "alert name",
    alertType: "alert types",
    kpi: "Gross Revenue",
    kpiValue: "700",
    function: "mean / count /% change",
    categoryName: "beef",
    productName: "beef steak",
    skuName: "beef steak",
    startHour: "12",
    endHour: "20",
    date: "2023 -09-06"
}]
app.listen(PORT, async () => {
    // await connectDB();
    console.log("Server Listening on PORT:", PORT);
});

app.get("/alerts/config", async (request, response) => {
    const { hour } = request.params;
    const filteredAlerts = alerts.filter((alert) => {
        return alert.startHour < hour < alert.endHour;
    })
    response.send({
        alerts: filteredAlerts
    }).status(200);
});

app.post("/notifications", async (req, res) => {
    let collection = await db.collection("alerts");
    let results = await collection.find({})
        .limit(50)
        .toArray();

    res.send(results).status(200);
});
