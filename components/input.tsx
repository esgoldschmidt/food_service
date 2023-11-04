"use client";

import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
interface InputProps {
  isEditing: boolean;
  itemToEdit: { id: string; title: string };
}

const Input = ({ isEditing, itemToEdit }: InputProps) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setTodoTitle(itemToEdit.title);
      inputRef.current?.focus();
    }
  }, [isEditing, itemToEdit.title]);

  const createTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoTitle) {
      alert("Please enter a value");
      return;
    }
    setIsLoading(true);
    // Todo: post to the db
    console.log("todo created", todoTitle);
    toast.success("Todo created");
    setTodoTitle("");
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={createTodo}
      className="w-full flex border border-slate-400 rounded-sm mt-5 mb-5"
    >
      <input
        disabled={isLoading}
        className=" py-2 px-4 w-full outline-none "
        type="text"
        placeholder="Create todo..."
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        autoFocus={isEditing}
      />
      <button
        className={`rounded-r-sm w-24 text-white bg-slate-500/75 font-bold hover:bg-slate-500 ${
          todoTitle && "bg-slate-500"
        }`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "..." : isEditing ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default Input;
