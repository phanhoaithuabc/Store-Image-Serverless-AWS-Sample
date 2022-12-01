# Run Store Image LOCAL and re-design Port-Adapter Model
> <img src="images\port-adapter.png">
<br/>

## 1. Install DynamoDB Local
```bash
sls dynamodb install
sls dynamodb start
```
## 2. Start
```bash
sls offline
```
## 3. Add X-ray service to trace Lambda and API Gateway
> <img src="images\xray-deamon.png">
> <img src="images\map-x-ray.png">
<br/>