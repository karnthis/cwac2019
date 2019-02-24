CREATE TABLE USERS (user_id SERIAL PRIMARY KEY, username varchar(255) NOT NULL UNIQUE, password TEXT NOT NULL,name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, role VARCHAR(255), is_active BOOLEAN NOT NULL, last_updated TIMESTAMP NOT NULL);

CREATE TABLE PROVIDERS (provider_id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, description text, hours VARCHAR(255) NOT NULL, days_of_operation VARCHAR(7), last_verified DATE, is_active BOOLEAN, last_updated TIMESTAMP NOT NULL);

CREATE TABLE REFERRALS (referal_id SERIAL PRIMARY KEY, referer_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, referer_name VARCHAR(255), referee_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, referee_name VARCHAR(255), is_eligiable BOOLEAN, date_of_refreal DATE, fufillment_stats VARCHAR(255), last_updated TIMESTAMP NOT NULL);

CREATE TABLE CRIBS (provider_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, provider_name VARCHAR(255), crib_count INTEGER NOT NULL, crib_type VARCHAR(255), last_updated TIMESTAMP NOT NULL);

CREATE TABLE ADDRESSES (address_id SERIAL PRIMARY KEY, provider_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, primary_site boolean, class_id INTEGER, name VARCHAR(255), street VARCHAR(255) NOT NULL, line_2 VARCHAR(255), city VARCHAR(255), state char(2), zip_code CHAR(5), is_active BOOLEAN NOT NULL, last_updated TIMESTAMP NOT NULL);

CREATE TABLE WAITLIST (waitlist_id SERIAL PRIMARY KEY, provider_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, date_of_waitlist DATE, is_eligiable BOOLEAN, is_active BOOLEAN, last_updated TIMESTAMP NOT NULL);

CREATE TABLE CLASSES (provider_id INTEGER REFERENCES PROVIDERS(provider_id) NOT NULL, class_name VARCHAR(255), class_description text, address_id INTEGER REFERENCES ADDRESSES(address_id) NOT NULL, date_of_class DATE, time_of_class time, current_attendee_count INTEGER, max_attendees INTEGER, class_status VARCHAR(255), is_active BOOLEAN, last_updated TIMESTAMP NOT NULL);

CREATE TABLE ELIGIBILITY_REQUIREMENTS (provider_id INTEGER REFERENCES PROVIDERS(provider_id), public_assistance BOOLEAN NOT NULL, mother_17_or_younger boolean NOT NULL, is_client BOOLEAN NOT NULL, client_id INTEGER REFERENCES ADDRESSES(address_id), months_pregnant BOOLEAN NOT NULL, residency_requirement BOOLEAN NOT NULL, must_meet_all_criteria boolean not null);

