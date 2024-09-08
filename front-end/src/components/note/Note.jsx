import RemoveIcon from "../../assets/remove.svg";
import styles from "./Note.module.css";
import { TopBar } from "../top-bar/TopBar";
import { useLoaderData, Form, useSubmit, redirect } from "react-router-dom";
import { useCallback } from "react";
import { debounce } from "../../utils/debounce";

const NoteEditor = ({ children }) => (
  <div className={styles["note-editor"]}>{children}</div>
);

export async function deleteNote({ params }) {
  return fetch(`http://localhost:3000/notes/${params.noteId}`, {
    method: "DELETE",
  }).then(() => {
    return redirect(`/notes/${params.folderId}`);
  });
}

export async function updateNote({ request, params }) {
  const data = await request.formData();

  const title = data.get("title");
  const body = data.get("body");

  return fetch(`http://localhost:3000/notes/${params.noteId}`, {
    method: "PATCH",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const Note = () => {
  const note = useLoaderData();
  const submit = useSubmit();

  const onChangeCallback = useCallback(
    debounce((event) => {
      const form = event.target.closest("form");
      submit(form, { method: "PATCH" });
    }, 300),
    [debounce, submit]
  );

  return (
    <div className={styles.container}>
      <TopBar>
        <Form method="DELETE" action="delete">
          <button className={styles.button}>
            <img className={styles.image} src={RemoveIcon} />
          </button>
        </Form>
      </TopBar>
      <Form method="PATCH" onChange={onChangeCallback}>
        <NoteEditor key={note.id} r>
          <input type="text" defaultValue={note.title} name="title" />
          <textarea defaultValue={note.body} name="body" />
        </NoteEditor>
      </Form>
    </div>
  );
};

export { Note };
