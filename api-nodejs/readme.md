# CWAC 2019 GenerateHealth API
## Endpoint Details:
### template
<details>
	<summary> / </summary>

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

### Providers: /provider
<details>
	<summary> / </summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid providers
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Array
	- POST:
		- Description: Add new provider
		- Requires: Object containing:
			- provider_name
			- phone
			- hours
			- OPTIONAL:
				- desc
				- days
		- Accepts: JSON body with above
		- Returns: Query Result Object
	- PUT: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
</details>

<details>
	<summary> /(INTEGER:orgid) </summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid providers
		- Requires: orgid
		- Accepts: Nothing
		- Returns: Query Result Object
	- POST: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
	- PUT: WIP
		- Description: Update target provider
		- Requires: 
			- orgid
			- Object containing (OPTIONAL):
				- provider_name
				- phone
				- hours
				- desc
				- days
		- Accepts: JSON body with above
		- Returns: Query Result Object
</details>

<!-- TODO -->
### Users: /user
<details>
	<summary> / </summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid users
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

<details>
	<summary> /one/(INTEGER:userid) </summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve target user
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

<details>
	<summary> /group/(INTEGER:orgid) </summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid users for target provider
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