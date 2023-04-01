use rusqlite::Connection;

pub mod todo_model;
mod init;

use init::connect_database;

pub fn init_db() -> Result<Connection, String> {
    match connect_database() {
        Ok(conn) => Ok(conn),
        Err(err) => {
            eprintln!("{}", err);
            Err(String::from("Failed to connect database"))
        }
    }
}

