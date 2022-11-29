# Pagination Data in DynamoDB using lambdaJS and API Gateway as a backend and reactJS as a frontend

## 1. Create a table with the following parameters:
* Table name: Groups
* Primary partition key: id (String)
* (Optionally) Uncheck the Use default settings checkbox, and select On-demand in the Read/write capacity mode section

>It is important that you name your table Groups if you want to use the IAM policy provided for this exercise.

Sample data:
```json
{
    "id": "1",
    "name": "Dogs",
    "description": "Only dog images here!"
}
{
    "id": "2",
    "name": "Nature",
    "description": "What can be a better object for photography"
}
{
    "id": "3",
    "name": "Cities",
    "description": "Creative display of urban settings"
}
{
    "id": "4",
    "name": "Computers",
    "description": "For the techies among us"
}
```

## 2. Create an API Gateway API. You would need to:
* Create a new API
* Add a GET method for the /groups resource and use a Lambda function that you wrote in this exercise as a target for this method
* Deploy this new API

## 3. Expected result
Send a GET request using this URL: `https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/groups?limit=2` you should get a reply like this:
```json
{
    "items": [
      ...
    ],
    "nextKey": "%7B%22id%22%3A%221%22%7D"
}
```
>Notice that we need to replace `{{apiId}}` with an id of the API that you've deployed.

If you we the `nextKey` and use it with another GET request using this URL: `https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/groups?limit=2&nextKey=%7B%22id%22%3A%221%22%7D`
```json
{
    "items": [
      ...
    ],
    "nextKey": null
}
```
>If nextKey is null it means that there are no more items to return.