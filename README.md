# auth-app

The Auth-app is a REST api designed for authentication of user

The application supports Registration and Login

Registration and Login Validation is done

Register routes can be done in 

#api/user/register

Login routes can be done in

#api/user/login

Both the post routes take json values as follows

```json
{
	"name": "name",
	"email": "email",
	"password": "password"
}
```

passwords are encrypted with bcrypt

