use rusqlite::{Connection, Result};

pub fn connect_database() -> Result<Connection> {
    let conn = Connection::open("app.db")?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS Todo(
            id integer primary key,
            title text,
            done text,
            assigned_at text,
            created_at text
        )",
        [])
    ?;

    Ok(conn)
}
