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
		- Requires: Nothing
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

### Users: /user
<details>
	<summary> / (route root)</summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid users
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Query Result Array
	- POST: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
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
		- Returns: Query Result Object
	- POST: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
	- PUT: 
		- Description: Update target user
		- Requires: 
			- orgid
			- Object containing (OPTIONAL):
				- member_of
				- username
				- password
				- cpassword
				- full_name
				- email 
		- Accepts: JSON body with above
		- Returns: Query Result Object
</details>

<details>
	<summary> /group/(INTEGER:orgid) </summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid users for target provider
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Query Result Array
	- POST:
		- Description: Add new user to provider
		- Requires: Object containing:
			- username
			- password
			- cpassword
			- full_name
			- email
		- Accepts: JSON body with above
		- Returns: Query Result Object
	- PUT: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
</details>

### Addresses: /address
<details>
	<summary> / (route root)</summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid addresses
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Query Result Array
	- POST: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
	- PUT: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
</details>

<details>
	<summary> /one/(INTEGER:aid)</summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve one address
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Query Result Object
	- POST: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
	- PUT: 
		- Description: Update address
		- Requires: Object containing:
			- OPTIONAL:
				- primary_site
				- location_type
				- location_name
				- street
				- line_2
				- city
				- state
				- zip_base5
				- zip_plus4
		- Accepts: JSON body with above
		- Returns: Query Result Object
</details>

<details>
	<summary> /org/(INTEGER:orgid)</summary>

- Authenticated Path
	- GET: 
		- Description: Retrieve all valid addresses for one provider
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Query Result Array
	- POST:
		- Description: Add new address
		- Requires: Object containing:
			- primary_site
			- location_type
			- location_name
			- street
			- city
			- zip_base5
			- OPTIONAL:
				- line_2
				- state
				- zip_plus4
		- Accepts: JSON body with above
		- Returns: Query Result Object
	- PUT: DISABLED
		- Description: 
		- Requires: Nothing
		- Accepts: Nothing
		- Returns: Nothing
</details>

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