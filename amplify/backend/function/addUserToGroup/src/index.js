const aws = require('aws-sdk');
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {

    const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider();

    const params = {
        GroupName: event.groupName || 'ministro',
        UserPoolId: "us-east-1_oGKLorYnG",
        Username: event.userName,
    }

    if (!(event.request.userAttributes["cognito:user_status"] === "CONFIRMED" && event.request.userAttributes.email_verified === "true")) {
        callback("User was not properly confirmed and/or email not verified")
    }

    cognitoidentityserviceprovider.adminAddUserToGroup(params, (err) => {
        if (err) { callback(err) }
        callback(null, event);
    })
};
