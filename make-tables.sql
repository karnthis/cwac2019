CREATE TABLE USERS (user_id SERIAL PRIMARY KEY, username varchar(255) NOT NULL UNIQUE, password TEXT NOT NULL, full_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, role VARCHAR(255), is_active BOOLEAN NOT NULL, last_updated TIMESTAMP NOT NULL)

CREATE TABLE PROVIDERS (provider_id SERIAL PRIMARY KEY, provider_name VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, description text, hours VARCHAR(255) NOT NULL, days_of_operation VARCHAR(7), last_verified DATE, is_active BOOLEAN NOT NULL, last_updated TIMESTAMP NOT NULL)

CREATE TABLE REFERRALS (referal_id SERIAL PRIMARY KEY, referer_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, creator_id INTEGER REFERENCES USERS(user_id) NOT NULL, referee_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, is_eligiable BOOLEAN, date_of_referal DATE, referral_notes TEXT, fufillment_stats VARCHAR(255), updater_id INTEGER REFERENCES USERS(user_id) NOT NULL, is_active BOOLEAN NOT NULL, last_updated TIMESTAMP NOT NULL)

CREATE TABLE CRIBS (provider_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, crib_count INTEGER NOT NULL, crib_type VARCHAR(255), update_type VARCHAR(255), updater_id INTEGER REFERENCES USERS(user_id) NOT NULL, last_updated TIMESTAMP NOT NULL)

CREATE TABLE ADDRESSES (address_id SERIAL PRIMARY KEY, provider_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, primary_site BOOLEAN, location_type VARCHAR(255), location_name VARCHAR(255), street VARCHAR(255) NOT NULL, line_2 VARCHAR(255), city VARCHAR(255), state CHAR(2), zip_code CHAR(10), is_active BOOLEAN NOT NULL, updater_id INTEGER REFERENCES USERS(user_id) NOT NULL, last_updated TIMESTAMP NOT NULL)

CREATE TABLE WAITLIST (waitlist_id SERIAL PRIMARY KEY, provider_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, creator_id INTEGER REFERENCES USERS(user_id) NOT NULL, date_of_waitlist DATE, eligiable_for VARCHAR(255), is_active BOOLEAN NOT NULL, updater_id INTEGER REFERENCES USERS(user_id) NOT NULL, last_updated TIMESTAMP NOT NULL)

CREATE TABLE CLASSES (provider_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, creator_id INTEGER REFERENCES USERS(user_id) NOT NULL, class_name VARCHAR(255), class_description TEXT, address_id INTEGER REFERENCES ADDRESSES(address_id) NOT NULL, date_of_class DATE, time_of_class TIME, current_attendee_count INTEGER, max_attendees INTEGER, class_status VARCHAR(255), is_active BOOLEAN NOT NULL, updater_id INTEGER REFERENCES USERS(user_id) NOT NULL, last_updated TIMESTAMP NOT NULL)

CREATE TABLE ELIGIBILITY_REQUIREMENTS (provider_id INTEGER REFERENCES PROVIDERS(provider_id), public_assistance BOOLEAN NOT NULL, mother_17_or_younger BOOLEAN NOT NULL, is_client BOOLEAN NOT NULL, client_of_other VARCHAR(255) NOT NULL, trimester INTEGER NOT NULL, trimester INTEGER NOT NULL, residency_requirement INTEGER NOT NULL, must_meet_all_criteria BOOLEAN NOT NULL, updater_id INTEGER REFERENCES USERS(user_id) NOT NULL, is_active BOOLEAN NOT NULL, last_updated TIMESTAMP NOT NULL)

CREATE TABLE COUNTIES (county_id INTEGER NOT NULL, county_name VARCHAR(255) NOT NULL, state CHAR(2) NOT NULL)

CREATE TABLE ZIPCODES (zip_code INTEGER NOT NULL, county_id INTEGER REFERENCES COUNTIES(county_id) NOT NULL, updater_id INTEGER REFERENCES USERS(user_id) NOT NULL, is_active BOOLEAN NOT NULL, last_updated TIMESTAMP NOT NULL
