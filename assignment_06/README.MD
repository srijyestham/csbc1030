                        Instructions to run program

    In Bash :
                1. cd 04_assignment/csbc1030/assignment4/src/
                2. npm i
                3. node index.js
		4. To Login, Open the following url in browser for post('/')
			http://localhost:3000/api/users/login
		5. Open the following url in browser for get('/')
			http://localhost:3000/api/users
		6: Open the following url in browser for get('/:id')
			http://localhost:3000/api/users/{id}
		7: Open the following url in browser for post('/')
			http://localhost:3000/api/users

			
			Json Body example
		
		{
			"email": "user@mail.com",
			"password": "1234"
		}