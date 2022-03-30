exports.onExecutePostLogin = async (event, api) => {

    const user = event.user
    const user_id = user.user_id
    const connection_id = event.connection.id
    const logins_count = event.stats.logins_count
    const requested_scopes = event.transaction.requested_scopes
    const roles = event.authorization.roles


    const crypto = require('crypto');
    const uuid = crypto.randomUUID();


    const namespace = event.secrets.CUSTOM_SCOPE_NAMESPACE;

    //
    // set custom claims
    //
    try {

        for (const [key, value] of Object.entries(event.user.user_metadata)) {
            var name = `${namespace}/${key}`;
            api.accessToken.setCustomClaim(name, value)
        }

        var role_claim = `${namespace}/roles`;
        api.accessToken.setCustomClaim(role_claim, roles)

        var uuid_claim = `${namespace}/EXTERNALID`;

        //
        // OIDC compliant custom claim (using namespace)
        //
        api.accessToken.setCustomClaim(uuid_claim, uuid)
        api.idToken.setCustomClaim(uuid_claim, uuid)


        //
        // non-OIDC compliant custom claim (no namespace)
        //
        api.accessToken.setCustomClaim("EXTERNALID", uuid)
        api.idToken.setCustomClaim("EXTERNALID", uuid)


    } catch (e) {
        console.log("Error setting custom claims: %s", e.message);
    }
}