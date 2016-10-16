--create to do table
CREATE TABLE todo2 (
id SERIAL PRIMARY KEY,
task varchar(80),
complete BOOLEAN DEFAULT false
)

--filter uncompleted task only
SELECT * FROM todo2 where complete = false

--filter completed task only
SELECT * FROM todo2 where complete = true
