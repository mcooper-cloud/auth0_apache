# Auth0 + Apache mod_auth_openidc

This repository contains a reference for implementing the Apache mod_auth_openidc module to interact with Auth0 and a simple server-side web app.

# Instructions for Deployment

1. Customize the configuration files within this repository (`env.sh` and `apache_app.conf`)
2. Deploy a compute resource and upload this code to that compute resource
2. Within that compute resource `source env.sh` (this will populate the compute environment with necessary variables)
3. Within that compute resource, run `./start.sh` (this will install Apache along with the necessary modules, move the source into the correct directories and start the server)
4. Configure your Auth0 applications and create an Auth0 post-login action using `./auth0/post-login.js`
