module.exports = {
  apps: [
    {
      name: "suinisou-back-end",
      script: "dist/index.html",
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
      repo: "git@e.coding.net:xasxasxas/suinisou/front-end.git",
      path: "/data/front-end/jianyiweibo",
      "pre-deploy-local": "echo 'This is ront-end/suinisou'",
      "post-deploy": "git pull && cnpm install && npm run build",
      "pre-setup": "",
    },
  },
};
