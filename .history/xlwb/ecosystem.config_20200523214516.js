module.exports = {
  apps: [
    {
      name: "jianyiweibo-back-end",
      script: "bin/www",
      env: {
        COMMON_VARIABLE: "true",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "yff",
      host: ["106.53.202.42"],
      port: "22",
      ref: "origin/master",
      repo: "git@e.coding.net:xasxasxas/jianyiweibo.git",
      path: "/data/back-end/jianyiweibo",
      "pre-deploy-local": "echo 'This is a pre-deploy-local command'",
      "post-deploy":
        "git pull && cnpm install && npm run setprd && pm2 startOrRestart ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
