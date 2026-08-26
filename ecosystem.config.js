module.exports = {
    apps: [
        {
            name: "aadagam_main_back",
            script: "./app.js",

            instances: 1,
            exec_mode: "fork",

            watch: true,
            autorestart: true,

            // Logs
            out_file: "./logs/out.log",
            error_file: "./logs/error.log",

            env: {
                NODE_ENV: "local",
                PORT: 5000
            },

            env_dev: {
                NODE_ENV: "dev",
                PORT: 5000
            },

            env_prod: {
                NODE_ENV: "prod",
                PORT: 5000
            }
        }
    ]
};