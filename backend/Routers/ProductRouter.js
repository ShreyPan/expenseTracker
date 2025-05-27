const ensureAuthenticated = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
    res.status(200).json({
        success: true,
        products: [
            {
                name: "laptop",
                price: 50000
            },
            {
                name: "watch",
                price: 5000
            },
            {
                name: "mobile",
                price: 10000
            },
            {
                name: "tv",
                price: 20000
            }
        ]
    });
});

module.exports = router;