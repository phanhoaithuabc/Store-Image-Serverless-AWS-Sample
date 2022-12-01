# Store-Image-Serverless-AWS-Sample
## Database (DynamoDB)
<p align='center'><img src="images\store-image-db.png"></p>

## 1. Common Flow
  > <img src="images\lambda_intergration_mode.png">
  > <img src="images\Same-Origin-Requests-Policy.png">
  > <img src="images\Cross-Origin-Request.png">
  > <img src="images\preflight-response.png">
  > <img src="images\request-validation.png">
  > <img src="images\validating-json-schema.png">

JSON schema example:
```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "my-type",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "required": ["name"]
}
```

## 2. Use Presigned URL to upload file to S3
  > <img src="images\file-upload-presigned-url.png">
  > <img src="images\file-upload-notification.png">

## 3. Use websocket to notify when upload to S3
  > <img src="images\what-is-websocket.png">

WebSocket allows to implement bi-directional communication between a web application and a server. It can be especially useful for applications like:
* Messaging Applications
* Real-time Notifications
* Real-time Dashboards

<img src="images\websocket-connectionID.png">

## 4. Create a Stream data from DynamoDB to ELS
  > <img src="images\data-stream.png">
  > <img src="images\data-stream-kinesis.png">
  > <img src="images\data-stream-dynamodb.png">
  > <img src="images\data-stream-dynamodb-2.png">
  > <img src="images\ELS-Kibana-Dynamo.png">

## 5. Broadcast notification event to multiple target using SNS - use event to resize image file
### Because of S3 does not allow to send events to multiple targets
  > <img src="images\resize-image.png">

## 6. Authentication and Authorization
### **Case 1: Using IAM Authen (not a good ideal)**
  > <img src="images\iam-authen.png">
<br/>

### **Case 2: Using AWS Cognito (maybe)**
  > <img src="images\cognito-authen.png">
  > <img src="images\cognito-federated-identity.png">
<br/>

### **Case 3: Using custom auth and JWT (what we'll use)**
  > <img src="images\jwt-flow.png">
  > <img src="images\custom-authorizer.png">
  > <img src="images\custom-authorization-2.png">
  > <img src="images\oauth-origin.png">
  > <img src="images\oauth-solution.png">
  > <img src="images\oauth-flow.png">
  > <img src="images\auth0-flow.png">
  > <img src="images\HS256-symmetric.png">
  > <img src="images\RS256-asymmetric.png">
<br/>

### **Finally, we use KMS to store token:**
  > <img src="images\contralize-config.png">
  > <img src="images\kms-aws.png">
<br/>

## 7. Add middleware into lambda function
 > <img src="images\middy-middleware.png">
 > <img src="images\available-middleware.png">
<br/>

## Deploy this API
Deploy server by serverless:
```bash
sls deploy -v
```

## UI Client for List and Create Group
<img src="images\UI-Group.png">

## UI Client for List and Create Group
<img src="images\UI-image-2.png">
<img src="images\UI-image.png">