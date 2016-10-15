--create to do table
CREATE TABLE todo2 (
id SERIAL PRIMARY KEY,
task varchar(80),
complete BOOLEAN DEFAULT false
)
