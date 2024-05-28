const {CognitoIdentityProviderClient, AdminAddUserToGroupCommand} = require("@aws-sdk/client-cognito-identity-provider");

exports.handler = async (event, context, callback) => {
    
    const { userName, groupName } = event;

    const Cognito = new CognitoIdentityProviderClient({
        region: 'us-east-1'
    });

    const params = {
        GroupName: groupName || 'ministro',
        UserPoolId: "us-east-1_oGKLorYnG",
        Username: userName
    }
    
    try {
        const addUser = new AdminAddUserToGroupCommand(params);
        await Cognito.send(addUser);
        callback(null, event)
    } catch (e) {
        callback(e);
    }

};
