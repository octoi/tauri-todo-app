use crate::database::init_db;
use crate::database::todo_model;
use crate::database::todo_model::TodoType;

#[tauri::command]
pub fn read_todos() -> Result<Vec<TodoType>, String> {
    let db = init_db()?;
    todo_model::read_all(&db)
}

#[tauri::command]
pub fn add_todo(title: String, assigned_at: String, created_at: String) -> Result<i64, String> {
    let db = init_db()?;
    todo_model::create(&db, title, false, assigned_at, created_at)
}

#[tauri::command]
pub fn update_todo(id: i32, title: String, done: bool, assigned_at: String) -> Result<(), String> {
    let db = init_db()?;
    todo_model::update(&db, id, title, done, assigned_at)
}

#[tauri::command]
pub fn delete_todo(id: i32) -> Result<(), String> {
    let db = init_db()?;
    todo_model::delete(&db, id)
}
