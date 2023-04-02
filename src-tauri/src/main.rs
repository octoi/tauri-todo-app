// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
mod controller;

use controller::todo_controller::{add_todo, read_todos, update_todo, delete_todo};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            add_todo,
            read_todos,
            update_todo,
            delete_todo
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
