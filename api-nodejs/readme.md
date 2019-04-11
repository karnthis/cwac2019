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
Please see [Swagger](https://findyour.agency)

### Users: /user
Please see [Swagger](https://findyour.agency)

### Addresses: /address
Please see [Swagger](https://findyour.agency)

### Inventories: /inventory
<details>
	<summary> / (route root)</summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid Inventories
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Query Result Array
	- POST:
		- Description: Add new Inventories
		- Requires: Object containing:
			- provider_id
			- inv_count
			- OPTIONAL:
				- inv_type (not currently used)
		- Accepts: JSON body with above
		- Returns: Query Result Object
	- PUT: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
</details>

<details>
	<summary> /dispense </summary>

- Authenticated Path
	- GET: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
	- POST: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
	- PUT: 
		- Description: Decrement target inventory by one
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Query Result Object
</details>

<details>
	<summary> /(INTEGER:inv_id) </summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve target inventory
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Query Result Object
	- POST: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
	- PUT: 
		- Description: Update target inventory count
		- Requires: Object containing:
			- inv_count
		- Accepts: JSON body with above
		- Returns: Query Result Object
</details>

<!-- TODO -->
### Referrals: /referral
<details>
	<summary> / (route root)</summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid providers
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Query Result Array
	- POST:
		- Description: Add new provider
		- Requires: Object containing:
			- OPTIONAL:
		- Accepts: JSON body with above
		- Returns: Query Result Array
	- PUT: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
</details>

<details>
	<summary> / (route root)</summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid providers
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Query Result Array
	- POST:
		- Description: Add new provider
		- Requires: Object containing:
			- OPTIONAL:
		- Accepts: JSON body with above
		- Returns: Query Result Array
	- PUT: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
</details>

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

<!-- TODO -->
## Waitlisted: /waitlist
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

<!-- TODO -->
### Classes: /calendar
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

<details>
	<summary> /(INTEGER:orgid)</summary>

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