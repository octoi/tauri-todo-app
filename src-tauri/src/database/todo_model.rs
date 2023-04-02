use rusqlite::Connection;
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct TodoType {
    pub id: i32,
    pub title: String,
    pub done: bool,
    pub assigned_at: i32,
    pub created_at: i32,
}

pub fn create(
    db: &Connection,
    title: String,
    done: bool,
    assigned_at: String,
    created_at: String,
) -> Result<i64, String> {
    let done = format!("{}", done);

    match db.execute(
        "INSERT INTO Todo (title, done, assigned_at, created_at) VALUES (?1, ?2, ?3, ?4)", 
        &[&title, &done, &assigned_at, &created_at]
    ) {
        Ok(_) => {
            let id = db.last_insert_rowid();
            return Ok(id);
        }
        Err(_) => return Err(String::from("Failed to save data")),
    }
}

pub fn read_all(db: &Connection) -> Result<Vec<TodoType>, String> {
    let mut todo_vec: Vec<TodoType> = Vec::new();

    let mut sql_query = match db.prepare("SELECT * FROM Todo") {
        Ok(query) => query,
        Err(_) => return Err(String::from("Failed to load todos"))
    };

    let todo_iter = match sql_query.query_map([], |row| {
        let done: String = row.get(2)?;
        let assigned_at: String = row.get(3)?;
        let created_at: String = row.get(4)?;

        Ok(TodoType {
            id: row.get(0)?,
            title: row.get(1)?,
            done: done.to_lowercase() == "true",
            assigned_at: assigned_at.parse().unwrap(),
            created_at: created_at.parse().unwrap(),
        })
    }) {
        Ok(todo_iter) => todo_iter,
        Err(_) => return Err(String::from("Failed to load todos"))
    };

    for todo in todo_iter {
        match todo {
            Ok(todo_data) => todo_vec.push(todo_data),
            Err(_) => continue,
        }
    }

    Ok(todo_vec)
}

pub fn update(db: &Connection, id: i32, title: String, done: bool, assigned_at: i32) -> Result<(), String> {
    let id = format!("{}", id);
    let done = format!("{}", done);

    match db.execute("UPDATE Todo SET title=(?1), done=(?2), assigned_at=(?3) WHERE id=(?4)", &[&title, &done, &assigned_at.to_string(), &id]) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to update todo")),
    };
}

pub fn delete(db: &Connection, id: i32) -> Result<(), String> {
    let id = format!("{}", id);

    match db.execute("DELETE FROM Todo WHERE id=(?1)", &[&id]) {
        Ok(_) => return Ok(()),
        Err(_) => return Err(String::from("Failed to delete todo")),
    };
}
