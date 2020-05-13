<a name="top"></a>
# memory_backend v0.0.1

后端API说明

- [User](#user)
	- [Request User information](#request-user-information)
	


# <a name='user'></a> User

## <a name='request-user-information'></a> Request User information
[Back to top](#top)



	GET /user/:id





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  id | Number | <p>Users unique ID.</p>|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "firstname": "John",
  "lastname": "Doe"
}
```

### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  firstname | String | <p>Firstname of the User.</p>|
|  lastname | String | <p>Lastname of the User.</p>|

### Error Response

Error-Response:

```
HTTP/1.1 404 Not Found
{
  "error": "UserNotFound"
}
```
