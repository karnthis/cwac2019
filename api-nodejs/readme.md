# CWAC 2019 GenerateHealth API
## Endpoint Details:
<!-- 
### template
<details>
	<summary> / (route root)</summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid providers
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Array
	- POST:
		- Description: Add new provider
		- Requires: Object containing:
			- OPTIONAL:
		- Accepts: JSON body with above
		- Returns: Array
	- PUT: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
</details>
-->

### Authentication: /auth
<details>
	<summary> / (route root)</summary>

- Authenticated Path
	- GET: DISABLED
		- Description:
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
	- POST:
		- Description: Submit login
		- Requires:
			- login
			- password
		- Accepts: JSON Object or Form Submission with above
		- Returns: 
			- Success Message
			- Token in auth header
	- PUT: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
</details>

### Providers: /provider
Please see [Swagger](https://api.findyour.agency)

### Users: /user
Please see [Swagger](https://api.findyour.agency)

### Addresses: /address
Please see [Swagger](https://api.findyour.agency)

### Inventories: /inventory
Please see [Swagger](https://api.findyour.agency)

### Referrals: /referral
Please see [Swagger](https://api.findyour.agency)

### Eligilibility: /eligibility
Please see [Swagger](https://api.findyour.agency)

<!-- TODO -->
### Waitlisted: /waitlist
Please see [Swagger](https://api.findyour.agency)

### Classes: /calendar
Please see [Swagger](https://api.findyour.agency)